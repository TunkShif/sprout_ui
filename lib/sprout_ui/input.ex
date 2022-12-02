defmodule SproutUI.Input do
  use Phoenix.Component

  import SproutUI.Helper

  attr :checked, :boolean, default: false
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
    <sp-switch id={"switch-#{@id}"} data-state={@state} {@rest}>
      <%= render_slot(@inner_block, @api) %>
    </sp-switch>
    """
  end
end
