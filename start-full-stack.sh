#!/bin/bash

echo "========================================"
echo "Starting CodeBattle Full Stack Application"
echo "========================================"
echo

echo "Checking prerequisites..."
echo "- Node.js:"
node --version
echo "- Python:"
python3 --version
echo "- GCC/G++:"
g++ --version
echo "- Java:"
java --version
echo

echo "Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing backend dependencies"
    exit 1
fi

echo
echo "Installing frontend dependencies..."
cd ..
npm install
if [ $? -ne 0 ]; then
    echo "Error installing frontend dependencies"
    exit 1
fi

echo
echo "========================================"
echo "Starting Backend Server..."
echo "========================================"
echo "Backend will run on: http://localhost:5000"
echo

cd backend
gnome-terminal --title="CodeBattle Backend" -- bash -c "npm run dev; exec bash" &
BACKEND_PID=$!

echo
echo "========================================"
echo "Starting Frontend Server..."
echo "========================================"
echo "Frontend will run on: http://localhost:3000"
echo

cd ..
sleep 3
gnome-terminal --title="CodeBattle Frontend" -- bash -c "npm start; exec bash" &
FRONTEND_PID=$!

echo
echo "========================================"
echo "Both services are starting..."
echo "========================================"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo
echo "Opening frontend in browser..."
sleep 5
xdg-open http://localhost:3000 2>/dev/null || open http://localhost:3000 2>/dev/null || echo "Please manually open http://localhost:3000"

echo
echo "Services are running in separate terminals."
echo "Press Ctrl+C to stop this script (services will continue running)"
echo "To stop services, close the terminal windows or kill processes:"
echo "  kill $BACKEND_PID $FRONTEND_PID"
echo

# Wait for user to stop
trap "echo 'Stopping services...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
