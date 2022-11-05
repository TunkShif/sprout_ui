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

    live "/", IndexLive
    live "/modal", ModalLive
    live "/floating", FloatingLive
    live "/transition", TransitionLive
  end
end
