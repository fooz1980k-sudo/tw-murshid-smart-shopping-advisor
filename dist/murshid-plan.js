import { LitElement as X, nothing as B, html as l, css as P } from "lit";
import { property as Q, state as A } from "lit/decorators.js";
const m = () => window.salla ?? window.Salla, E = async () => {
  var t, e;
  try {
    await ((e = (t = m()) == null ? void 0 : t.onReady) == null ? void 0 : e.call(t));
  } catch {
  }
}, T = () => {
  var t, e, r, n, a;
  try {
    const o = ((e = (t = m()) == null ? void 0 : t.lang) == null ? void 0 : e.locale) ?? ((a = (n = (r = m()) == null ? void 0 : r.config) == null ? void 0 : n.get) == null ? void 0 : a.call(n, "user.language_code"));
    if (typeof o == "string" && o) return o.slice(0, 2);
  } catch {
  }
  return (document.documentElement.lang || "ar").slice(0, 2);
}, V = () => T() === "en", g = (t, e) => V() ? e : t, f = (t, e = "") => {
  if (t == null) return e;
  if (typeof t == "string") {
    const r = t.trim();
    if (r.startsWith("{") && r.endsWith("}"))
      try {
        return f(JSON.parse(r), e);
      } catch {
      }
    return r || e;
  }
  if (typeof t == "number" || typeof t == "boolean") return String(t);
  if (typeof t == "object") {
    const r = t, n = r[T()] ?? r.ar ?? r.en ?? Object.values(r).find((a) => typeof a == "string" && a);
    return typeof n == "string" && n.trim() ? n : e;
  }
  return e;
}, w = (t, e = "") => {
  const r = Array.isArray(t) ? t[0] : t, n = typeof r == "object" && r ? r.value : r;
  return n == null || n === "" ? e : String(n);
}, h = (t, e = 0) => {
  const r = Number(t);
  return t === "" || t == null || !Number.isFinite(r) ? e : r;
}, b = (t, e = !1) => t == null || t === "" ? e : t === !0 || t === "true" || t === 1 || t === "1", Z = (t) => Array.isArray(t) ? t : [], y = (t) => {
  const e = typeof t == "object" && t ? t.amount : t, r = Number(e);
  return Number.isFinite(r) ? r : 0;
}, tt = (t) => {
  if (!t) return null;
  const e = typeof t == "number" ? t < 1e12 ? t * 1e3 : t : Date.parse(String(t).replace(" ", "T"));
  return Number.isFinite(e) && e > Date.now() ? e : null;
};
function W(t) {
  var d, u, p, x, i, c, $, R, F;
  const e = y(t == null ? void 0 : t.sale_price), r = y((t == null ? void 0 : t.regular_price) ?? (t == null ? void 0 : t.price)), n = e && e < r ? e : y(t == null ? void 0 : t.price) || r, a = Math.max(y(t == null ? void 0 : t.regular_price), y(t == null ? void 0 : t.price), n), o = (Array.isArray(t == null ? void 0 : t.images) ? t.images : []).map((S) => String((S == null ? void 0 : S.url) ?? S ?? "")).filter(Boolean), s = (t == null ? void 0 : t.sold_quantity) ?? (t == null ? void 0 : t.sold);
  return {
    id: Number(t == null ? void 0 : t.id),
    name: String((t == null ? void 0 : t.name) ?? ""),
    url: String((t == null ? void 0 : t.url) ?? "#"),
    image: String(((d = t == null ? void 0 : t.image) == null ? void 0 : d.url) ?? (t == null ? void 0 : t.main_image) ?? (t == null ? void 0 : t.thumbnail) ?? o[0] ?? ""),
    images: o,
    price: n,
    regular: a,
    discount: a > n ? Math.round((1 - n / a) * 100) : 0,
    rating: y(((u = t == null ? void 0 : t.rating) == null ? void 0 : u.stars) ?? ((p = t == null ? void 0 : t.rating) == null ? void 0 : p.rate) ?? (t == null ? void 0 : t.rating)),
    ratingCount: y((x = t == null ? void 0 : t.rating) == null ? void 0 : x.count),
    qty: (t == null ? void 0 : t.quantity) == null || t != null && t.unlimited_quantity ? null : y(t == null ? void 0 : t.quantity),
    available: (t == null ? void 0 : t.is_available) !== !1 && (t == null ? void 0 : t.status) !== "out" && !((t == null ? void 0 : t.quantity) === 0 && !(t != null && t.unlimited_quantity)),
    sold: s == null || s === "" || !Number.isFinite(Number(s)) ? null : Number(s),
    endsAt: tt((t == null ? void 0 : t.discount_ends) ?? (t == null ? void 0 : t.sale_end) ?? (t == null ? void 0 : t.discount_end)),
    category: String(((i = t == null ? void 0 : t.category) == null ? void 0 : i.name) ?? (($ = (c = t == null ? void 0 : t.categories) == null ? void 0 : c[0]) == null ? void 0 : $.name) ?? ""),
    brand: String(((R = t == null ? void 0 : t.brand) == null ? void 0 : R.name) ?? ""),
    promo: String(((F = t == null ? void 0 : t.promotion) == null ? void 0 : F.title) ?? (t == null ? void 0 : t.promotion_title) ?? "")
  };
}
const Y = (t) => (Array.isArray(t) ? t : []).map((e) => Number(typeof e == "object" && e ? e.value : e)).filter((e) => Number.isFinite(e) && e > 0), k = /* @__PURE__ */ new Map();
async function et(t) {
  var n, a, o;
  const e = (n = m()) == null ? void 0 : n.product;
  if (!e) return null;
  const r = e.getDetails ? e.getDetails.bind(e) : (o = (a = e.api) == null ? void 0 : a.getDetails) == null ? void 0 : o.bind(e.api);
  if (!r) return null;
  try {
    const s = await r(t, ["images", "sold_quantity", "category"]), d = W((s == null ? void 0 : s.data) ?? s);
    return d.name ? d : null;
  } catch {
    return null;
  }
}
async function H(t) {
  await E();
  const e = "ids:" + t.join(",");
  return k.has(e) || k.set(e, Promise.all(t.map(et)).then((r) => r.filter((n) => !!n))), k.get(e);
}
async function q(t, e = [], r = 12) {
  await E();
  const n = `src:${t}:${e.join(",")}:${r}`;
  return k.has(n) || k.set(n, (async () => {
    var s, d, u, p;
    const a = (s = m()) == null ? void 0 : s.product, o = a != null && a.fetch ? a.fetch.bind(a) : (u = (d = a == null ? void 0 : a.api) == null ? void 0 : d.fetch) == null ? void 0 : u.bind(a.api);
    if (!o) return [];
    try {
      const x = { source: t, per_page: r };
      e.length && (x.source_value = e);
      const i = await o(x);
      return (Array.isArray(i == null ? void 0 : i.data) ? i.data : Array.isArray(i) ? i : ((p = i == null ? void 0 : i.data) == null ? void 0 : p.products) ?? []).map(W).filter(($) => $.name).slice(0, r);
    } catch {
      return [];
    }
  })()), k.get(n);
}
async function rt(t, e = "best_selling", r = 12) {
  const n = Y(t);
  if (n.length) return { items: (await H(n)).slice(0, r), auto: !1 };
  let a = await q(e, [], r);
  return !a.length && e !== "latest" && (a = await q("latest", [], r)), { items: a, auto: !0 };
}
const N = (t) => {
  var e, r;
  try {
    const n = (r = (e = m()) == null ? void 0 : e.money) == null ? void 0 : r.call(e, t);
    if (n) return String(n);
  } catch {
  }
  return `${Math.round(t * 100) / 100} ${g("ر.س", "SAR")}`;
};
async function J(t, e = 1, r) {
  var n, a, o;
  await E();
  try {
    return await ((o = (a = (n = m()) == null ? void 0 : n.cart) == null ? void 0 : a.addItem) == null ? void 0 : o.call(a, r ? { id: t, quantity: e, notes: r } : { id: t, quantity: e })), !0;
  } catch {
    return !1;
  }
}
function U(t, e = !0) {
  var r, n, a;
  try {
    (a = e ? (r = m()) == null ? void 0 : r.success : (n = m()) == null ? void 0 : n.error) == null || a(t);
  } catch {
  }
}
const at = (t, e) => {
  var r, n, a;
  try {
    (a = (n = (r = m()) == null ? void 0 : r.event) == null ? void 0 : n.on) == null || a.call(n, t, e);
  } catch {
  }
}, z = "tw_smart_mem_v1", L = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
function K() {
  try {
    return { ...L(), ...JSON.parse(localStorage.getItem(z) || "{}") };
  } catch {
    return L();
  }
}
function nt(t) {
  try {
    localStorage.setItem(z, JSON.stringify(t));
  } catch {
  }
}
function D(t) {
  const e = K();
  return t(e), nt(e), e;
}
function it() {
  let t = !1;
  try {
    t = !sessionStorage.getItem(z), sessionStorage.setItem(z, "1");
  } catch {
  }
  return t ? D((e) => {
    e.visits += 1, e.last = Date.now();
  }) : K();
}
const j = (t, e = 1) => D((r) => {
  r.seen[t.id] = (r.seen[t.id] || 0) + e, r.prices = [...r.prices.slice(-29), t.price], t.category && (r.tags[t.category] = (r.tags[t.category] || 0) + e);
}), st = (t, e = 1) => t && D((r) => {
  r.tags[t] = (r.tags[t] || 0) + e;
});
let M = !1;
function ot() {
  M || (M = !0, at("cart::item.added", (t) => {
    var r;
    const e = Number(((r = t == null ? void 0 : t.data) == null ? void 0 : r.product_id) ?? 0);
    e && D((n) => {
      n.carted.includes(e) || (n.carted = [...n.carted.slice(-40), e]);
    });
  }));
}
const ct = () => {
  const t = innerWidth, e = navigator.userAgent;
  return /iPad|Tablet/i.test(e) || t >= 700 && t < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e) || t < 700 ? "mobile" : "desktop";
}, lt = () => {
  try {
    return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
  } catch {
    return !0;
  }
};
var dt = Object.defineProperty, gt = (t, e, r, n) => {
  for (var a = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = s(e, r, a) || a);
  return a && dt(e, r, a), a;
};
const ut = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" }, O = /* @__PURE__ */ new Set();
function pt(t) {
  const e = ut[t];
  if (!e || O.has(e)) return e;
  O.add(e);
  const r = document.createElement("link");
  return r.rel = "stylesheet", r.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e)}:wght@400;500;700;800&display=swap`, document.head.appendChild(r), e;
}
const ht = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" }, ft = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"], G = class G extends X {
  get c() {
    return this.config ?? {};
  }
  connectedCallback() {
    super.connectedCallback(), ot(), it();
  }
  firstUpdated() {
    if (!("IntersectionObserver" in window)) {
      this.setAttribute("in", "");
      return;
    }
    this.io = new IntersectionObserver((e) => {
      var r;
      e.some((n) => n.isIntersecting) && (this.setAttribute("in", ""), (r = this.io) == null || r.disconnect());
    }, { threshold: 0.12 }), this.io.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.io) == null || e.disconnect();
  }
  /** Hidden by the merchant's schedule or device rule? */
  hiddenNow() {
    const e = this.c, r = Date.now(), n = Date.parse(String(e.s_from || "")), a = Date.parse(String(e.s_to || ""));
    if (Number.isFinite(n) && r < n || Number.isFinite(a) && r > a) return !0;
    const o = ct();
    return !!(b(e.s_hide_mobile) && o === "mobile" || b(e.s_hide_desktop) && o !== "mobile");
  }
  vars(e = "") {
    const r = this.c, n = [], a = (s, d) => {
      d !== "" && d != null && n.push(`${s}:${d}`);
    };
    a("--a", r.s_accent || ""), a("--a2", r.s_accent2 || ""), a("--bgc", r.s_bg || ""), a("--fgc", r.s_text || ""), a("--cardc", r.s_card || ""), a("--r", `${h(r.s_radius, 22)}px`), a("--gap", `${h(r.s_gap, 18)}px`), a("--ts", `${h(r.s_title_size, 38)}px`), a("--fs", `${h(r.s_text_size, 16)}px`), a("--pt", `${h(r.s_pad_top, 56)}px`), a("--pb", `${h(r.s_pad_bottom, 56)}px`), a("--maxw", ht[w(r.s_width, "normal")] ?? "1240px"), a("--sh", ft[Math.max(0, Math.min(5, h(r.s_shadow, 2)))]), a("--ms", `${h(r.s_anim_ms, 700)}ms`), a("--ov", String(h(r.s_overlay, 45) / 100)), r.s_bg_image && a("--bgimg", `url("${String(r.s_bg_image)}")`);
    const o = pt(w(r.s_font, "inherit"));
    return o && a("font-family", `'${o}', inherit`), n.join(";") + (e ? ";" + e : "");
  }
  cls() {
    const e = this.c;
    return [
      "sec",
      `th-${w(e.s_theme, "auto")}`,
      `al-${w(e.s_align, "start")}`,
      `an-${w(e.s_anim, "rise")}`,
      `pt-${w(e.s_pattern, "none")}`,
      `bs-${w(e.s_btn_style, "pill")}`,
      b(e.s_border) ? "bordered" : "",
      b(e.s_stagger, !0) ? "stagger" : "",
      e.s_bg_image ? "has-img" : ""
    ].join(" ");
  }
  /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
  shell(e, r = {}, n = "", a = "", o = !0) {
    if (this.hiddenNow()) return B;
    const s = this.c, d = f(s.eyebrow, r.eyebrow ?? ""), u = f(s.title, r.title ?? ""), p = f(s.subtitle, r.sub ?? ""), x = o && b(s.s_show_head, !0) && (d || u || p);
    return l`<section class="${this.cls()} ${n}" style=${this.vars(a)} id=${String(s.s_anchor || "") || B}>
      <div class="wrap">${x ? l`<header class="head">${d ? l`<span class="eyebrow">${d}</span>` : ""}${u ? l`<h2 class="title">${u}</h2>` : ""}${p ? l`<p class="sub">${p}</p>` : ""}</header>` : ""}
      ${e}</div></section>`;
  }
  /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
  hints(e) {
    const r = e.filter(Boolean);
    return !r.length || !lt() || !b(this.c.s_hints, !0) ? "" : l`<aside class="hints" role="note"><b>💡 ${g("مساعد الإعداد (يظهر لك فقط)", "Setup assistant (only you see this)")}</b><ul>${r.map((n) => l`<li>${n}</li>`)}</ul></aside>`;
  }
  card(e, r = {}) {
    var n;
    return l`<article class="pc ${e.available ? "" : "oos"}">
      <a class="ph" href=${e.url} @click=${() => j(e)}><img src=${e.image} alt=${e.name} loading="lazy" />${(n = r.badges) != null && n.length ? l`<span class="badges">${r.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e.url} @click=${() => j(e)}>${e.name}</a>
        <div class="pr"><b>${N(e.price)}</b>${e.regular > e.price ? l`<s>${N(e.regular)}</s>` : ""}</div>
        ${r.rating !== !1 && e.rating > 0 ? l`<div class="rt">★ ${e.rating.toFixed(1)}${e.ratingCount ? l` <small>(${e.ratingCount})</small>` : ""}</div>` : ""}
        ${r.extra ?? ""}
        ${r.quick !== !1 ? l`<button class="btn sm" ?disabled=${!e.available} @click=${() => this.add(e)}>${e.available ? g("أضف للسلة", "Add to cart") : g("نفدت الكمية", "Sold out")}</button>` : ""}
      </div></article>`;
  }
  async add(e, r = 1, n) {
    j(e, 3), await J(e.id, r, n) ? U(g("تمت الإضافة للسلة", "Added to cart")) : location.href = e.url;
  }
};
G.base = P`
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
let _ = G;
gt([
  Q({ type: Object })
], _.prototype, "config");
var bt = Object.defineProperty, C = (t, e, r, n) => {
  for (var a = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = s(e, r, a) || a);
  return a && bt(e, r, a), a;
};
const I = class I extends _ {
  constructor() {
    super(...arguments), this.needs = [], this.on = [], this.pool = [], this.auto = !1, this.skip = [], this.seq = 0;
  }
  willUpdate(e) {
    e.has("config") && this.load();
  }
  async load() {
    const e = ++this.seq, r = this.c;
    let n = Z(r.needs).map((s) => ({ label: f(s.label), emoji: f(s.emoji, "✨"), desc: f(s.desc), tip: f(s.tip), prods: Y(s.products), cat: "" })).filter((s) => s.label), a = n.length ? await H([...new Set(n.flatMap((s) => s.prods))]) : [], o = !1;
    n.length || (o = !0, a = (await rt(r.products, w(r.auto_source, "best_selling"), 24)).items, n = [...new Set(a.map((s) => s.category).filter(Boolean))].slice(0, 8).map((s) => ({ label: s, emoji: "✨", desc: "", tip: "", prods: [], cat: s }))), e === this.seq && (this.needs = n, this.pool = a.filter((s) => s.available || !b(r.hide_oos, !0)), this.auto = o, this.on = b(r.preselect_first, !1) && n.length ? [0] : []);
  }
  render() {
    const e = this.c, r = this.needs, n = (i) => this.on.filter((c) => r[c].cat ? i.category === r[c].cat : r[c].prods.includes(i.id)), a = this.pool.map((i) => ({ p: i, cv: n(i) })).filter((i) => i.cv.length).sort((i, c) => c.cv.length - i.cv.length || c.p.rating - i.p.rating), o = h(e.per_need, 2), s = [], d = /* @__PURE__ */ new Map();
    for (const i of a)
      i.cv.some((c) => (d.get(c) ?? 0) < o) && (s.push(i), i.cv.forEach((c) => d.set(c, (d.get(c) ?? 0) + 1)));
    const u = s.filter((i) => !this.skip.includes(i.p.id)), p = u.reduce((i, c) => i + c.p.price, 0), x = async () => {
      for (const i of u) i.p.available && await J(i.p.id);
      U(g("أضفنا خطتك للسلة", "Your plan was added to the cart"));
    };
    return this.shell(
      l`${this.hints([this.auto && g("لم تضف احتياجات؛ نعرض أقسام متجرك كاحتياجات تلقائياً.", "No needs yet: using your categories.")])}
      <div class="needs">${r.map((i, c) => l`<button class="n ${this.on.includes(c) ? "on" : ""}" @click=${() => {
        this.on = this.on.includes(c) ? this.on.filter(($) => $ !== c) : [...this.on, c], st(i.label, 2);
      }}><span class="e">${i.emoji}</span><b>${i.label}</b>${i.desc ? l`<small>${i.desc}</small>` : ""}</button>`)}</div>
      ${this.on.length ? l`<div class="steps">${s.map((i) => l`<div class="st ${this.skip.includes(i.p.id) ? "off" : ""}">
          <img src=${i.p.image} alt="" loading="lazy" /><div><a href=${i.p.url}>${i.p.name}</a> · <b style="color:var(--A)">${N(i.p.price)}</b>
          ${b(e.show_covers, !0) ? l`<div class="covers">${i.cv.map((c) => l`<span>${r[c].emoji} ${r[c].label}</span>`)}${i.cv.length > 1 ? l`<span>⭐ ${g(`يغطي ${i.cv.length} احتياجات`, `covers ${i.cv.length} needs`)}</span>` : ""}</div>` : ""}
          ${b(e.show_tips, !0) && r[i.cv[0]].tip ? l`<div class="tip">💡 ${r[i.cv[0]].tip}</div>` : ""}</div>
          <button class="chip x" @click=${() => this.skip = this.skip.includes(i.p.id) ? this.skip.filter((c) => c !== i.p.id) : [...this.skip, i.p.id]}>${this.skip.includes(i.p.id) ? g("أرجعه", "Restore") : g("عندي", "I have it")}</button></div>`)}</div>
        <div class="tot panel"><div>${g("مجموع خطتك", "Plan total")} · ${u.length} ${g("منتج", "items")}<br /><b>${N(p)}</b></div><button class="btn" ?disabled=${!u.length} @click=${x}>${f(e.button, g("أضف الخطة كاملة للسلة", "Add the whole plan"))}</button></div>` : l`<p class="muted center">${f(e.empty_text, g("اختر احتياجاتك وتطلع لك خطة متكاملة من منتجاتنا 👆", "Pick your needs to get a complete plan 👆"))}</p>`}`,
      { eyebrow: g("خطتك", "Your plan"), title: g("وش تحتاج؟ نرتّبها لك خطوة بخطوة", "What do you need? We plan it step by step") }
    );
  }
};
I.styles = [_.base, P`
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
let v = I;
C([
  A()
], v.prototype, "needs");
C([
  A()
], v.prototype, "on");
C([
  A()
], v.prototype, "pool");
C([
  A()
], v.prototype, "auto");
C([
  A()
], v.prototype, "skip");
typeof v < "u" && v.registerSallaComponent("salla-murshid-plan");
export {
  v as default
};
