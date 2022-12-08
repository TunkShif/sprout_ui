defmodule SproutUI.Overlay do
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  import SproutUI.Helper

  attr :prevent_scroll, :boolean, default: true
  attr :close_on_esc, :boolean, default: true
  attr :close_on_click_away, :boolean, default: true
  attr :on_open, JS, default: %JS{}
  attr :on_close, JS, default: %JS{}
  attr :rest, :global

  slot :inner_block, required: true

  def dialog(assigns) do
    id = unique_id()
    open_dialog_js = JS.set_attribute({"data-state", "open"}, to: "#dialog-#{id}")
    close_dialog_js = JS.set_attribute({"data-state", "closed"}, to: "#dialog-#{id}")

    api = %{
      open_dialog_js: open_dialog_js,
      close_dialog_js: close_dialog_js,
      trigger_attrs: %{
        "data-part" => "trigger"
      },
      backdrop_attrs: %{
        "data-part" => "backdrop",
        "aria-hidden" => "true"
      },
      container_attrs: %{
        "data-part" => "container",
        "hidden" => true
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
        "data-part" => "close-button"
      }
    }

    assigns = assign(assigns, id: id, api: api)

    ~H"""
    <sp-dialog
      id={"dialog-#{@id}"}
      data-state="closed"
      data-on-open-js={@on_open}
      data-on-close-js={@on_close}
      data-prevent-scroll={@prevent_scroll}
      data-close-on-esc={@close_on_esc}
      data-close-on-click-away={@close_on_click_away}
      {@rest}
    >
      <%= render_slot(@inner_block, @api) %>
    </sp-dialog>
    """
  end

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
      placement: placement,
      offset: offset
    } = assigns

    id = unique_id()
    open_popover_js = JS.set_attribute({"data-state", "open"}, to: "#popover-#{id}")
    close_popover_js = JS.set_attribute({"data-state", "closed"}, to: "#popover-#{id}")

    api = %{
      open_popover_js: open_popover_js,
      close_popover_js: close_popover_js,
      trigger_attrs: %{
        "data-part" => "trigger",
        "id" => "popover-trigger-#{id}",
        "aria-expanded" => "false",
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
        "hidden" => true
      },
      arrow_attrs: %{
        "data-part" => "arrow"
      },
      close_button_attrs: %{
        "data-part" => "close-button"
      }
    }

    assigns = assign(assigns, id: id, api: api)

    ~H"""
    <sp-popover
      id={"popover-#{@id}"}
      data-state="closed"
      data-on-open-js={@on_open}
      data-on-close-js={@on_close}
      data-close-on-esc={@close_on_esc}
      data-close-on-click-away={@close_on_click_away}
      {@rest}
    >
      <%= render_slot(@inner_block, @api) %>
    </sp-popover>
    """
  end

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

  attr :offset, :integer, default: nil
  attr :open_delay, :integer, default: 200
  attr :close_delay, :integer, default: 300
  attr :on_open, JS, default: %JS{}
  attr :on_close, JS, default: %JS{}
  attr :rest, :global

  slot :inner_block, required: true

  def tooltip(assigns) do
    %{
      placement: placement,
      offset: offset
    } = assigns

    id = unique_id()

    api = %{
      trigger_attrs: %{
        "data-part" => "trigger",
        "id" => "tooltip-trigger-#{id}",
        "aria-describedby" => "tooltip-container-#{id}"
      },
      container_attrs: %{
        "data-part" => "container",
        "is" => "floating-element",
        "id" => "tooltip-container-#{id}",
        "role" => "tooltip",
        "data-anchor" => "#tooltip-trigger-#{id}",
        "data-placement" => placement,
        "data-offset" => offset,
        "data-shift" => true,
        "data-flip" => true,
        "hidden" => true
      },
      arrow_attrs: %{
        "data-part" => "arrow"
      }
    }

    assigns = assign(assigns, id: id, api: api)

    ~H"""
    <sp-tooltip
      id={"tooltip-#{@id}"}
      data-state="closed"
      data-open-delay={@open_delay}
      data-close-delay={@close_delay}
      data-on-open-js={@on_open}
      data-on-close-js={@on_close}
      {@rest}
    >
      <%= render_slot(@inner_block, @api) %>
    </sp-tooltip>
    """
  end
end
