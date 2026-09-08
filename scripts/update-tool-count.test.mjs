import test from 'node:test';
import assert from 'node:assert/strict';
import { applyCounts } from './update-tool-count.mjs';

test('refreshes the real phrasing that previously escaped directory synchronization', () => {
  const before = '291 public-data tools; 291 MCP tools; 294 tools across 59 public-data domains; 291 production tools across 59 live data domains';
  const after = '294 public-data tools; 294 MCP tools; 294 tools across 60 public-data domains; 294 production tools across 60 live data domains';
  assert.equal(applyCounts(before, {tools:294,domains:60}), after);
});

test('leaves prices, versions, source record counts and allowances unchanged', () => {
  const copy = '1.6.7; $49; 1,000 queries/month; 2,441,527 records; 50,000 queries';
  assert.equal(applyCounts(copy, {tools:294,domains:60}), copy);
});
