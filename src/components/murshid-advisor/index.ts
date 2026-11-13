import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { Smart } from '../../shared/ui';
import { L, opt, num, bool, list, t, isEn, ids, byIds, smart, money, csv, addToCart, toast, type Prod } from '../../shared/salla';
import { answer, mem, rank, tag } from '../../shared/memory';

type R = Record<string, unknown>;
interface Opt_ { label: string; emoji: string; image: string; prods: number[]; tags: string[]; weight: number; test?: (p: Prod) => number }
interface Q { text: string; hint: string; multi: boolean; opts: Opt_[] }
/** Shopping advisor: 3–6 questions, every answer scores real store products; the result explains WHY each product fits. With no setup it builds its own quiz from the store's real prices, ratings, sales and categories. */
export default class MurshidAdvisor extends Smart {
  @state() private qs: Q[] = [];
  @state() private step = 0;
  @state() private picks: number[][] = [];
  @state() private pool: Prod[] = [];
  @state() private auto = false;
  @state() private result: { p: Prod; score: number; why: string[] }[] | null = null;
  private seq = 0;
  static styles = [Smart.base, css`
    .q { display: grid; grid-template-columns: var(--side, 1fr); gap: calc(var(--gap) * 1.5); align-items: stretch; }
    .q.split { --side: 1fr 1.3fr; } @media (max-width: 860px) { .q.split { --side: 1fr; } .q.split .art { display: none; } }
    .art { border-radius: var(--r); overflow: hidden; min-height: 320px; background: #8882 center/cover; }
    .prog { display: flex; gap: 6px; margin-bottom: 18px; } .prog i { flex: 1; height: 6px; border-radius: 9px; background: var(--LINE); overflow: hidden; } .prog i.on { background: var(--A); }
    .dots { display: flex; gap: 8px; margin-bottom: 18px; } .dots i { width: 10px; height: 10px; border-radius: 50%; background: var(--LINE); } .dots i.on { background: var(--A); width: 28px; border-radius: 9px; }
    .num { font-size: 13px; font-weight: 800; color: var(--A); margin-bottom: 8px; letter-spacing: .1em; }
    h3 { margin: 0 0 6px; font-size: clamp(22px, 3vw, 34px); line-height: 1.3; } .hint { margin: 0 0 20px; opacity: .65; }
    .opts { display: grid; gap: 12px; grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr)); }
    .o { all: unset; cursor: pointer; display: grid; gap: 8px; align-content: start; padding: 16px; border-radius: calc(var(--r) * .8); background: var(--CARD); border: 2px solid var(--LINE); transition: all .25s; box-shadow: var(--sh); position: relative; }
    .o:hover { border-color: var(--A); transform: translateY(-3px); } .o.on { border-color: var(--A); background: color-mix(in srgb, var(--A) 10%, var(--CARD)); }
    .o .e { font-size: 30px; } .o img { width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 12px; } .o b { font-size: 16px; } .o small { opacity: .6; font-size: 12px; }
    .o.on::after { content: '✓'; position: absolute; top: 10px; inset-inline-end: 12px; width: 26px; height: 26px; display: grid; place-items: center; border-radius: 50%; background: var(--A); color: #fff; font-weight: 800; }
    .nav { display: flex; justify-content: space-between; margin-top: 20px; gap: 10px; }
    .res-head { display: flex; justify-content: space-between; align-items: end; gap: 12px; flex-wrap: wrap; margin-bottom: 18px; }
    .res-head h3 { margin: 0; } .ans { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; } .ans span { font-size: 12px; padding: 4px 10px; border-radius: 999px; background: color-mix(in srgb, var(--A) 14%, transparent); }
    .match { position: absolute; top: 10px; inset-inline-start: 10px; background: #111d; color: #fff; font-weight: 800; font-size: 12px; padding: 5px 10px; border-radius: 999px; backdrop-filter: blur(4px); }
    .why { font-size: 12px; opacity: .75; line-height: 1.6; } .why b { color: var(--A); }
    .acts { display: flex; gap: 10px; flex-wrap: wrap; }
  `];
  willUpdate(ch: Map<string, unknown>) { if (ch.has('config')) this.setup(); }
  private async setup() {
    const n = ++this.seq; const c = this.c;
    const qText = list<R>(c.questions); const opts = list<R>(c.options);
    let qs: Q[] = [];
    if (opts.length && !bool(c.force_auto)) {
      qs = qText.map((q, i) => ({ text: L(q.text), hint: L(q.hint), multi: bool(q.multi), opts: opts.filter((o) => num(opt(o.step, '1'), 1) === i + 1).map((o) => ({ label: L(o.label), emoji: L(o.emoji), image: String(o.image || ''), prods: ids(o.products), tags: csv(o.tags), weight: num(o.weight, 3) })) })).filter((q) => q.text && q.opts.length);
      const all = [...new Set(opts.flatMap((o) => ids(o.products)))]; const pool = await byIds(all);
      if (n === this.seq) { this.pool = pool; this.qs = qs; this.auto = false; }
      return;
    }
    // Auto-setup: a quiz built from this store's real data.
    const pool = (await smart(c.products, opt(c.auto_source, 'best_selling'), num(c.pool, 24))).items.filter((p) => p.available);
    const prices = pool.map((p) => p.price).sort((a, b) => a - b);
    const q = (f: number) => prices[Math.min(prices.length - 1, Math.floor(prices.length * f))] ?? 0;
    const [b1, b2] = [Math.round(q(0.34)), Math.round(q(0.67))];
    const cats = [...new Set(pool.map((p) => p.category).filter(Boolean))].slice(0, 6);
    const en = isEn();
    qs.push({ text: t('كم ميزانيتك تقريباً؟', 'What is your budget?'), hint: t('الأسعار من منتجات المتجر الفعلية', 'Ranges come from real store prices'), multi: false, opts: [
      { label: t(`أقل من ${b1}`, `Under ${b1}`), emoji: '💚', image: '', prods: [], tags: [], weight: 4, test: (p) => (p.price <= b1 ? 1 : 0) },
      { label: `${b1} – ${b2}`, emoji: '💛', image: '', prods: [], tags: [], weight: 4, test: (p) => (p.price > b1 && p.price <= b2 ? 1 : 0) },
      { label: t(`أكثر من ${b2}`, `Over ${b2}`), emoji: '💎', image: '', prods: [], tags: [], weight: 4, test: (p) => (p.price > b2 ? 1 : 0) }] });
    if (cats.length > 1) qs.push({ text: t('وش تدوّر عليه؟', 'What are you looking for?'), hint: t('تقدر تختار أكثر من قسم', 'Pick one or more'), multi: true, opts: cats.map((cat) => ({ label: cat, emoji: '🏷️', image: pool.find((p) => p.category === cat)?.image ?? '', prods: [], tags: [cat], weight: 5, test: (p: Prod) => (p.category === cat ? 1 : 0) })) });
    qs.push({ text: t('وش أهم شي عندك؟', 'What matters most?'), hint: '', multi: false, opts: [
      { label: t('أفضل سعر وخصم', 'Best price & deal'), emoji: '🏷️', image: '', prods: [], tags: [], weight: 3, test: (p) => p.discount / 30 },
      { label: t('الأعلى تقييماً', 'Top rated'), emoji: '⭐', image: '', prods: [], tags: [], weight: 3, test: (p) => Math.max(0, (p.rating - 3.5) / 1.5) },
      { label: t('الأكثر طلباً', 'Most ordered'), emoji: '🔥', image: '', prods: [], tags: [], weight: 3, test: (p) => (p.sold != null ? Math.min(1, p.sold / Math.max(1, ...pool.map((x) => x.sold ?? 0))) : 0) },
      { label: t('مفاجئني', 'Surprise me'), emoji: '🎁', image: '', prods: [], tags: [], weight: 1, test: () => 0.5 }] });
    void en;
    if (n === this.seq) { this.pool = pool; this.qs = qs; this.auto = true; }
  }
  private choose(i: number) {
    const q = this.qs[this.step]; const cur = this.picks[this.step] ?? [];
    const next = q.multi ? (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]) : [i];
    this.picks = Object.assign([...this.picks], { [this.step]: next });
    answer(`q${this.step}`, q.opts[i].label); q.opts[i].tags.forEach((x) => tag(x, 2));
    if (!q.multi && bool(this.c.auto_advance, true)) setTimeout(() => this.next(), 280);
  }
  private next() { if (this.step < this.qs.length - 1) this.step++; else this.finish(); }
  private finish() {
    const scored = new Map<number, { score: number; why: string[] }>(); let max = 0;
    this.qs.forEach((q, qi) => { max += Math.max(...q.opts.map((o) => o.weight)); (this.picks[qi] ?? []).forEach((oi) => { const o = q.opts[oi];
      for (const p of this.pool) { const hit = o.test ? o.test(p) : o.prods.includes(p.id) ? 1 : 0; if (hit > 0) { const s = scored.get(p.id) ?? { score: 0, why: [] }; s.score += hit * o.weight; s.why.push(o.label); scored.set(p.id, s); } } }); });
    const m = mem();
    const ranked = rank(this.pool.filter((p) => scored.has(p.id) && (!bool(this.c.hide_oos, true) || p.available)), bool(this.c.personalize, true))
      .map((p) => ({ p, ...scored.get(p.id)! })).sort((a, b) => b.score - a.score || (b.p.rating - a.p.rating)).slice(0, num(this.c.results, 4));
    void m;
    this.result = ranked.map((r) => ({ ...r, score: Math.min(100, Math.round((r.score / Math.max(1, max)) * 100)) }));
  }
  private reset() { this.step = 0; this.picks = []; this.result = null; }
  private async addAll() { if (!this.result) return; for (const r of this.result) if (r.p.available) await addToCart(r.p.id); toast(t('أضفنا الترشيحات للسلة', 'Added the picks to your cart')); }
  render() {
    const c = this.c; const Q = this.qs[this.step];
    const answers = this.qs.flatMap((q, i) => (this.picks[i] ?? []).map((o) => q.opts[o].label));
    const style = opt(c.progress, 'bar'); const lay = opt(c.layout, 'split') === 'split' && c.side_image ? 'split' : '';
    const prog = style === 'dots' ? html`<div class="dots">${this.qs.map((_, i) => html`<i class=${i <= this.step ? 'on' : ''}></i>`)}</div>` : style === 'bar' ? html`<div class="prog">${this.qs.map((_, i) => html`<i class=${i <= this.step ? 'on' : ''}></i>`)}</div>` : '';
    let body;
    if (!this.qs.length) body = html`<div class="skel"></div>`;
    else if (this.result) {
      const msg = L(c.result_message, t('بناءً على اختياراتك، هذي أنسب المنتجات لك من متجرنا:', 'Based on your answers, these fit you best:'));
      body = html`<div class="res-head"><div><h3>${L(c.result_title, t('ترشيحاتنا لك ✨', 'Your picks ✨'))}</h3><p class="hint" style="margin:6px 0 0">${msg}</p>
          ${bool(c.show_answers, true) ? html`<div class="ans">${answers.map((a) => html`<span>${a}</span>`)}</div>` : ''}</div>
        <div class="acts">${bool(c.add_all, true) && this.result.length ? html`<button class="btn" @click=${this.addAll}>${t('أضف الكل للسلة', 'Add all to cart')}</button>` : ''}
          ${bool(c.share, true) ? html`<a class="btn ghost" target="_blank" rel="noopener" href=${`https://wa.me/?text=${encodeURIComponent(this.result.map((r) => `${r.p.name} ${r.p.url}`).join('\n'))}`}>${t('شارك عبر واتساب', 'Share on WhatsApp')}</a>` : ''}
          <button class="btn ghost" @click=${this.reset}>${t('أعد الاختبار', 'Retake')}</button></div></div>
        ${this.result.length ? html`<div class="grid" style=${`--cols:${Math.min(4, num(c.results, 4))}`}>${this.result.map((r) => html`<div style="position:relative">${this.card(r.p, { extra: bool(c.show_reasons, true) ? html`<div class="why"><b>${t('يناسبك لأن:', 'Fits because:')}</b> ${[...new Set(r.why)].join(' · ')}</div>` : '' })}
          ${bool(c.show_match, true) ? html`<span class="match">${t('تطابق', 'Match')} ${r.score}%</span>` : ''}</div>`)}</div>`
          : html`<p class="hint">${t('ما لقينا تطابق كامل، جرّب خيارات ثانية.', 'No exact match, try other answers.')}</p>`}`;
    } else {
      const cur = this.picks[this.step] ?? [];
      body = html`<div class="q ${lay}">${lay ? html`<div class="art" style=${`background-image:url("${c.side_image}")`}></div>` : ''}
        <div class="panel">${prog}<div class="num">${style === 'numbers' || style === 'bar' ? `${this.step + 1} / ${this.qs.length}` : ''}</div>
        <h3>${Q.text}</h3>${Q.hint ? html`<p class="hint">${Q.hint}</p>` : html`<p class="hint">${Q.multi ? t('اختر واحد أو أكثر', 'Choose one or more') : ''}</p>`}
        <div class="opts">${Q.opts.map((o, i) => html`<button class="o ${cur.includes(i) ? 'on' : ''}" @click=${() => this.choose(i)}>${o.image && bool(c.option_images, true) ? html`<img src=${o.image} alt="" />` : html`<span class="e">${o.emoji}</span>`}<b>${o.label}</b></button>`)}</div>
        <div class="nav">${this.step > 0 && bool(c.allow_back, true) ? html`<button class="btn ghost" @click=${() => this.step--}>${t('السابق', 'Back')}</button>` : html`<span></span>`}
          ${(Q.multi || !bool(c.auto_advance, true)) ? html`<button class="btn" ?disabled=${!cur.length} @click=${() => this.next()}>${this.step === this.qs.length - 1 ? t('اعرض النتيجة', 'See results') : t('التالي', 'Next')}</button>` : ''}</div></div></div>`;
    }
    return this.shell(html`${this.hints([this.auto && t('الاختبار مبني تلقائياً من أسعار وتقييمات ومبيعات وأقسام متجرك. أضف أسئلتك وخياراتك لتخصيصه.', 'This quiz is auto-built from your store data. Add your own questions to customise it.')])}${body}`,
      { eyebrow: t('المستشار الذكي', 'Smart advisor'), title: t('محتار؟ جاوب 3 أسئلة ونختار لك', 'Not sure? Answer 3 questions'), sub: '' });
  }
}
