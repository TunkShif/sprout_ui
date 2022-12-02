interface QueryOptions {
    customRoot?: boolean;
    all?: boolean;
}
export declare const query: (part: string, options?: QueryOptions) => (target: any, propertyKey: string) => void;
export declare const attr: (name: string, converter?: ((val: string | null) => any) | undefined) => (target: HTMLElement, propertyKey: string) => void;
export {};
