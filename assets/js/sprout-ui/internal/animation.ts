type AnimationStatus = "finished" | "cancelled"

export const waitForAnimation = (element: Element) =>
  Promise.all(
    element.getAnimations().map(
      (animation) =>
        new Promise<AnimationStatus>((resolve) => {
          animation.addEventListener("cancel", () => resolve("cancelled"), { once: true })
          animation.addEventListener("finish", () => resolve("finished"), { once: true })
        })
    )
  )

// Thanks to Shoelace Style
// https://github.com/shoelace-style/shoelace/blob/next/src/internal/animate.ts
export const stopAnimations = (element: Element) =>
  Promise.all(
    element.getAnimations().map(
      (animation) =>
        new Promise((resolve) => {
          const handleAnimationEvent = requestAnimationFrame(resolve)

          animation.addEventListener("cancel", () => handleAnimationEvent, { once: true })
          animation.addEventListener("finish", () => handleAnimationEvent, { once: true })
          animation.cancel()
        })
    )
  )
