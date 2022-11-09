defmodule SproutUI.Overlay do
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  attr :id, :string, default: "modal"
  attr :element, :string, default: "sprt-modal"
  attr :open, :boolean, default: false
  attr :on_open, JS, default: %JS{}
  attr :on_close, JS, default: %JS{}
  attr :rest, :global

  slot :inner_block, required: true

  def modal(assigns) do
    id = assigns.id
    state = if assigns.open, do: "open", else: ""

    setup = %{
      id: id,
      modal: %{
        attrs: %{
          "id" => id,
          "data-part" => "modal",
          "data-ui-state" => state,
          "data-on-open-js" =>
            assigns.on_open |> JS.focus_first(to: "##{id} [data-part=container]"),
          "data-on-close-js" => assigns.on_close |> JS.pop_focus()
        }
      },
      container: %{
        attrs: %{
          "role" => "dialog",
          "data-part" => "container",
          "aria-modal" => "true",
          "aria-labelledby" => "#{id}-title",
          "aria-describedby" => "#{id}-content",
          "tabindex" => "-1"
        }
      },
      title: %{
        attrs: %{
          "id" => "#{id}-title"
        }
      },
      close: %{
        attrs: %{
          "role" => "button",
          "aria-label" => "Modal close button",
          "phx-click" => JS.set_attribute({"data-ui-state", ""}, to: "##{id}")
        }
      }
    }

    assigns = assigns |> assign(:setup, setup)

    ~H"""
    <.dynamic_tag name={@element} {@setup.modal.attrs} {@rest}>
      <%= render_slot(@inner_block, @setup) %>
    </.dynamic_tag>
    """
  end

  attr :rest, :global

  def modal_overlay(assigns) do
    ~H"""
    <div data-part="overlay" aria-hidden="true" {@rest}></div>
    """
  end

  attr :setup, :any, required: true
  attr :rest, :global

  slot :title, requied: false do
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
          <%= render_slot(content) %>
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
