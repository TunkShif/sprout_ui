const { defaults: tsJest } = require("ts-jest/presets");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "jest-puppeteer",
  // setupFilesAfterEnv: ["./jest-setup.ts"],
  transform: {
    ...tsJest.transform
  }
};
