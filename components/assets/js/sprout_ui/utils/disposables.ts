export default class Disposables {
  private disposables: Function[] = []

  add(callback: () => void) {
    this.disposables.push(callback)
    return () => {
      let idx = this.disposables.indexOf(callback)
      if (idx >= 0) {
        let [dispose] = this.disposables.splice(idx, 1)
        dispose()
      }
    }
  }

  nextFrame(callback: () => void) {
    const raf = requestAnimationFrame(() => requestAnimationFrame(callback))
    return this.add(() => cancelAnimationFrame(raf))
  }

  addEventListener<TEvent extends keyof HTMLElementEventMap>(
    element: HTMLElement,
    event: TEvent | string,
    listener: (event: HTMLElementEventMap[TEvent] | Event) => any,
    options?: boolean | AddEventListenerOptions | undefined
  ) {
    element.addEventListener(event, listener, options)
    return this.add(() => element.removeEventListener(event, listener))
  }

  dispose() {
    this.disposables.splice(0).forEach((d) => d())
  }
}
