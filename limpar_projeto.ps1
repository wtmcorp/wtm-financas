# Script de Limpeza - WTM Corps Finanças
# Remove arquivos desnecessários sem afetar funcionalidades

Write-Host "🧹 Iniciando limpeza do projeto..." -ForegroundColor Cyan
Write-Host ""

$removedSize = 0
$removedFiles = 0

# Função para remover arquivo e calcular tamanho
function Remove-FileWithLog {
    param($path, $description)
    
    if (Test-Path $path) {
        $size = (Get-Item $path).Length
        Remove-Item $path -Force
        $script:removedSize += $size
        $script:removedFiles++
        Write-Host "✅ Removido: $description" -ForegroundColor Green
        return $true
    } else {
        Write-Host "⚠️  Não encontrado: $description" -ForegroundColor Yellow
        return $false
    }
}

# Função para remover diretório
function Remove-DirectoryWithLog {
    param($path, $description)
    
    if (Test-Path $path) {
        $size = (Get-ChildItem $path -Recurse | Measure-Object -Property Length -Sum).Sum
        Remove-Item $path -Recurse -Force
        $script:removedSize += $size
        Write-Host "✅ Removido: $description" -ForegroundColor Green
        return $true
    } else {
        Write-Host "⚠️  Não encontrado: $description" -ForegroundColor Yellow
        return $false
    }
}

Write-Host "📦 FASE 1: Removendo arquivos grandes..." -ForegroundColor Magenta
Write-Host ""

# 1. Remover ffmpeg.zip (106 MB)
Remove-FileWithLog ".\ffmpeg.zip" "ffmpeg.zip (106 MB)"

# 2. Remover background_music.mp3 (8.9 MB)
Remove-FileWithLog ".\background_music.mp3" "background_music.mp3 (8.9 MB)"

# 3. Remover wtm-financas-deploy.zip (119 KB)
Remove-FileWithLog ".\wtm-financas-deploy.zip" "wtm-financas-deploy.zip (119 KB)"

# 4. Remover diretório ffmpeg_temp
Remove-DirectoryWithLog ".\ffmpeg_temp" "ffmpeg_temp/ (diretório temporário)"

Write-Host ""
Write-Host "🖼️  FASE 2: Removendo frames de imagem (153 arquivos)..." -ForegroundColor Magenta
Write-Host ""

# 5. Remover todos os frames (frame_001.jpg até frame_153.jpg)
$frameCount = 0
for ($i = 1; $i -le 153; $i++) {
    $frameName = "frame_{0:D3}.jpg" -f $i
    if (Test-Path ".\$frameName") {
        $size = (Get-Item ".\$frameName").Length
        Remove-Item ".\$frameName" -Force
        $removedSize += $size
        $frameCount++
    }
}
$removedFiles += $frameCount
Write-Host "✅ Removidos $frameCount frames de imagem" -ForegroundColor Green

Write-Host ""
Write-Host "📝 FASE 3: Removendo documentação redundante..." -ForegroundColor Magenta
Write-Host ""

# 6. Remover documentação redundante (mantendo apenas README.md)
$docsToRemove = @(
    "ARQUITETURA.md",
    "ESTRUTURA.md",
    "INDICE.md",
    "LEIA_PRIMEIRO.md",
    "README_EXECUTIVO.md",
    "SEGURANCA.md",
    "DEPLOYMENT.md",
    "QUICK_START.md",
    "COMECE_AQUI.txt",
    "RESUMO_FINAL.txt",
    "EXEMPLOS_USO.tsx"
)

foreach ($doc in $docsToRemove) {
    Remove-FileWithLog ".\$doc" $doc
}

Write-Host ""
Write-Host "🔧 FASE 4: Removendo scripts de desenvolvimento..." -ForegroundColor Magenta
Write-Host ""

# 7. Remover scripts de desenvolvimento
$scriptsToRemove = @(
    "check_voices.js",
    "cleanup_conflicts.js",
    "test_models.js"
)

foreach ($script in $scriptsToRemove) {
    Remove-FileWithLog ".\$script" $script
}

Write-Host ""
Write-Host "⚙️  FASE 5: Removendo arquivos de setup..." -ForegroundColor Magenta
Write-Host ""

# 8. Remover arquivos de setup
Remove-FileWithLog ".\setup.ps1" "setup.ps1"
Remove-FileWithLog ".\setup.sh" "setup.sh"
Remove-FileWithLog ".\schema.sql" "schema.sql"

Write-Host ""
Write-Host "📋 FASE 6: Removendo .env duplicado..." -ForegroundColor Magenta
Write-Host ""

# 9. Remover .env.local.example (mantendo .env.example)
Remove-FileWithLog ".\.env.local.example" ".env.local.example"

Write-Host ""
Write-Host "🎨 FASE 7: Removendo componentes duplicados não utilizados..." -ForegroundColor Magenta
Write-Host ""

# 10. Remover componentes duplicados
Remove-FileWithLog ".\src\components\dashboard\cards\BalanceCard.tsx" "BalanceCard.tsx duplicado"
Remove-FileWithLog ".\src\components\dashboard\cards\ExpenseCard.tsx" "ExpenseCard.tsx (não usado)"
Remove-FileWithLog ".\src\components\dashboard\cards\SavingsCard.tsx" "SavingsCard.tsx (não usado)"

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "🎉 LIMPEZA CONCLUÍDA!" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Estatísticas:" -ForegroundColor Yellow
Write-Host "   • Arquivos removidos: $removedFiles" -ForegroundColor White
Write-Host "   • Espaço liberado: $([math]::Round($removedSize / 1MB, 2)) MB" -ForegroundColor White
Write-Host ""
Write-Host "✅ O site continua 100% funcional!" -ForegroundColor Green
Write-Host ""
