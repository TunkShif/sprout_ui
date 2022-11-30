import { attr, query } from "../internal/decorators"
import SproutElement from "../internal/sprout-element"
import { transitionElement } from "../internal/transition"
import { SproutComponentSetup } from "../types"
import Disposables from "../utils/disposables"

class TooltipElement extends SproutElement {
  @query("trigger")
  trigger: HTMLElement
  @query("container")
  container: HTMLElement

  @attr("data-open-delay", Number)
  openDelay: number
  @attr("data-close-delay", Number)
  closeDelay: number

  private disposables = new Disposables()
  private listeners = new Disposables()

  static get observedAttributes() {
    return ["data-state"]
  }

  connectedCallback() {
    if (!this.container || !this.trigger)
      throw new Error("Tooltip must have a trigger element and a container element.")

    this.addEventListeners()
  }

  updatedCallback(attribute: string, _oldValue: unknown, _newValue: unknown) {
    if (attribute === "data-state") this.handleStateChange()
  }

  disconnectedCallback() {
    this.disposables.dispose()
    this.removeEventListeners()
  }

  addEventListeners() {
    this.listeners.addEventListener(this.trigger, "mouseover", () => {
      this.disposables.dispose()
      this.disposables.setTimeout(() => (this.state = "open"), this.openDelay)
    })
    this.listeners.addEventListener(this.trigger, "mouseout", () => {
      this.disposables.dispose()
      this.disposables.setTimeout(() => (this.state = "closed"), this.closeDelay)
    })
    this.listeners.addEventListener(this.trigger, "focus", () => {
      this.disposables.dispose()
      this.state = "open"
    })
    this.listeners.addEventListener(this.trigger, "blur", () => {
      this.disposables.dispose()
      this.state = "closed"
    })
    this.listeners.addEventListener(this.trigger, "click", () => {
      this.disposables.dispose()
      this.state = "open"
    })
    this.listeners.addEventListener(document, "keydown", (event) => {
      const { key } = event as KeyboardEvent
      if (this.state === "open" && key === "Escape") {
        this.state = "closed"
        event.stopPropagation()
      }
    })
  }

  removeEventListeners() {
    this.listeners.dispose()
  }

  async handleStateChange() {
    if (this.state === "open") {
      this.executeJs(this.dataset.onOpenJs)

      this.container.hidden = false
      transitionElement(this.container, "enter")
    } else {
      this.executeJs(this.dataset.onCloseJs)

      await transitionElement(this.container, "leave")
      this.container.hidden = true
    }
  }
}

const tooltip: SproutComponentSetup = () => ({
  init: () => {
    customElements.define("sp-tooltip", TooltipElement)
  }
})

export default tooltip
