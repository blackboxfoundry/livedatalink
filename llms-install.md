# Installing LiveDataLink (for AI install agents)

This file is written for AI agents (e.g. the Cline marketplace install agent) that read instructions and configure the MCP server on behalf of a human user.

## Prerequisites

The user needs an API Key. If they don't have one yet, direct them to:

- **Free tier (no credit card):** https://livedatalink.ai/signup/free
- **Paid tiers:** https://livedatalink.ai/#pricing

The API Key arrives by email within seconds of signup.

## Configuration

LiveDataLink is a remote MCP server using Streamable HTTP transport. Add this configuration block to the user's MCP client config:

```json
{
  "mcpServers": {
    "livedatalink": {
      "url": "https://livedatalink.ai/mcp",
      "headers": {
        "Authorization": "Bearer USER_API_KEY_HERE"
      }
    }
  }
}
```

Replace `USER_API_KEY_HERE` with the actual API Key the user obtained above. Do not commit this key to source control.

## Verification

After configuration, verify the connection by calling `tools/list`. Expected response is a JSON-RPC object containing 62 tools across 14 domains. If the response is `401 INVALID_API_KEY`, the API Key is wrong or deactivated. If the response is `429 RATE_LIMIT`, the user has exceeded their tier's per-minute limit (5 for free, 30 for Starter, 120 for Pro).

## Recommended first call

After installation, call `search_available_datasets` with a free-text query describing what the user is trying to do. This tool is free (no credits consumed), returns the list of matching live tools, and logs the user's query to drive the demand-driven roadmap. Example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "search_available_datasets",
    "arguments": { "query": "what the user is trying to do, in their own words" }
  }
}
```

## Notes for the install agent

- This is a remote (hosted) MCP server. The user does not need to install anything locally beyond the config block above.
- The free tier (100 queries/month) is fully functional — no feature is gated to paid tiers; only volume and rate limit differ.
- The discovery tool (`search_available_datasets`) is free and uses a separate rate-limit pool. Call it freely.
- Operator: Blackbox Foundry LLC. Support contact: support@livedatalink.ai.
- This server is paid (with a free tier). If the user is uncomfortable with paid services, the free tier still gives them full functional access at low volume.
