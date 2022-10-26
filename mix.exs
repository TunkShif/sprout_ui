defmodule SproutUI.MixProject do
  use Mix.Project

  def project do
    [
      app: :sprout_ui,
      version: "0.1.0",
      elixir: "~> 1.14",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:phoenix, "~> 1.6.14"},
      {:phoenix_live_view, "~> 0.18.2"},
      {:esbuild, "~> 0.4", only: :dev}
    ]
  end
end
