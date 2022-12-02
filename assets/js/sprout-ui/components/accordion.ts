import { attr, query } from "../internal/decorators"
import SproutElement from "../internal/sprout-element"
import { transitionElement } from "../internal/transition"
import { SproutComponentSetup } from "../types"
import { isTruthy } from "../utils"
import Disposables from "../utils/disposables"

class AccordionItem {
  root: HTMLElement

  @query("trigger", { customRoot: true })
  trigger: HTMLElement
  @query("panel", { customRoot: true })
  panel: HTMLElement

  constructor(container: HTMLElement) {
    this.root = container
  }
}

class AccordionElement extends SproutElement {
  @query("container", { all: true })
  containers: HTMLElement[]

  @attr("data-allow-multiple", isTruthy)
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
          this.closeOne(item)
        } else {
          if (!this.allowMultiple) {
            this.closeAll()
          }
          this.openOne(item)
        }
      })
    })
  }

  async openOne(item: AccordionItem) {
    this.executeJs(item.root, item.root.dataset.onOpenJs)

    this.removeAttributeLive(item.panel, "hidden")

    const { height } = item.panel.getBoundingClientRect()
    console.log(height)
    item.panel.style.setProperty("--accordion-panel-height", `${height}px`)

    this.setAttributeLive(item.root, "data-state", "open")
    await transitionElement(item.panel, "enter")
  }

  async closeOne(item: AccordionItem) {
    if (item.root.dataset.state === "closed") return

    this.executeJs(item.root, item.root.dataset.onCloseJs)

    this.setAttributeLive(item.root, "data-state", "closed")
    await transitionElement(item.panel, "leave")
    this.setAttributeLive(item.panel, "hidden", "true")
  }

  closeAll() {
    this.items.forEach((item) => {
      this.closeOne(item)
    })
  }
}

const Accordion: SproutComponentSetup = () => ({
  init: () => {
    customElements.define("sp-accordion", AccordionElement)
  }
})

export default Accordion
