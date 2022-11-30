const plugin = require("tailwindcss/plugin")

const states = ["open", "closed", "active", "inactive"]

module.exports = plugin.withOptions(({ prefix = "ui" } = {}) => {
  return ({ addVariant }) => {
    states.forEach((state) => {
      addVariant(`${prefix}-${state}`, [
        `&[data-ui-state~="${state}"]`,
        `:where([data-ui-state~="${state}"]) &`
      ])
    })
  }
})
