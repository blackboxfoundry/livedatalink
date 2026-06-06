# LiveDataLink

**Real-time data for AI agents. 177 tools. 50+ live domains. Pay per query.**

LiveDataLink is an MCP server that gives AI agents instant access to real-world data across stocks, options, crypto, SEC EDGAR filings, US Treasury, FRED macroeconomics, BLS labor data, EIA energy, FMCSA trucking safety, federal courts, OpenSanctions screening, cybersecurity feeds (CVE/CWE/EPSS/CISA KEV), FEMA disasters, NWS weather, USGS earthquakes, FDA drug/device, EPA compliance, FEC campaign finance, NREL renewables, USAspending federal awards, US Census, World Bank, ProPublica nonprofits, NPI healthcare providers, package registries (npm, pypi, cargo, github), RDAP domain/IP records, IP reputation, FBI wanted, vehicle VIN, NHTSA recalls, property and parcel records, real estate analytics, weather, package tracking, local businesses, US college metrics, books, academic papers, SCOTUS case law, and more.

One server, one API key, no subscriptions. Connect any MCP-compatible client (Claude, GPT, Cursor, Windsurf, Cline, Continue, custom agents) and start querying live data in seconds.

**Remote MCP endpoint:** `https://livedatalink.ai/mcp`
**Status:** `https://livedatalink.ai/`
**Pricing JSON:** `https://livedatalink.ai/pricing`
**Tool catalog:** `https://livedatalink.ai/tools`
**Agent-readable summary:** `https://livedatalink.ai/llms.txt`

## Tool catalog (177 tools across 50+ domains)

The live catalog is canonical. Call `tools/list` against `https://livedatalink.ai/mcp` for the full machine-readable inventory. Selected highlights below.

### Major domain groups

| Group | Tool count | Examples |
|-------|-----------|----------|
| Finance and markets | 30+ | stock_quote, options_chain, edgar_filings, treasury_debt, fred_observations, bls_series, crypto_price |
| Compliance and legal | 25+ | sanctions_screen_entity, court_case_search, caselaw_search, reg_search, patent_search, entity_search |
| Government and public data | 30+ | census_demographics, epa_facility_search, fec_donor_search, spending_search_awards, fda_drug_label, fbi_wanted |
| Energy and environment | 20+ | eia_gasoline_prices, eia_natural_gas, nrel_solar_radiation, epa_emissions, worldbank_indicator |
| Property and real estate | 15+ | property_lookup, parcel_search, realestate_home_values, realestate_rents, flood_zone_lookup, nfip_flood_claims |
| Healthcare | 6 | npi_lookup, npi_search_provider, npi_search_organization, npi_search_specialty, trials_search, fda_device_510k |
| Cyber and developer | 12+ | cve_lookup, cve_search_by_vendor, cwe_lookup, epss_score, kev_status_check, npm_package, pypi_package, cargo_crate, github_repo, rdap_domain, ip_reputation |
| Transportation | 7 | fmcsa_carrier_lookup, fmcsa_carrier_search, fmcsa_safety_scores, fmcsa_carrier_authority, fmcsa_carrier_compare, vin_decode, vehicle_recalls |
| Weather and disasters | 8 | weather_current, weather_forecast, air_quality, disaster_declarations, nws_active_alerts, earthquake_recent, hurricane_tracker, disaster_history_summary |
| Knowledge | 17 | college_search, college_metrics, college_demographics, college_compare, college_trends, book_search, book_fulltext_search, paper_search, paper_fulltext_search |
| Misc | 4 | package_track, local_search, search_available_datasets, sanctions_status_summary |

### Sample tool table: Finance / Stocks (6 tools)

| Tool | Description | Price |
|------|-------------|-------|
| `stock_quote` | Real-time price, change, volume, market cap, P/E, dividend yield, 52-week range | $0.005 |
| `stock_quote_batch` | Batch quotes for up to 10 stocks in one call | $0.01 |
| `options_chain` | Full options chain with strike, bid/ask, volume, OI, implied volatility, Greeks | $0.02 |
| `stock_history` | Historical OHLCV data, intraday to multi-year, configurable intervals | $0.01 |
| `company_info` | Company profile, sector, revenue, margins, EPS, employees, market cap | $0.005 |
| `stock_compare` | Side-by-side comparison of 2-5 stocks across all key metrics | $0.02 |

### Finance (6 tools) - Live market data via Yahoo Finance

| Tool | Description | Price |
|------|-------------|-------|
| `stock_quote` | Real-time price, change, volume, market cap, P/E, dividend yield, 52-week range | $0.005 |
| `stock_quote_batch` | Batch quotes for up to 10 stocks in one call | $0.01 |
| `options_chain` | Full options chain with strike, bid/ask, volume, OI, implied volatility, Greeks | $0.02 |
| `stock_history` | Historical OHLCV data - intraday to multi-year, configurable intervals | $0.01 |
| `company_info` | Company profile, sector, revenue, margins, EPS, employees, market cap | $0.005 |
| `stock_compare` | Side-by-side comparison of 2-5 stocks across all key metrics | $0.02 |

### Cryptocurrency (4 tools) - Live coin prices, market data, and trends

| Tool | Description | Price |
|------|-------------|-------|
| `crypto_price` | Real-time price for any cryptocurrency by symbol | $0.005 |
| `crypto_compare` | Side-by-side comparison of 2-5 cryptocurrencies | $0.01 |
| `crypto_trending` | Top trending coins right now by interest and momentum | $0.005 |
| `crypto_info` | Detailed coin profile, market cap, supply, and price metrics | $0.005 |

### Transportation (5 tools) - FMCSA federal carrier safety data

| Tool | Description | Price |
|------|-------------|-------|
| `fmcsa_carrier_lookup` | Full carrier profile by DOT or MC number | $0.02 |
| `fmcsa_carrier_search` | Search carriers by company name | $0.03 |
| `fmcsa_safety_scores` | BASIC safety percentiles across 6 categories | $0.02 |
| `fmcsa_carrier_authority` | Operating authority status and insurance details | $0.02 |
| `fmcsa_carrier_compare` | Compare 2-5 carriers side by side on safety and fleet data | $0.05 |

### Property (4 tools) - County appraisal and tax records

| Tool | Description | Price |
|------|-------------|-------|
| `property_lookup` | Look up property by address or account number - ownership, values, legal description | $0.02 |
| `property_search_owner` | Search properties by owner name | $0.02 |
| `property_search_area` | Search by zip code, subdivision, or street name | $0.03 |
| `property_value_history` | Year-by-year assessed value history for trend analysis | $0.02 |

### Weather & Air Quality (3 tools) - Global coverage via Open-Meteo

| Tool | Description | Price |
|------|-------------|-------|
| `weather_current` | Current temperature, wind, humidity, conditions for any location worldwide | $0.005 |
| `weather_forecast` | Up to 16-day forecast with daily highs/lows, precipitation, wind | $0.01 |
| `air_quality` | Air quality index, PM2.5, PM10, ozone, and pollutant breakdown | $0.005 |

### Vehicle (2 tools) - NHTSA vehicle identification and safety

| Tool | Description | Price |
|------|-------------|-------|
| `vin_decode` | Decode any 17-character VIN - year, make, model, engine, transmission, body style | $0.01 |
| `vehicle_recalls` | Safety recalls by year/make/model with descriptions and remedy status | $0.01 |

### Package Tracking (1 tool) - Universal carrier detection

| Tool | Description | Price |
|------|-------------|-------|
| `package_track` | Track any package - auto-detects UPS, FedEx, USPS, DHL, and more from tracking number | $0.01 |

### Local Business (1 tool) - Location-based discovery

| Tool | Description | Price |
|------|-------------|-------|
| `local_search` | Find restaurants, businesses, and services near any location with ratings and hours | $0.01 |

### Sanctions (7 tools) - OFAC, EU, UN, BIS denied-party screening

| Tool | Description | Price |
|------|-------------|-------|
| `sanctions_screen_entity` | Screen a single name or entity against OFAC SDN, EU CFSP, UN SC, and BIS DPL | $0.05 |
| `sanctions_screen_batch` | Screen up to 50 names in one call | $0.05 |
| `sanctions_get_changes` | Entities added or updated since a given ISO date for a chosen list | $0.05 |
| `sanctions_screen_address` | Match a physical address against listed addresses | $0.05 |
| `sanctions_get_entity` | Fetch a full record by entity ID and source | $0.05 |
| `sanctions_search_alias` | Search aliases and AKAs across selected lists | $0.05 |
| `sanctions_status_summary` | Counts and last-update timestamps for all four lists | Free |

### Disasters (7 tools) - FEMA, USGS, NWS, NOAA NHC

| Tool | Description | Price |
|------|-------------|-------|
| `disaster_declarations` | Recent FEMA disaster declarations by state, county, type, or date range | $0.01 |
| `nfip_flood_claims` | NFIP claim history aggregated by zip, county, or state | $0.01 |
| `earthquake_recent` | Recent USGS earthquakes filtered by region or magnitude | $0.01 |
| `nws_active_alerts` | Active NWS alerts for a point, state, or NWS zone | $0.01 |
| `flood_zone_lookup` | FEMA flood zone designation, BFE, FIRM panel, NFIP requirement | $0.01 |
| `hurricane_tracker` | Active NOAA NHC hurricanes and tropical systems | $0.01 |
| `disaster_history_summary` | Multi-year FEMA disaster summary for a location | $0.01 |

### Courts (7 tools) - Federal and state courts via CourtListener

| Tool | Description | Price |
|------|-------------|-------|
| `court_case_search` | Search court opinions by keyword, court, judge, party, or date range | $0.01 |
| `court_docket_lookup` | Federal docket lookup by court ID and docket number | $0.01 |
| `court_opinion_search` | Full-text search of court opinions | $0.01 |
| `court_judge_lookup` | Judge profile by name or CourtListener person ID | $0.01 |
| `court_citation_resolver` | Resolve a legal citation to its case record | $0.01 |
| `court_oral_argument_search` | Search SCOTUS and federal appellate oral argument audio | $0.01 |
| `court_recent_filings` | Recent docket entries for a specific court, newest first | $0.01 |

### Cyber (7 tools) - NVD, MITRE CWE, FIRST EPSS, CISA KEV

| Tool | Description | Price |
|------|-------------|-------|
| `cve_lookup` | Full detail for a single CVE by ID with CVSS, weakness, references | $0.01 |
| `cve_search_by_vendor` | CVEs by vendor with optional product and date range | $0.01 |
| `cve_search_by_keyword` | Free-text CVE search | $0.01 |
| `cwe_lookup` | MITRE CWE detail by ID with parent and child relationships | $0.01 |
| `epss_score` | FIRST EPSS exploit probability and percentile for a CVE | $0.01 |
| `kev_status_check` | Check whether a CVE is in the CISA Known Exploited Vulnerabilities catalog | $0.01 |
| `cve_recent` | Recent CVEs published in the last N days, with vendor and severity filters | $0.01 |

### Education (7 tools) - College Scorecard, IPEDS, DAPIP

| Tool | Description | Price |
|------|-------------|-------|
| `college_search` | Find US colleges by name, state, control, size, or accreditor | $0.01 |
| `college_metrics` | Cost, graduation, retention, earnings, admission rate for one school | $0.01 |
| `college_demographics` | Race, gender, age, and geographic origin shares for one school | $0.01 |
| `college_accreditation` | Current institutional accreditation status and accreditor | $0.01 |
| `college_compare` | Side-by-side comparison of 2-5 schools | $0.01 |
| `college_outcomes_by_program` | Program-level CIP earnings and debt for one school | $0.01 |
| `college_trends` | Multi-year IPEDS trend for one school across enrollment, graduation, retention, or cost | $0.01 |

### Discovery (1 tool) - Data catalog and availability

| Tool | Description | Price |
|------|-------------|-------|
| `search_available_datasets` | Explore the full 25-domain data menu and find the right tool for any query | Free |

## Quick Start

### Option 1: Remote MCP (Hosted - No Install)

Point any MCP client at the hosted endpoint:

```
URL: https://livedatalink.ai/mcp
Transport: Streamable HTTP
```

For Claude Desktop, add to your config:
```json
{
  "mcpServers": {
    "livedatalink": {
      "url": "https://livedatalink.ai/mcp"
    }
  }
}
```

### Option 2: Local (stdio - Free, No Limits)

Run the server locally for unlimited free usage:

1. Build the server:
```bash
git clone https://github.com/blackboxfoundry/livedatalink.git
cd livedatalink
npm install && npm run build
```

2. Get a free FMCSA API key at https://mobile.fmcsa.dot.gov/QCDevsite/ (only needed for trucking tools)

3. Add to Claude Desktop config (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "livedatalink": {
      "command": "node",
      "args": ["/path/to/livedatalink/dist/index.js"],
      "env": {
        "FMCSA_API_KEY": "your-fmcsa-key"
      }
    }
  }
}
```

4. Restart Claude Desktop and start asking questions.

## Python Client

Direct access to all 62 tools from Python scripts, Jupyter notebooks, or automation pipelines.

```python
from livedatalink import LiveDataLink

with LiveDataLink() as ldl:
    # Finance
    print(ldl.stock_quote("AAPL"))
    print(ldl.stock_compare("AAPL,MSFT,GOOGL"))

    # Crypto
    print(ldl.crypto_price("BTC"))
    print(ldl.crypto_compare("BTC,ETH,SOL"))
    print(ldl.crypto_trending())

    # Trucking
    print(ldl.carrier_lookup(dot_number=2233966))
    print(ldl.safety_scores(dot_number=2233966))

    # Property
    print(ldl.property_lookup("2415 LAKE WOODLANDS DR"))
    print(ldl.property_search_owner("SMITH"))

    # Weather
    print(ldl.weather_current("Houston, TX"))
    print(ldl.weather_forecast("New York", days=5))

    # Vehicle
    print(ldl.vin_decode("1HGBH41JXMN109186"))
    print(ldl.vehicle_recalls(year=2020, make="Toyota", model="Camry"))

    # Tracking
    print(ldl.package_track("1Z999AA10123456784"))

    # Local
    print(ldl.local_search("coffee", "Austin, TX"))

    # Discovery
    print(ldl.search_available_datasets("energy data"))
```

CLI usage:
```bash
python python/livedatalink.py stock_quote symbol=AAPL
python python/livedatalink.py weather_current location="Houston, TX"
python python/livedatalink.py vin_decode vin=1HGBH41JXMN109186
python python/livedatalink.py package_track tracking_number=1Z999AA10123456784
python python/livedatalink.py local_search query=restaurants location="Dallas, TX"
python python/livedatalink.py search_available_datasets query="cryptocurrency"
python python/livedatalink.py list_tools
```

## Example Output

```
> stock_quote symbol=AAPL

Symbol           AAPL
Name             Apple Inc.
Price            $214.29
Change           +$1.86 (+0.88%)
52-Week Range    $164.08 - $237.49
Volume           48.3M
Market Cap       $3.26T
P/E Ratio        33.21
Dividend Yield   0.47%
```

```
> fmcsa_carrier_lookup dot_number=2233966

FMCSA CARRIER DETAIL
================================================================
Legal Name:                SCHNEIDER NATIONAL CARRIERS INC
DOT Number:                2233966
MC Number:                 133655
Status:                    ACTIVE
Power Units:               10543
Drivers:                   12847
Safety Rating:             Satisfactory
```

```
> weather_current location="Houston, TX"

CURRENT WEATHER - Houston, TX
================================
Temperature:     87°F (31°C)
Feels Like:      94°F (34°C)
Conditions:      Partly Cloudy
Humidity:        62%
Wind:            8 mph SSE
```

## The Data Menu

LiveDataLink covers 25 data domains. 9 are live today, and new domains ship based on demand. Use the `search_available_datasets` tool to explore the full menu, or ask about any of these:

**Live now:** Finance, Cryptocurrency, Transportation/FMCSA, Property, Weather, Vehicle/NHTSA, Package Tracking, Local Business, Dataset Discovery

**Shipping next:** SEC Filings, FRED Economic Data, Energy/EIA, USPTO Patents, Census, Texas Oil & Gas (RRC), State Business Entity Search

**On the roadmap:** Court Records, Aviation, Maritime, Healthcare, Forex, Education, Environmental, Immigration, Elections, Sports, Food Safety, Nonprofits, Government Permits, Public Safety

Every query for an unavailable domain is logged and directly shapes the build priority. Ask for what you need.

## Pricing

| Plan | Monthly | Included Queries | Overage | Rate Limit |
|------|---------|-----------------|---------|------------|
| Free | $0 | 100 | Hard cap | 5/min |
| Starter | $10 | 5,000 | $0.01/query | 30/min |
| Pro | $49 | 50,000 | $0.01/query | 120/min |

Local stdio usage is always free with no rate limits.

Most tools cost $0.005-$0.03 per query. At 50 queries/day, you pay roughly $0.50-1.00/day instead of $29-500/month for traditional data subscriptions.

## Architecture

- **Local**: Node.js MCP server over stdio (JSON-RPC)
- **Remote**: Cloudflare Worker with Streamable HTTP transport at `https://livedatalink.ai/mcp`
- **Billing**: D1 database for API keys and usage tracking, KV for rate limiting
- **Caching**: In-memory (local), KV (hosted) for FMCSA and weather responses
- **Data providers**: Yahoo Finance, FMCSA.gov, county appraisal districts, Open-Meteo, NHTSA, and more

## License

MIT License - Copyright (c) Blackbox Foundry LLC. See [LICENSE](LICENSE) for the full text.

The code in this repository (documentation, configuration examples, and install instructions) is unrestricted under MIT. The hosted Worker source code that powers livedatalink.ai is not included in this repository and remains proprietary to Blackbox Foundry LLC; use of the hosted service is governed by the pricing terms above. See [NOTICE](NOTICE) for details.

## About

The hosted service at livedatalink.ai is operated by Blackbox Foundry LLC, a Texas company. Source in this repository is MIT-licensed.

For service questions: support@livedatalink.ai
