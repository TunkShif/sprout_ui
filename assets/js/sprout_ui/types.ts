export type SproutEvent<T = unknown> = CustomEvent<T> & {
  target: HTMLElement
}
