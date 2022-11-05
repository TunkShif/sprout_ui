import { createTransitionObserever, TransitionOptions } from "@tunkshif/vanilla-transition";
import type { SproutComponentSetup, SproutEvent } from "../types";

interface TransitionConfig {
  on: string;
  options: TransitionOptions;
}

type TransitionInitEvent = SproutEvent<TransitionConfig>;

class Transition {
  cleanup?: () => void;

  private element: HTMLElement;
  private config: TransitionConfig;

  constructor(element: HTMLElement, config: TransitionConfig) {
    this.element = element;
    this.config = config;
  }

  init() {
    const observing = document.querySelector<HTMLElement>(this.config.on) || this.element;
    this.cleanup = createTransitionObserever(this.element, observing, this.config.options);
  }
}

const init = () => {
  const transitions = new WeakMap<Element, Transition>();

  window.addEventListener("sprt:transition:init", e => {
    const { target, detail } = e as TransitionInitEvent;
    const transition = new Transition(target, detail);
    transitions.set(target, transition);

    transition.init();
  });

  window.addEventListener("sprt:transition:cleanup", e => {
    const { target } = e as SproutEvent;
    const transition = transitions.get(target);

    transition?.cleanup?.();
  });
};

const transition: SproutComponentSetup = () => ({
  init,
  handleDomChange: (from, to) => {
    if (from.hasAttribute("data-transition")) {
      if (from.getAttribute("style") === null) {
        to.removeAttribute("style");
      } else {
        to.setAttribute("style", from.getAttribute("style")!);
      }

      if (from.getAttribute("hidden") === null) {
        to.removeAttribute("hidden");
      } else {
        to.setAttribute("hidden", "true");
      }
    }
  }
});

export default transition;
