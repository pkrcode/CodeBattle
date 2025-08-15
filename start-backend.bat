@echo off
echo Starting Code Execution Backend...
echo.
echo Make sure you have the following installed:
echo - Node.js
echo - Python
echo - GCC/G++ (for C++ compilation)
echo - Java JDK (for Java compilation)
echo.
cd backend
npm install
echo.
echo Starting server on http://localhost:5000
echo Press Ctrl+C to stop the server
echo.
npm run dev
