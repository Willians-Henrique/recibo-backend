# Faz backup do banco e aplica migrations pendentes de forma segura (não reseta dados).
# Uso: rodar antes de substituir os arquivos da aplicação por uma nova versão.

$ErrorActionPreference = "Stop"
$raiz = Join-Path $PSScriptRoot ".."
$bancoOrigem = Join-Path $raiz "data\database.sqlite"
$pastaBackups = Join-Path $raiz "data\backups"

if (-not (Test-Path $bancoOrigem)) {
    throw "Banco não encontrado em $bancoOrigem"
}

New-Item -ItemType Directory -Path $pastaBackups -Force | Out-Null

$carimbo = Get-Date -Format "yyyyMMddHHmmss"
$destino = Join-Path $pastaBackups "database-$carimbo.sqlite"
Copy-Item -Path $bancoOrigem -Destination $destino -Force
Write-Host "Backup criado em $destino"

Push-Location $raiz
try {
    npx prisma migrate deploy
} finally {
    Pop-Location
}

Write-Host "Migrations aplicadas. Reinicie a aplicação (scripts\start.bat)."
