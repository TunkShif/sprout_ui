import type { SproutComponentSetup, SproutEvent } from "../types"

// TODO: helper function for switching data attribute

type ModalShowEvent = SproutEvent<{ disableScrolling: boolean }>
type ModalHideEvent = SproutEvent<{ awaitAnimation: boolean; disableScrolling: boolean }>

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
      el?.setAttribute("data-ui-state", "open")
    )
    toggleScrolling("disable", detail.disableScrolling)
  })

  window.addEventListener("sprt:modal:close", (e) => {
    const { target, detail } = e as ModalHideEvent
    const [modal, overlay, container] = queryModalParts(target)

    overlay?.setAttribute("data-ui-state", "")
    container?.setAttribute("data-ui-state", "")

    toggleScrolling("enable", detail.disableScrolling)

    if (detail.awaitAnimation) {
      const handler = () => {
        modal.setAttribute("data-ui-state", "")
        modal.removeEventListener("animationend", handler, false)
      }
      modal.addEventListener("animationend", handler, false)
    } else {
      modal.setAttribute("data-ui-state", "")
    }
  })
}

const modal: SproutComponentSetup = () => ({
  init
})

export default modal
