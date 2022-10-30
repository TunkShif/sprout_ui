defmodule SproutUI.Overlay do
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  # TODO: rewriting docs

  @on_modal_open_event "sprt:modal:open"
  @on_modal_close_event "sprt:modal:close"

  attr :id, :string,
    default: "modal",
    doc: "The DOM identifier of the modal container tag"

  attr :is_open, :boolean,
    default: false,
    doc: "The initial state of the modal"

  attr :on_open, JS,
    default: %JS{},
    doc: "JS command executed when opening the modal"

  attr :on_close, JS,
    default: %JS{},
    doc: "JS command executed when closing the modal"

  attr :disable_scrolling, :boolean,
    default: true,
    doc: "Whether to disable page scrolling when modal is opened"

  attr :await_close_animation, :boolean,
    default: false,
    doc: "Whether to await closing animation"

  attr :rest, :global, doc: "Additional HTML attributes added to the modal tag"

  slot(:trigger, required: false, doc: "The trigger to open the modal, usually a `button` element") do
    attr :class, :string, doc: "Classes added to the trigger button element"

    attr :as_child, :boolean,
      doc: "Use the an HTML element or custom component as the slot content"
  end

  slot(:inner_block, required: true)

  def modal(assigns) do
    id = assigns.id
    state = if assigns.is_open, do: "open", else: "closed"

    open_modal_op =
      assigns.on_open
      |> open_modal(
        to: "##{id}",
        params: %{
          disable_scrolling: assigns.disable_scrolling
        }
      )

    close_modal_op =
      assigns.on_close
      |> close_modal(
        to: "##{id}",
        params: %{
          await_animation: assigns.await_close_animation,
          disable_scrolling: assigns.disable_scrolling
        }
      )

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
      overlay: %{
        attrs: %{
          "id" => "#{id}-overlay",
          "data-state" => state,
          "data-part" => "overlay",
          "aria-hidden" => "true"
        }
      },
      container: %{
        attrs: %{
          "id" => "#{id}-container",
          "role" => "dialog",
          "data-state" => state,
          "data-part" => "container",
          "aria-model" => "true",
          "aria-labelledby" => "#{id}-titile",
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
          "phx-click" => close_modal_op
        },
        close_modal: close_modal_op
      }
    }

    assigns =
      assigns
      |> assign(:state, state)
      |> assign(:setup, setup)

    ~H"""
    <div>
      <%= for trigger <- @trigger do %>
        <%= unless trigger[:as_child] do %>
          <button {@setup.trigger.attrs} class={trigger[:class]}><%= render_slot(trigger) %></button>
        <% else %>
          <%= render_slot(trigger, @setup.trigger) %>
        <% end %>
      <% end %>

      <div id={@id} {@rest} data-state={@state} data-part="modal">
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

  slot(:title,
    requied: false,
    doc: "The header section of the modal, rendered inside the modal container"
  ) do
    attr :class, :string, doc: "Classes added to the title tag"

    attr :as_child, :boolean,
      doc: "Use the an HTML element or custom component as the slot content"
  end

  slot(:content, required: true, doc: "The content rendered inside the modal container") do
    attr :class, :string, doc: "Classes added to the modal **container** tag"
  end

  slot(:close, required: false, doc: "The button to close the modal") do
    attr :class, :string, doc: "Classes added to the button element"

    attr :as_child, :boolean,
      doc: "Use the an HTML element or custom component as the slot content"
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

  defp open_modal(%JS{} = js, to: to, params: params) do
    JS.dispatch(js, @on_modal_open_event, to: to, detail: params)
    |> JS.focus_first(to: ~s(#{to} [data-part="container"]))
  end

  defp close_modal(%JS{} = js, to: to, params: params) do
    JS.dispatch(js, @on_modal_close_event, to: to, detail: params)
  end
end
