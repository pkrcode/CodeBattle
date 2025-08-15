@echo off
echo ========================================
echo Starting CodeBattle Full Stack Application
echo ========================================
echo.

echo Checking prerequisites...
echo - Node.js: 
node --version
echo - Python: 
python --version
echo - GCC/G++: 
g++ --version
echo - Java: 
java --version
echo.

echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies
    pause
    exit /b 1
)

echo.
echo Installing frontend dependencies...
cd ..
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)

echo.
echo ========================================
echo Starting Backend Server...
echo ========================================
echo Backend will run on: http://localhost:5111
echo.

cd backend
start "CodeBattle Backend" cmd /k "npm run dev"

echo.
echo ========================================
echo Starting Frontend Server...
echo ========================================
echo Frontend will run on: http://localhost:3111
echo.

cd ..
timeout /t 3 /nobreak >nul
start "CodeBattle Frontend" cmd /k "npm start"

echo.
echo ========================================
echo Both services are starting...
echo ========================================
echo Backend: http://localhost:5111
echo Frontend: http://localhost:3111
echo.
echo Press any key to open the frontend in your browser...
pause >nul
start http://localhost:3111

echo.
echo Services are running in separate windows.
echo Close those windows to stop the services.
echo.
pause
