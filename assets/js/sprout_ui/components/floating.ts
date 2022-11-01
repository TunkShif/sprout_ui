import { autoUpdate, computePosition, offset } from "@floating-ui/dom"
import type { Middleware } from "@floating-ui/dom"
import type { SproutHook, SproutComponentSetup } from "../types"

interface FloatingConfig {
  reference: string
  placement:
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  autoUpdate: boolean
  middleware: any[]
}

const Hook = {
  getConfig() {
    return JSON.parse(this.el.dataset.floating)
  },
  mounted() {
    const config = this.getConfig() as FloatingConfig

    this.updateElement = () => {
      const config = this.getConfig() as FloatingConfig
      const reference = document.querySelector(config.reference)!
      const placement = config.placement

      this.autoUpdate = config.autoUpdate
      console.log("inside updating function", `autoupdate: ${this.autoUpdate}`)

      computePosition(reference, this.el, {
        placement: placement,
        middleware: [] // TODO
      }).then(({ x, y }) => {
        Object.assign(this.el.style, {
          left: `${x}px`,
          top: `${y}px`
        })
      })
    }

    if (config.autoUpdate) {
      const reference = document.querySelector(config.reference)!
      this.cleanup = autoUpdate(reference, this.el, this.updateElement)
    } else {
      this.updateElement()
    }
  },
  updated() {
    if (this.autoUpdate) return
    console.log("mannuly updated")
    this.updateElement()
  },
  destroyed() {
    this.cleanup?.()
  }
} as SproutHook

const floating: SproutComponentSetup = (opts) => ({
  hook: () => {
    const name = opts?.hook ?? "Floating"
    return { [name]: Hook }
  },
  handleDomChange: (from, to) => {
    if (from.dataset.floating) {
      if (from.getAttribute("style") === null) {
        to.removeAttribute("style")
      } else {
        to.setAttribute("style", from.getAttribute("style")!)
      }
    }
  }
})

export default floating
