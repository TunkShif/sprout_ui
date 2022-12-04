import { LiveElement, LiveJS, query, attr } from "@tunkshif/live-element"
import Modal from "../internal/modal"
import { transitionElement } from "../internal/transition"
import { SproutComponentSetup } from "../types"
import { flipping, isTruthy } from "../utils"
import { Disposables, nextFrame } from "../utils/disposables"

export class PopoverElement extends LiveElement {
  @query("trigger", { part: true })
  trigger: HTMLElement
  @query("panel", { part: true })
  panel: HTMLElement
  @query("close-button", { part: true, all: true })
  closeButtons: HTMLElement[]

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

    this.modal = new Modal(this.panel, {
      preventScroll: false,
      dismissOnEsc: isTruthy(this.dataset.closeOnEsc),
      dismissOnClickAway: isTruthy(this.dataset.closeOnClickAway)
    })
    this.addEventListeners()
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
    this.closeButtons.forEach((it) =>
      this.listeners.addEventListener(it, "click", () => {
        this.state = "closed"
      })
    )
  }

  async handleStateChange() {
    if (this.state === "open") {
      LiveJS.execute(this, this.dataset.onOpenJs)

      this.modal.addEventListeners(() => {
        this.state = "closed"
      })

      // `on-click-away` listener must be registered before panel is visible,
      // or clicking on the trigger button will also trigger a `click-away` event
      nextFrame(() => {
        LiveJS.removeAttribute(this.panel, "hidden")
        LiveJS.setAttribute(this.trigger, "aria-expanded", "true")
        transitionElement(this.panel, "enter")
      })
    } else {
      LiveJS.execute(this, this.dataset.onCloseJs)

      this.modal.removeEventListeners()
      await transitionElement(this.panel, "leave")
      LiveJS.setAttribute(this.panel, "hidden", "true")
      LiveJS.setAttribute(this.trigger, "aria-expanded", "false")
    }
  }
}

const Popover: SproutComponentSetup = () => ({
  init: () => {
    customElements.define("sp-popover", PopoverElement)
  }
})

export default Popover
