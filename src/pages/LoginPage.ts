import type { Page, Locator } from "playwright";

export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly statusMessage: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByLabel("Password");
    this.submitButton = page.getByRole("button", { name: "Sign in" });
    this.statusMessage = page.getByRole("status");
  }

  async open(baseUrl: string): Promise<void> {
    await this.page.goto(`${baseUrl}/login`);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getStatusMessage(): Promise<string> {
    await this.statusMessage.waitFor({ state: "visible" });
    return (await this.statusMessage.textContent())?.trim() ?? "";
  }
}
