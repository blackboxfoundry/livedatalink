# Connect LiveDataLink

LiveDataLink is hosted at `https://livedatalink.ai/mcp` using Streamable HTTP. No local server source is needed. Anonymous discovery and limited evaluation are supported. Get a free bearer key at https://livedatalink.ai/signup/free for 1,000 queries/month; the browser opens a private setup guide. Do not paste a real key into a committed configuration.

## Cursor and clients using mcpServers

```json
{
  "mcpServers": {
    "livedatalink": {
      "url": "https://livedatalink.ai/mcp?groups=finance,courts",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY",
        "Accept": "application/json, text/event-stream"
      }
    }
  }
}
```

## VS Code

In `.vscode/mcp.json`, VS Code uses `servers` as the top-level key:

```json
{
  "servers": {
    "livedatalink": {
      "type": "http",
      "url": "https://livedatalink.ai/mcp?groups=finance,courts",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY",
        "Accept": "application/json, text/event-stream"
      }
    }
  }
}
```

## Claude Code

```bash
claude mcp add --transport http livedatalink https://livedatalink.ai/mcp \
  --header "Authorization: Bearer YOUR_API_KEY" \
  --header "Accept: application/json, text/event-stream"
```

For Claude Desktop versions requiring a local stdio bridge, see the Docker / `mcp-remote` bridge in the README. Do not assume that every hosted connector UI accepts custom bearer headers or that LiveDataLink provides OAuth.

## ChatGPT developer-mode connections

Where your account and workspace permit developer-mode MCP connections, follow [OpenAI's current connection guide](https://developers.openai.com/plugins/deploy/connect-chatgpt) and enter `https://livedatalink.ai/mcp` as the public endpoint. LiveDataLink supports anonymous discovery and limited evaluation, and API-key access in clients that can send an Authorization header. OAuth is not advertised. A connection UI without custom bearer headers is limited to anonymous evaluation; use a compatible keyed client for ongoing use. This repository is not a claim of a published ChatGPT plugin or universal account availability.

## Scope and verify

Call `list_tool_groups` to see supported groups, then use `?groups=...` or the `X-Tool-Groups` header. The base endpoint exposes 294 tools across 60 domains. As checked September 8, 2026, finance and courts together expose 45 tools. The discovery tools remain available when scoped. Call `tools/list` after changing the URL and refresh the client's cached tools.

Reference documentation: [Claude Code](https://code.claude.com/docs/en/mcp), [VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers), [Cursor](https://cursor.com/docs/context/mcp).
