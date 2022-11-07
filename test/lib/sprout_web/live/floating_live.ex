defmodule SproutWeb.FloatingLive do
  use SproutWeb, :live_view
  use SproutUI

  import SproutWeb.LiveHelper

  alias Phoenix.LiveView.JS

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
    <.flip_example />
    <.arrow_example />
    """
  end

  defp placement_example(assigns) do
    ~H"""
    <.display_section title="placement example">
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
      <div class="mt-4 flex space-x-4 justify-center items-center">
        <button
          :for={placement <- ["top", "bottom", "left", "right"]}
          phx-click="change_placement"
          phx-value-placement={placement}
          class="w-max px-2 py-1 bg-gray-100 hover:bg-gray-300 text-slate-800 font-medium rounded select-none outline-none ring-0 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          <%= placement %>
        </button>
      </div>
    </.display_section>
    """
  end

  defp shift_example(assigns) do
    ~H"""
    <.display_section title="shift example">
      <div
        class="relative h-[400px] overflow-hidden overflow-y-auto"
        phx-mounted={JS.dispatch("test:floating:scroll")}
      >
        <div class="h-[360px] w-1"></div>
        <div
          id="dashed-box-1"
          class="inline-block ml-[calc(50%-110px)] h-24 w-24 border-2 border-gray-900 border-dashed rounded"
        >
        </div>
        <.floating
          anchor="#dashed-box-1"
          placement="right"
          middleware={[offset: 12, shift: %{"rootBoundary" => "document"}]}
          class="ui-not-active:hidden absolute w-[220px] px-2 py-1 bg-gray-700 text-white rounded"
          is_active
        >
          <h3 class="mb-2 font-medium">Popover</h3>
          <p class="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi.
            Lorem pariatur mollit ex esse exercitation amet.
          </p>
        </.floating>
        <div class="h-[360px] w-1"></div>
      </div>
      <script>
        window.addEventListener("test:floating:scroll", ({target}) => {
          target.scrollTo({ top: target.offsetHeight / 2 })
        })
      </script>
    </.display_section>
    """
  end

  defp flip_example(assigns) do
    ~H"""
    <.display_section title="flip example">
      <div
        class="relative h-[400px] grid place-items-center overflow-hidden overflow-y-auto"
        phx-mounted={JS.dispatch("test:floating:scroll")}
      >
        <div class="h-[360px] w-1"></div>
        <div
          id="dashed-box-2"
          class="inline-block h-24 w-24 border-2 border-gray-900 border-dashed rounded"
        >
        </div>
        <.floating
          anchor="#dashed-box-2"
          placement="top"
          middleware={[offset: 12, flip: true]}
          class="ui-not-active:hidden absolute w-max px-2 py-1 bg-gray-700 text-sm text-white font-medium rounded"
          is_active
        >
          Tooltip
        </.floating>
        <div class="h-[360px] w-1"></div>
      </div>
    </.display_section>
    """
  end

  defp arrow_example(assigns) do
    ~H"""
    <.display_section title="arrow example">
      <div class="relative flex justify-center items-center h-48 overflow-hidden">
        <div
          id="dashed-box-3"
          class="grid place-items-center cursor-pointer h-24 w-24 border-2 border-gray-900 border-dashed rounded"
        >
          Hover Me
        </div>
        <.floating
          anchor="#dashed-box-3"
          placement="top"
          middleware={[offset: 12, arrow: %{element: "#arrow"}]}
          class="ui-not-active:hidden absolute w-max px-2 py-1 bg-gray-700 text-sm text-white font-medium rounded"
          is_active
        >
          Tooltip
          <div id="arrow" class="absolute w-2 h-2 bg-gray-700 rotate-45"></div>
        </.floating>
      </div>
    </.display_section>
    """
  end

  def handle_event("change_placement", %{"placement" => placement}, socket) do
    {:noreply, assign(socket, :placement, placement)}
  end
end
