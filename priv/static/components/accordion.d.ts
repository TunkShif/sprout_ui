import { LiveElement } from "@tunkshif/live-element";
import { SproutComponentSetup } from "../types";
import type { CollapsibleElement } from "./collapsible";
export declare class AccordionElement extends LiveElement {
    static TRIGGER_KEYS: string[];
    items: CollapsibleElement[];
    allowMultiple: boolean;
    private listeners;
    connectedCallback(): void;
    disconnectedCallback(): void;
    addEventListeners(): void;
    closeAll(): void;
}
declare const Accordion: SproutComponentSetup;
export default Accordion;
