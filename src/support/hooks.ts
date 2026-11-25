import {
  After,
  Before,
  Status,
  setDefaultTimeout
} from "@cucumber/cucumber";
import { chromium, firefox, webkit, type BrowserType } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { config } from "./config";
import { AutomationWorld } from "./world";

setDefaultTimeout(config.defaultTimeoutMs);

const browserTypes: Record<string, BrowserType> = {
  chromium,
  firefox,
  webkit
};

Before(async function (this: AutomationWorld) {
  const browserType = browserTypes[config.browserName];
  if (!browserType) {
    throw new Error(
      `Unsupported BROWSER="${config.browserName}". Use chromium, firefox, or webkit.`
    );
  }

  this.browser = await browserType.launch({ headless: config.headless });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(config.defaultTimeoutMs);
});

After(async function (this: AutomationWorld, scenario) {
  try {
    if (scenario.result?.status === Status.FAILED && this.page) {
      const artifactDir = path.resolve("artifacts");
      await mkdir(artifactDir, { recursive: true });
      const safeName = scenario.pickle.name
        .replace(/[^a-z0-9-_]+/gi, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80) || "failed-scenario";
      const screenshotPath = path.join(
        artifactDir,
        `${safeName}-${Date.now()}.png`
      );

      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      console.error(`Failure screenshot saved: ${screenshotPath}`);
      await this.attach(
        await this.page.screenshot({ fullPage: true }),
        "image/png"
      );
    }
  } finally {
    await this.context?.close();
    await this.browser?.close();
  }
});
