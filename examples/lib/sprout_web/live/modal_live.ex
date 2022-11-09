defmodule SproutWeb.ModalLive do
  use SproutWeb, :live_view
  use SproutUI

  def mount(params, _session, socket) do
    socket =
      socket
      |> assign(:title, "Modal")
      |> assign(:open, params["default_open"] == "true")

    {:ok, socket}
  end

  def render(assigns) do
    ~H"""
    <.simple_example open={@open} />
    <.customized_example />
    <.transition_example />
    """
  end

  defp simple_example(assigns) do
    ~H"""
    <.display_section title="simple modal">
      <button
        phx-click={JS.set_attribute({"data-ui-state", "open"}, to: "#modal-0")}
        class="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md shadow-lg outline-none ring-0 focus:outline-offset-1 focus:outline-2 focus:outline-emerald-600"
      >
        Show Modal
      </button>
      <.modal :let={setup} open={@open} id="modal-0" class="ui-not-open:hidden">
        <.modal_overlay class="fixed inset-0 z-30 bg-black/50" />
        <.modal_body
          setup={setup}
          class="fixed z-50 max-w-md rounded-lg p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
        >
          <:title class="mb-2 font-medium text-lg">Simple Modal</:title>
          <:content>
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
          </:content>
          <:close class="absolute top-3 right-3 text-slate-600 hover:text-slate-900">&times;</:close>
        </.modal_body>
      </.modal>
    </.display_section>
    """
  end

  defp customized_example(assigns) do
    ~H"""
    <.display_section title="customized example">
      <button
        phx-click={JS.set_attribute({"data-ui-state", "open"}, to: "#modal-1")}
        class="flex justify-center items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full shadow-lg outline-none ring-0 focus:outline-offset-1 focus:outline-2 focus:outline-emerald-600"
      >
        <span class="flex justify-center items-center mr-2">
          <Heroicons.arrow_up_tray solid class="w-5 h-5" />
        </span>
        <span>OPEN</span>
      </button>
      <.modal :let={setup} id="modal-1" class="ui-not-open:hidden">
        <.modal_overlay class="fixed inset-0 z-30 bg-black/50" />
        <.modal_body
          setup={setup}
          class="fixed z-50 max-w-lg rounded-lg p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
        >
          <:title :let={setup} as_child>
            <header {setup.attrs}>
              <h2 class="mb-2 flex items-center">
                <span class="flex justify-center items-center mr-2">
                  <Heroicons.information_circle solid class="w-6 h-6 text-sky-500" />
                </span>
                <span class="font-medium text-lg">Info</span>
              </h2>
            </header>
          </:title>
          <:content class="flex flex-col">
            <p class="mb-2 leading-loose">
              Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi
              Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
              Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident.
            </p>
            <div class="flex justify-end items-center">
              <button
                phx-click={JS.set_attribute({"data-ui-state", ""}, to: "#modal-1")}
                class="px-4 py-2 bg-sky-500 hover:bg-sky-600 focus:bg-sky-600 text-white font-medium rounded-md shadow-lg outline-none ring-0 focus:ring-offset-1 focus:ring-2 focus:ring-sky-600"
              >
                OK
              </button>
            </div>
          </:content>
          <:close :let={setup} as_child>
            <button
              {setup.attrs}
              class="absolute top-3 right-3 p-1 text-slate-500 hover:bg-gray-200 focus:bg-gray-200 flex justify-center items-center rounded-full outline-none ring-0 focus:ring-offset-1 focus:ring-2 focus:ring-gray-500"
            >
              <Heroicons.x_mark mini class="w-5 h-5" />
            </button>
          </:close>
        </.modal_body>
      </.modal>
    </.display_section>
    """
  end

  defp transition_example(assigns) do
    ~H"""
    <.display_section title="with transition">
      <button
        phx-click={JS.set_attribute({"data-ui-state", "open"}, to: "#modal-2")}
        class="flex justify-center items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full shadow-lg outline-none ring-0 focus:outline-offset-1 focus:outline-2 focus:outline-emerald-600"
      >
        <span class="flex justify-center items-center mr-2">
          <Heroicons.pencil solid class="w-5 h-5" />
        </span>
        <span>Edit</span>
      </button>
      <.modal :let={setup} id="modal-2">
        <.transition
          :let={transition}
          observing={[on: "#modal-2", states: {"open", ""}]}
          initial_state=""
          enter="ease-out duration-300"
          enter_from="opacity-0"
          enter_to="opacity-100"
          leave="ease-in duration-200"
          leave_from="opacity-100"
          leave_to="opacity-0"
          as_child
        >
          <.modal_overlay class="fixed inset-0 z-30 bg-black/50" {transition.attrs} />
        </.transition>
        <.transition
          :let={transition}
          observing={[on: "#modal-2", states: {"open", ""}]}
          initial_state=""
          enter="ease-out duration-300"
          enter_from="opacity-0 scale-95 translate-y-[15%]"
          enter_to="opacity-100 scale-100 -translate-y-1/2"
          leave="ease-in duration-200"
          leave_from="opacity-100 scale-100 -translate-y-1/2"
          leave_to="opacity-0 scale-95 translate-y-[15%]"
          as_child
        >
          <.modal_body
            setup={setup}
            class="fixed z-50 min-w-[480px] max-w-lg rounded-lg p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
            {transition.attrs}
          >
            <:title :let={setup} as_child>
              <header {setup.attrs}>
                <h2 class="mb-2 flex items-center">
                  <span class="flex justify-center items-center mr-2">
                    <Heroicons.pencil_square solid class="w-6 h-6" />
                  </span>
                  <span class="font-medium text-lg">Edit Profile</span>
                </h2>
              </header>
            </:title>
            <:content class="flex flex-col">
              <p class="mb-2 leading-loose">
                Please fill in the form:
              </p>
              <section class="space-y-4">
                <div>
                  <label for="username" class="block text-gray-700 text-sm font-bold mb-2">
                    Username
                  </label>
                  <input
                    id="username"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:outline-sky-500"
                  />
                </div>
                <div>
                  <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
                    E-mail
                  </label>
                  <input
                    id="email"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:outline-sky-500"
                  />
                </div>
              </section>
              <footer class="mt-4 flex justify-end items-center space-x-4">
                <button
                  phx-click={JS.set_attribute({"data-ui-state", ""}, to: "#modal-2")}
                  class="px-4 py-2 bg-sky-500 hover:bg-sky-600 focus:bg-sky-600 text-white font-medium rounded-md shadow-lg outline-none ring-0 focus:ring-offset-1 focus:ring-2 focus:ring-sky-600"
                >
                  Confirm
                </button>
                <button
                  phx-click={JS.set_attribute({"data-ui-state", ""}, to: "#modal-2")}
                  class="px-4 py-2 bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white font-medium rounded-md shadow-lg outline-none ring-0 focus:ring-offset-1 focus:ring-2 focus:ring-red-600"
                >
                  Cancel
                </button>
              </footer>
            </:content>
            <:close :let={setup} as_child>
              <button
                {setup.attrs}
                class="absolute top-3 right-3 p-1 text-slate-500 hover:bg-gray-200 focus:bg-gray-200 flex justify-center items-center rounded-full outline-none ring-0 focus:ring-offset-1 focus:ring-2 focus:ring-gray-500"
              >
                <Heroicons.x_mark mini class="w-5 h-5" />
              </button>
            </:close>
          </.modal_body>
        </.transition>
      </.modal>
    </.display_section>
    """
  end
end
