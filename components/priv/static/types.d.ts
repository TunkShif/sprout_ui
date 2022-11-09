declare global {
    class LiveSocket {
        execJS(el: HTMLElement, js: string): void;
    }
    interface Window {
        liveSocket: LiveSocket;
    }
    class LiveViewHook {
        el: HTMLElement;
        mounted(): void;
        updated?(): void;
        destroyed?(): void;
        disconnected?(): void;
        reconnected?(): void;
    }
}
export interface SproutComponent {
    init?: () => void;
    hook?: () => {
        [key: string]: SproutHook;
    };
    handleDomChange?: (from: HTMLElement, to: HTMLElement) => void;
}
export declare type SproutComponentSetupOptions = {
    hook?: string;
    element?: string;
};
export declare type SproutComponentSetup = (opts?: SproutComponentSetupOptions) => SproutComponent;
export declare type SproutEvent<T = unknown> = CustomEvent<T> & {
    target: HTMLElement;
};
export interface SproutHook extends LiveViewHook {
    getConfig(): unknown;
}
