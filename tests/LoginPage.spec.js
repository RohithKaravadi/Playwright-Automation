import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";

import { BASEURL, USERNAME, PASSWORD } from "../utils/envConfig.js";

test("Login to Sauce application with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(BASEURL);
  await loginPage.login(USERNAME, PASSWORD);
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});
