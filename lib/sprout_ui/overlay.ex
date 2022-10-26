defmodule SproutUI.Overlay do
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  attr :id, :string, default: "modal"
  attr :open, :boolean, default: false
  attr :on_show, JS, default: %JS{}
  attr :on_hidden, JS, default: %JS{}
  attr :rest, :global

  slot(:trigger, required: false)
  slot(:overlay, required: false)

  slot(:content, required: true) do
    attr :class, :string
  end

  def modal(assigns) do
    id = assigns.id
    state = if assigns.open, do: "show", else: "hidden"
    on_show_op = assigns.on_show |> JS.set_attribute({"data-state", "show"}, to: "##{id}")
    on_hidden_op = assigns.on_hidden |> JS.set_attribute({"data-state", "hidden"}, to: "##{id}")

    ids = %{
      modal: id,
      overlay: "#{id}-overlay",
      container: "#{id}-container",
      content: "#{id}-content"
    }

    setup = %{
      trigger: %{
        attrs: %{
          "type" => "button",
          "data-part" => "trigger",
          "phx-click" => on_show_op
        },
        ids: ids,
        show: on_show_op
      },
      overlay: %{
        attrs: %{
          "id" => ids.overlay,
          "data-part" => "overlay",
          "aria-hidden" => "true"
        },
        ids: ids
      },
      content: %{
        attrs: %{
          "id" => ids.content,
          "role" => "dialog",
          "aria-modal" => "true",
          "data-part" => "content",
          "phx-click-away" => on_hidden_op,
          "phx-window-keydown" => on_hidden_op,
          "phx-key" => "escape"
        },
        ids: ids,
        hide: on_hidden_op
      }
    }

    assigns = assigns |> assign(:setup, setup) |> assign(:state, state)

    ~H"""
    <div {@rest} id={@id} data-state={@state}>
      <%= render_slot(@trigger, @setup.trigger) %>
      <%= render_slot(@overlay, @setup.overlay) %>
      <div
        :for={content <- @content}
        id={"#{@id}-container"}
        class={content[:class] || nil}
        tabindex="-1"
        data-part="container"
      >
        <.focus_wrap id={"#{@id}-wrapper"}>
          <%= render_slot(@content, @setup.content) %>
        </.focus_wrap>
      </div>
    </div>
    """
  end
end
