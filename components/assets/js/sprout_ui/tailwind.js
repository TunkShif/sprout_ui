const plugin = require("tailwindcss/plugin");

const states = ["open", "active"];

module.exports = plugin.withOptions(({ prefix = "ui" } = {}) => {
  return ({ addVariant }) => {
    states.forEach(state => {
      addVariant(`${prefix}-${state}`, [
        `&[data-ui-state~="${state}"]`,
        `:where([data-ui-state~="${state}"]) &`
      ]);
      addVariant(`${prefix}-not-${state}`, [
        `&[data-ui-state]:not([data-ui-state~="${state}"])`,
        `:where([data-ui-state]:not([data-ui-state~="${state}"])) &:not([data-ui-state])`
      ]);
    });
  };
});
