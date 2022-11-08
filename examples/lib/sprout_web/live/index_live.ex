defmodule SproutWeb.IndexLive do
  use SproutWeb, :live_view

  @components ~w(modal floating transition)

  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(:title, "Sprout UI")
      |> assign(:components, @components)

    {:ok, socket}
  end

  def render(assigns) do
    ~H"""
    <section class="border border-slate-500 rounded-md p-4 min-w-max">
      <div class="flex space-x-4">
        <.link
          :for={component <- @components}
          navigate={~p"/#{component}"}
          class="font-medium hover:text-emerald-600 hover:underline"
        >
          <%= component %>
        </.link>
      </div>
    </section>
    """
  end
end
