import { LiveElement } from "@tunkshif/live-element";
import type { SproutComponentSetup } from "../types";
export declare class DialogElement extends LiveElement {
    trigger: HTMLElement;
    dialog: HTMLElement;
    backdrop: HTMLElement;
    panel: HTMLElement;
    closeButtons: HTMLElement[];
    state: "open" | "closed";
    private modal;
    private disposables;
    private listeners;
    static get observedAttributes(): string[];
    connectedCallback(): void;
    updatedCallback(attribute: string, _oldValue: unknown, _newValue: unknown): void;
    disconnectedCallback(): void;
    addEventListeners(): void;
    handleStateChange(): Promise<void>;
}
declare const Dialog: SproutComponentSetup;
export default Dialog;
