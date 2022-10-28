defmodule SproutUI.MixProject do
  use Mix.Project

  @version "0.1.0"

  def project do
    [
      app: :sprout_ui,
      version: @version,
      elixir: "~> 1.13",
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps(),
      package: package()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  defp aliases do
    [
      test: ["cmd echo test"],
      setup: ["deps.get", "cmd --cd assets pnpm install"],
      "assets.build": [
        "esbuild module",
        "esbuild main",
        "esbuild cdn",
        "esbuild cdn_min",
        "esbuild tailwind"
      ],
      "assets.watch": ["esbuild module --watch"]
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

  defp package() do
    [
      licenses: ["MIT"],
      links: %{
        "GitHub" => "https://github.com/TunkShif/sprout_ui"
      },
      files: ~w(assets/js lib priv) ++ ~w(LICENSE mix.exs package.json README.md)
    ]
  end
end
