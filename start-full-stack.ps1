Write-Host "========================================" -ForegroundColor Green
Write-Host "Starting CodeBattle Full Stack Application" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Checking prerequisites..." -ForegroundColor Yellow
Write-Host "- Node.js:"
node --version
Write-Host "- Python:"
python --version
Write-Host "- GCC/G++:"
g++ --version
Write-Host "- Java:"
java --version
Write-Host ""

Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error installing backend dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location ..
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error installing frontend dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Starting Backend Server..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Backend will run on: http://localhost:5111" -ForegroundColor Cyan
Write-Host ""

Set-Location backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Starting Frontend Server..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Frontend will run on: http://localhost:3111" -ForegroundColor Cyan
Write-Host ""

Set-Location ..
Start-Sleep -Seconds 3
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start" -WindowStyle Normal

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Both services are starting..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Backend: http://localhost:5111" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3111" -ForegroundColor Cyan
Write-Host ""
Write-Host "Opening frontend in browser..." -ForegroundColor Yellow
Start-Sleep -Seconds 5
Start-Process "http://localhost:3111"

Write-Host ""
Write-Host "Services are running in separate windows." -ForegroundColor Green
Write-Host "Close those windows to stop the services." -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to exit"
