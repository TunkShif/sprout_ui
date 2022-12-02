import "phoenix_html"
import { Socket } from "phoenix"
import { LiveSocket } from "phoenix_live_view"
import topbar from "../vendor/topbar"
import {
  createSproutConfig,
  Dialog,
  Floating,
  Popover,
  Tooltip,
  Switch,
  Accordion
} from "sprout-ui"

const { initComponents, hooks, handleDomChange } = createSproutConfig({
  components: [Dialog(), Floating(), Popover(), Tooltip(), Switch(), Accordion()]
})

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {
  params: { _csrf_token: csrfToken },
  hooks: {
    ...hooks
  },
  dom: {
    onBeforeElUpdated(from, to) {
      handleDomChange(from, to)
    }
  }
})

initComponents()

// Show progress bar on live navigation and form submits
topbar.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" })
window.addEventListener("phx:page-loading-start", (_info) => topbar.delayedShow(200))
window.addEventListener("phx:page-loading-stop", (_info) => topbar.hide())

liveSocket.connect()
window.liveSocket = liveSocket

window.addEventListener("demo:floating:scroll", ({ target }) => {
  target.scrollTo({ top: target.offsetHeight / 2 })
})
