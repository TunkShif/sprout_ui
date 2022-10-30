window.addEventListener("test:transition:toggle", ({ target }) => {
  const state = target.getAttribute("data-transition-state") === "show" ? "hide" : "show"
  target.setAttribute("data-transition-state", state)
})
