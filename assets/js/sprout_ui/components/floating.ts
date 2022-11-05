import { autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/dom";
import type { Middleware, Placement } from "@floating-ui/dom";
import type { SproutComponentSetup } from "../types";

const MIDDLEWARES = {
  offset,
  shift,
  flip
} as { [key: string]: (options: unknown) => Middleware };

class FloatingElement extends HTMLElement {
  active: boolean = false;
  private cleanup: ReturnType<typeof autoUpdate> | undefined;

  static get observedAttributes() {
    return ["data-ui-state", "data-placement", "data-middleware"];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.start();
  }

  disconnectedCallback() {
    this.stop();
  }

  attributeChangedCallback(name: string, _oldValue: unknown, newValue: unknown) {
    if (name === "data-ui-state") {
      this.active = newValue === "active";
    }

    if (this.active) {
      this.update();
    }
  }

  get anchor() {
    if (!this.dataset.anchor) return null;
    return document.querySelector<HTMLElement>(this.dataset.anchor);
  }

  get placement() {
    return (this.dataset.placement || "bottom") as Placement;
  }

  get middleware() {
    const middlewares = JSON.parse(this.dataset.middleware || "[]") as [string, unknown][];

    const arrow = middlewares.find(([name]) => name === "arrow") as [string, any];
    if (arrow) {
      const element = arrow[1]["element"];
      arrow[1]["element"] = document.querySelector(element);
    }
    console.log(middlewares);

    return middlewares.map(([name, options]) => MIDDLEWARES[name](options));
  }

  private start() {
    if (!this.anchor) return;
    this.cleanup = autoUpdate(this.anchor, this, this.update.bind(this));
  }

  private stop() {
    this.cleanup?.();
  }

  private update() {
    if (!this.active || !this.anchor) return;

    computePosition(this.anchor, this, {
      placement: this.placement,
      middleware: this.middleware
    }).then(({ x, y }) => {
      Object.assign(this.style, {
        left: `${x}px`,
        top: `${y}px`
      });
    });
  }
}

const floating: SproutComponentSetup = opts => ({
  init: () => {
    const element = opts?.element || "sprt-floating";
    customElements.define(element, FloatingElement);
  },
  handleDomChange: (from, to) => {
    if (from.nodeName.toLowerCase() === (opts?.element || "sprt-floating")) {
      to.setAttribute("style", from.getAttribute("style") || "");
    }
  }
});

export default floating;
