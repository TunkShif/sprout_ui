<p align="center">
  <img src="./images/logo.svg" height="128" alt="SproutUI logo">
</p>

---

> **Still Work In Progress**

SproutUI provides unstyled and accessible Phoenix (Live View) components for building web apps.

## Installation

The package can be installed by adding `sprout_ui` to your list of dependencies in `mix.exs`:

```elixir
def deps do
  [
    {:sprout_ui, git: "https://github.com/TunkShif/sprout_ui"}
  ]
end
```

## Preview

There's a phoenix project in `test` folder demonstrating the usage of all components. And later I'm considering using `Puppeteer` to test all these components.

To start running the preview testing project:

```bash
# Enter the `test` folder
cd test
# Install dependencies with mix deps.get
mix deps.get
# Install javascript dependencies
cd assets && npm install
# Start Phoenix endpoint with mix phx.server or inside IEx with iex -S mix phx.server
mix phx.server
```

## Copyright & License

SproutUI source code is distributed under the [MIT License](./LICENSE).
