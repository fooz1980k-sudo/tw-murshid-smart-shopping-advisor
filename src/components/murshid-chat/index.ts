import { css, html, type PropertyValues } from 'lit';
import { state, query } from 'lit/decorators.js';
import { Smart } from '../../shared/ui';
import { L, opt, num, bool, list, t, csv, ids, byIds, fromSource, smart, search, norm, money, storeName, type Prod } from '../../shared/salla';
import { seen } from '../../shared/memory';

type R = Record<string, unknown>;
interface Msg { me: boolean; text: string; prods?: Prod[]; link?: string; linkText?: string }
const toLatin = (s: string) => s.replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
/** Conversational shopping assistant: understands the merchant's topics (keywords), budgets in plain words («تحت 200») and intents (offers, newest, best sellers, gifts), and searches the real catalogue; hands off to WhatsApp when it cannot help. */
export default class MurshidChat extends Smart {
  @state() private msgs: Msg[] = [];
  @state() private typing = false;
  @state() private open = false;
  @state() private input = '';
  @query('.log') private log?: HTMLElement;
  static styles = [Smart.base, css`
    .chat { display: grid; grid-template-rows: auto 1fr auto auto; height: var(--ch, 560px); max-width: 760px; margin: 0 auto; background: var(--CARD); border-radius: var(--r); box-shadow: var(--sh); overflow: hidden; }
    .al-start .chat { margin: 0; }
    .top { display: flex; gap: 12px; align-items: center; padding: 14px 18px; background: var(--A); color: #fff; }
    .av { width: 42px; height: 42px; border-radius: 50%; background: #fff3 center/cover; display: grid; place-items: center; font-size: 22px; flex: none; }
    .top b { display: block; } .top small { opacity: .85; display: flex; align-items: center; gap: 6px; } .top small::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: #4ade80; }
    .log { overflow-y: auto; padding: 18px; display: flex; flex-direction: column; gap: 12px; scroll-behavior: smooth; }
    .m { max-width: 85%; padding: 11px 15px; border-radius: 18px; line-height: 1.7; font-size: 15px; animation: in .35s ease; white-space: pre-line; }
    @keyframes in { from { opacity: 0; transform: translateY(8px); } }
    .bot { align-self: flex-start; background: color-mix(in srgb, currentColor 7%, transparent); border-start-start-radius: 4px; }
    .me { align-self: flex-end; background: var(--A); color: #fff; border-start-end-radius: 4px; }
    .typing { display: inline-flex; gap: 4px; } .typing i { width: 7px; height: 7px; border-radius: 50%; background: currentColor; opacity: .4; animation: d 1s infinite; } .typing i:nth-child(2) { animation-delay: .15s; } .typing i:nth-child(3) { animation-delay: .3s; }
    @keyframes d { 50% { opacity: 1; transform: translateY(-3px); } }
    .ps { display: grid; grid-auto-flow: column; grid-auto-columns: 150px; gap: 10px; overflow-x: auto; margin-top: 10px; padding-bottom: 4px; }
    .p { display: grid; background: var(--CARD); color: inherit; text-decoration: none; border-radius: 14px; overflow: hidden; border: 1px solid var(--LINE); font-size: 13px; }
    .p img { width: 100%; aspect-ratio: 1; object-fit: cover; } .p span { padding: 6px 8px 0; font-weight: 700; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; } .p b { padding: 2px 8px 8px; color: var(--A); }
    .sug { display: flex; gap: 8px; padding: 0 14px 10px; overflow-x: auto; } .sug .chip { white-space: nowrap; padding: 7px 13px; font-size: 13px; }
    form { display: flex; gap: 8px; padding: 12px; border-top: 1px solid var(--LINE); }
    input { flex: 1; border: 1.5px solid var(--LINE); border-radius: 999px; padding: 11px 16px; font: inherit; background: transparent; color: inherit; outline: none; } input:focus { border-color: var(--A); }
    .ml { display: inline-block; margin-top: 8px; color: var(--A); font-weight: 800; }
    .fab { position: fixed; z-index: 70; bottom: 20px; inset-inline-end: 20px; width: 62px; height: 62px; border-radius: 50%; border: 0; background: var(--A); color: #fff; font-size: 28px; cursor: pointer; box-shadow: 0 18px 40px -14px var(--A); }
    .float { position: fixed; z-index: 70; bottom: 94px; inset-inline-end: 20px; width: min(400px, calc(100vw - 24px)); --ch: min(580px, 75vh); }
  `];
  willUpdate(ch: Map<string, unknown>) { if (ch.has('config') && !this.msgs.length) this.msgs = [{ me: false, text: L(this.c.greeting, t(`أهلاً! أنا ${this.botName()} 👋\nقل لي وش تدوّر عليه، أو حدد ميزانيتك مثل «هدية تحت 200»`, `Hi! I am ${this.botName()} 👋\nTell me what you need, or a budget like "gift under 200"`)) }]; }
  updated(ch: PropertyValues) { super.updated(ch); if (this.log) this.log.scrollTop = this.log.scrollHeight; }
  private botName() { return L(this.c.bot_name, t(`مساعد ${storeName() || 'المتجر'}`, `${storeName() || 'Store'} assistant`)); }
  private async reply(q: string) {
    const c = this.c; const nq = norm(toLatin(q));
    const nums = (nq.match(/\d+/g) ?? []).map(Number); const under = /(تحت|اقل|ما يتعدي|حدود|under|below|less|max)/.test(nq); const over = /(فوق|اكثر من|over|above)/.test(nq);
    const cap = nums.length ? (over ? null : Math.max(...nums)) : null; const floor = nums.length && over ? Math.min(...nums) : null;
    const within = (l: Prod[]) => l.filter((p) => p.available && (cap == null || p.price <= cap) && (floor == null || p.price >= floor));
    // 1) the merchant's own topics
    let best: R | null = null; let score = 0;
    for (const it of list<R>(c.intents)) { const kw = [...csv(it.keywords), L(it.label)].map((k) => norm(k)).filter(Boolean); const s = kw.filter((k) => nq.includes(k)).length; if (s > score) { score = s; best = it; } }
    if (best) { const prods = within(await byIds(ids(best.products))); return { me: false, text: L(best.reply), prods: prods.slice(0, num(c.max_results, 6)), link: String(best.link || ''), linkText: L(best.link_text) } as Msg; }
    // 2) built-in intents on real store sources
    const B: [RegExp, string, string, string][] = [[/(عرض|عروض|خصم|تخفيض|اوفر|deal|offer|sale|discount)/, 'offers', 'هذي المنتجات اللي عليها خصم الحين:', 'These are on sale right now:'],
      [/(جديد|احدث|وصل|new|latest)/, 'latest', 'أحدث ما وصلنا:', 'Our newest arrivals:'], [/(مبيع|طلب|مشهور|ترند|best|popular|trend)/, 'best_selling', 'الأكثر طلباً في المتجر:', 'Most ordered in the store:'],
      [/(هديه|هدايا|اهدي|gift)/, 'top-rated', 'اقتراحات هدايا من الأعلى تقييماً:', 'Gift ideas from our top rated:'], [/(تقييم|افضل|احسن|top|rated|best)/, 'top-rated', 'الأعلى تقييماً عند عملائنا:', 'Top rated by our customers:']];
    const hit = B.find(([r]) => r.test(nq));
    if (hit) { const l = within(await fromSource(hit[1], [], 24)); if (l.length) return { me: false, text: (cap ? t(`ضمن ${money(cap)}، `, `Within ${money(cap)}, `) : '') + t(hit[2], hit[3]), prods: l.slice(0, num(c.max_results, 6)) } as Msg; }
    // 3) a real catalogue search with the words left after removing the budget
    const words = q.replace(/[0-9٠-٩]+/g, '').replace(/(تحت|اقل من|أقل من|فوق|ريال|ر\.س|بـ|ابي|أبي|ابغى|أبغى|ودي|عندكم|فيه|عطني|under|over|i want|do you have)/gi, ' ').trim();
    if (bool(c.search_fallback, true) && words.length > 1) { const l = within(await search(words)); if (l.length) return { me: false, text: t(`لقيت لك ${l.length} منتج يناسب «${words}»:`, `I found ${l.length} for "${words}":`), prods: l.slice(0, num(c.max_results, 6)) } as Msg; }
    if (cap) { const l = within((await smart(c.products, 'best_selling', 30)).items); if (l.length) return { me: false, text: t(`هذي اختيارات ضمن ميزانيتك ${money(cap)}:`, `Picks within ${money(cap)}:`), prods: l.slice(0, num(c.max_results, 6)) } as Msg; }
    const wa = String(c.whatsapp || '').replace(/\D/g, '');
    return { me: false, text: L(c.fallback, t('ما لقيت شي مطابق 🙏 جرّب كلمة ثانية، أو كلّم فريقنا مباشرة.', 'Nothing matched 🙏 try other words or talk to our team.')), link: wa ? `https://wa.me/${wa}?text=${encodeURIComponent(q)}` : '', linkText: t('كلّمنا واتساب', 'Chat on WhatsApp') } as Msg;
  }
  private async send(q: string) {
    q = q.trim(); if (!q) return; this.input = ''; this.msgs = [...this.msgs, { me: true, text: q }]; this.typing = true;
    const [m] = await Promise.all([this.reply(q), new Promise((r) => setTimeout(r, num(this.c.typing_ms, 700)))]);
    this.typing = false; this.msgs = [...this.msgs, m];
  }
  private ui() {
    const c = this.c; const sug = [...list<R>(c.intents).map((x) => L(x.label)).filter(Boolean), ...csv(c.suggestions)];
    const chips = sug.length ? sug : [t('العروض', 'Deals'), t('الأكثر مبيعاً', 'Best sellers'), t('هدية تحت 200', 'Gift under 200'), t('وش الجديد؟', 'What is new?')];
    return html`<div class="chat" style=${`--ch:${num(c.height, 560)}px`}>
      <div class="top"><div class="av" style=${c.avatar ? `background-image:url("${c.avatar}")` : ''}>${c.avatar ? '' : '🤖'}</div><div><b>${this.botName()}</b><small>${L(c.status, t('متصل الآن · يرد فوراً', 'Online · replies instantly'))}</small></div></div>
      <div class="log" aria-live="polite">${this.msgs.map((m) => html`<div class="m ${m.me ? 'me' : 'bot'}">${m.text}
        ${m.prods?.length ? html`<div class="ps">${m.prods.map((p) => html`<a class="p" href=${p.url} @click=${() => seen(p)}><img src=${p.image} alt="" loading="lazy" /><span>${p.name}</span><b>${money(p.price)}</b></a>`)}</div>` : ''}
        ${m.link ? html`<a class="ml" href=${m.link} target="_blank" rel="noopener">${m.linkText || t('افتح', 'Open')} ←</a>` : ''}</div>`)}
        ${this.typing ? html`<div class="m bot"><span class="typing"><i></i><i></i><i></i></span></div>` : ''}</div>
      ${bool(c.show_suggestions, true) ? html`<div class="sug">${chips.slice(0, 8).map((s) => html`<button class="chip" @click=${() => this.send(s)}>${s}</button>`)}</div>` : ''}
      <form @submit=${(e: Event) => { e.preventDefault(); this.send(this.input); }}><input .value=${this.input} @input=${(e: Event) => (this.input = (e.target as HTMLInputElement).value)} placeholder=${L(c.placeholder, t('اكتب سؤالك… مثلاً: عطر تحت 300', 'Ask… e.g. perfume under 300'))} /><button class="btn" type="submit">${t('إرسال', 'Send')}</button></form>
    </div>`;
  }
  render() {
    if (opt(this.c.mode, 'inline') === 'floating') return this.hiddenNow() ? '' : html`<div class=${this.cls()} style=${this.vars()}>${this.open ? html`<div class="float">${this.ui()}</div>` : ''}<button class="fab" aria-label="chat" @click=${() => (this.open = !this.open)}>${this.open ? '×' : '💬'}</button></div>`;
    return this.shell(this.ui(), { eyebrow: t('مساعد التسوق', 'Shopping assistant'), title: t('اسألني عن أي شي في المتجر', 'Ask me anything about the store') });
  }
}
