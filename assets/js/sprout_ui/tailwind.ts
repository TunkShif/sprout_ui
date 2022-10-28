import plugin from "tailwindcss/plugin"

const states = ["open", "closed"]

export default plugin(({ addVariant }) => {
  states.forEach((state) => {
    addVariant(`sprt-${state}`, `&[data-state=${state}]`)
  })
})
