export const toggleBodyScroll = (state?: "on" | "off") => {
  if (!state) return
  switch (state) {
    case "on":
      Object.assign(document.body.style, { overflow: "" })
      break
    case "off":
      Object.assign(document.body.style, { overflow: "hidden" })
      break
  }
}
