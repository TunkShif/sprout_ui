import { LiveElement, LiveViewJS } from "@tunkshif/live-element"
import { query, attr } from "@tunkshif/live-element/decorators"
import Modal from "../internal/modal"
import { transitionElement } from "../internal/transition"
import type { SproutComponentSetup } from "../types"
import { isTruthy } from "../utils"

class DialogElement extends LiveElement {
  @query("container", { part: true })
  dialog: HTMLElement
  @query("backdrop", { part: true })
  backdrop: HTMLElement
  @query("panel", { part: true })
  panel: HTMLElement

  @attr("data-state", { live: true })
  state: "open" | "closed"

  private modal: Modal

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
  }

  updatedCallback(attribute: string, _oldValue: unknown, _newValue: unknown) {
    if (attribute === "data-state") this.handleStateChange()
  }

  async handleStateChange() {
    const parts = [this.backdrop, this.panel]

    if (this.state === "open") {
      LiveViewJS.exec(this, this.dataset.onOpenJs)

      LiveViewJS.removeAttribute(this.dialog, "hidden")
      this.modal.addEventListeners(() => {
        this.state = "closed"
      })
      this.modal.activate()

      await Promise.all(parts.map((part) => transitionElement(part, "enter")))
    } else {
      LiveViewJS.exec(this, this.dataset.onCloseJs)

      this.modal.removeEventListeners()
      this.modal.deactivate()
      await Promise.all(parts.map((part) => transitionElement(part, "leave")))
      LiveViewJS.setAttribute(this.dialog, "hidden", "true")
    }
  }
}

const Dialog: SproutComponentSetup = (_opts) => ({
  init: () => {
    customElements.define("sp-dialog", DialogElement)
  }
})

export default Dialog
