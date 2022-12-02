import { query } from "../internal/decorators"
import Modal from "../internal/modal"
import SproutElement from "../internal/sprout-element"
import { transitionElement } from "../internal/transition"
import type { SproutComponentSetup } from "../types"
import { isTruthy } from "../utils"

class DialogElement extends SproutElement {
  @query("container")
  dialog: HTMLElement
  @query("backdrop")
  backdrop: HTMLElement
  @query("panel")
  panel: HTMLElement

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
      this.executeJs(this, this.dataset.onOpenJs)

      this.removeAttributeLive(this.dialog, "hidden")
      this.modal.addEventListeners(() => {
        this.setStateLive("closed")
      })
      this.modal.activate()

      await Promise.all(parts.map((part) => transitionElement(part, "enter")))
    } else {
      this.executeJs(this, this.dataset.onCloseJs)

      this.modal.removeEventListeners()
      this.modal.deactivate()
      await Promise.all(parts.map((part) => transitionElement(part, "leave")))
      this.setAttributeLive(this.dialog, "hidden", "true")
    }
  }
}

const dialog: SproutComponentSetup = (_opts) => ({
  init: () => {
    customElements.define("sp-dialog", DialogElement)
  }
})

export default dialog
