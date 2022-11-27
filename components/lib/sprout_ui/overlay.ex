defmodule SproutUI.Overlay do
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  import SproutUI.Helper
  import SproutUI.Utility, only: [floating: 1]

  attr :open, :boolean, default: false
  attr :on_open, JS, default: %JS{}
  attr :on_close, JS, default: %JS{}
  attr :prevent_scroll, :boolean, default: true
  attr :rest, :global

  slot :inner_block, required: true

  def dialog(assigns) do
    id = unique_id()
    state = if assigns.open, do: "open", else: "closed"
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
        "phx-click-away" => close_modal_js,
        "phx-key" => "escape",
        "phx-window-keydown" => close_modal_js
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
      phx-mounted={@open && @api.open_modal_js}
      {@rest}
    >
      <%= render_slot(@inner_block, @api) %>
    </sp-dialog>
    """
  end

  attr :id, :string, default: nil
  attr :active, :boolean, default: false
  attr :text, :string, default: ""
  attr :element, :string, default: "sprt-floating"

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

  attr :offset, :integer, default: 0
  attr :middleware, :list, default: nil
  attr :rest, :global

  slot :inner_block, required: true

  def tooltip(assigns) do
    id = unless assigns.id, do: "tooltip-wrapper-#{unique_id()}", else: assigns.id

    middleware =
      unless assigns.middleware,
        do: [offset: assigns.offset, flip: true, shift: %{"rootBoundary" => "document"}],
        else: assigns.middleware

    assigns = assign(assigns, id: id, middleware: middleware)

    ~H"""
    <div id={@id}>
      <%= render_slot(@inner_block) %>
      <.floating
        element={@element}
        active={@active}
        anchor={"##{@id}"}
        placement={@placement}
        middleware={@middleware}
        {@rest}
      >
        <span><%= @text %></span>
      </.floating>
    </div>
    """
  end
end
