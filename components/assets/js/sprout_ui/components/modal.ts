import type { SproutComponentSetup } from "../types";

export class ModalElement extends HTMLElement {
  open: boolean = false;

  private disableScrolling = true;
  private containerEl: HTMLElement | null | undefined;

  static get observedAttributes() {
    return ["data-ui-state"];
  }

  constructor() {
    super();
    this.disableScrolling = Boolean(this.dataset.disableScrolling) || this.disableScrolling;
    this.containerEl = this.getContainerEl();
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown) {
    if (oldValue === newValue) return;
    if (name === "data-ui-state") {
      this.open = newValue === "open";
    }

    this.update();
  }

  private getContainerEl() {
    return this.querySelector<HTMLElement>("[data-part=container]");
  }

  private update() {
    if (this.open) {
      this.execOnOpenJs();
      this.toggleScrolling("off");
      document.addEventListener("click", this.handleClick);
      document.addEventListener("keydown", this.handleKeyDown);
    } else {
      this.toggleScrolling("on");
      document.removeEventListener("click", this.handleClick);
      document.removeEventListener("keydown", this.handleKeyDown);
    }
  }

  private handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!(this.containerEl?.isSameNode(target) || this.containerEl?.contains(target))) {
      this.dataset.uiState = "";
      this.execOnCloseJs();
      document.removeEventListener("click", this.handleClick);
    }
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key;
    if (key === "Escape" || key === "Esc") {
      this.dataset.uiState = "";
      this.execOnCloseJs();
      document.removeEventListener("keydown", this.handleKeyDown);
    }
  };

  private execOnOpenJs() {
    if (this.dataset.onOpenJs) {
      window.liveSocket.execJS(this, this.dataset.onOpenJs);
    }
  }

  private execOnCloseJs() {
    if (this.dataset.onCloseJs) {
      window.liveSocket.execJS(this, this.dataset.onCloseJs);
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

const modal: SproutComponentSetup = opts => ({
  init: () => {
    const element = opts?.element || "sprt-modal";
    customElements.define(element, ModalElement);
  }
});

export default modal;
