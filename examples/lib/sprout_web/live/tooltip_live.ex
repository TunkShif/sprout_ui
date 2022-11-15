defmodule SproutWeb.TooltipLive do
  use SproutWeb, :live_view
  use SproutUI

  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(:title, "Tooltip")

    {:ok, socket}
  end

  def render(assigns) do
    ~H"""
    <.simple_example />
    """
  end

  defp simple_example(assigns) do
    ~H"""
    <.display_section title="simple example">
      <div class="relative flex justify-center items-center h-48 overflow-hidden">
        <.tooltip
          active
          text="Tooltip"
          offset={16}
          class="ui-not-active:hidden absolute w-max px-2 py-1 bg-gray-700 text-sm text-white font-medium rounded"
        >
          <div class="grid place-items-center cursor-pointer h-24 w-24 border-2 border-gray-900 border-dashed rounded">
            hover me
          </div>
        </.tooltip>
      </div>
    </.display_section>
    """
  end
end
