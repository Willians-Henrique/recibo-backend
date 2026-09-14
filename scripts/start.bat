@echo off
REM Inicia o backend (que serve API + Angular) e abre o navegador em localhost.
cd /d "%~dp0.."
start "" http://localhost:2000
node dist\server.js
