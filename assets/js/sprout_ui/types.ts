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

export enum SproutStates {
  OPEN = "open",
  CLOSED = "closed"
}
