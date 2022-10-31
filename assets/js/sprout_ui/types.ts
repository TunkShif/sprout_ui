interface LiveViewHook {
  el: HTMLElement
  mounted(): void
  updated?(): void
  destroyed?(): void
  disconnected?(): void
  reconnected?(): void
}

export interface SproutComponent {
  init?: () => void
  hook?: () => { [key: string]: SproutHook }
  handleDomChange?: (from: HTMLElement, to: HTMLElement) => void
}

export type SproutComponentSetupOptions = {
  hook?: string
}

export type SproutComponentSetup = (opts?: SproutComponentSetupOptions) => SproutComponent

export type SproutEvent<T = unknown> = CustomEvent<T> & {
  target: HTMLElement
}

export interface SproutHook extends LiveViewHook {
  getConfig(): unknown
}
