import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 10000,
  includeShadowDom: true,
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/screenshots",
  pageLoadTimeout: 120000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  env: {},
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    specPattern: "tests/cypress/e2e/webtests/**/*.cy.{js,ts}",
    supportFile: "tests/cypress/support/e2e.ts",
    fixturesFolder: "tests/cypress/fixtures",
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
      return config;
    },
  },
});
