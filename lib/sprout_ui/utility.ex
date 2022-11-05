defmodule SproutUI.Utility do
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  @on_transition_init_event "sprt:transition:init"
  @on_transition_cleanup_event "sprt:transition:cleanup"

  @default_observed_attribute "data-ui-state"
  @default_observed_states {"show", ""}

  attr :observing, :list, default: []
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
    transition_state = if initial_state && observed_element == nil, do: initial_state

    transition_classes =
      %{
        "enter" => assigns.enter,
        "enterFrom" => assigns.enter_from,
        "enterTo" => assigns.enter_to,
        "leave" => assigns.leave,
        "leaveFrom" => assigns.leave_from,
        "leaveTo" => assigns.leave_to
      }
      |> Enum.map(fn {key, val} -> {key, String.split(val)} end)
      |> Map.new()

    init_event_detail = %{
      "on" => observed_element,
      "options" => %{
        "attribute" => observed_attribute || @default_observed_attribute,
        "stages" => %{
          "enter" => elem(observed_states || @default_observed_states, 0),
          "leave" => elem(observed_states || @default_observed_states, 1)
        },
        "classes" => transition_classes
      }
    }

    hidden = if initial_state == init_event_detail["options"]["stages"]["leave"], do: true

    setup = %{
      attrs: %{
        "phx-mounted" => JS.dispatch(@on_transition_init_event, detail: init_event_detail),
        "phx-remove" => JS.dispatch(@on_transition_cleanup_event),
        "hidden" => hidden,
        init_event_detail["options"]["attribute"] => transition_state,
        "data-transition" => true
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

  attr :element, :string, default: "sprt-floating"
  attr :is_active, :boolean, default: false
  attr :anchor, :string, required: true

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
  attr :rest, :global
  slot(:inner_block, required: true)

  def floating(assigns) do
    state = if assigns.is_active, do: "active", else: ""

    middleware = assigns.middleware |> Enum.map(fn {k, v} -> transform_middleware(k, v) end)

    setup = %{
      element: assigns.element,
      attrs: %{
        "data-ui-state" => state,
        "data-anchor" => assigns.anchor,
        "data-placement" => assigns.placement,
        "data-middleware" => Jason.encode!(middleware)
      }
    }

    assigns = assigns |> assign(:setup, setup)

    ~H"""
    <.dynamic_tag name={@setup.element} {@setup.attrs} {@rest}>
      <%= render_slot(@inner_block) %>
    </.dynamic_tag>
    """
  end

  defp transform_middleware(name, true) when is_atom(name), do: [name, %{}]
  defp transform_middleware(name, option) when is_atom(name), do: [name, option]
end
