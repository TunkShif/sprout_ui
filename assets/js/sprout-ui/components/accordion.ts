import { LiveElement, attr, query } from "@tunkshif/live-element"
import { SproutComponentSetup } from "../types"
import { isTruthy } from "../utils"
import { Disposables } from "../utils/disposables"
import type { CollapsibleElement } from "./collapsible"

export class AccordionElement extends LiveElement {
  static TRIGGER_KEYS = ["Home", "End", "ArrowUp", "ArrowDown"]

  @query("container", { part: true, all: true })
  items: CollapsibleElement[]

  @attr("data-allow-multiple", { converter: isTruthy })
  allowMultiple: boolean

  private listeners = new Disposables()

  connectedCallback() {
    this.addEventListeners()
  }

  disconnectedCallback() {
    this.listeners.dispose()
  }

  addEventListeners() {
    this.items.forEach((item) => {
      this.listeners.addEventListener(item.trigger, "click", () => {
        if (item.state === "open") {
          item.state = "closed"
        } else {
          if (!this.allowMultiple) this.closeAll()
          item.state = "open"
        }
      })

      this.listeners.addEventListener(item.trigger, "keydown", (event) => {
        const { key } = event as KeyboardEvent
        if (!AccordionElement.TRIGGER_KEYS.includes(key)) return

        const items = [...this.items]
        const itemCount = items.length
        const currentIndex = items.findIndex((it) => it === item)

        event.preventDefault()

        let nextIndex = 0
        switch (key) {
          case "Home":
            nextIndex = 0
            break
          case "End":
            nextIndex = itemCount - 1
            break
          case "ArrowDown":
            nextIndex = currentIndex + 1
            break
          case "ArrowUp":
            nextIndex = currentIndex - 1
            if (nextIndex < 0) {
              nextIndex = itemCount - 1
            }
            break
        }

        const cycledIndex = nextIndex % itemCount
        items[cycledIndex].trigger.focus()
      })
    })
  }

  closeAll() {
    this.items.forEach((item) => {
      item.state = "closed"
    })
  }
}

const Accordion: SproutComponentSetup = () => ({
  init: () => {
    customElements.define("sp-accordion", AccordionElement)
  },
  handleDomChange: (from, to) => {
    if (from.id.startsWith("accordion") && from.dataset.part === "panel") {
      const property = "--accordion-panel-height"
      to.style.setProperty(property, from.style.getPropertyValue(property))
    }
  }
})

export default Accordion
