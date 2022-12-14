import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  Middleware,
  offset,
  Placement,
  shift
} from "@floating-ui/dom"
import { LiveMixin, attr, query } from "@tunkshif/live-element"
import { SproutComponentSetup } from "../types"
import { isTruthy, isVisible } from "../utils"

export class FloatingElement extends LiveMixin(HTMLDivElement) {
  anchor: HTMLElement
  @query("arrow", { part: true })
  arrow: HTMLElement | null

  @attr("data-placement")
  placement: Placement
  @attr("data-offset", { converter: Number })
  offset: number
  @attr("data-shift", { converter: isTruthy })
  shift: boolean
  @attr("data-flip", { converter: isTruthy })
  flip: boolean

  private middleware: Middleware[]
  private cleanup: ReturnType<typeof autoUpdate> | undefined

  static get observedAttributes() {
    return ["data-placement"]
  }

  connectedCallback() {
    const anchor = document.querySelector<HTMLElement>(this.dataset.anchor!)
    if (!anchor) throw new Error("Floating element must have an anchor element")

    this.anchor = anchor
    this.middleware = this.buildMiddleware()
    this.start()
  }

  updatedCallback(
    _attribute: string,
    _oldValue: string | null | undefined,
    _newValue: string | null | undefined
  ) {
    this.update()
  }

  disconnectedCallback() {
    this.cleanup?.()
  }

  private buildMiddleware() {
    const middleware: Middleware[] = []
    if (this.offset) middleware.push(offset(this.offset))
    if (this.shift) middleware.push(shift({ rootBoundary: "document" }))
    if (this.flip) middleware.push(flip())
    if (this.arrow) middleware.push(arrow({ element: this.arrow }))
    return middleware
  }

  start() {
    this.cleanup = autoUpdate(this.anchor, this, this.update.bind(this))
  }

  update() {
    if (!isVisible(this)) return
    computePosition(this.anchor, this, {
      placement: this.placement,
      middleware: this.middleware
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(this.style, {
        left: `${x}px`,
        top: `${y}px`
      })

      if (middlewareData.arrow && this.arrow) {
        const { x: arrowX, y: arrowY } = middlewareData.arrow

        const staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right"
        }[placement.split("-")[0]] as string

        Object.assign(this.arrow.style, {
          left: arrowX != null ? `${arrowX}px` : "",
          top: arrowY != null ? `${arrowY}px` : "",
          right: "",
          bottom: "",
          [staticSide]: "-4px"
        })
      }
    })
  }
}

const Floating: SproutComponentSetup = () => ({
  init: () => {
    customElements.define("floating-element", FloatingElement, { extends: "div" })
  },
  handleDomChange: (from, to) => {
    if (from.getAttribute("is") === "floating-element") {
      to.setAttribute("style", from.getAttribute("style")!)
    }
  }
})

export default Floating
