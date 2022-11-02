import { createTransitionObserever, TransitionOptions } from "@tunkshif/vanilla-transition";
import type { TransitionClasses } from "@tunkshif/vanilla-transition";
import type { SproutHook, SproutComponentSetup } from "../types";

interface TransitionConfig {
  on: string;
  options: TransitionOptions;
}

const getTransitionClasses = (el: HTMLElement) =>
  Object.fromEntries(
    ["enter", "leave"]
      .map(v => [v, `${v}From`, `${v}To`])
      .flat()
      .map(key => [key, el.dataset[key]?.split(" ")?.filter(Boolean) ?? []] as const)
  ) as TransitionClasses;

const Hook = {
  getConfig() {
    const config = JSON.parse(this.el.dataset.observing) as TransitionConfig;
    const classes = getTransitionClasses(this.el);
    config.options.classes = classes;
    return config;
  },
  mounted() {
    const config = this.getConfig() as TransitionConfig;
    const observing = document.querySelector<HTMLElement>(config.on) || this.el;
    this.cleanup = createTransitionObserever(this.el, observing, config.options);
  },
  destroyed() {
    this.cleanup?.();
  }
} as SproutHook;

const transition: SproutComponentSetup = opts => ({
  hook: () => {
    const name = opts?.hook ?? "Transition";
    return { [name]: Hook };
  },
  handleDomChange: (from, to) => {
    if (from.dataset.observing) {
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
