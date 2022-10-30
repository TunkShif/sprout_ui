defmodule SproutUI.Utility do
  use Phoenix.Component

  @default_observed_attribute "data-transition-state"
  @default_observed_states {"show", "hide"}

  attr :id, :string, default: "transition-wrapper"
  attr :hook, :string, default: "Transition"

  attr :observing, :list,
    default: [on: :self, attr: @default_observed_attribute, states: @default_observed_states]

  attr :initial_state, :string, default: nil
  attr :enter, :string, required: true
  attr :enter_from, :string, required: true
  attr :enter_to, :string, required: true
  attr :leave, :string, required: true
  attr :leave_from, :string, required: true
  attr :leave_to, :string, required: true
  attr :rest, :global

  slot(:inner_block, required: true)

  def transition(assigns) do
    observing = assigns.observing
    initial_state = assigns.initial_state
    observed_element = assigns.observing[:on]
    observed_attribute = assigns.observing[:attr]

    transition_state = if initial_state && observing[:on] == :self, do: initial_state, else: nil

    observing = %{
      on:
        if(observed_element == :self || observed_element == nil,
          do: assigns.id,
          else: observing[:on]
        ),
      attribute: observing[:attr] || @default_observed_attribute,
      state_show: elem(observing[:states] || @default_observed_states, 0),
      state_hide: elem(observing[:states] || @default_observed_states, 1)
    }

    setup = %{
      transition: %{
        "id" => assigns.id,
        "phx-hook" => assigns.hook,
        "data-observe-on" => observing.on,
        "data-observe-attr" => observing.attribute,
        "data-observe-state-show" => observing.state_show,
        "data-observe-state-hide" => observing.state_hide,
        "data-enter" => assigns.enter,
        "data-enter-from" => assigns.enter_from,
        "data-enter-to" => assigns.enter_to,
        "data-leave" => assigns.leave,
        "data-leave-from" => assigns.leave_from,
        "data-leave-to" => assigns.leave_to,
        observed_attribute => transition_state
      }
    }

    assigns = assigns |> assign(:setup, setup)

    ~H"""
    <div {@setup.transition} {@rest}>
      <%= render_slot(@inner_block) %>
    </div>
    """
  end
end
