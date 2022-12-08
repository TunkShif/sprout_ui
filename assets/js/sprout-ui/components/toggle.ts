import { LiveElement, attr, LiveJS } from "@tunkshif/live-element"
import { flipping } from "../utils"
import { Disposables } from "../utils/disposables"
import type { SproutComponentSetup } from "../types"

export class ToggleElement extends LiveElement {
  @attr("data-state", { live: true })
  state: "on" | "off"

  private listeners = new Disposables()

  static get observedAttributes() {
    return ["data-state"]
  }

  connectedCallback() {
    this.addEventListeners()
  }

  updatedCallback(attribute: string, _oldValue: unknown, _newValue: unknown) {
    if (attribute === "data-state") this.handleStateChange()
  }

  disconnectedCallback() {
    this.listeners.dispose()
  }

  addEventListeners() {
    this.listeners.addEventListener(this, "click", () => {
      this.state = flipping(this.state, ["on", "off"])
    })
  }

  handleStateChange() {
    if (this.state === "on") {
      LiveJS.execute(this, this.dataset.onToggleOnJs)
    } else {
      LiveJS.execute(this, this.dataset.onToggleOffJs)
    }
  }
}

const Toggle: SproutComponentSetup = () => ({
  init: () => {
    customElements.define("sp-toggle", ToggleElement)
  }
})

export default Toggle
