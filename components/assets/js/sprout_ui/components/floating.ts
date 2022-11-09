import { autoUpdate, computePosition, flip, offset, shift, arrow } from "@floating-ui/dom";
import type { Middleware, Placement } from "@floating-ui/dom";
import type { SproutComponentSetup } from "../types";

const MIDDLEWARES = {
  offset,
  shift,
  flip,
  arrow
} as { [key: string]: (options: unknown) => Middleware };

class FloatingElement extends HTMLElement {
  active: boolean = false;

  private anchorEl: HTMLElement | null | undefined;
  private arrowEl: HTMLElement | null | undefined;
  private middleware: Middleware[];
  private cleanup: ReturnType<typeof autoUpdate> | undefined;

  static get observedAttributes() {
    return ["data-ui-state", "data-placement"];
  }

  constructor() {
    super();
    this.anchorEl = this.getAnchorEl();
    this.middleware = this.getMiddleware();
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

  get placement() {
    return (this.dataset.placement || "bottom") as Placement;
  }

  private getAnchorEl() {
    if (!this.dataset.anchor) return null;
    return document.querySelector<HTMLElement>(this.dataset.anchor);
  }

  private getMiddleware() {
    const middlewares = JSON.parse(this.dataset.middleware || "[]") as [string, unknown][];

    const arrow = middlewares.find(([name]) => name === "arrow") as [string, any];
    if (arrow) {
      const element = arrow[1]["element"];
      this.arrowEl = this.querySelector<HTMLElement>(element);
      arrow[1]["element"] = this.arrowEl;
    }

    return middlewares.map(([name, options]) => MIDDLEWARES[name](options));
  }

  private start() {
    if (!this.anchorEl) return;
    this.cleanup = autoUpdate(this.anchorEl, this, this.update.bind(this));
  }

  private stop() {
    this.cleanup?.();
  }

  private update() {
    if (!this.active || !this.anchorEl) return;

    computePosition(this.anchorEl, this, {
      placement: this.placement,
      middleware: this.middleware
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(this.style, {
        left: `${x}px`,
        top: `${y}px`
      });

      if (middlewareData.arrow && this.arrowEl) {
        const { x: arrowX, y: arrowY } = middlewareData.arrow;

        const staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right"
        }[placement.split("-")[0]] as string;

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
