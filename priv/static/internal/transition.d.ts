type TransitionStatus = "ended" | "canceled";
type TransitionStage = "enter" | "leave";
interface TransitionClasses {
    enter: string[];
    enterFrom: string[];
    enterTo: string[];
    leave: string[];
    leaveFrom: string[];
    leaveTo: string[];
}
export declare const doTransition: (element: HTMLElement, stage: TransitionStage, classes: TransitionClasses, callbacks: {
    onStart?: ((stage: TransitionStage) => void) | undefined;
    onDone?: ((stage: TransitionStage, status: TransitionStatus) => void) | undefined;
}) => () => void;
export declare const transitionElement: (element: HTMLElement, stage: TransitionStage) => Promise<TransitionStatus | undefined>;
export {};
