import type { LiveViewHook } from "../types"

type TransitionProperties = {
  enter?: string
  enterFrom?: string
  enterTo?: string
  leave?: string
  leaveFrom?: string
  leaveTo?: string
}

type TransitionClasses = {
  enter: string[]
  enterFrom: string[]
  enterTo: string[]
  leave: string[]
  leaveFrom: string[]
  leaveTo: string[]
}

type TransitionOptions = {
  attribute?: string
  states?: {
    show: string
    hide: string
  }
}

const getProperties = (el: HTMLElement) => {
  return {
    enter: el.getAttribute("data-enter"),
    enterFrom: el.getAttribute("data-enter-from"),
    enterTo: el.getAttribute("data-enter-to"),
    leave: el.getAttribute("data-leave"),
    leaveFrom: el.getAttribute("data-leave-from"),
    leaveTo: el.getAttribute("data-leave-to")
  } as TransitionProperties
}

const waitForTransition = (el: HTMLElement, callback: () => void) => {
  const handler = () => {
    callback()
    el.removeEventListener("transitionend", handler, false)
  }
  el.addEventListener("transitionend", handler, false)
}

const doTransition = (el: HTMLElement, state: "show" | "hide", props: TransitionProperties) => {
  const classes = Object.fromEntries(
    Object.entries(props).map(([key, val]) => [key, val?.split(" ").filter(Boolean) ?? []])
  ) as TransitionClasses

  let base: string[]
  let from: string[]
  let to: string[]
  switch (state) {
    case "show":
      base = classes.enter
      from = classes.enterFrom
      to = classes.enterTo
      break
    case "hide":
      base = classes.leave
      from = classes.leaveFrom
      to = classes.leaveTo
      break
  }

  if (state === "show") {
    el.removeAttribute("hidden")
    el.style.display = ""
  }

  el.classList.add(...base, ...from)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.classList.remove(...from)
      el.classList.add(...to)

      waitForTransition(el, () => {
        el.classList.remove(...base)

        if (state === "hide") {
          el.style.display = "none"
        }
      })
    })
  })
}

const init = (wrapper: HTMLElement, observing: HTMLElement, options?: TransitionOptions) => {
  const opts = Object.assign(
    {
      attribute: "data-transition-state",
      states: {
        show: "show",
        hide: "hide"
      }
    },
    options
  )

  const state = observing.getAttribute(opts.attribute)
  const props = getProperties(wrapper)

  if (state === opts.states.hide) {
    wrapper.style.display = "none"
  } else {
    wrapper.style.display = ""
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === opts.attribute) {
        const mutatedState =
          observing.getAttribute(opts.attribute)! === opts.states.show ? "show" : "hide"

        doTransition(wrapper, mutatedState, props)
      }
    }
  })

  observer.observe(wrapper, { attributes: true })

  return () => observer.disconnect()
}

export const TransitionHook = {
  mounted() {
    this.cleanup = init(this.el, this.el)
  },
  updated() {
    // const state = this.el.getAttribute("data-transition-state")
    // if (state === "hide") {
    //   this.el.style.display = "none"
    // }
  },
  destroyed() {
    this.cleanup()
  }
} as LiveViewHook
