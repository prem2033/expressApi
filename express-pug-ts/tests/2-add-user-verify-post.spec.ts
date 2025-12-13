import { test, expect } from "@playwright/test";

test("Add User API should return 201", async ({ page }) => {

  // Watch for the POST /user API call
  const responsePromise = page.waitForResponse(resp =>
    resp.url().includes("/user") && resp.request().method() === "POST"
  );

  await page.goto("http://localhost:3000/user/newuser");

  await page.fill('input[name="userId"]', "200");
  await page.fill('input[name="name"]', "Test User");
  await page.fill('input[name="email"]', "test@example.com");

  await page.click('button[type="submit"]');

  const response = await responsePromise;

  // Assert status 201
  expect(response.status()).toBe(201);

  // Redirect happens automatically
  await expect(page).toHaveURL(/.*\/user/);
});
