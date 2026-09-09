# LiveDataLink directory copy

Verified September 8, 2026 against the hosted service. Use this copy for current listings; historical changelogs are not product metadata.

## Short description

Optional coverage headline: **Over 2 million indexed public records. One MCP endpoint.** This counts nonprofit and court-case metadata records; link to [the dated coverage evidence](COVERAGE.md) when using it. Keep the technical catalog counts below for installation and directory validation.

Hosted Streamable HTTP MCP for source-linked public data: 294 tools across 60 domains.

## Extended description

LiveDataLink gives AI agents one hosted MCP endpoint for source-linked public data across 60 domains. Its 294 tools cover government and regulatory records, financial and economic data, carrier safety, sanctions/KYB, courts, property and real estate, health, energy, patents, nonprofits, and cross-source evidence workflows. Results include source and freshness context. Load task-specific tool groups with `?groups=` instead of the full catalog. API-key authentication is supported, with a free 1,000-query monthly evaluation tier; no card required. Coverage, freshness, and upstream credentials or terms vary by source.

## Connection and identity

- Website: https://livedatalink.ai
- Endpoint: `https://livedatalink.ai/mcp`
- Transport: Streamable HTTP
- Auth: `Authorization: Bearer <API_KEY>`; anonymous evaluation is available with a 25 lifetime data-call allowance per network.
- Free key: https://livedatalink.ai/signup/free — 1,000 queries/month, no card. Setup opens in the browser.
- Catalog: https://livedatalink.ai/tools
- Public distribution repository: https://github.com/blackboxfoundry/livedatalink
- Registry identity: `io.github.blackboxfoundry/livedatalink`
- Glama connector: https://glama.ai/mcp/connectors/io.github.blackboxfoundry/livedatalink
- Smithery: https://smithery.ai/servers/blackboxfoundry/livedatalink
- Logo: https://raw.githubusercontent.com/blackboxfoundry/livedatalink/main/logo.svg
- Operator/contact: Blackbox Foundry LLC — support@livedatalink.ai
- Pricing: Free $0 / 1,000 queries; Starter $10/month / 5,000; Pro $49/month / 50,000. Hard allowances; no automatic overage charges. See https://livedatalink.ai/pricing.

## Claims discipline

Use source-linked, not independently verified. Do not claim that every source is real-time, that all records have full text, or that every connector works without upstream credentials. Keep upstream catalog sizes separate from records actually indexed by LiveDataLink.
