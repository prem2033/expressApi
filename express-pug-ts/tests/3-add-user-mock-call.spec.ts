import { test, expect } from "@playwright/test";

test("Mock add user API", async ({ page }) => {
  await page.route("**/user", (route) => {
    route.fulfill({
      status: 201,
      json: { success: true, message: "User created" },
    });
  });

  await page.goto("http://localhost:3000/user/newuser");

  await page.fill('input[name="userId"]', "301");
  await page.fill('input[name="name"]', "Mock User");
  await page.fill('input[name="email"]', "mock@example.com");

  await page.click('button[type="submit"]');

  // Since frontend redirects after 201, check redirect
  await expect(page).toHaveURL(/.*\/user/);
  const lastRow = page.locator("tr").last();

  await expect(lastRow).toHaveCount(0);
});
