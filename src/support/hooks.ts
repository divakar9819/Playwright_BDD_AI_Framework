import {
  After,
  Before,
  Status,
  setDefaultTimeout
} from "@cucumber/cucumber";

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { config } from "./config";
import type { AutomationWorld } from "./world";

setDefaultTimeout(30_000);

function safeName(value: string): string {
  return value
    .replace(/[^a-z0-9-_]+/gi, "_")
    .slice(0, 80) || "scenario";
}

Before(async function (this: AutomationWorld, scenario) {
  this.scenarioName = safeName(scenario.pickle.name);

  this.browser = await chromium.launch({
    headless: config.headless
  });

  this.context = await this.browser.newContext();

  // Start recording Playwright trace
  await this.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });

  this.page = await this.context.newPage();
});

After(async function (this: AutomationWorld, scenario) {
  const failed =
    scenario.result?.status === Status.FAILED;

  const uniqueId =
    `${Date.now()}-${randomUUID().slice(0, 8)}`;

  const baseName =
    `${this.scenarioName}-${uniqueId}`;

  try {

    // Screenshot only when scenario fails
    if (failed && this.page) {

      await mkdir(
        path.resolve("artifacts/screenshots"),
        { recursive: true }
      );

      const screenshotPath = path.resolve(
        "artifacts/screenshots",
        `${baseName}.png`
      );

      const screenshot = await this.page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      await this.attach(screenshot, "image/png");
    }

    // Save trace only when scenario fails
    if (this.context) {

      if (failed) {

        await mkdir(
          path.resolve("artifacts/traces"),
          { recursive: true }
        );

        const tracePath = path.resolve(
          "artifacts/traces",
          `${baseName}.zip`
        );

        await this.context.tracing.stop({
          path: tracePath
        });

        await this.attach(
          `Playwright trace saved at: ${tracePath}`,
          "text/plain"
        );

      } else {

        await this.context.tracing.stop();

      }
    }

  } finally {

    await this.context?.close();
    await this.browser?.close();

  }
});
