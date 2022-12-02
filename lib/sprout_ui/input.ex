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
        "aria-checked" => if(checked, do: "true", else: "false")
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
end
