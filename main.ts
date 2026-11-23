// Bounty Entrants 03 — entry program (Node 22).
//
// The whole entry is the bounty manifest: BOUNTY.json at this repo's root
// names the sponsored bounties whose entrants the house should count.
// This program only carries that manifest into the output directory so
// the grader can read it. It does no fetching, no scoring and no network.
//
// The manifest is resolved from this file's own location (import.meta.url),
// never from the working directory, because the grader may run it from
// any cwd. Plain JavaScript syntax only, so it runs under Node 22 with
// or without type stripping.

import { copyFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(repoDir, "BOUNTY.json");
const destination = join(outDir, "BOUNTY.json");

// The manifest must be a JSON object with a non-empty "bounties" array
// of strings. Refuse a malformed manifest loudly instead of shipping
// an empty or broken entry.
const parsed = JSON.parse(readFileSync(source, "utf8"));
if (
  typeof parsed !== "object" ||
  parsed === null ||
  !Array.isArray(parsed.bounties) ||
  parsed.bounties.length === 0 ||
  !parsed.bounties.every((entry) => typeof entry === "string")
) {
  throw new Error(
    "BOUNTY.json must be an object with a non-empty bounties array of strings",
  );
}

copyFileSync(source, destination);
console.log(`copied BOUNTY.json (${parsed.bounties.length} bounties) to ${destination}`);
