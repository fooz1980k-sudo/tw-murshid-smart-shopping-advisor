import { LitElement as F, nothing as S, html as n, css as D } from "lit";
import { property as L, state as y } from "lit/decorators.js";
const u = () => window.salla ?? window.Salla, B = async () => {
  var r, t;
  try {
    await ((t = (r = u()) == null ? void 0 : r.onReady) == null ? void 0 : t.call(r));
  } catch {
  }
}, R = () => {
  var r, t, e, i, a;
  try {
    const s = ((t = (r = u()) == null ? void 0 : r.lang) == null ? void 0 : t.locale) ?? ((a = (i = (e = u()) == null ? void 0 : e.config) == null ? void 0 : i.get) == null ? void 0 : a.call(i, "user.language_code"));
    if (typeof s == "string" && s) return s.slice(0, 2);
  } catch {
  }
  return (document.documentElement.lang || "ar").slice(0, 2);
}, j = () => R() === "en", o = (r, t) => j() ? t : r, h = (r, t = "") => {
  if (r == null) return t;
  if (typeof r == "string") {
    const e = r.trim();
    if (e.startsWith("{") && e.endsWith("}"))
      try {
        return h(JSON.parse(e), t);
      } catch {
      }
    return e || t;
  }
  if (typeof r == "number" || typeof r == "boolean") return String(r);
  if (typeof r == "object") {
    const e = r, i = e[R()] ?? e.ar ?? e.en ?? Object.values(e).find((a) => typeof a == "string" && a);
    return typeof i == "string" && i.trim() ? i : t;
  }
  return t;
}, x = (r, t = "") => {
  const e = Array.isArray(r) ? r[0] : r, i = typeof e == "object" && e ? e.value : e;
  return i == null || i === "" ? t : String(i);
}, d = (r, t = 0) => {
  const e = Number(r);
  return r === "" || r == null || !Number.isFinite(e) ? t : e;
}, f = (r, t = !1) => r == null || r === "" ? t : r === !0 || r === "true" || r === 1 || r === "1", O = (r) => Array.isArray(r) ? r : [], N = (r) => {
  var t, e;
  try {
    const i = (e = (t = u()) == null ? void 0 : t.money) == null ? void 0 : e.call(t, r);
    if (i) return String(i);
  } catch {
  }
  return `${Math.round(r * 100) / 100} ${o("ر.س", "SAR")}`;
};
async function P(r, t = 1, e) {
  var i, a, s;
  await B();
  try {
    return await ((s = (a = (i = u()) == null ? void 0 : i.cart) == null ? void 0 : a.addItem) == null ? void 0 : s.call(a, e ? { id: r, quantity: t, notes: e } : { id: r, quantity: t })), !0;
  } catch {
    return !1;
  }
}
function W(r, t = !0) {
  var e, i, a;
  try {
    (a = t ? (e = u()) == null ? void 0 : e.success : (i = u()) == null ? void 0 : i.error) == null || a(r);
  } catch {
  }
}
const H = (r, t) => {
  var e, i, a;
  try {
    (a = (i = (e = u()) == null ? void 0 : e.event) == null ? void 0 : i.on) == null || a.call(i, r, t);
  } catch {
  }
}, v = "tw_smart_mem_v1", E = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
function z() {
  try {
    return { ...E(), ...JSON.parse(localStorage.getItem(v) || "{}") };
  } catch {
    return E();
  }
}
function Y(r) {
  try {
    localStorage.setItem(v, JSON.stringify(r));
  } catch {
  }
}
function $(r) {
  const t = z();
  return r(t), Y(t), t;
}
function T() {
  let r = !1;
  try {
    r = !sessionStorage.getItem(v), sessionStorage.setItem(v, "1");
  } catch {
  }
  return r ? $((t) => {
    t.visits += 1, t.last = Date.now();
  }) : z();
}
const k = (r, t = 1) => $((e) => {
  e.seen[r.id] = (e.seen[r.id] || 0) + t, e.prices = [...e.prices.slice(-29), r.price], r.category && (e.tags[r.category] = (e.tags[r.category] || 0) + t);
}), A = (r, t) => $((e) => {
  e.answers[r] = t;
});
let G = !1;
function q() {
  G || (G = !0, H("cart::item.added", (r) => {
    var e;
    const t = Number(((e = r == null ? void 0 : r.data) == null ? void 0 : e.product_id) ?? 0);
    t && $((i) => {
      i.carted.includes(t) || (i.carted = [...i.carted.slice(-40), t]);
    });
  }));
}
const J = () => {
  const r = innerWidth, t = navigator.userAgent;
  return /iPad|Tablet/i.test(t) || r >= 700 && r < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(t) || r < 700 ? "mobile" : "desktop";
}, U = () => {
  try {
    return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
  } catch {
    return !0;
  }
};
var K = Object.defineProperty, X = (r, t, e, i) => {
  for (var a = void 0, s = r.length - 1, l; s >= 0; s--)
    (l = r[s]) && (a = l(t, e, a) || a);
  return a && K(t, e, a), a;
};
const Q = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" }, I = /* @__PURE__ */ new Set();
function V(r) {
  const t = Q[r];
  if (!t || I.has(t)) return t;
  I.add(t);
  const e = document.createElement("link");
  return e.rel = "stylesheet", e.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(t)}:wght@400;500;700;800&display=swap`, document.head.appendChild(e), t;
}
const Z = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" }, tt = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"], M = class M extends F {
  get c() {
    return this.config ?? {};
  }
  connectedCallback() {
    super.connectedCallback(), q(), T();
  }
  firstUpdated() {
    if (!("IntersectionObserver" in window)) {
      this.setAttribute("in", "");
      return;
    }
    this.io = new IntersectionObserver((t) => {
      var e;
      t.some((i) => i.isIntersecting) && (this.setAttribute("in", ""), (e = this.io) == null || e.disconnect());
    }, { threshold: 0.12 }), this.io.observe(this);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this.io) == null || t.disconnect();
  }
  /** Hidden by the merchant's schedule or device rule? */
  hiddenNow() {
    const t = this.c, e = Date.now(), i = Date.parse(String(t.s_from || "")), a = Date.parse(String(t.s_to || ""));
    if (Number.isFinite(i) && e < i || Number.isFinite(a) && e > a) return !0;
    const s = J();
    return !!(f(t.s_hide_mobile) && s === "mobile" || f(t.s_hide_desktop) && s !== "mobile");
  }
  vars(t = "") {
    const e = this.c, i = [], a = (l, c) => {
      c !== "" && c != null && i.push(`${l}:${c}`);
    };
    a("--a", e.s_accent || ""), a("--a2", e.s_accent2 || ""), a("--bgc", e.s_bg || ""), a("--fgc", e.s_text || ""), a("--cardc", e.s_card || ""), a("--r", `${d(e.s_radius, 22)}px`), a("--gap", `${d(e.s_gap, 18)}px`), a("--ts", `${d(e.s_title_size, 38)}px`), a("--fs", `${d(e.s_text_size, 16)}px`), a("--pt", `${d(e.s_pad_top, 56)}px`), a("--pb", `${d(e.s_pad_bottom, 56)}px`), a("--maxw", Z[x(e.s_width, "normal")] ?? "1240px"), a("--sh", tt[Math.max(0, Math.min(5, d(e.s_shadow, 2)))]), a("--ms", `${d(e.s_anim_ms, 700)}ms`), a("--ov", String(d(e.s_overlay, 45) / 100)), e.s_bg_image && a("--bgimg", `url("${String(e.s_bg_image)}")`);
    const s = V(x(e.s_font, "inherit"));
    return s && a("font-family", `'${s}', inherit`), i.join(";") + (t ? ";" + t : "");
  }
  cls() {
    const t = this.c;
    return [
      "sec",
      `th-${x(t.s_theme, "auto")}`,
      `al-${x(t.s_align, "start")}`,
      `an-${x(t.s_anim, "rise")}`,
      `pt-${x(t.s_pattern, "none")}`,
      `bs-${x(t.s_btn_style, "pill")}`,
      f(t.s_border) ? "bordered" : "",
      f(t.s_stagger, !0) ? "stagger" : "",
      t.s_bg_image ? "has-img" : ""
    ].join(" ");
  }
  /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
  shell(t, e = {}, i = "", a = "", s = !0) {
    if (this.hiddenNow()) return S;
    const l = this.c, c = h(l.eyebrow, e.eyebrow ?? ""), g = h(l.title, e.title ?? ""), p = h(l.subtitle, e.sub ?? ""), m = s && f(l.s_show_head, !0) && (c || g || p);
    return n`<section class="${this.cls()} ${i}" style=${this.vars(a)} id=${String(l.s_anchor || "") || S}>
      <div class="wrap">${m ? n`<header class="head">${c ? n`<span class="eyebrow">${c}</span>` : ""}${g ? n`<h2 class="title">${g}</h2>` : ""}${p ? n`<p class="sub">${p}</p>` : ""}</header>` : ""}
      ${t}</div></section>`;
  }
  /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
  hints(t) {
    const e = t.filter(Boolean);
    return !e.length || !U() || !f(this.c.s_hints, !0) ? "" : n`<aside class="hints" role="note"><b>💡 ${o("مساعد الإعداد (يظهر لك فقط)", "Setup assistant (only you see this)")}</b><ul>${e.map((i) => n`<li>${i}</li>`)}</ul></aside>`;
  }
  card(t, e = {}) {
    var i;
    return n`<article class="pc ${t.available ? "" : "oos"}">
      <a class="ph" href=${t.url} @click=${() => k(t)}><img src=${t.image} alt=${t.name} loading="lazy" />${(i = e.badges) != null && i.length ? n`<span class="badges">${e.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${t.url} @click=${() => k(t)}>${t.name}</a>
        <div class="pr"><b>${N(t.price)}</b>${t.regular > t.price ? n`<s>${N(t.regular)}</s>` : ""}</div>
        ${e.rating !== !1 && t.rating > 0 ? n`<div class="rt">★ ${t.rating.toFixed(1)}${t.ratingCount ? n` <small>(${t.ratingCount})</small>` : ""}</div>` : ""}
        ${e.extra ?? ""}
        ${e.quick !== !1 ? n`<button class="btn sm" ?disabled=${!t.available} @click=${() => this.add(t)}>${t.available ? o("أضف للسلة", "Add to cart") : o("نفدت الكمية", "Sold out")}</button>` : ""}
      </div></article>`;
  }
  async add(t, e = 1, i) {
    k(t, 3), await P(t.id, e, i) ? W(o("تمت الإضافة للسلة", "Added to cart")) : location.href = t.url;
  }
};
M.base = D`
  :host { display: block; font-family: inherit; direction: inherit;
    --A: var(--a, var(--color-primary, #b88a44)); --A2: var(--a2, color-mix(in srgb, var(--A) 55%, #000)); --BG: var(--bgc, transparent); --FG: var(--fgc, inherit); --CARD: var(--cardc, #fff); --LINE: color-mix(in srgb, currentColor 14%, transparent); }
  :host([hidden]) { display: none; }
  *, *::before, *::after { box-sizing: border-box; }
  .sec { position: relative; background: var(--BG); color: var(--FG); font-size: var(--fs, 16px); overflow: hidden; isolation: isolate; }
  .sec.has-img::before { content: ''; position: absolute; inset: 0; z-index: -2; background: var(--bgimg) center/cover no-repeat; }
  .sec.has-img::after { content: ''; position: absolute; inset: 0; z-index: -1; background: #000; opacity: var(--ov, .45); }
  .th-light { --BG: var(--bgc, #fff); --FG: var(--fgc, #17140f); --CARD: var(--cardc, #faf8f4); }
  .th-ivory { --BG: var(--bgc, #f7f2e9); --FG: var(--fgc, #1d160c); --CARD: var(--cardc, #fffdf8); }
  .th-dark { --BG: var(--bgc, #111014); --FG: var(--fgc, #f4efe6); --CARD: var(--cardc, #1c1b22); }
  .th-midnight { --BG: var(--bgc, radial-gradient(900px 500px at 85% -10%, #2c1d55 0, transparent 60%), #0f0c18); --FG: var(--fgc, #f6f1e7); --CARD: var(--cardc, #19142d); }
  .th-glass { --BG: var(--bgc, linear-gradient(135deg, color-mix(in srgb, var(--A) 14%, #fff), #fff 60%)); --FG: var(--fgc, #15130f); --CARD: var(--cardc, rgba(255,255,255,.6)); }
  .th-glass .pc, .th-glass .panel { backdrop-filter: blur(14px); }
  .th-accent { --BG: var(--bgc, linear-gradient(135deg, var(--A), var(--A2))); --FG: var(--fgc, #fff); --CARD: var(--cardc, rgba(255,255,255,.12)); }
  .th-dark, .th-midnight, .th-accent { --LINE: rgba(255,255,255,.14); }
  .pt-dots { background-image: radial-gradient(color-mix(in srgb, currentColor 12%, transparent) 1px, transparent 1.4px), var(--BG); background-size: 18px 18px, auto; }
  .pt-grid { background-image: linear-gradient(var(--LINE) 1px, transparent 1px), linear-gradient(90deg, var(--LINE) 1px, transparent 1px), var(--BG); background-size: 36px 36px, 36px 36px, auto; }
  .pt-arabesque { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cpath d='M28 4l7 17 17 7-17 7-7 17-7-17-17-7 17-7z' fill='none' stroke='%23999' stroke-opacity='.18'/%3E%3C/svg%3E"), var(--BG); }
  .pt-waves { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20'%3E%3Cpath d='M0 10q20-10 40 0t40 0' fill='none' stroke='%23999' stroke-opacity='.2'/%3E%3C/svg%3E"), var(--BG); }
  .wrap { max-width: var(--maxw, 1240px); margin: 0 auto; padding: var(--pt, 56px) clamp(16px, 4vw, 32px) var(--pb, 56px); }
  .head { margin-bottom: calc(var(--gap, 18px) * 1.4); }
  .al-center .head { text-align: center; } .al-center .head .sub { margin-inline: auto; } .al-end .head { text-align: end; }
  .eyebrow { display: inline-block; letter-spacing: .2em; font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--A); margin-bottom: 10px; }
  .th-accent .eyebrow { color: inherit; opacity: .85; }
  h2.title { margin: 0 0 8px; font-size: clamp(22px, calc(var(--ts, 38px) * .62 + 1.2vw), var(--ts, 38px)); line-height: 1.25; font-weight: 800; }
  .sub { margin: 0; opacity: .72; line-height: 1.8; max-width: 720px; }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; cursor: pointer; text-decoration: none; font: inherit; font-weight: 700;
    padding: 13px 24px; border-radius: 999px; background: var(--A); color: #fff; transition: transform .25s, box-shadow .25s, opacity .2s; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -12px var(--A); } .btn[disabled] { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn.ghost { background: transparent; color: inherit; border: 1.5px solid currentColor; } .btn.sm { padding: 9px 16px; font-size: 14px; }
  .th-accent .btn:not(.ghost) { background: #fff; color: var(--A2); }
  .bs-rounded .btn { border-radius: 12px; } .bs-square .btn { border-radius: 0; } .bs-outline .btn:not(.ghost) { background: transparent; color: var(--A); border: 1.5px solid var(--A); }
  .bs-underline .btn { background: none; color: var(--A); padding-inline: 0; border-radius: 0; border-bottom: 2px solid var(--A); }
  .bordered .pc, .bordered .panel { border: 1px solid var(--LINE); }
  .panel { background: var(--CARD); border-radius: var(--r, 22px); box-shadow: var(--sh); padding: clamp(16px, 2.4vw, 28px); }
  .grid { display: grid; gap: var(--gap, 18px); grid-template-columns: repeat(var(--cols, 4), minmax(0, 1fr)); }
  @media (max-width: 860px) { .grid { grid-template-columns: repeat(var(--mcols, 2), minmax(0, 1fr)); } }
  .rail { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(220px, calc((100% - var(--gap) * (var(--cols, 4) - 1)) / var(--cols, 4))); gap: var(--gap, 18px); overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; scrollbar-width: thin; }
  @media (max-width: 860px) { .rail { grid-auto-columns: calc((100% - var(--gap)) / var(--mcols, 2) - 8px); } }
  .rail > * { scroll-snap-align: start; }
  .pc { position: relative; display: flex; flex-direction: column; background: var(--CARD); border-radius: var(--r, 22px); overflow: hidden; box-shadow: var(--sh); transition: transform .35s; color: inherit; }
  .pc:hover { transform: translateY(-4px); } .pc.oos { opacity: .55; }
  .ph { position: relative; display: block; aspect-ratio: var(--ratio, 1); background: color-mix(in srgb, currentColor 6%, transparent); }
  .ph img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .badges { position: absolute; inset: 10px 10px auto 10px; display: flex; flex-wrap: wrap; gap: 6px; }
  .bdg { font-size: 11px; font-weight: 800; padding: 4px 9px; border-radius: 999px; background: var(--A); color: #fff; line-height: 1.4; }
  .bdg.alt { background: #111; } .bdg.ok { background: #15803d; } .bdg.warn { background: #b45309; } .bdg.soft { background: #fff; color: #111; }
  .pb { padding: 12px 14px 14px; display: grid; gap: 6px; flex: 1; align-content: start; }
  .pn { color: inherit; text-decoration: none; font-weight: 700; line-height: 1.5; font-size: .95em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .pr { display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap; } .pr b { color: var(--A); } .th-accent .pr b { color: inherit; } .pr s { opacity: .5; font-size: .85em; }
  .rt { font-size: 13px; color: #d4a017; } .rt small { opacity: .7; color: inherit; }
  .pb .btn { margin-top: auto; width: 100%; }
  .chip { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 999px; border: 1.5px solid var(--LINE); background: var(--CARD); color: inherit; font: inherit; font-size: 14px; cursor: pointer; transition: all .25s; }
  .chip:hover { border-color: var(--A); } .chip.on { background: var(--A); border-color: var(--A); color: #fff; }
  .muted { opacity: .65; } .center { text-align: center; }
  .skel { background: linear-gradient(90deg, #8881 0, #8882 50%, #8881 100%); background-size: 200% 100%; animation: sk 1.4s infinite; border-radius: var(--r, 22px); min-height: 220px; }
  @keyframes sk { to { background-position: -200% 0; } }
  .hints { margin: 0 0 18px; padding: 14px 18px; border-radius: 14px; background: #fff8e1; color: #5b4300; border: 1px dashed #e0b84a; font-size: 13px; line-height: 1.8; }
  .hints ul { margin: 6px 0 0; padding-inline-start: 18px; }
  /* reveal motion */
  .sec .wrap > * { transition: opacity var(--ms, .7s) ease, transform var(--ms, .7s) cubic-bezier(.2,.7,.2,1), filter var(--ms, .7s); }
  :host(:not([in])) .an-fade .wrap > * { opacity: 0; }
  :host(:not([in])) .an-rise .wrap > * { opacity: 0; transform: translateY(28px); }
  :host(:not([in])) .an-zoom .wrap > * { opacity: 0; transform: scale(.94); }
  :host(:not([in])) .an-blur .wrap > * { opacity: 0; filter: blur(12px); }
  :host(:not([in])) .an-slide .wrap > * { opacity: 0; transform: translateX(40px); }
  .stagger .wrap > *:nth-child(2) { transition-delay: .08s; } .stagger .wrap > *:nth-child(3) { transition-delay: .16s; } .stagger .wrap > *:nth-child(4) { transition-delay: .24s; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } :host .sec .wrap > * { opacity: 1 !important; transform: none !important; filter: none !important; } }
  `;
let w = M;
X([
  L({ type: Object })
], w.prototype, "config");
var et = Object.defineProperty, _ = (r, t, e, i) => {
  for (var a = void 0, s = r.length - 1, l; s >= 0; s--)
    (l = r[s]) && (a = l(t, e, a) || a);
  return a && et(t, e, a), a;
};
const C = class C extends w {
  constructor() {
    super(...arguments), this.h = 160, this.w = 60, this.fit = "regular", this.done = !1;
  }
  willUpdate(t) {
    if (!t.has("config")) return;
    const e = z().answers;
    f(this.c.remember, !0) && e.size_h ? (this.h = Number(e.size_h), this.w = Number(e.size_w), this.fit = e.size_fit || "regular", this.done = !0) : (this.h = d(this.c.default_h, 160), this.w = d(this.c.default_w, 62));
  }
  rows() {
    return O(this.c.chart).map((t) => ({ size: h(t.size), hMin: d(t.h_min), hMax: d(t.h_max, 999), wMin: d(t.w_min), wMax: d(t.w_max, 999), length: h(t.length), note: h(t.note) })).filter((t) => t.size);
  }
  calc(t) {
    if (!t.length) return null;
    const e = (p) => {
      const m = this.h < p.hMin ? p.hMin - this.h : this.h > p.hMax ? this.h - p.hMax : 0;
      return (this.w < p.wMin ? p.wMin - this.w : this.w > p.wMax ? this.w - p.wMax : 0) * d(this.c.weight_importance, 60) / 50 + m * (100 - d(this.c.weight_importance, 60)) / 50;
    };
    let i = t.map((p, m) => ({ k: m, d: e(p) })).sort((p, m) => p.d - m.d)[0].k;
    const a = t[i], s = this.h >= a.hMin && this.h <= a.hMax, l = this.w >= a.wMin && this.w <= a.wMax;
    this.fit === "tight" && (i = Math.max(0, i - (l && this.w - a.wMin < (a.wMax - a.wMin) / 3 ? 1 : 0))), this.fit === "loose" && (i = Math.min(t.length - 1, i + (l && a.wMax - this.w < (a.wMax - a.wMin) / 2 ? 1 : 0)));
    const c = s && l ? 92 : s || l ? 70 : 45, g = l && (this.w - a.wMin < 2 || a.wMax - this.w < 2);
    return { i, row: t[i], conf: g ? c - 15 : c, edge: g };
  }
  render() {
    const t = this.c, e = this.rows(), i = this.calc(e), a = o("سم", "cm"), s = o("كجم", "kg"), l = () => {
      this.done = !0, A("size_h", String(this.h)), A("size_w", String(this.w)), A("size_fit", this.fit);
    };
    return this.shell(
      n`${this.hints([!e.length && o("أضف جدول المقاسات من الإعدادات (المقاس، الطول، الوزن).", "Add your size chart in the settings.")])}
      ${i ? n`<div class="g"><div class="panel f">
        <div class="row"><label>${o("طولك", "Height")} <b>${this.h} ${a}</b></label><input type="range" min=${d(t.h_from, 140)} max=${d(t.h_to, 195)} .value=${String(this.h)} @input=${(c) => {
        this.h = +c.target.value, this.done = !1;
      }} /></div>
        <div class="row"><label>${o("وزنك", "Weight")} <b>${this.w} ${s}</b></label><input type="range" min=${d(t.w_from, 40)} max=${d(t.w_to, 130)} .value=${String(this.w)} @input=${(c) => {
        this.w = +c.target.value, this.done = !1;
      }} /></div>
        ${f(t.ask_fit, !0) ? n`<div class="row"><label>${o("كيف تحب اللبسة؟", "Preferred fit")}</label><div class="fits">${[["tight", o("ضيّقة", "Fitted")], ["regular", o("عادية", "Regular")], ["loose", o("واسعة", "Loose")]].map(([c, g]) => n`<button class="chip ${this.fit === c ? "on" : ""}" @click=${() => {
        this.fit = c, this.done = !1;
      }}>${g}</button>`)}</div></div>` : ""}
        <button class="btn" @click=${l}>${o("احسب مقاسي", "Find my size")}</button>
        ${f(t.show_table, !0) ? n`<table><tr><th>${o("المقاس", "Size")}</th><th>${o("الطول", "Height")}</th><th>${o("الوزن", "Weight")}</th>${e.some((c) => c.length) ? n`<th>${h(t.length_label, o("الطول المناسب", "Length"))}</th>` : ""}</tr>
          ${e.map((c, g) => n`<tr class=${this.done && g === i.i ? "on" : ""}><td>${c.size}</td><td>${c.hMin}–${c.hMax}</td><td>${c.wMin}–${c.wMax}</td>${e.some((p) => p.length) ? n`<td>${c.length}</td>` : ""}</tr>`)}</table>` : ""}
      </div>
      <div class="panel res">${this.done ? n`<span class="muted">${o("مقاسك المقترح", "Your size")}</span><div class="big">${i.row.size}</div>
          ${i.row.length ? n`<div class="len">${h(t.length_label, o("الطول المناسب", "Length"))}: ${i.row.length}</div>` : ""}
          ${f(t.show_confidence, !0) ? n`<div class="conf">${o("دقة الترشيح", "Confidence")} <span class="bar"><i style=${`width:${i.conf}%`}></i></span> ${i.conf}%</div>` : ""}
          ${i.edge ? n`<p class="note">${o("أنت على حدود مقاسين؛ لو تحب الراحة خذ الأكبر.", "You are between two sizes; size up for comfort.")}</p>` : ""}
          ${i.row.note ? n`<p class="note">${i.row.note}</p>` : ""}${h(t.footer) ? n`<p class="note">${h(t.footer)}</p>` : ""}
          ${t.link ? n`<a class="btn" href=${String(t.link)}>${h(t.button, o("تسوّق مقاسك", "Shop your size"))}</a>` : ""}` : n`<div class="fig">📏</div><p class="note">${o("حرّك المؤشرات واضغط «احسب مقاسي»", "Move the sliders and tap «Find my size»")}</p>`}</div></div>` : ""}`,
      { eyebrow: o("مستشار المقاس", "Size advisor"), title: o("مقاسك الصح من أول مرة", "Your right size, first time") }
    );
  }
};
C.styles = [w.base, D`
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
let b = C;
_([
  y()
], b.prototype, "h");
_([
  y()
], b.prototype, "w");
_([
  y()
], b.prototype, "fit");
_([
  y()
], b.prototype, "done");
typeof b < "u" && b.registerSallaComponent("salla-murshid-size");
export {
  b as default
};
