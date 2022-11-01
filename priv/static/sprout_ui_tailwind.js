"use strict";
const plugin = require("tailwindcss/plugin");
const states = ["open"];
module.exports = plugin(({ addVariant }) => {
  states.forEach((state) => {
    addVariant(`sprt-${state}`, `&[data-state=${state}]`);
  });
});
module.exports = plugin.withOptions(({ prefix = "ui" } = {}) => {
  return ({ addVariant }) => {
    states.forEach((state) => {
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
//# sourceMappingURL=sprout_ui_tailwind.js.map
