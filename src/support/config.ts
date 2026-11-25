
import "dotenv/config";

function readBoolean(
  value: string | undefined,
  fallback: boolean
): boolean {
  if (value === undefined || value.trim() === "") {
    return fallback;
  }

  return value.toLowerCase() === "true";
}

export const config = {
  baseUrl: process.env.BASE_URL || "http://127.0.0.1:4173",
  headless: readBoolean(process.env.HEADLESS, true)
};
