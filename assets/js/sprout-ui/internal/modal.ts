import { createFocusTrap } from "focus-trap"
import { isVisible } from "../utils"
import { toggleBodyScroll } from "../utils/body-scroll"
import Disposables from "../utils/disposables"

interface ModalOptions {
  preventScroll?: boolean
  dismissOnEsc?: boolean
  dismissOnClickAway?: boolean
}

export default class Modal {
  private element: HTMLElement
  private preventScroll: boolean
  private dismissOnEsc: boolean
  private dismissOnClickAway: boolean

  private listeners = new Disposables()
  private disposables = new Disposables()

  constructor(element: HTMLElement, options?: ModalOptions) {
    this.element = element

    this.preventScroll = options?.preventScroll ?? true
    this.dismissOnEsc = options?.dismissOnEsc ?? true
    this.dismissOnClickAway = options?.dismissOnClickAway ?? true
  }

  addEventListeners(onDismiss: () => void) {
    if (this.dismissOnClickAway) {
      this.listeners.addEventListener(document, "click", (event) => {
        if (isVisible(this.element) && !this.element.contains(event.target as Element)) {
          console.log(isVisible(this.element))
          onDismiss()
          event.preventDefault()
        }
      })
    }
    if (this.dismissOnEsc) {
      this.listeners.addEventListener(document, "keydown", (event) => {
        console.log(event)
        const { key } = event as KeyboardEvent
        if (isVisible(this.element) && key === "Escape") {
          onDismiss()
          event.preventDefault()
        }
      })
    }
  }

  removeEventListeners() {
    this.listeners.dispose()
  }

  activate() {
    const focusTrap = createFocusTrap(this.element, {
      escapeDeactivates: false,
      allowOutsideClick: true
    })
    this.disposables.add(() => focusTrap.deactivate())
    this.disposables.nextFrame(() => focusTrap.activate())
    toggleBodyScroll(this.preventScroll ? "off" : undefined)
  }

  deactivate() {
    this.disposables.dispose()
    toggleBodyScroll(this.preventScroll ? "on" : undefined)
  }
}
