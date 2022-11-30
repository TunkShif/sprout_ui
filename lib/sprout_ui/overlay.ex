defmodule SproutUI.Overlay do
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  import SproutUI.Helper

  attr :open, :boolean, default: false
  attr :on_open, JS, default: %JS{}
  attr :on_close, JS, default: %JS{}
  attr :prevent_scroll, :boolean, default: true
  attr :close_on_esc, :boolean, default: true
  attr :close_on_click_away, :boolean, default: true
  attr :rest, :global

  slot :inner_block, required: true

  def dialog(assigns) do
    %{open: open, close_on_esc: close_on_esc, close_on_click_away: close_on_click_away} = assigns

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
        "hidden" => !assigns.open
      },
      panel_attrs: %{
        "data-part" => "panel",
        "role" => "dialog",
        "tabindex" => "-1",
        "aria-modal" => "true",
        "aria-labelledby" => "title-#{id}",
        "aria-describedby" => "content-#{id}",
        "phx-click-away" => close_on_click_away && close_modal_js,
        "phx-key" => close_on_esc && "escape",
        "phx-window-keydown" => close_on_esc && close_modal_js
      },
      title_attrs: %{
        "data-part" => "title",
        "id" => "title-#{id}"
      },
      description_attrs: %{
        "data-part" => "description",
        "id" => "description-#{id}"
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
      phx-mounted={@open && @api.open_modal_js}
      {@rest}
    >
      <%= render_slot(@inner_block, @api) %>
    </sp-dialog>
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
