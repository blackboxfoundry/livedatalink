#!/usr/bin/env node
/**
 * LiveDataLink installer CLI
 * Run: npx @blackboxfoundry/livedatalink
 *
 * Detects installed MCP clients (Claude Desktop, Cursor, Cline, Continue, Zed),
 * prompts for an API key, and writes the LiveDataLink MCP config block into
 * each client's config file. Idempotent: re-running is safe.
 *
 * Zero dependencies (built-ins only). Works on Windows, macOS, Linux.
 *
 * Flags:
 *   --key=<api-key>     Skip the prompt, use this key.
 *   --client=<name>     Install for only one client (claude-desktop|cursor|cline|continue|zed).
 *   --remove            Remove the LiveDataLink entry instead of adding it.
 *   --print             Just print what would be written; don't change files.
 *   --yes               Accept all defaults; non-interactive.
 *
 * Author: Blackbox Foundry LLC
 */

"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");

// -------------------------------------------------------------------
// Constants
// -------------------------------------------------------------------

const LIVEDATALINK_URL = "https://livedatalink.ai/mcp";
const SIGNUP_URL = "https://livedatalink.ai/signup/free";
const PRICING_URL = "https://livedatalink.ai/#pricing";
const TOOL_KEY = "livedatalink";

// -------------------------------------------------------------------
// Color helpers (no chalk dependency)
// -------------------------------------------------------------------

const isTTY = process.stdout.isTTY && !process.env.NO_COLOR;
const c = (code) => (s) => isTTY ? `[${code}m${s}[0m` : s;
const bold = c("1");
const dim = c("2");
const red = c("31");
const green = c("32");
const yellow = c("33");
const blue = c("36");
const magenta = c("35");

function banner() {
  const line = (txt) => console.log(txt);
  line("");
  line(bold(blue("LiveDataLink")) + dim(" - 88 real-time data tools for AI agents"));
  line(dim("88 tools across 18 domains: finance, sanctions, courts, EIA energy, FRED macro, SEC EDGAR, NREL renewables, and more"));
  line(dim("https://livedatalink.ai"));
  line("");
}

// -------------------------------------------------------------------
// Argv
// -------------------------------------------------------------------

function parseArgs() {
  const argv = process.argv.slice(2);
  const out = { key: null, client: null, remove: false, print: false, yes: false, help: false };
  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") out.help = true;
    else if (arg === "--remove") out.remove = true;
    else if (arg === "--print") out.print = true;
    else if (arg === "--yes" || arg === "-y") out.yes = true;
    else if (arg.startsWith("--key=")) out.key = arg.slice("--key=".length);
    else if (arg.startsWith("--client=")) out.client = arg.slice("--client=".length).toLowerCase();
    else if (!arg.startsWith("--")) {
      // bare arg = api key (convenience: `npx @blackboxfoundry/livedatalink <key>`)
      if (!out.key) out.key = arg;
    }
  }
  return out;
}

function printHelp() {
  banner();
  console.log("Usage:");
  console.log("  npx @blackboxfoundry/livedatalink [api-key] [flags]");
  console.log("");
  console.log("Flags:");
  console.log("  --key=<api-key>     Pass the API key as a flag.");
  console.log("  --client=<name>     Only configure one client. Names: claude-desktop, cursor, cline, continue, zed");
  console.log("  --remove            Remove the LiveDataLink entry instead of adding it.");
  console.log("  --print             Print what would be written, don't modify files.");
  console.log("  --yes               Accept all defaults (non-interactive).");
  console.log("  --help              Show this message.");
  console.log("");
  console.log("Get a free API key (100 queries/month, no card): " + SIGNUP_URL);
  console.log("");
}

// -------------------------------------------------------------------
// Client config paths
// -------------------------------------------------------------------

const HOME = os.homedir();
const APPDATA = process.env.APPDATA || path.join(HOME, "AppData", "Roaming");
const PLATFORM = process.platform; // 'win32' | 'darwin' | 'linux'

const CLIENTS = [
  {
    id: "claude-desktop",
    label: "Claude Desktop",
    paths: () => {
      if (PLATFORM === "win32") return [path.join(APPDATA, "Claude", "claude_desktop_config.json")];
      if (PLATFORM === "darwin") return [path.join(HOME, "Library", "Application Support", "Claude", "claude_desktop_config.json")];
      return [path.join(HOME, ".config", "Claude", "claude_desktop_config.json")];
    },
    addEntry: (cfg, apiKey) => mergeMcpServers(cfg, apiKey),
    removeEntry: (cfg) => removeMcpServers(cfg),
  },
  {
    id: "cursor",
    label: "Cursor",
    paths: () => [
      path.join(HOME, ".cursor", "mcp.json"),
    ],
    addEntry: (cfg, apiKey) => mergeMcpServers(cfg, apiKey),
    removeEntry: (cfg) => removeMcpServers(cfg),
  },
  {
    id: "cline",
    label: "Cline (VS Code extension)",
    paths: () => {
      const vsBase =
        PLATFORM === "win32" ? path.join(APPDATA, "Code", "User", "globalStorage")
        : PLATFORM === "darwin" ? path.join(HOME, "Library", "Application Support", "Code", "User", "globalStorage")
        : path.join(HOME, ".config", "Code", "User", "globalStorage");
      return [
        path.join(vsBase, "saoudrizwan.claude-dev", "settings", "cline_mcp_settings.json"),
      ];
    },
    addEntry: (cfg, apiKey) => mergeMcpServers(cfg, apiKey),
    removeEntry: (cfg) => removeMcpServers(cfg),
  },
  {
    id: "continue",
    label: "Continue",
    paths: () => [
      path.join(HOME, ".continue", "config.json"),
    ],
    addEntry: (cfg, apiKey) => mergeContinue(cfg, apiKey),
    removeEntry: (cfg) => removeContinue(cfg),
  },
  {
    id: "zed",
    label: "Zed",
    paths: () => {
      if (PLATFORM === "win32") return [path.join(APPDATA, "Zed", "settings.json")];
      if (PLATFORM === "darwin") return [path.join(HOME, ".config", "zed", "settings.json")];
      return [path.join(HOME, ".config", "zed", "settings.json")];
    },
    addEntry: (cfg, apiKey) => mergeZed(cfg, apiKey),
    removeEntry: (cfg) => removeZed(cfg),
  },
];

// -------------------------------------------------------------------
// Config merge strategies (per client shape)
// -------------------------------------------------------------------

function mergeMcpServers(cfg, apiKey) {
  if (typeof cfg !== "object" || cfg === null) cfg = {};
  if (typeof cfg.mcpServers !== "object" || cfg.mcpServers === null) cfg.mcpServers = {};
  cfg.mcpServers[TOOL_KEY] = {
    url: LIVEDATALINK_URL,
    headers: { Authorization: `Bearer ${apiKey}` },
  };
  return cfg;
}

function removeMcpServers(cfg) {
  if (cfg && cfg.mcpServers && cfg.mcpServers[TOOL_KEY]) delete cfg.mcpServers[TOOL_KEY];
  return cfg;
}

function mergeContinue(cfg, apiKey) {
  if (typeof cfg !== "object" || cfg === null) cfg = {};
  if (!Array.isArray(cfg.mcpServers)) cfg.mcpServers = [];
  const existing = cfg.mcpServers.findIndex((s) => s && s.name === TOOL_KEY);
  const entry = {
    name: TOOL_KEY,
    transport: { type: "streamable-http", url: LIVEDATALINK_URL },
    headers: { Authorization: `Bearer ${apiKey}` },
  };
  if (existing >= 0) cfg.mcpServers[existing] = entry;
  else cfg.mcpServers.push(entry);
  return cfg;
}

function removeContinue(cfg) {
  if (cfg && Array.isArray(cfg.mcpServers)) {
    cfg.mcpServers = cfg.mcpServers.filter((s) => !s || s.name !== TOOL_KEY);
  }
  return cfg;
}

function mergeZed(cfg, apiKey) {
  if (typeof cfg !== "object" || cfg === null) cfg = {};
  if (typeof cfg.context_servers !== "object" || cfg.context_servers === null) cfg.context_servers = {};
  cfg.context_servers[TOOL_KEY] = {
    source: "custom",
    command: "remote",
    transport: "streamable-http",
    url: LIVEDATALINK_URL,
    headers: { Authorization: `Bearer ${apiKey}` },
  };
  return cfg;
}

function removeZed(cfg) {
  if (cfg && cfg.context_servers && cfg.context_servers[TOOL_KEY]) delete cfg.context_servers[TOOL_KEY];
  return cfg;
}

// -------------------------------------------------------------------
// File I/O helpers
// -------------------------------------------------------------------

function readJsonSafe(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf8");
    if (!raw.trim()) return {};
    return JSON.parse(raw);
  } catch (err) {
    console.log(yellow(`  warning: existing config at ${filePath} was not valid JSON. Will not modify.`));
    console.log(yellow(`  ${err.message}`));
    return undefined; // sentinel: do not write
  }
}

function writeJsonAtomic(filePath, obj) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  // Back up the existing file if present.
  if (fs.existsSync(filePath)) {
    const backup = filePath + ".bak-livedatalink-" + Date.now();
    fs.copyFileSync(filePath, backup);
  }
  const tmp = filePath + ".tmp-livedatalink";
  fs.writeFileSync(tmp, JSON.stringify(obj, null, 2) + "\n", "utf8");
  fs.renameSync(tmp, filePath);
}

// -------------------------------------------------------------------
// Prompt
// -------------------------------------------------------------------

function prompt(question, mask = false) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    if (mask) {
      // Hide input by replacing the output write.
      const origWrite = rl._writeToOutput;
      rl._writeToOutput = function (s) {
        if (s.length === 1 && s !== "\n" && s !== "\r" && s !== "") origWrite.call(rl, "*");
        else origWrite.call(rl, s);
      };
    }
    rl.question(question, (a) => {
      rl.close();
      resolve(a.trim());
    });
  });
}

async function promptYesNo(question, defaultYes = true) {
  const def = defaultYes ? "Y/n" : "y/N";
  const a = await prompt(`${question} [${def}] `);
  if (!a) return defaultYes;
  return /^y(es)?$/i.test(a);
}

// -------------------------------------------------------------------
// Main
// -------------------------------------------------------------------

(async function main() {
  const args = parseArgs();
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  banner();

  // Get the API key.
  let apiKey = args.key;
  if (!args.remove && !apiKey) {
    if (args.yes) {
      console.log(red("error: --yes was passed but no API key was provided. Use --key=<key>."));
      process.exit(1);
    }
    console.log(`Get a free API key (100 queries/month, no card): ${blue(SIGNUP_URL)}`);
    console.log(`Paid plans from $10/month: ${blue(PRICING_URL)}`);
    console.log("");
    apiKey = await prompt(magenta("Paste your LiveDataLink API key (input hidden): "), true);
    console.log("");
    if (!apiKey || apiKey.length < 10) {
      console.log(red("API key looks too short. Cancelling. Try again with a real key."));
      process.exit(1);
    }
  }

  // Filter clients if --client was provided.
  const wanted = args.client ? CLIENTS.filter((c) => c.id === args.client) : CLIENTS;
  if (wanted.length === 0) {
    console.log(red(`error: unknown client '${args.client}'. Valid: ${CLIENTS.map((c) => c.id).join(", ")}`));
    process.exit(1);
  }

  let touchedAny = false;
  const summary = [];

  for (const client of wanted) {
    const candidatePaths = client.paths();
    let foundPath = null;
    for (const p of candidatePaths) {
      if (fs.existsSync(p) || fs.existsSync(path.dirname(p))) {
        foundPath = p;
        break;
      }
    }
    if (!foundPath) {
      summary.push({ label: client.label, status: "skipped", reason: "client not detected" });
      continue;
    }

    let proceed = args.yes;
    if (!args.yes) {
      const verb = args.remove ? "Remove LiveDataLink from" : "Install LiveDataLink into";
      proceed = await promptYesNo(`${verb} ${bold(client.label)} (${dim(foundPath)})?`, true);
    }
    if (!proceed) {
      summary.push({ label: client.label, status: "skipped", reason: "user declined" });
      continue;
    }

    let cfg = readJsonSafe(foundPath);
    if (cfg === undefined) {
      summary.push({ label: client.label, status: "skipped", reason: "existing config has JSON errors" });
      continue;
    }
    if (cfg === null) cfg = {};

    cfg = args.remove ? client.removeEntry(cfg) : client.addEntry(cfg, apiKey);

    if (args.print) {
      console.log(dim(`  would write to ${foundPath}:`));
      console.log(JSON.stringify(cfg, null, 2));
      summary.push({ label: client.label, status: "printed", reason: foundPath });
      continue;
    }

    try {
      writeJsonAtomic(foundPath, cfg);
      summary.push({ label: client.label, status: args.remove ? "removed" : "installed", reason: foundPath });
      touchedAny = true;
    } catch (err) {
      summary.push({ label: client.label, status: "failed", reason: err.message });
    }
  }

  // Final summary
  console.log("");
  console.log(bold("Summary:"));
  for (const s of summary) {
    const tag =
      s.status === "installed" ? green("OK   ") :
      s.status === "removed" ? green("OK   ") :
      s.status === "printed" ? blue("PRINT") :
      s.status === "skipped" ? yellow("SKIP ") :
      red("FAIL ");
    console.log(`  ${tag} ${s.label}  ${dim(s.reason)}`);
  }

  if (touchedAny && !args.remove) {
    console.log("");
    console.log(green("Done. Restart your MCP client(s) to load LiveDataLink."));
    console.log(dim("Free discovery tool: call search_available_datasets first to explore the catalog (no credits charged)."));
    console.log(dim("Docs: https://livedatalink.ai/tools"));
  }
})().catch((err) => {
  console.error(red("\nFatal error:"), err.message);
  process.exit(1);
});
