$body = @{
    name     = "Test User"
    email    = "testuser@example.com"
    password = "password123"
    role     = "MEMBER"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5001/api/auth/register" -Method Post -Body $body -ContentType "application/json"

Write-Host "Registration successful!" -ForegroundColor Green
Write-Host "Response:" -ForegroundColor Cyan
$response | ConvertTo-Json -Depth 10
