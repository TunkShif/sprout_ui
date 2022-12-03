import { LiveElement, LiveViewJS } from "@tunkshif/live-element"
import { query, attr } from "@tunkshif/live-element/decorators"
import { transitionElement } from "../internal/transition"
import { SproutComponentSetup } from "../types"
import Disposables from "../utils/disposables"

class TooltipElement extends LiveElement {
  @query("trigger", { part: true })
  trigger: HTMLElement
  @query("container", { part: true })
  container: HTMLElement

  @attr("data-state", { live: true })
  state: "open" | "closed"
  @attr("data-open-delay", { converter: Number })
  openDelay: number
  @attr("data-close-delay", { converter: Number })
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
      this.disposables.setTimeout(() => {
        this.state = "open"
      }, this.openDelay)
    })
    this.listeners.addEventListener(this.trigger, "mouseout", () => {
      this.disposables.dispose()
      this.disposables.setTimeout(() => {
        this.state = "closed"
      }, this.closeDelay)
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
      LiveViewJS.exec(this, this.dataset.onOpenJs)

      LiveViewJS.removeAttribute(this.container, "hidden")
      transitionElement(this.container, "enter")
    } else {
      LiveViewJS.exec(this, this.dataset.onCloseJs)

      await transitionElement(this.container, "leave")
      LiveViewJS.setAttribute(this.container, "hidden", "true")
    }
  }
}

const Tooltip: SproutComponentSetup = () => ({
  init: () => {
    customElements.define("sp-tooltip", TooltipElement)
  }
})

export default Tooltip
