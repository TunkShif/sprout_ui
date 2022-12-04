export declare const nextFrame: (callback: () => void) => () => void;
export declare class Disposables {
    private disposables;
    add(callback: () => void): () => void;
    nextFrame(callback: () => void): () => void;
    addEventListener<TEvent extends keyof HTMLElementEventMap>(element: Element | Document, event: TEvent | string, listener: (event: HTMLElementEventMap[TEvent] | Event) => any, options?: boolean | AddEventListenerOptions | undefined): () => void;
    setTimeout(handler: () => void, timeout?: number): () => void;
    dispose(): void;
}
