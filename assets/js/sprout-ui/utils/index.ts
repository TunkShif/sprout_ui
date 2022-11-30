export const isTruthy = (val: any) => val !== null && val !== undefined

export const isVisible = (element: HTMLElement) =>
  !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length > 0)

export const flipping = <T>(current: T, values: [T, T] = ["open", "closed"] as [T, T]) =>
  current === values[0] ? values[1] : values[0]
