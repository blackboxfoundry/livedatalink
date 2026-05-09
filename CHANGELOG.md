# Changelog

All notable changes to LiveDataLink are documented here. The hosted MCP server is the source of truth; this file tracks the user-visible additions.

## [1.0.0] — 2026-05-09

### Added
- **62 production tools across 14 live domains** — finance (stocks, options, fundamentals), crypto, FMCSA carrier safety, property records, weather and air quality, vehicles (VIN/recalls), package tracking, local business search, sanctions screening (OFAC SDN, EU CFSP, UN, BIS DPL), FEMA disasters and flood data, federal courts (CourtListener), cybersecurity (CVE, CWE, EPSS, CISA KEV), US college metrics (IPEDS), and a free discovery tool.
- **Free `search_available_datasets` tool** — runs against the live catalog at no credit cost. Logs every query to drive what gets built next.
- **Free tier** — 100 queries/month, 5 req/min, all 62 tools, no credit card required. Sign up at https://livedatalink.ai/signup/free.
- **Starter tier** — $10/month, 5,000 queries, 30 req/min. Subscribe at https://buy.stripe.com/9B628jbpI61ie8S1ZUeUU00.
- **Pro tier** — $49/month, 50,000 queries, 120 req/min. Subscribe at https://buy.stripe.com/8x28wHalE2P69SCfQKeUU01.
- **Anonymous evaluation** — 10 req/min on `/mcp` with no API Key required. For trying tools before signing up.
- **Public tool catalog** at https://livedatalink.ai/tools.
- **Machine-readable site summary** at https://livedatalink.ai/llms.txt.
- **Demand-driven roadmap** — every unmet `search_available_datasets` query is logged. High-frequency requests jump the build queue.

### Infrastructure
- Hosted on Cloudflare Workers, Streamable HTTP transport.
- One bearer token, predictable monthly billing, $0.01/query overage rate (flat across all tools).
- Open MCP protocol — no client lock-in, portable bearer tokens.

### Operator
- Blackbox Foundry LLC, a Texas single-member LLC.
- Support: support@livedatalink.ai (real human responds within 24 hours).
