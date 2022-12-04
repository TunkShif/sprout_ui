import { LiveElement } from "@tunkshif/live-element";
import { SproutComponentSetup } from "../types";
export declare class PopoverElement extends LiveElement {
    trigger: HTMLElement;
    panel: HTMLElement;
    closeButtons: HTMLElement[];
    state: "open" | "closed";
    private modal;
    private listeners;
    static get observedAttributes(): string[];
    connectedCallback(): void;
    updatedCallback(attribute: string, _oldValue: unknown, _newValue: unknown): void;
    disconnectedCallback(): void;
    addEventListeners(): void;
    handleStateChange(): Promise<void>;
}
declare const Popover: SproutComponentSetup;
export default Popover;
