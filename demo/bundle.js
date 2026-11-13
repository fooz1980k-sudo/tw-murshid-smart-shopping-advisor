var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js
var t, e, s, o, n, r, i, S, c;
var init_css_tag = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js"() {
    t = globalThis;
    e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
    s = Symbol();
    o = /* @__PURE__ */ new WeakMap();
    n = class {
      constructor(t3, e6, o7) {
        if (this._$cssResult$ = true, o7 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t3, this.t = e6;
      }
      get styleSheet() {
        let t3 = this.o;
        const s4 = this.t;
        if (e && void 0 === t3) {
          const e6 = void 0 !== s4 && 1 === s4.length;
          e6 && (t3 = o.get(s4)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e6 && o.set(s4, t3));
        }
        return t3;
      }
      toString() {
        return this.cssText;
      }
    };
    r = (t3) => new n("string" == typeof t3 ? t3 : t3 + "", void 0, s);
    i = (t3, ...e6) => {
      const o7 = 1 === t3.length ? t3[0] : e6.reduce((e7, s4, o8) => e7 + ((t4) => {
        if (true === t4._$cssResult$) return t4.cssText;
        if ("number" == typeof t4) return t4;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
      })(s4) + t3[o8 + 1], t3[0]);
      return new n(o7, t3, s);
    };
    S = (s4, o7) => {
      if (e) s4.adoptedStyleSheets = o7.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet);
      else for (const e6 of o7) {
        const o8 = document.createElement("style"), n5 = t.litNonce;
        void 0 !== n5 && o8.setAttribute("nonce", n5), o8.textContent = e6.cssText, s4.appendChild(o8);
      }
    };
    c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
      let e6 = "";
      for (const s4 of t4.cssRules) e6 += s4.cssText;
      return r(e6);
    })(t3) : t3;
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js
var i2, e2, h, r2, o2, n2, a, c2, l, p, d, u, f, b, y;
var init_reactive_element = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js"() {
    init_css_tag();
    init_css_tag();
    ({ is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object);
    a = globalThis;
    c2 = a.trustedTypes;
    l = c2 ? c2.emptyScript : "";
    p = a.reactiveElementPolyfillSupport;
    d = (t3, s4) => t3;
    u = { toAttribute(t3, s4) {
      switch (s4) {
        case Boolean:
          t3 = t3 ? l : null;
          break;
        case Object:
        case Array:
          t3 = null == t3 ? t3 : JSON.stringify(t3);
      }
      return t3;
    }, fromAttribute(t3, s4) {
      let i5 = t3;
      switch (s4) {
        case Boolean:
          i5 = null !== t3;
          break;
        case Number:
          i5 = null === t3 ? null : Number(t3);
          break;
        case Object:
        case Array:
          try {
            i5 = JSON.parse(t3);
          } catch (t4) {
            i5 = null;
          }
      }
      return i5;
    } };
    f = (t3, s4) => !i2(t3, s4);
    b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
    Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
    y = class extends HTMLElement {
      static addInitializer(t3) {
        this._$Ei(), (this.l ??= []).push(t3);
      }
      static get observedAttributes() {
        return this.finalize(), this._$Eh && [...this._$Eh.keys()];
      }
      static createProperty(t3, s4 = b) {
        if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t3) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t3, s4), !s4.noAccessor) {
          const i5 = Symbol(), h8 = this.getPropertyDescriptor(t3, i5, s4);
          void 0 !== h8 && e2(this.prototype, t3, h8);
        }
      }
      static getPropertyDescriptor(t3, s4, i5) {
        const { get: e6, set: r6 } = h(this.prototype, t3) ?? { get() {
          return this[s4];
        }, set(t4) {
          this[s4] = t4;
        } };
        return { get: e6, set(s5) {
          const h8 = e6?.call(this);
          r6?.call(this, s5), this.requestUpdate(t3, h8, i5);
        }, configurable: true, enumerable: true };
      }
      static getPropertyOptions(t3) {
        return this.elementProperties.get(t3) ?? b;
      }
      static _$Ei() {
        if (this.hasOwnProperty(d("elementProperties"))) return;
        const t3 = n2(this);
        t3.finalize(), void 0 !== t3.l && (this.l = [...t3.l]), this.elementProperties = new Map(t3.elementProperties);
      }
      static finalize() {
        if (this.hasOwnProperty(d("finalized"))) return;
        if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
          const t4 = this.properties, s4 = [...r2(t4), ...o2(t4)];
          for (const i5 of s4) this.createProperty(i5, t4[i5]);
        }
        const t3 = this[Symbol.metadata];
        if (null !== t3) {
          const s4 = litPropertyMetadata.get(t3);
          if (void 0 !== s4) for (const [t4, i5] of s4) this.elementProperties.set(t4, i5);
        }
        this._$Eh = /* @__PURE__ */ new Map();
        for (const [t4, s4] of this.elementProperties) {
          const i5 = this._$Eu(t4, s4);
          void 0 !== i5 && this._$Eh.set(i5, t4);
        }
        this.elementStyles = this.finalizeStyles(this.styles);
      }
      static finalizeStyles(s4) {
        const i5 = [];
        if (Array.isArray(s4)) {
          const e6 = new Set(s4.flat(1 / 0).reverse());
          for (const s5 of e6) i5.unshift(c(s5));
        } else void 0 !== s4 && i5.push(c(s4));
        return i5;
      }
      static _$Eu(t3, s4) {
        const i5 = s4.attribute;
        return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
      }
      constructor() {
        super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
      }
      _$Ev() {
        this._$ES = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t3) => t3(this));
      }
      addController(t3) {
        (this._$EO ??= /* @__PURE__ */ new Set()).add(t3), void 0 !== this.renderRoot && this.isConnected && t3.hostConnected?.();
      }
      removeController(t3) {
        this._$EO?.delete(t3);
      }
      _$E_() {
        const t3 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
        for (const i5 of s4.keys()) this.hasOwnProperty(i5) && (t3.set(i5, this[i5]), delete this[i5]);
        t3.size > 0 && (this._$Ep = t3);
      }
      createRenderRoot() {
        const t3 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return S(t3, this.constructor.elementStyles), t3;
      }
      connectedCallback() {
        this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t3) => t3.hostConnected?.());
      }
      enableUpdating(t3) {
      }
      disconnectedCallback() {
        this._$EO?.forEach((t3) => t3.hostDisconnected?.());
      }
      attributeChangedCallback(t3, s4, i5) {
        this._$AK(t3, i5);
      }
      _$ET(t3, s4) {
        const i5 = this.constructor.elementProperties.get(t3), e6 = this.constructor._$Eu(t3, i5);
        if (void 0 !== e6 && true === i5.reflect) {
          const h8 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s4, i5.type);
          this._$Em = t3, null == h8 ? this.removeAttribute(e6) : this.setAttribute(e6, h8), this._$Em = null;
        }
      }
      _$AK(t3, s4) {
        const i5 = this.constructor, e6 = i5._$Eh.get(t3);
        if (void 0 !== e6 && this._$Em !== e6) {
          const t4 = i5.getPropertyOptions(e6), h8 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== t4.converter?.fromAttribute ? t4.converter : u;
          this._$Em = e6;
          const r6 = h8.fromAttribute(s4, t4.type);
          this[e6] = r6 ?? this._$Ej?.get(e6) ?? r6, this._$Em = null;
        }
      }
      requestUpdate(t3, s4, i5, e6 = false, h8) {
        if (void 0 !== t3) {
          const r6 = this.constructor;
          if (false === e6 && (h8 = this[t3]), i5 ??= r6.getPropertyOptions(t3), !((i5.hasChanged ?? f)(h8, s4) || i5.useDefault && i5.reflect && h8 === this._$Ej?.get(t3) && !this.hasAttribute(r6._$Eu(t3, i5)))) return;
          this.C(t3, s4, i5);
        }
        false === this.isUpdatePending && (this._$ES = this._$EP());
      }
      C(t3, s4, { useDefault: i5, reflect: e6, wrapped: h8 }, r6) {
        i5 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t3) && (this._$Ej.set(t3, r6 ?? s4 ?? this[t3]), true !== h8 || void 0 !== r6) || (this._$AL.has(t3) || (this.hasUpdated || i5 || (s4 = void 0), this._$AL.set(t3, s4)), true === e6 && this._$Em !== t3 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t3));
      }
      async _$EP() {
        this.isUpdatePending = true;
        try {
          await this._$ES;
        } catch (t4) {
          Promise.reject(t4);
        }
        const t3 = this.scheduleUpdate();
        return null != t3 && await t3, !this.isUpdatePending;
      }
      scheduleUpdate() {
        return this.performUpdate();
      }
      performUpdate() {
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
          if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
            for (const [t5, s5] of this._$Ep) this[t5] = s5;
            this._$Ep = void 0;
          }
          const t4 = this.constructor.elementProperties;
          if (t4.size > 0) for (const [s5, i5] of t4) {
            const { wrapped: t5 } = i5, e6 = this[s5];
            true !== t5 || this._$AL.has(s5) || void 0 === e6 || this.C(s5, void 0, i5, e6);
          }
        }
        let t3 = false;
        const s4 = this._$AL;
        try {
          t3 = this.shouldUpdate(s4), t3 ? (this.willUpdate(s4), this._$EO?.forEach((t4) => t4.hostUpdate?.()), this.update(s4)) : this._$EM();
        } catch (s5) {
          throw t3 = false, this._$EM(), s5;
        }
        t3 && this._$AE(s4);
      }
      willUpdate(t3) {
      }
      _$AE(t3) {
        this._$EO?.forEach((t4) => t4.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
      }
      _$EM() {
        this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
      }
      get updateComplete() {
        return this.getUpdateComplete();
      }
      getUpdateComplete() {
        return this._$ES;
      }
      shouldUpdate(t3) {
        return true;
      }
      update(t3) {
        this._$Eq &&= this._$Eq.forEach((t4) => this._$ET(t4, this[t4])), this._$EM();
      }
      updated(t3) {
      }
      firstUpdated(t3) {
      }
    };
    y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.2");
  }
});

// ../_kit/node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js
function V(t3, i5) {
  if (!u2(t3) || !t3.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i5) : i5;
}
function M(t3, i5, s4 = t3, e6) {
  if (i5 === E) return i5;
  let h8 = void 0 !== e6 ? s4._$Co?.[e6] : s4._$Cl;
  const o7 = a2(i5) ? void 0 : i5._$litDirective$;
  return h8?.constructor !== o7 && (h8?._$AO?.(false), void 0 === o7 ? h8 = void 0 : (h8 = new o7(t3), h8._$AT(t3, s4, e6)), void 0 !== e6 ? (s4._$Co ??= [])[e6] = h8 : s4._$Cl = h8), void 0 !== h8 && (i5 = M(t3, h8._$AS(t3, i5.values), h8, e6)), i5;
}
var t2, i3, s2, e3, h2, o3, n3, r3, l2, c3, a2, u2, d2, f2, v, _, m, p2, g, $, y2, x, b2, w, T, E, A, C, P, N, S2, R, k, H, I, L, z, Z, B, D;
var init_lit_html = __esm({
  "../_kit/node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js"() {
    t2 = globalThis;
    i3 = (t3) => t3;
    s2 = t2.trustedTypes;
    e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
    h2 = "$lit$";
    o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
    n3 = "?" + o3;
    r3 = `<${n3}>`;
    l2 = document;
    c3 = () => l2.createComment("");
    a2 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
    u2 = Array.isArray;
    d2 = (t3) => u2(t3) || "function" == typeof t3?.[Symbol.iterator];
    f2 = "[ 	\n\f\r]";
    v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
    _ = /-->/g;
    m = />/g;
    p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
    g = /'/g;
    $ = /"/g;
    y2 = /^(?:script|style|textarea|title)$/i;
    x = (t3) => (i5, ...s4) => ({ _$litType$: t3, strings: i5, values: s4 });
    b2 = x(1);
    w = x(2);
    T = x(3);
    E = Symbol.for("lit-noChange");
    A = Symbol.for("lit-nothing");
    C = /* @__PURE__ */ new WeakMap();
    P = l2.createTreeWalker(l2, 129);
    N = (t3, i5) => {
      const s4 = t3.length - 1, e6 = [];
      let n5, l4 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c4 = v;
      for (let i6 = 0; i6 < s4; i6++) {
        const s5 = t3[i6];
        let a3, u5, d5 = -1, f6 = 0;
        for (; f6 < s5.length && (c4.lastIndex = f6, u5 = c4.exec(s5), null !== u5); ) f6 = c4.lastIndex, c4 === v ? "!--" === u5[1] ? c4 = _ : void 0 !== u5[1] ? c4 = m : void 0 !== u5[2] ? (y2.test(u5[2]) && (n5 = RegExp("</" + u5[2], "g")), c4 = p2) : void 0 !== u5[3] && (c4 = p2) : c4 === p2 ? ">" === u5[0] ? (c4 = n5 ?? v, d5 = -1) : void 0 === u5[1] ? d5 = -2 : (d5 = c4.lastIndex - u5[2].length, a3 = u5[1], c4 = void 0 === u5[3] ? p2 : '"' === u5[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n5 = void 0);
        const x3 = c4 === p2 && t3[i6 + 1].startsWith("/>") ? " " : "";
        l4 += c4 === v ? s5 + r3 : d5 >= 0 ? (e6.push(a3), s5.slice(0, d5) + h2 + s5.slice(d5) + o3 + x3) : s5 + o3 + (-2 === d5 ? i6 : x3);
      }
      return [V(t3, l4 + (t3[s4] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), e6];
    };
    S2 = class _S {
      constructor({ strings: t3, _$litType$: i5 }, e6) {
        let r6;
        this.parts = [];
        let l4 = 0, a3 = 0;
        const u5 = t3.length - 1, d5 = this.parts, [f6, v5] = N(t3, i5);
        if (this.el = _S.createElement(f6, e6), P.currentNode = this.el.content, 2 === i5 || 3 === i5) {
          const t4 = this.el.content.firstChild;
          t4.replaceWith(...t4.childNodes);
        }
        for (; null !== (r6 = P.nextNode()) && d5.length < u5; ) {
          if (1 === r6.nodeType) {
            if (r6.hasAttributes()) for (const t4 of r6.getAttributeNames()) if (t4.endsWith(h2)) {
              const i6 = v5[a3++], s4 = r6.getAttribute(t4).split(o3), e7 = /([.?@])?(.*)/.exec(i6);
              d5.push({ type: 1, index: l4, name: e7[2], strings: s4, ctor: "." === e7[1] ? I : "?" === e7[1] ? L : "@" === e7[1] ? z : H }), r6.removeAttribute(t4);
            } else t4.startsWith(o3) && (d5.push({ type: 6, index: l4 }), r6.removeAttribute(t4));
            if (y2.test(r6.tagName)) {
              const t4 = r6.textContent.split(o3), i6 = t4.length - 1;
              if (i6 > 0) {
                r6.textContent = s2 ? s2.emptyScript : "";
                for (let s4 = 0; s4 < i6; s4++) r6.append(t4[s4], c3()), P.nextNode(), d5.push({ type: 2, index: ++l4 });
                r6.append(t4[i6], c3());
              }
            }
          } else if (8 === r6.nodeType) if (r6.data === n3) d5.push({ type: 2, index: l4 });
          else {
            let t4 = -1;
            for (; -1 !== (t4 = r6.data.indexOf(o3, t4 + 1)); ) d5.push({ type: 7, index: l4 }), t4 += o3.length - 1;
          }
          l4++;
        }
      }
      static createElement(t3, i5) {
        const s4 = l2.createElement("template");
        return s4.innerHTML = t3, s4;
      }
    };
    R = class {
      constructor(t3, i5) {
        this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i5;
      }
      get parentNode() {
        return this._$AM.parentNode;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      u(t3) {
        const { el: { content: i5 }, parts: s4 } = this._$AD, e6 = (t3?.creationScope ?? l2).importNode(i5, true);
        P.currentNode = e6;
        let h8 = P.nextNode(), o7 = 0, n5 = 0, r6 = s4[0];
        for (; void 0 !== r6; ) {
          if (o7 === r6.index) {
            let i6;
            2 === r6.type ? i6 = new k(h8, h8.nextSibling, this, t3) : 1 === r6.type ? i6 = new r6.ctor(h8, r6.name, r6.strings, this, t3) : 6 === r6.type && (i6 = new Z(h8, this, t3)), this._$AV.push(i6), r6 = s4[++n5];
          }
          o7 !== r6?.index && (h8 = P.nextNode(), o7++);
        }
        return P.currentNode = l2, e6;
      }
      p(t3) {
        let i5 = 0;
        for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t3, s4, i5), i5 += s4.strings.length - 2) : s4._$AI(t3[i5])), i5++;
      }
    };
    k = class _k {
      get _$AU() {
        return this._$AM?._$AU ?? this._$Cv;
      }
      constructor(t3, i5, s4, e6) {
        this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t3, this._$AB = i5, this._$AM = s4, this.options = e6, this._$Cv = e6?.isConnected ?? true;
      }
      get parentNode() {
        let t3 = this._$AA.parentNode;
        const i5 = this._$AM;
        return void 0 !== i5 && 11 === t3?.nodeType && (t3 = i5.parentNode), t3;
      }
      get startNode() {
        return this._$AA;
      }
      get endNode() {
        return this._$AB;
      }
      _$AI(t3, i5 = this) {
        t3 = M(this, t3, i5), a2(t3) ? t3 === A || null == t3 || "" === t3 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== E && this._(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : d2(t3) ? this.k(t3) : this._(t3);
      }
      O(t3) {
        return this._$AA.parentNode.insertBefore(t3, this._$AB);
      }
      T(t3) {
        this._$AH !== t3 && (this._$AR(), this._$AH = this.O(t3));
      }
      _(t3) {
        this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(l2.createTextNode(t3)), this._$AH = t3;
      }
      $(t3) {
        const { values: i5, _$litType$: s4 } = t3, e6 = "number" == typeof s4 ? this._$AC(t3) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
        if (this._$AH?._$AD === e6) this._$AH.p(i5);
        else {
          const t4 = new R(e6, this), s5 = t4.u(this.options);
          t4.p(i5), this.T(s5), this._$AH = t4;
        }
      }
      _$AC(t3) {
        let i5 = C.get(t3.strings);
        return void 0 === i5 && C.set(t3.strings, i5 = new S2(t3)), i5;
      }
      k(t3) {
        u2(this._$AH) || (this._$AH = [], this._$AR());
        const i5 = this._$AH;
        let s4, e6 = 0;
        for (const h8 of t3) e6 === i5.length ? i5.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i5[e6], s4._$AI(h8), e6++;
        e6 < i5.length && (this._$AR(s4 && s4._$AB.nextSibling, e6), i5.length = e6);
      }
      _$AR(t3 = this._$AA.nextSibling, s4) {
        for (this._$AP?.(false, true, s4); t3 !== this._$AB; ) {
          const s5 = i3(t3).nextSibling;
          i3(t3).remove(), t3 = s5;
        }
      }
      setConnected(t3) {
        void 0 === this._$AM && (this._$Cv = t3, this._$AP?.(t3));
      }
    };
    H = class {
      get tagName() {
        return this.element.tagName;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      constructor(t3, i5, s4, e6, h8) {
        this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t3, this.name = i5, this._$AM = e6, this.options = h8, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
      }
      _$AI(t3, i5 = this, s4, e6) {
        const h8 = this.strings;
        let o7 = false;
        if (void 0 === h8) t3 = M(this, t3, i5, 0), o7 = !a2(t3) || t3 !== this._$AH && t3 !== E, o7 && (this._$AH = t3);
        else {
          const e7 = t3;
          let n5, r6;
          for (t3 = h8[0], n5 = 0; n5 < h8.length - 1; n5++) r6 = M(this, e7[s4 + n5], i5, n5), r6 === E && (r6 = this._$AH[n5]), o7 ||= !a2(r6) || r6 !== this._$AH[n5], r6 === A ? t3 = A : t3 !== A && (t3 += (r6 ?? "") + h8[n5 + 1]), this._$AH[n5] = r6;
        }
        o7 && !e6 && this.j(t3);
      }
      j(t3) {
        t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 ?? "");
      }
    };
    I = class extends H {
      constructor() {
        super(...arguments), this.type = 3;
      }
      j(t3) {
        this.element[this.name] = t3 === A ? void 0 : t3;
      }
    };
    L = class extends H {
      constructor() {
        super(...arguments), this.type = 4;
      }
      j(t3) {
        this.element.toggleAttribute(this.name, !!t3 && t3 !== A);
      }
    };
    z = class extends H {
      constructor(t3, i5, s4, e6, h8) {
        super(t3, i5, s4, e6, h8), this.type = 5;
      }
      _$AI(t3, i5 = this) {
        if ((t3 = M(this, t3, i5, 0) ?? A) === E) return;
        const s4 = this._$AH, e6 = t3 === A && s4 !== A || t3.capture !== s4.capture || t3.once !== s4.once || t3.passive !== s4.passive, h8 = t3 !== A && (s4 === A || e6);
        e6 && this.element.removeEventListener(this.name, this, s4), h8 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
      }
      handleEvent(t3) {
        "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t3) : this._$AH.handleEvent(t3);
      }
    };
    Z = class {
      constructor(t3, i5, s4) {
        this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s4;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      _$AI(t3) {
        M(this, t3);
      }
    };
    B = t2.litHtmlPolyfillSupport;
    B?.(S2, k), (t2.litHtmlVersions ??= []).push("3.3.3");
    D = (t3, i5, s4) => {
      const e6 = s4?.renderBefore ?? i5;
      let h8 = e6._$litPart$;
      if (void 0 === h8) {
        const t4 = s4?.renderBefore ?? null;
        e6._$litPart$ = h8 = new k(i5.insertBefore(c3(), t4), t4, void 0, s4 ?? {});
      }
      return h8._$AI(t3), h8;
    };
  }
});

// ../_kit/node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js
var s3, i4, o4;
var init_lit_element = __esm({
  "../_kit/node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js"() {
    init_reactive_element();
    init_reactive_element();
    init_lit_html();
    init_lit_html();
    s3 = globalThis;
    i4 = class extends y {
      constructor() {
        super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
      }
      createRenderRoot() {
        const t3 = super.createRenderRoot();
        return this.renderOptions.renderBefore ??= t3.firstChild, t3;
      }
      update(t3) {
        const r6 = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = D(r6, this.renderRoot, this.renderOptions);
      }
      connectedCallback() {
        super.connectedCallback(), this._$Do?.setConnected(true);
      }
      disconnectedCallback() {
        super.disconnectedCallback(), this._$Do?.setConnected(false);
      }
      render() {
        return E;
      }
    };
    i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
    o4 = s3.litElementPolyfillSupport;
    o4?.({ LitElement: i4 });
    (s3.litElementVersions ??= []).push("4.2.2");
  }
});

// ../_kit/node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/is-server.js
var init_is_server = __esm({
  "../_kit/node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/is-server.js"() {
  }
});

// ../_kit/node_modules/.pnpm/lit@3.3.3/node_modules/lit/index.js
var init_lit = __esm({
  "../_kit/node_modules/.pnpm/lit@3.3.3/node_modules/lit/index.js"() {
    init_reactive_element();
    init_lit_html();
    init_lit_element();
    init_is_server();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/custom-element.js
var init_custom_element = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/custom-element.js"() {
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js
function n4(t3) {
  return (e6, o7) => "object" == typeof o7 ? r4(t3, e6, o7) : ((t4, e7, o8) => {
    const r6 = e7.hasOwnProperty(o8);
    return e7.constructor.createProperty(o8, t4), r6 ? Object.getOwnPropertyDescriptor(e7, o8) : void 0;
  })(t3, e6, o7);
}
var o5, r4;
var init_property = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js"() {
    init_reactive_element();
    o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
    r4 = (t3 = o5, e6, r6) => {
      const { kind: n5, metadata: i5 } = r6;
      let s4 = globalThis.litPropertyMetadata.get(i5);
      if (void 0 === s4 && globalThis.litPropertyMetadata.set(i5, s4 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t3 = Object.create(t3)).wrapped = true), s4.set(r6.name, t3), "accessor" === n5) {
        const { name: o7 } = r6;
        return { set(r7) {
          const n6 = e6.get.call(this);
          e6.set.call(this, r7), this.requestUpdate(o7, n6, t3, true, r7);
        }, init(e7) {
          return void 0 !== e7 && this.C(o7, void 0, t3, e7), e7;
        } };
      }
      if ("setter" === n5) {
        const { name: o7 } = r6;
        return function(r7) {
          const n6 = this[o7];
          e6.call(this, r7), this.requestUpdate(o7, n6, t3, true, r7);
        };
      }
      throw Error("Unsupported decorator location: " + n5);
    };
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/state.js
function r5(r6) {
  return n4({ ...r6, state: true, attribute: false });
}
var init_state = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/state.js"() {
    init_property();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/event-options.js
var init_event_options = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/event-options.js"() {
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/base.js
var e4;
var init_base = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/base.js"() {
    e4 = (e6, t3, c4) => (c4.configurable = true, c4.enumerable = true, Reflect.decorate && "object" != typeof t3 && Object.defineProperty(e6, t3, c4), c4);
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query.js
function e5(e6, r6) {
  return (n5, s4, i5) => {
    const o7 = (t3) => t3.renderRoot?.querySelector(e6) ?? null;
    if (r6) {
      const { get: e7, set: r7 } = "object" == typeof s4 ? n5 : i5 ?? (() => {
        const t3 = Symbol();
        return { get() {
          return this[t3];
        }, set(e8) {
          this[t3] = e8;
        } };
      })();
      return e4(n5, s4, { get() {
        let t3 = e7.call(this);
        return void 0 === t3 && (t3 = o7(this), (null !== t3 || this.hasUpdated) && r7.call(this, t3)), t3;
      } });
    }
    return e4(n5, s4, { get() {
      return o7(this);
    } });
  };
}
var init_query = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query.js"() {
    init_base();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-all.js
var init_query_all = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-all.js"() {
    init_base();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-async.js
var init_query_async = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-async.js"() {
    init_base();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var init_query_assigned_elements = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-assigned-elements.js"() {
    init_base();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js
var init_query_assigned_nodes = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js"() {
    init_base();
  }
});

// ../_kit/node_modules/.pnpm/lit@3.3.3/node_modules/lit/decorators.js
var init_decorators = __esm({
  "../_kit/node_modules/.pnpm/lit@3.3.3/node_modules/lit/decorators.js"() {
    init_custom_element();
    init_property();
    init_state();
    init_event_options();
    init_query();
    init_query_all();
    init_query_async();
    init_query_assigned_elements();
    init_query_assigned_nodes();
  }
});

// dist/murshid-advisor.js
var murshid_advisor_exports = {};
__export(murshid_advisor_exports, {
  default: () => k2
});
function J(t3) {
  var p4, g4, c4, u5, m5, l4, x3, f6, N6;
  const e6 = _2(t3 == null ? void 0 : t3.sale_price), a3 = _2((t3 == null ? void 0 : t3.regular_price) ?? (t3 == null ? void 0 : t3.price)), s4 = e6 && e6 < a3 ? e6 : _2(t3 == null ? void 0 : t3.price) || a3, r6 = Math.max(_2(t3 == null ? void 0 : t3.regular_price), _2(t3 == null ? void 0 : t3.price), s4), i5 = (Array.isArray(t3 == null ? void 0 : t3.images) ? t3.images : []).map((v5) => String((v5 == null ? void 0 : v5.url) ?? v5 ?? "")).filter(Boolean), o7 = (t3 == null ? void 0 : t3.sold_quantity) ?? (t3 == null ? void 0 : t3.sold);
  return {
    id: Number(t3 == null ? void 0 : t3.id),
    name: String((t3 == null ? void 0 : t3.name) ?? ""),
    url: String((t3 == null ? void 0 : t3.url) ?? "#"),
    image: String(((p4 = t3 == null ? void 0 : t3.image) == null ? void 0 : p4.url) ?? (t3 == null ? void 0 : t3.main_image) ?? (t3 == null ? void 0 : t3.thumbnail) ?? i5[0] ?? ""),
    images: i5,
    price: s4,
    regular: r6,
    discount: r6 > s4 ? Math.round((1 - s4 / r6) * 100) : 0,
    rating: _2(((g4 = t3 == null ? void 0 : t3.rating) == null ? void 0 : g4.stars) ?? ((c4 = t3 == null ? void 0 : t3.rating) == null ? void 0 : c4.rate) ?? (t3 == null ? void 0 : t3.rating)),
    ratingCount: _2((u5 = t3 == null ? void 0 : t3.rating) == null ? void 0 : u5.count),
    qty: (t3 == null ? void 0 : t3.quantity) == null || t3 != null && t3.unlimited_quantity ? null : _2(t3 == null ? void 0 : t3.quantity),
    available: (t3 == null ? void 0 : t3.is_available) !== false && (t3 == null ? void 0 : t3.status) !== "out" && !((t3 == null ? void 0 : t3.quantity) === 0 && !(t3 != null && t3.unlimited_quantity)),
    sold: o7 == null || o7 === "" || !Number.isFinite(Number(o7)) ? null : Number(o7),
    endsAt: et((t3 == null ? void 0 : t3.discount_ends) ?? (t3 == null ? void 0 : t3.sale_end) ?? (t3 == null ? void 0 : t3.discount_end)),
    category: String(((m5 = t3 == null ? void 0 : t3.category) == null ? void 0 : m5.name) ?? ((x3 = (l4 = t3 == null ? void 0 : t3.categories) == null ? void 0 : l4[0]) == null ? void 0 : x3.name) ?? ""),
    brand: String(((f6 = t3 == null ? void 0 : t3.brand) == null ? void 0 : f6.name) ?? ""),
    promo: String(((N6 = t3 == null ? void 0 : t3.promotion) == null ? void 0 : N6.title) ?? (t3 == null ? void 0 : t3.promotion_title) ?? "")
  };
}
async function at(t3) {
  var s4, r6, i5;
  const e6 = (s4 = $2()) == null ? void 0 : s4.product;
  if (!e6) return null;
  const a3 = e6.getDetails ? e6.getDetails.bind(e6) : (i5 = (r6 = e6.api) == null ? void 0 : r6.getDetails) == null ? void 0 : i5.bind(e6.api);
  if (!a3) return null;
  try {
    const o7 = await a3(t3, ["images", "sold_quantity", "category"]), p4 = J((o7 == null ? void 0 : o7.data) ?? o7);
    return p4.name ? p4 : null;
  } catch {
    return null;
  }
}
async function K(t3) {
  await I2();
  const e6 = "ids:" + t3.join(",");
  return A2.has(e6) || A2.set(e6, Promise.all(t3.map(at)).then((a3) => a3.filter((s4) => !!s4))), A2.get(e6);
}
async function L2(t3, e6 = [], a3 = 12) {
  await I2();
  const s4 = `src:${t3}:${e6.join(",")}:${a3}`;
  return A2.has(s4) || A2.set(s4, (async () => {
    var o7, p4, g4, c4;
    const r6 = (o7 = $2()) == null ? void 0 : o7.product, i5 = r6 != null && r6.fetch ? r6.fetch.bind(r6) : (g4 = (p4 = r6 == null ? void 0 : r6.api) == null ? void 0 : p4.fetch) == null ? void 0 : g4.bind(r6.api);
    if (!i5) return [];
    try {
      const u5 = { source: t3, per_page: a3 };
      e6.length && (u5.source_value = e6);
      const m5 = await i5(u5);
      return (Array.isArray(m5 == null ? void 0 : m5.data) ? m5.data : Array.isArray(m5) ? m5 : ((c4 = m5 == null ? void 0 : m5.data) == null ? void 0 : c4.products) ?? []).map(J).filter((x3) => x3.name).slice(0, a3);
    } catch {
      return [];
    }
  })()), A2.get(s4);
}
async function rt(t3, e6 = "best_selling", a3 = 12) {
  const s4 = D2(t3);
  if (s4.length) return { items: (await K(s4)).slice(0, a3), auto: false };
  let r6 = await L2(e6, [], a3);
  return !r6.length && e6 !== "latest" && (r6 = await L2("latest", [], a3)), { items: r6, auto: true };
}
async function Q(t3, e6 = 1, a3) {
  var s4, r6, i5;
  await I2();
  try {
    return await ((i5 = (r6 = (s4 = $2()) == null ? void 0 : s4.cart) == null ? void 0 : r6.addItem) == null ? void 0 : i5.call(r6, a3 ? { id: t3, quantity: e6, notes: a3 } : { id: t3, quantity: e6 })), true;
  } catch {
    return false;
  }
}
function X(t3, e6 = true) {
  var a3, s4, r6;
  try {
    (r6 = e6 ? (a3 = $2()) == null ? void 0 : a3.success : (s4 = $2()) == null ? void 0 : s4.error) == null || r6(t3);
  } catch {
  }
}
function S3() {
  try {
    return { ...P2(), ...JSON.parse(localStorage.getItem(M2) || "{}") };
  } catch {
    return P2();
  }
}
function it(t3) {
  try {
    localStorage.setItem(M2, JSON.stringify(t3));
  } catch {
  }
}
function z2(t3) {
  const e6 = S3();
  return t3(e6), it(e6), e6;
}
function nt() {
  let t3 = false;
  try {
    t3 = !sessionStorage.getItem(M2), sessionStorage.setItem(M2, "1");
  } catch {
  }
  return t3 ? z2((e6) => {
    e6.visits += 1, e6.last = Date.now();
  }) : S3();
}
function lt() {
  const t3 = [...S3().prices].sort((e6, a3) => e6 - a3);
  return t3.length >= 3 ? t3[Math.floor(t3.length / 2)] : 0;
}
function dt(t3, e6 = S3()) {
  let a3 = (e6.seen[t3.id] || 0) * 2 + (e6.carted.includes(t3.id) ? 4 : 0) + (t3.category && e6.tags[t3.category] || 0);
  const s4 = lt();
  return s4 && (a3 += Math.max(0, 2 - Math.abs(t3.price - s4) / s4 * 2)), a3;
}
function gt() {
  T2 || (T2 = true, st("cart::item.added", (t3) => {
    var a3;
    const e6 = Number(((a3 = t3 == null ? void 0 : t3.data) == null ? void 0 : a3.product_id) ?? 0);
    e6 && z2((s4) => {
      s4.carted.includes(e6) || (s4.carted = [...s4.carted.slice(-40), e6]);
    });
  }));
}
function xt(t3) {
  const e6 = bt[t3];
  if (!e6 || W.has(e6)) return e6;
  W.add(e6);
  const a3 = document.createElement("link");
  return a3.rel = "stylesheet", a3.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e6)}:wght@400;500;700;800&display=swap`, document.head.appendChild(a3), e6;
}
var $2, I2, Y, H2, d3, w2, y3, b3, h3, F, tt, _2, et, D2, A2, O, st, M2, P2, E2, ot, ct, pt, T2, ut, ht, mt, ft, bt, W, vt, yt, B2, j, wt, C2, G, k2;
var init_murshid_advisor = __esm({
  "dist/murshid-advisor.js"() {
    "use strict";
    init_lit();
    init_decorators();
    $2 = () => window.salla ?? window.Salla;
    I2 = async () => {
      var t3, e6;
      try {
        await ((e6 = (t3 = $2()) == null ? void 0 : t3.onReady) == null ? void 0 : e6.call(t3));
      } catch {
      }
    };
    Y = () => {
      var t3, e6, a3, s4, r6;
      try {
        const i5 = ((e6 = (t3 = $2()) == null ? void 0 : t3.lang) == null ? void 0 : e6.locale) ?? ((r6 = (s4 = (a3 = $2()) == null ? void 0 : a3.config) == null ? void 0 : s4.get) == null ? void 0 : r6.call(s4, "user.language_code"));
        if (typeof i5 == "string" && i5) return i5.slice(0, 2);
      } catch {
      }
      return (document.documentElement.lang || "ar").slice(0, 2);
    };
    H2 = () => Y() === "en";
    d3 = (t3, e6) => H2() ? e6 : t3;
    w2 = (t3, e6 = "") => {
      if (t3 == null) return e6;
      if (typeof t3 == "string") {
        const a3 = t3.trim();
        if (a3.startsWith("{") && a3.endsWith("}"))
          try {
            return w2(JSON.parse(a3), e6);
          } catch {
          }
        return a3 || e6;
      }
      if (typeof t3 == "number" || typeof t3 == "boolean") return String(t3);
      if (typeof t3 == "object") {
        const a3 = t3, s4 = a3[Y()] ?? a3.ar ?? a3.en ?? Object.values(a3).find((r6) => typeof r6 == "string" && r6);
        return typeof s4 == "string" && s4.trim() ? s4 : e6;
      }
      return e6;
    };
    y3 = (t3, e6 = "") => {
      const a3 = Array.isArray(t3) ? t3[0] : t3, s4 = typeof a3 == "object" && a3 ? a3.value : a3;
      return s4 == null || s4 === "" ? e6 : String(s4);
    };
    b3 = (t3, e6 = 0) => {
      const a3 = Number(t3);
      return t3 === "" || t3 == null || !Number.isFinite(a3) ? e6 : a3;
    };
    h3 = (t3, e6 = false) => t3 == null || t3 === "" ? e6 : t3 === true || t3 === "true" || t3 === 1 || t3 === "1";
    F = (t3) => Array.isArray(t3) ? t3 : [];
    tt = (t3) => w2(t3).split(/[,،\n]/).map((e6) => e6.trim()).filter(Boolean);
    _2 = (t3) => {
      const e6 = typeof t3 == "object" && t3 ? t3.amount : t3, a3 = Number(e6);
      return Number.isFinite(a3) ? a3 : 0;
    };
    et = (t3) => {
      if (!t3) return null;
      const e6 = typeof t3 == "number" ? t3 < 1e12 ? t3 * 1e3 : t3 : Date.parse(String(t3).replace(" ", "T"));
      return Number.isFinite(e6) && e6 > Date.now() ? e6 : null;
    };
    D2 = (t3) => (Array.isArray(t3) ? t3 : []).map((e6) => Number(typeof e6 == "object" && e6 ? e6.value : e6)).filter((e6) => Number.isFinite(e6) && e6 > 0);
    A2 = /* @__PURE__ */ new Map();
    O = (t3) => {
      var e6, a3;
      try {
        const s4 = (a3 = (e6 = $2()) == null ? void 0 : e6.money) == null ? void 0 : a3.call(e6, t3);
        if (s4) return String(s4);
      } catch {
      }
      return `${Math.round(t3 * 100) / 100} ${d3("\u0631.\u0633", "SAR")}`;
    };
    st = (t3, e6) => {
      var a3, s4, r6;
      try {
        (r6 = (s4 = (a3 = $2()) == null ? void 0 : a3.event) == null ? void 0 : s4.on) == null || r6.call(s4, t3, e6);
      } catch {
      }
    };
    M2 = "tw_smart_mem_v1";
    P2 = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
    E2 = (t3, e6 = 1) => z2((a3) => {
      a3.seen[t3.id] = (a3.seen[t3.id] || 0) + e6, a3.prices = [...a3.prices.slice(-29), t3.price], t3.category && (a3.tags[t3.category] = (a3.tags[t3.category] || 0) + e6);
    });
    ot = (t3, e6 = 1) => t3 && z2((a3) => {
      a3.tags[t3] = (a3.tags[t3] || 0) + e6;
    });
    ct = (t3, e6) => z2((a3) => {
      a3.answers[t3] = e6;
    });
    pt = (t3, e6 = true) => {
      if (!e6) return t3;
      const a3 = S3();
      return t3.map((s4, r6) => ({ p: s4, i: r6, s: dt(s4, a3) })).sort((s4, r6) => r6.s - s4.s || s4.i - r6.i).map((s4) => s4.p);
    };
    T2 = false;
    ut = () => {
      const t3 = innerWidth, e6 = navigator.userAgent;
      return /iPad|Tablet/i.test(e6) || t3 >= 700 && t3 < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e6) || t3 < 700 ? "mobile" : "desktop";
    };
    ht = () => {
      try {
        return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
      } catch {
        return true;
      }
    };
    mt = Object.defineProperty;
    ft = (t3, e6, a3, s4) => {
      for (var r6 = void 0, i5 = t3.length - 1, o7; i5 >= 0; i5--)
        (o7 = t3[i5]) && (r6 = o7(e6, a3, r6) || r6);
      return r6 && mt(e6, a3, r6), r6;
    };
    bt = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" };
    W = /* @__PURE__ */ new Set();
    vt = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" };
    yt = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"];
    B2 = class B3 extends i4 {
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
        this.io = new IntersectionObserver((e6) => {
          var a3;
          e6.some((s4) => s4.isIntersecting) && (this.setAttribute("in", ""), (a3 = this.io) == null || a3.disconnect());
        }, { threshold: 0.12 }), this.io.observe(this);
      }
      disconnectedCallback() {
        var e6;
        super.disconnectedCallback(), (e6 = this.io) == null || e6.disconnect();
      }
      /** Hidden by the merchant's schedule or device rule? */
      hiddenNow() {
        const e6 = this.c, a3 = Date.now(), s4 = Date.parse(String(e6.s_from || "")), r6 = Date.parse(String(e6.s_to || ""));
        if (Number.isFinite(s4) && a3 < s4 || Number.isFinite(r6) && a3 > r6) return true;
        const i5 = ut();
        return !!(h3(e6.s_hide_mobile) && i5 === "mobile" || h3(e6.s_hide_desktop) && i5 !== "mobile");
      }
      vars(e6 = "") {
        const a3 = this.c, s4 = [], r6 = (o7, p4) => {
          p4 !== "" && p4 != null && s4.push(`${o7}:${p4}`);
        };
        r6("--a", a3.s_accent || ""), r6("--a2", a3.s_accent2 || ""), r6("--bgc", a3.s_bg || ""), r6("--fgc", a3.s_text || ""), r6("--cardc", a3.s_card || ""), r6("--r", `${b3(a3.s_radius, 22)}px`), r6("--gap", `${b3(a3.s_gap, 18)}px`), r6("--ts", `${b3(a3.s_title_size, 38)}px`), r6("--fs", `${b3(a3.s_text_size, 16)}px`), r6("--pt", `${b3(a3.s_pad_top, 56)}px`), r6("--pb", `${b3(a3.s_pad_bottom, 56)}px`), r6("--maxw", vt[y3(a3.s_width, "normal")] ?? "1240px"), r6("--sh", yt[Math.max(0, Math.min(5, b3(a3.s_shadow, 2)))]), r6("--ms", `${b3(a3.s_anim_ms, 700)}ms`), r6("--ov", String(b3(a3.s_overlay, 45) / 100)), a3.s_bg_image && r6("--bgimg", `url("${String(a3.s_bg_image)}")`);
        const i5 = xt(y3(a3.s_font, "inherit"));
        return i5 && r6("font-family", `'${i5}', inherit`), s4.join(";") + (e6 ? ";" + e6 : "");
      }
      cls() {
        const e6 = this.c;
        return [
          "sec",
          `th-${y3(e6.s_theme, "auto")}`,
          `al-${y3(e6.s_align, "start")}`,
          `an-${y3(e6.s_anim, "rise")}`,
          `pt-${y3(e6.s_pattern, "none")}`,
          `bs-${y3(e6.s_btn_style, "pill")}`,
          h3(e6.s_border) ? "bordered" : "",
          h3(e6.s_stagger, true) ? "stagger" : "",
          e6.s_bg_image ? "has-img" : ""
        ].join(" ");
      }
      /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
      shell(e6, a3 = {}, s4 = "", r6 = "", i5 = true) {
        if (this.hiddenNow()) return A;
        const o7 = this.c, p4 = w2(o7.eyebrow, a3.eyebrow ?? ""), g4 = w2(o7.title, a3.title ?? ""), c4 = w2(o7.subtitle, a3.sub ?? ""), u5 = i5 && h3(o7.s_show_head, true) && (p4 || g4 || c4);
        return b2`<section class="${this.cls()} ${s4}" style=${this.vars(r6)} id=${String(o7.s_anchor || "") || A}>
      <div class="wrap">${u5 ? b2`<header class="head">${p4 ? b2`<span class="eyebrow">${p4}</span>` : ""}${g4 ? b2`<h2 class="title">${g4}</h2>` : ""}${c4 ? b2`<p class="sub">${c4}</p>` : ""}</header>` : ""}
      ${e6}</div></section>`;
      }
      /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
      hints(e6) {
        const a3 = e6.filter(Boolean);
        return !a3.length || !ht() || !h3(this.c.s_hints, true) ? "" : b2`<aside class="hints" role="note"><b>💡 ${d3("\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F (\u064A\u0638\u0647\u0631 \u0644\u0643 \u0641\u0642\u0637)", "Setup assistant (only you see this)")}</b><ul>${a3.map((s4) => b2`<li>${s4}</li>`)}</ul></aside>`;
      }
      card(e6, a3 = {}) {
        var s4;
        return b2`<article class="pc ${e6.available ? "" : "oos"}">
      <a class="ph" href=${e6.url} @click=${() => E2(e6)}><img src=${e6.image} alt=${e6.name} loading="lazy" />${(s4 = a3.badges) != null && s4.length ? b2`<span class="badges">${a3.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e6.url} @click=${() => E2(e6)}>${e6.name}</a>
        <div class="pr"><b>${O(e6.price)}</b>${e6.regular > e6.price ? b2`<s>${O(e6.regular)}</s>` : ""}</div>
        ${a3.rating !== false && e6.rating > 0 ? b2`<div class="rt">★ ${e6.rating.toFixed(1)}${e6.ratingCount ? b2` <small>(${e6.ratingCount})</small>` : ""}</div>` : ""}
        ${a3.extra ?? ""}
        ${a3.quick !== false ? b2`<button class="btn sm" ?disabled=${!e6.available} @click=${() => this.add(e6)}>${e6.available ? d3("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart") : d3("\u0646\u0641\u062F\u062A \u0627\u0644\u0643\u0645\u064A\u0629", "Sold out")}</button>` : ""}
      </div></article>`;
      }
      async add(e6, a3 = 1, s4) {
        E2(e6, 3), await Q(e6.id, a3, s4) ? X(d3("\u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629", "Added to cart")) : location.href = e6.url;
      }
    };
    B2.base = i`
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
    j = B2;
    ft([
      n4({ type: Object })
    ], j.prototype, "config");
    wt = Object.defineProperty;
    C2 = (t3, e6, a3, s4) => {
      for (var r6 = void 0, i5 = t3.length - 1, o7; i5 >= 0; i5--)
        (o7 = t3[i5]) && (r6 = o7(e6, a3, r6) || r6);
      return r6 && wt(e6, a3, r6), r6;
    };
    G = class G2 extends j {
      constructor() {
        super(...arguments), this.qs = [], this.step = 0, this.picks = [], this.pool = [], this.auto = false, this.result = null, this.seq = 0;
      }
      willUpdate(e6) {
        e6.has("config") && this.setup();
      }
      async setup() {
        const e6 = ++this.seq, a3 = this.c, s4 = F(a3.questions), r6 = F(a3.options);
        let i5 = [];
        if (r6.length && !h3(a3.force_auto)) {
          i5 = s4.map((f6, N6) => ({ text: w2(f6.text), hint: w2(f6.hint), multi: h3(f6.multi), opts: r6.filter((v5) => b3(y3(v5.step, "1"), 1) === N6 + 1).map((v5) => ({ label: w2(v5.label), emoji: w2(v5.emoji), image: String(v5.image || ""), prods: D2(v5.products), tags: tt(v5.tags), weight: b3(v5.weight, 3) })) })).filter((f6) => f6.text && f6.opts.length);
          const l4 = [...new Set(r6.flatMap((f6) => D2(f6.products)))], x3 = await K(l4);
          e6 === this.seq && (this.pool = x3, this.qs = i5, this.auto = false);
          return;
        }
        const o7 = (await rt(a3.products, y3(a3.auto_source, "best_selling"), b3(a3.pool, 24))).items.filter((l4) => l4.available), p4 = o7.map((l4) => l4.price).sort((l4, x3) => l4 - x3), g4 = (l4) => p4[Math.min(p4.length - 1, Math.floor(p4.length * l4))] ?? 0, [c4, u5] = [Math.round(g4(0.34)), Math.round(g4(0.67))], m5 = [...new Set(o7.map((l4) => l4.category).filter(Boolean))].slice(0, 6);
        H2(), i5.push({ text: d3("\u0643\u0645 \u0645\u064A\u0632\u0627\u0646\u064A\u062A\u0643 \u062A\u0642\u0631\u064A\u0628\u0627\u064B\u061F", "What is your budget?"), hint: d3("\u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0645\u0646 \u0645\u0646\u062A\u062C\u0627\u062A \u0627\u0644\u0645\u062A\u062C\u0631 \u0627\u0644\u0641\u0639\u0644\u064A\u0629", "Ranges come from real store prices"), multi: false, opts: [
          { label: d3(`\u0623\u0642\u0644 \u0645\u0646 ${c4}`, `Under ${c4}`), emoji: "\u{1F49A}", image: "", prods: [], tags: [], weight: 4, test: (l4) => l4.price <= c4 ? 1 : 0 },
          { label: `${c4} \u2013 ${u5}`, emoji: "\u{1F49B}", image: "", prods: [], tags: [], weight: 4, test: (l4) => l4.price > c4 && l4.price <= u5 ? 1 : 0 },
          { label: d3(`\u0623\u0643\u062B\u0631 \u0645\u0646 ${u5}`, `Over ${u5}`), emoji: "\u{1F48E}", image: "", prods: [], tags: [], weight: 4, test: (l4) => l4.price > u5 ? 1 : 0 }
        ] }), m5.length > 1 && i5.push({ text: d3("\u0648\u0634 \u062A\u062F\u0648\u0651\u0631 \u0639\u0644\u064A\u0647\u061F", "What are you looking for?"), hint: d3("\u062A\u0642\u062F\u0631 \u062A\u062E\u062A\u0627\u0631 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0642\u0633\u0645", "Pick one or more"), multi: true, opts: m5.map((l4) => {
          var x3;
          return { label: l4, emoji: "\u{1F3F7}\uFE0F", image: ((x3 = o7.find((f6) => f6.category === l4)) == null ? void 0 : x3.image) ?? "", prods: [], tags: [l4], weight: 5, test: (f6) => f6.category === l4 ? 1 : 0 };
        }) }), i5.push({ text: d3("\u0648\u0634 \u0623\u0647\u0645 \u0634\u064A \u0639\u0646\u062F\u0643\u061F", "What matters most?"), hint: "", multi: false, opts: [
          { label: d3("\u0623\u0641\u0636\u0644 \u0633\u0639\u0631 \u0648\u062E\u0635\u0645", "Best price & deal"), emoji: "\u{1F3F7}\uFE0F", image: "", prods: [], tags: [], weight: 3, test: (l4) => l4.discount / 30 },
          { label: d3("\u0627\u0644\u0623\u0639\u0644\u0649 \u062A\u0642\u064A\u064A\u0645\u0627\u064B", "Top rated"), emoji: "\u2B50", image: "", prods: [], tags: [], weight: 3, test: (l4) => Math.max(0, (l4.rating - 3.5) / 1.5) },
          { label: d3("\u0627\u0644\u0623\u0643\u062B\u0631 \u0637\u0644\u0628\u0627\u064B", "Most ordered"), emoji: "\u{1F525}", image: "", prods: [], tags: [], weight: 3, test: (l4) => l4.sold != null ? Math.min(1, l4.sold / Math.max(1, ...o7.map((x3) => x3.sold ?? 0))) : 0 },
          { label: d3("\u0645\u0641\u0627\u062C\u0626\u0646\u064A", "Surprise me"), emoji: "\u{1F381}", image: "", prods: [], tags: [], weight: 1, test: () => 0.5 }
        ] }), e6 === this.seq && (this.pool = o7, this.qs = i5, this.auto = true);
      }
      choose(e6) {
        const a3 = this.qs[this.step], s4 = this.picks[this.step] ?? [], r6 = a3.multi ? s4.includes(e6) ? s4.filter((i5) => i5 !== e6) : [...s4, e6] : [e6];
        this.picks = Object.assign([...this.picks], { [this.step]: r6 }), ct(`q${this.step}`, a3.opts[e6].label), a3.opts[e6].tags.forEach((i5) => ot(i5, 2)), !a3.multi && h3(this.c.auto_advance, true) && setTimeout(() => this.next(), 280);
      }
      next() {
        this.step < this.qs.length - 1 ? this.step++ : this.finish();
      }
      finish() {
        const e6 = /* @__PURE__ */ new Map();
        let a3 = 0;
        this.qs.forEach((r6, i5) => {
          a3 += Math.max(...r6.opts.map((o7) => o7.weight)), (this.picks[i5] ?? []).forEach((o7) => {
            const p4 = r6.opts[o7];
            for (const g4 of this.pool) {
              const c4 = p4.test ? p4.test(g4) : p4.prods.includes(g4.id) ? 1 : 0;
              if (c4 > 0) {
                const u5 = e6.get(g4.id) ?? { score: 0, why: [] };
                u5.score += c4 * p4.weight, u5.why.push(p4.label), e6.set(g4.id, u5);
              }
            }
          });
        }), S3();
        const s4 = pt(this.pool.filter((r6) => e6.has(r6.id) && (!h3(this.c.hide_oos, true) || r6.available)), h3(this.c.personalize, true)).map((r6) => ({ p: r6, ...e6.get(r6.id) })).sort((r6, i5) => i5.score - r6.score || i5.p.rating - r6.p.rating).slice(0, b3(this.c.results, 4));
        this.result = s4.map((r6) => ({ ...r6, score: Math.min(100, Math.round(r6.score / Math.max(1, a3) * 100)) }));
      }
      reset() {
        this.step = 0, this.picks = [], this.result = null;
      }
      async addAll() {
        if (this.result) {
          for (const e6 of this.result) e6.p.available && await Q(e6.p.id);
          X(d3("\u0623\u0636\u0641\u0646\u0627 \u0627\u0644\u062A\u0631\u0634\u064A\u062D\u0627\u062A \u0644\u0644\u0633\u0644\u0629", "Added the picks to your cart"));
        }
      }
      render() {
        const e6 = this.c, a3 = this.qs[this.step], s4 = this.qs.flatMap((g4, c4) => (this.picks[c4] ?? []).map((u5) => g4.opts[u5].label)), r6 = y3(e6.progress, "bar"), i5 = y3(e6.layout, "split") === "split" && e6.side_image ? "split" : "", o7 = r6 === "dots" ? b2`<div class="dots">${this.qs.map((g4, c4) => b2`<i class=${c4 <= this.step ? "on" : ""}></i>`)}</div>` : r6 === "bar" ? b2`<div class="prog">${this.qs.map((g4, c4) => b2`<i class=${c4 <= this.step ? "on" : ""}></i>`)}</div>` : "";
        let p4;
        if (!this.qs.length) p4 = b2`<div class="skel"></div>`;
        else if (this.result) {
          const g4 = w2(e6.result_message, d3("\u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0627\u062E\u062A\u064A\u0627\u0631\u0627\u062A\u0643\u060C \u0647\u0630\u064A \u0623\u0646\u0633\u0628 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0644\u0643 \u0645\u0646 \u0645\u062A\u062C\u0631\u0646\u0627:", "Based on your answers, these fit you best:"));
          p4 = b2`<div class="res-head"><div><h3>${w2(e6.result_title, d3("\u062A\u0631\u0634\u064A\u062D\u0627\u062A\u0646\u0627 \u0644\u0643 \u2728", "Your picks \u2728"))}</h3><p class="hint" style="margin:6px 0 0">${g4}</p>
          ${h3(e6.show_answers, true) ? b2`<div class="ans">${s4.map((c4) => b2`<span>${c4}</span>`)}</div>` : ""}</div>
        <div class="acts">${h3(e6.add_all, true) && this.result.length ? b2`<button class="btn" @click=${this.addAll}>${d3("\u0623\u0636\u0641 \u0627\u0644\u0643\u0644 \u0644\u0644\u0633\u0644\u0629", "Add all to cart")}</button>` : ""}
          ${h3(e6.share, true) ? b2`<a class="btn ghost" target="_blank" rel="noopener" href=${`https://wa.me/?text=${encodeURIComponent(this.result.map((c4) => `${c4.p.name} ${c4.p.url}`).join(`
`))}`}>${d3("\u0634\u0627\u0631\u0643 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628", "Share on WhatsApp")}</a>` : ""}
          <button class="btn ghost" @click=${this.reset}>${d3("\u0623\u0639\u062F \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631", "Retake")}</button></div></div>
        ${this.result.length ? b2`<div class="grid" style=${`--cols:${Math.min(4, b3(e6.results, 4))}`}>${this.result.map((c4) => b2`<div style="position:relative">${this.card(c4.p, { extra: h3(e6.show_reasons, true) ? b2`<div class="why"><b>${d3("\u064A\u0646\u0627\u0633\u0628\u0643 \u0644\u0623\u0646:", "Fits because:")}</b> ${[...new Set(c4.why)].join(" \xB7 ")}</div>` : "" })}
          ${h3(e6.show_match, true) ? b2`<span class="match">${d3("\u062A\u0637\u0627\u0628\u0642", "Match")} ${c4.score}%</span>` : ""}</div>`)}</div>` : b2`<p class="hint">${d3("\u0645\u0627 \u0644\u0642\u064A\u0646\u0627 \u062A\u0637\u0627\u0628\u0642 \u0643\u0627\u0645\u0644\u060C \u062C\u0631\u0651\u0628 \u062E\u064A\u0627\u0631\u0627\u062A \u062B\u0627\u0646\u064A\u0629.", "No exact match, try other answers.")}</p>`}`;
        } else {
          const g4 = this.picks[this.step] ?? [];
          p4 = b2`<div class="q ${i5}">${i5 ? b2`<div class="art" style=${`background-image:url("${e6.side_image}")`}></div>` : ""}
        <div class="panel">${o7}<div class="num">${r6 === "numbers" || r6 === "bar" ? `${this.step + 1} / ${this.qs.length}` : ""}</div>
        <h3>${a3.text}</h3>${a3.hint ? b2`<p class="hint">${a3.hint}</p>` : b2`<p class="hint">${a3.multi ? d3("\u0627\u062E\u062A\u0631 \u0648\u0627\u062D\u062F \u0623\u0648 \u0623\u0643\u062B\u0631", "Choose one or more") : ""}</p>`}
        <div class="opts">${a3.opts.map((c4, u5) => b2`<button class="o ${g4.includes(u5) ? "on" : ""}" @click=${() => this.choose(u5)}>${c4.image && h3(e6.option_images, true) ? b2`<img src=${c4.image} alt="" />` : b2`<span class="e">${c4.emoji}</span>`}<b>${c4.label}</b></button>`)}</div>
        <div class="nav">${this.step > 0 && h3(e6.allow_back, true) ? b2`<button class="btn ghost" @click=${() => this.step--}>${d3("\u0627\u0644\u0633\u0627\u0628\u0642", "Back")}</button>` : b2`<span></span>`}
          ${a3.multi || !h3(e6.auto_advance, true) ? b2`<button class="btn" ?disabled=${!g4.length} @click=${() => this.next()}>${this.step === this.qs.length - 1 ? d3("\u0627\u0639\u0631\u0636 \u0627\u0644\u0646\u062A\u064A\u062C\u0629", "See results") : d3("\u0627\u0644\u062A\u0627\u0644\u064A", "Next")}</button>` : ""}</div></div></div>`;
        }
        return this.shell(
          b2`${this.hints([this.auto && d3("\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u0628\u0646\u064A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0623\u0633\u0639\u0627\u0631 \u0648\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0648\u0645\u0628\u064A\u0639\u0627\u062A \u0648\u0623\u0642\u0633\u0627\u0645 \u0645\u062A\u062C\u0631\u0643. \u0623\u0636\u0641 \u0623\u0633\u0626\u0644\u062A\u0643 \u0648\u062E\u064A\u0627\u0631\u0627\u062A\u0643 \u0644\u062A\u062E\u0635\u064A\u0635\u0647.", "This quiz is auto-built from your store data. Add your own questions to customise it.")])}${p4}`,
          { eyebrow: d3("\u0627\u0644\u0645\u0633\u062A\u0634\u0627\u0631 \u0627\u0644\u0630\u0643\u064A", "Smart advisor"), title: d3("\u0645\u062D\u062A\u0627\u0631\u061F \u062C\u0627\u0648\u0628 3 \u0623\u0633\u0626\u0644\u0629 \u0648\u0646\u062E\u062A\u0627\u0631 \u0644\u0643", "Not sure? Answer 3 questions"), sub: "" }
        );
      }
    };
    G.styles = [j.base, i`
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
    k2 = G;
    C2([
      r5()
    ], k2.prototype, "qs");
    C2([
      r5()
    ], k2.prototype, "step");
    C2([
      r5()
    ], k2.prototype, "picks");
    C2([
      r5()
    ], k2.prototype, "pool");
    C2([
      r5()
    ], k2.prototype, "auto");
    C2([
      r5()
    ], k2.prototype, "result");
    typeof k2 < "u" && k2.registerSallaComponent("salla-murshid-advisor");
  }
});

// dist/murshid-chat.js
var murshid_chat_exports = {};
__export(murshid_chat_exports, {
  default: () => y4
});
function R2(t3) {
  var d5, p4, g4, b7, f6, w5, x3, S4, o7;
  const e6 = $3(t3 == null ? void 0 : t3.sale_price), r6 = $3((t3 == null ? void 0 : t3.regular_price) ?? (t3 == null ? void 0 : t3.price)), i5 = e6 && e6 < r6 ? e6 : $3(t3 == null ? void 0 : t3.price) || r6, a3 = Math.max($3(t3 == null ? void 0 : t3.regular_price), $3(t3 == null ? void 0 : t3.price), i5), n5 = (Array.isArray(t3 == null ? void 0 : t3.images) ? t3.images : []).map((v5) => String((v5 == null ? void 0 : v5.url) ?? v5 ?? "")).filter(Boolean), s4 = (t3 == null ? void 0 : t3.sold_quantity) ?? (t3 == null ? void 0 : t3.sold);
  return {
    id: Number(t3 == null ? void 0 : t3.id),
    name: String((t3 == null ? void 0 : t3.name) ?? ""),
    url: String((t3 == null ? void 0 : t3.url) ?? "#"),
    image: String(((d5 = t3 == null ? void 0 : t3.image) == null ? void 0 : d5.url) ?? (t3 == null ? void 0 : t3.main_image) ?? (t3 == null ? void 0 : t3.thumbnail) ?? n5[0] ?? ""),
    images: n5,
    price: i5,
    regular: a3,
    discount: a3 > i5 ? Math.round((1 - i5 / a3) * 100) : 0,
    rating: $3(((p4 = t3 == null ? void 0 : t3.rating) == null ? void 0 : p4.stars) ?? ((g4 = t3 == null ? void 0 : t3.rating) == null ? void 0 : g4.rate) ?? (t3 == null ? void 0 : t3.rating)),
    ratingCount: $3((b7 = t3 == null ? void 0 : t3.rating) == null ? void 0 : b7.count),
    qty: (t3 == null ? void 0 : t3.quantity) == null || t3 != null && t3.unlimited_quantity ? null : $3(t3 == null ? void 0 : t3.quantity),
    available: (t3 == null ? void 0 : t3.is_available) !== false && (t3 == null ? void 0 : t3.status) !== "out" && !((t3 == null ? void 0 : t3.quantity) === 0 && !(t3 != null && t3.unlimited_quantity)),
    sold: s4 == null || s4 === "" || !Number.isFinite(Number(s4)) ? null : Number(s4),
    endsAt: nt2((t3 == null ? void 0 : t3.discount_ends) ?? (t3 == null ? void 0 : t3.sale_end) ?? (t3 == null ? void 0 : t3.discount_end)),
    category: String(((f6 = t3 == null ? void 0 : t3.category) == null ? void 0 : f6.name) ?? ((x3 = (w5 = t3 == null ? void 0 : t3.categories) == null ? void 0 : w5[0]) == null ? void 0 : x3.name) ?? ""),
    brand: String(((S4 = t3 == null ? void 0 : t3.brand) == null ? void 0 : S4.name) ?? ""),
    promo: String(((o7 = t3 == null ? void 0 : t3.promotion) == null ? void 0 : o7.title) ?? (t3 == null ? void 0 : t3.promotion_title) ?? "")
  };
}
async function st2(t3) {
  var i5, a3, n5;
  const e6 = (i5 = m2()) == null ? void 0 : i5.product;
  if (!e6) return null;
  const r6 = e6.getDetails ? e6.getDetails.bind(e6) : (n5 = (a3 = e6.api) == null ? void 0 : a3.getDetails) == null ? void 0 : n5.bind(e6.api);
  if (!r6) return null;
  try {
    const s4 = await r6(t3, ["images", "sold_quantity", "category"]), d5 = R2((s4 == null ? void 0 : s4.data) ?? s4);
    return d5.name ? d5 : null;
  } catch {
    return null;
  }
}
async function V2(t3) {
  await G3();
  const e6 = "ids:" + t3.join(",");
  return C3.has(e6) || C3.set(e6, Promise.all(t3.map(st2)).then((r6) => r6.filter((i5) => !!i5))), C3.get(e6);
}
async function F2(t3, e6 = [], r6 = 12) {
  await G3();
  const i5 = `src:${t3}:${e6.join(",")}:${r6}`;
  return C3.has(i5) || C3.set(i5, (async () => {
    var s4, d5, p4, g4;
    const a3 = (s4 = m2()) == null ? void 0 : s4.product, n5 = a3 != null && a3.fetch ? a3.fetch.bind(a3) : (p4 = (d5 = a3 == null ? void 0 : a3.api) == null ? void 0 : d5.fetch) == null ? void 0 : p4.bind(a3.api);
    if (!n5) return [];
    try {
      const b7 = { source: t3, per_page: r6 };
      e6.length && (b7.source_value = e6);
      const f6 = await n5(b7);
      return (Array.isArray(f6 == null ? void 0 : f6.data) ? f6.data : Array.isArray(f6) ? f6 : ((g4 = f6 == null ? void 0 : f6.data) == null ? void 0 : g4.products) ?? []).map(R2).filter((x3) => x3.name).slice(0, r6);
    } catch {
      return [];
    }
  })()), C3.get(i5);
}
async function ot2(t3, e6 = "best_selling", r6 = 12) {
  const i5 = Q2(t3);
  if (i5.length) return { items: (await V2(i5)).slice(0, r6), auto: false };
  let a3 = await F2(e6, [], r6);
  return !a3.length && e6 !== "latest" && (a3 = await F2("latest", [], r6)), { items: a3, auto: true };
}
async function ct2(t3, e6 = 1, r6) {
  var i5, a3, n5;
  await G3();
  try {
    return await ((n5 = (a3 = (i5 = m2()) == null ? void 0 : i5.cart) == null ? void 0 : a3.addItem) == null ? void 0 : n5.call(a3, r6 ? { id: t3, quantity: e6, notes: r6 } : { id: t3, quantity: e6 })), true;
  } catch {
    return false;
  }
}
function dt2(t3, e6 = true) {
  var r6, i5, a3;
  try {
    (a3 = e6 ? (r6 = m2()) == null ? void 0 : r6.success : (i5 = m2()) == null ? void 0 : i5.error) == null || a3(t3);
  } catch {
  }
}
function Z2() {
  try {
    return { ...Y2(), ...JSON.parse(localStorage.getItem(I3) || "{}") };
  } catch {
    return Y2();
  }
}
function ut2(t3) {
  try {
    localStorage.setItem(I3, JSON.stringify(t3));
  } catch {
  }
}
function j2(t3) {
  const e6 = Z2();
  return t3(e6), ut2(e6), e6;
}
function pt2() {
  let t3 = false;
  try {
    t3 = !sessionStorage.getItem(I3), sessionStorage.setItem(I3, "1");
  } catch {
  }
  return t3 ? j2((e6) => {
    e6.visits += 1, e6.last = Date.now();
  }) : Z2();
}
function ht2() {
  U || (U = true, gt2("cart::item.added", (t3) => {
    var r6;
    const e6 = Number(((r6 = t3 == null ? void 0 : t3.data) == null ? void 0 : r6.product_id) ?? 0);
    e6 && j2((i5) => {
      i5.carted.includes(e6) || (i5.carted = [...i5.carted.slice(-40), e6]);
    });
  }));
}
function yt2(t3) {
  const e6 = vt2[t3];
  if (!e6 || J2.has(e6)) return e6;
  J2.add(e6);
  const r6 = document.createElement("link");
  return r6.rel = "stylesheet", r6.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e6)}:wght@400;500;700;800&display=swap`, document.head.appendChild(r6), e6;
}
var m2, G3, X2, at2, l3, it2, h4, k3, u3, _3, P3, q, $3, nt2, Q2, C3, lt2, A3, gt2, W2, H3, I3, Y2, D3, U, ft2, mt2, bt2, xt2, vt2, J2, wt2, $t, L3, N2, kt, z3, _t, O2, y4;
var init_murshid_chat = __esm({
  "dist/murshid-chat.js"() {
    "use strict";
    init_lit();
    init_decorators();
    m2 = () => window.salla ?? window.Salla;
    G3 = async () => {
      var t3, e6;
      try {
        await ((e6 = (t3 = m2()) == null ? void 0 : t3.onReady) == null ? void 0 : e6.call(t3));
      } catch {
      }
    };
    X2 = () => {
      var t3, e6, r6, i5, a3;
      try {
        const n5 = ((e6 = (t3 = m2()) == null ? void 0 : t3.lang) == null ? void 0 : e6.locale) ?? ((a3 = (i5 = (r6 = m2()) == null ? void 0 : r6.config) == null ? void 0 : i5.get) == null ? void 0 : a3.call(i5, "user.language_code"));
        if (typeof n5 == "string" && n5) return n5.slice(0, 2);
      } catch {
      }
      return (document.documentElement.lang || "ar").slice(0, 2);
    };
    at2 = () => X2() === "en";
    l3 = (t3, e6) => at2() ? e6 : t3;
    it2 = (t3) => {
      var e6, r6, i5;
      try {
        return (i5 = (r6 = (e6 = m2()) == null ? void 0 : e6.config) == null ? void 0 : r6.get) == null ? void 0 : i5.call(r6, t3);
      } catch {
        return;
      }
    };
    h4 = (t3, e6 = "") => {
      if (t3 == null) return e6;
      if (typeof t3 == "string") {
        const r6 = t3.trim();
        if (r6.startsWith("{") && r6.endsWith("}"))
          try {
            return h4(JSON.parse(r6), e6);
          } catch {
          }
        return r6 || e6;
      }
      if (typeof t3 == "number" || typeof t3 == "boolean") return String(t3);
      if (typeof t3 == "object") {
        const r6 = t3, i5 = r6[X2()] ?? r6.ar ?? r6.en ?? Object.values(r6).find((a3) => typeof a3 == "string" && a3);
        return typeof i5 == "string" && i5.trim() ? i5 : e6;
      }
      return e6;
    };
    k3 = (t3, e6 = "") => {
      const r6 = Array.isArray(t3) ? t3[0] : t3, i5 = typeof r6 == "object" && r6 ? r6.value : r6;
      return i5 == null || i5 === "" ? e6 : String(i5);
    };
    u3 = (t3, e6 = 0) => {
      const r6 = Number(t3);
      return t3 === "" || t3 == null || !Number.isFinite(r6) ? e6 : r6;
    };
    _3 = (t3, e6 = false) => t3 == null || t3 === "" ? e6 : t3 === true || t3 === "true" || t3 === 1 || t3 === "1";
    P3 = (t3) => Array.isArray(t3) ? t3 : [];
    q = (t3) => h4(t3).split(/[,،\n]/).map((e6) => e6.trim()).filter(Boolean);
    $3 = (t3) => {
      const e6 = typeof t3 == "object" && t3 ? t3.amount : t3, r6 = Number(e6);
      return Number.isFinite(r6) ? r6 : 0;
    };
    nt2 = (t3) => {
      if (!t3) return null;
      const e6 = typeof t3 == "number" ? t3 < 1e12 ? t3 * 1e3 : t3 : Date.parse(String(t3).replace(" ", "T"));
      return Number.isFinite(e6) && e6 > Date.now() ? e6 : null;
    };
    Q2 = (t3) => (Array.isArray(t3) ? t3 : []).map((e6) => Number(typeof e6 == "object" && e6 ? e6.value : e6)).filter((e6) => Number.isFinite(e6) && e6 > 0);
    C3 = /* @__PURE__ */ new Map();
    lt2 = async (t3) => {
      var e6, r6, i5, a3;
      await G3();
      try {
        const n5 = await ((i5 = (r6 = (e6 = m2()) == null ? void 0 : e6.product) == null ? void 0 : r6.search) == null ? void 0 : i5.call(r6, { query: t3 }));
        return (Array.isArray(n5 == null ? void 0 : n5.data) ? n5.data : ((a3 = n5 == null ? void 0 : n5.data) == null ? void 0 : a3.products) ?? []).map(R2).filter((d5) => d5.name);
      } catch {
        return [];
      }
    };
    A3 = (t3) => {
      var e6, r6;
      try {
        const i5 = (r6 = (e6 = m2()) == null ? void 0 : e6.money) == null ? void 0 : r6.call(e6, t3);
        if (i5) return String(i5);
      } catch {
      }
      return `${Math.round(t3 * 100) / 100} ${l3("\u0631.\u0633", "SAR")}`;
    };
    gt2 = (t3, e6) => {
      var r6, i5, a3;
      try {
        (a3 = (i5 = (r6 = m2()) == null ? void 0 : r6.event) == null ? void 0 : i5.on) == null || a3.call(i5, t3, e6);
      } catch {
      }
    };
    W2 = () => String(it2("store.name") ?? "");
    H3 = (t3) => t3.toLowerCase().replace(/[\u064B-\u065F\u0670\u0640]/g, "").replace(/[أإآ]/g, "\u0627").replace(/ى/g, "\u064A").replace(/ة/g, "\u0647").replace(/ؤ/g, "\u0648").replace(/ئ/g, "\u064A");
    I3 = "tw_smart_mem_v1";
    Y2 = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
    D3 = (t3, e6 = 1) => j2((r6) => {
      r6.seen[t3.id] = (r6.seen[t3.id] || 0) + e6, r6.prices = [...r6.prices.slice(-29), t3.price], t3.category && (r6.tags[t3.category] = (r6.tags[t3.category] || 0) + e6);
    });
    U = false;
    ft2 = () => {
      const t3 = innerWidth, e6 = navigator.userAgent;
      return /iPad|Tablet/i.test(e6) || t3 >= 700 && t3 < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e6) || t3 < 700 ? "mobile" : "desktop";
    };
    mt2 = () => {
      try {
        return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
      } catch {
        return true;
      }
    };
    bt2 = Object.defineProperty;
    xt2 = (t3, e6, r6, i5) => {
      for (var a3 = void 0, n5 = t3.length - 1, s4; n5 >= 0; n5--)
        (s4 = t3[n5]) && (a3 = s4(e6, r6, a3) || a3);
      return a3 && bt2(e6, r6, a3), a3;
    };
    vt2 = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" };
    J2 = /* @__PURE__ */ new Set();
    wt2 = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" };
    $t = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"];
    L3 = class L4 extends i4 {
      get c() {
        return this.config ?? {};
      }
      connectedCallback() {
        super.connectedCallback(), ht2(), pt2();
      }
      firstUpdated() {
        if (!("IntersectionObserver" in window)) {
          this.setAttribute("in", "");
          return;
        }
        this.io = new IntersectionObserver((e6) => {
          var r6;
          e6.some((i5) => i5.isIntersecting) && (this.setAttribute("in", ""), (r6 = this.io) == null || r6.disconnect());
        }, { threshold: 0.12 }), this.io.observe(this);
      }
      disconnectedCallback() {
        var e6;
        super.disconnectedCallback(), (e6 = this.io) == null || e6.disconnect();
      }
      /** Hidden by the merchant's schedule or device rule? */
      hiddenNow() {
        const e6 = this.c, r6 = Date.now(), i5 = Date.parse(String(e6.s_from || "")), a3 = Date.parse(String(e6.s_to || ""));
        if (Number.isFinite(i5) && r6 < i5 || Number.isFinite(a3) && r6 > a3) return true;
        const n5 = ft2();
        return !!(_3(e6.s_hide_mobile) && n5 === "mobile" || _3(e6.s_hide_desktop) && n5 !== "mobile");
      }
      vars(e6 = "") {
        const r6 = this.c, i5 = [], a3 = (s4, d5) => {
          d5 !== "" && d5 != null && i5.push(`${s4}:${d5}`);
        };
        a3("--a", r6.s_accent || ""), a3("--a2", r6.s_accent2 || ""), a3("--bgc", r6.s_bg || ""), a3("--fgc", r6.s_text || ""), a3("--cardc", r6.s_card || ""), a3("--r", `${u3(r6.s_radius, 22)}px`), a3("--gap", `${u3(r6.s_gap, 18)}px`), a3("--ts", `${u3(r6.s_title_size, 38)}px`), a3("--fs", `${u3(r6.s_text_size, 16)}px`), a3("--pt", `${u3(r6.s_pad_top, 56)}px`), a3("--pb", `${u3(r6.s_pad_bottom, 56)}px`), a3("--maxw", wt2[k3(r6.s_width, "normal")] ?? "1240px"), a3("--sh", $t[Math.max(0, Math.min(5, u3(r6.s_shadow, 2)))]), a3("--ms", `${u3(r6.s_anim_ms, 700)}ms`), a3("--ov", String(u3(r6.s_overlay, 45) / 100)), r6.s_bg_image && a3("--bgimg", `url("${String(r6.s_bg_image)}")`);
        const n5 = yt2(k3(r6.s_font, "inherit"));
        return n5 && a3("font-family", `'${n5}', inherit`), i5.join(";") + (e6 ? ";" + e6 : "");
      }
      cls() {
        const e6 = this.c;
        return [
          "sec",
          `th-${k3(e6.s_theme, "auto")}`,
          `al-${k3(e6.s_align, "start")}`,
          `an-${k3(e6.s_anim, "rise")}`,
          `pt-${k3(e6.s_pattern, "none")}`,
          `bs-${k3(e6.s_btn_style, "pill")}`,
          _3(e6.s_border) ? "bordered" : "",
          _3(e6.s_stagger, true) ? "stagger" : "",
          e6.s_bg_image ? "has-img" : ""
        ].join(" ");
      }
      /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
      shell(e6, r6 = {}, i5 = "", a3 = "", n5 = true) {
        if (this.hiddenNow()) return A;
        const s4 = this.c, d5 = h4(s4.eyebrow, r6.eyebrow ?? ""), p4 = h4(s4.title, r6.title ?? ""), g4 = h4(s4.subtitle, r6.sub ?? ""), b7 = n5 && _3(s4.s_show_head, true) && (d5 || p4 || g4);
        return b2`<section class="${this.cls()} ${i5}" style=${this.vars(a3)} id=${String(s4.s_anchor || "") || A}>
      <div class="wrap">${b7 ? b2`<header class="head">${d5 ? b2`<span class="eyebrow">${d5}</span>` : ""}${p4 ? b2`<h2 class="title">${p4}</h2>` : ""}${g4 ? b2`<p class="sub">${g4}</p>` : ""}</header>` : ""}
      ${e6}</div></section>`;
      }
      /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
      hints(e6) {
        const r6 = e6.filter(Boolean);
        return !r6.length || !mt2() || !_3(this.c.s_hints, true) ? "" : b2`<aside class="hints" role="note"><b>💡 ${l3("\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F (\u064A\u0638\u0647\u0631 \u0644\u0643 \u0641\u0642\u0637)", "Setup assistant (only you see this)")}</b><ul>${r6.map((i5) => b2`<li>${i5}</li>`)}</ul></aside>`;
      }
      card(e6, r6 = {}) {
        var i5;
        return b2`<article class="pc ${e6.available ? "" : "oos"}">
      <a class="ph" href=${e6.url} @click=${() => D3(e6)}><img src=${e6.image} alt=${e6.name} loading="lazy" />${(i5 = r6.badges) != null && i5.length ? b2`<span class="badges">${r6.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e6.url} @click=${() => D3(e6)}>${e6.name}</a>
        <div class="pr"><b>${A3(e6.price)}</b>${e6.regular > e6.price ? b2`<s>${A3(e6.regular)}</s>` : ""}</div>
        ${r6.rating !== false && e6.rating > 0 ? b2`<div class="rt">★ ${e6.rating.toFixed(1)}${e6.ratingCount ? b2` <small>(${e6.ratingCount})</small>` : ""}</div>` : ""}
        ${r6.extra ?? ""}
        ${r6.quick !== false ? b2`<button class="btn sm" ?disabled=${!e6.available} @click=${() => this.add(e6)}>${e6.available ? l3("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart") : l3("\u0646\u0641\u062F\u062A \u0627\u0644\u0643\u0645\u064A\u0629", "Sold out")}</button>` : ""}
      </div></article>`;
      }
      async add(e6, r6 = 1, i5) {
        D3(e6, 3), await ct2(e6.id, r6, i5) ? dt2(l3("\u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629", "Added to cart")) : location.href = e6.url;
      }
    };
    L3.base = i`
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
    N2 = L3;
    xt2([
      n4({ type: Object })
    ], N2.prototype, "config");
    kt = Object.defineProperty;
    z3 = (t3, e6, r6, i5) => {
      for (var a3 = void 0, n5 = t3.length - 1, s4; n5 >= 0; n5--)
        (s4 = t3[n5]) && (a3 = s4(e6, r6, a3) || a3);
      return a3 && kt(e6, r6, a3), a3;
    };
    _t = (t3) => t3.replace(/[٠-٩]/g, (e6) => String("\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(e6)));
    O2 = class O3 extends N2 {
      constructor() {
        super(...arguments), this.msgs = [], this.typing = false, this.open = false, this.input = "";
      }
      willUpdate(e6) {
        e6.has("config") && !this.msgs.length && (this.msgs = [{ me: false, text: h4(this.c.greeting, l3(`\u0623\u0647\u0644\u0627\u064B! \u0623\u0646\u0627 ${this.botName()} \u{1F44B}
\u0642\u0644 \u0644\u064A \u0648\u0634 \u062A\u062F\u0648\u0651\u0631 \u0639\u0644\u064A\u0647\u060C \u0623\u0648 \u062D\u062F\u062F \u0645\u064A\u0632\u0627\u0646\u064A\u062A\u0643 \u0645\u062B\u0644 \xAB\u0647\u062F\u064A\u0629 \u062A\u062D\u062A 200\xBB`, `Hi! I am ${this.botName()} \u{1F44B}
Tell me what you need, or a budget like "gift under 200"`)) }]);
      }
      updated(e6) {
        super.updated(e6), this.log && (this.log.scrollTop = this.log.scrollHeight);
      }
      botName() {
        return h4(this.c.bot_name, l3(`\u0645\u0633\u0627\u0639\u062F ${W2() || "\u0627\u0644\u0645\u062A\u062C\u0631"}`, `${W2() || "Store"} assistant`));
      }
      async reply(e6) {
        const r6 = this.c, i5 = H3(_t(e6)), a3 = (i5.match(/\d+/g) ?? []).map(Number), n5 = /(فوق|اكثر من|over|above)/.test(i5), s4 = a3.length ? n5 ? null : Math.max(...a3) : null, d5 = a3.length && n5 ? Math.min(...a3) : null, p4 = (o7) => o7.filter((v5) => v5.available && (s4 == null || v5.price <= s4) && (d5 == null || v5.price >= d5));
        let g4 = null, b7 = 0;
        for (const o7 of P3(r6.intents)) {
          const T5 = [...q(o7.keywords), h4(o7.label)].map((E7) => H3(E7)).filter(Boolean).filter((E7) => i5.includes(E7)).length;
          T5 > b7 && (b7 = T5, g4 = o7);
        }
        if (g4) {
          const o7 = p4(await V2(Q2(g4.products)));
          return { me: false, text: h4(g4.reply), prods: o7.slice(0, u3(r6.max_results, 6)), link: String(g4.link || ""), linkText: h4(g4.link_text) };
        }
        const w5 = [
          [/(عرض|عروض|خصم|تخفيض|اوفر|deal|offer|sale|discount)/, "offers", "\u0647\u0630\u064A \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0627\u0644\u0644\u064A \u0639\u0644\u064A\u0647\u0627 \u062E\u0635\u0645 \u0627\u0644\u062D\u064A\u0646:", "These are on sale right now:"],
          [/(جديد|احدث|وصل|new|latest)/, "latest", "\u0623\u062D\u062F\u062B \u0645\u0627 \u0648\u0635\u0644\u0646\u0627:", "Our newest arrivals:"],
          [/(مبيع|طلب|مشهور|ترند|best|popular|trend)/, "best_selling", "\u0627\u0644\u0623\u0643\u062B\u0631 \u0637\u0644\u0628\u0627\u064B \u0641\u064A \u0627\u0644\u0645\u062A\u062C\u0631:", "Most ordered in the store:"],
          [/(هديه|هدايا|اهدي|gift)/, "top-rated", "\u0627\u0642\u062A\u0631\u0627\u062D\u0627\u062A \u0647\u062F\u0627\u064A\u0627 \u0645\u0646 \u0627\u0644\u0623\u0639\u0644\u0649 \u062A\u0642\u064A\u064A\u0645\u0627\u064B:", "Gift ideas from our top rated:"],
          [/(تقييم|افضل|احسن|top|rated|best)/, "top-rated", "\u0627\u0644\u0623\u0639\u0644\u0649 \u062A\u0642\u064A\u064A\u0645\u0627\u064B \u0639\u0646\u062F \u0639\u0645\u0644\u0627\u0626\u0646\u0627:", "Top rated by our customers:"]
        ].find(([o7]) => o7.test(i5));
        if (w5) {
          const o7 = p4(await F2(w5[1], [], 24));
          if (o7.length) return { me: false, text: (s4 ? l3(`\u0636\u0645\u0646 ${A3(s4)}\u060C `, `Within ${A3(s4)}, `) : "") + l3(w5[2], w5[3]), prods: o7.slice(0, u3(r6.max_results, 6)) };
        }
        const x3 = e6.replace(/[0-9٠-٩]+/g, "").replace(/(تحت|اقل من|أقل من|فوق|ريال|ر\.س|بـ|ابي|أبي|ابغى|أبغى|ودي|عندكم|فيه|عطني|under|over|i want|do you have)/gi, " ").trim();
        if (_3(r6.search_fallback, true) && x3.length > 1) {
          const o7 = p4(await lt2(x3));
          if (o7.length) return { me: false, text: l3(`\u0644\u0642\u064A\u062A \u0644\u0643 ${o7.length} \u0645\u0646\u062A\u062C \u064A\u0646\u0627\u0633\u0628 \xAB${x3}\xBB:`, `I found ${o7.length} for "${x3}":`), prods: o7.slice(0, u3(r6.max_results, 6)) };
        }
        if (s4) {
          const o7 = p4((await ot2(r6.products, "best_selling", 30)).items);
          if (o7.length) return { me: false, text: l3(`\u0647\u0630\u064A \u0627\u062E\u062A\u064A\u0627\u0631\u0627\u062A \u0636\u0645\u0646 \u0645\u064A\u0632\u0627\u0646\u064A\u062A\u0643 ${A3(s4)}:`, `Picks within ${A3(s4)}:`), prods: o7.slice(0, u3(r6.max_results, 6)) };
        }
        const S4 = String(r6.whatsapp || "").replace(/\D/g, "");
        return { me: false, text: h4(r6.fallback, l3("\u0645\u0627 \u0644\u0642\u064A\u062A \u0634\u064A \u0645\u0637\u0627\u0628\u0642 \u{1F64F} \u062C\u0631\u0651\u0628 \u0643\u0644\u0645\u0629 \u062B\u0627\u0646\u064A\u0629\u060C \u0623\u0648 \u0643\u0644\u0651\u0645 \u0641\u0631\u064A\u0642\u0646\u0627 \u0645\u0628\u0627\u0634\u0631\u0629.", "Nothing matched \u{1F64F} try other words or talk to our team.")), link: S4 ? `https://wa.me/${S4}?text=${encodeURIComponent(e6)}` : "", linkText: l3("\u0643\u0644\u0651\u0645\u0646\u0627 \u0648\u0627\u062A\u0633\u0627\u0628", "Chat on WhatsApp") };
      }
      async send(e6) {
        if (e6 = e6.trim(), !e6) return;
        this.input = "", this.msgs = [...this.msgs, { me: true, text: e6 }], this.typing = true;
        const [r6] = await Promise.all([this.reply(e6), new Promise((i5) => setTimeout(i5, u3(this.c.typing_ms, 700)))]);
        this.typing = false, this.msgs = [...this.msgs, r6];
      }
      ui() {
        const e6 = this.c, r6 = [...P3(e6.intents).map((a3) => h4(a3.label)).filter(Boolean), ...q(e6.suggestions)], i5 = r6.length ? r6 : [l3("\u0627\u0644\u0639\u0631\u0648\u0636", "Deals"), l3("\u0627\u0644\u0623\u0643\u062B\u0631 \u0645\u0628\u064A\u0639\u0627\u064B", "Best sellers"), l3("\u0647\u062F\u064A\u0629 \u062A\u062D\u062A 200", "Gift under 200"), l3("\u0648\u0634 \u0627\u0644\u062C\u062F\u064A\u062F\u061F", "What is new?")];
        return b2`<div class="chat" style=${`--ch:${u3(e6.height, 560)}px`}>
      <div class="top"><div class="av" style=${e6.avatar ? `background-image:url("${e6.avatar}")` : ""}>${e6.avatar ? "" : "\u{1F916}"}</div><div><b>${this.botName()}</b><small>${h4(e6.status, l3("\u0645\u062A\u0635\u0644 \u0627\u0644\u0622\u0646 \xB7 \u064A\u0631\u062F \u0641\u0648\u0631\u0627\u064B", "Online \xB7 replies instantly"))}</small></div></div>
      <div class="log" aria-live="polite">${this.msgs.map((a3) => {
          var n5;
          return b2`<div class="m ${a3.me ? "me" : "bot"}">${a3.text}
        ${(n5 = a3.prods) != null && n5.length ? b2`<div class="ps">${a3.prods.map((s4) => b2`<a class="p" href=${s4.url} @click=${() => D3(s4)}><img src=${s4.image} alt="" loading="lazy" /><span>${s4.name}</span><b>${A3(s4.price)}</b></a>`)}</div>` : ""}
        ${a3.link ? b2`<a class="ml" href=${a3.link} target="_blank" rel="noopener">${a3.linkText || l3("\u0627\u0641\u062A\u062D", "Open")} ←</a>` : ""}</div>`;
        })}
        ${this.typing ? b2`<div class="m bot"><span class="typing"><i></i><i></i><i></i></span></div>` : ""}</div>
      ${_3(e6.show_suggestions, true) ? b2`<div class="sug">${i5.slice(0, 8).map((a3) => b2`<button class="chip" @click=${() => this.send(a3)}>${a3}</button>`)}</div>` : ""}
      <form @submit=${(a3) => {
          a3.preventDefault(), this.send(this.input);
        }}><input .value=${this.input} @input=${(a3) => this.input = a3.target.value} placeholder=${h4(e6.placeholder, l3("\u0627\u0643\u062A\u0628 \u0633\u0624\u0627\u0644\u0643\u2026 \u0645\u062B\u0644\u0627\u064B: \u0639\u0637\u0631 \u062A\u062D\u062A 300", "Ask\u2026 e.g. perfume under 300"))} /><button class="btn" type="submit">${l3("\u0625\u0631\u0633\u0627\u0644", "Send")}</button></form>
    </div>`;
      }
      render() {
        return k3(this.c.mode, "inline") === "floating" ? this.hiddenNow() ? "" : b2`<div class=${this.cls()} style=${this.vars()}>${this.open ? b2`<div class="float">${this.ui()}</div>` : ""}<button class="fab" aria-label="chat" @click=${() => this.open = !this.open}>${this.open ? "\xD7" : "\u{1F4AC}"}</button></div>` : this.shell(this.ui(), { eyebrow: l3("\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u062A\u0633\u0648\u0642", "Shopping assistant"), title: l3("\u0627\u0633\u0623\u0644\u0646\u064A \u0639\u0646 \u0623\u064A \u0634\u064A \u0641\u064A \u0627\u0644\u0645\u062A\u062C\u0631", "Ask me anything about the store") });
      }
    };
    O2.styles = [N2.base, i`
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
    y4 = O2;
    z3([
      r5()
    ], y4.prototype, "msgs");
    z3([
      r5()
    ], y4.prototype, "typing");
    z3([
      r5()
    ], y4.prototype, "open");
    z3([
      r5()
    ], y4.prototype, "input");
    z3([
      e5(".log")
    ], y4.prototype, "log");
    typeof y4 < "u" && y4.registerSallaComponent("salla-murshid-chat");
  }
});

// dist/murshid-gift.js
var murshid_gift_exports = {};
__export(murshid_gift_exports, {
  default: () => p3
});
function J3(t3) {
  var n5, c4, l4, x3, u5, j5, C7, F3, I7;
  const e6 = y5(t3 == null ? void 0 : t3.sale_price), a3 = y5((t3 == null ? void 0 : t3.regular_price) ?? (t3 == null ? void 0 : t3.price)), i5 = e6 && e6 < a3 ? e6 : y5(t3 == null ? void 0 : t3.price) || a3, r6 = Math.max(y5(t3 == null ? void 0 : t3.regular_price), y5(t3 == null ? void 0 : t3.price), i5), s4 = (Array.isArray(t3 == null ? void 0 : t3.images) ? t3.images : []).map((S4) => String((S4 == null ? void 0 : S4.url) ?? S4 ?? "")).filter(Boolean), o7 = (t3 == null ? void 0 : t3.sold_quantity) ?? (t3 == null ? void 0 : t3.sold);
  return {
    id: Number(t3 == null ? void 0 : t3.id),
    name: String((t3 == null ? void 0 : t3.name) ?? ""),
    url: String((t3 == null ? void 0 : t3.url) ?? "#"),
    image: String(((n5 = t3 == null ? void 0 : t3.image) == null ? void 0 : n5.url) ?? (t3 == null ? void 0 : t3.main_image) ?? (t3 == null ? void 0 : t3.thumbnail) ?? s4[0] ?? ""),
    images: s4,
    price: i5,
    regular: r6,
    discount: r6 > i5 ? Math.round((1 - i5 / r6) * 100) : 0,
    rating: y5(((c4 = t3 == null ? void 0 : t3.rating) == null ? void 0 : c4.stars) ?? ((l4 = t3 == null ? void 0 : t3.rating) == null ? void 0 : l4.rate) ?? (t3 == null ? void 0 : t3.rating)),
    ratingCount: y5((x3 = t3 == null ? void 0 : t3.rating) == null ? void 0 : x3.count),
    qty: (t3 == null ? void 0 : t3.quantity) == null || t3 != null && t3.unlimited_quantity ? null : y5(t3 == null ? void 0 : t3.quantity),
    available: (t3 == null ? void 0 : t3.is_available) !== false && (t3 == null ? void 0 : t3.status) !== "out" && !((t3 == null ? void 0 : t3.quantity) === 0 && !(t3 != null && t3.unlimited_quantity)),
    sold: o7 == null || o7 === "" || !Number.isFinite(Number(o7)) ? null : Number(o7),
    endsAt: V3((t3 == null ? void 0 : t3.discount_ends) ?? (t3 == null ? void 0 : t3.sale_end) ?? (t3 == null ? void 0 : t3.discount_end)),
    category: String(((u5 = t3 == null ? void 0 : t3.category) == null ? void 0 : u5.name) ?? ((C7 = (j5 = t3 == null ? void 0 : t3.categories) == null ? void 0 : j5[0]) == null ? void 0 : C7.name) ?? ""),
    brand: String(((F3 = t3 == null ? void 0 : t3.brand) == null ? void 0 : F3.name) ?? ""),
    promo: String(((I7 = t3 == null ? void 0 : t3.promotion) == null ? void 0 : I7.title) ?? (t3 == null ? void 0 : t3.promotion_title) ?? "")
  };
}
async function Z3(t3) {
  var i5, r6, s4;
  const e6 = (i5 = m3()) == null ? void 0 : i5.product;
  if (!e6) return null;
  const a3 = e6.getDetails ? e6.getDetails.bind(e6) : (s4 = (r6 = e6.api) == null ? void 0 : r6.getDetails) == null ? void 0 : s4.bind(e6.api);
  if (!a3) return null;
  try {
    const o7 = await a3(t3, ["images", "sold_quantity", "category"]), n5 = J3((o7 == null ? void 0 : o7.data) ?? o7);
    return n5.name ? n5 : null;
  } catch {
    return null;
  }
}
async function Y3(t3) {
  await M3();
  const e6 = "ids:" + t3.join(",");
  return _4.has(e6) || _4.set(e6, Promise.all(t3.map(Z3)).then((a3) => a3.filter((i5) => !!i5))), _4.get(e6);
}
async function O4(t3, e6 = [], a3 = 12) {
  await M3();
  const i5 = `src:${t3}:${e6.join(",")}:${a3}`;
  return _4.has(i5) || _4.set(i5, (async () => {
    var o7, n5, c4, l4;
    const r6 = (o7 = m3()) == null ? void 0 : o7.product, s4 = r6 != null && r6.fetch ? r6.fetch.bind(r6) : (c4 = (n5 = r6 == null ? void 0 : r6.api) == null ? void 0 : n5.fetch) == null ? void 0 : c4.bind(r6.api);
    if (!s4) return [];
    try {
      const x3 = { source: t3, per_page: a3 };
      e6.length && (x3.source_value = e6);
      const u5 = await s4(x3);
      return (Array.isArray(u5 == null ? void 0 : u5.data) ? u5.data : Array.isArray(u5) ? u5 : ((l4 = u5 == null ? void 0 : u5.data) == null ? void 0 : l4.products) ?? []).map(J3).filter((C7) => C7.name).slice(0, a3);
    } catch {
      return [];
    }
  })()), _4.get(i5);
}
async function tt2(t3, e6 = "best_selling", a3 = 12) {
  const i5 = U2(t3);
  if (i5.length) return { items: (await Y3(i5)).slice(0, a3), auto: false };
  let r6 = await O4(e6, [], a3);
  return !r6.length && e6 !== "latest" && (r6 = await O4("latest", [], a3)), { items: r6, auto: true };
}
async function et2(t3, e6 = 1, a3) {
  var i5, r6, s4;
  await M3();
  try {
    return await ((s4 = (r6 = (i5 = m3()) == null ? void 0 : i5.cart) == null ? void 0 : r6.addItem) == null ? void 0 : s4.call(r6, a3 ? { id: t3, quantity: e6, notes: a3 } : { id: t3, quantity: e6 })), true;
  } catch {
    return false;
  }
}
function at3(t3, e6 = true) {
  var a3, i5, r6;
  try {
    (r6 = e6 ? (a3 = m3()) == null ? void 0 : a3.success : (i5 = m3()) == null ? void 0 : i5.error) == null || r6(t3);
  } catch {
  }
}
function A4() {
  try {
    return { ...L5(), ...JSON.parse(localStorage.getItem(N3) || "{}") };
  } catch {
    return L5();
  }
}
function it3(t3) {
  try {
    localStorage.setItem(N3, JSON.stringify(t3));
  } catch {
  }
}
function z4(t3) {
  const e6 = A4();
  return t3(e6), it3(e6), e6;
}
function nt3() {
  let t3 = false;
  try {
    t3 = !sessionStorage.getItem(N3), sessionStorage.setItem(N3, "1");
  } catch {
  }
  return t3 ? z4((e6) => {
    e6.visits += 1, e6.last = Date.now();
  }) : A4();
}
function ot3() {
  const t3 = [...A4().prices].sort((e6, a3) => e6 - a3);
  return t3.length >= 3 ? t3[Math.floor(t3.length / 2)] : 0;
}
function ct3(t3, e6 = A4()) {
  let a3 = (e6.seen[t3.id] || 0) * 2 + (e6.carted.includes(t3.id) ? 4 : 0) + (t3.category && e6.tags[t3.category] || 0);
  const i5 = ot3();
  return i5 && (a3 += Math.max(0, 2 - Math.abs(t3.price - i5) / i5 * 2)), a3;
}
function dt3() {
  P4 || (P4 = true, rt2("cart::item.added", (t3) => {
    var a3;
    const e6 = Number(((a3 = t3 == null ? void 0 : t3.data) == null ? void 0 : a3.product_id) ?? 0);
    e6 && z4((i5) => {
      i5.carted.includes(e6) || (i5.carted = [...i5.carted.slice(-40), e6]);
    });
  }));
}
function bt3(t3) {
  const e6 = ft3[t3];
  if (!e6 || W3.has(e6)) return e6;
  W3.add(e6);
  const a3 = document.createElement("link");
  return a3.rel = "stylesheet", a3.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e6)}:wght@400;500;700;800&display=swap`, document.head.appendChild(a3), e6;
}
var m3, M3, H4, Q3, g2, f3, v2, h5, b4, R3, y5, V3, U2, _4, G4, rt2, N3, L5, D4, st3, lt3, P4, gt3, ut3, ht3, pt3, ft3, W3, mt3, xt3, B4, k4, vt3, $4, E3, p3;
var init_murshid_gift = __esm({
  "dist/murshid-gift.js"() {
    "use strict";
    init_lit();
    init_decorators();
    m3 = () => window.salla ?? window.Salla;
    M3 = async () => {
      var t3, e6;
      try {
        await ((e6 = (t3 = m3()) == null ? void 0 : t3.onReady) == null ? void 0 : e6.call(t3));
      } catch {
      }
    };
    H4 = () => {
      var t3, e6, a3, i5, r6;
      try {
        const s4 = ((e6 = (t3 = m3()) == null ? void 0 : t3.lang) == null ? void 0 : e6.locale) ?? ((r6 = (i5 = (a3 = m3()) == null ? void 0 : a3.config) == null ? void 0 : i5.get) == null ? void 0 : r6.call(i5, "user.language_code"));
        if (typeof s4 == "string" && s4) return s4.slice(0, 2);
      } catch {
      }
      return (document.documentElement.lang || "ar").slice(0, 2);
    };
    Q3 = () => H4() === "en";
    g2 = (t3, e6) => Q3() ? e6 : t3;
    f3 = (t3, e6 = "") => {
      if (t3 == null) return e6;
      if (typeof t3 == "string") {
        const a3 = t3.trim();
        if (a3.startsWith("{") && a3.endsWith("}"))
          try {
            return f3(JSON.parse(a3), e6);
          } catch {
          }
        return a3 || e6;
      }
      if (typeof t3 == "number" || typeof t3 == "boolean") return String(t3);
      if (typeof t3 == "object") {
        const a3 = t3, i5 = a3[H4()] ?? a3.ar ?? a3.en ?? Object.values(a3).find((r6) => typeof r6 == "string" && r6);
        return typeof i5 == "string" && i5.trim() ? i5 : e6;
      }
      return e6;
    };
    v2 = (t3, e6 = "") => {
      const a3 = Array.isArray(t3) ? t3[0] : t3, i5 = typeof a3 == "object" && a3 ? a3.value : a3;
      return i5 == null || i5 === "" ? e6 : String(i5);
    };
    h5 = (t3, e6 = 0) => {
      const a3 = Number(t3);
      return t3 === "" || t3 == null || !Number.isFinite(a3) ? e6 : a3;
    };
    b4 = (t3, e6 = false) => t3 == null || t3 === "" ? e6 : t3 === true || t3 === "true" || t3 === 1 || t3 === "1";
    R3 = (t3) => Array.isArray(t3) ? t3 : [];
    y5 = (t3) => {
      const e6 = typeof t3 == "object" && t3 ? t3.amount : t3, a3 = Number(e6);
      return Number.isFinite(a3) ? a3 : 0;
    };
    V3 = (t3) => {
      if (!t3) return null;
      const e6 = typeof t3 == "number" ? t3 < 1e12 ? t3 * 1e3 : t3 : Date.parse(String(t3).replace(" ", "T"));
      return Number.isFinite(e6) && e6 > Date.now() ? e6 : null;
    };
    U2 = (t3) => (Array.isArray(t3) ? t3 : []).map((e6) => Number(typeof e6 == "object" && e6 ? e6.value : e6)).filter((e6) => Number.isFinite(e6) && e6 > 0);
    _4 = /* @__PURE__ */ new Map();
    G4 = (t3) => {
      var e6, a3;
      try {
        const i5 = (a3 = (e6 = m3()) == null ? void 0 : e6.money) == null ? void 0 : a3.call(e6, t3);
        if (i5) return String(i5);
      } catch {
      }
      return `${Math.round(t3 * 100) / 100} ${g2("\u0631.\u0633", "SAR")}`;
    };
    rt2 = (t3, e6) => {
      var a3, i5, r6;
      try {
        (r6 = (i5 = (a3 = m3()) == null ? void 0 : a3.event) == null ? void 0 : i5.on) == null || r6.call(i5, t3, e6);
      } catch {
      }
    };
    N3 = "tw_smart_mem_v1";
    L5 = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
    D4 = (t3, e6 = 1) => z4((a3) => {
      a3.seen[t3.id] = (a3.seen[t3.id] || 0) + e6, a3.prices = [...a3.prices.slice(-29), t3.price], t3.category && (a3.tags[t3.category] = (a3.tags[t3.category] || 0) + e6);
    });
    st3 = (t3, e6 = 1) => t3 && z4((a3) => {
      a3.tags[t3] = (a3.tags[t3] || 0) + e6;
    });
    lt3 = (t3, e6 = true) => {
      if (!e6) return t3;
      const a3 = A4();
      return t3.map((i5, r6) => ({ p: i5, i: r6, s: ct3(i5, a3) })).sort((i5, r6) => r6.s - i5.s || i5.i - r6.i).map((i5) => i5.p);
    };
    P4 = false;
    gt3 = () => {
      const t3 = innerWidth, e6 = navigator.userAgent;
      return /iPad|Tablet/i.test(e6) || t3 >= 700 && t3 < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e6) || t3 < 700 ? "mobile" : "desktop";
    };
    ut3 = () => {
      try {
        return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
      } catch {
        return true;
      }
    };
    ht3 = Object.defineProperty;
    pt3 = (t3, e6, a3, i5) => {
      for (var r6 = void 0, s4 = t3.length - 1, o7; s4 >= 0; s4--)
        (o7 = t3[s4]) && (r6 = o7(e6, a3, r6) || r6);
      return r6 && ht3(e6, a3, r6), r6;
    };
    ft3 = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" };
    W3 = /* @__PURE__ */ new Set();
    mt3 = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" };
    xt3 = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"];
    B4 = class B5 extends i4 {
      get c() {
        return this.config ?? {};
      }
      connectedCallback() {
        super.connectedCallback(), dt3(), nt3();
      }
      firstUpdated() {
        if (!("IntersectionObserver" in window)) {
          this.setAttribute("in", "");
          return;
        }
        this.io = new IntersectionObserver((e6) => {
          var a3;
          e6.some((i5) => i5.isIntersecting) && (this.setAttribute("in", ""), (a3 = this.io) == null || a3.disconnect());
        }, { threshold: 0.12 }), this.io.observe(this);
      }
      disconnectedCallback() {
        var e6;
        super.disconnectedCallback(), (e6 = this.io) == null || e6.disconnect();
      }
      /** Hidden by the merchant's schedule or device rule? */
      hiddenNow() {
        const e6 = this.c, a3 = Date.now(), i5 = Date.parse(String(e6.s_from || "")), r6 = Date.parse(String(e6.s_to || ""));
        if (Number.isFinite(i5) && a3 < i5 || Number.isFinite(r6) && a3 > r6) return true;
        const s4 = gt3();
        return !!(b4(e6.s_hide_mobile) && s4 === "mobile" || b4(e6.s_hide_desktop) && s4 !== "mobile");
      }
      vars(e6 = "") {
        const a3 = this.c, i5 = [], r6 = (o7, n5) => {
          n5 !== "" && n5 != null && i5.push(`${o7}:${n5}`);
        };
        r6("--a", a3.s_accent || ""), r6("--a2", a3.s_accent2 || ""), r6("--bgc", a3.s_bg || ""), r6("--fgc", a3.s_text || ""), r6("--cardc", a3.s_card || ""), r6("--r", `${h5(a3.s_radius, 22)}px`), r6("--gap", `${h5(a3.s_gap, 18)}px`), r6("--ts", `${h5(a3.s_title_size, 38)}px`), r6("--fs", `${h5(a3.s_text_size, 16)}px`), r6("--pt", `${h5(a3.s_pad_top, 56)}px`), r6("--pb", `${h5(a3.s_pad_bottom, 56)}px`), r6("--maxw", mt3[v2(a3.s_width, "normal")] ?? "1240px"), r6("--sh", xt3[Math.max(0, Math.min(5, h5(a3.s_shadow, 2)))]), r6("--ms", `${h5(a3.s_anim_ms, 700)}ms`), r6("--ov", String(h5(a3.s_overlay, 45) / 100)), a3.s_bg_image && r6("--bgimg", `url("${String(a3.s_bg_image)}")`);
        const s4 = bt3(v2(a3.s_font, "inherit"));
        return s4 && r6("font-family", `'${s4}', inherit`), i5.join(";") + (e6 ? ";" + e6 : "");
      }
      cls() {
        const e6 = this.c;
        return [
          "sec",
          `th-${v2(e6.s_theme, "auto")}`,
          `al-${v2(e6.s_align, "start")}`,
          `an-${v2(e6.s_anim, "rise")}`,
          `pt-${v2(e6.s_pattern, "none")}`,
          `bs-${v2(e6.s_btn_style, "pill")}`,
          b4(e6.s_border) ? "bordered" : "",
          b4(e6.s_stagger, true) ? "stagger" : "",
          e6.s_bg_image ? "has-img" : ""
        ].join(" ");
      }
      /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
      shell(e6, a3 = {}, i5 = "", r6 = "", s4 = true) {
        if (this.hiddenNow()) return A;
        const o7 = this.c, n5 = f3(o7.eyebrow, a3.eyebrow ?? ""), c4 = f3(o7.title, a3.title ?? ""), l4 = f3(o7.subtitle, a3.sub ?? ""), x3 = s4 && b4(o7.s_show_head, true) && (n5 || c4 || l4);
        return b2`<section class="${this.cls()} ${i5}" style=${this.vars(r6)} id=${String(o7.s_anchor || "") || A}>
      <div class="wrap">${x3 ? b2`<header class="head">${n5 ? b2`<span class="eyebrow">${n5}</span>` : ""}${c4 ? b2`<h2 class="title">${c4}</h2>` : ""}${l4 ? b2`<p class="sub">${l4}</p>` : ""}</header>` : ""}
      ${e6}</div></section>`;
      }
      /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
      hints(e6) {
        const a3 = e6.filter(Boolean);
        return !a3.length || !ut3() || !b4(this.c.s_hints, true) ? "" : b2`<aside class="hints" role="note"><b>💡 ${g2("\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F (\u064A\u0638\u0647\u0631 \u0644\u0643 \u0641\u0642\u0637)", "Setup assistant (only you see this)")}</b><ul>${a3.map((i5) => b2`<li>${i5}</li>`)}</ul></aside>`;
      }
      card(e6, a3 = {}) {
        var i5;
        return b2`<article class="pc ${e6.available ? "" : "oos"}">
      <a class="ph" href=${e6.url} @click=${() => D4(e6)}><img src=${e6.image} alt=${e6.name} loading="lazy" />${(i5 = a3.badges) != null && i5.length ? b2`<span class="badges">${a3.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e6.url} @click=${() => D4(e6)}>${e6.name}</a>
        <div class="pr"><b>${G4(e6.price)}</b>${e6.regular > e6.price ? b2`<s>${G4(e6.regular)}</s>` : ""}</div>
        ${a3.rating !== false && e6.rating > 0 ? b2`<div class="rt">★ ${e6.rating.toFixed(1)}${e6.ratingCount ? b2` <small>(${e6.ratingCount})</small>` : ""}</div>` : ""}
        ${a3.extra ?? ""}
        ${a3.quick !== false ? b2`<button class="btn sm" ?disabled=${!e6.available} @click=${() => this.add(e6)}>${e6.available ? g2("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart") : g2("\u0646\u0641\u062F\u062A \u0627\u0644\u0643\u0645\u064A\u0629", "Sold out")}</button>` : ""}
      </div></article>`;
      }
      async add(e6, a3 = 1, i5) {
        D4(e6, 3), await et2(e6.id, a3, i5) ? at3(g2("\u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629", "Added to cart")) : location.href = e6.url;
      }
    };
    B4.base = i`
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
    k4 = B4;
    pt3([
      n4({ type: Object })
    ], k4.prototype, "config");
    vt3 = Object.defineProperty;
    $4 = (t3, e6, a3, i5) => {
      for (var r6 = void 0, s4 = t3.length - 1, o7; s4 >= 0; s4--)
        (o7 = t3[s4]) && (r6 = o7(e6, a3, r6) || r6);
      return r6 && vt3(e6, a3, r6), r6;
    };
    E3 = class E4 extends k4 {
      constructor() {
        super(...arguments), this.pool = [], this.who = [], this.occ = [], this.w = -1, this.o = -1, this.budget = 0, this.note = "", this.auto = false, this.seq = 0;
      }
      willUpdate(e6) {
        e6.has("config") && this.load();
      }
      async load() {
        const e6 = ++this.seq, a3 = this.c, i5 = (l4) => ({ label: f3(l4.label), emoji: f3(l4.emoji, "\u{1F381}"), prods: U2(l4.products) });
        let r6 = R3(a3.recipients).map(i5).filter((l4) => l4.label);
        const s4 = R3(a3.occasions).map(i5).filter((l4) => l4.label), o7 = [...new Set([...r6, ...s4].flatMap((l4) => l4.prods))];
        let n5 = o7.length ? await Y3(o7) : [], c4 = false;
        if (!n5.length || b4(a3.include_auto, true)) {
          const l4 = (await tt2(a3.products, v2(a3.auto_source, "top-rated"), h5(a3.pool, 24))).items;
          n5 = [...n5, ...l4.filter((x3) => !n5.some((u5) => u5.id === x3.id))], c4 = !o7.length;
        }
        r6.length || (c4 = true, r6 = [...new Set(n5.map((l4) => l4.category).filter(Boolean))].slice(0, 6).map((l4) => ({ label: l4, emoji: "\u{1F381}", prods: [], cat: l4 }))), e6 === this.seq && (this.pool = n5.filter((l4) => l4.available), this.who = r6, this.occ = s4, this.auto = c4, this.budget = Math.ceil(Math.max(0, ...this.pool.map((l4) => l4.price))));
      }
      found() {
        const e6 = this.who[this.w], a3 = this.occ[this.o], i5 = (n5, c4) => !n5 || (n5.cat ? c4.category === n5.cat : n5.prods.includes(c4.id)), r6 = this.pool.filter((n5) => i5(e6, n5) && i5(a3, n5) && n5.price <= this.budget), s4 = v2(this.c.sort, "smart");
        return (s4 === "price_asc" ? r6.sort((n5, c4) => n5.price - c4.price) : s4 === "price_desc" ? r6.sort((n5, c4) => c4.price - n5.price) : s4 === "rating" ? r6.sort((n5, c4) => c4.rating - n5.rating) : lt3(r6, b4(this.c.personalize, true))).slice(0, h5(this.c.results, 8));
      }
      render() {
        const e6 = this.c, a3 = Math.ceil(Math.max(1, ...this.pool.map((n5) => n5.price))), i5 = Math.floor(Math.min(...this.pool.map((n5) => n5.price), a3)), r6 = this.found(), s4 = b4(e6.gift_note, true), o7 = h5(e6.note_max, 160);
        return this.shell(
          b2`
      ${this.hints([this.auto && g2("\u0644\u0645 \u062A\u0636\u0641 \xAB\u0644\u0645\u064A\u0646 \u0627\u0644\u0647\u062F\u064A\u0629\xBB\u061B \u0646\u0639\u0631\u0636 \u0623\u0642\u0633\u0627\u0645 \u0645\u062A\u062C\u0631\u0643 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B. \u0623\u0636\u0641 \u0623\u0634\u062E\u0627\u0635\u0627\u064B \u0648\u0645\u0646\u0627\u0633\u0628\u0627\u062A \u0648\u0627\u0631\u0628\u0637\u0647\u0645 \u0628\u0645\u0646\u062A\u062C\u0627\u062A.", "No recipients yet: using your categories. Add recipients and occasions.")])}
      ${this.pool.length ? b2`<div class="lay"><div class="side">
        <div class="panel"><div class="lbl">${f3(e6.who_label, g2("\u0644\u0645\u064A\u0646 \u0627\u0644\u0647\u062F\u064A\u0629\u061F", "Who is it for?"))}</div><div class="chips">${this.who.map((n5, c4) => b2`<button class="chip ${c4 === this.w ? "on" : ""}" @click=${() => {
            this.w = c4 === this.w ? -1 : c4, st3(n5.label);
          }}>${n5.emoji} ${n5.label}</button>`)}</div></div>
        ${this.occ.length ? b2`<div class="panel"><div class="lbl">${f3(e6.occ_label, g2("\u0648\u0634 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629\u061F", "What is the occasion?"))}</div><div class="chips">${this.occ.map((n5, c4) => b2`<button class="chip ${c4 === this.o ? "on" : ""}" @click=${() => this.o = c4 === this.o ? -1 : c4}>${n5.emoji} ${n5.label}</button>`)}</div></div>` : ""}
        ${b4(e6.show_budget, true) ? b2`<div class="panel"><div class="lbl"><span>${f3(e6.budget_label, g2("\u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629", "Budget"))}</span><span>${g2("\u062D\u062A\u0649", "up to")} ${G4(this.budget)}</span></div>
          <input type="range" min=${i5} max=${a3} step=${Math.max(1, Math.round((a3 - i5) / 40))} .value=${String(this.budget)} @input=${(n5) => this.budget = Number(n5.target.value)} /></div>` : ""}
        ${s4 ? b2`<div class="card" style=${`--gc1:${e6.card_color1 || "#fdf3e3"};--gc2:${e6.card_color2 || "#f4e1c4"}`}><small>${f3(e6.note_title, g2("\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0625\u0647\u062F\u0627\u0621", "Gift card"))}</small>
          <textarea maxlength=${o7} placeholder=${f3(e6.note_placeholder, g2("\u0627\u0643\u062A\u0628 \u0631\u0633\u0627\u0644\u062A\u0643 \u0647\u0646\u0627\u2026 \u0646\u0631\u0641\u0642\u0647\u0627 \u0645\u0639 \u0627\u0644\u0647\u062F\u064A\u0629", "Write your message\u2026 we attach it to the gift"))} .value=${this.note} @input=${(n5) => this.note = n5.target.value}></textarea><small>${this.note.length}/${o7}</small></div>` : ""}
      </div><div>
        <div class="cnt">${g2(`${r6.length} \u0647\u062F\u064A\u0629 \u062A\u0646\u0627\u0633\u0628 \u0627\u062E\u062A\u064A\u0627\u0631\u0643`, `${r6.length} gifts match`)}</div>
        ${r6.length ? b2`<div class="grid" style=${`--cols:${h5(e6.cols, 3)};--mcols:2`}>${r6.map((n5) => b2`<div>${this.card(n5, { quick: false, extra: b2`<button class="btn sm" @click=${() => this.add(n5, 1, s4 && this.note ? `${g2("\u0631\u0633\u0627\u0644\u0629 \u0625\u0647\u062F\u0627\u0621", "Gift message")}: ${this.note}` : void 0)}>${g2("\u0627\u062E\u062A\u0631 \u0643\u0647\u062F\u064A\u0629 \u{1F381}", "Choose as gift \u{1F381}")}</button>` })}</div>`)}</div>` : b2`<div class="panel empty">${g2("\u0645\u0627 \u0641\u064A\u0647 \u0647\u062F\u0627\u064A\u0627 \u0628\u0647\u0630\u064A \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629\u060C \u0632\u0650\u062F \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0634\u0648\u064A.", "No gifts in this budget; raise it a little.")}</div>`}
      </div></div>` : b2`<div class="skel"></div>`}`,
          { eyebrow: g2("\u0645\u062D\u062F\u062F \u0627\u0644\u0647\u062F\u0627\u064A\u0627", "Gift finder"), title: g2("\u0627\u0644\u0647\u062F\u064A\u0629 \u0627\u0644\u0635\u062D\u2026 \u0628\u062B\u0644\u0627\u062B \u0636\u063A\u0637\u0627\u062A", "The right gift in three taps") }
        );
      }
    };
    E3.styles = [k4.base, i`
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
    p3 = E3;
    $4([
      r5()
    ], p3.prototype, "pool");
    $4([
      r5()
    ], p3.prototype, "who");
    $4([
      r5()
    ], p3.prototype, "occ");
    $4([
      r5()
    ], p3.prototype, "w");
    $4([
      r5()
    ], p3.prototype, "o");
    $4([
      r5()
    ], p3.prototype, "budget");
    $4([
      r5()
    ], p3.prototype, "note");
    $4([
      r5()
    ], p3.prototype, "auto");
    typeof p3 < "u" && p3.registerSallaComponent("salla-murshid-gift");
  }
});

// dist/murshid-plan.js
var murshid_plan_exports = {};
__export(murshid_plan_exports, {
  default: () => v3
});
function W4(t3) {
  var d5, u5, p4, x3, i5, c4, $6, R5, F3;
  const e6 = y6(t3 == null ? void 0 : t3.sale_price), r6 = y6((t3 == null ? void 0 : t3.regular_price) ?? (t3 == null ? void 0 : t3.price)), n5 = e6 && e6 < r6 ? e6 : y6(t3 == null ? void 0 : t3.price) || r6, a3 = Math.max(y6(t3 == null ? void 0 : t3.regular_price), y6(t3 == null ? void 0 : t3.price), n5), o7 = (Array.isArray(t3 == null ? void 0 : t3.images) ? t3.images : []).map((S4) => String((S4 == null ? void 0 : S4.url) ?? S4 ?? "")).filter(Boolean), s4 = (t3 == null ? void 0 : t3.sold_quantity) ?? (t3 == null ? void 0 : t3.sold);
  return {
    id: Number(t3 == null ? void 0 : t3.id),
    name: String((t3 == null ? void 0 : t3.name) ?? ""),
    url: String((t3 == null ? void 0 : t3.url) ?? "#"),
    image: String(((d5 = t3 == null ? void 0 : t3.image) == null ? void 0 : d5.url) ?? (t3 == null ? void 0 : t3.main_image) ?? (t3 == null ? void 0 : t3.thumbnail) ?? o7[0] ?? ""),
    images: o7,
    price: n5,
    regular: a3,
    discount: a3 > n5 ? Math.round((1 - n5 / a3) * 100) : 0,
    rating: y6(((u5 = t3 == null ? void 0 : t3.rating) == null ? void 0 : u5.stars) ?? ((p4 = t3 == null ? void 0 : t3.rating) == null ? void 0 : p4.rate) ?? (t3 == null ? void 0 : t3.rating)),
    ratingCount: y6((x3 = t3 == null ? void 0 : t3.rating) == null ? void 0 : x3.count),
    qty: (t3 == null ? void 0 : t3.quantity) == null || t3 != null && t3.unlimited_quantity ? null : y6(t3 == null ? void 0 : t3.quantity),
    available: (t3 == null ? void 0 : t3.is_available) !== false && (t3 == null ? void 0 : t3.status) !== "out" && !((t3 == null ? void 0 : t3.quantity) === 0 && !(t3 != null && t3.unlimited_quantity)),
    sold: s4 == null || s4 === "" || !Number.isFinite(Number(s4)) ? null : Number(s4),
    endsAt: tt3((t3 == null ? void 0 : t3.discount_ends) ?? (t3 == null ? void 0 : t3.sale_end) ?? (t3 == null ? void 0 : t3.discount_end)),
    category: String(((i5 = t3 == null ? void 0 : t3.category) == null ? void 0 : i5.name) ?? (($6 = (c4 = t3 == null ? void 0 : t3.categories) == null ? void 0 : c4[0]) == null ? void 0 : $6.name) ?? ""),
    brand: String(((R5 = t3 == null ? void 0 : t3.brand) == null ? void 0 : R5.name) ?? ""),
    promo: String(((F3 = t3 == null ? void 0 : t3.promotion) == null ? void 0 : F3.title) ?? (t3 == null ? void 0 : t3.promotion_title) ?? "")
  };
}
async function et3(t3) {
  var n5, a3, o7;
  const e6 = (n5 = m4()) == null ? void 0 : n5.product;
  if (!e6) return null;
  const r6 = e6.getDetails ? e6.getDetails.bind(e6) : (o7 = (a3 = e6.api) == null ? void 0 : a3.getDetails) == null ? void 0 : o7.bind(e6.api);
  if (!r6) return null;
  try {
    const s4 = await r6(t3, ["images", "sold_quantity", "category"]), d5 = W4((s4 == null ? void 0 : s4.data) ?? s4);
    return d5.name ? d5 : null;
  } catch {
    return null;
  }
}
async function H5(t3) {
  await E5();
  const e6 = "ids:" + t3.join(",");
  return k5.has(e6) || k5.set(e6, Promise.all(t3.map(et3)).then((r6) => r6.filter((n5) => !!n5))), k5.get(e6);
}
async function q2(t3, e6 = [], r6 = 12) {
  await E5();
  const n5 = `src:${t3}:${e6.join(",")}:${r6}`;
  return k5.has(n5) || k5.set(n5, (async () => {
    var s4, d5, u5, p4;
    const a3 = (s4 = m4()) == null ? void 0 : s4.product, o7 = a3 != null && a3.fetch ? a3.fetch.bind(a3) : (u5 = (d5 = a3 == null ? void 0 : a3.api) == null ? void 0 : d5.fetch) == null ? void 0 : u5.bind(a3.api);
    if (!o7) return [];
    try {
      const x3 = { source: t3, per_page: r6 };
      e6.length && (x3.source_value = e6);
      const i5 = await o7(x3);
      return (Array.isArray(i5 == null ? void 0 : i5.data) ? i5.data : Array.isArray(i5) ? i5 : ((p4 = i5 == null ? void 0 : i5.data) == null ? void 0 : p4.products) ?? []).map(W4).filter(($6) => $6.name).slice(0, r6);
    } catch {
      return [];
    }
  })()), k5.get(n5);
}
async function rt3(t3, e6 = "best_selling", r6 = 12) {
  const n5 = Y4(t3);
  if (n5.length) return { items: (await H5(n5)).slice(0, r6), auto: false };
  let a3 = await q2(e6, [], r6);
  return !a3.length && e6 !== "latest" && (a3 = await q2("latest", [], r6)), { items: a3, auto: true };
}
async function J4(t3, e6 = 1, r6) {
  var n5, a3, o7;
  await E5();
  try {
    return await ((o7 = (a3 = (n5 = m4()) == null ? void 0 : n5.cart) == null ? void 0 : a3.addItem) == null ? void 0 : o7.call(a3, r6 ? { id: t3, quantity: e6, notes: r6 } : { id: t3, quantity: e6 })), true;
  } catch {
    return false;
  }
}
function U3(t3, e6 = true) {
  var r6, n5, a3;
  try {
    (a3 = e6 ? (r6 = m4()) == null ? void 0 : r6.success : (n5 = m4()) == null ? void 0 : n5.error) == null || a3(t3);
  } catch {
  }
}
function K2() {
  try {
    return { ...L6(), ...JSON.parse(localStorage.getItem(z5) || "{}") };
  } catch {
    return L6();
  }
}
function nt4(t3) {
  try {
    localStorage.setItem(z5, JSON.stringify(t3));
  } catch {
  }
}
function D5(t3) {
  const e6 = K2();
  return t3(e6), nt4(e6), e6;
}
function it4() {
  let t3 = false;
  try {
    t3 = !sessionStorage.getItem(z5), sessionStorage.setItem(z5, "1");
  } catch {
  }
  return t3 ? D5((e6) => {
    e6.visits += 1, e6.last = Date.now();
  }) : K2();
}
function ot4() {
  M4 || (M4 = true, at4("cart::item.added", (t3) => {
    var r6;
    const e6 = Number(((r6 = t3 == null ? void 0 : t3.data) == null ? void 0 : r6.product_id) ?? 0);
    e6 && D5((n5) => {
      n5.carted.includes(e6) || (n5.carted = [...n5.carted.slice(-40), e6]);
    });
  }));
}
function pt4(t3) {
  const e6 = ut4[t3];
  if (!e6 || O5.has(e6)) return e6;
  O5.add(e6);
  const r6 = document.createElement("link");
  return r6.rel = "stylesheet", r6.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e6)}:wght@400;500;700;800&display=swap`, document.head.appendChild(r6), e6;
}
var m4, E5, T3, V4, g3, f4, w3, h6, b5, Z4, y6, tt3, Y4, k5, N4, at4, z5, L6, j3, st4, M4, ct4, lt4, dt4, gt4, ut4, O5, ht4, ft4, G5, _5, bt4, C4, I4, v3;
var init_murshid_plan = __esm({
  "dist/murshid-plan.js"() {
    "use strict";
    init_lit();
    init_decorators();
    m4 = () => window.salla ?? window.Salla;
    E5 = async () => {
      var t3, e6;
      try {
        await ((e6 = (t3 = m4()) == null ? void 0 : t3.onReady) == null ? void 0 : e6.call(t3));
      } catch {
      }
    };
    T3 = () => {
      var t3, e6, r6, n5, a3;
      try {
        const o7 = ((e6 = (t3 = m4()) == null ? void 0 : t3.lang) == null ? void 0 : e6.locale) ?? ((a3 = (n5 = (r6 = m4()) == null ? void 0 : r6.config) == null ? void 0 : n5.get) == null ? void 0 : a3.call(n5, "user.language_code"));
        if (typeof o7 == "string" && o7) return o7.slice(0, 2);
      } catch {
      }
      return (document.documentElement.lang || "ar").slice(0, 2);
    };
    V4 = () => T3() === "en";
    g3 = (t3, e6) => V4() ? e6 : t3;
    f4 = (t3, e6 = "") => {
      if (t3 == null) return e6;
      if (typeof t3 == "string") {
        const r6 = t3.trim();
        if (r6.startsWith("{") && r6.endsWith("}"))
          try {
            return f4(JSON.parse(r6), e6);
          } catch {
          }
        return r6 || e6;
      }
      if (typeof t3 == "number" || typeof t3 == "boolean") return String(t3);
      if (typeof t3 == "object") {
        const r6 = t3, n5 = r6[T3()] ?? r6.ar ?? r6.en ?? Object.values(r6).find((a3) => typeof a3 == "string" && a3);
        return typeof n5 == "string" && n5.trim() ? n5 : e6;
      }
      return e6;
    };
    w3 = (t3, e6 = "") => {
      const r6 = Array.isArray(t3) ? t3[0] : t3, n5 = typeof r6 == "object" && r6 ? r6.value : r6;
      return n5 == null || n5 === "" ? e6 : String(n5);
    };
    h6 = (t3, e6 = 0) => {
      const r6 = Number(t3);
      return t3 === "" || t3 == null || !Number.isFinite(r6) ? e6 : r6;
    };
    b5 = (t3, e6 = false) => t3 == null || t3 === "" ? e6 : t3 === true || t3 === "true" || t3 === 1 || t3 === "1";
    Z4 = (t3) => Array.isArray(t3) ? t3 : [];
    y6 = (t3) => {
      const e6 = typeof t3 == "object" && t3 ? t3.amount : t3, r6 = Number(e6);
      return Number.isFinite(r6) ? r6 : 0;
    };
    tt3 = (t3) => {
      if (!t3) return null;
      const e6 = typeof t3 == "number" ? t3 < 1e12 ? t3 * 1e3 : t3 : Date.parse(String(t3).replace(" ", "T"));
      return Number.isFinite(e6) && e6 > Date.now() ? e6 : null;
    };
    Y4 = (t3) => (Array.isArray(t3) ? t3 : []).map((e6) => Number(typeof e6 == "object" && e6 ? e6.value : e6)).filter((e6) => Number.isFinite(e6) && e6 > 0);
    k5 = /* @__PURE__ */ new Map();
    N4 = (t3) => {
      var e6, r6;
      try {
        const n5 = (r6 = (e6 = m4()) == null ? void 0 : e6.money) == null ? void 0 : r6.call(e6, t3);
        if (n5) return String(n5);
      } catch {
      }
      return `${Math.round(t3 * 100) / 100} ${g3("\u0631.\u0633", "SAR")}`;
    };
    at4 = (t3, e6) => {
      var r6, n5, a3;
      try {
        (a3 = (n5 = (r6 = m4()) == null ? void 0 : r6.event) == null ? void 0 : n5.on) == null || a3.call(n5, t3, e6);
      } catch {
      }
    };
    z5 = "tw_smart_mem_v1";
    L6 = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
    j3 = (t3, e6 = 1) => D5((r6) => {
      r6.seen[t3.id] = (r6.seen[t3.id] || 0) + e6, r6.prices = [...r6.prices.slice(-29), t3.price], t3.category && (r6.tags[t3.category] = (r6.tags[t3.category] || 0) + e6);
    });
    st4 = (t3, e6 = 1) => t3 && D5((r6) => {
      r6.tags[t3] = (r6.tags[t3] || 0) + e6;
    });
    M4 = false;
    ct4 = () => {
      const t3 = innerWidth, e6 = navigator.userAgent;
      return /iPad|Tablet/i.test(e6) || t3 >= 700 && t3 < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e6) || t3 < 700 ? "mobile" : "desktop";
    };
    lt4 = () => {
      try {
        return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
      } catch {
        return true;
      }
    };
    dt4 = Object.defineProperty;
    gt4 = (t3, e6, r6, n5) => {
      for (var a3 = void 0, o7 = t3.length - 1, s4; o7 >= 0; o7--)
        (s4 = t3[o7]) && (a3 = s4(e6, r6, a3) || a3);
      return a3 && dt4(e6, r6, a3), a3;
    };
    ut4 = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" };
    O5 = /* @__PURE__ */ new Set();
    ht4 = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" };
    ft4 = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"];
    G5 = class G6 extends i4 {
      get c() {
        return this.config ?? {};
      }
      connectedCallback() {
        super.connectedCallback(), ot4(), it4();
      }
      firstUpdated() {
        if (!("IntersectionObserver" in window)) {
          this.setAttribute("in", "");
          return;
        }
        this.io = new IntersectionObserver((e6) => {
          var r6;
          e6.some((n5) => n5.isIntersecting) && (this.setAttribute("in", ""), (r6 = this.io) == null || r6.disconnect());
        }, { threshold: 0.12 }), this.io.observe(this);
      }
      disconnectedCallback() {
        var e6;
        super.disconnectedCallback(), (e6 = this.io) == null || e6.disconnect();
      }
      /** Hidden by the merchant's schedule or device rule? */
      hiddenNow() {
        const e6 = this.c, r6 = Date.now(), n5 = Date.parse(String(e6.s_from || "")), a3 = Date.parse(String(e6.s_to || ""));
        if (Number.isFinite(n5) && r6 < n5 || Number.isFinite(a3) && r6 > a3) return true;
        const o7 = ct4();
        return !!(b5(e6.s_hide_mobile) && o7 === "mobile" || b5(e6.s_hide_desktop) && o7 !== "mobile");
      }
      vars(e6 = "") {
        const r6 = this.c, n5 = [], a3 = (s4, d5) => {
          d5 !== "" && d5 != null && n5.push(`${s4}:${d5}`);
        };
        a3("--a", r6.s_accent || ""), a3("--a2", r6.s_accent2 || ""), a3("--bgc", r6.s_bg || ""), a3("--fgc", r6.s_text || ""), a3("--cardc", r6.s_card || ""), a3("--r", `${h6(r6.s_radius, 22)}px`), a3("--gap", `${h6(r6.s_gap, 18)}px`), a3("--ts", `${h6(r6.s_title_size, 38)}px`), a3("--fs", `${h6(r6.s_text_size, 16)}px`), a3("--pt", `${h6(r6.s_pad_top, 56)}px`), a3("--pb", `${h6(r6.s_pad_bottom, 56)}px`), a3("--maxw", ht4[w3(r6.s_width, "normal")] ?? "1240px"), a3("--sh", ft4[Math.max(0, Math.min(5, h6(r6.s_shadow, 2)))]), a3("--ms", `${h6(r6.s_anim_ms, 700)}ms`), a3("--ov", String(h6(r6.s_overlay, 45) / 100)), r6.s_bg_image && a3("--bgimg", `url("${String(r6.s_bg_image)}")`);
        const o7 = pt4(w3(r6.s_font, "inherit"));
        return o7 && a3("font-family", `'${o7}', inherit`), n5.join(";") + (e6 ? ";" + e6 : "");
      }
      cls() {
        const e6 = this.c;
        return [
          "sec",
          `th-${w3(e6.s_theme, "auto")}`,
          `al-${w3(e6.s_align, "start")}`,
          `an-${w3(e6.s_anim, "rise")}`,
          `pt-${w3(e6.s_pattern, "none")}`,
          `bs-${w3(e6.s_btn_style, "pill")}`,
          b5(e6.s_border) ? "bordered" : "",
          b5(e6.s_stagger, true) ? "stagger" : "",
          e6.s_bg_image ? "has-img" : ""
        ].join(" ");
      }
      /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
      shell(e6, r6 = {}, n5 = "", a3 = "", o7 = true) {
        if (this.hiddenNow()) return A;
        const s4 = this.c, d5 = f4(s4.eyebrow, r6.eyebrow ?? ""), u5 = f4(s4.title, r6.title ?? ""), p4 = f4(s4.subtitle, r6.sub ?? ""), x3 = o7 && b5(s4.s_show_head, true) && (d5 || u5 || p4);
        return b2`<section class="${this.cls()} ${n5}" style=${this.vars(a3)} id=${String(s4.s_anchor || "") || A}>
      <div class="wrap">${x3 ? b2`<header class="head">${d5 ? b2`<span class="eyebrow">${d5}</span>` : ""}${u5 ? b2`<h2 class="title">${u5}</h2>` : ""}${p4 ? b2`<p class="sub">${p4}</p>` : ""}</header>` : ""}
      ${e6}</div></section>`;
      }
      /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
      hints(e6) {
        const r6 = e6.filter(Boolean);
        return !r6.length || !lt4() || !b5(this.c.s_hints, true) ? "" : b2`<aside class="hints" role="note"><b>💡 ${g3("\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F (\u064A\u0638\u0647\u0631 \u0644\u0643 \u0641\u0642\u0637)", "Setup assistant (only you see this)")}</b><ul>${r6.map((n5) => b2`<li>${n5}</li>`)}</ul></aside>`;
      }
      card(e6, r6 = {}) {
        var n5;
        return b2`<article class="pc ${e6.available ? "" : "oos"}">
      <a class="ph" href=${e6.url} @click=${() => j3(e6)}><img src=${e6.image} alt=${e6.name} loading="lazy" />${(n5 = r6.badges) != null && n5.length ? b2`<span class="badges">${r6.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e6.url} @click=${() => j3(e6)}>${e6.name}</a>
        <div class="pr"><b>${N4(e6.price)}</b>${e6.regular > e6.price ? b2`<s>${N4(e6.regular)}</s>` : ""}</div>
        ${r6.rating !== false && e6.rating > 0 ? b2`<div class="rt">★ ${e6.rating.toFixed(1)}${e6.ratingCount ? b2` <small>(${e6.ratingCount})</small>` : ""}</div>` : ""}
        ${r6.extra ?? ""}
        ${r6.quick !== false ? b2`<button class="btn sm" ?disabled=${!e6.available} @click=${() => this.add(e6)}>${e6.available ? g3("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart") : g3("\u0646\u0641\u062F\u062A \u0627\u0644\u0643\u0645\u064A\u0629", "Sold out")}</button>` : ""}
      </div></article>`;
      }
      async add(e6, r6 = 1, n5) {
        j3(e6, 3), await J4(e6.id, r6, n5) ? U3(g3("\u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629", "Added to cart")) : location.href = e6.url;
      }
    };
    G5.base = i`
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
    _5 = G5;
    gt4([
      n4({ type: Object })
    ], _5.prototype, "config");
    bt4 = Object.defineProperty;
    C4 = (t3, e6, r6, n5) => {
      for (var a3 = void 0, o7 = t3.length - 1, s4; o7 >= 0; o7--)
        (s4 = t3[o7]) && (a3 = s4(e6, r6, a3) || a3);
      return a3 && bt4(e6, r6, a3), a3;
    };
    I4 = class I5 extends _5 {
      constructor() {
        super(...arguments), this.needs = [], this.on = [], this.pool = [], this.auto = false, this.skip = [], this.seq = 0;
      }
      willUpdate(e6) {
        e6.has("config") && this.load();
      }
      async load() {
        const e6 = ++this.seq, r6 = this.c;
        let n5 = Z4(r6.needs).map((s4) => ({ label: f4(s4.label), emoji: f4(s4.emoji, "\u2728"), desc: f4(s4.desc), tip: f4(s4.tip), prods: Y4(s4.products), cat: "" })).filter((s4) => s4.label), a3 = n5.length ? await H5([...new Set(n5.flatMap((s4) => s4.prods))]) : [], o7 = false;
        n5.length || (o7 = true, a3 = (await rt3(r6.products, w3(r6.auto_source, "best_selling"), 24)).items, n5 = [...new Set(a3.map((s4) => s4.category).filter(Boolean))].slice(0, 8).map((s4) => ({ label: s4, emoji: "\u2728", desc: "", tip: "", prods: [], cat: s4 }))), e6 === this.seq && (this.needs = n5, this.pool = a3.filter((s4) => s4.available || !b5(r6.hide_oos, true)), this.auto = o7, this.on = b5(r6.preselect_first, false) && n5.length ? [0] : []);
      }
      render() {
        const e6 = this.c, r6 = this.needs, n5 = (i5) => this.on.filter((c4) => r6[c4].cat ? i5.category === r6[c4].cat : r6[c4].prods.includes(i5.id)), a3 = this.pool.map((i5) => ({ p: i5, cv: n5(i5) })).filter((i5) => i5.cv.length).sort((i5, c4) => c4.cv.length - i5.cv.length || c4.p.rating - i5.p.rating), o7 = h6(e6.per_need, 2), s4 = [], d5 = /* @__PURE__ */ new Map();
        for (const i5 of a3)
          i5.cv.some((c4) => (d5.get(c4) ?? 0) < o7) && (s4.push(i5), i5.cv.forEach((c4) => d5.set(c4, (d5.get(c4) ?? 0) + 1)));
        const u5 = s4.filter((i5) => !this.skip.includes(i5.p.id)), p4 = u5.reduce((i5, c4) => i5 + c4.p.price, 0), x3 = async () => {
          for (const i5 of u5) i5.p.available && await J4(i5.p.id);
          U3(g3("\u0623\u0636\u0641\u0646\u0627 \u062E\u0637\u062A\u0643 \u0644\u0644\u0633\u0644\u0629", "Your plan was added to the cart"));
        };
        return this.shell(
          b2`${this.hints([this.auto && g3("\u0644\u0645 \u062A\u0636\u0641 \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A\u061B \u0646\u0639\u0631\u0636 \u0623\u0642\u0633\u0627\u0645 \u0645\u062A\u062C\u0631\u0643 \u0643\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.", "No needs yet: using your categories.")])}
      <div class="needs">${r6.map((i5, c4) => b2`<button class="n ${this.on.includes(c4) ? "on" : ""}" @click=${() => {
            this.on = this.on.includes(c4) ? this.on.filter(($6) => $6 !== c4) : [...this.on, c4], st4(i5.label, 2);
          }}><span class="e">${i5.emoji}</span><b>${i5.label}</b>${i5.desc ? b2`<small>${i5.desc}</small>` : ""}</button>`)}</div>
      ${this.on.length ? b2`<div class="steps">${s4.map((i5) => b2`<div class="st ${this.skip.includes(i5.p.id) ? "off" : ""}">
          <img src=${i5.p.image} alt="" loading="lazy" /><div><a href=${i5.p.url}>${i5.p.name}</a> · <b style="color:var(--A)">${N4(i5.p.price)}</b>
          ${b5(e6.show_covers, true) ? b2`<div class="covers">${i5.cv.map((c4) => b2`<span>${r6[c4].emoji} ${r6[c4].label}</span>`)}${i5.cv.length > 1 ? b2`<span>⭐ ${g3(`\u064A\u063A\u0637\u064A ${i5.cv.length} \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A`, `covers ${i5.cv.length} needs`)}</span>` : ""}</div>` : ""}
          ${b5(e6.show_tips, true) && r6[i5.cv[0]].tip ? b2`<div class="tip">💡 ${r6[i5.cv[0]].tip}</div>` : ""}</div>
          <button class="chip x" @click=${() => this.skip = this.skip.includes(i5.p.id) ? this.skip.filter((c4) => c4 !== i5.p.id) : [...this.skip, i5.p.id]}>${this.skip.includes(i5.p.id) ? g3("\u0623\u0631\u062C\u0639\u0647", "Restore") : g3("\u0639\u0646\u062F\u064A", "I have it")}</button></div>`)}</div>
        <div class="tot panel"><div>${g3("\u0645\u062C\u0645\u0648\u0639 \u062E\u0637\u062A\u0643", "Plan total")} · ${u5.length} ${g3("\u0645\u0646\u062A\u062C", "items")}<br /><b>${N4(p4)}</b></div><button class="btn" ?disabled=${!u5.length} @click=${x3}>${f4(e6.button, g3("\u0623\u0636\u0641 \u0627\u0644\u062E\u0637\u0629 \u0643\u0627\u0645\u0644\u0629 \u0644\u0644\u0633\u0644\u0629", "Add the whole plan"))}</button></div>` : b2`<p class="muted center">${f4(e6.empty_text, g3("\u0627\u062E\u062A\u0631 \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A\u0643 \u0648\u062A\u0637\u0644\u0639 \u0644\u0643 \u062E\u0637\u0629 \u0645\u062A\u0643\u0627\u0645\u0644\u0629 \u0645\u0646 \u0645\u0646\u062A\u062C\u0627\u062A\u0646\u0627 \u{1F446}", "Pick your needs to get a complete plan \u{1F446}"))}</p>`}`,
          { eyebrow: g3("\u062E\u0637\u062A\u0643", "Your plan"), title: g3("\u0648\u0634 \u062A\u062D\u062A\u0627\u062C\u061F \u0646\u0631\u062A\u0651\u0628\u0647\u0627 \u0644\u0643 \u062E\u0637\u0648\u0629 \u0628\u062E\u0637\u0648\u0629", "What do you need? We plan it step by step") }
        );
      }
    };
    I4.styles = [_5.base, i`
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
    v3 = I4;
    C4([
      r5()
    ], v3.prototype, "needs");
    C4([
      r5()
    ], v3.prototype, "on");
    C4([
      r5()
    ], v3.prototype, "pool");
    C4([
      r5()
    ], v3.prototype, "auto");
    C4([
      r5()
    ], v3.prototype, "skip");
    typeof v3 < "u" && v3.registerSallaComponent("salla-murshid-plan");
  }
});

// dist/murshid-size.js
var murshid_size_exports = {};
__export(murshid_size_exports, {
  default: () => b6
});
async function P5(r6, t3 = 1, e6) {
  var i5, a3, s4;
  await B6();
  try {
    return await ((s4 = (a3 = (i5 = u4()) == null ? void 0 : i5.cart) == null ? void 0 : a3.addItem) == null ? void 0 : s4.call(a3, e6 ? { id: r6, quantity: t3, notes: e6 } : { id: r6, quantity: t3 })), true;
  } catch {
    return false;
  }
}
function W5(r6, t3 = true) {
  var e6, i5, a3;
  try {
    (a3 = t3 ? (e6 = u4()) == null ? void 0 : e6.success : (i5 = u4()) == null ? void 0 : i5.error) == null || a3(r6);
  } catch {
  }
}
function z6() {
  try {
    return { ...E6(), ...JSON.parse(localStorage.getItem(v4) || "{}") };
  } catch {
    return E6();
  }
}
function Y5(r6) {
  try {
    localStorage.setItem(v4, JSON.stringify(r6));
  } catch {
  }
}
function $5(r6) {
  const t3 = z6();
  return r6(t3), Y5(t3), t3;
}
function T4() {
  let r6 = false;
  try {
    r6 = !sessionStorage.getItem(v4), sessionStorage.setItem(v4, "1");
  } catch {
  }
  return r6 ? $5((t3) => {
    t3.visits += 1, t3.last = Date.now();
  }) : z6();
}
function q3() {
  G7 || (G7 = true, H6("cart::item.added", (r6) => {
    var e6;
    const t3 = Number(((e6 = r6 == null ? void 0 : r6.data) == null ? void 0 : e6.product_id) ?? 0);
    t3 && $5((i5) => {
      i5.carted.includes(t3) || (i5.carted = [...i5.carted.slice(-40), t3]);
    });
  }));
}
function V5(r6) {
  const t3 = Q4[r6];
  if (!t3 || I6.has(t3)) return t3;
  I6.add(t3);
  const e6 = document.createElement("link");
  return e6.rel = "stylesheet", e6.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(t3)}:wght@400;500;700;800&display=swap`, document.head.appendChild(e6), t3;
}
var u4, B6, R4, j4, o6, h7, x2, d4, f5, O6, N5, H6, v4, E6, k6, A5, G7, J5, U4, K3, X3, Q4, I6, Z5, tt4, M5, w4, et4, _6, C5, b6;
var init_murshid_size = __esm({
  "dist/murshid-size.js"() {
    "use strict";
    init_lit();
    init_decorators();
    u4 = () => window.salla ?? window.Salla;
    B6 = async () => {
      var r6, t3;
      try {
        await ((t3 = (r6 = u4()) == null ? void 0 : r6.onReady) == null ? void 0 : t3.call(r6));
      } catch {
      }
    };
    R4 = () => {
      var r6, t3, e6, i5, a3;
      try {
        const s4 = ((t3 = (r6 = u4()) == null ? void 0 : r6.lang) == null ? void 0 : t3.locale) ?? ((a3 = (i5 = (e6 = u4()) == null ? void 0 : e6.config) == null ? void 0 : i5.get) == null ? void 0 : a3.call(i5, "user.language_code"));
        if (typeof s4 == "string" && s4) return s4.slice(0, 2);
      } catch {
      }
      return (document.documentElement.lang || "ar").slice(0, 2);
    };
    j4 = () => R4() === "en";
    o6 = (r6, t3) => j4() ? t3 : r6;
    h7 = (r6, t3 = "") => {
      if (r6 == null) return t3;
      if (typeof r6 == "string") {
        const e6 = r6.trim();
        if (e6.startsWith("{") && e6.endsWith("}"))
          try {
            return h7(JSON.parse(e6), t3);
          } catch {
          }
        return e6 || t3;
      }
      if (typeof r6 == "number" || typeof r6 == "boolean") return String(r6);
      if (typeof r6 == "object") {
        const e6 = r6, i5 = e6[R4()] ?? e6.ar ?? e6.en ?? Object.values(e6).find((a3) => typeof a3 == "string" && a3);
        return typeof i5 == "string" && i5.trim() ? i5 : t3;
      }
      return t3;
    };
    x2 = (r6, t3 = "") => {
      const e6 = Array.isArray(r6) ? r6[0] : r6, i5 = typeof e6 == "object" && e6 ? e6.value : e6;
      return i5 == null || i5 === "" ? t3 : String(i5);
    };
    d4 = (r6, t3 = 0) => {
      const e6 = Number(r6);
      return r6 === "" || r6 == null || !Number.isFinite(e6) ? t3 : e6;
    };
    f5 = (r6, t3 = false) => r6 == null || r6 === "" ? t3 : r6 === true || r6 === "true" || r6 === 1 || r6 === "1";
    O6 = (r6) => Array.isArray(r6) ? r6 : [];
    N5 = (r6) => {
      var t3, e6;
      try {
        const i5 = (e6 = (t3 = u4()) == null ? void 0 : t3.money) == null ? void 0 : e6.call(t3, r6);
        if (i5) return String(i5);
      } catch {
      }
      return `${Math.round(r6 * 100) / 100} ${o6("\u0631.\u0633", "SAR")}`;
    };
    H6 = (r6, t3) => {
      var e6, i5, a3;
      try {
        (a3 = (i5 = (e6 = u4()) == null ? void 0 : e6.event) == null ? void 0 : i5.on) == null || a3.call(i5, r6, t3);
      } catch {
      }
    };
    v4 = "tw_smart_mem_v1";
    E6 = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
    k6 = (r6, t3 = 1) => $5((e6) => {
      e6.seen[r6.id] = (e6.seen[r6.id] || 0) + t3, e6.prices = [...e6.prices.slice(-29), r6.price], r6.category && (e6.tags[r6.category] = (e6.tags[r6.category] || 0) + t3);
    });
    A5 = (r6, t3) => $5((e6) => {
      e6.answers[r6] = t3;
    });
    G7 = false;
    J5 = () => {
      const r6 = innerWidth, t3 = navigator.userAgent;
      return /iPad|Tablet/i.test(t3) || r6 >= 700 && r6 < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(t3) || r6 < 700 ? "mobile" : "desktop";
    };
    U4 = () => {
      try {
        return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
      } catch {
        return true;
      }
    };
    K3 = Object.defineProperty;
    X3 = (r6, t3, e6, i5) => {
      for (var a3 = void 0, s4 = r6.length - 1, l4; s4 >= 0; s4--)
        (l4 = r6[s4]) && (a3 = l4(t3, e6, a3) || a3);
      return a3 && K3(t3, e6, a3), a3;
    };
    Q4 = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" };
    I6 = /* @__PURE__ */ new Set();
    Z5 = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" };
    tt4 = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"];
    M5 = class M6 extends i4 {
      get c() {
        return this.config ?? {};
      }
      connectedCallback() {
        super.connectedCallback(), q3(), T4();
      }
      firstUpdated() {
        if (!("IntersectionObserver" in window)) {
          this.setAttribute("in", "");
          return;
        }
        this.io = new IntersectionObserver((t3) => {
          var e6;
          t3.some((i5) => i5.isIntersecting) && (this.setAttribute("in", ""), (e6 = this.io) == null || e6.disconnect());
        }, { threshold: 0.12 }), this.io.observe(this);
      }
      disconnectedCallback() {
        var t3;
        super.disconnectedCallback(), (t3 = this.io) == null || t3.disconnect();
      }
      /** Hidden by the merchant's schedule or device rule? */
      hiddenNow() {
        const t3 = this.c, e6 = Date.now(), i5 = Date.parse(String(t3.s_from || "")), a3 = Date.parse(String(t3.s_to || ""));
        if (Number.isFinite(i5) && e6 < i5 || Number.isFinite(a3) && e6 > a3) return true;
        const s4 = J5();
        return !!(f5(t3.s_hide_mobile) && s4 === "mobile" || f5(t3.s_hide_desktop) && s4 !== "mobile");
      }
      vars(t3 = "") {
        const e6 = this.c, i5 = [], a3 = (l4, c4) => {
          c4 !== "" && c4 != null && i5.push(`${l4}:${c4}`);
        };
        a3("--a", e6.s_accent || ""), a3("--a2", e6.s_accent2 || ""), a3("--bgc", e6.s_bg || ""), a3("--fgc", e6.s_text || ""), a3("--cardc", e6.s_card || ""), a3("--r", `${d4(e6.s_radius, 22)}px`), a3("--gap", `${d4(e6.s_gap, 18)}px`), a3("--ts", `${d4(e6.s_title_size, 38)}px`), a3("--fs", `${d4(e6.s_text_size, 16)}px`), a3("--pt", `${d4(e6.s_pad_top, 56)}px`), a3("--pb", `${d4(e6.s_pad_bottom, 56)}px`), a3("--maxw", Z5[x2(e6.s_width, "normal")] ?? "1240px"), a3("--sh", tt4[Math.max(0, Math.min(5, d4(e6.s_shadow, 2)))]), a3("--ms", `${d4(e6.s_anim_ms, 700)}ms`), a3("--ov", String(d4(e6.s_overlay, 45) / 100)), e6.s_bg_image && a3("--bgimg", `url("${String(e6.s_bg_image)}")`);
        const s4 = V5(x2(e6.s_font, "inherit"));
        return s4 && a3("font-family", `'${s4}', inherit`), i5.join(";") + (t3 ? ";" + t3 : "");
      }
      cls() {
        const t3 = this.c;
        return [
          "sec",
          `th-${x2(t3.s_theme, "auto")}`,
          `al-${x2(t3.s_align, "start")}`,
          `an-${x2(t3.s_anim, "rise")}`,
          `pt-${x2(t3.s_pattern, "none")}`,
          `bs-${x2(t3.s_btn_style, "pill")}`,
          f5(t3.s_border) ? "bordered" : "",
          f5(t3.s_stagger, true) ? "stagger" : "",
          t3.s_bg_image ? "has-img" : ""
        ].join(" ");
      }
      /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
      shell(t3, e6 = {}, i5 = "", a3 = "", s4 = true) {
        if (this.hiddenNow()) return A;
        const l4 = this.c, c4 = h7(l4.eyebrow, e6.eyebrow ?? ""), g4 = h7(l4.title, e6.title ?? ""), p4 = h7(l4.subtitle, e6.sub ?? ""), m5 = s4 && f5(l4.s_show_head, true) && (c4 || g4 || p4);
        return b2`<section class="${this.cls()} ${i5}" style=${this.vars(a3)} id=${String(l4.s_anchor || "") || A}>
      <div class="wrap">${m5 ? b2`<header class="head">${c4 ? b2`<span class="eyebrow">${c4}</span>` : ""}${g4 ? b2`<h2 class="title">${g4}</h2>` : ""}${p4 ? b2`<p class="sub">${p4}</p>` : ""}</header>` : ""}
      ${t3}</div></section>`;
      }
      /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
      hints(t3) {
        const e6 = t3.filter(Boolean);
        return !e6.length || !U4() || !f5(this.c.s_hints, true) ? "" : b2`<aside class="hints" role="note"><b>💡 ${o6("\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F (\u064A\u0638\u0647\u0631 \u0644\u0643 \u0641\u0642\u0637)", "Setup assistant (only you see this)")}</b><ul>${e6.map((i5) => b2`<li>${i5}</li>`)}</ul></aside>`;
      }
      card(t3, e6 = {}) {
        var i5;
        return b2`<article class="pc ${t3.available ? "" : "oos"}">
      <a class="ph" href=${t3.url} @click=${() => k6(t3)}><img src=${t3.image} alt=${t3.name} loading="lazy" />${(i5 = e6.badges) != null && i5.length ? b2`<span class="badges">${e6.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${t3.url} @click=${() => k6(t3)}>${t3.name}</a>
        <div class="pr"><b>${N5(t3.price)}</b>${t3.regular > t3.price ? b2`<s>${N5(t3.regular)}</s>` : ""}</div>
        ${e6.rating !== false && t3.rating > 0 ? b2`<div class="rt">★ ${t3.rating.toFixed(1)}${t3.ratingCount ? b2` <small>(${t3.ratingCount})</small>` : ""}</div>` : ""}
        ${e6.extra ?? ""}
        ${e6.quick !== false ? b2`<button class="btn sm" ?disabled=${!t3.available} @click=${() => this.add(t3)}>${t3.available ? o6("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart") : o6("\u0646\u0641\u062F\u062A \u0627\u0644\u0643\u0645\u064A\u0629", "Sold out")}</button>` : ""}
      </div></article>`;
      }
      async add(t3, e6 = 1, i5) {
        k6(t3, 3), await P5(t3.id, e6, i5) ? W5(o6("\u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629", "Added to cart")) : location.href = t3.url;
      }
    };
    M5.base = i`
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
    w4 = M5;
    X3([
      n4({ type: Object })
    ], w4.prototype, "config");
    et4 = Object.defineProperty;
    _6 = (r6, t3, e6, i5) => {
      for (var a3 = void 0, s4 = r6.length - 1, l4; s4 >= 0; s4--)
        (l4 = r6[s4]) && (a3 = l4(t3, e6, a3) || a3);
      return a3 && et4(t3, e6, a3), a3;
    };
    C5 = class C6 extends w4 {
      constructor() {
        super(...arguments), this.h = 160, this.w = 60, this.fit = "regular", this.done = false;
      }
      willUpdate(t3) {
        if (!t3.has("config")) return;
        const e6 = z6().answers;
        f5(this.c.remember, true) && e6.size_h ? (this.h = Number(e6.size_h), this.w = Number(e6.size_w), this.fit = e6.size_fit || "regular", this.done = true) : (this.h = d4(this.c.default_h, 160), this.w = d4(this.c.default_w, 62));
      }
      rows() {
        return O6(this.c.chart).map((t3) => ({ size: h7(t3.size), hMin: d4(t3.h_min), hMax: d4(t3.h_max, 999), wMin: d4(t3.w_min), wMax: d4(t3.w_max, 999), length: h7(t3.length), note: h7(t3.note) })).filter((t3) => t3.size);
      }
      calc(t3) {
        if (!t3.length) return null;
        const e6 = (p4) => {
          const m5 = this.h < p4.hMin ? p4.hMin - this.h : this.h > p4.hMax ? this.h - p4.hMax : 0;
          return (this.w < p4.wMin ? p4.wMin - this.w : this.w > p4.wMax ? this.w - p4.wMax : 0) * d4(this.c.weight_importance, 60) / 50 + m5 * (100 - d4(this.c.weight_importance, 60)) / 50;
        };
        let i5 = t3.map((p4, m5) => ({ k: m5, d: e6(p4) })).sort((p4, m5) => p4.d - m5.d)[0].k;
        const a3 = t3[i5], s4 = this.h >= a3.hMin && this.h <= a3.hMax, l4 = this.w >= a3.wMin && this.w <= a3.wMax;
        this.fit === "tight" && (i5 = Math.max(0, i5 - (l4 && this.w - a3.wMin < (a3.wMax - a3.wMin) / 3 ? 1 : 0))), this.fit === "loose" && (i5 = Math.min(t3.length - 1, i5 + (l4 && a3.wMax - this.w < (a3.wMax - a3.wMin) / 2 ? 1 : 0)));
        const c4 = s4 && l4 ? 92 : s4 || l4 ? 70 : 45, g4 = l4 && (this.w - a3.wMin < 2 || a3.wMax - this.w < 2);
        return { i: i5, row: t3[i5], conf: g4 ? c4 - 15 : c4, edge: g4 };
      }
      render() {
        const t3 = this.c, e6 = this.rows(), i5 = this.calc(e6), a3 = o6("\u0633\u0645", "cm"), s4 = o6("\u0643\u062C\u0645", "kg"), l4 = () => {
          this.done = true, A5("size_h", String(this.h)), A5("size_w", String(this.w)), A5("size_fit", this.fit);
        };
        return this.shell(
          b2`${this.hints([!e6.length && o6("\u0623\u0636\u0641 \u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0642\u0627\u0633\u0627\u062A \u0645\u0646 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A (\u0627\u0644\u0645\u0642\u0627\u0633\u060C \u0627\u0644\u0637\u0648\u0644\u060C \u0627\u0644\u0648\u0632\u0646).", "Add your size chart in the settings.")])}
      ${i5 ? b2`<div class="g"><div class="panel f">
        <div class="row"><label>${o6("\u0637\u0648\u0644\u0643", "Height")} <b>${this.h} ${a3}</b></label><input type="range" min=${d4(t3.h_from, 140)} max=${d4(t3.h_to, 195)} .value=${String(this.h)} @input=${(c4) => {
            this.h = +c4.target.value, this.done = false;
          }} /></div>
        <div class="row"><label>${o6("\u0648\u0632\u0646\u0643", "Weight")} <b>${this.w} ${s4}</b></label><input type="range" min=${d4(t3.w_from, 40)} max=${d4(t3.w_to, 130)} .value=${String(this.w)} @input=${(c4) => {
            this.w = +c4.target.value, this.done = false;
          }} /></div>
        ${f5(t3.ask_fit, true) ? b2`<div class="row"><label>${o6("\u0643\u064A\u0641 \u062A\u062D\u0628 \u0627\u0644\u0644\u0628\u0633\u0629\u061F", "Preferred fit")}</label><div class="fits">${[["tight", o6("\u0636\u064A\u0651\u0642\u0629", "Fitted")], ["regular", o6("\u0639\u0627\u062F\u064A\u0629", "Regular")], ["loose", o6("\u0648\u0627\u0633\u0639\u0629", "Loose")]].map(([c4, g4]) => b2`<button class="chip ${this.fit === c4 ? "on" : ""}" @click=${() => {
            this.fit = c4, this.done = false;
          }}>${g4}</button>`)}</div></div>` : ""}
        <button class="btn" @click=${l4}>${o6("\u0627\u062D\u0633\u0628 \u0645\u0642\u0627\u0633\u064A", "Find my size")}</button>
        ${f5(t3.show_table, true) ? b2`<table><tr><th>${o6("\u0627\u0644\u0645\u0642\u0627\u0633", "Size")}</th><th>${o6("\u0627\u0644\u0637\u0648\u0644", "Height")}</th><th>${o6("\u0627\u0644\u0648\u0632\u0646", "Weight")}</th>${e6.some((c4) => c4.length) ? b2`<th>${h7(t3.length_label, o6("\u0627\u0644\u0637\u0648\u0644 \u0627\u0644\u0645\u0646\u0627\u0633\u0628", "Length"))}</th>` : ""}</tr>
          ${e6.map((c4, g4) => b2`<tr class=${this.done && g4 === i5.i ? "on" : ""}><td>${c4.size}</td><td>${c4.hMin}–${c4.hMax}</td><td>${c4.wMin}–${c4.wMax}</td>${e6.some((p4) => p4.length) ? b2`<td>${c4.length}</td>` : ""}</tr>`)}</table>` : ""}
      </div>
      <div class="panel res">${this.done ? b2`<span class="muted">${o6("\u0645\u0642\u0627\u0633\u0643 \u0627\u0644\u0645\u0642\u062A\u0631\u062D", "Your size")}</span><div class="big">${i5.row.size}</div>
          ${i5.row.length ? b2`<div class="len">${h7(t3.length_label, o6("\u0627\u0644\u0637\u0648\u0644 \u0627\u0644\u0645\u0646\u0627\u0633\u0628", "Length"))}: ${i5.row.length}</div>` : ""}
          ${f5(t3.show_confidence, true) ? b2`<div class="conf">${o6("\u062F\u0642\u0629 \u0627\u0644\u062A\u0631\u0634\u064A\u062D", "Confidence")} <span class="bar"><i style=${`width:${i5.conf}%`}></i></span> ${i5.conf}%</div>` : ""}
          ${i5.edge ? b2`<p class="note">${o6("\u0623\u0646\u062A \u0639\u0644\u0649 \u062D\u062F\u0648\u062F \u0645\u0642\u0627\u0633\u064A\u0646\u061B \u0644\u0648 \u062A\u062D\u0628 \u0627\u0644\u0631\u0627\u062D\u0629 \u062E\u0630 \u0627\u0644\u0623\u0643\u0628\u0631.", "You are between two sizes; size up for comfort.")}</p>` : ""}
          ${i5.row.note ? b2`<p class="note">${i5.row.note}</p>` : ""}${h7(t3.footer) ? b2`<p class="note">${h7(t3.footer)}</p>` : ""}
          ${t3.link ? b2`<a class="btn" href=${String(t3.link)}>${h7(t3.button, o6("\u062A\u0633\u0648\u0651\u0642 \u0645\u0642\u0627\u0633\u0643", "Shop your size"))}</a>` : ""}` : b2`<div class="fig">📏</div><p class="note">${o6("\u062D\u0631\u0651\u0643 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0648\u0627\u0636\u063A\u0637 \xAB\u0627\u062D\u0633\u0628 \u0645\u0642\u0627\u0633\u064A\xBB", "Move the sliders and tap \xABFind my size\xBB")}</p>`}</div></div>` : ""}`,
          { eyebrow: o6("\u0645\u0633\u062A\u0634\u0627\u0631 \u0627\u0644\u0645\u0642\u0627\u0633", "Size advisor"), title: o6("\u0645\u0642\u0627\u0633\u0643 \u0627\u0644\u0635\u062D \u0645\u0646 \u0623\u0648\u0644 \u0645\u0631\u0629", "Your right size, first time") }
        );
      }
    };
    C5.styles = [w4.base, i`
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
    b6 = C5;
    _6([
      r5()
    ], b6.prototype, "h");
    _6([
      r5()
    ], b6.prototype, "w");
    _6([
      r5()
    ], b6.prototype, "fit");
    _6([
      r5()
    ], b6.prototype, "done");
    typeof b6 < "u" && b6.registerSallaComponent("salla-murshid-size");
  }
});

// demo/entry.js
init_lit();
i4.registerSallaComponent = function(n5) {
  if (!customElements.get(n5)) customElements.define(n5, this);
};
await Promise.resolve().then(() => (init_murshid_advisor(), murshid_advisor_exports));
await Promise.resolve().then(() => (init_murshid_chat(), murshid_chat_exports));
await Promise.resolve().then(() => (init_murshid_gift(), murshid_gift_exports));
await Promise.resolve().then(() => (init_murshid_plan(), murshid_plan_exports));
await Promise.resolve().then(() => (init_murshid_size(), murshid_size_exports));
window.__ready = true;
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
