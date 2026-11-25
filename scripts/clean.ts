
import { rm, mkdir } from "node:fs/promises";
import path from "node:path";

async function cleanArtifacts(): Promise<void> {

  const directories = [
    "reports",
    "artifacts/screenshots",
    "artifacts/traces"
  ];

  for (const directory of directories) {

    const absolutePath = path.resolve(directory);

    await rm(absolutePath, {
      recursive: true,
      force: true
    });

    await mkdir(absolutePath, {
      recursive: true
    });
  }

  console.log("Generated reports and artifacts have been cleaned.");
}

cleanArtifacts().catch((error: unknown) => {
  console.error("Cleanup failed:", error);
  process.exitCode = 1;
});
