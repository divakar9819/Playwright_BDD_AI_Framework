import "dotenv/config";

export const config = {
  baseUrl: process.env.BASE_URL ?? "http://127.0.0.1:4173",
  browserName: process.env.BROWSER ?? "chromium",
  headless: (process.env.HEADLESS ?? "true").toLowerCase() !== "false",
  defaultTimeoutMs: Number(process.env.DEFAULT_TIMEOUT_MS ?? 10_000)
} as const;

if (!Number.isFinite(config.defaultTimeoutMs) || config.defaultTimeoutMs <= 0) {
  throw new Error("DEFAULT_TIMEOUT_MS must be a positive number.");
}
