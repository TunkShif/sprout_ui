"use strict";
const plugin = require("tailwindcss/plugin");
const states = ["open", "closed"];
module.exports = plugin(({ addVariant }) => {
  states.forEach((state) => {
    addVariant(`sprt-${state}`, `&[data-state=${state}]`);
  });
});
//# sourceMappingURL=sprout_ui_tailwind.js.map
