# LiveDataLink is a HOSTED MCP server. There is no server process to build from
# this repository - the Worker source is proprietary and runs on Cloudflare at
# https://livedatalink.ai/mcp.
#
# This image is the supported *client* install path: a stdio transport that
# bridges to the hosted endpoint via mcp-remote. It is what a directory or a
# sandboxed client should run to introspect the real tool surface, and it is the
# same thing a user gets from `npx mcp-remote https://livedatalink.ai/mcp`.
#
# It connects to the base endpoint. Clients that need a smaller catalog can
# scope it with an explicit `?groups=` URL after checking the live catalog.
#
# Build:  docker build -t livedatalink .
# Run:    docker run -i --rm -e LIVEDATALINK_API_KEY=your_key livedatalink
#
# The API key is optional for discovery: tools/list works anonymously (10
# req/min per IP), so an unauthenticated build test can still enumerate tools.
# A key is required to actually call them. Get a free one (1,000 queries/month,
# no card) at https://livedatalink.ai/signup/free.

FROM node:22-alpine

LABEL org.opencontainers.image.title="LiveDataLink MCP" \
      org.opencontainers.image.description="Hosted MCP server: 291 public-data tools across 59 domains behind one bearer key." \
      org.opencontainers.image.url="https://livedatalink.ai" \
      org.opencontainers.image.source="https://github.com/blackboxfoundry/livedatalink" \
      org.opencontainers.image.licenses="MIT"

# Pin the bridge so the image is reproducible and the build does not reach out
# to resolve a floating tag at container start.
RUN npm install -g mcp-remote@0.1.38 \
  && addgroup -S mcp && adduser -S mcp -G mcp

USER mcp
WORKDIR /home/mcp

ENV LIVEDATALINK_ENDPOINT="https://livedatalink.ai/mcp"

# Pass the key through as an Authorization header only when one is supplied, so
# the container still starts (and stays introspectable) without credentials.
ENTRYPOINT ["/bin/sh", "-c", "\
if [ -n \"$LIVEDATALINK_API_KEY\" ]; then \
  exec mcp-remote \"$LIVEDATALINK_ENDPOINT\" --transport http-only --header \"Authorization: Bearer $LIVEDATALINK_API_KEY\" --header \"Accept: application/json, text/event-stream\"; \
else \
  exec mcp-remote \"$LIVEDATALINK_ENDPOINT\" --transport http-only --header \"Accept: application/json, text/event-stream\"; \
fi"]
