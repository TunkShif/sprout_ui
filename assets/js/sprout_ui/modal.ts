import type { SproutEvent } from "./types"

const queryModalParts = (modal: HTMLElement) => {
  const overlay = modal.querySelector(`[data-part=overlay]`)
  const container = modal.querySelector(`[data-part=container]`)
  return [modal, overlay, container] as const
}

window.addEventListener("sprout:modal:show", (e) => {
  const { target } = e as SproutEvent
  queryModalParts(target as HTMLElement).forEach((el) => el?.setAttribute("data-state", "show"))
})

window.addEventListener("sprout:modal:hide", (e) => {
  const { target, detail } = e as SproutEvent<{ await_animation: boolean }>
  const [modal, overlay, container] = queryModalParts(target)

  overlay?.setAttribute("data-state", "hidden")
  container?.setAttribute("data-state", "hidden")

  if (detail.await_animation) {
    const handler = () => {
      modal.setAttribute("data-state", "hidden")
      modal.removeEventListener("animationend", handler, false)
    }
    modal.addEventListener("animationend", handler, false)
  } else {
    modal.setAttribute("data-state", "hidden")
  }
})
