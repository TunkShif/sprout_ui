"use strict";
var SproutUI = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a3, b3) => {
    for (var prop in b3 || (b3 = {}))
      if (__hasOwnProp.call(b3, prop))
        __defNormalProp(a3, prop, b3[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b3)) {
        if (__propIsEnum.call(b3, prop))
          __defNormalProp(a3, prop, b3[prop]);
      }
    return a3;
  };
  var __spreadProps = (a3, b3) => __defProps(a3, __getOwnPropDescs(b3));
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e2) {
          reject(e2);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e2) {
          reject(e2);
        }
      };
      var step = (x3) => x3.done ? resolve(x3.value) : Promise.resolve(x3.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // js/sprout_ui/index.ts
  var sprout_ui_exports = {};
  __export(sprout_ui_exports, {
    default: () => sprout_ui_default,
    floating: () => floating_default,
    modal: () => modal_default,
    transition: () => transition_default
  });

  // js/sprout_ui/components/global.ts
  var init = () => {
    window.addEventListener("sprt:toggle_attribute", (e2) => {
      const { target, detail } = e2;
      const state = target.getAttribute(detail.attribute) === detail.states[0] ? detail.states[1] : detail.states[0];
      target.setAttribute(detail.attribute, state);
    });
  };
  var global = () => ({
    init
  });
  var global_default = global;

  // js/sprout_ui/components/modal.ts
  var Modal = class {
    constructor(el, options) {
      __publicField(this, "modal");
      __publicField(this, "disableScrolling");
      __publicField(this, "awaitCloseAnimation");
      this.modal = el;
      this.disableScrolling = options.disableScrolling;
      this.awaitCloseAnimation = options.awaitCloseAnimation;
    }
    open() {
      this.parts.forEach((el) => el == null ? void 0 : el.setAttribute("data-ui-state", "open"));
      this.toggleScrolling("off");
    }
    close() {
      var _a, _b;
      (_a = this.overlay) == null ? void 0 : _a.setAttribute("data-ui-state", "");
      (_b = this.container) == null ? void 0 : _b.setAttribute("data-ui-state", "");
      this.toggleScrolling("on");
      if (this.awaitCloseAnimation) {
        const handler = () => {
          this.modal.setAttribute("data-ui-state", "");
          this.modal.removeEventListener("animationend", handler, false);
        };
        this.modal.addEventListener("animationend", handler, false);
      } else {
        this.modal.setAttribute("data-ui-state", "");
      }
    }
    get overlay() {
      return this.modal.querySelector(`[data-part=overlay]`);
    }
    get container() {
      return this.modal.querySelector(`[data-part=container]`);
    }
    get parts() {
      return [this.modal, this.overlay, this.container];
    }
    toggleScrolling(state) {
      if (!this.disableScrolling)
        return;
      switch (state) {
        case "on":
          Object.assign(document.body.style, { overflow: "" });
          break;
        case "off":
          Object.assign(document.body.style, { overflow: "hidden" });
          break;
      }
    }
  };
  var init2 = () => {
    const modals = /* @__PURE__ */ new WeakMap();
    window.addEventListener("sprt:modal:init", (e2) => {
      const { target, detail } = e2;
      modals.set(target, new Modal(target, detail.options));
    });
    window.addEventListener("sprt:modal:open", (e2) => {
      const { target } = e2;
      const modal2 = modals.get(target);
      modal2 == null ? void 0 : modal2.open();
    });
    window.addEventListener("sprt:modal:close", (e2) => {
      const { target } = e2;
      const modal2 = modals.get(target);
      modal2 == null ? void 0 : modal2.close();
    });
  };
  var modal = () => ({
    init: init2
  });
  var modal_default = modal;

  // node_modules/.pnpm/@floating-ui+core@1.0.1/node_modules/@floating-ui/core/dist/floating-ui.core.browser.min.mjs
  function t(t2) {
    return t2.split("-")[0];
  }
  function e(t2) {
    return t2.split("-")[1];
  }
  function n(e2) {
    return ["top", "bottom"].includes(t(e2)) ? "x" : "y";
  }
  function r(t2) {
    return "y" === t2 ? "height" : "width";
  }
  function i(i3, o3, a3) {
    let { reference: l3, floating: s3 } = i3;
    const c3 = l3.x + l3.width / 2 - s3.width / 2, f3 = l3.y + l3.height / 2 - s3.height / 2, u4 = n(o3), m3 = r(u4), g3 = l3[m3] / 2 - s3[m3] / 2, d4 = "x" === u4;
    let p3;
    switch (t(o3)) {
      case "top":
        p3 = { x: c3, y: l3.y - s3.height };
        break;
      case "bottom":
        p3 = { x: c3, y: l3.y + l3.height };
        break;
      case "right":
        p3 = { x: l3.x + l3.width, y: f3 };
        break;
      case "left":
        p3 = { x: l3.x - s3.width, y: f3 };
        break;
      default:
        p3 = { x: l3.x, y: l3.y };
    }
    switch (e(o3)) {
      case "start":
        p3[u4] -= g3 * (a3 && d4 ? -1 : 1);
        break;
      case "end":
        p3[u4] += g3 * (a3 && d4 ? -1 : 1);
    }
    return p3;
  }
  var o = (t2, e2, n3) => __async(void 0, null, function* () {
    const { placement: r3 = "bottom", strategy: o3 = "absolute", middleware: a3 = [], platform: l3 } = n3, s3 = yield null == l3.isRTL ? void 0 : l3.isRTL(e2);
    let c3 = yield l3.getElementRects({ reference: t2, floating: e2, strategy: o3 }), { x: f3, y: u4 } = i(c3, r3, s3), m3 = r3, g3 = {}, d4 = 0;
    for (let n4 = 0; n4 < a3.length; n4++) {
      const { name: p3, fn: h3 } = a3[n4], { x: y3, y: x3, data: w3, reset: v4 } = yield h3({ x: f3, y: u4, initialPlacement: r3, placement: m3, strategy: o3, middlewareData: g3, rects: c3, platform: l3, elements: { reference: t2, floating: e2 } });
      f3 = null != y3 ? y3 : f3, u4 = null != x3 ? x3 : u4, g3 = __spreadProps(__spreadValues({}, g3), { [p3]: __spreadValues(__spreadValues({}, g3[p3]), w3) }), v4 && d4 <= 50 && (d4++, "object" == typeof v4 && (v4.placement && (m3 = v4.placement), v4.rects && (c3 = true === v4.rects ? yield l3.getElementRects({ reference: t2, floating: e2, strategy: o3 }) : v4.rects), { x: f3, y: u4 } = i(c3, m3, s3)), n4 = -1);
    }
    return { x: f3, y: u4, placement: m3, strategy: o3, middlewareData: g3 };
  });
  function a(t2) {
    return "number" != typeof t2 ? function(t3) {
      return __spreadValues({ top: 0, right: 0, bottom: 0, left: 0 }, t3);
    }(t2) : { top: t2, right: t2, bottom: t2, left: t2 };
  }
  function l(t2) {
    return __spreadProps(__spreadValues({}, t2), { top: t2.y, left: t2.x, right: t2.x + t2.width, bottom: t2.y + t2.height });
  }
  function s(t2, e2) {
    return __async(this, null, function* () {
      var n3;
      void 0 === e2 && (e2 = {});
      const { x: r3, y: i3, platform: o3, rects: s3, elements: c3, strategy: f3 } = t2, { boundary: u4 = "clippingAncestors", rootBoundary: m3 = "viewport", elementContext: g3 = "floating", altBoundary: d4 = false, padding: p3 = 0 } = e2, h3 = a(p3), y3 = c3[d4 ? "floating" === g3 ? "reference" : "floating" : g3], x3 = l(yield o3.getClippingRect({ element: null == (n3 = yield null == o3.isElement ? void 0 : o3.isElement(y3)) || n3 ? y3 : y3.contextElement || (yield null == o3.getDocumentElement ? void 0 : o3.getDocumentElement(c3.floating)), boundary: u4, rootBoundary: m3, strategy: f3 })), w3 = l(o3.convertOffsetParentRelativeRectToViewportRelativeRect ? yield o3.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: "floating" === g3 ? __spreadProps(__spreadValues({}, s3.floating), { x: r3, y: i3 }) : s3.reference, offsetParent: yield null == o3.getOffsetParent ? void 0 : o3.getOffsetParent(c3.floating), strategy: f3 }) : s3[g3]);
      return { top: x3.top - w3.top + h3.top, bottom: w3.bottom - x3.bottom + h3.bottom, left: x3.left - w3.left + h3.left, right: w3.right - x3.right + h3.right };
    });
  }
  var c = Math.min;
  var f = Math.max;
  function u(t2, e2, n3) {
    return f(t2, c(e2, n3));
  }
  var m = (t2) => ({ name: "arrow", options: t2, fn(i3) {
    return __async(this, null, function* () {
      const { element: o3, padding: l3 = 0 } = null != t2 ? t2 : {}, { x: s3, y: c3, placement: f3, rects: m3, platform: g3 } = i3;
      if (null == o3)
        return {};
      const d4 = a(l3), p3 = { x: s3, y: c3 }, h3 = n(f3), y3 = e(f3), x3 = r(h3), w3 = yield g3.getDimensions(o3), v4 = "y" === h3 ? "top" : "left", b3 = "y" === h3 ? "bottom" : "right", R2 = m3.reference[x3] + m3.reference[h3] - p3[h3] - m3.floating[x3], A2 = p3[h3] - m3.reference[h3], P2 = yield null == g3.getOffsetParent ? void 0 : g3.getOffsetParent(o3);
      let T3 = P2 ? "y" === h3 ? P2.clientHeight || 0 : P2.clientWidth || 0 : 0;
      0 === T3 && (T3 = m3.floating[x3]);
      const O2 = R2 / 2 - A2 / 2, L3 = d4[v4], D3 = T3 - w3[x3] - d4[b3], k2 = T3 / 2 - w3[x3] / 2 + O2, E3 = u(L3, k2, D3), C2 = ("start" === y3 ? d4[v4] : d4[b3]) > 0 && k2 !== E3 && m3.reference[x3] <= m3.floating[x3];
      return { [h3]: p3[h3] - (C2 ? k2 < L3 ? L3 - k2 : D3 - k2 : 0), data: { [h3]: E3, centerOffset: k2 - E3 } };
    });
  } });
  var g = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function d(t2) {
    return t2.replace(/left|right|bottom|top/g, (t3) => g[t3]);
  }
  function p(t2, i3, o3) {
    void 0 === o3 && (o3 = false);
    const a3 = e(t2), l3 = n(t2), s3 = r(l3);
    let c3 = "x" === l3 ? a3 === (o3 ? "end" : "start") ? "right" : "left" : "start" === a3 ? "bottom" : "top";
    return i3.reference[s3] > i3.floating[s3] && (c3 = d(c3)), { main: c3, cross: d(c3) };
  }
  var h = { start: "end", end: "start" };
  function y(t2) {
    return t2.replace(/start|end/g, (t3) => h[t3]);
  }
  var x = ["top", "right", "bottom", "left"];
  var w = x.reduce((t2, e2) => t2.concat(e2, e2 + "-start", e2 + "-end"), []);
  var b = function(e2) {
    return void 0 === e2 && (e2 = {}), { name: "flip", options: e2, fn(n3) {
      return __async(this, null, function* () {
        var r3;
        const { placement: i3, middlewareData: o3, rects: a3, initialPlacement: l3, platform: c3, elements: f3 } = n3, _a2 = e2, { mainAxis: u4 = true, crossAxis: m3 = true, fallbackPlacements: g3, fallbackStrategy: h3 = "bestFit", flipAlignment: x3 = true } = _a2, w3 = __objRest(_a2, ["mainAxis", "crossAxis", "fallbackPlacements", "fallbackStrategy", "flipAlignment"]), v4 = t(i3), b3 = g3 || (v4 === l3 || !x3 ? [d(l3)] : function(t2) {
          const e3 = d(t2);
          return [y(t2), e3, y(e3)];
        }(l3)), R2 = [l3, ...b3], A2 = yield s(n3, w3), P2 = [];
        let T3 = (null == (r3 = o3.flip) ? void 0 : r3.overflows) || [];
        if (u4 && P2.push(A2[v4]), m3) {
          const { main: t2, cross: e3 } = p(i3, a3, yield null == c3.isRTL ? void 0 : c3.isRTL(f3.floating));
          P2.push(A2[t2], A2[e3]);
        }
        if (T3 = [...T3, { placement: i3, overflows: P2 }], !P2.every((t2) => t2 <= 0)) {
          var O2, L3;
          const t2 = (null != (O2 = null == (L3 = o3.flip) ? void 0 : L3.index) ? O2 : 0) + 1, e3 = R2[t2];
          if (e3)
            return { data: { index: t2, overflows: T3 }, reset: { placement: e3 } };
          let n4 = "bottom";
          switch (h3) {
            case "bestFit": {
              var D3;
              const t3 = null == (D3 = T3.map((t4) => [t4, t4.overflows.filter((t5) => t5 > 0).reduce((t5, e4) => t5 + e4, 0)]).sort((t4, e4) => t4[1] - e4[1])[0]) ? void 0 : D3[0].placement;
              t3 && (n4 = t3);
              break;
            }
            case "initialPlacement":
              n4 = l3;
          }
          if (i3 !== n4)
            return { reset: { placement: n4 } };
        }
        return {};
      });
    } };
  };
  var T = function(r3) {
    return void 0 === r3 && (r3 = 0), { name: "offset", options: r3, fn(i3) {
      return __async(this, null, function* () {
        const { x: o3, y: a3 } = i3, l3 = yield function(r4, i4) {
          return __async(this, null, function* () {
            const { placement: o4, platform: a4, elements: l4 } = r4, s3 = yield null == a4.isRTL ? void 0 : a4.isRTL(l4.floating), c3 = t(o4), f3 = e(o4), u4 = "x" === n(o4), m3 = ["left", "top"].includes(c3) ? -1 : 1, g3 = s3 && u4 ? -1 : 1, d4 = "function" == typeof i4 ? i4(r4) : i4;
            let { mainAxis: p3, crossAxis: h3, alignmentAxis: y3 } = "number" == typeof d4 ? { mainAxis: d4, crossAxis: 0, alignmentAxis: null } : __spreadValues({ mainAxis: 0, crossAxis: 0, alignmentAxis: null }, d4);
            return f3 && "number" == typeof y3 && (h3 = "end" === f3 ? -1 * y3 : y3), u4 ? { x: h3 * g3, y: p3 * m3 } : { x: p3 * m3, y: h3 * g3 };
          });
        }(i3, r3);
        return { x: o3 + l3.x, y: a3 + l3.y, data: l3 };
      });
    } };
  };
  function O(t2) {
    return "x" === t2 ? "y" : "x";
  }
  var L = function(e2) {
    return void 0 === e2 && (e2 = {}), { name: "shift", options: e2, fn(r3) {
      return __async(this, null, function* () {
        const { x: i3, y: o3, placement: a3 } = r3, _a2 = e2, { mainAxis: l3 = true, crossAxis: c3 = false, limiter: f3 = { fn: (t2) => {
          let { x: e3, y: n3 } = t2;
          return { x: e3, y: n3 };
        } } } = _a2, m3 = __objRest(_a2, ["mainAxis", "crossAxis", "limiter"]), g3 = { x: i3, y: o3 }, d4 = yield s(r3, m3), p3 = n(t(a3)), h3 = O(p3);
        let y3 = g3[p3], x3 = g3[h3];
        if (l3) {
          const t2 = "y" === p3 ? "bottom" : "right";
          y3 = u(y3 + d4["y" === p3 ? "top" : "left"], y3, y3 - d4[t2]);
        }
        if (c3) {
          const t2 = "y" === h3 ? "bottom" : "right";
          x3 = u(x3 + d4["y" === h3 ? "top" : "left"], x3, x3 - d4[t2]);
        }
        const w3 = f3.fn(__spreadProps(__spreadValues({}, r3), { [p3]: y3, [h3]: x3 }));
        return __spreadProps(__spreadValues({}, w3), { data: { x: w3.x - i3, y: w3.y - o3 } });
      });
    } };
  };

  // node_modules/.pnpm/@floating-ui+dom@1.0.4/node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.min.mjs
  function n2(t2) {
    return t2 && t2.document && t2.location && t2.alert && t2.setInterval;
  }
  function o2(t2) {
    if (null == t2)
      return window;
    if (!n2(t2)) {
      const e2 = t2.ownerDocument;
      return e2 && e2.defaultView || window;
    }
    return t2;
  }
  function i2(t2) {
    return o2(t2).getComputedStyle(t2);
  }
  function r2(t2) {
    return n2(t2) ? "" : t2 ? (t2.nodeName || "").toLowerCase() : "";
  }
  function l2() {
    const t2 = navigator.userAgentData;
    return null != t2 && t2.brands ? t2.brands.map((t3) => t3.brand + "/" + t3.version).join(" ") : navigator.userAgent;
  }
  function c2(t2) {
    return t2 instanceof o2(t2).HTMLElement;
  }
  function s2(t2) {
    return t2 instanceof o2(t2).Element;
  }
  function f2(t2) {
    if ("undefined" == typeof ShadowRoot)
      return false;
    return t2 instanceof o2(t2).ShadowRoot || t2 instanceof ShadowRoot;
  }
  function u2(t2) {
    const { overflow: e2, overflowX: n3, overflowY: o3, display: r3 } = i2(t2);
    return /auto|scroll|overlay|hidden/.test(e2 + o3 + n3) && !["inline", "contents"].includes(r3);
  }
  function d2(t2) {
    return ["table", "td", "th"].includes(r2(t2));
  }
  function h2(t2) {
    const e2 = /firefox/i.test(l2()), n3 = i2(t2);
    return "none" !== n3.transform || "none" !== n3.perspective || e2 && "filter" === n3.willChange || e2 && !!n3.filter && "none" !== n3.filter || ["transform", "perspective"].some((t3) => n3.willChange.includes(t3)) || ["paint", "layout", "strict", "content"].some((t3) => {
      const e3 = n3.contain;
      return null != e3 && e3.includes(t3);
    });
  }
  function a2() {
    return !/^((?!chrome|android).)*safari/i.test(l2());
  }
  function g2(t2) {
    return ["html", "body", "#document"].includes(r2(t2));
  }
  var m2 = Math.min;
  var p2 = Math.max;
  var w2 = Math.round;
  function v2(t2, e2, n3) {
    var i3, r3, l3, f3;
    void 0 === e2 && (e2 = false), void 0 === n3 && (n3 = false);
    const u4 = t2.getBoundingClientRect();
    let d4 = 1, h3 = 1;
    e2 && c2(t2) && (d4 = t2.offsetWidth > 0 && w2(u4.width) / t2.offsetWidth || 1, h3 = t2.offsetHeight > 0 && w2(u4.height) / t2.offsetHeight || 1);
    const g3 = s2(t2) ? o2(t2) : window, m3 = !a2() && n3, p3 = (u4.left + (m3 && null != (i3 = null == (r3 = g3.visualViewport) ? void 0 : r3.offsetLeft) ? i3 : 0)) / d4, v4 = (u4.top + (m3 && null != (l3 = null == (f3 = g3.visualViewport) ? void 0 : f3.offsetTop) ? l3 : 0)) / h3, y3 = u4.width / d4, x3 = u4.height / h3;
    return { width: y3, height: x3, top: v4, right: p3 + y3, bottom: v4 + x3, left: p3, x: p3, y: v4 };
  }
  function y2(t2) {
    return (e2 = t2, (e2 instanceof o2(e2).Node ? t2.ownerDocument : t2.document) || window.document).documentElement;
    var e2;
  }
  function x2(t2) {
    return s2(t2) ? { scrollLeft: t2.scrollLeft, scrollTop: t2.scrollTop } : { scrollLeft: t2.pageXOffset, scrollTop: t2.pageYOffset };
  }
  function b2(t2) {
    return v2(y2(t2)).left + x2(t2).scrollLeft;
  }
  function L2(t2, e2, n3) {
    const o3 = c2(e2), i3 = y2(e2), l3 = v2(t2, o3 && function(t3) {
      const e3 = v2(t3);
      return w2(e3.width) !== t3.offsetWidth || w2(e3.height) !== t3.offsetHeight;
    }(e2), "fixed" === n3);
    let s3 = { scrollLeft: 0, scrollTop: 0 };
    const f3 = { x: 0, y: 0 };
    if (o3 || !o3 && "fixed" !== n3)
      if (("body" !== r2(e2) || u2(i3)) && (s3 = x2(e2)), c2(e2)) {
        const t3 = v2(e2, true);
        f3.x = t3.x + e2.clientLeft, f3.y = t3.y + e2.clientTop;
      } else
        i3 && (f3.x = b2(i3));
    return { x: l3.left + s3.scrollLeft - f3.x, y: l3.top + s3.scrollTop - f3.y, width: l3.width, height: l3.height };
  }
  function R(t2) {
    return "html" === r2(t2) ? t2 : t2.assignedSlot || t2.parentNode || (f2(t2) ? t2.host : null) || y2(t2);
  }
  function E2(t2) {
    return c2(t2) && "fixed" !== i2(t2).position ? t2.offsetParent : null;
  }
  function T2(t2) {
    const e2 = o2(t2);
    let n3 = E2(t2);
    for (; n3 && d2(n3) && "static" === i2(n3).position; )
      n3 = E2(n3);
    return n3 && ("html" === r2(n3) || "body" === r2(n3) && "static" === i2(n3).position && !h2(n3)) ? e2 : n3 || function(t3) {
      let e3 = R(t3);
      for (f2(e3) && (e3 = e3.host); c2(e3) && !g2(e3); ) {
        if (h2(e3))
          return e3;
        {
          const t4 = e3.parentNode;
          e3 = f2(t4) ? t4.host : t4;
        }
      }
      return null;
    }(t2) || e2;
  }
  function W(t2) {
    if (c2(t2))
      return { width: t2.offsetWidth, height: t2.offsetHeight };
    const e2 = v2(t2);
    return { width: e2.width, height: e2.height };
  }
  function H(t2) {
    const e2 = R(t2);
    return g2(e2) ? t2.ownerDocument.body : c2(e2) && u2(e2) ? e2 : H(e2);
  }
  function C(t2, e2) {
    var n3;
    void 0 === e2 && (e2 = []);
    const i3 = H(t2), r3 = i3 === (null == (n3 = t2.ownerDocument) ? void 0 : n3.body), l3 = o2(i3), c3 = r3 ? [l3].concat(l3.visualViewport || [], u2(i3) ? i3 : []) : i3, s3 = e2.concat(c3);
    return r3 ? s3 : s3.concat(C(c3));
  }
  function D2(e2, n3, r3) {
    return "viewport" === n3 ? l(function(t2, e3) {
      const n4 = o2(t2), i3 = y2(t2), r4 = n4.visualViewport;
      let l3 = i3.clientWidth, c3 = i3.clientHeight, s3 = 0, f3 = 0;
      if (r4) {
        l3 = r4.width, c3 = r4.height;
        const t3 = a2();
        (t3 || !t3 && "fixed" === e3) && (s3 = r4.offsetLeft, f3 = r4.offsetTop);
      }
      return { width: l3, height: c3, x: s3, y: f3 };
    }(e2, r3)) : s2(n3) ? function(t2, e3) {
      const n4 = v2(t2, false, "fixed" === e3), o3 = n4.top + t2.clientTop, i3 = n4.left + t2.clientLeft;
      return { top: o3, left: i3, x: i3, y: o3, right: i3 + t2.clientWidth, bottom: o3 + t2.clientHeight, width: t2.clientWidth, height: t2.clientHeight };
    }(n3, r3) : l(function(t2) {
      var e3;
      const n4 = y2(t2), o3 = x2(t2), r4 = null == (e3 = t2.ownerDocument) ? void 0 : e3.body, l3 = p2(n4.scrollWidth, n4.clientWidth, r4 ? r4.scrollWidth : 0, r4 ? r4.clientWidth : 0), c3 = p2(n4.scrollHeight, n4.clientHeight, r4 ? r4.scrollHeight : 0, r4 ? r4.clientHeight : 0);
      let s3 = -o3.scrollLeft + b2(t2);
      const f3 = -o3.scrollTop;
      return "rtl" === i2(r4 || n4).direction && (s3 += p2(n4.clientWidth, r4 ? r4.clientWidth : 0) - l3), { width: l3, height: c3, x: s3, y: f3 };
    }(y2(e2)));
  }
  function N(t2) {
    const e2 = C(t2), n3 = function(t3, e3) {
      let n4 = t3;
      for (; n4 && !g2(n4) && !e3.includes(n4) && (!s2(n4) || !["absolute", "fixed"].includes(i2(n4).position)); ) {
        const t4 = R(n4);
        n4 = f2(t4) ? t4.host : t4;
      }
      return n4;
    }(t2, e2);
    let o3 = null;
    if (n3 && c2(n3)) {
      const t3 = T2(n3);
      u2(n3) ? o3 = n3 : c2(t3) && (o3 = t3);
    }
    return s2(o3) ? e2.filter((t3) => o3 && s2(t3) && function(t4, e3) {
      const n4 = null == e3.getRootNode ? void 0 : e3.getRootNode();
      if (t4.contains(e3))
        return true;
      if (n4 && f2(n4)) {
        let n5 = e3;
        do {
          if (n5 && t4 === n5)
            return true;
          n5 = n5.parentNode || n5.host;
        } while (n5);
      }
      return false;
    }(t3, o3) && "body" !== r2(t3)) : [];
  }
  var S = { getClippingRect: function(t2) {
    let { element: e2, boundary: n3, rootBoundary: o3, strategy: i3 } = t2;
    const r3 = [..."clippingAncestors" === n3 ? N(e2) : [].concat(n3), o3], l3 = r3[0], c3 = r3.reduce((t3, n4) => {
      const o4 = D2(e2, n4, i3);
      return t3.top = p2(o4.top, t3.top), t3.right = m2(o4.right, t3.right), t3.bottom = m2(o4.bottom, t3.bottom), t3.left = p2(o4.left, t3.left), t3;
    }, D2(e2, l3, i3));
    return { width: c3.right - c3.left, height: c3.bottom - c3.top, x: c3.left, y: c3.top };
  }, convertOffsetParentRelativeRectToViewportRelativeRect: function(t2) {
    let { rect: e2, offsetParent: n3, strategy: o3 } = t2;
    const i3 = c2(n3), l3 = y2(n3);
    if (n3 === l3)
      return e2;
    let s3 = { scrollLeft: 0, scrollTop: 0 };
    const f3 = { x: 0, y: 0 };
    if ((i3 || !i3 && "fixed" !== o3) && (("body" !== r2(n3) || u2(l3)) && (s3 = x2(n3)), c2(n3))) {
      const t3 = v2(n3, true);
      f3.x = t3.x + n3.clientLeft, f3.y = t3.y + n3.clientTop;
    }
    return __spreadProps(__spreadValues({}, e2), { x: e2.x - s3.scrollLeft + f3.x, y: e2.y - s3.scrollTop + f3.y });
  }, isElement: s2, getDimensions: W, getOffsetParent: T2, getDocumentElement: y2, getElementRects: (t2) => {
    let { reference: e2, floating: n3, strategy: o3 } = t2;
    return { reference: L2(e2, T2(n3), o3), floating: __spreadProps(__spreadValues({}, W(n3)), { x: 0, y: 0 }) };
  }, getClientRects: (t2) => Array.from(t2.getClientRects()), isRTL: (t2) => "rtl" === i2(t2).direction };
  function z(t2, e2, n3, o3) {
    void 0 === o3 && (o3 = {});
    const { ancestorScroll: i3 = true, ancestorResize: r3 = true, elementResize: l3 = true, animationFrame: c3 = false } = o3, f3 = i3 && !c3, u4 = f3 || r3 ? [...s2(t2) ? C(t2) : t2.contextElement ? C(t2.contextElement) : [], ...C(e2)] : [];
    u4.forEach((t3) => {
      f3 && t3.addEventListener("scroll", n3, { passive: true }), r3 && t3.addEventListener("resize", n3);
    });
    let d4, h3 = null;
    if (l3) {
      let o4 = true;
      h3 = new ResizeObserver(() => {
        o4 || n3(), o4 = false;
      }), s2(t2) && !c3 && h3.observe(t2), s2(t2) || !t2.contextElement || c3 || h3.observe(t2.contextElement), h3.observe(e2);
    }
    let a3 = c3 ? v2(t2) : null;
    return c3 && function e3() {
      const o4 = v2(t2);
      !a3 || o4.x === a3.x && o4.y === a3.y && o4.width === a3.width && o4.height === a3.height || n3();
      a3 = o4, d4 = requestAnimationFrame(e3);
    }(), n3(), () => {
      var t3;
      u4.forEach((t4) => {
        f3 && t4.removeEventListener("scroll", n3), r3 && t4.removeEventListener("resize", n3);
      }), null == (t3 = h3) || t3.disconnect(), h3 = null, c3 && cancelAnimationFrame(d4);
    };
  }
  var A = (t2, n3, o3) => o(t2, n3, __spreadValues({ platform: S }, o3));

  // js/sprout_ui/components/floating.ts
  var MIDDLEWARES = {
    offset: T,
    shift: L,
    flip: b,
    arrow: m
  };
  var FloatingElement = class extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "active", false);
      __publicField(this, "arrowEl");
      __publicField(this, "cleanup");
    }
    static get observedAttributes() {
      return ["data-ui-state", "data-placement", "data-middleware"];
    }
    connectedCallback() {
      this.start();
    }
    disconnectedCallback() {
      this.stop();
    }
    attributeChangedCallback(name, _oldValue, newValue) {
      if (name === "data-ui-state") {
        this.active = newValue === "active";
      }
      if (this.active) {
        this.update();
      }
    }
    get anchor() {
      if (!this.dataset.anchor)
        return null;
      return document.querySelector(this.dataset.anchor);
    }
    get placement() {
      return this.dataset.placement || "bottom";
    }
    get middleware() {
      const middlewares = JSON.parse(this.dataset.middleware || "[]");
      const arrow = middlewares.find(([name]) => name === "arrow");
      if (arrow) {
        const element = arrow[1]["element"];
        this.arrowEl = this.querySelector(element);
        arrow[1]["element"] = this.arrowEl;
      }
      return middlewares.map(([name, options]) => MIDDLEWARES[name](options));
    }
    start() {
      if (!this.anchor)
        return;
      this.cleanup = z(this.anchor, this, this.update.bind(this));
    }
    stop() {
      var _a;
      (_a = this.cleanup) == null ? void 0 : _a.call(this);
    }
    update() {
      if (!this.active || !this.anchor)
        return;
      A(this.anchor, this, {
        placement: this.placement,
        middleware: this.middleware
      }).then(({ x: x3, y: y3, placement, middlewareData }) => {
        Object.assign(this.style, {
          left: `${x3}px`,
          top: `${y3}px`
        });
        if (middlewareData.arrow && this.arrowEl) {
          const { x: arrowX, y: arrowY } = middlewareData.arrow;
          const staticSide = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right"
          }[placement.split("-")[0]];
          Object.assign(this.arrowEl.style, {
            left: arrowX != null ? `${arrowX}px` : "",
            top: arrowY != null ? `${arrowY}px` : "",
            right: "",
            bottom: "",
            [staticSide]: "-4px"
          });
        }
      });
    }
  };
  var floating = (opts) => ({
    init: () => {
      const element = (opts == null ? void 0 : opts.element) || "sprt-floating";
      customElements.define(element, FloatingElement);
    },
    handleDomChange: (from, to) => {
      if (from.nodeName.toLowerCase() === ((opts == null ? void 0 : opts.element) || "sprt-floating")) {
        to.setAttribute("style", from.getAttribute("style") || "");
      }
    }
  });
  var floating_default = floating;

  // node_modules/.pnpm/@tunkshif+vanilla-transition@0.2.1/node_modules/@tunkshif/vanilla-transition/dist/index.mjs
  var d3 = (t2, r3) => {
    const e2 = () => {
      r3(), t2.removeEventListener("transitionend", e2, false);
    };
    t2.addEventListener("transitionend", e2, false);
  };
  var u3 = (t2, r3, e2) => {
    let a3, n3, i3;
    switch (r3) {
      case "enter":
        a3 = e2.enter, n3 = e2.enterFrom, i3 = e2.enterTo;
        break;
      case "leave":
        a3 = e2.leave, n3 = e2.leaveFrom, i3 = e2.leaveTo;
        break;
    }
    r3 === "enter" && (t2.removeAttribute("hidden"), t2.style.display = ""), t2.classList.add(...a3, ...n3), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        t2.classList.remove(...n3), t2.classList.add(...i3), d3(t2, () => {
          t2.classList.remove(...a3), r3 === "leave" && (t2.style.display = "none");
        });
      });
    });
  };
  var v3 = (t2, r3, e2) => {
    if (!r3.hasAttribute(e2.attribute))
      return;
    const a3 = () => r3.getAttribute(e2.attribute) || "";
    a3() === e2.stages.leave ? t2.style.display = "none" : t2.style.display = "";
    const n3 = new MutationObserver((i3) => {
      for (const s3 of i3)
        if (s3.attributeName === e2.attribute) {
          const o3 = a3() === e2.stages.leave ? "leave" : "enter";
          u3(t2, o3, e2.classes);
        }
    });
    return n3.observe(r3, { attributes: true }), () => n3.disconnect();
  };

  // js/sprout_ui/components/transition.ts
  var Transition = class {
    constructor(element, config) {
      __publicField(this, "cleanup");
      __publicField(this, "element");
      __publicField(this, "config");
      this.element = element;
      this.config = config;
    }
    init() {
      const observing = document.querySelector(this.config.on) || this.element;
      this.cleanup = v3(this.element, observing, this.config.options);
    }
  };
  var init3 = () => {
    const transitions = /* @__PURE__ */ new WeakMap();
    window.addEventListener("sprt:transition:init", (e2) => {
      const { target, detail } = e2;
      const transition2 = new Transition(target, detail);
      transitions.set(target, transition2);
      transition2.init();
    });
    window.addEventListener("sprt:transition:cleanup", (e2) => {
      var _a;
      const { target } = e2;
      const transition2 = transitions.get(target);
      (_a = transition2 == null ? void 0 : transition2.cleanup) == null ? void 0 : _a.call(transition2);
    });
  };
  var transition = () => ({
    init: init3,
    handleDomChange: (from, to) => {
      if (from.hasAttribute("data-transition")) {
        if (from.getAttribute("style") === null) {
          to.removeAttribute("style");
        } else {
          to.setAttribute("style", from.getAttribute("style"));
        }
        if (from.getAttribute("hidden") === null) {
          to.removeAttribute("hidden");
        } else {
          to.setAttribute("hidden", "true");
        }
      }
    }
  });
  var transition_default = transition;

  // js/sprout_ui/index.ts
  var createSproutConfig = (opts) => {
    const components = [global_default(), ...opts.components];
    return {
      initComponents: () => {
        components.forEach((comp) => {
          var _a;
          return (_a = comp.init) == null ? void 0 : _a.call(comp);
        });
      },
      hooks: Object.assign({}, ...components.map((comp) => {
        var _a;
        return (_a = comp.hook) == null ? void 0 : _a.call(comp);
      })),
      handleDomChange: (from, to) => {
        components.forEach((comp) => {
          var _a;
          return (_a = comp.handleDomChange) == null ? void 0 : _a.call(comp, from, to);
        });
      }
    };
  };
  var sprout_ui_default = createSproutConfig;
  return __toCommonJS(sprout_ui_exports);
})();
