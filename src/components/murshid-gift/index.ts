import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { Smart } from '../../shared/ui';
import { L, opt, num, bool, list, t, ids, byIds, smart, money, type Prod } from '../../shared/salla';
import { rank, tag } from '../../shared/memory';

type R = Record<string, unknown>;
interface G { label: string; emoji: string; prods: number[]; cat?: string }
/** Gift finder: who is it for, what is the occasion, how much to spend: real store products filtered live, plus a gift card message that travels with the order. */
export default class MurshidGift extends Smart {
  @state() private pool: Prod[] = [];
  @state() private who: G[] = [];
  @state() private occ: G[] = [];
  @state() private w = -1;
  @state() private o = -1;
  @state() private budget = 0;
  @state() private note = '';
  @state() private auto = false;
  private seq = 0;
  static styles = [Smart.base, css`
    .lay { display: grid; grid-template-columns: 380px 1fr; gap: calc(var(--gap) * 1.4); align-items: start; }
    @media (max-width: 960px) { .lay { grid-template-columns: 1fr; } .side { position: static !important; } }
    .side { position: sticky; top: 90px; display: grid; gap: 18px; }
    .lbl { font-weight: 800; font-size: 14px; margin-bottom: 10px; display: flex; justify-content: space-between; }
    .chips { display: flex; flex-wrap: wrap; gap: 8px; }
    input[type=range] { width: 100%; accent-color: var(--A); }
    .card { position: relative; border-radius: 18px; padding: 20px; min-height: 150px; background: linear-gradient(135deg, var(--gc1, #fdf3e3), var(--gc2, #f4e1c4)); color: #3b2a14; box-shadow: var(--sh); overflow: hidden; }
    .card::before { content: '🎀'; position: absolute; top: -8px; inset-inline-end: 14px; font-size: 40px; }
    .card textarea { width: 100%; min-height: 80px; border: 0; background: transparent; font: inherit; font-size: 16px; resize: none; color: inherit; outline: none; line-height: 1.8; }
    .card small { opacity: .6; } .cnt { font-size: 13px; opacity: .7; margin-bottom: 12px; }
    .empty { padding: 40px; text-align: center; opacity: .7; }
  `];
  willUpdate(ch: Map<string, unknown>) { if (ch.has('config')) this.load(); }
  private async load() {
    const n = ++this.seq; const c = this.c;
    const map = (x: R): G => ({ label: L(x.label), emoji: L(x.emoji, '🎁'), prods: ids(x.products) });
    let who = list<R>(c.recipients).map(map).filter((x) => x.label); const occ = list<R>(c.occasions).map(map).filter((x) => x.label);
    const linked = [...new Set([...who, ...occ].flatMap((g) => g.prods))];
    let pool = linked.length ? await byIds(linked) : [];
    let auto = false;
    if (!pool.length || bool(c.include_auto, true)) { const extra = (await smart(c.products, opt(c.auto_source, 'top-rated'), num(c.pool, 24))).items; pool = [...pool, ...extra.filter((p) => !pool.some((x) => x.id === p.id))]; auto = !linked.length; }
    if (!who.length) { auto = true; who = [...new Set(pool.map((p) => p.category).filter(Boolean))].slice(0, 6).map((cat) => ({ label: cat, emoji: '🎁', prods: [], cat })); }
    if (n !== this.seq) return;
    this.pool = pool.filter((p) => p.available); this.who = who; this.occ = occ; this.auto = auto;
    this.budget = Math.ceil(Math.max(0, ...this.pool.map((p) => p.price)));
  }
  private found(): Prod[] {
    const W = this.who[this.w]; const O = this.occ[this.o];
    const hit = (g: G | undefined, p: Prod) => !g || (g.cat ? p.category === g.cat : g.prods.includes(p.id));
    const l = this.pool.filter((p) => hit(W, p) && hit(O, p) && p.price <= this.budget);
    const sort = opt(this.c.sort, 'smart');
    const s = sort === 'price_asc' ? l.sort((a, b) => a.price - b.price) : sort === 'price_desc' ? l.sort((a, b) => b.price - a.price) : sort === 'rating' ? l.sort((a, b) => b.rating - a.rating) : rank(l, bool(this.c.personalize, true));
    return s.slice(0, num(this.c.results, 8));
  }
  render() {
    const c = this.c; const max = Math.ceil(Math.max(1, ...this.pool.map((p) => p.price))); const min = Math.floor(Math.min(...this.pool.map((p) => p.price), max));
    const res = this.found(); const noteOn = bool(c.gift_note, true); const lim = num(c.note_max, 160);
    return this.shell(html`
      ${this.hints([this.auto && t('لم تضف «لمين الهدية»؛ نعرض أقسام متجرك تلقائياً. أضف أشخاصاً ومناسبات واربطهم بمنتجات.', 'No recipients yet: using your categories. Add recipients and occasions.')])}
      ${!this.pool.length ? html`<div class="skel"></div>` : html`<div class="lay"><div class="side">
        <div class="panel"><div class="lbl">${L(c.who_label, t('لمين الهدية؟', 'Who is it for?'))}</div><div class="chips">${this.who.map((g, i) => html`<button class="chip ${i === this.w ? 'on' : ''}" @click=${() => { this.w = i === this.w ? -1 : i; tag(g.label); }}>${g.emoji} ${g.label}</button>`)}</div></div>
        ${this.occ.length ? html`<div class="panel"><div class="lbl">${L(c.occ_label, t('وش المناسبة؟', 'What is the occasion?'))}</div><div class="chips">${this.occ.map((g, i) => html`<button class="chip ${i === this.o ? 'on' : ''}" @click=${() => (this.o = i === this.o ? -1 : i)}>${g.emoji} ${g.label}</button>`)}</div></div>` : ''}
        ${bool(c.show_budget, true) ? html`<div class="panel"><div class="lbl"><span>${L(c.budget_label, t('الميزانية', 'Budget'))}</span><span>${t('حتى', 'up to')} ${money(this.budget)}</span></div>
          <input type="range" min=${min} max=${max} step=${Math.max(1, Math.round((max - min) / 40))} .value=${String(this.budget)} @input=${(e: Event) => (this.budget = Number((e.target as HTMLInputElement).value))} /></div>` : ''}
        ${noteOn ? html`<div class="card" style=${`--gc1:${c.card_color1 || '#fdf3e3'};--gc2:${c.card_color2 || '#f4e1c4'}`}><small>${L(c.note_title, t('بطاقة الإهداء', 'Gift card'))}</small>
          <textarea maxlength=${lim} placeholder=${L(c.note_placeholder, t('اكتب رسالتك هنا… نرفقها مع الهدية', 'Write your message… we attach it to the gift'))} .value=${this.note} @input=${(e: Event) => (this.note = (e.target as HTMLTextAreaElement).value)}></textarea><small>${this.note.length}/${lim}</small></div>` : ''}
      </div><div>
        <div class="cnt">${t(`${res.length} هدية تناسب اختيارك`, `${res.length} gifts match`)}</div>
        ${res.length ? html`<div class="grid" style=${`--cols:${num(c.cols, 3)};--mcols:2`}>${res.map((p) => html`<div>${this.card(p, { quick: false, extra: html`<button class="btn sm" @click=${() => this.add(p, 1, noteOn && this.note ? `${t('رسالة إهداء', 'Gift message')}: ${this.note}` : undefined)}>${t('اختر كهدية 🎁', 'Choose as gift 🎁')}</button>` })}</div>`)}</div>`
          : html`<div class="panel empty">${t('ما فيه هدايا بهذي الميزانية، زِد الميزانية شوي.', 'No gifts in this budget; raise it a little.')}</div>`}
      </div></div>`}`,
      { eyebrow: t('محدد الهدايا', 'Gift finder'), title: t('الهدية الصح… بثلاث ضغطات', 'The right gift in three taps') });
  }
}
