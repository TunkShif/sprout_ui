import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :sprout, SproutWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "HQt2YpX0FGbs3o2N0aoO/l6BW/pxZ1M1pOayG6NmCwh4HvSDZpsbyRJzXlrvv+09",
  server: true

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime

config :wallaby,
  otp_app: :sprout,
  driver: Wallaby.Chrome,
  chromedriver: [
    binary: "/usr/bin/google-chrome-stable",
    path: Path.expand("../_build/chromedriver", __DIR__)
  ]
