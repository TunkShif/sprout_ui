export interface SproutComponent {
  init?: () => void
  hook?: () => { [key: string]: LiveViewHook }
  handleDomChange?: (from: HTMLElement, to: HTMLElement) => void
}

export type SproutComponentSetupOptions = {
  hook?: string
}

export type SproutComponentSetup = (opts?: SproutComponentSetupOptions) => SproutComponent

export type SproutEvent<T = unknown> = CustomEvent<T> & {
  target: HTMLElement
}

export interface LiveViewHook {
  el: HTMLElement
  mounted(): void
  updated?(): void
  destroyed?(): void
  disconnected?(): void
  reconnected?(): void
}
