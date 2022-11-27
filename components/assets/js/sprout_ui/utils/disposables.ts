export default function disposables() {
  const disposables: Function[] = []

  const api = {
    add(callback: () => void) {
      disposables.push(callback)
      return () => {
        let idx = disposables.indexOf(callback)
        if (idx >= 0) {
          let [dispose] = disposables.splice(idx, 1)
          dispose()
        }
      }
    },
    nextFrame(callback: () => void) {
      const raf = requestAnimationFrame(() => requestAnimationFrame(callback))
      return api.add(() => cancelAnimationFrame(raf))
    },
    addEventListener<TEvent extends keyof HTMLElementEventMap>(
      element: HTMLElement,
      event: TEvent | string,
      listener: (event: HTMLElementEventMap[TEvent] | Event) => any,
      options?: boolean | AddEventListenerOptions | undefined
    ) {
      element.addEventListener(event, listener, options)
      return api.add(() => element.removeEventListener(event, listener))
    },
    dispose() {
      disposables.forEach((d) => d())
    }
  }

  return api
}
