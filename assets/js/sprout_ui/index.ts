import global from "./components/global";
import type { SproutComponent, SproutHook } from "./types";

type CreateSproutConfigOptions = {
  components: SproutComponent[];
};

type CreateSproutConfig = (opts: CreateSproutConfigOptions) => {
  initComponents: () => void;
  hooks: { [key: string]: SproutHook };
  handleDomChange: (from: HTMLElement, to: HTMLElement) => void;
};

const createSproutConfig: CreateSproutConfig = opts => {
  const components = [global(), ...opts.components];
  return {
    initComponents: () => {
      components.forEach(comp => comp.init?.());
    },
    hooks: Object.assign({}, ...components.map(comp => comp.hook?.())),
    handleDomChange: (from: HTMLElement, to: HTMLElement) => {
      components.forEach(comp => comp.handleDomChange?.(from, to));
    }
  };
};

export default createSproutConfig;
export * from "./components";
export * from "./types";
