import { LiveElement, LiveViewJS } from "@tunkshif/live-element"
import { attr, query } from "@tunkshif/live-element/decorators"
import { transitionElement } from "../internal/transition"
import { SproutComponentSetup } from "../types"
import { isTruthy } from "../utils"
import Disposables from "../utils/disposables"

class AccordionItem {
  root: HTMLElement

  @query("trigger", { customRoot: true, part: true })
  trigger: HTMLElement
  @query("panel", { customRoot: true, part: true })
  panel: HTMLElement

  constructor(container: HTMLElement) {
    this.root = container
  }
}

class AccordionElement extends LiveElement {
  static TRIGGER_KEYS = ["Home", "End", "ArrowUp", "ArrowDown"]

  @query("container", { part: true, all: true })
  containers: HTMLElement[]

  @attr("data-allow-multiple", { converter: isTruthy })
  allowMultiple: boolean

  private items: AccordionItem[]
  private listeners = new Disposables()

  connectedCallback() {
    this.items = [...this.containers].map((it) => new AccordionItem(it))
    this.addEventListeners()
  }

  disconnectedCallback() {
    this.listeners.dispose()
  }

  addEventListeners() {
    this.items.forEach((item) => {
      this.listeners.addEventListener(item.trigger, "click", () => {
        this.toggle(item)
      })

      this.listeners.addEventListener(item.trigger, "keydown", (event) => {
        const { key } = event as KeyboardEvent
        if (!AccordionElement.TRIGGER_KEYS.includes(key)) return

        const itemCount = this.items.length
        const currentIndex = this.items.findIndex((it) => it === item)

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

        let cycledIndex = nextIndex % itemCount
        this.items[cycledIndex].trigger.focus()
      })
    })
  }

  toggle(item: AccordionItem) {
    if (item.root.dataset.state === "open") {
      this.close(item)
    } else {
      if (!this.allowMultiple) {
        this.closeAll()
      }
      this.open(item)
    }
  }

  async open(item: AccordionItem) {
    LiveViewJS.exec(item.root, item.root.dataset.onOpenJs)

    LiveViewJS.removeAttribute(item.panel, "hidden")

    const { height } = item.panel.getBoundingClientRect()
    item.panel.style.setProperty("--accordion-panel-height", `${height}px`)

    LiveViewJS.setAttribute(item.root, "data-state", "open")
    LiveViewJS.setAttribute(item.trigger, "aria-expanded", "true")
    await transitionElement(item.panel, "enter")
  }

  async close(item: AccordionItem) {
    if (item.root.dataset.state === "closed") return

    LiveViewJS.exec(item.root, item.root.dataset.onCloseJs)

    LiveViewJS.setAttribute(item.root, "data-state", "closed")
    LiveViewJS.setAttribute(item.trigger, "aria-expanded", "false")
    await transitionElement(item.panel, "leave")
    LiveViewJS.setAttribute(item.panel, "hidden", "true")
  }

  closeAll() {
    this.items.forEach((item) => {
      this.close(item)
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
