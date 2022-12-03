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
  @query("container", { part: true, all: true })
  containers: HTMLElement[]

  @attr("data-allow-multiple", { converter: isTruthy })
  allowMultiple: boolean

  items: AccordionItem[]

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
        if (item.root.dataset.state === "open") {
          this.close(item)
        } else {
          if (!this.allowMultiple) {
            this.closeAll()
          }
          this.open(item)
        }
      })
    })
  }

  async open(item: AccordionItem) {
    LiveViewJS.exec(item.root, item.root.dataset.onOpenJs)

    LiveViewJS.removeAttribute(item.panel, "hidden")

    const { height } = item.panel.getBoundingClientRect()
    item.panel.style.setProperty("--accordion-panel-height", `${height}px`)

    LiveViewJS.setAttribute(item.root, "data-state", "open")
    await transitionElement(item.panel, "enter")
  }

  async close(item: AccordionItem) {
    if (item.root.dataset.state === "closed") return

    LiveViewJS.exec(item.root, item.root.dataset.onCloseJs)

    LiveViewJS.setAttribute(item.root, "data-state", "closed")
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
