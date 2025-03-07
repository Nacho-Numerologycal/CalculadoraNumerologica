# Script de respaldo automático para la Calculadora de Numerología
# Creado: 07/03/2025

# Configuración
$projectDir = "D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA"
$backupDir = "D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA\backups"
$dateFormat = "yyyyMMdd_HHmmss"

# Crear directorio de respaldos si no existe
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
    Write-Host "Directorio de respaldos creado: $backupDir" -ForegroundColor Green
}

# Obtener la fecha y hora actual
$timestamp = Get-Date -Format $dateFormat

# Crear nombre del archivo de respaldo
$backupName = "numerologia_backup_$timestamp"
$backupPath = Join-Path $backupDir $backupName

# Crear directorio para este respaldo
New-Item -ItemType Directory -Path $backupPath | Out-Null

# Copiar archivos importantes (excluyendo node_modules y .git)
Write-Host "Creando respaldo de archivos importantes..." -ForegroundColor Cyan
Get-ChildItem -Path $projectDir -Exclude "node_modules", ".git", "backups" | Copy-Item -Destination $backupPath -Recurse -Force

# Crear respaldo específico de los archivos críticos
$srcDir = Join-Path $projectDir "src"
$srcBackupDir = Join-Path $backupPath "src_critical_files"
New-Item -ItemType Directory -Path $srcBackupDir | Out-Null

# Copiar archivos críticos con sufijo de fecha
foreach ($file in @("App.js", "App.css", "numerologyData.js")) {
    $sourcePath = Join-Path $srcDir $file
    if (Test-Path $sourcePath) {
        $destFileName = [System.IO.Path]::GetFileNameWithoutExtension($file) + "_$timestamp" + [System.IO.Path]::GetExtension($file)
        $destPath = Join-Path $srcBackupDir $destFileName
        Copy-Item -Path $sourcePath -Destination $destPath -Force
        Write-Host "  - Respaldo creado: $destFileName" -ForegroundColor Yellow
    }
}

# Mensaje de finalización
Write-Host "`nRespaldo completado exitosamente: $backupName" -ForegroundColor Green
Write-Host "Ubicación: $backupPath" -ForegroundColor Green

# Consejos para el control de versiones
Write-Host "`nRecomendaciones para el control de versiones:" -ForegroundColor Magenta
Write-Host "1. Ejecuta este script regularmente o antes de realizar cambios importantes" -ForegroundColor White
Write-Host "2. Usa 'git add .' para preparar tus cambios" -ForegroundColor White
Write-Host "3. Usa 'git commit -m \"Descripción del cambio\"' para confirmar tus cambios" -ForegroundColor White
Write-Host "4. Considera usar 'git branch' para trabajar en diferentes características" -ForegroundColor White
