import Config

if Mix.env() == :dev do
  esbuild = fn args ->
    [
      args: ~w(./js/sprout_ui --bundle) ++ args,
      cd: Path.expand("../assets", __DIR__),
      env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
    ]
  end

  esbuild_tailwind = fn args ->
    [
      args: ~w(./js/sprout_ui/tailwind) ++ args,
      cd: Path.expand("../assets", __DIR__)
    ]
  end

  config :esbuild,
    version: "0.15.12",
    module: esbuild.(~w(--format=esm --sourcemap --outfile=../priv/static/sprout_ui.mjs)),
    main: esbuild.(~w(--format=cjs --sourcemap --outfile=../priv/static/sprout_ui.cjs)),
    cdn:
      esbuild.(
        ~w(--format=iife --target=es2016 --global-name=SproutUI --outfile=../priv/static/sprout_ui.js)
      ),
    cdn_min:
      esbuild.(
        ~w(--format=iife --target=es2016 --global-name=SproutUI --minify --outfile=../priv/static/sprout_ui.min.js)
      ),
    tailwind:
      esbuild_tailwind.(
        ~w(--format=cjs --sourcemap --outfile=../priv/static/sprout_ui_tailwind.js)
      )
end
