import { LiveElement, LiveJS, query, attr } from "@tunkshif/live-element"
import Modal from "../internal/modal"
import { transitionElement } from "../internal/transition"
import type { SproutComponentSetup } from "../types"
import { isTruthy } from "../utils"
import { Disposables } from "../utils/disposables"

export class DialogElement extends LiveElement {
  @query("trigger", { part: true })
  trigger: HTMLElement
  @query("container", { part: true })
  dialog: HTMLElement
  @query("backdrop", { part: true })
  backdrop: HTMLElement
  @query("panel", { part: true })
  panel: HTMLElement
  @query("close-button", { part: true, all: true })
  closeButtons: HTMLElement[]

  @attr("data-state", { live: true })
  state: "open" | "closed"

  private modal: Modal
  private disposables = new Disposables()
  private listeners = new Disposables()

  static get observedAttributes() {
    return ["data-state"]
  }

  connectedCallback() {
    if (!this.dialog || !this.backdrop || !this.panel)
      throw new Error("Dialog must have a backdrop element and a panel element.")

    this.modal = new Modal(this.panel, {
      preventScroll: isTruthy(this.dataset.preventScroll),
      dismissOnEsc: isTruthy(this.dataset.closeOnEsc),
      dismissOnClickAway: isTruthy(this.dataset.closeOnClickAway)
    })
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
    this.listeners.addEventListener(this.trigger, "click", () => {
      this.state = "open"
    })
    this.closeButtons.forEach((it) =>
      this.listeners.addEventListener(it, "click", () => {
        this.state = "closed"
      })
    )
  }

  async handleStateChange() {
    const parts = [this.backdrop, this.panel]
    if (this.state === "open") {
      LiveJS.execute(this, this.dataset.onOpenJs)

      this.modal.addEventListeners(() => {
        this.state = "closed"
      })

      this.disposables.nextFrame(() => {
        LiveJS.removeAttribute(this.dialog, "hidden")
        this.modal.activate()
        Promise.all(parts.map((part) => transitionElement(part, "enter")))
      })
    } else {
      LiveJS.execute(this, this.dataset.onCloseJs)

      this.modal.removeEventListeners()
      this.modal.deactivate()
      await Promise.all(parts.map((part) => transitionElement(part, "leave")))
      LiveJS.setAttribute(this.dialog, "hidden", "true")
    }
  }
}

const Dialog: SproutComponentSetup = (_opts) => ({
  init: () => {
    customElements.define("sp-dialog", DialogElement)
  }
})

export default Dialog
