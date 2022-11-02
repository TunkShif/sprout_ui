defmodule SproutWeb.FloatingLive do
  use SproutWeb, :live_view
  use SproutUI

  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(:title, "Floating")
      |> assign(:placement, "bottom")

    {:ok, socket}
  end

  def render(assigns) do
    ~H"""
    <.placement_example placement={@placement} />
    <.shift_example />
    """
  end

  defp placement_example(assigns) do
    ~H"""
    <h3 class="mb-2 font-medium">placment example</h3>
    <section class="box mb-4">
      <div class="relative flex justify-center items-center h-48 overflow-hidden">
        <div id="dashed-box-0" class="h-24 w-24 border-2 border-gray-900 border-dashed rounded"></div>
        <.floating
          anchor="#dashed-box-0"
          placement={@placement}
          middleware={[offset: 12]}
          class="ui-not-active:hidden absolute w-max px-2 py-1 bg-gray-700 text-sm text-white font-medium rounded"
          is_active
        >
          <%= @placement %>
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

  defp shift_example(assigns) do
    ~H"""
    <h3 class="mb-2 font-medium">shift example</h3>
    <section class="box mb-4">
      <div class="relative h-[400px] overflow-hidden overflow-y-auto">
        <div class="h-[240px] w-1"></div>
        <div
          id="dashed-box-1"
          class="ml-[calc(50%-110px)] h-24 w-24 border-2 border-gray-900 border-dashed rounded"
        >
        </div>
        <.floating
          anchor="#dashed-box-1"
          placement="right"
          middleware={[offset: 12, shift: true]}
          class="ui-not-active:hidden z-10 absolute w-[220px] px-2 py-1 bg-gray-700 text-white rounded"
          is_active
        >
          <h3 class="mb-2 text-lg font-medium">Popover</h3>
          <p class="leading-relaxed">
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi.
            Lorem pariatur mollit ex esse exercitation amet.
          </p>
        </.floating>
        <div class="h-[240px] w-1"></div>
      </div>
    </section>
    """
  end

  def handle_event("change_placement", %{"placement" => placement}, socket) do
    {:noreply, assign(socket, :placement, placement)}
  end
end