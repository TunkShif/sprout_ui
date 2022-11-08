defmodule SproutUI.JS do
  alias Phoenix.LiveView.JS

  def toggle_ui_state({active}, to: to), do: toggle_ui_state(%JS{}, {active}, to: to)

  def toggle_ui_state({active, inactive}, to: to),
    do: toggle_ui_state(%JS{}, {active, inactive}, to: to)

  def toggle_ui_state(%JS{} = js, {active}, to: to), do: toggle_ui_state(js, {active, ""}, to: to)

  def toggle_ui_state(%JS{} = js, {active, inactive}, to: to),
    do: toggle_attribute(js, {"data-ui-state", {active, inactive}}, to: to)

  def toggle_attribute({name, {on, off}}, to: to),
    do: toggle_attribute(%JS{}, {name, {on, off}}, to: to)

  def toggle_attribute(%JS{} = js, {name, {on, off}}, to: to) do
    JS.dispatch(js, "sprt:toggle_attribute", to: to, detail: %{attribute: name, states: [on, off]})
  end
end
