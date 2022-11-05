defmodule SproutUI.Overlay do
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  @on_modal_init_event "sprt:modal:init"
  @on_modal_open_event "sprt:modal:open"
  @on_modal_close_event "sprt:modal:close"

  attr :id, :string, default: "modal"
  attr :is_open, :boolean, default: false
  attr :on_open, JS, default: %JS{}
  attr :on_close, JS, default: %JS{}
  attr :disable_scrolling, :boolean, default: true
  attr :await_close_animation, :boolean, default: false
  attr :rest, :global

  slot(:trigger, required: false) do
    attr :class, :string
    attr :as_child, :boolean
  end

  slot(:inner_block, required: true)

  def modal(assigns) do
    id = assigns.id
    state = if assigns.is_open, do: "open", else: ""

    modal_init_event_detail = %{
      options: %{
        "disableScrolling" => assigns.disable_scrolling,
        "awaitCloseAnimation" => assigns.await_close_animation
      }
    }

    init_modal_op = JS.dispatch(@on_modal_init_event, detail: modal_init_event_detail)

    open_modal_op =
      assigns.on_open
      |> JS.dispatch(@on_modal_open_event, to: "##{id}")
      |> JS.focus_first(to: ~s(##{id} [data-part=container]))

    close_modal_op =
      assigns.on_close
      |> JS.dispatch(@on_modal_close_event, to: "##{id}")

    setup = %{
      id: id,
      trigger: %{
        attrs: %{
          "type" => "button",
          "data-part" => "trigger",
          "phx-click" => open_modal_op
        },
        open_modal: open_modal_op
      },
      modal: %{
        attrs: %{
          "id" => assigns.id,
          "data-part" => "modal",
          "data-ui-state" => state,
          "phx-mounted" => init_modal_op
        }
      },
      overlay: %{
        attrs: %{
          "id" => "#{id}-overlay",
          "data-ui-state" => state,
          "data-part" => "overlay",
          "aria-hidden" => "true"
        }
      },
      container: %{
        attrs: %{
          "id" => "#{id}-container",
          "role" => "dialog",
          "data-ui-state" => state,
          "data-part" => "container",
          "aria-modal" => "true",
          "aria-labelledby" => "#{id}-title",
          "aria-describedby" => "#{id}-content",
          "tabindex" => "-1",
          "phx-click-away" => close_modal_op,
          "phx-window-keydown" => close_modal_op,
          "phx-key" => "escape"
        }
      },
      title: %{
        attrs: %{
          "id" => "#{id}-title"
        }
      },
      content: %{
        close_modal: close_modal_op
      },
      close: %{
        attrs: %{
          "role" => "button",
          "aria-label" => "Modal close button",
          "phx-click" => close_modal_op
        },
        close_modal: close_modal_op
      }
    }

    assigns = assigns |> assign(:setup, setup)

    ~H"""
    <div>
      <%= for trigger <- @trigger do %>
        <%= unless trigger[:as_child] do %>
          <button {@setup.trigger.attrs} class={trigger[:class]}><%= render_slot(trigger) %></button>
        <% else %>
          <%= render_slot(trigger, @setup.trigger) %>
        <% end %>
      <% end %>

      <div {@setup.modal.attrs} {@rest}>
        <%= render_slot(@inner_block, @setup) %>
      </div>
    </div>
    """
  end

  attr :setup, :any, required: true
  attr :rest, :global

  def modal_overlay(assigns) do
    ~H"""
    <div {@setup.overlay.attrs} {@rest}></div>
    """
  end

  attr :setup, :any, required: true
  attr :rest, :global

  slot(:title, requied: false) do
    attr :class, :string

    attr :as_child, :boolean
  end

  slot(:content, required: true) do
    attr :class, :string
  end

  slot(:close, required: false) do
    attr :class, :string

    attr :as_child, :boolean
  end

  def modal_body(assigns) do
    ~H"""
    <section {@setup.container.attrs} {@rest}>
      <.focus_wrap id={"#{@setup.id}-focus"}>
        <%= for title <- @title do %>
          <%= unless title[:as_child] do %>
            <h2 {@setup.title.attrs} class={title[:class]}><%= render_slot(title) %></h2>
          <% else %>
            <%= render_slot(title, @setup.title) %>
          <% end %>
        <% end %>

        <div :for={content <- @content} id={"#{@setup.id}-content"} class={content[:class]}>
          <%= render_slot(content, @setup.content) %>
        </div>

        <%= for close <- @close do %>
          <%= unless close[:as_child] do %>
            <button {@setup.close.attrs} class={close[:class]}><%= render_slot(close) %></button>
          <% else %>
            <%= render_slot(close, @setup.close) %>
          <% end %>
        <% end %>
      </.focus_wrap>
    </section>
    """
  end
end
