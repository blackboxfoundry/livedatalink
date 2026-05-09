# Security Policy

## Reporting a vulnerability

If you discover a security vulnerability in LiveDataLink, please email **security@livedatalink.ai** (or **support@livedatalink.ai** if security@ doesn't yet route — both reach the operator). Do **not** file a public GitHub issue for security reports.

We aim to acknowledge security reports within 24 hours and to triage / fix critical issues within 7 days.

## What constitutes a vulnerability

- Auth bypass (using one customer's data with another's API Key, accessing data without a key)
- Information disclosure (returning data the caller shouldn't have access to)
- Injection (SQL, JSON-RPC, header injection, etc.)
- Rate-limit bypass (circumventing per-tier query limits)
- Webhook signature forgery
- Any way to escalate privileges or access admin endpoints without the admin token
- Credential or PII exposure in responses, logs, or error messages

## What's NOT a vulnerability (for the avoidance of doubt)

- Discovery of which data sources we use (those are listed publicly at https://livedatalink.ai/tools)
- Rate limits being too strict or too lenient (file a feature request)
- The discovery tool logging your queries (this is documented behavior — see the FAQ at https://livedatalink.ai/#faq)
- The fact that the Worker source is closed (we run a paid SaaS; the wrapper repo here is MIT)

## Scope

In scope:
- The hosted endpoint at https://livedatalink.ai/* (including /mcp, /signup/free, /share, /tools, /pricing, /webhooks/stripe)
- The wrapper repo at https://github.com/blackboxfoundry/livedatalink (this repo)
- The published MCP Registry entry `io.github.blackboxfoundry/livedatalink`

Out of scope:
- Third-party data sources we proxy (FEMA, FMCSA, CourtListener, NIST NVD, etc. — report directly to the source if you find issues there)
- Cloudflare Workers infrastructure (report to Cloudflare)
- Stripe billing (report to Stripe)

## Disclosure

We follow coordinated disclosure. After a fix is deployed and customers have had reasonable time to update (none required for hosted; up to 90 days for wrapper-repo issues), we'll publicly acknowledge the report and credit the reporter (if desired).

## No bug bounty (yet)

We don't currently offer monetary rewards. We do offer credit, a public acknowledgment, and our genuine thanks. As the LLC scales, this may change.

## Operator

Blackbox Foundry LLC, Texas single-member LLC.
