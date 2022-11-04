describe("Sprout", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:4000");
  });

  it("should have bold title", async () => {
    const $h2 = await page.$("h2");

    await expect($h2!.evaluate(node => node.innerHTML)).resolves.toMatch("Sprout UI");
    await expect($h2!.evaluate(node => node.classList.toString().split(" "))).resolves.toContain(
      "font-bold"
    );
  });
});

export { };
