# LiveDataLink Public Data

LiveDataLink Public Data is a read-only Codex plugin for company and counterparty research using authoritative public records.

The focused MCP endpoint exposes 36 tools covering:

- entity resolution and company dossiers
- sanctions screening
- FMCSA carrier authority and safety records
- federal spending and awards
- healthcare provider and exclusion records
- Washington contractor licensing
- federal regulations and CFR material
- federal court records and opinions

## Install from GitHub

Add the LiveDataLink marketplace and install the plugin:

```powershell
codex plugin marketplace add blackboxfoundry/livedatalink --ref main
codex plugin add livedatalink-public-data@livedatalink
```

Start a new Codex task after installation so the MCP tools are loaded.

The endpoint supports a limited anonymous evaluation. For continued use, create a free key at [livedatalink.ai/signup/free](https://livedatalink.ai/signup/free).

## Links

- MCP endpoint: `https://livedatalink.ai/mcp/openai`
- Website: [livedatalink.ai](https://livedatalink.ai)
- Privacy: [livedatalink.ai/privacy](https://livedatalink.ai/privacy)
- Terms: [livedatalink.ai/terms](https://livedatalink.ai/terms)
- Support: [support@livedatalink.ai](mailto:support@livedatalink.ai)

