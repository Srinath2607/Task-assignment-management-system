# Task Management System - Quick Start Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Task Management System - Quick Start  " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB is running (optional warning)
Write-Host "Checking MongoDB connection..." -ForegroundColor Yellow
$mongoRunning = Get-Process mongod -ErrorAction SilentlyContinue
if (!$mongoRunning) {
    Write-Host "Note: Local MongoDB process not detected." -ForegroundColor Yellow
    Write-Host "Using MongoDB Atlas (cloud) from .env configuration" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Starting servers..." -ForegroundColor Green
Write-Host ""

# Start Backend in new window
Write-Host "[1/2] Starting Backend Server (Port 5001)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; Write-Host '=== BACKEND SERVER ===' -ForegroundColor Green; npm run dev"

# Wait for backend to initialize
Start-Sleep -Seconds 3

# Start Frontend in new window
Write-Host "[2/2] Starting Frontend Server (Port 5173)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; Write-Host '=== FRONTEND SERVER ===' -ForegroundColor Blue; npm run dev"

# Wait for frontend to start
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Servers Started Successfully! ✓" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Access your application:" -ForegroundColor Yellow
Write-Host "  Frontend:  http://localhost:5173" -ForegroundColor Cyan
Write-Host "  Backend:   http://localhost:5001" -ForegroundColor Cyan
Write-Host "  API Health: http://localhost:5001/api/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "Two PowerShell windows have been opened:" -ForegroundColor Yellow
Write-Host "  - Backend Server (Green header)" -ForegroundColor Green
Write-Host "  - Frontend Server (Blue header)" -ForegroundColor Blue
Write-Host ""
Write-Host "To stop the servers:" -ForegroundColor Yellow
Write-Host "  Press Ctrl+C in each window" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Magenta
