import Config

if Mix.env() == :dev do
  esbuild = fn args ->
    [
      args: ~w(./js/sprout_ui --bundle) ++ args,
      cd: Path.expand("../assets", __DIR__),
      env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
    ]
  end

  config :esbuild,
    version: "0.12.15",
    module: esbuild.(~w(--format=esm --sourcemap --outfile=../priv/static/sprout_ui.esm.js)),
    main: esbuild.(~w(--format=cjs --sourcemap --outfile=../priv/static/sprout_ui.cjs.js)),
    cdn:
      esbuild.(
        ~w(--format=iife --target=es2016 --global-name=SproutUI --outfile=../priv/static/sprout_ui.js)
      ),
    cdn_min:
      esbuild.(
        ~w(--format=iife --target=es2016 --global-name=SproutUI --minify --outfile=../priv/static/sprout_ui.min.js)
      )
end
