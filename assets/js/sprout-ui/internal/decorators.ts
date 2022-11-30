export const query = (part: string) => (target: HTMLElement, propertyKey: string) => {
  const key = `_${propertyKey}`
  Reflect.defineProperty(target, propertyKey, {
    get(this: any) {
      if (this[key] === undefined) {
        this[key] = this.querySelector(`[data-part="${part}"]`)
      }
      return this[key]
    },
    enumerable: true,
    configurable: true
  })
}

export const attr =
  (name: string, converter?: (val: string | null) => any) =>
    (target: HTMLElement, propertyKey: string) => {
      Reflect.defineProperty(target, propertyKey, {
        get(this: HTMLElement) {
          const value = this.getAttribute(name)
          return !!converter ? converter(value) : value
        },
        set(this: HTMLElement, value: any) {
          this.setAttribute(name, value)
        },
        enumerable: true,
        configurable: true
      })
    }
