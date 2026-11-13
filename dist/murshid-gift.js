import { LitElement as K, nothing as q, html as d, css as T } from "lit";
import { property as X, state as w } from "lit/decorators.js";
const m = () => window.salla ?? window.Salla, M = async () => {
  var t, e;
  try {
    await ((e = (t = m()) == null ? void 0 : t.onReady) == null ? void 0 : e.call(t));
  } catch {
  }
}, H = () => {
  var t, e, a, i, r;
  try {
    const s = ((e = (t = m()) == null ? void 0 : t.lang) == null ? void 0 : e.locale) ?? ((r = (i = (a = m()) == null ? void 0 : a.config) == null ? void 0 : i.get) == null ? void 0 : r.call(i, "user.language_code"));
    if (typeof s == "string" && s) return s.slice(0, 2);
  } catch {
  }
  return (document.documentElement.lang || "ar").slice(0, 2);
}, Q = () => H() === "en", g = (t, e) => Q() ? e : t, f = (t, e = "") => {
  if (t == null) return e;
  if (typeof t == "string") {
    const a = t.trim();
    if (a.startsWith("{") && a.endsWith("}"))
      try {
        return f(JSON.parse(a), e);
      } catch {
      }
    return a || e;
  }
  if (typeof t == "number" || typeof t == "boolean") return String(t);
  if (typeof t == "object") {
    const a = t, i = a[H()] ?? a.ar ?? a.en ?? Object.values(a).find((r) => typeof r == "string" && r);
    return typeof i == "string" && i.trim() ? i : e;
  }
  return e;
}, v = (t, e = "") => {
  const a = Array.isArray(t) ? t[0] : t, i = typeof a == "object" && a ? a.value : a;
  return i == null || i === "" ? e : String(i);
}, h = (t, e = 0) => {
  const a = Number(t);
  return t === "" || t == null || !Number.isFinite(a) ? e : a;
}, b = (t, e = !1) => t == null || t === "" ? e : t === !0 || t === "true" || t === 1 || t === "1", R = (t) => Array.isArray(t) ? t : [], y = (t) => {
  const e = typeof t == "object" && t ? t.amount : t, a = Number(e);
  return Number.isFinite(a) ? a : 0;
}, V = (t) => {
  if (!t) return null;
  const e = typeof t == "number" ? t < 1e12 ? t * 1e3 : t : Date.parse(String(t).replace(" ", "T"));
  return Number.isFinite(e) && e > Date.now() ? e : null;
};
function J(t) {
  var n, c, l, x, u, j, C, F, I;
  const e = y(t == null ? void 0 : t.sale_price), a = y((t == null ? void 0 : t.regular_price) ?? (t == null ? void 0 : t.price)), i = e && e < a ? e : y(t == null ? void 0 : t.price) || a, r = Math.max(y(t == null ? void 0 : t.regular_price), y(t == null ? void 0 : t.price), i), s = (Array.isArray(t == null ? void 0 : t.images) ? t.images : []).map((S) => String((S == null ? void 0 : S.url) ?? S ?? "")).filter(Boolean), o = (t == null ? void 0 : t.sold_quantity) ?? (t == null ? void 0 : t.sold);
  return {
    id: Number(t == null ? void 0 : t.id),
    name: String((t == null ? void 0 : t.name) ?? ""),
    url: String((t == null ? void 0 : t.url) ?? "#"),
    image: String(((n = t == null ? void 0 : t.image) == null ? void 0 : n.url) ?? (t == null ? void 0 : t.main_image) ?? (t == null ? void 0 : t.thumbnail) ?? s[0] ?? ""),
    images: s,
    price: i,
    regular: r,
    discount: r > i ? Math.round((1 - i / r) * 100) : 0,
    rating: y(((c = t == null ? void 0 : t.rating) == null ? void 0 : c.stars) ?? ((l = t == null ? void 0 : t.rating) == null ? void 0 : l.rate) ?? (t == null ? void 0 : t.rating)),
    ratingCount: y((x = t == null ? void 0 : t.rating) == null ? void 0 : x.count),
    qty: (t == null ? void 0 : t.quantity) == null || t != null && t.unlimited_quantity ? null : y(t == null ? void 0 : t.quantity),
    available: (t == null ? void 0 : t.is_available) !== !1 && (t == null ? void 0 : t.status) !== "out" && !((t == null ? void 0 : t.quantity) === 0 && !(t != null && t.unlimited_quantity)),
    sold: o == null || o === "" || !Number.isFinite(Number(o)) ? null : Number(o),
    endsAt: V((t == null ? void 0 : t.discount_ends) ?? (t == null ? void 0 : t.sale_end) ?? (t == null ? void 0 : t.discount_end)),
    category: String(((u = t == null ? void 0 : t.category) == null ? void 0 : u.name) ?? ((C = (j = t == null ? void 0 : t.categories) == null ? void 0 : j[0]) == null ? void 0 : C.name) ?? ""),
    brand: String(((F = t == null ? void 0 : t.brand) == null ? void 0 : F.name) ?? ""),
    promo: String(((I = t == null ? void 0 : t.promotion) == null ? void 0 : I.title) ?? (t == null ? void 0 : t.promotion_title) ?? "")
  };
}
const U = (t) => (Array.isArray(t) ? t : []).map((e) => Number(typeof e == "object" && e ? e.value : e)).filter((e) => Number.isFinite(e) && e > 0), _ = /* @__PURE__ */ new Map();
async function Z(t) {
  var i, r, s;
  const e = (i = m()) == null ? void 0 : i.product;
  if (!e) return null;
  const a = e.getDetails ? e.getDetails.bind(e) : (s = (r = e.api) == null ? void 0 : r.getDetails) == null ? void 0 : s.bind(e.api);
  if (!a) return null;
  try {
    const o = await a(t, ["images", "sold_quantity", "category"]), n = J((o == null ? void 0 : o.data) ?? o);
    return n.name ? n : null;
  } catch {
    return null;
  }
}
async function Y(t) {
  await M();
  const e = "ids:" + t.join(",");
  return _.has(e) || _.set(e, Promise.all(t.map(Z)).then((a) => a.filter((i) => !!i))), _.get(e);
}
async function O(t, e = [], a = 12) {
  await M();
  const i = `src:${t}:${e.join(",")}:${a}`;
  return _.has(i) || _.set(i, (async () => {
    var o, n, c, l;
    const r = (o = m()) == null ? void 0 : o.product, s = r != null && r.fetch ? r.fetch.bind(r) : (c = (n = r == null ? void 0 : r.api) == null ? void 0 : n.fetch) == null ? void 0 : c.bind(r.api);
    if (!s) return [];
    try {
      const x = { source: t, per_page: a };
      e.length && (x.source_value = e);
      const u = await s(x);
      return (Array.isArray(u == null ? void 0 : u.data) ? u.data : Array.isArray(u) ? u : ((l = u == null ? void 0 : u.data) == null ? void 0 : l.products) ?? []).map(J).filter((C) => C.name).slice(0, a);
    } catch {
      return [];
    }
  })()), _.get(i);
}
async function tt(t, e = "best_selling", a = 12) {
  const i = U(t);
  if (i.length) return { items: (await Y(i)).slice(0, a), auto: !1 };
  let r = await O(e, [], a);
  return !r.length && e !== "latest" && (r = await O("latest", [], a)), { items: r, auto: !0 };
}
const G = (t) => {
  var e, a;
  try {
    const i = (a = (e = m()) == null ? void 0 : e.money) == null ? void 0 : a.call(e, t);
    if (i) return String(i);
  } catch {
  }
  return `${Math.round(t * 100) / 100} ${g("ر.س", "SAR")}`;
};
async function et(t, e = 1, a) {
  var i, r, s;
  await M();
  try {
    return await ((s = (r = (i = m()) == null ? void 0 : i.cart) == null ? void 0 : r.addItem) == null ? void 0 : s.call(r, a ? { id: t, quantity: e, notes: a } : { id: t, quantity: e })), !0;
  } catch {
    return !1;
  }
}
function at(t, e = !0) {
  var a, i, r;
  try {
    (r = e ? (a = m()) == null ? void 0 : a.success : (i = m()) == null ? void 0 : i.error) == null || r(t);
  } catch {
  }
}
const rt = (t, e) => {
  var a, i, r;
  try {
    (r = (i = (a = m()) == null ? void 0 : a.event) == null ? void 0 : i.on) == null || r.call(i, t, e);
  } catch {
  }
}, N = "tw_smart_mem_v1", L = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
function A() {
  try {
    return { ...L(), ...JSON.parse(localStorage.getItem(N) || "{}") };
  } catch {
    return L();
  }
}
function it(t) {
  try {
    localStorage.setItem(N, JSON.stringify(t));
  } catch {
  }
}
function z(t) {
  const e = A();
  return t(e), it(e), e;
}
function nt() {
  let t = !1;
  try {
    t = !sessionStorage.getItem(N), sessionStorage.setItem(N, "1");
  } catch {
  }
  return t ? z((e) => {
    e.visits += 1, e.last = Date.now();
  }) : A();
}
const D = (t, e = 1) => z((a) => {
  a.seen[t.id] = (a.seen[t.id] || 0) + e, a.prices = [...a.prices.slice(-29), t.price], t.category && (a.tags[t.category] = (a.tags[t.category] || 0) + e);
}), st = (t, e = 1) => t && z((a) => {
  a.tags[t] = (a.tags[t] || 0) + e;
});
function ot() {
  const t = [...A().prices].sort((e, a) => e - a);
  return t.length >= 3 ? t[Math.floor(t.length / 2)] : 0;
}
function ct(t, e = A()) {
  let a = (e.seen[t.id] || 0) * 2 + (e.carted.includes(t.id) ? 4 : 0) + (t.category && e.tags[t.category] || 0);
  const i = ot();
  return i && (a += Math.max(0, 2 - Math.abs(t.price - i) / i * 2)), a;
}
const lt = (t, e = !0) => {
  if (!e) return t;
  const a = A();
  return t.map((i, r) => ({ p: i, i: r, s: ct(i, a) })).sort((i, r) => r.s - i.s || i.i - r.i).map((i) => i.p);
};
let P = !1;
function dt() {
  P || (P = !0, rt("cart::item.added", (t) => {
    var a;
    const e = Number(((a = t == null ? void 0 : t.data) == null ? void 0 : a.product_id) ?? 0);
    e && z((i) => {
      i.carted.includes(e) || (i.carted = [...i.carted.slice(-40), e]);
    });
  }));
}
const gt = () => {
  const t = innerWidth, e = navigator.userAgent;
  return /iPad|Tablet/i.test(e) || t >= 700 && t < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e) || t < 700 ? "mobile" : "desktop";
}, ut = () => {
  try {
    return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
  } catch {
    return !0;
  }
};
var ht = Object.defineProperty, pt = (t, e, a, i) => {
  for (var r = void 0, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = o(e, a, r) || r);
  return r && ht(e, a, r), r;
};
const ft = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" }, W = /* @__PURE__ */ new Set();
function bt(t) {
  const e = ft[t];
  if (!e || W.has(e)) return e;
  W.add(e);
  const a = document.createElement("link");
  return a.rel = "stylesheet", a.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e)}:wght@400;500;700;800&display=swap`, document.head.appendChild(a), e;
}
const mt = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" }, xt = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"], B = class B extends K {
  get c() {
    return this.config ?? {};
  }
  connectedCallback() {
    super.connectedCallback(), dt(), nt();
  }
  firstUpdated() {
    if (!("IntersectionObserver" in window)) {
      this.setAttribute("in", "");
      return;
    }
    this.io = new IntersectionObserver((e) => {
      var a;
      e.some((i) => i.isIntersecting) && (this.setAttribute("in", ""), (a = this.io) == null || a.disconnect());
    }, { threshold: 0.12 }), this.io.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.io) == null || e.disconnect();
  }
  /** Hidden by the merchant's schedule or device rule? */
  hiddenNow() {
    const e = this.c, a = Date.now(), i = Date.parse(String(e.s_from || "")), r = Date.parse(String(e.s_to || ""));
    if (Number.isFinite(i) && a < i || Number.isFinite(r) && a > r) return !0;
    const s = gt();
    return !!(b(e.s_hide_mobile) && s === "mobile" || b(e.s_hide_desktop) && s !== "mobile");
  }
  vars(e = "") {
    const a = this.c, i = [], r = (o, n) => {
      n !== "" && n != null && i.push(`${o}:${n}`);
    };
    r("--a", a.s_accent || ""), r("--a2", a.s_accent2 || ""), r("--bgc", a.s_bg || ""), r("--fgc", a.s_text || ""), r("--cardc", a.s_card || ""), r("--r", `${h(a.s_radius, 22)}px`), r("--gap", `${h(a.s_gap, 18)}px`), r("--ts", `${h(a.s_title_size, 38)}px`), r("--fs", `${h(a.s_text_size, 16)}px`), r("--pt", `${h(a.s_pad_top, 56)}px`), r("--pb", `${h(a.s_pad_bottom, 56)}px`), r("--maxw", mt[v(a.s_width, "normal")] ?? "1240px"), r("--sh", xt[Math.max(0, Math.min(5, h(a.s_shadow, 2)))]), r("--ms", `${h(a.s_anim_ms, 700)}ms`), r("--ov", String(h(a.s_overlay, 45) / 100)), a.s_bg_image && r("--bgimg", `url("${String(a.s_bg_image)}")`);
    const s = bt(v(a.s_font, "inherit"));
    return s && r("font-family", `'${s}', inherit`), i.join(";") + (e ? ";" + e : "");
  }
  cls() {
    const e = this.c;
    return [
      "sec",
      `th-${v(e.s_theme, "auto")}`,
      `al-${v(e.s_align, "start")}`,
      `an-${v(e.s_anim, "rise")}`,
      `pt-${v(e.s_pattern, "none")}`,
      `bs-${v(e.s_btn_style, "pill")}`,
      b(e.s_border) ? "bordered" : "",
      b(e.s_stagger, !0) ? "stagger" : "",
      e.s_bg_image ? "has-img" : ""
    ].join(" ");
  }
  /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
  shell(e, a = {}, i = "", r = "", s = !0) {
    if (this.hiddenNow()) return q;
    const o = this.c, n = f(o.eyebrow, a.eyebrow ?? ""), c = f(o.title, a.title ?? ""), l = f(o.subtitle, a.sub ?? ""), x = s && b(o.s_show_head, !0) && (n || c || l);
    return d`<section class="${this.cls()} ${i}" style=${this.vars(r)} id=${String(o.s_anchor || "") || q}>
      <div class="wrap">${x ? d`<header class="head">${n ? d`<span class="eyebrow">${n}</span>` : ""}${c ? d`<h2 class="title">${c}</h2>` : ""}${l ? d`<p class="sub">${l}</p>` : ""}</header>` : ""}
      ${e}</div></section>`;
  }
  /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
  hints(e) {
    const a = e.filter(Boolean);
    return !a.length || !ut() || !b(this.c.s_hints, !0) ? "" : d`<aside class="hints" role="note"><b>💡 ${g("مساعد الإعداد (يظهر لك فقط)", "Setup assistant (only you see this)")}</b><ul>${a.map((i) => d`<li>${i}</li>`)}</ul></aside>`;
  }
  card(e, a = {}) {
    var i;
    return d`<article class="pc ${e.available ? "" : "oos"}">
      <a class="ph" href=${e.url} @click=${() => D(e)}><img src=${e.image} alt=${e.name} loading="lazy" />${(i = a.badges) != null && i.length ? d`<span class="badges">${a.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e.url} @click=${() => D(e)}>${e.name}</a>
        <div class="pr"><b>${G(e.price)}</b>${e.regular > e.price ? d`<s>${G(e.regular)}</s>` : ""}</div>
        ${a.rating !== !1 && e.rating > 0 ? d`<div class="rt">★ ${e.rating.toFixed(1)}${e.ratingCount ? d` <small>(${e.ratingCount})</small>` : ""}</div>` : ""}
        ${a.extra ?? ""}
        ${a.quick !== !1 ? d`<button class="btn sm" ?disabled=${!e.available} @click=${() => this.add(e)}>${e.available ? g("أضف للسلة", "Add to cart") : g("نفدت الكمية", "Sold out")}</button>` : ""}
      </div></article>`;
  }
  async add(e, a = 1, i) {
    D(e, 3), await et(e.id, a, i) ? at(g("تمت الإضافة للسلة", "Added to cart")) : location.href = e.url;
  }
};
B.base = T`
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
let k = B;
pt([
  X({ type: Object })
], k.prototype, "config");
var vt = Object.defineProperty, $ = (t, e, a, i) => {
  for (var r = void 0, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = o(e, a, r) || r);
  return r && vt(e, a, r), r;
};
const E = class E extends k {
  constructor() {
    super(...arguments), this.pool = [], this.who = [], this.occ = [], this.w = -1, this.o = -1, this.budget = 0, this.note = "", this.auto = !1, this.seq = 0;
  }
  willUpdate(e) {
    e.has("config") && this.load();
  }
  async load() {
    const e = ++this.seq, a = this.c, i = (l) => ({ label: f(l.label), emoji: f(l.emoji, "🎁"), prods: U(l.products) });
    let r = R(a.recipients).map(i).filter((l) => l.label);
    const s = R(a.occasions).map(i).filter((l) => l.label), o = [...new Set([...r, ...s].flatMap((l) => l.prods))];
    let n = o.length ? await Y(o) : [], c = !1;
    if (!n.length || b(a.include_auto, !0)) {
      const l = (await tt(a.products, v(a.auto_source, "top-rated"), h(a.pool, 24))).items;
      n = [...n, ...l.filter((x) => !n.some((u) => u.id === x.id))], c = !o.length;
    }
    r.length || (c = !0, r = [...new Set(n.map((l) => l.category).filter(Boolean))].slice(0, 6).map((l) => ({ label: l, emoji: "🎁", prods: [], cat: l }))), e === this.seq && (this.pool = n.filter((l) => l.available), this.who = r, this.occ = s, this.auto = c, this.budget = Math.ceil(Math.max(0, ...this.pool.map((l) => l.price))));
  }
  found() {
    const e = this.who[this.w], a = this.occ[this.o], i = (n, c) => !n || (n.cat ? c.category === n.cat : n.prods.includes(c.id)), r = this.pool.filter((n) => i(e, n) && i(a, n) && n.price <= this.budget), s = v(this.c.sort, "smart");
    return (s === "price_asc" ? r.sort((n, c) => n.price - c.price) : s === "price_desc" ? r.sort((n, c) => c.price - n.price) : s === "rating" ? r.sort((n, c) => c.rating - n.rating) : lt(r, b(this.c.personalize, !0))).slice(0, h(this.c.results, 8));
  }
  render() {
    const e = this.c, a = Math.ceil(Math.max(1, ...this.pool.map((n) => n.price))), i = Math.floor(Math.min(...this.pool.map((n) => n.price), a)), r = this.found(), s = b(e.gift_note, !0), o = h(e.note_max, 160);
    return this.shell(
      d`
      ${this.hints([this.auto && g("لم تضف «لمين الهدية»؛ نعرض أقسام متجرك تلقائياً. أضف أشخاصاً ومناسبات واربطهم بمنتجات.", "No recipients yet: using your categories. Add recipients and occasions.")])}
      ${this.pool.length ? d`<div class="lay"><div class="side">
        <div class="panel"><div class="lbl">${f(e.who_label, g("لمين الهدية؟", "Who is it for?"))}</div><div class="chips">${this.who.map((n, c) => d`<button class="chip ${c === this.w ? "on" : ""}" @click=${() => {
        this.w = c === this.w ? -1 : c, st(n.label);
      }}>${n.emoji} ${n.label}</button>`)}</div></div>
        ${this.occ.length ? d`<div class="panel"><div class="lbl">${f(e.occ_label, g("وش المناسبة؟", "What is the occasion?"))}</div><div class="chips">${this.occ.map((n, c) => d`<button class="chip ${c === this.o ? "on" : ""}" @click=${() => this.o = c === this.o ? -1 : c}>${n.emoji} ${n.label}</button>`)}</div></div>` : ""}
        ${b(e.show_budget, !0) ? d`<div class="panel"><div class="lbl"><span>${f(e.budget_label, g("الميزانية", "Budget"))}</span><span>${g("حتى", "up to")} ${G(this.budget)}</span></div>
          <input type="range" min=${i} max=${a} step=${Math.max(1, Math.round((a - i) / 40))} .value=${String(this.budget)} @input=${(n) => this.budget = Number(n.target.value)} /></div>` : ""}
        ${s ? d`<div class="card" style=${`--gc1:${e.card_color1 || "#fdf3e3"};--gc2:${e.card_color2 || "#f4e1c4"}`}><small>${f(e.note_title, g("بطاقة الإهداء", "Gift card"))}</small>
          <textarea maxlength=${o} placeholder=${f(e.note_placeholder, g("اكتب رسالتك هنا… نرفقها مع الهدية", "Write your message… we attach it to the gift"))} .value=${this.note} @input=${(n) => this.note = n.target.value}></textarea><small>${this.note.length}/${o}</small></div>` : ""}
      </div><div>
        <div class="cnt">${g(`${r.length} هدية تناسب اختيارك`, `${r.length} gifts match`)}</div>
        ${r.length ? d`<div class="grid" style=${`--cols:${h(e.cols, 3)};--mcols:2`}>${r.map((n) => d`<div>${this.card(n, { quick: !1, extra: d`<button class="btn sm" @click=${() => this.add(n, 1, s && this.note ? `${g("رسالة إهداء", "Gift message")}: ${this.note}` : void 0)}>${g("اختر كهدية 🎁", "Choose as gift 🎁")}</button>` })}</div>`)}</div>` : d`<div class="panel empty">${g("ما فيه هدايا بهذي الميزانية، زِد الميزانية شوي.", "No gifts in this budget; raise it a little.")}</div>`}
      </div></div>` : d`<div class="skel"></div>`}`,
      { eyebrow: g("محدد الهدايا", "Gift finder"), title: g("الهدية الصح… بثلاث ضغطات", "The right gift in three taps") }
    );
  }
};
E.styles = [k.base, T`
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
let p = E;
$([
  w()
], p.prototype, "pool");
$([
  w()
], p.prototype, "who");
$([
  w()
], p.prototype, "occ");
$([
  w()
], p.prototype, "w");
$([
  w()
], p.prototype, "o");
$([
  w()
], p.prototype, "budget");
$([
  w()
], p.prototype, "note");
$([
  w()
], p.prototype, "auto");
typeof p < "u" && p.registerSallaComponent("salla-murshid-gift");
export {
  p as default
};
