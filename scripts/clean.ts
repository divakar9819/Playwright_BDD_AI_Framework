import { rm, mkdir } from "node:fs/promises";

async function main(): Promise<void> {
  for (const directory of ["reports", "artifacts"]) {
    await rm(directory, { recursive: true, force: true });
    await mkdir(directory, { recursive: true });
  }
  console.log("Cleaned reports/ and artifacts/.");
}

void main();
