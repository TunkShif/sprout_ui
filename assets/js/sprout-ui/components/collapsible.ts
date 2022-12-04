import { attr, LiveJS, LiveMixin, query } from "@tunkshif/live-element"
import { transitionElement } from "../internal/transition"
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

      LiveJS.removeAttribute(this.panel, "hidden")
      const { height } = this.panel.getBoundingClientRect()
      this.panel.style.setProperty("--panel-height", `${height}px`)

      LiveJS.setAttribute(this.trigger, "aria-expanded", "true")
      await transitionElement(this.panel, "enter")
    } else {
      LiveJS.execute(this, this.dataset.onCloseJs)

      LiveJS.setAttribute(this.trigger, "aria-expanded", "false")
      await transitionElement(this.panel, "leave")
      LiveJS.setAttribute(this.panel, "hidden", "true")
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
