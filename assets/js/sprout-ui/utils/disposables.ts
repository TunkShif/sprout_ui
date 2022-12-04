export const nextFrame = (callback: () => void) => {
  const raf = requestAnimationFrame(() => requestAnimationFrame(callback))
  return () => cancelAnimationFrame(raf)
}

export class Disposables {
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
    return this.add(nextFrame(callback))
  }

  addEventListener<TEvent extends keyof HTMLElementEventMap>(
    element: Element | Document,
    event: TEvent | string,
    listener: (event: HTMLElementEventMap[TEvent] | Event) => any,
    options?: boolean | AddEventListenerOptions | undefined
  ) {
    element.addEventListener(event, listener, options)
    return this.add(() => element.removeEventListener(event, listener))
  }

  setTimeout(handler: () => void, timeout?: number) {
    const id = window.setTimeout(handler, timeout)
    return this.add(() => clearTimeout(id))
  }

  dispose() {
    this.disposables.splice(0).forEach((d) => d())
  }
}
