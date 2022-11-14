import type { SproutComponentSetup, SproutEvent } from "../types";

class Modal {
  private modal: HTMLElement;

  constructor(el: HTMLElement) {
    this.modal = el;
  }

  init() {
    this.modal.addEventListener("sprt:modal:open", this.handleModalOpen);
    this.modal.addEventListener("sprt:modal:close", this.handleModalClose);
  }

  cleanup() {
    this.modal.removeEventListener("sprt:modal:open", this.handleModalOpen);
    this.modal.removeEventListener("sprt:modal:close", this.handleModalClose);
  }

  get disableScrolling() {
    return !!this.modal.dataset.disableScrolling;
  }

  private handleModalOpen = () => {
    this.execOnOpenJS();
    this.toggleScrolling("off");
  };

  private handleModalClose = () => {
    this.execOnCloseJS();
    this.toggleScrolling("on");
  };

  private execOnOpenJS() {
    if (this.modal.dataset.onOpenJs) {
      window.liveSocket.execJS(this.modal, this.modal.dataset.onOpenJs);
    }
  }

  private execOnCloseJS() {
    if (this.modal.dataset.onCloseJs) {
      window.liveSocket.execJS(this.modal, this.modal.dataset.onCloseJs);
    }
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
    const { target } = e as SproutEvent;
    modals.set(target, new Modal(target));
  });

  window.addEventListener("sprt:modal:remove", e => {
    const { target } = e as SproutEvent;
    const modal = modals.get(target);
    modal?.cleanup();
  });
};

const modal: SproutComponentSetup = () => ({
  init
});

export default modal;
