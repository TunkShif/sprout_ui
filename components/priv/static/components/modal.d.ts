import type { SproutComponentSetup } from "../types";
export declare class ModalElement extends HTMLElement {
    open: boolean;
    private disableScrolling;
    private containerEl;
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    private getContainerEl;
    private update;
    private handleClick;
    private handleKeyDown;
    private execOnOpenJs;
    private execOnCloseJs;
    private toggleScrolling;
}
declare const modal: SproutComponentSetup;
export default modal;
