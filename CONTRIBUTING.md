# Contributing to LiveDataLink

Thanks for thinking about contributing. This wrapper repo holds the public-facing documentation, install instructions, and configuration examples for the LiveDataLink MCP server. The hosted Worker source is proprietary and not in this repo, so contributions here focus on docs, examples, and integration scripts.

## What we welcome

- **Documentation improvements** — clearer install instructions, better examples, fixes to typos
- **Client integration examples** — `examples/` folder welcomes scripts showing how to call LiveDataLink from Claude Desktop, Cursor, Continue, Cline, custom MCP clients, or direct curl
- **Tool requests** — open an issue describing a data domain or specific tool you wish we had. The fastest way to get something built is to call `search_available_datasets` from your agent with the query — it logs straight to our roadmap database.
- **Bug reports** — if a hosted tool returns wrong/stale data or fails repeatedly, file an issue with the exact tool name, parameters, and response.

## What this repo is NOT for

- The Worker source code (proprietary, not open source)
- Pull requests modifying tool behavior (PRs against this repo can't change what the hosted server returns)
- Issues about pricing, billing, or account status (email support@livedatalink.ai instead)

## How to file issues

Use GitHub Issues on this repo: https://github.com/blackboxfoundry/livedatalink/issues

For **tool requests**, include:
- The data domain or specific source you want
- A use case (what would your agent do with this data?)
- Any public API or open data source we could pull from

For **bug reports**, include:
- Tool name (e.g. `fmcsa_carrier_lookup`)
- Input parameters (redact any sensitive identifiers)
- Expected output vs. actual output
- Timestamp of the call

## How to submit pull requests

For documentation and examples:

1. Fork this repo
2. Create a feature branch (`git checkout -b improve-cursor-example`)
3. Make changes
4. Commit with a descriptive message
5. Open a pull request against `main`

We aim to review PRs within a week. Maintained by Blackbox Foundry LLC.

## Communication

- **GitHub Issues** — tool requests, bug reports, documentation feedback
- **Email** — support@livedatalink.ai for account issues, billing questions, partnership inquiries
- Support timing varies; do not promise a response deadline.

## License

By contributing, you agree your contributions are licensed under the MIT License (same as this repo).
