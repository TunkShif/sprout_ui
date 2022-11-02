import type { SproutComponentSetup, SproutEvent } from "../types";

interface ModalInitOptions {
  disableScrolling: boolean;
  awaitCloseAnimation: boolean;
}

type ModalInitEvent = SproutEvent<{ options: ModalInitOptions }>;
type ModalShowEvent = SproutEvent;
type ModalHideEvent = SproutEvent;

class Modal {
  private modal: HTMLElement;
  private disableScrolling: boolean;
  private awaitCloseAnimation: boolean;

  constructor(el: HTMLElement, options: ModalInitOptions) {
    this.modal = el;
    this.disableScrolling = options.disableScrolling;
    this.awaitCloseAnimation = options.awaitCloseAnimation;
  }

  open() {
    this.parts.forEach(el => el?.setAttribute("data-ui-state", "open"));
    this.toggleScrolling("off");
  }

  close() {
    this.overlay?.setAttribute("data-ui-state", "");
    this.container?.setAttribute("data-ui-state", "");

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

  private get overlay() {
    return this.modal.querySelector<HTMLElement>(`[data-part=overlay]`);
  }

  private get container() {
    return this.modal.querySelector<HTMLElement>(`[data-part=container]`);
  }

  private get parts() {
    return [this.modal, this.overlay, this.container];
  }

  private toggleScrolling(state: "on" | "off") {
    if (!this.disableScrolling) return;
    switch (state) {
      case "on":
        Object.assign(document.body.style, { overflow: "" });
        break;
      case "off":
        Object.assign(document.body.style, { overflow: "hidden" });
        break;
    }
  }
}

const init = () => {
  const modals = new WeakMap<Element, Modal>();

  window.addEventListener("sprt:modal:init", e => {
    const { target, detail } = e as ModalInitEvent;
    modals.set(target, new Modal(target, detail.options));
  });

  window.addEventListener("sprt:modal:open", e => {
    const { target } = e as ModalShowEvent;
    const modal = modals.get(target);
    modal?.open();
  });

  window.addEventListener("sprt:modal:close", e => {
    const { target } = e as ModalHideEvent;
    const modal = modals.get(target);
    modal?.close();
  });
};

const modal: SproutComponentSetup = () => ({
  init
});

export default modal;
