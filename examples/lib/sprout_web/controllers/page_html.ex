defmodule SproutWeb.PageHTML do
  use SproutWeb, :html

  alias Phoenix.LiveView.JS
  alias SproutUI.Overlay

  embed_templates("page_html/*")

  def component(%{component: "dialog"} = assigns) do
    ~H"""
    <Overlay.dialog :let={api} on_open={JS.dispatch("test:open")} on_close={JS.dispatch("test:close")}>
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
          class="fixed inset-0 bg-black bg-opacity-25"
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
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <div
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all opacity-100 scale-100"
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
end
