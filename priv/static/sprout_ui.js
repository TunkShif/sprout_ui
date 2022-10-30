"use strict";
var SproutUI = (() => {
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
    modal: () => modal_default,
    transition: () => transition_default
  });

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
  var init = () => {
    window.addEventListener("sprt:modal:open", (e) => {
      const { target, detail } = e;
      queryModalParts(target).forEach(
        (el) => el == null ? void 0 : el.setAttribute("data-state", "open" /* OPEN */)
      );
      toggleScrolling("disable", detail.disable_scrolling);
    });
    window.addEventListener("sprt:modal:close", (e) => {
      const { target, detail } = e;
      const [modal2, overlay, container] = queryModalParts(target);
      overlay == null ? void 0 : overlay.setAttribute("data-state", "closed" /* CLOSED */);
      container == null ? void 0 : container.setAttribute("data-state", "closed" /* CLOSED */);
      toggleScrolling("enable", detail.disable_scrolling);
      if (detail.await_animation) {
        const handler = () => {
          modal2.setAttribute("data-state", "closed" /* CLOSED */);
          modal2.removeEventListener("animationend", handler, false);
        };
        modal2.addEventListener("animationend", handler, false);
      } else {
        modal2.setAttribute("data-state", "closed" /* CLOSED */);
      }
    });
  };
  var modal = () => ({
    init
  });
  var modal_default = modal;

  // node_modules/.pnpm/@tunkshif+vanilla-transition@0.1.2/node_modules/@tunkshif/vanilla-transition/dist/vanilla-transition.mjs
  var m = (t) => ({
    enter: t.dataset.enter,
    enterFrom: t.dataset.enterFrom,
    enterTo: t.dataset.enterTo,
    leave: t.dataset.leave,
    leaveFrom: t.dataset.leaveFrom,
    leaveTo: t.dataset.leaveTo
  });
  var u = (t, s) => {
    const a = () => {
      s(), t.removeEventListener("transitionend", a, false);
    };
    t.addEventListener("transitionend", a, false);
  };
  var l = (t, s, a) => {
    const e = Object.fromEntries(
      Object.entries(a).map(([c, r]) => {
        var d;
        return [c, (d = r == null ? void 0 : r.split(" ").filter(Boolean)) != null ? d : []];
      })
    );
    let n, i, o;
    switch (s) {
      case "show":
        n = e.enter, i = e.enterFrom, o = e.enterTo;
        break;
      case "hide":
        n = e.leave, i = e.leaveFrom, o = e.leaveTo;
        break;
    }
    s === "show" && (t.removeAttribute("hidden"), t.style.display = ""), t.classList.add(...n, ...i), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        t.classList.remove(...i), t.classList.add(...o), u(t, () => {
          t.classList.remove(...n), s === "hide" && (t.style.display = "none");
        });
      });
    });
  };
  var b = (t, s, a) => {
    const e = Object.assign(
      {
        attribute: "data-transition-state",
        states: {
          show: "show",
          hide: "hide"
        }
      },
      a
    ), n = s.getAttribute(e.attribute), i = m(t);
    n === e.states.hide ? t.style.display = "none" : t.style.display = "";
    const o = new MutationObserver((c) => {
      for (const r of c)
        if (r.attributeName === e.attribute) {
          const d = s.getAttribute(e.attribute) === e.states.show ? "show" : "hide";
          l(t, d, i);
        }
    });
    return o.observe(s, { attributes: true }), () => o.disconnect();
  };
  var f = {
    init: b
  };
  typeof window < "u" && (window.VanillaTransition = f);

  // js/sprout_ui/components/transition.ts
  var Hook = {
    getConfig() {
      return {
        observing: this.el.dataset.observeOn,
        options: {
          attribute: this.el.dataset.observeAttr,
          states: {
            show: this.el.dataset.observeStateShow,
            hide: this.el.dataset.observeStateHide
          }
        }
      };
    },
    mounted() {
      const config = this.getConfig();
      const observing = document.querySelector(config.observing) || this.el;
      this.cleanup = f.init(this.el, observing, config.options);
    },
    destroyed() {
      this.cleanup();
    }
  };
  var transition = (opts) => ({
    hook: () => {
      var _a;
      const name = (_a = opts == null ? void 0 : opts.hook) != null ? _a : "Transition";
      return { [name]: Hook };
    },
    handleDomChange: (from, to) => {
      if (from.dataset.observeOn) {
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
    const components = opts.components;
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
