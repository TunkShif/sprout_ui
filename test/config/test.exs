import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :sprout, SproutWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "BxS30mhnRal2mT5SwxrKSiWdh1Pz5/1fu5icIX3I/+ncAz059HV1gXWm6G8DX167",
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
