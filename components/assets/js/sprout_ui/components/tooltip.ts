import SproutElement from "../internal/sprout-element";

type TooltipUIState = "active" | "inactive"

class TooltipElement extends SproutElement<TooltipUIState> {
  private trigger: HTMLElement
  private popup: HTMLElement
}
