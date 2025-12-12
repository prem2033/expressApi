import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  // Run tests in parallel
  fullyParallel: true,

  // Fail build on test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failing tests in CI
  retries: process.env.CI ? 2 : 0,

  // Workers
  //   workers: process.env.CI ? 1 : undefined,
  //
  // Reporters
  reporter: [["html", { open: "never" }]],

  // Timeout per test
  timeout: 30 * 1000,

  // Expect timeout
  expect: {
    timeout: 5000,
  },

  use: {
    // Base URL of your local server
    baseURL: "http://localhost:3000",

    // Screenshot on failure
    screenshot: "only-on-failure",

    // Record video only on retry
    video: "retain-on-failure",

    trace: "retain-on-failure",
  },

  // Browsers to test (enable if needed)
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
