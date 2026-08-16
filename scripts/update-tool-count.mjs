#!/usr/bin/env node
// Keeps the advertised tool/domain counts in sync with the live catalog across
// EVERY file a directory reads, not just the human-facing docs.
//
// Source of truth: https://livedatalink.ai/health, which reports the counts the
// server actually serves. (The previous version scraped /tools and only touched
// README.md and package.json, which is why smithery.yaml, glama.json and
// server.json silently drifted to 283/59 and 257/56 while live was 284/59.
// Those three are exactly the files Smithery, Glama and the MCP Registry read.)
//
// Usage: node scripts/update-tool-count.mjs [--check]
//   --check  exit non-zero if anything is stale, write nothing (for CI)

import { readFile, writeFile } from "node:fs/promises";

const HEALTH_URL = "https://livedatalink.ai/health";
const CHECK = process.argv.includes("--check");

/** Files that carry a count, and are read by a directory or a human. */
const FILES = [
  "README.md",
  "package.json",
  "smithery.yaml",   // Smithery listing
  "glama.json",      // Glama listing
  "server.json",     // Official MCP Registry (a change here triggers publish)
  "llms-install.md",
  "llms.txt",       // crawler-facing wrapper summary
  "bin/install.js", // first text seen by CLI installers
];

// Counts are not enough: stale pricing, auth, or transport language can make a
// directory listing materially misleading even when its badge is correct.
// Keep these deliberately narrow so historical CHANGELOG entries are allowed.
const CURRENT_CONTRACT_FILES = ["README.md", "llms.txt", "glama.json", "smithery.yaml"];
const FORBIDDEN_CURRENT_CLAIMS = [
  /\$0\.01\/query overage/i,
  /predictable overage rate/i,
  /anonymous (?:tier|evaluation)\s*[:(]?\s*2 req\/min/i,
  /free tier \(100 queries/i,
];

async function liveCounts() {
  const res = await fetch(HEALTH_URL, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error("Health fetch failed: " + res.status);
  const j = await res.json();
  const tools = Number(j.tools);
  const domains = Number(j.domains);
  if (!tools || !domains) throw new Error("Health did not report tools/domains");
  return { tools, domains };
}

/**
 * Rewrite every count-bearing phrase we use anywhere.
 *
 * Deliberately phrase-anchored rather than a bare \d+ sweep: a blind numeric
 * replace would corrupt version strings, ports, prices and the free-tier
 * allowance. Each pattern below is one way we actually write the number.
 */
function applyCounts(text, { tools, domains }) {
  return text
    // "283 tools", "283 real-time data tools", "283 production tools"
    .replace(/\b\d{2,4}(\s+(?:real-time data|production))?\s+tools\b/gi, (m) =>
      m.replace(/^\d{2,4}/, String(tools)))
    // "all 283 tools"
    .replace(/\ball\s+\d{2,4}\s+tools\b/gi, `all ${tools} tools`)
    // "59 domains", "59 US public-data domains", "59 live data domains"
    .replace(/\b\d{1,3}(\s+(?:US public-data|live data|data))?\s+domains\b/gi, (m) =>
      m.replace(/^\d{1,3}/, String(domains)))
    // badge shields: tools-283-blue / domains-59-blue
    .replace(/badge\/tools-\d{2,4}-/g, `badge/tools-${tools}-`)
    .replace(/badge\/domains-\d{1,3}-/g, `badge/domains-${domains}-`)
    // package.json "mcp" block: "tools": 283 / "domains": 59
    .replace(/("tools"\s*:\s*)\d{2,4}/g, `$1${tools}`)
    .replace(/("domains"\s*:\s*)\d{1,3}/g, `$1${domains}`);
}

const REGISTRY_URL =
  "https://registry.modelcontextprotocol.io/v0/servers?search=livedatalink";

const parseVer = (v) => {
  const m = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(v).trim());
  if (!m) throw new Error("Unparseable version: " + v);
  return m.slice(1, 4).map(Number);
};
const cmpVer = (a, b) => {
  const [x, y] = [parseVer(a), parseVer(b)];
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
  return 0;
};

/** Version currently published to the MCP Registry, or null if unreachable. */
async function publishedVersion() {
  try {
    const res = await fetch(REGISTRY_URL, { headers: { accept: "application/json" } });
    if (!res.ok) return null;
    const j = await res.json();
    const latest = (j.servers || []).find(
      (s) => s._meta?.["io.modelcontextprotocol.registry/official"]?.isLatest,
    );
    return latest?.server?.version ?? null;
  } catch {
    return null;
  }
}

/**
 * Next version for server.json.
 *
 * The registry rejects a re-publish of a version it already has, so an accurate
 * description would never land without a bump. It also must never go BACKWARDS:
 * the repo copy sat at 1.4.0 while the registry served 1.5.0, so a naive
 * local-only patch bump would have produced 1.4.1 and either failed to publish
 * or regressed the listing. Bump from whichever is higher.
 */
function bumpPatch(localVersion, published) {
  const base =
    published && cmpVer(published, localVersion) > 0 ? published : localVersion;
  const [maj, min, patch] = parseVer(base);
  return `${maj}.${min}.${patch + 1}`;
}

async function run() {
  const counts = await liveCounts();
  console.log(`Live: ${counts.tools} tools / ${counts.domains} domains`);
  const published = await publishedVersion();
  console.log("Registry currently serves:", published ?? "(unreachable)");

  const stale = [];
  for (const file of FILES) {
    const before = await readFile(file, "utf8");
    let after = applyCounts(before, counts);

    if (file === "server.json") {
      const parsed = JSON.parse(after);
      // Bump when the counts changed, OR when the repo has fallen behind the
      // registry (which is how it ended up at 1.4.0 against a live 1.5.0).
      const behind = published && cmpVer(published, parsed.version) > 0;
      if (after !== before || behind) {
        parsed.version = bumpPatch(parsed.version, published);
        after = JSON.stringify(parsed, null, 2) + "\n";
        console.log(`  server.json version -> ${parsed.version} (publishes to the registry)`);
      }
    }

    if (after !== before) {
      stale.push(file);
      if (!CHECK) await writeFile(file, after);
    }
  }

  for (const file of CURRENT_CONTRACT_FILES) {
    const text = await readFile(file, "utf8");
    const matched = FORBIDDEN_CURRENT_CLAIMS.find((pattern) => pattern.test(text));
    if (matched) stale.push(`${file} (obsolete commercial claim: ${matched})`);
  }

  if (CHECK && stale.length) {
    console.error("Stale counts in: " + stale.join(", "));
    console.error("Run: node scripts/update-tool-count.mjs");
    process.exit(1);
  }
  console.log(stale.length ? "Updated: " + stale.join(", ") : "All files already current.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
