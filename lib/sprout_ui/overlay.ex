defmodule SproutUI.Overlay do
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  attr :id, :string, default: "modal"
  attr :open, :boolean, default: false
  attr :on_show, JS, default: %JS{}
  attr :on_close, JS, default: %JS{}
  attr :await_close_animation, :boolean, default: false
  attr :rest, :global

  slot(:trigger, required: false)
  slot(:overlay, required: false)

  slot(:content, required: true) do
    attr :class, :string
  end

  def modal(assigns) do
    id = assigns.id
    state = if assigns.open, do: "show", else: "hidden"

    on_show_op =
      assigns.on_show
      |> show_modal(selector: "##{id}")

    on_close_op =
      assigns.on_close
      |> hide_modal(selector: "##{id}", params: %{await_animation: assigns.await_close_animation})

    ids = %{
      modal: id,
      overlay: "#{id}-overlay",
      container: "#{id}-container"
    }

    setup = %{
      trigger: %{
        attrs: %{
          "type" => "button",
          "data-part" => "trigger",
          "phx-click" => on_show_op
        },
        show: on_show_op
      },
      overlay: %{
        attrs: %{
          "id" => ids.overlay,
          "data-state" => state,
          "data-part" => "overlay",
          "aria-hidden" => "true"
        }
      },
      container: %{
        attrs: %{
          "id" => ids.container,
          "role" => "dialog",
          "data-state" => state,
          "data-part" => "container",
          "aria-model" => "true",
          "tabindex" => "-1",
          "phx-click-away" => on_close_op,
          "phx-window-keydown" => on_close_op,
          "phx-key" => "escape"
        }
      },
      content: %{
        hide: on_close_op
      }
    }

    assigns = assigns |> assign(:setup, setup) |> assign(:state, state)

    ~H"""
    <div {@rest}>
      <%= render_slot(@trigger, @setup.trigger) %>
      <div id={@id} data-state={@state} data-part="modal">
        <%= render_slot(@overlay, @setup.overlay) %>
        <div :for={content <- @content} {@setup.container.attrs} class={content[:class] || nil}>
          <.focus_wrap id={"#{@id}-wrapper"}>
            <%= render_slot(@content, @setup.content) %>
          </.focus_wrap>
        </div>
      </div>
    </div>
    """
  end

  defp show_modal(%JS{} = js, selector: selector) do
    JS.dispatch(js, "sprout:modal:show", to: selector)
    |> JS.focus_first(to: ~s(#{selector} [data-part="container"]))
  end

  defp hide_modal(%JS{} = js, selector: selector, params: params) do
    JS.dispatch(js, "sprout:modal:hide", to: selector, detail: params)
  end
end
