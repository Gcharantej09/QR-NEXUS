@echo off
REM QR Nexus - Local Dev Server
REM Serves the static site on http://localhost:8000
REM Open that URL in your browser to use the app.

setlocal
cd /d "%~dp0"

echo ======================================
echo   QR Nexus - Local Server
echo ======================================
echo.
echo Starting server on http://localhost:8000
echo Open http://localhost:8000 in your browser.
echo.
echo Press Ctrl+C in this window to stop the server.
echo.

REM Try python first, fall back to node http-server if installed
where python >nul 2>&1
if %ERRORLEVEL% == 0 (
  start "" "http://localhost:8000"
  python -m http.server 8000
  goto :eof
)

where py >nul 2>&1
if %ERRORLEVEL% == 0 (
  start "" "http://localhost:8000"
  py -m http.server 8000
  goto :eof
)

where npx >nul 2>&1
if %ERRORLEVEL% == 0 (
  start "" "http://localhost:8000"
  npx --yes http-server -p 8000 -c-1
  goto :eof
)

echo No HTTP server tool found. Please install Python or Node.js.
pause
