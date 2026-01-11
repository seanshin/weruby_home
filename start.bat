@echo off
REM WeRuby 홈페이지 로컬 서버 실행 스크립트 (Windows)

set PORT=8000
echo 🚀 WeRuby 홈페이지 서버를 시작합니다...
echo.

REM Python 확인
where python >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo ✅ Python을 사용하여 서버를 시작합니다.
    echo 📍 브라우저에서 http://localhost:%PORT% 을 열어주세요
    echo 🛑 서버를 중지하려면 Ctrl+C를 누르세요
    echo.
    python -m http.server %PORT%
    goto :end
)

REM Python 3 확인
where python3 >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo ✅ Python 3를 사용하여 서버를 시작합니다.
    echo 📍 브라우저에서 http://localhost:%PORT% 을 열어주세요
    echo 🛑 서버를 중지하려면 Ctrl+C를 누르세요
    echo.
    python3 -m http.server %PORT%
    goto :end
)

REM Node.js 확인
where node >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo ✅ Node.js를 사용하여 서버를 시작합니다.
    echo 📍 브라우저에서 http://localhost:%PORT% 을 열어주세요
    echo 🛑 서버를 중지하려면 Ctrl+C를 누르세요
    echo.
    npx http-server -p %PORT% -o
    goto :end
)

echo ❌ Python 또는 Node.js가 설치되어 있지 않습니다.
echo.
echo 설치 방법:
echo   - Python: https://www.python.org/downloads/
echo   - Node.js: https://nodejs.org/
pause
exit /b 1

:end
