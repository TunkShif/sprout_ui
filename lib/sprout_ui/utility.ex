defmodule SproutUI.Utility do
  use Phoenix.Component

  @default_observed_attribute "data-ui-state"
  @default_observed_states {"show", ""}

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
      "options" => %{
        "attribute" => observed_attribute || @default_observed_attribute,
        "stages" => %{
          "enter" => elem(observed_states || @default_observed_states, 0),
          "leave" => elem(observed_states || @default_observed_states, 1)
        }
      }
    }

    hidden = if initial_state == observing["options"]["stages"]["leave"], do: true

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
        observing["options"]["attribute"] => transition_state
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
      "middleware" =>
        assigns.middleware |> Enum.map(fn {k, v} -> transform_middleware(k, v) end) |> Map.new()
    }

    setup = %{
      attrs: %{
        "id" => assigns.id,
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

  defp transform_middleware(:offset, value) when is_integer(value), do: {:offset, value}

  defp transform_middleware(:offset, {main, cross}) when is_integer(main) and is_integer(cross),
    do:
      {:offset,
       %{
         "mainAxis" => main,
         "crossAxis" => cross
       }}

  defp transform_middleware(:shift, {main, cross}) when is_integer(main) and is_integer(cross),
    do:
      {:shift,
       %{
         "mainAxis" => main,
         "crossAxis" => cross
       }}

  defp transform_middleware(:shift, _), do: {:shift, true}
  defp transform_middleware(name, _) when is_atom(name), do: {name, true}
end
