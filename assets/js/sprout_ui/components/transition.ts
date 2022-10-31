import VanillaTransition from "@tunkshif/vanilla-transition"
import type { SproutHook, SproutComponentSetup } from "../types"

interface TransitionConfig {
  on: string
  opts: {
    attribute: string
    states: {
      show: string
      hide: string
    }
  }
}

const Hook = {
  getConfig() {
    return JSON.parse(this.el.dataset.observing)
  },
  mounted() {
    const config = this.getConfig() as TransitionConfig
    const observing = document.querySelector<HTMLElement>(config.on) || this.el
    this.cleanup = VanillaTransition.init(this.el, observing, config.opts)
  },
  destroyed() {
    this.cleanup()
  }
} as SproutHook

const transition: SproutComponentSetup = (opts) => ({
  hook: () => {
    const name = opts?.hook ?? "Transition"
    return { [name]: Hook }
  },
  handleDomChange: (from, to) => {
    if (from.dataset.observing) {
      if (from.getAttribute("style") === null) {
        to.removeAttribute("style")
      } else {
        to.setAttribute("style", from.getAttribute("style")!)
      }

      if (from.getAttribute("hidden") === null) {
        to.removeAttribute("hidden")
      } else {
        to.setAttribute("hidden", "true")
      }
    }
  }
})

export default transition
