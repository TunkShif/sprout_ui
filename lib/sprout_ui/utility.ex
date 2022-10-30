defmodule SproutUI.Utility do
  use Phoenix.Component

  # FIXME: first render flash
  # ^ probably fixed now, but not quite satisfied with the current workaround

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
  attr :as_child, :boolean, default: false
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

    hidden = if initial_state == observing.state_hide, do: true, else: nil

    setup = %{
      attrs: %{
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
        "hidden" => hidden,
        observed_attribute => transition_state
      }
    }

    # only include id attribute when `as_child` is not used
    setup = unless assigns.as_child, do: put_in(setup, [:attrs, "id"], assigns.id), else: setup

    assigns = assigns |> assign(:setup, setup)

    ~H"""
    <%= if assigns.as_child do %>
      <%= render_slot(@inner_block, @setup) %>
    <% else %>
      <div {@setup.attrs} {@rest}>
        <%= render_slot(@inner_block) %>
      </div>
    <% end %>
    """
  end
end
