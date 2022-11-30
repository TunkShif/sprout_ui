defmodule SproutUI.Overlay do
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  import SproutUI.Helper

  attr :open, :boolean, default: false
  attr :prevent_scroll, :boolean, default: true
  attr :close_on_esc, :boolean, default: true
  attr :close_on_click_away, :boolean, default: true
  attr :on_open, JS, default: %JS{}
  attr :on_close, JS, default: %JS{}
  attr :rest, :global

  slot :inner_block, required: true

  def dialog(assigns) do
    %{open: open} = assigns

    id = unique_id()
    state = if open, do: "open", else: "closed"
    open_modal_js = JS.set_attribute({"data-state", "open"}, to: "#dialog-#{id}")
    close_modal_js = JS.set_attribute({"data-state", "closed"}, to: "#dialog-#{id}")

    api = %{
      open_modal_js: open_modal_js,
      close_modal_js: close_modal_js,
      trigger_attrs: %{
        "data-part" => "trigger",
        "phx-click" => open_modal_js
      },
      backdrop_attrs: %{
        "data-part" => "backdrop",
        "aria-hidden" => "true"
      },
      container_attrs: %{
        "data-part" => "container",
        "hidden" => !open
      },
      panel_attrs: %{
        "data-part" => "panel",
        "role" => "dialog",
        "tabindex" => "-1",
        "aria-modal" => "true",
        "aria-labelledby" => "dialog-title-#{id}",
        "aria-describedby" => "dialog-decription-#{id}"
      },
      title_attrs: %{
        "data-part" => "title",
        "id" => "dialog-title-#{id}"
      },
      description_attrs: %{
        "data-part" => "description",
        "id" => "dialog-description-#{id}"
      },
      close_button_attrs: %{
        "data-part" => "close-button",
        "phx-click" => close_modal_js
      }
    }

    assigns = assign(assigns, id: id, state: state, api: api)

    ~H"""
    <sp-dialog
      id={"dialog-#{@id}"}
      data-state={@state}
      data-on-open-js={@on_open}
      data-on-close-js={@on_close}
      data-prevent-scroll={@prevent_scroll}
      data-close-on-esc={@close_on_esc}
      data-close-on-click-away={@close_on_click_away}
      phx-mounted={@open && @api.open_modal_js}
      {@rest}
    >
      <%= render_slot(@inner_block, @api) %>
    </sp-dialog>
    """
  end

  attr :open, :boolean, default: false

  attr :placement, :string,
    default: "bottom",
    values: [
      "top",
      "top-start",
      "top-end",
      "right",
      "right-start",
      "right-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "left",
      "left-start",
      "left-end"
    ]

  attr :offset, :integer, default: nil
  attr :close_on_esc, :boolean, default: true
  attr :close_on_click_away, :boolean, default: true
  attr :on_open, JS, default: %JS{}
  attr :on_close, JS, default: %JS{}
  attr :rest, :global

  slot :inner_block, required: true

  def popover(assigns) do
    %{
      open: open,
      placement: placement,
      offset: offset
    } = assigns

    id = unique_id()
    state = if open, do: "open", else: "closed"
    open_popover_js = JS.set_attribute({"data-state", "open"}, to: "#popover-#{id}")
    close_popover_js = JS.set_attribute({"data-state", "closed"}, to: "#popover-#{id}")

    api = %{
      open_popover_js: open_popover_js,
      close_popover_js: close_popover_js,
      trigger_attrs: %{
        "data-part" => "trigger",
        "id" => "popover-trigger-#{id}",
        "aria-expanded" => if(open, do: "true", else: "false"),
        "aria-controls" => "popover-panel-#{id}"
      },
      panel_attrs: %{
        "data-part" => "panel",
        "id" => "popover-panel-#{id}",
        "is" => "floating-element",
        "data-anchor" => "#popover-trigger-#{id}",
        "data-placement" => placement,
        "data-offset" => offset,
        "data-shift" => true,
        "data-flip" => true,
        "tabindex" => "-1",
        "hidden" => !open
      },
      arrow_attrs: %{
        "data-part" => "arrow"
      },
      close_button_attrs: %{
        "data-part" => "close-button",
        "phx-click" => close_popover_js
      }
    }

    assigns = assign(assigns, id: id, state: state, api: api)

    ~H"""
    <sp-popover
      id={"popover-#{@id}"}
      data-state={@state}
      data-on-open-js={@on_open}
      data-on-close-js={@on_close}
      data-close-on-esc={@close_on_esc}
      data-close-on-click-away={@close_on_click_away}
      phx-mounted={@open && @api.open_popover_js}
      {@rest}
    >
      <%= render_slot(@inner_block, @api) %>
    </sp-popover>
    """
  end

  attr :active, :boolean, default: false

  attr :placement, :string,
    default: "top",
    values: [
      "top",
      "top-start",
      "top-end",
      "right",
      "right-start",
      "right-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "left",
      "left-start",
      "left-end"
    ]

  attr :rest, :global

  slot :inner_block, required: true

  def tooltip(assigns) do
    id = unique_id()
    state = if assigns.active, do: "active", else: "inactive"

    api = %{
      trigger_attrs: %{
        "data-part" => "trigger"
      },
      container_attrs: %{
        "data-part" => "container"
      },
      arrow_attrs: %{
        "data-part" => "arrow"
      }
    }

    assigns = assign(assigns, id: id, state: state, api: api)

    ~H"""
    <sp-tooltip id={"tooltip-#{@id}"} placement={@placement} data-state={@state} {@rest}>
      <%= render_slot(@inner_block, @api) %>
    </sp-tooltip>
    """
  end
end
