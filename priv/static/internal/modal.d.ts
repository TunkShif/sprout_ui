interface ModalOptions {
    preventScroll?: boolean;
    dismissOnEsc?: boolean;
    dismissOnClickAway?: boolean;
}
export default class Modal {
    private element;
    private preventScroll;
    private dismissOnEsc;
    private dismissOnClickAway;
    private listeners;
    private disposables;
    constructor(element: HTMLElement, options?: ModalOptions);
    addEventListeners(onDismiss: () => void): void;
    removeEventListeners(): void;
    activate(): void;
    deactivate(): void;
}
export {};
