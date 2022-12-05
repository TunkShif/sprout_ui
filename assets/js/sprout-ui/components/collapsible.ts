import { attr, LiveJS, LiveMixin, query } from "@tunkshif/live-element"
import { stopAnimations, waitForAnimation } from "../internal/animation"
import { SproutComponentSetup } from "../types"
import { flipping, isTruthy } from "../utils"
import { Disposables } from "../utils/disposables"

export class CollapsibleElement extends LiveMixin(HTMLDivElement) {
  @query("trigger", { part: true })
  trigger: HTMLElement
  @query("panel", { part: true })
  panel: HTMLElement

  @attr("data-state", { live: true })
  state: "open" | "closed"
  @attr("data-controlled", { live: true, converter: isTruthy })
  controlled: boolean

  private listeners = new Disposables()

  static get observedAttributes() {
    return ["data-state"]
  }

  connectedCallback() {
    if (!this.trigger || !this.panel)
      throw new Error("Collapsible must have a trigger element and a panel element.")

    if (!this.controlled) this.addEventListeners()
  }

  updatedCallback(attribute: string, _oldValue: unknown, _newValue: unknown) {
    if (attribute === "data-state") this.handleStateChange()
  }

  disconnectedCallback() {
    this.listeners.dispose()
  }

  addEventListeners() {
    this.listeners.addEventListener(this.trigger, "click", () => {
      this.state = flipping(this.state)
    })
  }

  async handleStateChange() {
    if (this.state === "open") {
      LiveJS.execute(this, this.dataset.onOpenJs)

      // stop all ongoing animations
      await stopAnimations(this.panel)

      // made panel element visible to calculate its height
      LiveJS.removeAttribute(this.panel, "hidden")
      LiveJS.setAttribute(this.trigger, "aria-expanded", "true")

      // store the name of the animation about to happen
      // set the animation to none to get the actual height of the element
      const animationName = getComputedStyle(this.panel).animationName
      this.panel.style.animationName = "none"

      // store the height of the panel element into a CSS property
      // and then restore the animation name to let it animate
      const { height } = this.panel.getBoundingClientRect()
      this.panel.style.setProperty("--panel-height", `${height}px`)
      this.panel.style.animationName = animationName

      // wait for animation done and then
      // clear the animation so it get the right animation name when closing
      await waitForAnimation(this.panel)
      this.panel.style.animation = ""
    } else {
      LiveJS.execute(this, this.dataset.onCloseJs)

      await waitForAnimation(this.panel)

      LiveJS.setAttribute(this.panel, "hidden", "true")
      LiveJS.setAttribute(this.trigger, "aria-expanded", "false")
    }
  }
}

const Collapsible: SproutComponentSetup = () => ({
  init: () => {
    customElements.define("sp-collapsible", CollapsibleElement, { extends: "div" })
  },
  handleDomChange: (from, to) => {
    if (from.id.startsWith("collapsible-panel") || from.id.startsWith("accordion-item-panel")) {
      const property = "--panel-height"
      to.style.setProperty(property, from.style.getPropertyValue(property))
    }
  }
})

export default Collapsible
