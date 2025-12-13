# Wtm Corps Finanças - Setup Inicial (Windows)

Write-Host "🚀 Wtm Corps Finanças - Setup Inicial" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""

# Verificar se Node.js está instalado
$nodeCheck = node --version 2>$null
if (-not $nodeCheck) {
    Write-Host "❌ Node.js não está instalado. Instale em: https://nodejs.org/" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Node.js versão: $nodeCheck" -ForegroundColor Green
Write-Host ""

# Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependências instaladas com sucesso!" -ForegroundColor Green
Write-Host ""

# Verificar arquivo .env.local
if (-not (Test-Path ".env.local")) {
    Write-Host "⚠️  Arquivo .env.local não encontrado" -ForegroundColor Yellow
    Write-Host "Copiando de .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env.local"
    Write-Host "✅ Arquivo criado. IMPORTANTE: Preencha as variáveis de ambiente!" -ForegroundColor Green
}
else {
    Write-Host "✅ Arquivo .env.local encontrado" -ForegroundColor Green
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Green
Write-Host "✅ Setup Inicial Completo!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""

Write-Host "Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Preencha o arquivo .env.local com suas credenciais:" -ForegroundColor White
Write-Host "   - NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor Gray
Write-Host "   - NEXT_PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor Gray
Write-Host "   - SUPABASE_SERVICE_ROLE_KEY" -ForegroundColor Gray
Write-Host ""

Write-Host "2. Crie as tabelas no Supabase usando SETUP_COMPLETO.md" -ForegroundColor White
Write-Host ""

Write-Host "3. Rode o servidor:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""

Write-Host "4. Acesse: http://localhost:3000" -ForegroundColor White
Write-Host ""
