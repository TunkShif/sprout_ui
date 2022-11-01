"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// js/sprout_ui/index.ts
var sprout_ui_exports = {};
__export(sprout_ui_exports, {
  default: () => sprout_ui_default,
  floating: () => floating_default,
  modal: () => modal_default,
  transition: () => transition_default
});
module.exports = __toCommonJS(sprout_ui_exports);

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
var queryModalParts = (modal2) => {
  const overlay = modal2.querySelector(`[data-part=overlay]`);
  const container = modal2.querySelector(`[data-part=container]`);
  return [modal2, overlay, container];
};
var toggleScrolling = (to, disabled) => {
  if (!disabled)
    return;
  switch (to) {
    case "enable":
      Object.assign(document.body.style, { overflow: "" });
      break;
    case "disable":
      Object.assign(document.body.style, { overflow: "hidden" });
      break;
    default:
      break;
  }
};
var init2 = () => {
  window.addEventListener("sprt:modal:open", (e2) => {
    const { target, detail } = e2;
    queryModalParts(target).forEach(
      (el) => el == null ? void 0 : el.setAttribute("data-ui-state", "open")
    );
    toggleScrolling("disable", detail.disableScrolling);
  });
  window.addEventListener("sprt:modal:close", (e2) => {
    const { target, detail } = e2;
    const [modal2, overlay, container] = queryModalParts(target);
    overlay == null ? void 0 : overlay.setAttribute("data-ui-state", "");
    container == null ? void 0 : container.setAttribute("data-ui-state", "");
    toggleScrolling("enable", detail.disableScrolling);
    if (detail.awaitAnimation) {
      const handler = () => {
        modal2.setAttribute("data-ui-state", "");
        modal2.removeEventListener("animationend", handler, false);
      };
      modal2.addEventListener("animationend", handler, false);
    } else {
      modal2.setAttribute("data-ui-state", "");
    }
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
function i(i3, o3, a2) {
  let { reference: l4, floating: s2 } = i3;
  const c2 = l4.x + l4.width / 2 - s2.width / 2, f3 = l4.y + l4.height / 2 - s2.height / 2, u3 = n(o3), m3 = r(u3), g2 = l4[m3] / 2 - s2[m3] / 2, d2 = "x" === u3;
  let p2;
  switch (t(o3)) {
    case "top":
      p2 = { x: c2, y: l4.y - s2.height };
      break;
    case "bottom":
      p2 = { x: c2, y: l4.y + l4.height };
      break;
    case "right":
      p2 = { x: l4.x + l4.width, y: f3 };
      break;
    case "left":
      p2 = { x: l4.x - s2.width, y: f3 };
      break;
    default:
      p2 = { x: l4.x, y: l4.y };
  }
  switch (e(o3)) {
    case "start":
      p2[u3] -= g2 * (a2 && d2 ? -1 : 1);
      break;
    case "end":
      p2[u3] += g2 * (a2 && d2 ? -1 : 1);
  }
  return p2;
}
var o = async (t2, e2, n3) => {
  const { placement: r3 = "bottom", strategy: o3 = "absolute", middleware: a2 = [], platform: l4 } = n3, s2 = await (null == l4.isRTL ? void 0 : l4.isRTL(e2));
  let c2 = await l4.getElementRects({ reference: t2, floating: e2, strategy: o3 }), { x: f3, y: u3 } = i(c2, r3, s2), m3 = r3, g2 = {}, d2 = 0;
  for (let n4 = 0; n4 < a2.length; n4++) {
    const { name: p2, fn: h2 } = a2[n4], { x: y2, y: x3, data: w3, reset: v2 } = await h2({ x: f3, y: u3, initialPlacement: r3, placement: m3, strategy: o3, middlewareData: g2, rects: c2, platform: l4, elements: { reference: t2, floating: e2 } });
    f3 = null != y2 ? y2 : f3, u3 = null != x3 ? x3 : u3, g2 = { ...g2, [p2]: { ...g2[p2], ...w3 } }, v2 && d2 <= 50 && (d2++, "object" == typeof v2 && (v2.placement && (m3 = v2.placement), v2.rects && (c2 = true === v2.rects ? await l4.getElementRects({ reference: t2, floating: e2, strategy: o3 }) : v2.rects), { x: f3, y: u3 } = i(c2, m3, s2)), n4 = -1);
  }
  return { x: f3, y: u3, placement: m3, strategy: o3, middlewareData: g2 };
};
function l(t2) {
  return { ...t2, top: t2.y, left: t2.x, right: t2.x + t2.width, bottom: t2.y + t2.height };
}
var x = ["top", "right", "bottom", "left"];
var w = x.reduce((t2, e2) => t2.concat(e2, e2 + "-start", e2 + "-end"), []);

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
function c(t2) {
  return t2 instanceof o2(t2).HTMLElement;
}
function s(t2) {
  return t2 instanceof o2(t2).Element;
}
function f(t2) {
  if ("undefined" == typeof ShadowRoot)
    return false;
  return t2 instanceof o2(t2).ShadowRoot || t2 instanceof ShadowRoot;
}
function u(t2) {
  const { overflow: e2, overflowX: n3, overflowY: o3, display: r3 } = i2(t2);
  return /auto|scroll|overlay|hidden/.test(e2 + o3 + n3) && !["inline", "contents"].includes(r3);
}
function d(t2) {
  return ["table", "td", "th"].includes(r2(t2));
}
function h(t2) {
  const e2 = /firefox/i.test(l2()), n3 = i2(t2);
  return "none" !== n3.transform || "none" !== n3.perspective || e2 && "filter" === n3.willChange || e2 && !!n3.filter && "none" !== n3.filter || ["transform", "perspective"].some((t3) => n3.willChange.includes(t3)) || ["paint", "layout", "strict", "content"].some((t3) => {
    const e3 = n3.contain;
    return null != e3 && e3.includes(t3);
  });
}
function a() {
  return !/^((?!chrome|android).)*safari/i.test(l2());
}
function g(t2) {
  return ["html", "body", "#document"].includes(r2(t2));
}
var m = Math.min;
var p = Math.max;
var w2 = Math.round;
function v(t2, e2, n3) {
  var i3, r3, l4, f3;
  void 0 === e2 && (e2 = false), void 0 === n3 && (n3 = false);
  const u3 = t2.getBoundingClientRect();
  let d2 = 1, h2 = 1;
  e2 && c(t2) && (d2 = t2.offsetWidth > 0 && w2(u3.width) / t2.offsetWidth || 1, h2 = t2.offsetHeight > 0 && w2(u3.height) / t2.offsetHeight || 1);
  const g2 = s(t2) ? o2(t2) : window, m3 = !a() && n3, p2 = (u3.left + (m3 && null != (i3 = null == (r3 = g2.visualViewport) ? void 0 : r3.offsetLeft) ? i3 : 0)) / d2, v2 = (u3.top + (m3 && null != (l4 = null == (f3 = g2.visualViewport) ? void 0 : f3.offsetTop) ? l4 : 0)) / h2, y2 = u3.width / d2, x3 = u3.height / h2;
  return { width: y2, height: x3, top: v2, right: p2 + y2, bottom: v2 + x3, left: p2, x: p2, y: v2 };
}
function y(t2) {
  return (e2 = t2, (e2 instanceof o2(e2).Node ? t2.ownerDocument : t2.document) || window.document).documentElement;
  var e2;
}
function x2(t2) {
  return s(t2) ? { scrollLeft: t2.scrollLeft, scrollTop: t2.scrollTop } : { scrollLeft: t2.pageXOffset, scrollTop: t2.pageYOffset };
}
function b(t2) {
  return v(y(t2)).left + x2(t2).scrollLeft;
}
function L(t2, e2, n3) {
  const o3 = c(e2), i3 = y(e2), l4 = v(t2, o3 && function(t3) {
    const e3 = v(t3);
    return w2(e3.width) !== t3.offsetWidth || w2(e3.height) !== t3.offsetHeight;
  }(e2), "fixed" === n3);
  let s2 = { scrollLeft: 0, scrollTop: 0 };
  const f3 = { x: 0, y: 0 };
  if (o3 || !o3 && "fixed" !== n3)
    if (("body" !== r2(e2) || u(i3)) && (s2 = x2(e2)), c(e2)) {
      const t3 = v(e2, true);
      f3.x = t3.x + e2.clientLeft, f3.y = t3.y + e2.clientTop;
    } else
      i3 && (f3.x = b(i3));
  return { x: l4.left + s2.scrollLeft - f3.x, y: l4.top + s2.scrollTop - f3.y, width: l4.width, height: l4.height };
}
function R(t2) {
  return "html" === r2(t2) ? t2 : t2.assignedSlot || t2.parentNode || (f(t2) ? t2.host : null) || y(t2);
}
function E(t2) {
  return c(t2) && "fixed" !== i2(t2).position ? t2.offsetParent : null;
}
function T(t2) {
  const e2 = o2(t2);
  let n3 = E(t2);
  for (; n3 && d(n3) && "static" === i2(n3).position; )
    n3 = E(n3);
  return n3 && ("html" === r2(n3) || "body" === r2(n3) && "static" === i2(n3).position && !h(n3)) ? e2 : n3 || function(t3) {
    let e3 = R(t3);
    for (f(e3) && (e3 = e3.host); c(e3) && !g(e3); ) {
      if (h(e3))
        return e3;
      {
        const t4 = e3.parentNode;
        e3 = f(t4) ? t4.host : t4;
      }
    }
    return null;
  }(t2) || e2;
}
function W(t2) {
  if (c(t2))
    return { width: t2.offsetWidth, height: t2.offsetHeight };
  const e2 = v(t2);
  return { width: e2.width, height: e2.height };
}
function H(t2) {
  const e2 = R(t2);
  return g(e2) ? t2.ownerDocument.body : c(e2) && u(e2) ? e2 : H(e2);
}
function C(t2, e2) {
  var n3;
  void 0 === e2 && (e2 = []);
  const i3 = H(t2), r3 = i3 === (null == (n3 = t2.ownerDocument) ? void 0 : n3.body), l4 = o2(i3), c2 = r3 ? [l4].concat(l4.visualViewport || [], u(i3) ? i3 : []) : i3, s2 = e2.concat(c2);
  return r3 ? s2 : s2.concat(C(c2));
}
function D(e2, n3, r3) {
  return "viewport" === n3 ? l(function(t2, e3) {
    const n4 = o2(t2), i3 = y(t2), r4 = n4.visualViewport;
    let l4 = i3.clientWidth, c2 = i3.clientHeight, s2 = 0, f3 = 0;
    if (r4) {
      l4 = r4.width, c2 = r4.height;
      const t3 = a();
      (t3 || !t3 && "fixed" === e3) && (s2 = r4.offsetLeft, f3 = r4.offsetTop);
    }
    return { width: l4, height: c2, x: s2, y: f3 };
  }(e2, r3)) : s(n3) ? function(t2, e3) {
    const n4 = v(t2, false, "fixed" === e3), o3 = n4.top + t2.clientTop, i3 = n4.left + t2.clientLeft;
    return { top: o3, left: i3, x: i3, y: o3, right: i3 + t2.clientWidth, bottom: o3 + t2.clientHeight, width: t2.clientWidth, height: t2.clientHeight };
  }(n3, r3) : l(function(t2) {
    var e3;
    const n4 = y(t2), o3 = x2(t2), r4 = null == (e3 = t2.ownerDocument) ? void 0 : e3.body, l4 = p(n4.scrollWidth, n4.clientWidth, r4 ? r4.scrollWidth : 0, r4 ? r4.clientWidth : 0), c2 = p(n4.scrollHeight, n4.clientHeight, r4 ? r4.scrollHeight : 0, r4 ? r4.clientHeight : 0);
    let s2 = -o3.scrollLeft + b(t2);
    const f3 = -o3.scrollTop;
    return "rtl" === i2(r4 || n4).direction && (s2 += p(n4.clientWidth, r4 ? r4.clientWidth : 0) - l4), { width: l4, height: c2, x: s2, y: f3 };
  }(y(e2)));
}
function N(t2) {
  const e2 = C(t2), n3 = function(t3, e3) {
    let n4 = t3;
    for (; n4 && !g(n4) && !e3.includes(n4) && (!s(n4) || !["absolute", "fixed"].includes(i2(n4).position)); ) {
      const t4 = R(n4);
      n4 = f(t4) ? t4.host : t4;
    }
    return n4;
  }(t2, e2);
  let o3 = null;
  if (n3 && c(n3)) {
    const t3 = T(n3);
    u(n3) ? o3 = n3 : c(t3) && (o3 = t3);
  }
  return s(o3) ? e2.filter((t3) => o3 && s(t3) && function(t4, e3) {
    const n4 = null == e3.getRootNode ? void 0 : e3.getRootNode();
    if (t4.contains(e3))
      return true;
    if (n4 && f(n4)) {
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
  const r3 = [..."clippingAncestors" === n3 ? N(e2) : [].concat(n3), o3], l4 = r3[0], c2 = r3.reduce((t3, n4) => {
    const o4 = D(e2, n4, i3);
    return t3.top = p(o4.top, t3.top), t3.right = m(o4.right, t3.right), t3.bottom = m(o4.bottom, t3.bottom), t3.left = p(o4.left, t3.left), t3;
  }, D(e2, l4, i3));
  return { width: c2.right - c2.left, height: c2.bottom - c2.top, x: c2.left, y: c2.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(t2) {
  let { rect: e2, offsetParent: n3, strategy: o3 } = t2;
  const i3 = c(n3), l4 = y(n3);
  if (n3 === l4)
    return e2;
  let s2 = { scrollLeft: 0, scrollTop: 0 };
  const f3 = { x: 0, y: 0 };
  if ((i3 || !i3 && "fixed" !== o3) && (("body" !== r2(n3) || u(l4)) && (s2 = x2(n3)), c(n3))) {
    const t3 = v(n3, true);
    f3.x = t3.x + n3.clientLeft, f3.y = t3.y + n3.clientTop;
  }
  return { ...e2, x: e2.x - s2.scrollLeft + f3.x, y: e2.y - s2.scrollTop + f3.y };
}, isElement: s, getDimensions: W, getOffsetParent: T, getDocumentElement: y, getElementRects: (t2) => {
  let { reference: e2, floating: n3, strategy: o3 } = t2;
  return { reference: L(e2, T(n3), o3), floating: { ...W(n3), x: 0, y: 0 } };
}, getClientRects: (t2) => Array.from(t2.getClientRects()), isRTL: (t2) => "rtl" === i2(t2).direction };
function z(t2, e2, n3, o3) {
  void 0 === o3 && (o3 = {});
  const { ancestorScroll: i3 = true, ancestorResize: r3 = true, elementResize: l4 = true, animationFrame: c2 = false } = o3, f3 = i3 && !c2, u3 = f3 || r3 ? [...s(t2) ? C(t2) : t2.contextElement ? C(t2.contextElement) : [], ...C(e2)] : [];
  u3.forEach((t3) => {
    f3 && t3.addEventListener("scroll", n3, { passive: true }), r3 && t3.addEventListener("resize", n3);
  });
  let d2, h2 = null;
  if (l4) {
    let o4 = true;
    h2 = new ResizeObserver(() => {
      o4 || n3(), o4 = false;
    }), s(t2) && !c2 && h2.observe(t2), s(t2) || !t2.contextElement || c2 || h2.observe(t2.contextElement), h2.observe(e2);
  }
  let a2 = c2 ? v(t2) : null;
  return c2 && function e3() {
    const o4 = v(t2);
    !a2 || o4.x === a2.x && o4.y === a2.y && o4.width === a2.width && o4.height === a2.height || n3();
    a2 = o4, d2 = requestAnimationFrame(e3);
  }(), n3(), () => {
    var t3;
    u3.forEach((t4) => {
      f3 && t4.removeEventListener("scroll", n3), r3 && t4.removeEventListener("resize", n3);
    }), null == (t3 = h2) || t3.disconnect(), h2 = null, c2 && cancelAnimationFrame(d2);
  };
}
var A = (t2, n3, o3) => o(t2, n3, { platform: S, ...o3 });

// js/sprout_ui/components/floating.ts
var Hook = {
  getConfig() {
    return JSON.parse(this.el.dataset.floating);
  },
  mounted() {
    const config = this.getConfig();
    this.updateElement = () => {
      const config2 = this.getConfig();
      const reference = document.querySelector(config2.reference);
      const placement = config2.placement;
      this.autoUpdate = config2.autoUpdate;
      console.log("inside updating function", `autoupdate: ${this.autoUpdate}`);
      A(reference, this.el, {
        placement,
        middleware: []
      }).then(({ x: x3, y: y2 }) => {
        Object.assign(this.el.style, {
          left: `${x3}px`,
          top: `${y2}px`
        });
      });
    };
    if (config.autoUpdate) {
      const reference = document.querySelector(config.reference);
      this.cleanup = z(reference, this.el, this.updateElement);
    } else {
      this.updateElement();
    }
  },
  updated() {
    if (this.autoUpdate)
      return;
    console.log("mannuly updated");
    this.updateElement();
  },
  destroyed() {
    var _a;
    (_a = this.cleanup) == null ? void 0 : _a.call(this);
  }
};
var floating = (opts) => ({
  hook: () => {
    var _a;
    const name = (_a = opts == null ? void 0 : opts.hook) != null ? _a : "Floating";
    return { [name]: Hook };
  },
  handleDomChange: (from, to) => {
    if (from.dataset.floating) {
      if (from.getAttribute("style") === null) {
        to.removeAttribute("style");
      } else {
        to.setAttribute("style", from.getAttribute("style"));
      }
    }
  }
});
var floating_default = floating;

// node_modules/.pnpm/@tunkshif+vanilla-transition@0.1.2/node_modules/@tunkshif/vanilla-transition/dist/vanilla-transition.mjs
var m2 = (t2) => ({
  enter: t2.dataset.enter,
  enterFrom: t2.dataset.enterFrom,
  enterTo: t2.dataset.enterTo,
  leave: t2.dataset.leave,
  leaveFrom: t2.dataset.leaveFrom,
  leaveTo: t2.dataset.leaveTo
});
var u2 = (t2, s2) => {
  const a2 = () => {
    s2(), t2.removeEventListener("transitionend", a2, false);
  };
  t2.addEventListener("transitionend", a2, false);
};
var l3 = (t2, s2, a2) => {
  const e2 = Object.fromEntries(
    Object.entries(a2).map(([c2, r3]) => {
      var d2;
      return [c2, (d2 = r3 == null ? void 0 : r3.split(" ").filter(Boolean)) != null ? d2 : []];
    })
  );
  let n3, i3, o3;
  switch (s2) {
    case "show":
      n3 = e2.enter, i3 = e2.enterFrom, o3 = e2.enterTo;
      break;
    case "hide":
      n3 = e2.leave, i3 = e2.leaveFrom, o3 = e2.leaveTo;
      break;
  }
  s2 === "show" && (t2.removeAttribute("hidden"), t2.style.display = ""), t2.classList.add(...n3, ...i3), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t2.classList.remove(...i3), t2.classList.add(...o3), u2(t2, () => {
        t2.classList.remove(...n3), s2 === "hide" && (t2.style.display = "none");
      });
    });
  });
};
var b2 = (t2, s2, a2) => {
  const e2 = Object.assign(
    {
      attribute: "data-transition-state",
      states: {
        show: "show",
        hide: "hide"
      }
    },
    a2
  ), n3 = s2.getAttribute(e2.attribute), i3 = m2(t2);
  n3 === e2.states.hide ? t2.style.display = "none" : t2.style.display = "";
  const o3 = new MutationObserver((c2) => {
    for (const r3 of c2)
      if (r3.attributeName === e2.attribute) {
        const d2 = s2.getAttribute(e2.attribute) === e2.states.show ? "show" : "hide";
        l3(t2, d2, i3);
      }
  });
  return o3.observe(s2, { attributes: true }), () => o3.disconnect();
};
var f2 = {
  init: b2
};
typeof window < "u" && (window.VanillaTransition = f2);

// js/sprout_ui/components/transition.ts
var Hook2 = {
  getConfig() {
    return JSON.parse(this.el.dataset.observing);
  },
  mounted() {
    const config = this.getConfig();
    const observing = document.querySelector(config.on) || this.el;
    this.cleanup = f2.init(this.el, observing, config.opts);
  },
  destroyed() {
    this.cleanup();
  }
};
var transition = (opts) => ({
  hook: () => {
    var _a;
    const name = (_a = opts == null ? void 0 : opts.hook) != null ? _a : "Transition";
    return { [name]: Hook2 };
  },
  handleDomChange: (from, to) => {
    if (from.dataset.observing) {
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
//# sourceMappingURL=sprout_ui.cjs.map
