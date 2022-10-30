import VanillaTransition from "@tunkshif/vanilla-transition"
import type { SproutHook, SproutComponentSetup } from "../types"

const Hook = {
  getConfig() {
    return {
      observing: this.el.dataset.observeOn,
      options: {
        attribute: this.el.dataset.observeAttr,
        states: {
          show: this.el.dataset.observeStateShow,
          hide: this.el.dataset.observeStateHide
        }
      }
    }
  },
  mounted() {
    const config = this.getConfig()
    const observing = document.querySelector<HTMLElement>(config.observing) || this.el
    this.cleanup = VanillaTransition.init(this.el, observing, config.options)
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
    if (from.dataset.observeOn) {
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
