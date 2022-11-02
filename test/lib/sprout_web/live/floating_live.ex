defmodule SproutWeb.FloatingLive do
  use SproutWeb, :live_view
  use SproutUI

  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(:title, "Floating")
      |> assign(:placement, "top")

    {:ok, socket}
  end

  def render(assigns) do
    ~H"""
    <.simple_example placement={@placement} />
    """
  end

  defp simple_example(assigns) do
    ~H"""
    <h3 class="mb-2 font-medium">simple tooltip</h3>
    <section class="box mb-4">
      <div class="relative flex justify-center items-center h-48 overflow-hidden">
        <button id="dashed-box" class="h-24 w-24 border-2 border-gray-900 border-dashed rounded">
        </button>
        <.floating
          id="floating-wrapper-0"
          reference="#dashed-box"
          placement={@placement}
          middleware={[offset: 12]}
          data-ui-state="open"
          class="absolute w-max p-1.5 py-1 top-0 left-0 bg-gray-800 text-white text-sm rounded ui-not-open:hidden"
        >
          👋 Hi, there!
        </.floating>
      </div>
      <div class="mt-2 flex space-x-4 justify-center items-center">
        <button
          :for={placement <- ["top", "bottom", "left", "right"]}
          phx-click="change_placement"
          phx-value-placement={placement}
          class="w-max px-2 py-1 bg-gray-100 hover:bg-gray-300 text-slate-800 font-medium rounded select-none outline-none ring-0 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          <%= placement %>
        </button>
      </div>
    </section>
    """
  end

  def handle_event("change_placement", %{"placement" => placement}, socket) do
    {:noreply, socket |> assign(:placement, placement)}
  end
end
