import { LiveElement } from "@tunkshif/live-element";
import type { SproutComponentSetup } from "../types";
export declare class ToggleElement extends LiveElement {
    state: "on" | "off";
    private listeners;
    static get observedAttributes(): string[];
    connectedCallback(): void;
    updatedCallback(attribute: string, _oldValue: unknown, _newValue: unknown): void;
    disconnectedCallback(): void;
    addEventListeners(): void;
    handleStateChange(): void;
}
declare const Toggle: SproutComponentSetup;
export default Toggle;
