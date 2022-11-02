import { SproutComponentSetup, SproutEvent } from "../types";

type ToggleAttributeEvent = SproutEvent<{ attribute: string; states: [string, string] }>;

const init = () => {
  window.addEventListener("sprt:toggle_attribute", e => {
    const { target, detail } = e as ToggleAttributeEvent;
    const state =
      target.getAttribute(detail.attribute) === detail.states[0]
        ? detail.states[1]
        : detail.states[0];
    target.setAttribute(detail.attribute, state);
  });
};

const global: SproutComponentSetup = () => ({
  init
});

export default global;
