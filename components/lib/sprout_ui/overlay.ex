defmodule SproutUI.Overlay do
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  import SproutUI.Utility, only: [floating: 1]
  import SproutUI.Helper, only: [unique_id: 0]

  attr :id, :string, required: true
  attr :open, :boolean, default: false
  attr :on_open, JS, default: %JS{}
  attr :on_close, JS, default: %JS{}
  attr :disable_scrolling, :boolean, default: true
  attr :rest, :global

  slot :inner_block, required: true

  def modal(%{id: id, open: open, disable_scrolling: disable_scrolling} = assigns) do
    maybe_open_on_mounted = fn
      js, true -> SproutUI.JS.open_modal(js, to: "##{id}")
      js, false -> js
    end

    on_mounted_js = JS.dispatch("sprt:modal:init") |> maybe_open_on_mounted.(open)
    on_removed_js = JS.dispatch("sprt:modal:remove")

    setup = %{
      modal_attrs: %{
        "id" => id,
        "phx-mounted" => on_mounted_js,
        "phx-remove" => on_removed_js,
        "data-ui-state" => if(open, do: "open", else: ""),
        "data-disable-scrolling" => disable_scrolling,
        "data-on-open-js" => assigns.on_open,
        "data-on-close-js" => assigns.on_close
      }
    }

    assigns = assign(assigns, :setup, setup)

    ~H"""
    <div {@setup.modal_attrs} {@rest}>
      <%= render_slot(@inner_block) %>
    </div>
    """
  end

  attr :rest, :global

  def modal_overlay(assigns) do
    ~H"""
    <div aria-hidden="true" {@rest}></div>
    """
  end

  attr :modal_for, :string, required: true
  attr :rest, :global

  slot :title, requied: true do
    attr :class, :string

    attr :as_child, :boolean
  end

  slot :content, required: true do
    attr :class, :string
  end

  slot :close, required: false do
    attr :class, :string

    attr :as_child, :boolean
  end

  def modal_body(%{modal_for: id} = assigns) do
    close_modal_js = SproutUI.JS.close_modal(to: "##{id}")

    setup = %{
      container_attrs: %{
        "role" => "dialog",
        "aria-modal" => "true",
        "aria-labelledby" => "#{id}-title",
        "aria-describedby" => "#{id}-content",
        "tabindex" => "-1",
        "phx-click-away" => close_modal_js,
        "phx-window-keydown" => close_modal_js,
        "phx-key" => "escape"
      },
      title_attrs: %{
        "id" => "#{id}-title"
      },
      close_attrs: %{
        "role" => "button",
        "aria-label" => "Modal close button",
        "phx-click" => close_modal_js
      }
    }

    assigns = assign(assigns, :setup, setup)

    ~H"""
    <div {@setup.container_attrs} {@rest}>
      <.focus_wrap id={"#{@modal_for}-focus-wrapper"}>
        <%= for title <- @title do %>
          <%= unless title[:as_child] do %>
            <h2 {@setup.title_attrs} class={title[:class]}><%= render_slot(title) %></h2>
          <% else %>
            <%= render_slot(title, @setup.title_attrs) %>
          <% end %>
        <% end %>

        <div :for={content <- @content} id={"#{@modal_for}-content"} class={content[:class]}>
          <%= render_slot(content) %>
        </div>

        <%= for close <- @close do %>
          <%= unless close[:as_child] do %>
            <button {@setup.close_attrs} class={close[:class]}><%= render_slot(close) %></button>
          <% else %>
            <%= render_slot(close, @setup.close_attrs) %>
          <% end %>
        <% end %>
      </.focus_wrap>
    </div>
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
