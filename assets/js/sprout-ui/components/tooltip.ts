import { LiveElement, LiveJS, query, attr } from "@tunkshif/live-element"
import { transitionElement } from "../internal/transition"
import { SproutComponentSetup } from "../types"
import { Disposables } from "../utils/disposables"

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
    this.listeners.dispose()
  }

  addEventListeners() {
    this.listeners.addEventListener(this.trigger, "mouseover", () => {
      this.disposables.setTimeout(() => {
        this.state = "open"
      }, this.openDelay)
    })
    this.listeners.addEventListener(this.trigger, "mouseout", () => {
      this.disposables.setTimeout(() => {
        this.state = "closed"
      }, this.closeDelay)
    })
    this.listeners.addEventListener(this.trigger, "focus", () => {
      this.state = "open"
    })
    this.listeners.addEventListener(this.trigger, "blur", () => {
      this.state = "closed"
    })
    this.listeners.addEventListener(this.trigger, "click", () => {
      this.state = "open"
    })
  }

  async handleStateChange() {
    if (this.state === "open") {
      LiveJS.execute(this, this.dataset.onOpenJs)

      this.disposables.dispose()
      this.disposables.addEventListener(document, "keydown", (event) => {
        const { key } = event as KeyboardEvent
        if (this.state === "open" && key === "Escape") {
          this.state = "closed"
          event.preventDefault()
        }
      })

      LiveJS.removeAttribute(this.container, "hidden")
      transitionElement(this.container, "enter")
    } else {
      LiveJS.execute(this, this.dataset.onCloseJs)
      this.disposables.dispose()

      await transitionElement(this.container, "leave")
      LiveJS.setAttribute(this.container, "hidden", "true")
    }
  }
}

const Tooltip: SproutComponentSetup = () => ({
  init: () => {
    customElements.define("sp-tooltip", TooltipElement)
  }
})

export default Tooltip
