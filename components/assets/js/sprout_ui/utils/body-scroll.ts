export const toggleBodyScroll = (state: "on" | "off") => {
  switch (state) {
    case "on":
      Object.assign(document.body.style, { overflow: "" })
      break
    case "off":
      Object.assign(document.body.style, { overflow: "hidden" })
      break
  }
}
