import { toggleBodyScroll } from "../utils/body-scroll"
import type { SproutComponentSetup, SproutEvent } from "../types"

type ToggleAttributeEvent = SproutEvent<{ attribute: string; states: [string, string] }>
type ToggleBodyScrollEvent = SproutEvent<{ state: "on" | "off" }>

const init = () => {
  window.addEventListener("sp:toggle-attribute", (e) => {
    const { target, detail } = e as ToggleAttributeEvent
    const state =
      target.getAttribute(detail.attribute) === detail.states[0]
        ? detail.states[1]
        : detail.states[0]
    target.setAttribute(detail.attribute, state)
  })

  window.addEventListener("sp:toggle-body-scroll", (e) => {
    const { detail } = e as ToggleBodyScrollEvent
    toggleBodyScroll(detail.state)
  })
}

const global: SproutComponentSetup = () => ({
  init
})

export default global
