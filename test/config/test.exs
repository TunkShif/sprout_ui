import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :sprout, SproutWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "PNNJ19fOZIJqFOP8wUCV3pWsugICKO8B+nzsf4U6gugW0+mELMSIL7xdHRT3Y5V6",
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
