# LiveDataLink listing-freshness ledger

This is the operating record for public listings and search results that describe LiveDataLink. It prevents directory metadata from becoming a forgotten second product description.

## Canonical facts

Verify these from the hosted service before changing a listing:

- Catalog: **284 tools / 59 domains**.
- Endpoint / transport: `https://livedatalink.ai/mcp` / Streamable HTTP.
- Auth: bearer API key; anonymous evaluation is limited to **25 lifetime data calls per network at 10 rpm**. Catalog discovery and free-key issuance are not metered.
- Free API key: **1,000 queries/month, 5 rpm, no card**.
- Paid: Starter **$10 / 5,000 / 30 rpm**; Pro **$49 / 50,000 / 120 rpm**.
- Billing: all plans include all tools; **no automatic overage charges**.
- Freshness wording: "live and regularly refreshed public data". Do not call every domain real-time; link to `/status`.
- Claude wording: compatible with MCP clients that accept bearer headers. Do not claim native Claude remote-connector support until OAuth is shipped.

Machine-readable sources: [`/health`](https://livedatalink.ai/health), [server card](https://livedatalink.ai/.well-known/mcp/server-card.json), and [`tools/list`](https://livedatalink.ai/mcp).

## Discovered inventory — 2026-08-16

| Listing family | Evidence of stale state | Control and remediation | State | Review cadence |
| --- | --- | --- | --- | --- |
| Public GitHub wrapper (`blackboxfoundry/livedatalink`) | Repository description said 283; README and `llms.txt` retained old overage and anonymous wording. | Update manifests, README, wrapper `llms.txt`, installer text; CI validates its static contract. | Corrected and released 2026-08-16 | Every release + weekly |
| Official MCP Registry | Consumes `server.json` published by the wrapper workflow. | Bump and publish `server.json` only when its contents change; verify registry card after workflow succeeds. | Published v1.6.2 on 2026-08-16 | Every release |
| Claude Marketplaces | Listing displays 62 tools, 177/182 in body, 100 free queries, per-query pricing. | Refresh upstream wrapper metadata, then use marketplace's owner/update path and verify the primary URL. | Needs owner update | Weekly until corrected, then monthly |
| mcp.so (primary and translations) | Shows 62/14, 100 free queries, $0.01 overage, stdio, and no tools. | Update/re-submit the publisher-controlled source; request re-crawl after wrapper update. One primary correction should feed locale mirrors. | Needs owner update | Weekly until corrected, then monthly |
| mcpservers.org (primary and locale mirrors) | Shows 62/14, 182 in README, 100 free queries, old Stripe links/overages. | Use the primary listing's “request update”/claim path after wrapper update; verify one locale and the primary. | Needs owner update | Weekly until corrected, then quarterly |
| Smithery | Search result describes 182/36 and 100 free queries. | `smithery.yaml` is first-party; push its updated wrapper release, then re-index/claim page if it does not refresh. | Awaiting wrapper publication | Weekly until corrected, then monthly |
| Glama connector | Correct 284/59 and Streamable HTTP in current review. | Keep `glama.json` synchronized; recheck after any catalog/auth change. | Healthy | Monthly |
| Glama server page | Count is current but older description may overclaim Claude support. | Update `glama.json`/README and request its next index pass. | Awaiting wrapper publication | Monthly |
| AI Learned / directory reposts | Repost reports 182/36. | Treat as downstream of wrapper/registry; record its canonical URL and request correction only if it persists after primary sources refresh. | Watch | Monthly |
| Search-engine snippets | Can preserve older text after the source is fixed. | Submit IndexNow/sitemap on first-party release; do not alter product facts merely to chase cached snippets. | Watch | Weekly for 30 days |

This is an observed inventory, not a claim that every copy on the public web has been enumerated. New results are added with URL, captured claim, discovery date, owner, and a verification date.

## Release checklist

1. Change product facts once in the hosted source and deploy.
2. Confirm `/health`, server card, `server.json`, and `/llms.txt` agree.
3. Run `node scripts/update-tool-count.mjs --check` in this wrapper.
4. Update the wrapper and let the official-registry workflow publish any changed `server.json` version.
5. Submit the sitemap/IndexNow and use each claimed directory's refresh path.
6. Add the external URL and outcome to this ledger; never mark it current based only on the source repository.

## Escalation rule

If a directory still shows obsolete pricing, auth, endpoint, or catalog counts seven days after a first-party update, file an owner support/update request with the canonical server-card URL and the exact stale text. Preserve the request date and response in this ledger.
