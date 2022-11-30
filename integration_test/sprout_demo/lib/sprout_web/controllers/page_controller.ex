defmodule SproutWeb.PageController do
  use SproutWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end

  def component(conn, %{"component" => component}) do
    render(conn, :component, page_title: String.capitalize(component), component: component)
  end
end
