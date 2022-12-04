import { LiveElement } from "@tunkshif/live-element";
import { SproutComponentSetup } from "../types";
export declare class TooltipElement extends LiveElement {
    trigger: HTMLElement;
    container: HTMLElement;
    state: "open" | "closed";
    openDelay: number;
    closeDelay: number;
    private disposables;
    private listeners;
    static get observedAttributes(): string[];
    connectedCallback(): void;
    updatedCallback(attribute: string, _oldValue: unknown, _newValue: unknown): void;
    disconnectedCallback(): void;
    addEventListeners(): void;
    handleStateChange(): Promise<void>;
}
declare const Tooltip: SproutComponentSetup;
export default Tooltip;
