import { createFocusTrap } from "focus-trap"
import { query, attr } from "../internal/decorators"
import SproutElement from "../internal/sprout-element"
import { transitionElement } from "../internal/transition"
import type { SproutComponentSetup } from "../types"
import { isTruthy } from "../utils"
import { toggleBodyScroll } from "../utils/body-scroll"
import Disposables from "../utils/disposables"

class DialogElement extends SproutElement {
  @query("container")
  dialog: HTMLElement
  @query("backdrop")
  backdrop: HTMLElement
  @query("panel")
  panel: HTMLElement

  @attr("data-prevent-scroll", isTruthy)
  preventScroll: boolean

  private disposables = new Disposables()

  static get observedAttributes() {
    return ["data-state"]
  }

  connectedCallback() {
    if (!this.dialog || !this.backdrop || !this.panel)
      throw new Error("Dialog must have a backdrop element and a panel element.")
  }

  updatedCallback(attribute: string, _oldValue: unknown, _newValue: unknown) {
    if (attribute === "data-state") this.handleStateChange()
  }

  async handleStateChange() {
    const parts = [this.backdrop, this.panel]

    if (this.state === "open") {
      // execute LiveView JS commands first
      this.executeJs(this.dataset.onOpenJs)

      // make dialog visible to make sure transition is able to happen
      this.dialog.hidden = false

      // create a focus trap and activate it in the next frame
      // add the deactivate callback to disposables
      const focusTrap = createFocusTrap(this.panel, {
        escapeDeactivates: false,
        allowOutsideClick: true
      })
      this.disposables.add(() => focusTrap.deactivate())
      this.disposables.nextFrame(() => focusTrap.activate())

      toggleBodyScroll(this.preventScroll ? "off" : undefined)

      // wait for transition done
      await Promise.all(parts.map((part) => transitionElement(part, "enter")))
    } else {
      this.executeJs(this.dataset.onCloseJs)

      // deactivate focus trap
      this.disposables.dispose()

      await Promise.all(parts.map((part) => transitionElement(part, "leave")))

      toggleBodyScroll(this.preventScroll ? "on" : undefined)
      this.dialog.hidden = true
    }
  }
}

const dialog: SproutComponentSetup = (_opts) => ({
  init: () => {
    customElements.define("sp-dialog", DialogElement)
  }
})

export default dialog
