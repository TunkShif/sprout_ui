export default class Disposables {
    private disposables;
    add(callback: () => void): () => void;
    nextFrame(callback: () => void): () => void;
    addEventListener<TEvent extends keyof HTMLElementEventMap>(element: HTMLElement, event: TEvent | string, listener: (event: HTMLElementEventMap[TEvent] | Event) => any, options?: boolean | AddEventListenerOptions | undefined): () => void;
    dispose(): void;
}
