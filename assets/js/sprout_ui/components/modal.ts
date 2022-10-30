import type { SproutComponentSetup, SproutEvent } from "../types"

// TODO: helper function for switching data attribute

type ModalShowEvent = SproutEvent<{ disable_scrolling: boolean }>
type ModalHideEvent = SproutEvent<{ await_animation: boolean; disable_scrolling: boolean }>

enum SproutStates {
  OPEN = "open",
  CLOSED = "closed"
}

const queryModalParts = (modal: HTMLElement) => {
  const overlay = modal.querySelector(`[data-part=overlay]`)
  const container = modal.querySelector(`[data-part=container]`)
  return [modal, overlay, container] as const
}

const toggleScrolling = (to: "enable" | "disable", disabled: boolean) => {
  if (!disabled) return
  switch (to) {
    case "enable":
      Object.assign(document.body.style, { overflow: "" })
      break
    case "disable":
      Object.assign(document.body.style, { overflow: "hidden" })
      break
    default:
      break
  }
}

const init = () => {
  window.addEventListener("sprt:modal:open", (e) => {
    const { target, detail } = e as ModalShowEvent
    queryModalParts(target as HTMLElement).forEach((el) =>
      el?.setAttribute("data-state", SproutStates.OPEN)
    )
    toggleScrolling("disable", detail.disable_scrolling)
  })

  window.addEventListener("sprt:modal:close", (e) => {
    const { target, detail } = e as ModalHideEvent
    const [modal, overlay, container] = queryModalParts(target)

    overlay?.setAttribute("data-state", SproutStates.CLOSED)
    container?.setAttribute("data-state", SproutStates.CLOSED)

    toggleScrolling("enable", detail.disable_scrolling)

    if (detail.await_animation) {
      const handler = () => {
        modal.setAttribute("data-state", SproutStates.CLOSED)
        modal.removeEventListener("animationend", handler, false)
      }
      modal.addEventListener("animationend", handler, false)
    } else {
      modal.setAttribute("data-state", SproutStates.CLOSED)
    }
  })
}

const modal: SproutComponentSetup = () => ({
  init
})

export default modal
