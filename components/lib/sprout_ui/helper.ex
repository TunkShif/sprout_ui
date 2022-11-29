defmodule SproutUI.Helper do
  def unique_id(), do: Integer.to_string(36 ** 3 + :rand.uniform(36 ** 4), 36)
end
