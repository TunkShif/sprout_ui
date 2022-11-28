export declare const query: (part: string) => (target: HTMLElement, propertyKey: string) => void;
export declare const attr: (name: string, converter?: ((val: string | null) => any) | undefined) => (target: HTMLElement, propertyKey: string) => void;
