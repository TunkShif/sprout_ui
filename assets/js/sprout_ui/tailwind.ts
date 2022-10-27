import plugin from "tailwindcss/plugin"

const states = ["show", "hidden"]

export default plugin(({ addVariant }) => {
  states.forEach((state) => {
    addVariant(`sprout-${state}`, `&[data-state=${state}]`)
  })
})
