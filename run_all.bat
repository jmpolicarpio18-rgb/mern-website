@echo off
REM run_all.bat — starts backend and frontend in separate command windows
echo Starting backend and frontend for Elite Realty Finance...

REM Use %~dp0 to get the directory of the batch file, so it works from any CWD
start "Backend" cmd /k "cd /d "%~dp0backend" && npm run dev"
start "Frontend" cmd /k "cd /d "%~dp0frontend" && npm start"

exit /b 0
