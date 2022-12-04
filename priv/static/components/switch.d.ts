import { LiveElement } from "@tunkshif/live-element";
import { SproutComponentSetup } from "../types";
export declare class SwitchElement extends LiveElement {
    track: HTMLElement;
    thumb: HTMLElement;
    state: "checked" | "unchecked";
    private listeners;
    static get observedAttributes(): string[];
    connectedCallback(): void;
    updatedCallback(attribute: string, _oldValue: unknown, _newValue: unknown): void;
    disconnectedCallback(): void;
    addEventListeners(): void;
    toggle(): void;
    handleStateChange(): Promise<void>;
}
declare const Switch: SproutComponentSetup;
export default Switch;
