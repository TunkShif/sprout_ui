defmodule SproutWeb.TransitionLive do
  use SproutWeb, :live_view
  use SproutUI

  alias Phoenix.LiveView.JS

  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(:title, "Transition")
      |> assign(:box_state, "show")
      |> assign(:text_state, "hide")

    {:ok, socket}
  end

  def render(assigns) do
    ~H"""
    <.simple_example />
    <.resetting_example box_state={@box_state} />
    <.custom_observer_example text_state={@text_state} />
    """
  end

  defp simple_example(assigns) do
    ~H"""
    <h3 class="mb-2 font-medium">triggered on client-side</h3>
    <section class="box mb-4">
      <button
        id="button-0"
        phx-click={JS.dispatch("test:transition:toggle", to: "#transition-wrapper-0")}
        class="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md shadow-lg outline-none ring-0 focus:outline-offset-1 focus:outline-2 focus:outline-emerald-600"
      >
        Toggle
      </button>
      <.transition
        id="transition-wrapper-0"
        class="mt-2"
        initial_state="hide"
        enter="transition-opacity duration-300"
        enter_from="opacity-0"
        enter_to="opacity-100"
        leave="transition-opacity duration-300"
        leave_from="opacity-100"
        leave_to="opacity-0"
      >
        👋 Hi, there!
      </.transition>
      <script>
        window.addEventListener("test:transition:toggle", ({ target }) => {
        const state = target.getAttribute("data-transition-state") === "show" ? "hide" : "show"
        target.setAttribute("data-transition-state", state)
        })
      </script>
    </section>
    """
  end

  defp resetting_example(assigns) do
    ~H"""
    <h3 class="mb-2 font-medium">triggered from server-side</h3>
    <section class="box">
      <div class="flex flex-col items-center">
        <div class="h-32 w-32">
          <.transition
            id="transition-wrapper-1"
            initial_state={@box_state}
            class="h-32 w-32 bg-emerald-500 rounded-md shadow-lg"
            enter="transform transition duration-[400ms]"
            enter_from="opacity-0 rotate-[-120deg] scale-50"
            enter_to="opacity-100 rotate-0 scale-100"
            leave="transform duration-200 transition ease-in-out"
            leave_from="opacity-100 rotate-0 scale-100 "
            leave_to="opacity-0 scale-95"
          >
          </.transition>
        </div>
        <button
          id="button-1"
          phx-click="transition_box"
          class="mt-4 px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full shadow-lg outline-none ring-0 focus:outline-offset-1 focus:outline-2 focus:outline-emerald-600"
        >
          Transition
        </button>
      </div>
    </section>
    """
  end

  defp custom_observer_example(assigns) do
    ~H"""
    <h3 class="mb-2 font-medium">observing on other element changes</h3>
    <section class="mb-4 min-w-max border border-slate-500 rounded-md p-4">
      <button
        id="button-2"
        phx-click="toggle_text"
        class="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md shadow-lg outline-none ring-0 focus:outline-offset-1 focus:outline-2 focus:outline-emerald-600"
      >
        Toggle
      </button>
      <div id="text-state" data-text-state={@text_state} class="my-2 font-medium">
        State: <span id="text-0"><%= @text_state %></span>
      </div>
      <.transition
        id="transition-wrapper-2"
        observing={[on: "#text-state", attr: "data-text-state"]}
        initial_state="hide"
        enter="transition-opacity duration-300"
        enter_from="opacity-0"
        enter_to="opacity-100"
        leave="transition-opacity duration-300"
        leave_from="opacity-100"
        leave_to="opacity-0"
      >
        Hello, World!
      </.transition>
    </section>
    """
  end

  def handle_event("transition_box", _params, socket) do
    Process.send_after(self(), "reset_box", 500)
    {:noreply, socket |> assign(:box_state, "hide")}
  end

  def handle_event("toggle_text", _params, socket) do
    state = if socket.assigns.text_state == "show", do: "hide", else: "show"
    {:noreply, socket |> assign(:text_state, state)}
  end

  def handle_info("reset_box", socket) do
    {:noreply, socket |> assign(:box_state, "show")}
  end
end
