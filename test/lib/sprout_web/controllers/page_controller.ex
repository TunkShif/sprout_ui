defmodule SproutWeb.PageController do
  use SproutWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
