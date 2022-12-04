defmodule SproutUI.Display do
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  import SproutUI.Helper

  attr :open, :boolean, default: false
  attr :on_open, JS, default: %JS{}
  attr :on_close, JS, default: %JS{}
  attr :rest, :global

  slot :inner_block, required: true

  def collapsible(assigns) do
    %{open: open} = assigns

    id = unique_id()
    state = if(open, do: "open", else: "closed")

    api = %{
      trigger_attrs: %{
        "data-part" => "trigger",
        "id" => "collapsible-trigger-#{id}",
        "aria-expanded" => to_string(open),
        "aria-controls" => "collapsible-panel-#{id}"
      },
      panel_attrs: %{
        "data-part" => "panel",
        "id" => "collapsible-panel-#{id}",
        "role" => "region",
        "aria-labelledby" => "collapsible-trigger-#{id}",
        "hidden" => !open
      }
    }

    assigns = assign(assigns, id: id, state: state, api: api)

    ~H"""
    <div
      is="sp-collapsible"
      id={"collapsible-#{@id}"}
      data-state={@state}
      data-on-open-js={@on_open}
      data-on-close-js={@on_close}
      {@rest}
    >
      <%= render_slot(@inner_block, @api) %>
    </div>
    """
  end

  attr :items, :list, required: true
  attr :allow_multiple, :boolean, default: false
  attr :on_item_open, JS, default: %JS{}
  attr :on_item_close, JS, default: %JS{}
  attr :rest, :global

  slot :inner_block, required: true

  def accordion(assigns) do
    %{items: items, on_item_open: on_item_open, on_item_close: on_item_close} = assigns

    id = unique_id()

    items =
      for {item, index} <- Enum.with_index(items) do
        Map.merge(item, %{
          index: index,
          container_attrs: %{
            "is" => "sp-collapsible",
            "data-controlled" => true,
            "data-part" => "container",
            "data-state" => "closed",
            "data-on-open-js" => on_item_open,
            "data-on-close-js" => on_item_close
          },
          trigger_attrs: %{
            "data-part" => "trigger",
            "id" => "accordion-item-trigger-#{id}-#{index}",
            "aria-expanded" => "false",
            "aria-controls" => "accordion-item-panel-#{id}-#{index}"
          },
          panel_attrs: %{
            "data-part" => "panel",
            "id" => "accordion-item-panel-#{id}-#{index}",
            "role" => "region",
            "aria-labelledby" => "accordion-item-trigger-#{id}-#{index}",
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
