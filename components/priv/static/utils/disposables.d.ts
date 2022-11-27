export default function disposables(): {
    add(callback: () => void): () => void;
    nextFrame(callback: () => void): () => void;
    addEventListener<TEvent extends keyof HTMLElementEventMap>(element: HTMLElement, event: string | TEvent, listener: (event: Event | HTMLElementEventMap[TEvent]) => any, options?: boolean | AddEventListenerOptions | undefined): () => void;
    dispose(): void;
};
