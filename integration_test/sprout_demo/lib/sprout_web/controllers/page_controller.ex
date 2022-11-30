defmodule SproutWeb.PageController do
  use SproutWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end

  def component(conn, %{"component" => component}) do
    solutions = [
      %{
        name: 'Insights',
        description: 'Measure actions your users take',
        href: '##'
      },
      %{
        name: 'Automations',
        description: 'Create your own targeted content',
        href: '##'
      },
      %{
        name: 'Reports',
        description: 'Keep track of your growth',
        href: '##'
      }
    ]

    conn =
      case component do
        "popover" -> conn |> assign(:solutions, solutions)
        _ -> conn
      end

    render(conn, :component, page_title: String.capitalize(component), component: component)
  end
end
