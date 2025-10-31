@echo off
title Projeto CRUD - MySQL (DEBUG)
color 0A
echo.
echo ========================================
echo    PROJETO CRUD - INICIANDO...
echo ========================================
echo.

:: Verifica se a pasta node-portable existe
if not exist "node-portable" (
    echo [ERRO] Pasta 'node-portable' nao encontrada!
    echo Baixe o Node.js portatil em:
    echo https://nodejs.org/dist/v22.11.0/node-v22.11.0-win-x64.zip
    echo Extraia aqui como 'node-portable'
    pause
    exit
)

:: Verifica se node.exe existe
if not exist "node-portable\node.exe" (
    echo [ERRO] Arquivo node.exe nao encontrado!
    echo Verifique a extracao do ZIP.
    pause
    exit
)

echo [OK] Node.js portatil encontrado.

:: Instala dependencias (se nao existirem)
if not exist "node_modules" (
    echo.
    echo [INFO] Instalando dependencias (express, mysql2, cors)...
    call node-portable\npm install
    if errorlevel 1 (
        echo [ERRO] Falha ao instalar pacotes.
        pause
        exit
    )
) else (
    echo [OK] Dependencias ja instaladas (node_modules existe).
)

echo.
echo [INFO] Iniciando servidor na porta 3001...
echo Acesse no navegador: http://localhost:3001/
echo.
echo (Feche esta janela para parar o servidor)
echo.

:: RODA O SERVIDOR
node-portable\node.exe server\index.js

echo.
echo [FIM] Servidor parado.
pause