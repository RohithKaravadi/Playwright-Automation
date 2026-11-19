import { LoginLocators } from "../locators/LoginPageLocators";
import { page } from "@playwright/test";

export class LoginPage {
  // Initialize the object: so which will initialize the page object will initialize.
  // It will launch the page or browser tap.
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto(BASEURL) {
    await this.page.goto(BASEURL);
  }

  async login(USERNAME, PASSWORD) {
    await this.usernameInput.fill(USERNAME);
    await this.passwordInput.fill(PASSWORD);
    await this.loginButton.click();
  }
}
