import assert from "node:assert/strict";
import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../pages/LoginPage";
import { config } from "../support/config";
import { AutomationWorld } from "../support/world";

Given("the user opens the login page", async function (this: AutomationWorld) {
  if (!this.page) throw new Error("Browser page was not initialized by the Before hook.");
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.open(config.baseUrl);
});

When(
  "the user signs in with email {string} and password {string}",
  async function (this: AutomationWorld, email: string, password: string) {
    if (!this.loginPage) throw new Error("Login page is not initialized.");
    await this.loginPage.login(email, password);
  }
);

Then(
  "the user should see the message {string}",
  async function (this: AutomationWorld, expectedMessage: string) {
    if (!this.loginPage) throw new Error("Login page is not initialized.");
    const actualMessage = await this.loginPage.getStatusMessage();
    assert.equal(actualMessage, expectedMessage);
  }
);
