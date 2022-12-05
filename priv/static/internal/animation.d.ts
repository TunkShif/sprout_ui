type AnimationStatus = "finished" | "cancelled";
export declare const waitForAnimation: (element: Element) => Promise<AnimationStatus[]>;
export declare const stopAnimations: (element: Element) => Promise<unknown[]>;
export {};
