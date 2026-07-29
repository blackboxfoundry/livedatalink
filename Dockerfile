# LiveDataLink is a HOSTED MCP server. There is no server process to build from
# this repository - the Worker source is proprietary and runs on Cloudflare at
# https://livedatalink.ai/mcp.
#
# This image is the supported *client* install path: a stdio transport that
# bridges to the hosted endpoint via mcp-remote. It is what a directory or a
# sandboxed client should run to introspect the real tool surface, and it is the
# same thing a user gets from `npx mcp-remote https://livedatalink.ai/mcp`.
#
# It defaults to ?profile=starter (19 tools) rather than the full catalog (283
# tools, ~346 KB on tools/list) because that is the connection we actually
# recommend: most clients degrade at tool selection past ~50 tools and Cursor
# silently drops everything past 40. Override LIVEDATALINK_ENDPOINT to load
# more, e.g. "https://livedatalink.ai/mcp?groups=finance,courts" or the bare
# endpoint for everything.
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
      org.opencontainers.image.description="Hosted MCP server: 283 tools across 59 US public-data domains behind one bearer key." \
      org.opencontainers.image.url="https://livedatalink.ai" \
      org.opencontainers.image.source="https://github.com/blackboxfoundry/livedatalink" \
      org.opencontainers.image.licenses="MIT"

# Pin the bridge so the image is reproducible and the build does not reach out
# to resolve a floating tag at container start.
RUN npm install -g mcp-remote@0.1.38 \
  && addgroup -S mcp && adduser -S mcp -G mcp

USER mcp
WORKDIR /home/mcp

ENV LIVEDATALINK_ENDPOINT="https://livedatalink.ai/mcp?profile=starter"

# Pass the key through as an Authorization header only when one is supplied, so
# the container still starts (and stays introspectable) without credentials.
ENTRYPOINT ["/bin/sh", "-c", "\
if [ -n \"$LIVEDATALINK_API_KEY\" ]; then \
  exec mcp-remote \"$LIVEDATALINK_ENDPOINT\" --transport http-only --header \"Authorization: Bearer $LIVEDATALINK_API_KEY\"; \
else \
  exec mcp-remote \"$LIVEDATALINK_ENDPOINT\" --transport http-only; \
fi"]
