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
//# sourceMappingURL=sprout_ui.mjs.map
