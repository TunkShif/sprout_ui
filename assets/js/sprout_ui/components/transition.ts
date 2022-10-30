import VanillaTransition from "@tunkshif/vanilla-transition"
import type { LiveViewHook, SproutComponentSetup } from "../types"

const Hook = {
  mounted() {
    this.cleanup = VanillaTransition.init(this.el, this.el)
  },
  destroyed() {
    this.cleanup()
  }
} as LiveViewHook

const transition: SproutComponentSetup = (opts) => ({
  hook: () => {
    const name = opts?.hook ?? "Transition"
    return { [name]: Hook }
  },
  handleDomChange: (from, to) => {
    if (from.dataset.transitionState) {
      if (from.getAttribute("style") === null) {
        to.removeAttribute("style")
      } else {
        to.setAttribute("style", from.getAttribute("style")!)
      }
    }
  }
})

export default transition
