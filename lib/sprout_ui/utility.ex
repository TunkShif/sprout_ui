defmodule SproutUI.Utility do
  use Phoenix.Component

  @default_observed_attribute "data-ui-state"
  @default_observed_states {"show", "hide"}

  attr :id, :string, default: "transition-wrapper"
  attr :hook, :string, default: "Transition"

  attr :observing, :list, default: [on: :self]
  attr :initial_state, :string, default: ""
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
    initial_state = assigns.initial_state
    observed_element = assigns.observing[:on]
    observed_attribute = assigns.observing[:attr]
    observed_states = assigns.observing[:states]

    # transition state is only applied when `as_child` is not used
    transition_state = if initial_state && observed_element == :self, do: initial_state

    observing = %{
      "on" =>
        if(observed_element == :self || observed_element == nil,
          do: assigns.id,
          else: observed_element
        ),
      "opts" => %{
        "attribute" => observed_attribute || @default_observed_attribute,
        "states" => %{
          "show" => elem(observed_states || @default_observed_states, 0),
          "hide" => elem(observed_states || @default_observed_states, 1)
        }
      }
    }

    hidden = if initial_state == observing["opts"]["states"]["hide"], do: true

    setup = %{
      attrs: %{
        "phx-hook" => assigns.hook,
        "data-observing" => Jason.encode!(observing),
        "data-enter" => assigns.enter,
        "data-enter-from" => assigns.enter_from,
        "data-enter-to" => assigns.enter_to,
        "data-leave" => assigns.leave,
        "data-leave-from" => assigns.leave_from,
        "data-leave-to" => assigns.leave_to,
        "hidden" => hidden,
        observing["opts"]["attribute"] => transition_state
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

  attr :id, :string, default: "floating-wrapper"
  attr :hook, :string, default: "Floating"
  attr :reference, :string, required: true

  attr :placement, :string,
    default: "bottom",
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

  attr :middleware, :list, default: []
  attr :auto_update, :boolean, default: false
  attr :as_child, :boolean, default: false
  attr :rest, :global
  slot(:inner_block, required: true)

  def floating(assigns) do
    floating = %{
      "reference" => assigns.reference,
      "placement" => assigns.placement,
      "autoUpdate" => assigns.auto_update,
      "middleware" => assigns.middleware
    }

    setup = %{
      attrs: %{
        "id" => assigns.id,
        "role" => "tooltip",
        "phx-hook" => assigns.hook,
        "data-floating" => Jason.encode!(floating)
      }
    }

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
