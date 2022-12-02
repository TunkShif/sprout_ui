type TransitionStatus = "ended" | "canceled";
type TransitionStage = "enter" | "leave";
export declare const transitionElement: (element: HTMLElement, stage: TransitionStage) => Promise<TransitionStatus | undefined>;
export declare const waitForTransition: (element: HTMLElement) => Promise<TransitionStatus>;
export {};
