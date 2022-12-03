import Disposables from "../utils/disposables"

// TODO: wait for animation and transition unified

type TransitionStatus = "ended" | "canceled"
type TransitionStage = "enter" | "leave"

interface TransitionClasses {
  enter: string[]
  enterFrom: string[]
  enterTo: string[]
  enterEnded: string[]
  leave: string[]
  leaveFrom: string[]
  leaveTo: string[]
  leaveEnded: string[]
}

const getTransitionClasses = (element: HTMLElement) =>
  Object.fromEntries(
    ["enter", "leave"]
      .map((v) => [v, `${v}From`, `${v}To`, `${v}Ended`])
      .flat()
      .map((key) => [key, element.dataset[key]?.split(" ")?.filter(Boolean) ?? []] as const)
  ) as unknown as TransitionClasses

const _waitForTransition = (element: HTMLElement, onDone: (status: TransitionStatus) => void) => {
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

  const d = new Disposables()

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

const doTransition = (
  element: HTMLElement,
  stage: TransitionStage,
  classes: TransitionClasses,
  callbacks: {
    onStart?: (stage: TransitionStage) => void
    onDone?: (stage: TransitionStage, status: TransitionStatus) => void
  }
) => {
  const originalClasses = Array.from(element.classList)

  let base: string[]
  let from: string[]
  let to: string[]
  let ended: string[]
  switch (stage) {
    case "enter":
      base = classes.enter
      from = classes.enterFrom
      to = classes.enterTo
      ended = classes.enterEnded
      break
    case "leave":
      base = classes.leave
      from = classes.leaveFrom
      to = classes.leaveTo
      ended = classes.leaveEnded
      break
  }

  callbacks.onStart?.(stage)

  element.classList.add(...base, ...from)

  const d = new Disposables()
  d.nextFrame(() => {
    element.classList.remove(...from)
    element.classList.add(...to)

    _waitForTransition(element, (status) => {
      if (status === "ended") {
        element.classList.remove(
          ...base,
          ...Array.from(element.classList).filter((c) => !originalClasses.includes(c))
        )
        element.classList.add(...ended)
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

export const waitForTransition = (element: HTMLElement) =>
  new Promise<TransitionStatus>((resolve) => {
    _waitForTransition(element, (status) => {
      resolve(status)
    })
  })
