import type { SproutComponent, SproutHook } from "./types";
type CreateSproutConfigOptions = {
    components: SproutComponent[];
};
type CreateSproutConfig = (opts: CreateSproutConfigOptions) => {
    initComponents: () => void;
    hooks: {
        [key: string]: SproutHook;
    };
    handleDomChange: (from: HTMLElement, to: HTMLElement) => void;
};
declare const createSproutConfig: CreateSproutConfig;
export default createSproutConfig;
export * from "./components";
export * from "./types";
