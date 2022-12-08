const plugin = require("tailwindcss/plugin")

const states = ["open", "closed", "checked", "unchecked", "on", "off"]

module.exports = plugin.withOptions(({ prefix = "ui" } = {}) => {
  return ({ addVariant }) => {
    states.forEach((state) => {
      addVariant(`${prefix}-${state}`, [
        `&[data-state~="${state}"]`,
        `:where([data-state~="${state}"]) &`
      ])
    })
  }
})
