
import {
  setWorldConstructor,
  World,
  type IWorldOptions
} from "@cucumber/cucumber";

import type {
  Browser,
  BrowserContext,
  Page
} from "playwright";

import type { LoginPage } from "../pages/LoginPage";

export class AutomationWorld extends World {

  browser?: Browser;

  context?: BrowserContext;

  page?: Page;

  loginPage?: LoginPage;

  scenarioName = "";

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(AutomationWorld);
