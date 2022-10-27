defmodule SproutUI.Overlay do
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  attr :id, :string, default: "modal", doc: "The DOM identifier of the modal container tag"
  attr :open, :boolean, default: false, doc: "The initial state of the modal"
  attr :on_show, JS, default: %JS{}, doc: "JS command executed when opening the modal"
  attr :on_close, JS, default: %JS{}, doc: "JS command executed when closing the modal"
  attr :await_close_animation, :boolean, default: false, doc: "Whether awating closing animation"
  attr :rest, :global, doc: "Additional HTML attributes added to the modal container tag"

  slot(:trigger, required: false, doc: "The trigger to open the modal, usually a `button` element")

  slot(:overlay, required: false, doc: "The overlay element")

  slot(:content, required: true, doc: "The content rendered inside the modal container") do
    attr :class, :string, doc: "Classes added to the modal container tag"
  end

  # TODO: disable scrolling
  # TODO: aria label
  def modal(assigns) do
    id = assigns.id
    state = if assigns.open, do: "show", else: "hidden"

    on_show_op =
      assigns.on_show
      |> show_modal(selector: "##{id}")

    on_close_op =
      assigns.on_close
      |> hide_modal(selector: "##{id}", params: %{await_animation: assigns.await_close_animation})

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
    <div>
      <%= render_slot(@trigger, @setup.trigger) %>
      <div id={@id} {@rest} data-state={@state} data-part="modal">
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
