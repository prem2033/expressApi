import { test, expect } from "@playwright/test";

test("Add user and redirect to userList page", async ({ page }) => {
  // 1. Go to Add User page
  await page.goto("http://localhost:3000/user/newuser");

  // 2. Fill the form
  await page.fill('input[name="userId"]', "101");
  await page.fill('input[name="name"]', "Prem");
  await page.fill('input[name="email"]', "prem@example.com");

  // 3. Submit form
  await page.click('button[type="submit"]');

  // 4. Expect a redirect to /user
  await expect(page).toHaveURL(/.*\/user/);

  // 5. (Optional) verify content on the list page
  await expect(page.getByRole("cell", { name: "101" }).first()).toBeVisible();
  // Verify the row exist uniquely
  const lastRow = page.locator("tr").last();

  await expect(lastRow).toContainText("101");
  await expect(lastRow).toContainText("Prem");
  await expect(lastRow).toContainText("prem@example.com");
});
