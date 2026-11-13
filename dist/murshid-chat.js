import { LitElement as tt, nothing as M, html as c, css as K } from "lit";
import { property as et, state as B, query as rt } from "lit/decorators.js";
const m = () => window.salla ?? window.Salla, G = async () => {
  var t, e;
  try {
    await ((e = (t = m()) == null ? void 0 : t.onReady) == null ? void 0 : e.call(t));
  } catch {
  }
}, X = () => {
  var t, e, r, i, a;
  try {
    const n = ((e = (t = m()) == null ? void 0 : t.lang) == null ? void 0 : e.locale) ?? ((a = (i = (r = m()) == null ? void 0 : r.config) == null ? void 0 : i.get) == null ? void 0 : a.call(i, "user.language_code"));
    if (typeof n == "string" && n) return n.slice(0, 2);
  } catch {
  }
  return (document.documentElement.lang || "ar").slice(0, 2);
}, at = () => X() === "en", l = (t, e) => at() ? e : t, it = (t) => {
  var e, r, i;
  try {
    return (i = (r = (e = m()) == null ? void 0 : e.config) == null ? void 0 : r.get) == null ? void 0 : i.call(r, t);
  } catch {
    return;
  }
}, h = (t, e = "") => {
  if (t == null) return e;
  if (typeof t == "string") {
    const r = t.trim();
    if (r.startsWith("{") && r.endsWith("}"))
      try {
        return h(JSON.parse(r), e);
      } catch {
      }
    return r || e;
  }
  if (typeof t == "number" || typeof t == "boolean") return String(t);
  if (typeof t == "object") {
    const r = t, i = r[X()] ?? r.ar ?? r.en ?? Object.values(r).find((a) => typeof a == "string" && a);
    return typeof i == "string" && i.trim() ? i : e;
  }
  return e;
}, k = (t, e = "") => {
  const r = Array.isArray(t) ? t[0] : t, i = typeof r == "object" && r ? r.value : r;
  return i == null || i === "" ? e : String(i);
}, u = (t, e = 0) => {
  const r = Number(t);
  return t === "" || t == null || !Number.isFinite(r) ? e : r;
}, _ = (t, e = !1) => t == null || t === "" ? e : t === !0 || t === "true" || t === 1 || t === "1", P = (t) => Array.isArray(t) ? t : [], q = (t) => h(t).split(/[,،\n]/).map((e) => e.trim()).filter(Boolean), $ = (t) => {
  const e = typeof t == "object" && t ? t.amount : t, r = Number(e);
  return Number.isFinite(r) ? r : 0;
}, nt = (t) => {
  if (!t) return null;
  const e = typeof t == "number" ? t < 1e12 ? t * 1e3 : t : Date.parse(String(t).replace(" ", "T"));
  return Number.isFinite(e) && e > Date.now() ? e : null;
};
function R(t) {
  var d, p, g, b, f, w, x, S, o;
  const e = $(t == null ? void 0 : t.sale_price), r = $((t == null ? void 0 : t.regular_price) ?? (t == null ? void 0 : t.price)), i = e && e < r ? e : $(t == null ? void 0 : t.price) || r, a = Math.max($(t == null ? void 0 : t.regular_price), $(t == null ? void 0 : t.price), i), n = (Array.isArray(t == null ? void 0 : t.images) ? t.images : []).map((v) => String((v == null ? void 0 : v.url) ?? v ?? "")).filter(Boolean), s = (t == null ? void 0 : t.sold_quantity) ?? (t == null ? void 0 : t.sold);
  return {
    id: Number(t == null ? void 0 : t.id),
    name: String((t == null ? void 0 : t.name) ?? ""),
    url: String((t == null ? void 0 : t.url) ?? "#"),
    image: String(((d = t == null ? void 0 : t.image) == null ? void 0 : d.url) ?? (t == null ? void 0 : t.main_image) ?? (t == null ? void 0 : t.thumbnail) ?? n[0] ?? ""),
    images: n,
    price: i,
    regular: a,
    discount: a > i ? Math.round((1 - i / a) * 100) : 0,
    rating: $(((p = t == null ? void 0 : t.rating) == null ? void 0 : p.stars) ?? ((g = t == null ? void 0 : t.rating) == null ? void 0 : g.rate) ?? (t == null ? void 0 : t.rating)),
    ratingCount: $((b = t == null ? void 0 : t.rating) == null ? void 0 : b.count),
    qty: (t == null ? void 0 : t.quantity) == null || t != null && t.unlimited_quantity ? null : $(t == null ? void 0 : t.quantity),
    available: (t == null ? void 0 : t.is_available) !== !1 && (t == null ? void 0 : t.status) !== "out" && !((t == null ? void 0 : t.quantity) === 0 && !(t != null && t.unlimited_quantity)),
    sold: s == null || s === "" || !Number.isFinite(Number(s)) ? null : Number(s),
    endsAt: nt((t == null ? void 0 : t.discount_ends) ?? (t == null ? void 0 : t.sale_end) ?? (t == null ? void 0 : t.discount_end)),
    category: String(((f = t == null ? void 0 : t.category) == null ? void 0 : f.name) ?? ((x = (w = t == null ? void 0 : t.categories) == null ? void 0 : w[0]) == null ? void 0 : x.name) ?? ""),
    brand: String(((S = t == null ? void 0 : t.brand) == null ? void 0 : S.name) ?? ""),
    promo: String(((o = t == null ? void 0 : t.promotion) == null ? void 0 : o.title) ?? (t == null ? void 0 : t.promotion_title) ?? "")
  };
}
const Q = (t) => (Array.isArray(t) ? t : []).map((e) => Number(typeof e == "object" && e ? e.value : e)).filter((e) => Number.isFinite(e) && e > 0), C = /* @__PURE__ */ new Map();
async function st(t) {
  var i, a, n;
  const e = (i = m()) == null ? void 0 : i.product;
  if (!e) return null;
  const r = e.getDetails ? e.getDetails.bind(e) : (n = (a = e.api) == null ? void 0 : a.getDetails) == null ? void 0 : n.bind(e.api);
  if (!r) return null;
  try {
    const s = await r(t, ["images", "sold_quantity", "category"]), d = R((s == null ? void 0 : s.data) ?? s);
    return d.name ? d : null;
  } catch {
    return null;
  }
}
async function V(t) {
  await G();
  const e = "ids:" + t.join(",");
  return C.has(e) || C.set(e, Promise.all(t.map(st)).then((r) => r.filter((i) => !!i))), C.get(e);
}
async function F(t, e = [], r = 12) {
  await G();
  const i = `src:${t}:${e.join(",")}:${r}`;
  return C.has(i) || C.set(i, (async () => {
    var s, d, p, g;
    const a = (s = m()) == null ? void 0 : s.product, n = a != null && a.fetch ? a.fetch.bind(a) : (p = (d = a == null ? void 0 : a.api) == null ? void 0 : d.fetch) == null ? void 0 : p.bind(a.api);
    if (!n) return [];
    try {
      const b = { source: t, per_page: r };
      e.length && (b.source_value = e);
      const f = await n(b);
      return (Array.isArray(f == null ? void 0 : f.data) ? f.data : Array.isArray(f) ? f : ((g = f == null ? void 0 : f.data) == null ? void 0 : g.products) ?? []).map(R).filter((x) => x.name).slice(0, r);
    } catch {
      return [];
    }
  })()), C.get(i);
}
async function ot(t, e = "best_selling", r = 12) {
  const i = Q(t);
  if (i.length) return { items: (await V(i)).slice(0, r), auto: !1 };
  let a = await F(e, [], r);
  return !a.length && e !== "latest" && (a = await F("latest", [], r)), { items: a, auto: !0 };
}
const lt = async (t) => {
  var e, r, i, a;
  await G();
  try {
    const n = await ((i = (r = (e = m()) == null ? void 0 : e.product) == null ? void 0 : r.search) == null ? void 0 : i.call(r, { query: t }));
    return (Array.isArray(n == null ? void 0 : n.data) ? n.data : ((a = n == null ? void 0 : n.data) == null ? void 0 : a.products) ?? []).map(R).filter((d) => d.name);
  } catch {
    return [];
  }
}, A = (t) => {
  var e, r;
  try {
    const i = (r = (e = m()) == null ? void 0 : e.money) == null ? void 0 : r.call(e, t);
    if (i) return String(i);
  } catch {
  }
  return `${Math.round(t * 100) / 100} ${l("ر.س", "SAR")}`;
};
async function ct(t, e = 1, r) {
  var i, a, n;
  await G();
  try {
    return await ((n = (a = (i = m()) == null ? void 0 : i.cart) == null ? void 0 : a.addItem) == null ? void 0 : n.call(a, r ? { id: t, quantity: e, notes: r } : { id: t, quantity: e })), !0;
  } catch {
    return !1;
  }
}
function dt(t, e = !0) {
  var r, i, a;
  try {
    (a = e ? (r = m()) == null ? void 0 : r.success : (i = m()) == null ? void 0 : i.error) == null || a(t);
  } catch {
  }
}
const gt = (t, e) => {
  var r, i, a;
  try {
    (a = (i = (r = m()) == null ? void 0 : r.event) == null ? void 0 : i.on) == null || a.call(i, t, e);
  } catch {
  }
}, W = () => String(it("store.name") ?? ""), H = (t) => t.toLowerCase().replace(/[\u064B-\u065F\u0670\u0640]/g, "").replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ؤ/g, "و").replace(/ئ/g, "ي"), I = "tw_smart_mem_v1", Y = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
function Z() {
  try {
    return { ...Y(), ...JSON.parse(localStorage.getItem(I) || "{}") };
  } catch {
    return Y();
  }
}
function ut(t) {
  try {
    localStorage.setItem(I, JSON.stringify(t));
  } catch {
  }
}
function j(t) {
  const e = Z();
  return t(e), ut(e), e;
}
function pt() {
  let t = !1;
  try {
    t = !sessionStorage.getItem(I), sessionStorage.setItem(I, "1");
  } catch {
  }
  return t ? j((e) => {
    e.visits += 1, e.last = Date.now();
  }) : Z();
}
const D = (t, e = 1) => j((r) => {
  r.seen[t.id] = (r.seen[t.id] || 0) + e, r.prices = [...r.prices.slice(-29), t.price], t.category && (r.tags[t.category] = (r.tags[t.category] || 0) + e);
});
let U = !1;
function ht() {
  U || (U = !0, gt("cart::item.added", (t) => {
    var r;
    const e = Number(((r = t == null ? void 0 : t.data) == null ? void 0 : r.product_id) ?? 0);
    e && j((i) => {
      i.carted.includes(e) || (i.carted = [...i.carted.slice(-40), e]);
    });
  }));
}
const ft = () => {
  const t = innerWidth, e = navigator.userAgent;
  return /iPad|Tablet/i.test(e) || t >= 700 && t < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e) || t < 700 ? "mobile" : "desktop";
}, mt = () => {
  try {
    return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
  } catch {
    return !0;
  }
};
var bt = Object.defineProperty, xt = (t, e, r, i) => {
  for (var a = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (a = s(e, r, a) || a);
  return a && bt(e, r, a), a;
};
const vt = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" }, J = /* @__PURE__ */ new Set();
function yt(t) {
  const e = vt[t];
  if (!e || J.has(e)) return e;
  J.add(e);
  const r = document.createElement("link");
  return r.rel = "stylesheet", r.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e)}:wght@400;500;700;800&display=swap`, document.head.appendChild(r), e;
}
const wt = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" }, $t = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"], L = class L extends tt {
  get c() {
    return this.config ?? {};
  }
  connectedCallback() {
    super.connectedCallback(), ht(), pt();
  }
  firstUpdated() {
    if (!("IntersectionObserver" in window)) {
      this.setAttribute("in", "");
      return;
    }
    this.io = new IntersectionObserver((e) => {
      var r;
      e.some((i) => i.isIntersecting) && (this.setAttribute("in", ""), (r = this.io) == null || r.disconnect());
    }, { threshold: 0.12 }), this.io.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.io) == null || e.disconnect();
  }
  /** Hidden by the merchant's schedule or device rule? */
  hiddenNow() {
    const e = this.c, r = Date.now(), i = Date.parse(String(e.s_from || "")), a = Date.parse(String(e.s_to || ""));
    if (Number.isFinite(i) && r < i || Number.isFinite(a) && r > a) return !0;
    const n = ft();
    return !!(_(e.s_hide_mobile) && n === "mobile" || _(e.s_hide_desktop) && n !== "mobile");
  }
  vars(e = "") {
    const r = this.c, i = [], a = (s, d) => {
      d !== "" && d != null && i.push(`${s}:${d}`);
    };
    a("--a", r.s_accent || ""), a("--a2", r.s_accent2 || ""), a("--bgc", r.s_bg || ""), a("--fgc", r.s_text || ""), a("--cardc", r.s_card || ""), a("--r", `${u(r.s_radius, 22)}px`), a("--gap", `${u(r.s_gap, 18)}px`), a("--ts", `${u(r.s_title_size, 38)}px`), a("--fs", `${u(r.s_text_size, 16)}px`), a("--pt", `${u(r.s_pad_top, 56)}px`), a("--pb", `${u(r.s_pad_bottom, 56)}px`), a("--maxw", wt[k(r.s_width, "normal")] ?? "1240px"), a("--sh", $t[Math.max(0, Math.min(5, u(r.s_shadow, 2)))]), a("--ms", `${u(r.s_anim_ms, 700)}ms`), a("--ov", String(u(r.s_overlay, 45) / 100)), r.s_bg_image && a("--bgimg", `url("${String(r.s_bg_image)}")`);
    const n = yt(k(r.s_font, "inherit"));
    return n && a("font-family", `'${n}', inherit`), i.join(";") + (e ? ";" + e : "");
  }
  cls() {
    const e = this.c;
    return [
      "sec",
      `th-${k(e.s_theme, "auto")}`,
      `al-${k(e.s_align, "start")}`,
      `an-${k(e.s_anim, "rise")}`,
      `pt-${k(e.s_pattern, "none")}`,
      `bs-${k(e.s_btn_style, "pill")}`,
      _(e.s_border) ? "bordered" : "",
      _(e.s_stagger, !0) ? "stagger" : "",
      e.s_bg_image ? "has-img" : ""
    ].join(" ");
  }
  /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
  shell(e, r = {}, i = "", a = "", n = !0) {
    if (this.hiddenNow()) return M;
    const s = this.c, d = h(s.eyebrow, r.eyebrow ?? ""), p = h(s.title, r.title ?? ""), g = h(s.subtitle, r.sub ?? ""), b = n && _(s.s_show_head, !0) && (d || p || g);
    return c`<section class="${this.cls()} ${i}" style=${this.vars(a)} id=${String(s.s_anchor || "") || M}>
      <div class="wrap">${b ? c`<header class="head">${d ? c`<span class="eyebrow">${d}</span>` : ""}${p ? c`<h2 class="title">${p}</h2>` : ""}${g ? c`<p class="sub">${g}</p>` : ""}</header>` : ""}
      ${e}</div></section>`;
  }
  /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
  hints(e) {
    const r = e.filter(Boolean);
    return !r.length || !mt() || !_(this.c.s_hints, !0) ? "" : c`<aside class="hints" role="note"><b>💡 ${l("مساعد الإعداد (يظهر لك فقط)", "Setup assistant (only you see this)")}</b><ul>${r.map((i) => c`<li>${i}</li>`)}</ul></aside>`;
  }
  card(e, r = {}) {
    var i;
    return c`<article class="pc ${e.available ? "" : "oos"}">
      <a class="ph" href=${e.url} @click=${() => D(e)}><img src=${e.image} alt=${e.name} loading="lazy" />${(i = r.badges) != null && i.length ? c`<span class="badges">${r.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e.url} @click=${() => D(e)}>${e.name}</a>
        <div class="pr"><b>${A(e.price)}</b>${e.regular > e.price ? c`<s>${A(e.regular)}</s>` : ""}</div>
        ${r.rating !== !1 && e.rating > 0 ? c`<div class="rt">★ ${e.rating.toFixed(1)}${e.ratingCount ? c` <small>(${e.ratingCount})</small>` : ""}</div>` : ""}
        ${r.extra ?? ""}
        ${r.quick !== !1 ? c`<button class="btn sm" ?disabled=${!e.available} @click=${() => this.add(e)}>${e.available ? l("أضف للسلة", "Add to cart") : l("نفدت الكمية", "Sold out")}</button>` : ""}
      </div></article>`;
  }
  async add(e, r = 1, i) {
    D(e, 3), await ct(e.id, r, i) ? dt(l("تمت الإضافة للسلة", "Added to cart")) : location.href = e.url;
  }
};
L.base = K`
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
let N = L;
xt([
  et({ type: Object })
], N.prototype, "config");
var kt = Object.defineProperty, z = (t, e, r, i) => {
  for (var a = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (a = s(e, r, a) || a);
  return a && kt(e, r, a), a;
};
const _t = (t) => t.replace(/[٠-٩]/g, (e) => String("٠١٢٣٤٥٦٧٨٩".indexOf(e))), O = class O extends N {
  constructor() {
    super(...arguments), this.msgs = [], this.typing = !1, this.open = !1, this.input = "";
  }
  willUpdate(e) {
    e.has("config") && !this.msgs.length && (this.msgs = [{ me: !1, text: h(this.c.greeting, l(`أهلاً! أنا ${this.botName()} 👋
قل لي وش تدوّر عليه، أو حدد ميزانيتك مثل «هدية تحت 200»`, `Hi! I am ${this.botName()} 👋
Tell me what you need, or a budget like "gift under 200"`)) }]);
  }
  updated(e) {
    super.updated(e), this.log && (this.log.scrollTop = this.log.scrollHeight);
  }
  botName() {
    return h(this.c.bot_name, l(`مساعد ${W() || "المتجر"}`, `${W() || "Store"} assistant`));
  }
  async reply(e) {
    const r = this.c, i = H(_t(e)), a = (i.match(/\d+/g) ?? []).map(Number), n = /(فوق|اكثر من|over|above)/.test(i), s = a.length ? n ? null : Math.max(...a) : null, d = a.length && n ? Math.min(...a) : null, p = (o) => o.filter((v) => v.available && (s == null || v.price <= s) && (d == null || v.price >= d));
    let g = null, b = 0;
    for (const o of P(r.intents)) {
      const T = [...q(o.keywords), h(o.label)].map((E) => H(E)).filter(Boolean).filter((E) => i.includes(E)).length;
      T > b && (b = T, g = o);
    }
    if (g) {
      const o = p(await V(Q(g.products)));
      return { me: !1, text: h(g.reply), prods: o.slice(0, u(r.max_results, 6)), link: String(g.link || ""), linkText: h(g.link_text) };
    }
    const w = [
      [/(عرض|عروض|خصم|تخفيض|اوفر|deal|offer|sale|discount)/, "offers", "هذي المنتجات اللي عليها خصم الحين:", "These are on sale right now:"],
      [/(جديد|احدث|وصل|new|latest)/, "latest", "أحدث ما وصلنا:", "Our newest arrivals:"],
      [/(مبيع|طلب|مشهور|ترند|best|popular|trend)/, "best_selling", "الأكثر طلباً في المتجر:", "Most ordered in the store:"],
      [/(هديه|هدايا|اهدي|gift)/, "top-rated", "اقتراحات هدايا من الأعلى تقييماً:", "Gift ideas from our top rated:"],
      [/(تقييم|افضل|احسن|top|rated|best)/, "top-rated", "الأعلى تقييماً عند عملائنا:", "Top rated by our customers:"]
    ].find(([o]) => o.test(i));
    if (w) {
      const o = p(await F(w[1], [], 24));
      if (o.length) return { me: !1, text: (s ? l(`ضمن ${A(s)}، `, `Within ${A(s)}, `) : "") + l(w[2], w[3]), prods: o.slice(0, u(r.max_results, 6)) };
    }
    const x = e.replace(/[0-9٠-٩]+/g, "").replace(/(تحت|اقل من|أقل من|فوق|ريال|ر\.س|بـ|ابي|أبي|ابغى|أبغى|ودي|عندكم|فيه|عطني|under|over|i want|do you have)/gi, " ").trim();
    if (_(r.search_fallback, !0) && x.length > 1) {
      const o = p(await lt(x));
      if (o.length) return { me: !1, text: l(`لقيت لك ${o.length} منتج يناسب «${x}»:`, `I found ${o.length} for "${x}":`), prods: o.slice(0, u(r.max_results, 6)) };
    }
    if (s) {
      const o = p((await ot(r.products, "best_selling", 30)).items);
      if (o.length) return { me: !1, text: l(`هذي اختيارات ضمن ميزانيتك ${A(s)}:`, `Picks within ${A(s)}:`), prods: o.slice(0, u(r.max_results, 6)) };
    }
    const S = String(r.whatsapp || "").replace(/\D/g, "");
    return { me: !1, text: h(r.fallback, l("ما لقيت شي مطابق 🙏 جرّب كلمة ثانية، أو كلّم فريقنا مباشرة.", "Nothing matched 🙏 try other words or talk to our team.")), link: S ? `https://wa.me/${S}?text=${encodeURIComponent(e)}` : "", linkText: l("كلّمنا واتساب", "Chat on WhatsApp") };
  }
  async send(e) {
    if (e = e.trim(), !e) return;
    this.input = "", this.msgs = [...this.msgs, { me: !0, text: e }], this.typing = !0;
    const [r] = await Promise.all([this.reply(e), new Promise((i) => setTimeout(i, u(this.c.typing_ms, 700)))]);
    this.typing = !1, this.msgs = [...this.msgs, r];
  }
  ui() {
    const e = this.c, r = [...P(e.intents).map((a) => h(a.label)).filter(Boolean), ...q(e.suggestions)], i = r.length ? r : [l("العروض", "Deals"), l("الأكثر مبيعاً", "Best sellers"), l("هدية تحت 200", "Gift under 200"), l("وش الجديد؟", "What is new?")];
    return c`<div class="chat" style=${`--ch:${u(e.height, 560)}px`}>
      <div class="top"><div class="av" style=${e.avatar ? `background-image:url("${e.avatar}")` : ""}>${e.avatar ? "" : "🤖"}</div><div><b>${this.botName()}</b><small>${h(e.status, l("متصل الآن · يرد فوراً", "Online · replies instantly"))}</small></div></div>
      <div class="log" aria-live="polite">${this.msgs.map((a) => {
      var n;
      return c`<div class="m ${a.me ? "me" : "bot"}">${a.text}
        ${(n = a.prods) != null && n.length ? c`<div class="ps">${a.prods.map((s) => c`<a class="p" href=${s.url} @click=${() => D(s)}><img src=${s.image} alt="" loading="lazy" /><span>${s.name}</span><b>${A(s.price)}</b></a>`)}</div>` : ""}
        ${a.link ? c`<a class="ml" href=${a.link} target="_blank" rel="noopener">${a.linkText || l("افتح", "Open")} ←</a>` : ""}</div>`;
    })}
        ${this.typing ? c`<div class="m bot"><span class="typing"><i></i><i></i><i></i></span></div>` : ""}</div>
      ${_(e.show_suggestions, !0) ? c`<div class="sug">${i.slice(0, 8).map((a) => c`<button class="chip" @click=${() => this.send(a)}>${a}</button>`)}</div>` : ""}
      <form @submit=${(a) => {
      a.preventDefault(), this.send(this.input);
    }}><input .value=${this.input} @input=${(a) => this.input = a.target.value} placeholder=${h(e.placeholder, l("اكتب سؤالك… مثلاً: عطر تحت 300", "Ask… e.g. perfume under 300"))} /><button class="btn" type="submit">${l("إرسال", "Send")}</button></form>
    </div>`;
  }
  render() {
    return k(this.c.mode, "inline") === "floating" ? this.hiddenNow() ? "" : c`<div class=${this.cls()} style=${this.vars()}>${this.open ? c`<div class="float">${this.ui()}</div>` : ""}<button class="fab" aria-label="chat" @click=${() => this.open = !this.open}>${this.open ? "×" : "💬"}</button></div>` : this.shell(this.ui(), { eyebrow: l("مساعد التسوق", "Shopping assistant"), title: l("اسألني عن أي شي في المتجر", "Ask me anything about the store") });
  }
};
O.styles = [N.base, K`
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
let y = O;
z([
  B()
], y.prototype, "msgs");
z([
  B()
], y.prototype, "typing");
z([
  B()
], y.prototype, "open");
z([
  B()
], y.prototype, "input");
z([
  rt(".log")
], y.prototype, "log");
typeof y < "u" && y.registerSallaComponent("salla-murshid-chat");
export {
  y as default
};
