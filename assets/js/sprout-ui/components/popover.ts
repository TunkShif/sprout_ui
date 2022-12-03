import { LiveElement, LiveViewJS } from "@tunkshif/live-element"
import { query, attr } from "@tunkshif/live-element/decorators"
import Modal from "../internal/modal"
import { transitionElement } from "../internal/transition"
import { SproutComponentSetup } from "../types"
import { flipping, isTruthy } from "../utils"
import Disposables from "../utils/disposables"

class PopoverElement extends LiveElement {
  @query("trigger", { part: true })
  trigger: HTMLElement
  @query("panel", { part: true })
  panel: HTMLElement

  @attr("data-state", { live: true })
  state: "open" | "closed"

  private modal: Modal
  private listeners = new Disposables()

  static get observedAttributes() {
    return ["data-state"]
  }

  connectedCallback() {
    if (!this.panel || !this.trigger)
      throw new Error("Popover must have a trigger element and a panel element.")

    this.listeners.addEventListener(this.trigger, "click", () => {
      this.state = flipping(this.state)
    })

    this.modal = new Modal(this.panel, {
      preventScroll: false,
      dismissOnEsc: isTruthy(this.dataset.closeOnEsc),
      dismissOnClickAway: isTruthy(this.dataset.closeOnClickAway)
    })
  }

  updatedCallback(attribute: string, _oldValue: unknown, _newValue: unknown) {
    if (attribute === "data-state") this.handleStateChange()
  }

  disconnectedCallback() {
    this.listeners.dispose()
  }

  async handleStateChange() {
    if (this.state === "open") {
      LiveViewJS.exec(this, this.dataset.onOpenJs)

      this.modal.addEventListeners(() => {
        this.state = "closed"
      })

      // `on-click-away` listener must be registered before panel is visible,
      // or clicking on the trigger button will also trigger a `click-away` event
      const d = new Disposables()
      d.nextFrame(() => {
        LiveViewJS.removeAttribute(this.panel, "hidden")
        LiveViewJS.setAttribute(this.trigger, "aria-expanded", "true")
        transitionElement(this.panel, "enter")
      })
    } else {
      LiveViewJS.exec(this, this.dataset.onCloseJs)

      this.modal.removeEventListeners()
      await transitionElement(this.panel, "leave")
      LiveViewJS.setAttribute(this.panel, "hidden", "true")
      LiveViewJS.setAttribute(this.trigger, "aria-expanded", "false")
    }
  }
}

const Popover: SproutComponentSetup = () => ({
  init: () => {
    customElements.define("sp-popover", PopoverElement)
  }
})

export default Popover
