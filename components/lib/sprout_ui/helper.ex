defmodule SproutUI.Helper do
  def unique_id(), do: Integer.to_string(36 ** 3 + :rand.uniform(36 ** 4), 36)

  def transform_transition(nil), do: nil

  def transform_transition(transitions) when is_map(transitions) do
    %{
      "enter" => transitions.enter,
      "enterFrom" => transitions.enter_from,
      "enterTo" => transitions.enter_to,
      "leave" => transitions.leave,
      "leaveFrom" => transitions.leave_from,
      "leaveTo" => transitions.leave_to
    }
    |> Enum.map(fn {key, val} -> {key, String.split(val)} end)
    |> Map.new()
  end
end
