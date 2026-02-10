# Task Management System Startup Script
Write-Host "Starting Task Management System..." -ForegroundColor Green

# Check if MongoDB is running
Write-Host "Checking MongoDB connection..." -ForegroundColor Yellow
$mongoRunning = Get-Process mongod -ErrorAction SilentlyContinue
if (!$mongoRunning) {
    Write-Host "Warning: MongoDB process not detected. Make sure MongoDB is running!" -ForegroundColor Red
    Write-Host "You can start MongoDB with: mongod" -ForegroundColor Yellow
}

# Start Backend
Write-Host "Starting Backend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; Write-Host 'Backend Server' -ForegroundColor Green; npm run dev"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "Starting Frontend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; Write-Host 'Frontend Server' -ForegroundColor Blue; npm run dev"

Write-Host "Servers are starting!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C in each terminal to stop the servers." -ForegroundColor Yellow
