import { query } from "../internal/decorators"
import SproutElement from "../internal/sprout-element"
import { SproutComponentSetup } from "../types"
import { flipping } from "../utils"
import Disposables from "../utils/disposables"

class SwitchElement extends SproutElement<"checked" | "unchecked"> {
  @query("track")
  track: HTMLElement
  @query("thumb")
  thumb: HTMLElement

  private listeners = new Disposables()

  static get observedAttributes() {
    return ["data-state"]
  }

  connectedCallback() {
    if (!this.track || !this.thumb)
      throw new Error("Switch must have a track element and a thumb element.")
    this.addEventListeners()
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
    this.setStateLive(flipping(this.state, ["checked", "unchecked"]))
    this.setAttributeLive(
      this.track,
      "aria-checked",
      flipping(this.track.getAttribute("aria-checked") || "false", ["true", "false"])
    )
  }
}

const Switch: SproutComponentSetup = () => ({
  init: () => {
    customElements.define("sp-switch", SwitchElement)
  }
})

export default Switch
