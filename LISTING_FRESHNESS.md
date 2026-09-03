# LiveDataLink listing-freshness ledger

This is the operating record for public listings and search results that describe LiveDataLink. It prevents directory metadata from becoming a forgotten second product description.

## Canonical facts

Verify these from the hosted service before changing a listing:

- Catalog: **291 tools / 59 domains**.
- Endpoint / transport: `https://livedatalink.ai/mcp` / Streamable HTTP.
- Auth: bearer API key; anonymous evaluation is limited to **25 lifetime data calls per network at 10 rpm**. Catalog discovery and free-key issuance are not metered.
- Free API key: **1,000 queries/month, 5 rpm, no card**.
- Paid: Starter **$10 / 5,000 / 30 rpm**; Pro **$49 / 50,000 / 120 rpm**.
- Billing: all plans include all tools; **no automatic overage charges**.
- Freshness wording: "live and regularly refreshed public data". Do not call every domain real-time; link to `/status`.
- Claude wording: compatible with MCP clients that accept bearer headers. Do not claim native Claude remote-connector support until OAuth is shipped.

Machine-readable sources: [`/health`](https://livedatalink.ai/health), [server card](https://livedatalink.ai/.well-known/mcp/server-card.json), and [`tools/list`](https://livedatalink.ai/mcp).

## Discovered inventory — 2026-08-16

### Audit update — 2026-08-17

- Confirmed the claimed MCP.so publisher editor still contains obsolete copy (182 tools / 36 domains, 100 free queries, automatic overages) despite its correctly configured hosted endpoint. The current submission is ready for a corrected save and a subsequent manual re-index request for the missing tool extraction.
- The public wrapper README now leads with source-varying freshness language and an explicit `## Tools` section for directory extractors. Recheck every dependent directory after the repository release rather than assuming its crawler refreshes automatically.
- Direct fetches of `https://livedatalink.ai/tools` and `https://livedatalink.ai/llms.txt` now return the current 291-tool / 59-domain copy, 25-call anonymous evaluation, 1,000-query free key, and fixed-allowance pricing. Search-engine snippets can still show older copy; treat those as cache lag and recheck after the next crawl.

| Listing family | Evidence of stale state | Control and remediation | State | Review cadence |
| --- | --- | --- | --- | --- |
| Public GitHub wrapper (`blackboxfoundry/livedatalink`) | Repository description said 283; README and `llms.txt` retained old overage and anonymous wording. | Update manifests, README, wrapper `llms.txt`, installer text; CI validates its static contract. | Corrected and released 2026-08-16 | Every release + weekly |
| Official MCP Registry | Consumes `server.json` published by the wrapper workflow. | Bump and publish `server.json` only when its contents change; verify registry card after workflow succeeds. | Published 1.6.3 on 2026-08-17: 284/59, freshness varies, current free-key terms | Every release |
| Claude Marketplaces | Listing displays 62 tools, 177/182 in body, 100 free queries, per-query pricing. | Refresh upstream wrapper metadata, then use marketplace's owner/update path and verify the primary URL. | Correction request submitted through the authenticated feedback form on 2026-08-17 with canonical URLs and current pricing; pending re-index | Weekly until corrected, then monthly |
| mcp.so (primary and translations) | Public detail page still shows 62/14, 100 free queries, $0.01 overage, stdio, and no tools, even after the editor accepted the correction. | Saved the claimed publisher submission with 284/59, current plans, website/docs, and a rewritten overview on 2026-08-17. Replied to support ticket “Claimed LiveDataLink listing cannot save corrections” requesting manual re-index/tool extraction. | Saved in owner editor; public cache/manual re-index pending. | Verify after support response and cache refresh; then monthly |
| mcpservers.org (primary and locale mirrors) | Current directory snapshot still says 284/290 tools and says paid keys are emailed. | The refresh request is visibly queued as “Requested.” Keep first-party manifests, examples, and documentation synchronized; verify the English primary page after its next re-index. | Rechecked 2026-09-02; directory cache/manual re-index pending. | Weekly until corrected, then quarterly |
| Protodex | Public page at `protodex.io/servers/blackboxfoundry-livedatalink.html` still says 284 tools and presents an obsolete local `npx -y blackboxfoundry/livedatalink` install. | Treat the hosted endpoint and 291-tool wrapper README as canonical. Find Protodex's supported correction or recrawl flow; never create a second listing. | Stale cache observed 2026-09-02. | Weekly until corrected, then quarterly |
| ZBS Index | Public page at `index.zbs.gg/en/mcp/io-github-blackboxfoundry-livedatalink/` reports 284 tools. | Request a supported recrawl/correction with the hosted endpoint, `server.json`, and `/health`; do not submit a duplicate record. | Stale cache observed 2026-09-02. | Weekly until corrected, then quarterly |
| NoHumanSearch | Public page at `nothumansearch.ai/site/livedatalink.ai` reports 284 tools. | Request a supported recrawl/correction with the hosted endpoint and machine-readable server card; do not create a duplicate page. | Stale cache observed 2026-09-02. | Weekly until corrected, then quarterly |
| Smithery | Public page still describes 182/36 and “real-time” data despite the first-party source now being 284/59 with source-varying freshness. | `smithery.yaml` is first-party; request a Smithery/Arcade re-index after the wrapper release and verify the page. | Stale public cache observed 2026-08-17; re-index/claim action still required | Weekly until corrected, then monthly |
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

## Wrapper-artifact repair — 2026-09-02

- The public wrapper's primary README and machine-readable summary were current, but its generic `mcp.json`, Claude/Cursor examples, installer CLI, and Docker bridge still contained retired `?profile=starter` setup or omitted the required Streamable HTTP `Accept` header.
- Those files now use the base endpoint, state `type: "http"` for generic remote configs, and include `Accept: application/json, text/event-stream`. The Docker metadata now reports 291 tools. This repair is the first-party input for pending directory refreshes; it does not claim that an external directory cache has already changed.

## Escalation rule

If a directory still shows obsolete pricing, auth, endpoint, or catalog counts seven days after a first-party update, file an owner support/update request with the canonical server-card URL and the exact stale text. Preserve the request date and response in this ledger.
