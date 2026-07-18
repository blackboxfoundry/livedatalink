# Changelog

All notable changes to LiveDataLink are documented here. The hosted MCP server is the source of truth; this file tracks the user-visible additions.

## [1.2.0] — 2026-07-17

### Changed
- **Catalog refresh: 243 production tools across 53 live data domains** (up from the previously documented 182 / 36). Wrapper docs and registry manifests (README, glama.json, smithery.yaml, server.json, package.json, llms-install.md, examples) resynced to the live server card at https://livedatalink.ai/.well-known/mcp/server-card.json and https://livedatalink.ai/health.

### Added
- **Geocoding domain** — Census-geography geocoding tools.
- **Grants domain** — federal grants / funding lookup.
- **Product-safety domain** — CPSC product recall tools.

### Pricing (unchanged, restated for clarity)
- **Free** — 100 queries/month, 5 req/min, $0, no credit card.
- **Starter** — $10/month, 5,000 queries, 30 req/min.
- **Pro** — $49/month, 50,000 queries, 120 req/min.
- Overage $0.01/query across all tools. The free `search_available_datasets` discovery tool consumes no credits.

## [1.1.0] — 2026-05-10

### Added
- **EIA energy data domain (7 tools)** — gasoline prices, natural gas (Henry Hub spot, futures, residential, storage), state-level electricity, US oil supply by PADD, renewable generation by source, energy consumption by sector, flexible EIA series lookup.
- **FRED Federal Reserve economic data domain (7 tools)** — 800K+ macroeconomic series. Tools: series info, observations, full-text search, category browse, friendly-name quick indicators (unemployment, fed_funds, cpi, gdp, ten_year_yield, vix, wti, henry_hub natural gas, 30Y mortgage, M2, retail_sales, recession indicator, and 14 more), 2-5 series compare, releases calendar.
- **SEC EDGAR filings domain (7 tools)** — public company filings: CIK lookup by ticker/name, recent filings, filing text content, full-text search, XBRL company facts (revenue, EPS, assets), insider transactions (Form 4), filings by form type.
- **NREL renewable energy domain (5 tools)** — PVWatts solar PV production estimates, solar resource (GHI/DNI/lat-tilt), utility rates by location, alternative fuel station finder (EV, CNG, hydrogen, LPG, etc.), station detail by ID. Internal geocoding via OpenStreetMap Nominatim.
- **Options chains via Marketdata.app fallback** — `options_chain` now returns real call/put data with bid/ask, IV, OI, greeks. Previously returned a paid-tier message.

### Catalog
- Total: **88 production tools across 18 live domains** (up from 62 / 14).

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
