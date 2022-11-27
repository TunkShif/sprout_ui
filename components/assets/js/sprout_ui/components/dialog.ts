import { createFocusTrap } from "focus-trap"
import SproutElement from "../internal/sprout-element"
import { transitionElement } from "../internal/transition"
import type { SproutComponentSetup } from "../types"
import disposables from "../utils/disposables"

type DialogUIState = "open" | "closed"

class DialogElement extends SproutElement<DialogUIState> {
  private dialog: HTMLElement
  private backdrop: HTMLElement
  private panel: HTMLElement
  private disposables = disposables()

  static get observedAttributes() {
    return ["data-state"]
  }

  constructor() {
    super()
    const dialog = this.querySelector<HTMLElement>(`[data-part="container"]`)
    const backdrop = this.querySelector<HTMLElement>(`[data-part="backdrop"]`)
    const panel = this.querySelector<HTMLElement>(`[data-part="panel"]`)
    if (!dialog || !backdrop || !panel)
      throw new Error("Dialog must have a backdrop element and a panel element.")

    this.dialog = dialog
    this.backdrop = backdrop
    this.panel = panel
  }

  updatedCallback(attribute: string, _oldValue: unknown, _newValue: unknown) {
    if (attribute === "data-state") this.handleStateChange()
  }

  disconnectedCallback() {
    this.disposables.dispose()
  }

  handleStateChange() {
    const parts = [this.backdrop, this.panel]

    // TODO: prevent scroll
    const trap = createFocusTrap(this.panel, {
      escapeDeactivates: false,
      allowOutsideClick: true
    })

    if (this.state === "open") {
      this.executeJs(this.dataset.onOpenJs)

      this.dialog.hidden = false
      this.disposables.nextFrame(() => trap.activate())
      Promise.all(parts.map((part) => transitionElement(part, "enter")))
    } else {
      this.executeJs(this.dataset.onCloseJs)

      trap.deactivate()
      Promise.all(parts.map((part) => transitionElement(part, "leave"))).then(
        () => (this.dialog.hidden = true)
      )
    }
  }
}

const dialog: SproutComponentSetup = (_opts) => ({
  init: () => {
    customElements.define("sp-dialog", DialogElement)
  }
})

export default dialog
