# LiveDataLink Examples

Drop-in configurations and quick test scripts for the most common MCP clients.

## MCP client configs

- **`claude-desktop-config.json`** — Add to `claude_desktop_config.json` (Settings → Developer → Edit Config in Claude Desktop)
- **`cursor-config.json`** — Add to your Cursor MCP config

For Continue, Cline, and Zed, the same JSON shape works under their respective `mcpServers` config keys. The URL and Authorization header are the same regardless of client.

## Test scripts

- **`test-with-curl.sh`** — Bash + curl, for Mac/Linux/WSL
- **`test-with-powershell.ps1`** — PowerShell, for Windows

Both scripts call three things:
1. `tools/list` — enumerates the 243 tools (proves the API Key is valid)
2. `search_available_datasets` (free, no credits) — proves the discovery tool works
3. `weather_current` — proves a real data tool returns live data

## API Key

Replace `YOUR_API_KEY` in the configs with a real key. Get a free one at https://livedatalink.ai/signup/free.
