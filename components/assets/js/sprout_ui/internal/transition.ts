import disposables from "../utils/disposables"

type TransitionStatus = "ended" | "canceled"
type TransitionStage = "enter" | "leave"

interface TransitionClasses {
  enter: string[]
  enterFrom: string[]
  enterTo: string[]
  leave: string[]
  leaveFrom: string[]
  leaveTo: string[]
}

const getTransitionClasses = (element: HTMLElement) =>
  Object.fromEntries(
    ["enter", "leave"]
      .map((v) => [v, `${v}From`, `${v}To`])
      .flat()
      .map((key) => [key, element.dataset[key]?.split(" ")?.filter(Boolean) ?? []] as const)
  ) as unknown as TransitionClasses

const waitForTransition = (element: HTMLElement, onDone: (status: TransitionStatus) => void) => {
  let { transitionDuration, transitionDelay } = getComputedStyle(element)

  let totalDuration = [transitionDuration, transitionDelay]
    .map((value) => {
      let [resolvedValue = 0] = value
        .split(",")
        .filter(Boolean)
        .map((v) => (v.includes("ms") ? parseFloat(v) : parseFloat(v) * 1000))
        .sort((a, z) => z - a)

      return resolvedValue
    })
    .reduce((a, b) => a + b, 0)

  const d = disposables()

  if (totalDuration === 0) {
    onDone("ended")
  } else {
    const listeners: (() => void)[] = []

    listeners.push(
      d.addEventListener(element, "transitionrun", (event) => {
        if (event.target !== event.currentTarget) return

        listeners.splice(0).forEach((d) => d())

        listeners.push(
          d.addEventListener(element, "transitionend", (event) => {
            if (event.target !== event.currentTarget) return
            onDone("ended")
            listeners.splice(0).forEach((d) => d())
          }),
          d.addEventListener(element, "transitioncancel", (event) => {
            if (event.target !== event.currentTarget) return
            onDone("canceled")
            listeners.splice(0).forEach((d) => d())
          })
        )
      })
    )
  }

  d.add(() => onDone("canceled"))

  return d.dispose
}

export const doTransition = (
  element: HTMLElement,
  stage: TransitionStage,
  classes: TransitionClasses,
  callbacks: {
    onStart?: (stage: TransitionStage) => void
    onDone?: (stage: TransitionStage, status: TransitionStatus) => void
  }
) => {
  let base: string[]
  let from: string[]
  let to: string[]
  switch (stage) {
    case "enter":
      base = classes.enter
      from = classes.enterFrom
      to = classes.enterTo
      break
    case "leave":
      base = classes.leave
      from = classes.leaveFrom
      to = classes.leaveTo
      break
  }

  callbacks.onStart?.(stage)

  element.classList.add(...base, ...from)

  const d = disposables()
  d.nextFrame(() => {
    element.classList.remove(...from)
    element.classList.add(...to)

    waitForTransition(element, (status) => {
      if (status === "ended") {
        element.classList.remove(...base)
      }
      callbacks.onDone?.(stage, status)
    })
  })

  return d.dispose
}

export const transitionElement = (element: HTMLElement, stage: TransitionStage) =>
  new Promise<TransitionStatus | undefined>((resolve) => {
    if (!element.hasAttribute("data-transition")) {
      resolve(undefined)
      return
    }

    const classes = getTransitionClasses(element)
    doTransition(element, stage, classes, {
      onDone: (_stage, status) => resolve(status)
    })
  })
