#!/usr/bin/env node
// Auto-updates the tool count across repo docs from the canonical live catalog.
// Source of truth: https://livedatalink.ai/tools (mirrors tools/list at /mcp).
// Counts actual tool entries rather than trusting any prose number.
// Usage: node scripts/update-tool-count.mjs [--check]
// --check exits non-zero if files are out of date (no writes).

import { readFile, writeFile } from "node:fs/promises";

const CATALOG_URL = "https://livedatalink.ai/tools";
const FILES = { readme: "README.md", pkg: "package.json" };
const CHECK = process.argv.includes("--check");

async function fetchToolCount() {
    const res = await fetch(CATALOG_URL, { headers: { accept: "text/html" } });
    if (!res.ok) throw new Error("Catalog fetch failed: " + res.status);
    const html = await res.text();
    // Each domain heading is rendered as "Domain Name (N)" / "(N tools)".
  // Sum the per-domain counts for a robust total.
  const counts = [...html.matchAll(/\((\d+)\s*tools?\)/gi)].map((m) => Number(m[1]));
    let total = counts.reduce((a, b) => a + b, 0);
    // Fallback: the page title advertises the headline number.
  if (!total) {
        const t = html.match(/([0-9]{2,4})\s+Tools/i);
        if (t) total = Number(t[1]);
  }
    if (!total || Number.isNaN(total)) throw new Error("Could not derive tool count");
    return total;
}

function applyCount(text, count) {
    // Replaces "<number> tools" and "<number> real-time data tools" patterns.
  return text
      .replace(/\b\d{2,4}\s+real-time data tools\b/g, count + " real-time data tools")
      .replace(/\ball\s+\d{2,4}\s+tools\b/g, "all " + count + " tools")
      .replace(/\b\d{2,4}\s+tools\.\s+50\+/g, count + " tools. 50+");
}

async function run() {
    const count = await fetchToolCount();
    console.log("Live tool count:", count);
    let dirty = false;

  const readme = await readFile(FILES.readme, "utf8");
    const readmeNext = applyCount(readme, count);
    if (readmeNext !== readme) {
          dirty = true;
          if (!CHECK) await writeFile(FILES.readme, readmeNext);
    }

  const pkgRaw = await readFile(FILES.pkg, "utf8");
    const pkg = JSON.parse(pkgRaw);
    const descNext = applyCount(pkg.description, count);
    if (descNext !== pkg.description) {
          dirty = true;
          pkg.description = descNext;
          if (!CHECK) await writeFile(FILES.pkg, JSON.stringify(pkg, null, 2) + "\n");
    }

  if (CHECK && dirty) {
        console.error("Docs are out of date. Run: node scripts/update-tool-count.mjs");
        process.exit(1);
  }
    console.log(dirty ? "Updated docs." : "Docs already current.");
}

run().catch((e) => {
    console.error(e);
    process.exit(1);
});
