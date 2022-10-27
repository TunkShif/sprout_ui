// TODO: typing
// TODO: refactor

window.addEventListener("sprout:modal:show", ({ target }) => {
  const overlay = target.querySelector(`[data-part="overlay"]`)
  const container = target.querySelector(`[data-part="container"]`)

  target.setAttribute("data-state", "show")
  overlay.setAttribute("data-state", "show")
  container.setAttribute("data-state", "show")
})

window.addEventListener("sprout:modal:hide", ({ target, detail }) => {
  const overlay = target.querySelector(`[data-part="overlay"]`)
  const container = target.querySelector(`[data-part="container"]`)

  overlay.setAttribute("data-state", "hidden")
  container.setAttribute("data-state", "hidden")

  if (detail.await_animation) {
    const handler = () => {
      target.setAttribute("data-state", "hidden")
      target.removeEventListener("animationend", handler, false)
    }
    target.addEventListener("animationend", handler, false)
  } else {
    target.setAttribute("data-state", "hidden")
  }
})
