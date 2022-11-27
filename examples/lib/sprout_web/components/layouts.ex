defmodule SproutWeb.Layouts do
  use SproutWeb, :html

  embed_templates "layouts/*"

  @components ["dialog"]
  def sidebar_navigation(assigns) do
    assigns = assign(assigns, components: @components)

    ~H"""
    <nav>
      <div class="py-4">
        <h2 class="font-medium text-lg">Components</h2>
        <div class="mt-4">
          <ul class="space-y-2">
            <li :for={component <- @components}>
              <.link navigate={~p"/component/#{component}"} class="hover:underline">
                <%= String.capitalize(component) %>
              </.link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    """
  end
end
