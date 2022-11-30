defmodule SproutWeb.PageHTML do
  use SproutWeb, :html

  alias SproutUI.Overlay

  embed_templates("page_html/*")

  def component(%{component: "dialog"} = assigns) do
    ~H"""
    <Overlay.dialog :let={api}>
      <button
        class={[
          "block px-5 py-2.5 text-center text-sm text-white font-medium rounded-lg",
          "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700",
          "focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        ]}
        {api.trigger_attrs}
      >
        Toggle modal
      </button>

      <div class="relative" {api.container_attrs}>
        <div
          class="fixed inset-0 bg-black bg-opacity-25 z-10"
          data-transition
          data-enter="ease-in-out duration-300"
          data-enter-from="opacity-0"
          data-enter-to="opacity-100"
          data-leave="ease-in-out duration-300"
          data-leave-from="opacity-100"
          data-leave-to="opacity-0"
          {api.backdrop_attrs}
        >
        </div>
        <div class="fixed inset-0 overflow-y-auto z-20">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <div
              class="z-50 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all opacity-100 scale-100"
              data-transition
              data-enter="ease-in-out duration-300"
              data-enter-from="opacity-0 scale-50"
              data-enter-to="opacity-100 scale-100"
              data-leave="ease-in-out duration-200"
              data-leave-from="opacity-100 scale-100"
              data-leave-to="opacity-0 scale-50"
              {api.panel_attrs}
            >
              <h3 class="text-lg font-medium leading-6 text-gray-900" {api.title_attrs}>
                Payment successful
              </h3>
              <div class="mt-2">
                <p>
                  Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.
                </p>
              </div>
              <div class="mt-4">
                <button
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  {api.close_button_attrs}
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Overlay.dialog>
    """
  end

  def component(%{component: "floating"} = assigns) do
    ~H"""
    <hr class="my-4" />

    <h3>Shift</h3>
    <div
      class="relative h-[400px] overflow-hidden overflow-y-auto"
      phx-mounted={JS.dispatch("demo:floating:scroll")}
    >
      <div class="h-[360px] w-1"></div>
      <div
        id="dashed-box-1"
        class="inline-block ml-[calc(50%-110px)] h-24 w-24 border-2 border-gray-900 border-dashed rounded"
      >
      </div>
      <div
        is="floating-element"
        data-anchor="#dashed-box-1"
        data-placement="right"
        data-offset="12"
        data-shift
        class="absolute w-[220px] px-2 py-1 bg-gray-700 text-white rounded"
      >
        <h3 class="mb-2 font-medium">Popover</h3>
        <p class="text-sm leading-relaxed">
          Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi.
          Lorem pariatur mollit ex esse exercitation amet.
        </p>
      </div>
      <div class="h-[360px] w-1"></div>
    </div>

    <hr class="my-4" />

    <h3>Flip</h3>
    <div
      class="relative h-[400px] grid place-items-center overflow-hidden overflow-y-auto"
      phx-mounted={JS.dispatch("demo:floating:scroll")}
    >
      <div class="h-[360px] w-1"></div>
      <div
        id="dashed-box-2"
        class="inline-block h-24 w-24 border-2 border-gray-900 border-dashed rounded"
      >
      </div>
      <div
        is="floating-element"
        data-anchor="#dashed-box-2"
        data-placement="top"
        data-offset="12"
        data-flip
        class="absolute w-max px-2 py-1 bg-gray-700 text-sm text-white font-medium rounded"
      >
        Tooltip
      </div>
      <div class="h-[360px] w-1"></div>
    </div>

    <hr class="my-4" />

    <h3>Arrow</h3>
    <div class="relative flex justify-center items-center h-48 overflow-hidden">
      <div
        id="dashed-box-3"
        class="grid place-items-center h-24 w-24 border-2 border-gray-900 border-dashed rounded"
      >
        with arrow
      </div>
      <div
        is="floating-element"
        data-anchor="#dashed-box-3"
        data-placement="top"
        data-offset="12"
        class="absolute w-max px-2 py-1 bg-gray-700 text-sm text-white font-medium rounded"
      >
        Tooltip
        <div data-part="arrow" class="absolute w-2 h-2 bg-gray-700 rotate-45"></div>
      </div>
    </div>
    """
  end

  def component(%{component: "popover"} = assigns) do
    ~H"""
    <Overlay.popover :let={api} offset={12}>
      <button
        class="inline-flex items-center rounded-md bg-blue-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus:ring-blue-800"
        {api.trigger_attrs}
      >
        Solutions
      </button>
      <div
        class="absolute z-10 max-w-sm"
        data-transition
        data-enter="transition duration-300"
        data-enter-from="opacity-0"
        data-enter-to="opacity-100"
        data-leave="transition duration-300"
        data-leave-from="opacity-100"
        data-leave-to="opacity-0"
        {api.panel_attrs}
      >
        <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div class="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
            <a
              :for={solution <- @solutions}
              href={solution.href}
              class="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50"
            >
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-900">
                  <%= solution.name %>
                </p>
                <p class="text-sm text-gray-500">
                  <%= solution.description %>
                </p>
              </div>
            </a>
          </div>
          <div class="bg-gray-50 p-4">
            <a
              href="##"
              class="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
            >
              <span class="flex items-center">
                <span class="text-sm font-medium text-gray-900">
                  Documentation
                </span>
              </span>
              <span class="block text-sm text-gray-500">
                Start integrating products and tools
              </span>
            </a>
          </div>
        </div>
      </div>
    </Overlay.popover>
    """
  end

  def component(%{component: "tooltip"} = assigns) do
    ~H"""
    <div class="relative flex justify-center items-center h-48 overflow-hidden">
      <Overlay.tooltip :let={api} placement="top" offset={12}>
        <button
          class="grid place-items-center h-24 w-24 border-2 border-gray-900 border-dashed rounded cursor-pointer outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          {api.trigger_attrs}
        >
          with arrow
        </button>
        <div
          class="absolute w-max px-2 py-1 bg-gray-700 text-sm text-white font-medium rounded"
          data-transition
          data-enter="transition duration-300"
          data-enter-from="opacity-0"
          data-enter-to="opacity-100"
          data-leave="transition duration-300"
          data-leave-from="opacity-100"
          data-leave-to="opacity-0"
          {api.container_attrs}
        >
          Tooltip
          <div class="absolute w-2 h-2 bg-gray-700 rotate-45" {api.arrow_attrs}></div>
        </div>
      </Overlay.tooltip>
    </div>
    """
  end
end
