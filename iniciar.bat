@echo off
cd /d "%~dp0"

echo.
echo ========================================
echo   PROJETO ODS 2 - FOME ZERO
echo   INICIANDO SERVIDOR...
echo ========================================
echo.

rem Verifica se node-portable existe
if not exist "node-portable\node.exe" (
    echo ERRO: node-portable nao encontrado!
    echo Baixe em: https://files.catbox.moe/9k2j5p.zip
    pause
    exit /b 1
)

rem Instala dependencias
if not exist "server\node_modules" (
    echo [1/3] Instalando dependencias...
    node-portable\npm.cmd install --prefix server >nul 2>&1
    if errorlevel 1 (
        echo ERRO ao instalar dependencias!
        pause
        exit /b 1
    )
) else (
    echo [1/3] Dependencias ja instaladas.
)

rem Inicia o servidor na mesma janela
echo.
echo [2/3] Iniciando servidor Node.js...
echo.
.\node-portable\node.exe server\index.js
timeout /t 3 >nul
start http://localhost:3000

echo.
echo [3/3] SERVIDOR RODANDO!
echo Acesse: http://localhost:3000
echo.
echo Pressione qualquer tecla para FECHAR...
pause >nul