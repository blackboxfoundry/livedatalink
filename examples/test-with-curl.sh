#!/usr/bin/env bash
# Verify your LiveDataLink API Key works.
# Usage: API_KEY=your_key ./test-with-curl.sh

set -euo pipefail

if [[ -z "${API_KEY:-}" ]]; then
  echo "Set API_KEY env var first. Example:"
  echo "  API_KEY=your_key_here ./test-with-curl.sh"
  exit 1
fi

ENDPOINT="https://livedatalink.ai/mcp"

echo "===> Listing all available tools (count check):"
curl -s -X POST "$ENDPOINT" \
  -H "Accept: application/json, text/event-stream" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' \
  | python3 -c "import sys, json; d=json.load(sys.stdin); print(f'Tools available: {len(d[\"result\"][\"tools\"])}')"

echo ""
echo "===> Testing the free discovery tool (no credits used):"
curl -s -X POST "$ENDPOINT" \
  -H "Accept: application/json, text/event-stream" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search_available_datasets","arguments":{"query":"weather forecast for Houston"}}}' \
  | python3 -c "import sys, json; d=json.load(sys.stdin); print(d['result']['content'][0]['text'][:300] + '...')"

echo ""
echo "===> Testing weather_current:"
curl -s -X POST "$ENDPOINT" \
  -H "Accept: application/json, text/event-stream" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"weather_current","arguments":{"location":"Houston, TX"}}}' \
  | python3 -c "import sys, json; d=json.load(sys.stdin); print(d['result']['content'][0]['text'][:300])"

echo ""
echo "===> Done. If you saw real data above, your API Key works."
