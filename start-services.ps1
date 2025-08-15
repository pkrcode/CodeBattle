Write-Host "Starting CodeBattle Services..." -ForegroundColor Green
Write-Host ""

# Start backend
Write-Host "Starting Backend on http://localhost:5111..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev" -WindowStyle Normal

# Wait a moment
Start-Sleep -Seconds 3

# Start frontend
Write-Host "Starting Frontend on http://localhost:3111..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start" -WindowStyle Normal

# Wait and open browser
Start-Sleep -Seconds 5
Write-Host "Opening browser..." -ForegroundColor Green
Start-Process "http://localhost:3111"

Write-Host ""
Write-Host "Services started successfully!" -ForegroundColor Green
Write-Host "Backend: http://localhost:5111" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3111" -ForegroundColor Cyan
Write-Host ""
Write-Host "Close the terminal windows to stop the services." -ForegroundColor Yellow
