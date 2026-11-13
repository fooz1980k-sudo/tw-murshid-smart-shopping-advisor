import { LitElement as V, nothing as R, html as n, css as U } from "lit";
import { property as Z, state as q } from "lit/decorators.js";
const $ = () => window.salla ?? window.Salla, I = async () => {
  var t, e;
  try {
    await ((e = (t = $()) == null ? void 0 : t.onReady) == null ? void 0 : e.call(t));
  } catch {
  }
}, Y = () => {
  var t, e, a, s, r;
  try {
    const i = ((e = (t = $()) == null ? void 0 : t.lang) == null ? void 0 : e.locale) ?? ((r = (s = (a = $()) == null ? void 0 : a.config) == null ? void 0 : s.get) == null ? void 0 : r.call(s, "user.language_code"));
    if (typeof i == "string" && i) return i.slice(0, 2);
  } catch {
  }
  return (document.documentElement.lang || "ar").slice(0, 2);
}, H = () => Y() === "en", d = (t, e) => H() ? e : t, w = (t, e = "") => {
  if (t == null) return e;
  if (typeof t == "string") {
    const a = t.trim();
    if (a.startsWith("{") && a.endsWith("}"))
      try {
        return w(JSON.parse(a), e);
      } catch {
      }
    return a || e;
  }
  if (typeof t == "number" || typeof t == "boolean") return String(t);
  if (typeof t == "object") {
    const a = t, s = a[Y()] ?? a.ar ?? a.en ?? Object.values(a).find((r) => typeof r == "string" && r);
    return typeof s == "string" && s.trim() ? s : e;
  }
  return e;
}, y = (t, e = "") => {
  const a = Array.isArray(t) ? t[0] : t, s = typeof a == "object" && a ? a.value : a;
  return s == null || s === "" ? e : String(s);
}, b = (t, e = 0) => {
  const a = Number(t);
  return t === "" || t == null || !Number.isFinite(a) ? e : a;
}, h = (t, e = !1) => t == null || t === "" ? e : t === !0 || t === "true" || t === 1 || t === "1", F = (t) => Array.isArray(t) ? t : [], tt = (t) => w(t).split(/[,،\n]/).map((e) => e.trim()).filter(Boolean), _ = (t) => {
  const e = typeof t == "object" && t ? t.amount : t, a = Number(e);
  return Number.isFinite(a) ? a : 0;
}, et = (t) => {
  if (!t) return null;
  const e = typeof t == "number" ? t < 1e12 ? t * 1e3 : t : Date.parse(String(t).replace(" ", "T"));
  return Number.isFinite(e) && e > Date.now() ? e : null;
};
function J(t) {
  var p, g, c, u, m, l, x, f, N;
  const e = _(t == null ? void 0 : t.sale_price), a = _((t == null ? void 0 : t.regular_price) ?? (t == null ? void 0 : t.price)), s = e && e < a ? e : _(t == null ? void 0 : t.price) || a, r = Math.max(_(t == null ? void 0 : t.regular_price), _(t == null ? void 0 : t.price), s), i = (Array.isArray(t == null ? void 0 : t.images) ? t.images : []).map((v) => String((v == null ? void 0 : v.url) ?? v ?? "")).filter(Boolean), o = (t == null ? void 0 : t.sold_quantity) ?? (t == null ? void 0 : t.sold);
  return {
    id: Number(t == null ? void 0 : t.id),
    name: String((t == null ? void 0 : t.name) ?? ""),
    url: String((t == null ? void 0 : t.url) ?? "#"),
    image: String(((p = t == null ? void 0 : t.image) == null ? void 0 : p.url) ?? (t == null ? void 0 : t.main_image) ?? (t == null ? void 0 : t.thumbnail) ?? i[0] ?? ""),
    images: i,
    price: s,
    regular: r,
    discount: r > s ? Math.round((1 - s / r) * 100) : 0,
    rating: _(((g = t == null ? void 0 : t.rating) == null ? void 0 : g.stars) ?? ((c = t == null ? void 0 : t.rating) == null ? void 0 : c.rate) ?? (t == null ? void 0 : t.rating)),
    ratingCount: _((u = t == null ? void 0 : t.rating) == null ? void 0 : u.count),
    qty: (t == null ? void 0 : t.quantity) == null || t != null && t.unlimited_quantity ? null : _(t == null ? void 0 : t.quantity),
    available: (t == null ? void 0 : t.is_available) !== !1 && (t == null ? void 0 : t.status) !== "out" && !((t == null ? void 0 : t.quantity) === 0 && !(t != null && t.unlimited_quantity)),
    sold: o == null || o === "" || !Number.isFinite(Number(o)) ? null : Number(o),
    endsAt: et((t == null ? void 0 : t.discount_ends) ?? (t == null ? void 0 : t.sale_end) ?? (t == null ? void 0 : t.discount_end)),
    category: String(((m = t == null ? void 0 : t.category) == null ? void 0 : m.name) ?? ((x = (l = t == null ? void 0 : t.categories) == null ? void 0 : l[0]) == null ? void 0 : x.name) ?? ""),
    brand: String(((f = t == null ? void 0 : t.brand) == null ? void 0 : f.name) ?? ""),
    promo: String(((N = t == null ? void 0 : t.promotion) == null ? void 0 : N.title) ?? (t == null ? void 0 : t.promotion_title) ?? "")
  };
}
const D = (t) => (Array.isArray(t) ? t : []).map((e) => Number(typeof e == "object" && e ? e.value : e)).filter((e) => Number.isFinite(e) && e > 0), A = /* @__PURE__ */ new Map();
async function at(t) {
  var s, r, i;
  const e = (s = $()) == null ? void 0 : s.product;
  if (!e) return null;
  const a = e.getDetails ? e.getDetails.bind(e) : (i = (r = e.api) == null ? void 0 : r.getDetails) == null ? void 0 : i.bind(e.api);
  if (!a) return null;
  try {
    const o = await a(t, ["images", "sold_quantity", "category"]), p = J((o == null ? void 0 : o.data) ?? o);
    return p.name ? p : null;
  } catch {
    return null;
  }
}
async function K(t) {
  await I();
  const e = "ids:" + t.join(",");
  return A.has(e) || A.set(e, Promise.all(t.map(at)).then((a) => a.filter((s) => !!s))), A.get(e);
}
async function L(t, e = [], a = 12) {
  await I();
  const s = `src:${t}:${e.join(",")}:${a}`;
  return A.has(s) || A.set(s, (async () => {
    var o, p, g, c;
    const r = (o = $()) == null ? void 0 : o.product, i = r != null && r.fetch ? r.fetch.bind(r) : (g = (p = r == null ? void 0 : r.api) == null ? void 0 : p.fetch) == null ? void 0 : g.bind(r.api);
    if (!i) return [];
    try {
      const u = { source: t, per_page: a };
      e.length && (u.source_value = e);
      const m = await i(u);
      return (Array.isArray(m == null ? void 0 : m.data) ? m.data : Array.isArray(m) ? m : ((c = m == null ? void 0 : m.data) == null ? void 0 : c.products) ?? []).map(J).filter((x) => x.name).slice(0, a);
    } catch {
      return [];
    }
  })()), A.get(s);
}
async function rt(t, e = "best_selling", a = 12) {
  const s = D(t);
  if (s.length) return { items: (await K(s)).slice(0, a), auto: !1 };
  let r = await L(e, [], a);
  return !r.length && e !== "latest" && (r = await L("latest", [], a)), { items: r, auto: !0 };
}
const O = (t) => {
  var e, a;
  try {
    const s = (a = (e = $()) == null ? void 0 : e.money) == null ? void 0 : a.call(e, t);
    if (s) return String(s);
  } catch {
  }
  return `${Math.round(t * 100) / 100} ${d("ر.س", "SAR")}`;
};
async function Q(t, e = 1, a) {
  var s, r, i;
  await I();
  try {
    return await ((i = (r = (s = $()) == null ? void 0 : s.cart) == null ? void 0 : r.addItem) == null ? void 0 : i.call(r, a ? { id: t, quantity: e, notes: a } : { id: t, quantity: e })), !0;
  } catch {
    return !1;
  }
}
function X(t, e = !0) {
  var a, s, r;
  try {
    (r = e ? (a = $()) == null ? void 0 : a.success : (s = $()) == null ? void 0 : s.error) == null || r(t);
  } catch {
  }
}
const st = (t, e) => {
  var a, s, r;
  try {
    (r = (s = (a = $()) == null ? void 0 : a.event) == null ? void 0 : s.on) == null || r.call(s, t, e);
  } catch {
  }
}, M = "tw_smart_mem_v1", P = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
function S() {
  try {
    return { ...P(), ...JSON.parse(localStorage.getItem(M) || "{}") };
  } catch {
    return P();
  }
}
function it(t) {
  try {
    localStorage.setItem(M, JSON.stringify(t));
  } catch {
  }
}
function z(t) {
  const e = S();
  return t(e), it(e), e;
}
function nt() {
  let t = !1;
  try {
    t = !sessionStorage.getItem(M), sessionStorage.setItem(M, "1");
  } catch {
  }
  return t ? z((e) => {
    e.visits += 1, e.last = Date.now();
  }) : S();
}
const E = (t, e = 1) => z((a) => {
  a.seen[t.id] = (a.seen[t.id] || 0) + e, a.prices = [...a.prices.slice(-29), t.price], t.category && (a.tags[t.category] = (a.tags[t.category] || 0) + e);
}), ot = (t, e = 1) => t && z((a) => {
  a.tags[t] = (a.tags[t] || 0) + e;
}), ct = (t, e) => z((a) => {
  a.answers[t] = e;
});
function lt() {
  const t = [...S().prices].sort((e, a) => e - a);
  return t.length >= 3 ? t[Math.floor(t.length / 2)] : 0;
}
function dt(t, e = S()) {
  let a = (e.seen[t.id] || 0) * 2 + (e.carted.includes(t.id) ? 4 : 0) + (t.category && e.tags[t.category] || 0);
  const s = lt();
  return s && (a += Math.max(0, 2 - Math.abs(t.price - s) / s * 2)), a;
}
const pt = (t, e = !0) => {
  if (!e) return t;
  const a = S();
  return t.map((s, r) => ({ p: s, i: r, s: dt(s, a) })).sort((s, r) => r.s - s.s || s.i - r.i).map((s) => s.p);
};
let T = !1;
function gt() {
  T || (T = !0, st("cart::item.added", (t) => {
    var a;
    const e = Number(((a = t == null ? void 0 : t.data) == null ? void 0 : a.product_id) ?? 0);
    e && z((s) => {
      s.carted.includes(e) || (s.carted = [...s.carted.slice(-40), e]);
    });
  }));
}
const ut = () => {
  const t = innerWidth, e = navigator.userAgent;
  return /iPad|Tablet/i.test(e) || t >= 700 && t < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e) || t < 700 ? "mobile" : "desktop";
}, ht = () => {
  try {
    return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
  } catch {
    return !0;
  }
};
var mt = Object.defineProperty, ft = (t, e, a, s) => {
  for (var r = void 0, i = t.length - 1, o; i >= 0; i--)
    (o = t[i]) && (r = o(e, a, r) || r);
  return r && mt(e, a, r), r;
};
const bt = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" }, W = /* @__PURE__ */ new Set();
function xt(t) {
  const e = bt[t];
  if (!e || W.has(e)) return e;
  W.add(e);
  const a = document.createElement("link");
  return a.rel = "stylesheet", a.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e)}:wght@400;500;700;800&display=swap`, document.head.appendChild(a), e;
}
const vt = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" }, yt = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"], B = class B extends V {
  get c() {
    return this.config ?? {};
  }
  connectedCallback() {
    super.connectedCallback(), gt(), nt();
  }
  firstUpdated() {
    if (!("IntersectionObserver" in window)) {
      this.setAttribute("in", "");
      return;
    }
    this.io = new IntersectionObserver((e) => {
      var a;
      e.some((s) => s.isIntersecting) && (this.setAttribute("in", ""), (a = this.io) == null || a.disconnect());
    }, { threshold: 0.12 }), this.io.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.io) == null || e.disconnect();
  }
  /** Hidden by the merchant's schedule or device rule? */
  hiddenNow() {
    const e = this.c, a = Date.now(), s = Date.parse(String(e.s_from || "")), r = Date.parse(String(e.s_to || ""));
    if (Number.isFinite(s) && a < s || Number.isFinite(r) && a > r) return !0;
    const i = ut();
    return !!(h(e.s_hide_mobile) && i === "mobile" || h(e.s_hide_desktop) && i !== "mobile");
  }
  vars(e = "") {
    const a = this.c, s = [], r = (o, p) => {
      p !== "" && p != null && s.push(`${o}:${p}`);
    };
    r("--a", a.s_accent || ""), r("--a2", a.s_accent2 || ""), r("--bgc", a.s_bg || ""), r("--fgc", a.s_text || ""), r("--cardc", a.s_card || ""), r("--r", `${b(a.s_radius, 22)}px`), r("--gap", `${b(a.s_gap, 18)}px`), r("--ts", `${b(a.s_title_size, 38)}px`), r("--fs", `${b(a.s_text_size, 16)}px`), r("--pt", `${b(a.s_pad_top, 56)}px`), r("--pb", `${b(a.s_pad_bottom, 56)}px`), r("--maxw", vt[y(a.s_width, "normal")] ?? "1240px"), r("--sh", yt[Math.max(0, Math.min(5, b(a.s_shadow, 2)))]), r("--ms", `${b(a.s_anim_ms, 700)}ms`), r("--ov", String(b(a.s_overlay, 45) / 100)), a.s_bg_image && r("--bgimg", `url("${String(a.s_bg_image)}")`);
    const i = xt(y(a.s_font, "inherit"));
    return i && r("font-family", `'${i}', inherit`), s.join(";") + (e ? ";" + e : "");
  }
  cls() {
    const e = this.c;
    return [
      "sec",
      `th-${y(e.s_theme, "auto")}`,
      `al-${y(e.s_align, "start")}`,
      `an-${y(e.s_anim, "rise")}`,
      `pt-${y(e.s_pattern, "none")}`,
      `bs-${y(e.s_btn_style, "pill")}`,
      h(e.s_border) ? "bordered" : "",
      h(e.s_stagger, !0) ? "stagger" : "",
      e.s_bg_image ? "has-img" : ""
    ].join(" ");
  }
  /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
  shell(e, a = {}, s = "", r = "", i = !0) {
    if (this.hiddenNow()) return R;
    const o = this.c, p = w(o.eyebrow, a.eyebrow ?? ""), g = w(o.title, a.title ?? ""), c = w(o.subtitle, a.sub ?? ""), u = i && h(o.s_show_head, !0) && (p || g || c);
    return n`<section class="${this.cls()} ${s}" style=${this.vars(r)} id=${String(o.s_anchor || "") || R}>
      <div class="wrap">${u ? n`<header class="head">${p ? n`<span class="eyebrow">${p}</span>` : ""}${g ? n`<h2 class="title">${g}</h2>` : ""}${c ? n`<p class="sub">${c}</p>` : ""}</header>` : ""}
      ${e}</div></section>`;
  }
  /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
  hints(e) {
    const a = e.filter(Boolean);
    return !a.length || !ht() || !h(this.c.s_hints, !0) ? "" : n`<aside class="hints" role="note"><b>💡 ${d("مساعد الإعداد (يظهر لك فقط)", "Setup assistant (only you see this)")}</b><ul>${a.map((s) => n`<li>${s}</li>`)}</ul></aside>`;
  }
  card(e, a = {}) {
    var s;
    return n`<article class="pc ${e.available ? "" : "oos"}">
      <a class="ph" href=${e.url} @click=${() => E(e)}><img src=${e.image} alt=${e.name} loading="lazy" />${(s = a.badges) != null && s.length ? n`<span class="badges">${a.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e.url} @click=${() => E(e)}>${e.name}</a>
        <div class="pr"><b>${O(e.price)}</b>${e.regular > e.price ? n`<s>${O(e.regular)}</s>` : ""}</div>
        ${a.rating !== !1 && e.rating > 0 ? n`<div class="rt">★ ${e.rating.toFixed(1)}${e.ratingCount ? n` <small>(${e.ratingCount})</small>` : ""}</div>` : ""}
        ${a.extra ?? ""}
        ${a.quick !== !1 ? n`<button class="btn sm" ?disabled=${!e.available} @click=${() => this.add(e)}>${e.available ? d("أضف للسلة", "Add to cart") : d("نفدت الكمية", "Sold out")}</button>` : ""}
      </div></article>`;
  }
  async add(e, a = 1, s) {
    E(e, 3), await Q(e.id, a, s) ? X(d("تمت الإضافة للسلة", "Added to cart")) : location.href = e.url;
  }
};
B.base = U`
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
let j = B;
ft([
  Z({ type: Object })
], j.prototype, "config");
var wt = Object.defineProperty, C = (t, e, a, s) => {
  for (var r = void 0, i = t.length - 1, o; i >= 0; i--)
    (o = t[i]) && (r = o(e, a, r) || r);
  return r && wt(e, a, r), r;
};
const G = class G extends j {
  constructor() {
    super(...arguments), this.qs = [], this.step = 0, this.picks = [], this.pool = [], this.auto = !1, this.result = null, this.seq = 0;
  }
  willUpdate(e) {
    e.has("config") && this.setup();
  }
  async setup() {
    const e = ++this.seq, a = this.c, s = F(a.questions), r = F(a.options);
    let i = [];
    if (r.length && !h(a.force_auto)) {
      i = s.map((f, N) => ({ text: w(f.text), hint: w(f.hint), multi: h(f.multi), opts: r.filter((v) => b(y(v.step, "1"), 1) === N + 1).map((v) => ({ label: w(v.label), emoji: w(v.emoji), image: String(v.image || ""), prods: D(v.products), tags: tt(v.tags), weight: b(v.weight, 3) })) })).filter((f) => f.text && f.opts.length);
      const l = [...new Set(r.flatMap((f) => D(f.products)))], x = await K(l);
      e === this.seq && (this.pool = x, this.qs = i, this.auto = !1);
      return;
    }
    const o = (await rt(a.products, y(a.auto_source, "best_selling"), b(a.pool, 24))).items.filter((l) => l.available), p = o.map((l) => l.price).sort((l, x) => l - x), g = (l) => p[Math.min(p.length - 1, Math.floor(p.length * l))] ?? 0, [c, u] = [Math.round(g(0.34)), Math.round(g(0.67))], m = [...new Set(o.map((l) => l.category).filter(Boolean))].slice(0, 6);
    H(), i.push({ text: d("كم ميزانيتك تقريباً؟", "What is your budget?"), hint: d("الأسعار من منتجات المتجر الفعلية", "Ranges come from real store prices"), multi: !1, opts: [
      { label: d(`أقل من ${c}`, `Under ${c}`), emoji: "💚", image: "", prods: [], tags: [], weight: 4, test: (l) => l.price <= c ? 1 : 0 },
      { label: `${c} – ${u}`, emoji: "💛", image: "", prods: [], tags: [], weight: 4, test: (l) => l.price > c && l.price <= u ? 1 : 0 },
      { label: d(`أكثر من ${u}`, `Over ${u}`), emoji: "💎", image: "", prods: [], tags: [], weight: 4, test: (l) => l.price > u ? 1 : 0 }
    ] }), m.length > 1 && i.push({ text: d("وش تدوّر عليه؟", "What are you looking for?"), hint: d("تقدر تختار أكثر من قسم", "Pick one or more"), multi: !0, opts: m.map((l) => {
      var x;
      return { label: l, emoji: "🏷️", image: ((x = o.find((f) => f.category === l)) == null ? void 0 : x.image) ?? "", prods: [], tags: [l], weight: 5, test: (f) => f.category === l ? 1 : 0 };
    }) }), i.push({ text: d("وش أهم شي عندك؟", "What matters most?"), hint: "", multi: !1, opts: [
      { label: d("أفضل سعر وخصم", "Best price & deal"), emoji: "🏷️", image: "", prods: [], tags: [], weight: 3, test: (l) => l.discount / 30 },
      { label: d("الأعلى تقييماً", "Top rated"), emoji: "⭐", image: "", prods: [], tags: [], weight: 3, test: (l) => Math.max(0, (l.rating - 3.5) / 1.5) },
      { label: d("الأكثر طلباً", "Most ordered"), emoji: "🔥", image: "", prods: [], tags: [], weight: 3, test: (l) => l.sold != null ? Math.min(1, l.sold / Math.max(1, ...o.map((x) => x.sold ?? 0))) : 0 },
      { label: d("مفاجئني", "Surprise me"), emoji: "🎁", image: "", prods: [], tags: [], weight: 1, test: () => 0.5 }
    ] }), e === this.seq && (this.pool = o, this.qs = i, this.auto = !0);
  }
  choose(e) {
    const a = this.qs[this.step], s = this.picks[this.step] ?? [], r = a.multi ? s.includes(e) ? s.filter((i) => i !== e) : [...s, e] : [e];
    this.picks = Object.assign([...this.picks], { [this.step]: r }), ct(`q${this.step}`, a.opts[e].label), a.opts[e].tags.forEach((i) => ot(i, 2)), !a.multi && h(this.c.auto_advance, !0) && setTimeout(() => this.next(), 280);
  }
  next() {
    this.step < this.qs.length - 1 ? this.step++ : this.finish();
  }
  finish() {
    const e = /* @__PURE__ */ new Map();
    let a = 0;
    this.qs.forEach((r, i) => {
      a += Math.max(...r.opts.map((o) => o.weight)), (this.picks[i] ?? []).forEach((o) => {
        const p = r.opts[o];
        for (const g of this.pool) {
          const c = p.test ? p.test(g) : p.prods.includes(g.id) ? 1 : 0;
          if (c > 0) {
            const u = e.get(g.id) ?? { score: 0, why: [] };
            u.score += c * p.weight, u.why.push(p.label), e.set(g.id, u);
          }
        }
      });
    }), S();
    const s = pt(this.pool.filter((r) => e.has(r.id) && (!h(this.c.hide_oos, !0) || r.available)), h(this.c.personalize, !0)).map((r) => ({ p: r, ...e.get(r.id) })).sort((r, i) => i.score - r.score || i.p.rating - r.p.rating).slice(0, b(this.c.results, 4));
    this.result = s.map((r) => ({ ...r, score: Math.min(100, Math.round(r.score / Math.max(1, a) * 100)) }));
  }
  reset() {
    this.step = 0, this.picks = [], this.result = null;
  }
  async addAll() {
    if (this.result) {
      for (const e of this.result) e.p.available && await Q(e.p.id);
      X(d("أضفنا الترشيحات للسلة", "Added the picks to your cart"));
    }
  }
  render() {
    const e = this.c, a = this.qs[this.step], s = this.qs.flatMap((g, c) => (this.picks[c] ?? []).map((u) => g.opts[u].label)), r = y(e.progress, "bar"), i = y(e.layout, "split") === "split" && e.side_image ? "split" : "", o = r === "dots" ? n`<div class="dots">${this.qs.map((g, c) => n`<i class=${c <= this.step ? "on" : ""}></i>`)}</div>` : r === "bar" ? n`<div class="prog">${this.qs.map((g, c) => n`<i class=${c <= this.step ? "on" : ""}></i>`)}</div>` : "";
    let p;
    if (!this.qs.length) p = n`<div class="skel"></div>`;
    else if (this.result) {
      const g = w(e.result_message, d("بناءً على اختياراتك، هذي أنسب المنتجات لك من متجرنا:", "Based on your answers, these fit you best:"));
      p = n`<div class="res-head"><div><h3>${w(e.result_title, d("ترشيحاتنا لك ✨", "Your picks ✨"))}</h3><p class="hint" style="margin:6px 0 0">${g}</p>
          ${h(e.show_answers, !0) ? n`<div class="ans">${s.map((c) => n`<span>${c}</span>`)}</div>` : ""}</div>
        <div class="acts">${h(e.add_all, !0) && this.result.length ? n`<button class="btn" @click=${this.addAll}>${d("أضف الكل للسلة", "Add all to cart")}</button>` : ""}
          ${h(e.share, !0) ? n`<a class="btn ghost" target="_blank" rel="noopener" href=${`https://wa.me/?text=${encodeURIComponent(this.result.map((c) => `${c.p.name} ${c.p.url}`).join(`
`))}`}>${d("شارك عبر واتساب", "Share on WhatsApp")}</a>` : ""}
          <button class="btn ghost" @click=${this.reset}>${d("أعد الاختبار", "Retake")}</button></div></div>
        ${this.result.length ? n`<div class="grid" style=${`--cols:${Math.min(4, b(e.results, 4))}`}>${this.result.map((c) => n`<div style="position:relative">${this.card(c.p, { extra: h(e.show_reasons, !0) ? n`<div class="why"><b>${d("يناسبك لأن:", "Fits because:")}</b> ${[...new Set(c.why)].join(" · ")}</div>` : "" })}
          ${h(e.show_match, !0) ? n`<span class="match">${d("تطابق", "Match")} ${c.score}%</span>` : ""}</div>`)}</div>` : n`<p class="hint">${d("ما لقينا تطابق كامل، جرّب خيارات ثانية.", "No exact match, try other answers.")}</p>`}`;
    } else {
      const g = this.picks[this.step] ?? [];
      p = n`<div class="q ${i}">${i ? n`<div class="art" style=${`background-image:url("${e.side_image}")`}></div>` : ""}
        <div class="panel">${o}<div class="num">${r === "numbers" || r === "bar" ? `${this.step + 1} / ${this.qs.length}` : ""}</div>
        <h3>${a.text}</h3>${a.hint ? n`<p class="hint">${a.hint}</p>` : n`<p class="hint">${a.multi ? d("اختر واحد أو أكثر", "Choose one or more") : ""}</p>`}
        <div class="opts">${a.opts.map((c, u) => n`<button class="o ${g.includes(u) ? "on" : ""}" @click=${() => this.choose(u)}>${c.image && h(e.option_images, !0) ? n`<img src=${c.image} alt="" />` : n`<span class="e">${c.emoji}</span>`}<b>${c.label}</b></button>`)}</div>
        <div class="nav">${this.step > 0 && h(e.allow_back, !0) ? n`<button class="btn ghost" @click=${() => this.step--}>${d("السابق", "Back")}</button>` : n`<span></span>`}
          ${a.multi || !h(e.auto_advance, !0) ? n`<button class="btn" ?disabled=${!g.length} @click=${() => this.next()}>${this.step === this.qs.length - 1 ? d("اعرض النتيجة", "See results") : d("التالي", "Next")}</button>` : ""}</div></div></div>`;
    }
    return this.shell(
      n`${this.hints([this.auto && d("الاختبار مبني تلقائياً من أسعار وتقييمات ومبيعات وأقسام متجرك. أضف أسئلتك وخياراتك لتخصيصه.", "This quiz is auto-built from your store data. Add your own questions to customise it.")])}${p}`,
      { eyebrow: d("المستشار الذكي", "Smart advisor"), title: d("محتار؟ جاوب 3 أسئلة ونختار لك", "Not sure? Answer 3 questions"), sub: "" }
    );
  }
};
G.styles = [j.base, U`
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
let k = G;
C([
  q()
], k.prototype, "qs");
C([
  q()
], k.prototype, "step");
C([
  q()
], k.prototype, "picks");
C([
  q()
], k.prototype, "pool");
C([
  q()
], k.prototype, "auto");
C([
  q()
], k.prototype, "result");
typeof k < "u" && k.registerSallaComponent("salla-murshid-advisor");
export {
  k as default
};
