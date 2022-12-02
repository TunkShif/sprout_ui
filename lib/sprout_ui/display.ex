defmodule SproutUI.Display do
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  import SproutUI.Helper

  attr :items, :list, required: true
  attr :allow_multiple, :boolean, default: false
  attr :on_open, JS, default: %JS{}
  attr :on_close, JS, default: %JS{}
  attr :rest, :global
  slot :inner_block, required: true

  def accordion(assigns) do
    %{items: items, on_open: on_open, on_close: on_close} = assigns

    id = unique_id()

    items =
      for {item, index} <- Enum.with_index(items) do
        Map.merge(item, %{
          id: index,
          container_attrs: %{
            "data-part" => "container",
            "data-state" => "closed",
            "on-open-js" => on_open,
            "on-close-js" => on_close
          },
          trigger_attrs: %{
            "data-part" => "trigger",
            "id" => "accordion-#{id}-item-trigger-#{index}",
            "aria-expanded" => "false",
            "aria-controls" => "accordion-#{id}-item-panel-#{index}"
          },
          panel_attrs: %{
            "data-part" => "panel",
            "id" => "accordion-#{id}-item-panel-#{index}",
            "hidden" => true
          }
        })
      end

    api = %{items: items}

    assigns = assign(assigns, id: id, api: api)

    ~H"""
    <sp-accordion id={"accordion-#{@id}"} data-allow-multiple={@allow_multiple} {@rest}>
      <%= render_slot(@inner_block, @api) %>
    </sp-accordion>
    """
  end
end
