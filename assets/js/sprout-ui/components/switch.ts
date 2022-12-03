import { LiveElement, LiveViewJS } from "@tunkshif/live-element"
import { query, attr } from "@tunkshif/live-element/decorators"
import { SproutComponentSetup } from "../types"
import { flipping } from "../utils"
import Disposables from "../utils/disposables"

class SwitchElement extends LiveElement {
  @query("track", { part: true })
  track: HTMLElement
  @query("thumb", { part: true })
  thumb: HTMLElement

  @attr("data-state", { live: true })
  state: "checked" | "unchecked"

  private listeners = new Disposables()

  static get observedAttributes() {
    return ["data-state"]
  }

  connectedCallback() {
    if (!this.track || !this.thumb)
      throw new Error("Switch must have a track element and a thumb element.")
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
      this.toggle()
    })
    this.listeners.addEventListener(this, "keydown", (event) => {
      const { key } = event as KeyboardEvent
      if (key === "Space") {
        event.preventDefault()
        this.toggle()
      }
    })
  }

  toggle() {
    this.state = flipping(this.state, ["checked", "unchecked"])
    LiveViewJS.setAttribute(
      this.track,
      "aria-checked",
      flipping(this.track.getAttribute("aria-checked") || "false", ["true", "false"])
    )
  }

  async handleStateChange() {
    if (this.state === "checked") {
      LiveViewJS.exec(this, this.dataset.onCheckedJs)
    } else {
      LiveViewJS.exec(this, this.dataset.onUncheckedJs)
    }
  }
}

const Switch: SproutComponentSetup = () => ({
  init: () => {
    customElements.define("sp-switch", SwitchElement)
  }
})

export default Switch
