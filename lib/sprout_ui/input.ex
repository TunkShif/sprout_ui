defmodule SproutUI.Input do
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  import SproutUI.Helper

  attr :checked, :boolean, default: false
  attr :on_checked, JS, default: %JS{}
  attr :on_unchecked, JS, default: %JS{}
  attr :rest, :global

  slot :inner_block, required: true

  def switch(assigns) do
    %{checked: checked} = assigns
    id = unique_id()
    state = if(checked, do: "checked", else: "unchecked")

    api = %{
      track_attrs: %{
        "data-part" => "track",
        "role" => "switch",
        "aria-checked" => to_string(checked)
      },
      thumb_attrs: %{
        "data-part" => "thumb"
      }
    }

    assigns = assign(assigns, id: id, state: state, api: api)

    ~H"""
    <sp-switch
      id={"switch-#{@id}"}
      data-state={@state}
      data-on-checked-js={@on_checked}
      data-on-unchecked-js={@on_unchecked}
      {@rest}
    >
      <%= render_slot(@inner_block, @api) %>
    </sp-switch>
    """
  end

  attr :on, :boolean, default: false
  attr :on_toggle_on, JS, default: %JS{}
  attr :on_toggle_off, JS, default: %JS{}
  attr :rest, :global

  slot :inner_block, required: true

  def toggle(assigns) do
    %{on: on} = assigns
    id = unique_id()
    state = if(on, do: "on", else: "off")

    assigns = assign(assigns, id: id, state: state)

    ~H"""
    <sp-toggle
      id={"toggle-#{@id}"}
      data-state={@state}
      data-on-toggle-on-js={@on_toggle_on}
      data-on-toggle-off-js={@on_toggle_off}
      {@rest}
    >
      <%= render_slot(@inner_block) %>
    </sp-toggle>
    """
  end
end
