# Measured record coverage

Checked September 8, 2026 (America/New_York). Counts describe indexed source records, not independently verified facts or unique people across sources.

## Headline we can substantiate

**Over 2 million indexed public records. One MCP endpoint.**

The conservative basis is **2,287,335 indexed nonprofit and court-case metadata records**: 1,957,340 nonprofit organization records plus 329,995 case records. These are separate record types in separate production stores. They are not a claim of 2 million organizations, full-text documents, current legal statuses, or independently verified facts.

## Production measurements

| Source/store | Count | What was counted | Last recorded refresh |
| --- | ---: | --- | --- |
| IRS Exempt Organizations Business Master File | 1,957,340 | Organization rows, keyed by EIN | August 16, 2026 |
| Caselaw Access Project / U.S. Reports index | 329,995 | Case metadata rows | August 27, 2026 |
| FMCSA local subset | 10,000 | Indexed carrier rows; this is a subset of the upstream catalog | August 25, 2026 |
| Sanctions/denied-party sources | 33,168 | Source-specific entity rows; the same entity can appear on multiple lists | August 26, 2026 |
| USAspending local subset | 1,500 | 1,000 contract and 500 grant records | August 23, 2026 |
| Zillow Research | 183,720 | Monthly observations across 958 regions; latest month July 2026 | August 23, 2026 |
| Books local full-text subset | 12 books / 11,025 passages | Documents and passages, counted separately | August 23, 2026 |
| Scholarly local full-text subset | 50 papers / 117 passages | Documents and passages, counted separately | August 23, 2026 |

The first five measurements used read-only production database counts. The other three used the public MCP status tools. We exclude search tokens, aliases, duplicate regional metadata totals, observations, passages, upstream catalog estimates, and dynamically fetched records from the headline total. Most of the 60 domains query upstream sources and cannot be assigned a stable, non-overlapping record total from tool counts.

The nonprofit headline count comes from `COUNT(*)` on the EIN-keyed organization table. Regional ingest counters sum to a slightly different number, so they are not used as the unique organization count. The case count is a count of indexed metadata records; it does not imply that every row is a distinct substantive opinion.

## Query checks

Fresh anonymous MCP calls successfully returned the American National Red Cross organization record (EIN 53-0196605) and the indexed record for *Brown v. Board of Education*, 347 U.S. 483, including a primary full-text source URL. These smoke checks establish that the indexed sources are reachable through the MCP endpoint; they do not verify every record.

## Upstream sizes are a different metric

The OpenAlex API reported 327,599,176 works during this audit. That is the upstream catalog size, not LiveDataLink's local full-text index. A sampled scholarly search appears to use a fallback and needs a source-label review before advertising that full number as tested coverage.

Maryland's public parcel dataset reported 2,441,527 rows. A sampled LiveDataLink Maryland parcel request returned an upstream HTTP 403, so it is excluded from usable-coverage claims. Upstream counts can change independently of this service.

Use the [source catalog](https://livedatalink.ai/data) and [trust information](https://livedatalink.ai/trust) to review coverage and freshness before relying on a result. Refresh this dated evidence before increasing or materially changing the headline. Do not substitute “verified records” for “indexed source records.”
