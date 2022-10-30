import type { LiveViewHook, SproutComponent } from "./types"

type CreateSproutConfigOptions = {
  components: SproutComponent[]
}

type CreateSproutConfig = (opts: CreateSproutConfigOptions) => {
  initComponents: () => void
  hooks: { [key: string]: LiveViewHook }
  handleDomChange: (from: HTMLElement, to: HTMLElement) => void
}

const createSproutConfig: CreateSproutConfig = (opts) => {
  const components = opts.components
  return {
    initComponents: () => {
      components.forEach((comp) => comp.init?.())
    },
    hooks: Object.assign({}, ...components.map((comp) => comp.hook?.())),
    handleDomChange: (from: HTMLElement, to: HTMLElement) => {
      components.forEach((comp) => comp.handleDomChange?.(from, to))
    }
  }
}

export default createSproutConfig
export * from "./components"
