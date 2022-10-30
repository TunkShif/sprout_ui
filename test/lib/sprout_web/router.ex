defmodule SproutWeb.Router do
  use SproutWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {SproutWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", SproutWeb do
    pipe_through :browser

    get "/", PageController, :index
    live "/modal", ModalLive
    live "/transition", TransitionLive
  end

  # Other scopes may use custom stacks.
  # scope "/api", SproutWeb do
  #   pipe_through :api
  # end
end
