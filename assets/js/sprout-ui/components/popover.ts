import { query } from "../internal/decorators"
import Modal from "../internal/modal"
import SproutElement from "../internal/sprout-element"
import { transitionElement } from "../internal/transition"
import { SproutComponentSetup } from "../types"
import { flipping, isTruthy } from "../utils"
import Disposables from "../utils/disposables"

class PopoverElement extends SproutElement {
  @query("trigger")
  trigger: HTMLElement
  @query("panel")
  panel: HTMLElement

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
      this.executeJs(this.dataset.onOpenJs)

      this.modal.addEventListeners(() => (this.state = "closed"))

      // `on-click-away` listener must be registered before panel is visible,
      // or clicking on the trigger button will also trigger a `click-away` event
      const d = new Disposables()
      d.nextFrame(() => {
        this.panel.hidden = false
        this.trigger.ariaExpanded = "true"
        transitionElement(this.panel, "enter")
      })
    } else {
      this.executeJs(this.dataset.onCloseJs)

      this.modal.removeEventListeners()
      await transitionElement(this.panel, "leave")
      this.panel.hidden = true
      this.trigger.ariaExpanded = "false"
    }
  }
}

const popover: SproutComponentSetup = (_opts) => ({
  init: () => {
    customElements.define("sp-popover", PopoverElement)
  }
})

export default popover
