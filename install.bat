@echo off
REM Installation script for Elite Realty Finance MERN application

echo.
echo ============================================
echo Elite Realty Finance - Installation Script
echo ============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo NPM version:
npm --version
echo.

REM Install backend dependencies
echo ============================================
echo Installing Backend Dependencies...
echo ============================================
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

REM Install frontend dependencies
echo.
echo ============================================
echo Installing Frontend Dependencies...
echo ============================================
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo ============================================
echo Installation Complete!
echo ============================================
echo.
echo Next steps:
echo 1. Ensure MongoDB is running
echo 2. Update backend/.env with your configuration
echo 3. Run: npm run dev (in backend folder)
echo 4. Run: npm start (in frontend folder)
echo.
pause
