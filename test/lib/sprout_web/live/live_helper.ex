defmodule SproutWeb.LiveHelper do
  use Phoenix.Component

  attr :title, :string, required: true
  slot(:inner_block, required: true)

  def display_section(assigns) do
    ~H"""
    <h3 class="mb-2 font-medium">
      <%= @title %>
    </h3>
    <section class="mb-4 border border-slate-500 rounded-md p-4 min-w-max">
      <%= render_slot(@inner_block) %>
    </section>
    """
  end
end
