# Verify your LiveDataLink API Key works (Windows PowerShell version).
# Usage: $env:API_KEY = "your_key"; .\test-with-powershell.ps1

if (-not $env:API_KEY) {
    Write-Host "Set API_KEY env var first. Example:" -ForegroundColor Yellow
    Write-Host '  $env:API_KEY = "your_key_here"; .\test-with-powershell.ps1'
    exit 1
}

$Endpoint = "https://livedatalink.ai/mcp"
$Headers = @{
    Accept = "application/json, text/event-stream"
    Authorization = "Bearer $env:API_KEY"
}

Write-Host "===> Listing all available tools (count check):" -ForegroundColor Cyan
$body = '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
$resp = Invoke-RestMethod -Uri $Endpoint -Method Post -Headers $Headers -ContentType 'application/json' -Body $body
Write-Host "Tools available: $($resp.result.tools.Count)"

Write-Host ""
Write-Host "===> Testing the free discovery tool (no credits used):" -ForegroundColor Cyan
$body = '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search_available_datasets","arguments":{"query":"weather forecast for Houston"}}}'
$resp = Invoke-RestMethod -Uri $Endpoint -Method Post -Headers $Headers -ContentType 'application/json' -Body $body
Write-Host ($resp.result.content[0].text.Substring(0, [Math]::Min(300, $resp.result.content[0].text.Length)))

Write-Host ""
Write-Host "===> Testing weather_current:" -ForegroundColor Cyan
$body = '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"weather_current","arguments":{"location":"Houston, TX"}}}'
$resp = Invoke-RestMethod -Uri $Endpoint -Method Post -Headers $Headers -ContentType 'application/json' -Body $body
Write-Host ($resp.result.content[0].text.Substring(0, [Math]::Min(300, $resp.result.content[0].text.Length)))

Write-Host ""
Write-Host "===> Done. If you saw real data above, your API Key works." -ForegroundColor Green
