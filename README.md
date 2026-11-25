# Playwright + Cucumber BDD AI Automation Framework

Phase 1 starter: TypeScript, Playwright, Cucumber.js, Page Object Model, hooks, failure screenshots, and a local demo login app.

## Prerequisites

- Node.js 22 LTS or newer supported LTS release
- npm
- VS Code
- Git recommended

## Setup on Windows PowerShell

```powershell
npm install
npx playwright install chromium
Copy-Item .env.example .env
```

## Run the demo app

Open Terminal 1:

```powershell
npm run demo
```

The demo app listens at `http://127.0.0.1:4173/login`.

## Run the BDD tests

Open Terminal 2 in the same project directory:

```powershell
npm test
```

Run with a visible browser:

```powershell
npm run test:headed
```

Type-check TypeScript:

```powershell
npm run typecheck
```

Open the report:

```powershell
Start-Process reports/cucumber-report.html
```

## Demo credentials

- Valid: `qa.user@example.com` / `Password123!`
- Invalid: any other email/password combination

These credentials are only for this local demo. Never use real customer credentials in test code.

## Project structure

```text
demo/server.ts                     local demo web application
src/features/login.feature         business-readable scenarios
src/pages/LoginPage.ts             UI locators and page actions
src/steps/login.steps.ts           Gherkin step implementations
src/support/hooks.ts               browser lifecycle and failure screenshots
src/support/world.ts               scenario-scoped test context
src/support/config.ts              environment configuration
reports/                            generated Cucumber HTML report
artifacts/                          failure screenshots
```

## Production notes

- The demo server is intentionally separate from the automation code.
- Each Cucumber scenario receives a fresh browser context and page.
- The initial failure artifact is a screenshot. Playwright trace collection can be added in Phase 2.
- AI code modification is intentionally not enabled in Phase 1. Later phases should produce a patch in an isolated worktree, run checks, and require human approval before merge.
- Never send secrets, customer data, or unredacted production screenshots to an LLM.
