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
      this.setStateLive(flipping(this.state))
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
      this.executeJs(this, this.dataset.onOpenJs)

      this.modal.addEventListeners(() => {
        this.setStateLive("closed")
      })

      // `on-click-away` listener must be registered before panel is visible,
      // or clicking on the trigger button will also trigger a `click-away` event
      const d = new Disposables()
      d.nextFrame(() => {
        this.removeAttributeLive(this.panel, "hidden")
        this.setAttributeLive(this.trigger, "aria-expanded", "true")
        transitionElement(this.panel, "enter")
      })
    } else {
      this.executeJs(this, this.dataset.onCloseJs)

      this.modal.removeEventListeners()
      await transitionElement(this.panel, "leave")
      this.setAttributeLive(this.panel, "hidden", "true")
      this.setAttributeLive(this.trigger, "aria-expanded", "false")
    }
  }
}

const popover: SproutComponentSetup = () => ({
  init: () => {
    customElements.define("sp-popover", PopoverElement)
  }
})

export default popover
