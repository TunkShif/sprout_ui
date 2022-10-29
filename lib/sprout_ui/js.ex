defmodule SproutUI.JS do
  alias Phoenix.LiveView.JS

  def set_transition_state(is_showing, to: to) when is_boolean(is_showing),
    do: set_transition_state(%JS{}, is_showing, to)

  def set_transition_state(%JS{} = js, is_showing, to: to) when is_boolean(is_showing) do
    state = if is_showing, do: "show", else: "hide"
    JS.set_attribute(js, {"data-transition-state", state}, to: to)
  end
end
