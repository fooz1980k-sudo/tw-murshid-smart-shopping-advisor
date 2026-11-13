import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { Smart } from '../../shared/ui';
import { L, opt, num, bool, list, t } from '../../shared/salla';
import { mem, answer } from '../../shared/memory';

type R = Record<string, unknown>;
interface Row { size: string; hMin: number; hMax: number; wMin: number; wMax: number; length: string; note: string }
/** Size advisor from the merchant's own size chart: height + weight + fit preference -> size, confidence and length; remembers the answer for the shopper's next visit. */
export default class MurshidSize extends Smart {
  @state() private h = 160;
  @state() private w = 60;
  @state() private fit = 'regular';
  @state() private done = false;
  static styles = [Smart.base, css`
    .g { display: grid; grid-template-columns: 1fr 1fr; gap: calc(var(--gap) * 1.4); align-items: stretch; } @media (max-width: 860px) { .g { grid-template-columns: 1fr; } }
    .f { display: grid; gap: 18px; } .row { display: grid; gap: 8px; } .row label { display: flex; justify-content: space-between; font-weight: 800; }
    .row label b { color: var(--A); font-size: 20px; font-variant-numeric: tabular-nums; } input[type=range] { width: 100%; accent-color: var(--A); height: 28px; }
    .fits { display: flex; gap: 8px; flex-wrap: wrap; }
    .res { display: grid; place-items: center; text-align: center; gap: 8px; background: linear-gradient(160deg, color-mix(in srgb, var(--A) 16%, var(--CARD)), var(--CARD)); }
    .big { font-size: clamp(64px, 10vw, 110px); font-weight: 900; line-height: 1; color: var(--A); }
    .conf { display: inline-flex; gap: 8px; align-items: center; font-weight: 700; font-size: 14px; } .bar { width: 120px; height: 8px; border-radius: 9px; background: var(--LINE); overflow: hidden; } .bar i { display: block; height: 100%; background: var(--A); }
    .note { opacity: .75; line-height: 1.8; max-width: 380px; } .len { font-weight: 800; }
    .fig { font-size: 64px; opacity: .25; }
    table { width: 100%; border-collapse: collapse; margin-top: 18px; font-size: 14px; } td, th { padding: 8px; border-bottom: 1px solid var(--LINE); text-align: center; } tr.on td { background: color-mix(in srgb, var(--A) 16%, transparent); font-weight: 800; }
  `];
  willUpdate(ch: Map<string, unknown>) {
    if (!ch.has('config')) return;
    const a = mem().answers; if (bool(this.c.remember, true) && a.size_h) { this.h = Number(a.size_h); this.w = Number(a.size_w); this.fit = a.size_fit || 'regular'; this.done = true; }
    else { this.h = num(this.c.default_h, 160); this.w = num(this.c.default_w, 62); }
  }
  private rows(): Row[] { return list<R>(this.c.chart).map((r) => ({ size: L(r.size), hMin: num(r.h_min), hMax: num(r.h_max, 999), wMin: num(r.w_min), wMax: num(r.w_max, 999), length: L(r.length), note: L(r.note) })).filter((r) => r.size); }
  private calc(rows: Row[]) {
    if (!rows.length) return null;
    const d = (r: Row) => { const dh = this.h < r.hMin ? r.hMin - this.h : this.h > r.hMax ? this.h - r.hMax : 0; const dw = this.w < r.wMin ? r.wMin - this.w : this.w > r.wMax ? this.w - r.wMax : 0; return dw * num(this.c.weight_importance, 60) / 50 + dh * (100 - num(this.c.weight_importance, 60)) / 50; };
    let i = rows.map((r, k) => ({ k, d: d(r) })).sort((a, b) => a.d - b.d)[0].k;
    const base = rows[i]; const inH = this.h >= base.hMin && this.h <= base.hMax; const inW = this.w >= base.wMin && this.w <= base.wMax;
    if (this.fit === 'tight') i = Math.max(0, i - (inW && this.w - base.wMin < (base.wMax - base.wMin) / 3 ? 1 : 0));
    if (this.fit === 'loose') i = Math.min(rows.length - 1, i + (inW && base.wMax - this.w < (base.wMax - base.wMin) / 2 ? 1 : 0));
    const conf = inH && inW ? 92 : inH || inW ? 70 : 45;
    const edge = inW && (this.w - base.wMin < 2 || base.wMax - this.w < 2);
    return { i, row: rows[i], conf: edge ? conf - 15 : conf, edge };
  }
  render() {
    const c = this.c; const rows = this.rows(); const r = this.calc(rows); const hu = t('سم', 'cm'); const wu = t('كجم', 'kg');
    const save = () => { this.done = true; answer('size_h', String(this.h)); answer('size_w', String(this.w)); answer('size_fit', this.fit); };
    return this.shell(html`${this.hints([!rows.length && t('أضف جدول المقاسات من الإعدادات (المقاس، الطول، الوزن).', 'Add your size chart in the settings.')])}
      ${!r ? '' : html`<div class="g"><div class="panel f">
        <div class="row"><label>${t('طولك', 'Height')} <b>${this.h} ${hu}</b></label><input type="range" min=${num(c.h_from, 140)} max=${num(c.h_to, 195)} .value=${String(this.h)} @input=${(e: Event) => { this.h = +(e.target as HTMLInputElement).value; this.done = false; }} /></div>
        <div class="row"><label>${t('وزنك', 'Weight')} <b>${this.w} ${wu}</b></label><input type="range" min=${num(c.w_from, 40)} max=${num(c.w_to, 130)} .value=${String(this.w)} @input=${(e: Event) => { this.w = +(e.target as HTMLInputElement).value; this.done = false; }} /></div>
        ${bool(c.ask_fit, true) ? html`<div class="row"><label>${t('كيف تحب اللبسة؟', 'Preferred fit')}</label><div class="fits">${[['tight', t('ضيّقة', 'Fitted')], ['regular', t('عادية', 'Regular')], ['loose', t('واسعة', 'Loose')]].map(([k, l]) => html`<button class="chip ${this.fit === k ? 'on' : ''}" @click=${() => { this.fit = k; this.done = false; }}>${l}</button>`)}</div></div>` : ''}
        <button class="btn" @click=${save}>${t('احسب مقاسي', 'Find my size')}</button>
        ${bool(c.show_table, true) ? html`<table><tr><th>${t('المقاس', 'Size')}</th><th>${t('الطول', 'Height')}</th><th>${t('الوزن', 'Weight')}</th>${rows.some((x) => x.length) ? html`<th>${L(c.length_label, t('الطول المناسب', 'Length'))}</th>` : ''}</tr>
          ${rows.map((x, k) => html`<tr class=${this.done && k === r.i ? 'on' : ''}><td>${x.size}</td><td>${x.hMin}–${x.hMax}</td><td>${x.wMin}–${x.wMax}</td>${rows.some((y) => y.length) ? html`<td>${x.length}</td>` : ''}</tr>`)}</table>` : ''}
      </div>
      <div class="panel res">${this.done ? html`<span class="muted">${t('مقاسك المقترح', 'Your size')}</span><div class="big">${r.row.size}</div>
          ${r.row.length ? html`<div class="len">${L(c.length_label, t('الطول المناسب', 'Length'))}: ${r.row.length}</div>` : ''}
          ${bool(c.show_confidence, true) ? html`<div class="conf">${t('دقة الترشيح', 'Confidence')} <span class="bar"><i style=${`width:${r.conf}%`}></i></span> ${r.conf}%</div>` : ''}
          ${r.edge ? html`<p class="note">${t('أنت على حدود مقاسين؛ لو تحب الراحة خذ الأكبر.', 'You are between two sizes; size up for comfort.')}</p>` : ''}
          ${r.row.note ? html`<p class="note">${r.row.note}</p>` : ''}${L(c.footer) ? html`<p class="note">${L(c.footer)}</p>` : ''}
          ${c.link ? html`<a class="btn" href=${String(c.link)}>${L(c.button, t('تسوّق مقاسك', 'Shop your size'))}</a>` : ''}`
        : html`<div class="fig">📏</div><p class="note">${t('حرّك المؤشرات واضغط «احسب مقاسي»', 'Move the sliders and tap «Find my size»')}</p>`}</div></div>`}`,
      { eyebrow: t('مستشار المقاس', 'Size advisor'), title: t('مقاسك الصح من أول مرة', 'Your right size, first time') });
  }
}
