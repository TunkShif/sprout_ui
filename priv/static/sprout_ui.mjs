// js/sprout_ui/components/transition.ts
var getProperties = (el) => {
  return {
    enter: el.getAttribute("data-enter"),
    enterFrom: el.getAttribute("data-enter-from"),
    enterTo: el.getAttribute("data-enter-to"),
    leave: el.getAttribute("data-leave"),
    leaveFrom: el.getAttribute("data-leave-from"),
    leaveTo: el.getAttribute("data-leave-to")
  };
};
var waitForTransition = (el, callback) => {
  const handler = () => {
    callback();
    el.removeEventListener("transitionend", handler, false);
  };
  el.addEventListener("transitionend", handler, false);
};
var doTransition = (el, state, props) => {
  const classes = Object.fromEntries(
    Object.entries(props).map(([key, val]) => {
      var _a;
      return [key, (_a = val == null ? void 0 : val.split(" ").filter(Boolean)) != null ? _a : []];
    })
  );
  let base;
  let from;
  let to;
  switch (state) {
    case "show":
      base = classes.enter;
      from = classes.enterFrom;
      to = classes.enterTo;
      break;
    case "hide":
      base = classes.leave;
      from = classes.leaveFrom;
      to = classes.leaveTo;
      break;
  }
  if (state === "show") {
    el.removeAttribute("hidden");
    el.style.display = "";
  }
  el.classList.add(...base, ...from);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.classList.remove(...from);
      el.classList.add(...to);
      waitForTransition(el, () => {
        el.classList.remove(...base);
        if (state === "hide") {
          el.style.display = "none";
        }
      });
    });
  });
};
var init = (wrapper, observing, options) => {
  const opts = Object.assign(
    {
      attribute: "data-transition-state",
      states: {
        show: "show",
        hide: "hide"
      }
    },
    options
  );
  const state = observing.getAttribute(opts.attribute);
  const props = getProperties(wrapper);
  if (state === opts.states.hide) {
    wrapper.style.display = "none";
  } else {
    wrapper.style.display = "";
  }
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === opts.attribute) {
        const mutatedState = observing.getAttribute(opts.attribute) === opts.states.show ? "show" : "hide";
        doTransition(wrapper, mutatedState, props);
      }
    }
  });
  observer.observe(wrapper, { attributes: true });
  return () => observer.disconnect();
};
var TransitionHook = {
  mounted() {
    this.cleanup = init(this.el, this.el);
  },
  updated() {
  },
  destroyed() {
    this.cleanup();
  }
};

// js/sprout_ui/components/modal.ts
var queryModalParts = (modal) => {
  const overlay = modal.querySelector(`[data-part=overlay]`);
  const container = modal.querySelector(`[data-part=container]`);
  return [modal, overlay, container];
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
window.addEventListener("sprt:modal:open", (e) => {
  const { target, detail } = e;
  queryModalParts(target).forEach(
    (el) => el == null ? void 0 : el.setAttribute("data-state", "open" /* OPEN */)
  );
  toggleScrolling("disable", detail.disable_scrolling);
});
window.addEventListener("sprt:modal:close", (e) => {
  const { target, detail } = e;
  const [modal, overlay, container] = queryModalParts(target);
  overlay == null ? void 0 : overlay.setAttribute("data-state", "closed" /* CLOSED */);
  container == null ? void 0 : container.setAttribute("data-state", "closed" /* CLOSED */);
  toggleScrolling("enable", detail.disable_scrolling);
  if (detail.await_animation) {
    const handler = () => {
      modal.setAttribute("data-state", "closed" /* CLOSED */);
      modal.removeEventListener("animationend", handler, false);
    };
    modal.addEventListener("animationend", handler, false);
  } else {
    modal.setAttribute("data-state", "closed" /* CLOSED */);
  }
});

// js/sprout_ui/index.ts
var Hooks = {
  Transition: TransitionHook
};
export {
  Hooks
};
//# sourceMappingURL=sprout_ui.mjs.map
