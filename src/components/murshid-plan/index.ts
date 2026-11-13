import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { Smart } from '../../shared/ui';
import { L, opt, num, bool, list, t, ids, byIds, smart, money, addToCart, toast, type Prod } from '../../shared/salla';
import { tag } from '../../shared/memory';

type R = Record<string, unknown>;
interface Need { label: string; emoji: string; desc: string; tip: string; prods: number[]; cat: string }
/** «Your plan»: the shopper ticks what they need; the block merges the matching real products, ranks those that cover several needs first, and lays them out as numbered steps with a live total. */
export default class MurshidPlan extends Smart {
  @state() private needs: Need[] = [];
  @state() private on: number[] = [];
  @state() private pool: Prod[] = [];
  @state() private auto = false;
  @state() private skip: number[] = [];
  private seq = 0;
  static styles = [Smart.base, css`
    .needs { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 210px), 1fr)); gap: 12px; margin-bottom: 24px; }
    .n { all: unset; cursor: pointer; padding: 16px; border-radius: calc(var(--r) * .8); background: var(--CARD); border: 2px solid var(--LINE); display: grid; gap: 6px; transition: all .25s; box-shadow: var(--sh); }
    .n:hover { border-color: var(--A); } .n.on { border-color: var(--A); background: color-mix(in srgb, var(--A) 10%, var(--CARD)); } .n .e { font-size: 28px; } .n small { opacity: .65; line-height: 1.6; }
    .steps { display: grid; gap: 12px; counter-reset: s; }
    .st { display: grid; grid-template-columns: 44px 90px 1fr auto; gap: 14px; align-items: center; padding: 12px; border-radius: calc(var(--r) * .8); background: var(--CARD); box-shadow: var(--sh); }
    .st.off { opacity: .45; } .st::before { counter-increment: s; content: counter(s); width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; background: var(--A); color: #fff; font-weight: 800; }
    .st img { width: 90px; height: 90px; object-fit: cover; border-radius: 14px; } .st a { color: inherit; font-weight: 800; text-decoration: none; }
    .covers { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px; } .covers span { font-size: 11px; padding: 3px 9px; border-radius: 999px; background: color-mix(in srgb, var(--A) 14%, transparent); }
    .tip { font-size: 13px; opacity: .7; margin-top: 4px; } .tot { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-top: 18px; } .tot b { font-size: 24px; color: var(--A); }
    @media (max-width: 640px) { .st { grid-template-columns: 40px 70px 1fr; } .st img { width: 70px; height: 70px; } .st .x { grid-column: 1 / -1; } }
  `];
  willUpdate(ch: Map<string, unknown>) { if (ch.has('config')) this.load(); }
  private async load() {
    const n = ++this.seq; const c = this.c;
    let needs = list<R>(c.needs).map((x) => ({ label: L(x.label), emoji: L(x.emoji, '✨'), desc: L(x.desc), tip: L(x.tip), prods: ids(x.products), cat: '' })).filter((x) => x.label);
    let pool = needs.length ? await byIds([...new Set(needs.flatMap((x) => x.prods))]) : [];
    let auto = false;
    if (!needs.length) { auto = true; pool = (await smart(c.products, opt(c.auto_source, 'best_selling'), 24)).items; needs = [...new Set(pool.map((p) => p.category).filter(Boolean))].slice(0, 8).map((cat) => ({ label: cat, emoji: '✨', desc: '', tip: '', prods: [], cat })); }
    if (n === this.seq) { this.needs = needs; this.pool = pool.filter((p) => p.available || !bool(c.hide_oos, true)); this.auto = auto; this.on = bool(c.preselect_first, false) && needs.length ? [0] : []; }
  }
  render() {
    const c = this.c; const N = this.needs;
    const covers = (p: Prod) => this.on.filter((i) => (N[i].cat ? p.category === N[i].cat : N[i].prods.includes(p.id)));
    const plan = this.pool.map((p) => ({ p, cv: covers(p) })).filter((x) => x.cv.length).sort((a, b) => b.cv.length - a.cv.length || b.p.rating - a.p.rating);
    const perNeed = num(c.per_need, 2); const picked: typeof plan = []; const count = new Map<number, number>();
    for (const x of plan) { if (x.cv.some((i) => (count.get(i) ?? 0) < perNeed)) { picked.push(x); x.cv.forEach((i) => count.set(i, (count.get(i) ?? 0) + 1)); } }
    const live = picked.filter((x) => !this.skip.includes(x.p.id));
    const total = live.reduce((s, x) => s + x.p.price, 0);
    const addAll = async () => { for (const x of live) if (x.p.available) await addToCart(x.p.id); toast(t('أضفنا خطتك للسلة', 'Your plan was added to the cart')); };
    return this.shell(html`${this.hints([this.auto && t('لم تضف احتياجات؛ نعرض أقسام متجرك كاحتياجات تلقائياً.', 'No needs yet: using your categories.')])}
      <div class="needs">${N.map((x, i) => html`<button class="n ${this.on.includes(i) ? 'on' : ''}" @click=${() => { this.on = this.on.includes(i) ? this.on.filter((k) => k !== i) : [...this.on, i]; tag(x.label, 2); }}><span class="e">${x.emoji}</span><b>${x.label}</b>${x.desc ? html`<small>${x.desc}</small>` : ''}</button>`)}</div>
      ${!this.on.length ? html`<p class="muted center">${L(c.empty_text, t('اختر احتياجاتك وتطلع لك خطة متكاملة من منتجاتنا 👆', 'Pick your needs to get a complete plan 👆'))}</p>` : html`<div class="steps">${picked.map((x) => html`<div class="st ${this.skip.includes(x.p.id) ? 'off' : ''}">
          <img src=${x.p.image} alt="" loading="lazy" /><div><a href=${x.p.url}>${x.p.name}</a> · <b style="color:var(--A)">${money(x.p.price)}</b>
          ${bool(c.show_covers, true) ? html`<div class="covers">${x.cv.map((i) => html`<span>${N[i].emoji} ${N[i].label}</span>`)}${x.cv.length > 1 ? html`<span>⭐ ${t(`يغطي ${x.cv.length} احتياجات`, `covers ${x.cv.length} needs`)}</span>` : ''}</div>` : ''}
          ${bool(c.show_tips, true) && N[x.cv[0]].tip ? html`<div class="tip">💡 ${N[x.cv[0]].tip}</div>` : ''}</div>
          <button class="chip x" @click=${() => (this.skip = this.skip.includes(x.p.id) ? this.skip.filter((k) => k !== x.p.id) : [...this.skip, x.p.id])}>${this.skip.includes(x.p.id) ? t('أرجعه', 'Restore') : t('عندي', 'I have it')}</button></div>`)}</div>
        <div class="tot panel"><div>${t('مجموع خطتك', 'Plan total')} · ${live.length} ${t('منتج', 'items')}<br /><b>${money(total)}</b></div><button class="btn" ?disabled=${!live.length} @click=${addAll}>${L(c.button, t('أضف الخطة كاملة للسلة', 'Add the whole plan'))}</button></div>`}`,
      { eyebrow: t('خطتك', 'Your plan'), title: t('وش تحتاج؟ نرتّبها لك خطوة بخطوة', 'What do you need? We plan it step by step') });
  }
}
