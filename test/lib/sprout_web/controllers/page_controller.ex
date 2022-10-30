defmodule SproutWeb.PageController do
  use SproutWeb, :controller

  @components ~w(modal transition)

  def index(conn, _params) do
    render(conn, "index.html", components: @components)
  end
end
