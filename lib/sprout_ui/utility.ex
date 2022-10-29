defmodule SproutUI.Utility do
  use Phoenix.Component

  attr :id, :string, default: "transition-wrapper"
  attr :hook, :string, default: "Transition"
  attr :is_showing, :boolean, required: true
  attr :enter, :string
  attr :enter_from, :string
  attr :enter_to, :string
  attr :leave, :string
  attr :leave_from, :string
  attr :leave_to, :string
  attr :rest, :global

  slot(:inner_block, required: true)

  def transition(assigns) do
    state = if assigns.is_showing, do: "show", else: "hide"
    assigns = assigns |> assign(:state, state)

    ~H"""
    <div
      id={@id}
      phx-hook={@hook}
      data-transition-state={@state}
      data-enter={@enter}
      data-enter-from={@enter_from}
      data-enter-to={@enter_to}
      data-leave={@leave}
      data-leave-from={@leave_from}
      data-leave-to={@leave_to}
      {@rest}
    >
      <%= render_slot(@inner_block) %>
    </div>
    """
  end
end
