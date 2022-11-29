import { attr } from "./decorators"

export default class SproutElement<UIState extends string = "open" | "closed"> extends HTMLElement {
  @attr("data-state")
  state: UIState

  attributeChangedCallback(
    attribute: string,
    oldValue: string | undefined | null,
    newValue: string | undefined | null
  ) {
    // `attributeChangedCallback` will be called when the component is mounted
    // at the first time with a null `oldValue`, even though the attribute is
    // set in the html, here we're preventing handle changes for this situation
    if (oldValue === null && newValue !== null) return
    if (oldValue === newValue) return
    this.updatedCallback(attribute, oldValue, newValue)
  }

  updatedCallback(
    _attribute: string,
    _oldValue: string | undefined | null,
    _newValue: string | undefined | null
  ) { }

  executeJs(command: string | undefined | null) {
    window.liveSocket.execJS(this, command || "[]")
  }
}
