# Script de respaldo automático para la Calculadora de Numerología
# Creado: 07/03/2025
# Actualizado: 07/03/2025 - Añadido manejo de errores y optimización

# Configuración
$projectDir = "D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA"
$backupDir = "D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA\backups"
$dateFormat = "yyyyMMdd_HHmmss"

# Función para registrar mensajes
function Write-Log {
    param (
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host "$(Get-Date -Format 'HH:mm:ss') - $Message" -ForegroundColor $Color
}

# Manejo de errores
$ErrorActionPreference = "Stop"
try {
    # Crear directorio de respaldos si no existe
    if (-not (Test-Path $backupDir)) {
        New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
        Write-Log "Directorio de respaldos creado: $backupDir" "Green"
    }

    # Obtener la fecha y hora actual
    $timestamp = Get-Date -Format $dateFormat

    # Crear nombre del archivo de respaldo
    $backupName = "numerologia_backup_$timestamp"
    $backupPath = Join-Path $backupDir $backupName

    # Crear directorio para este respaldo
    New-Item -ItemType Directory -Path $backupPath -Force | Out-Null
    Write-Log "Creando respaldo en: $backupPath" "Cyan"

    # Copiar archivos importantes (excluyendo node_modules y .git)
    Write-Log "Creando respaldo de archivos importantes..." "Cyan"
    
    # Usar robocopy para mayor eficiencia y control
    $excludeDirs = "node_modules", ".git", "backups"
    $excludeParam = $excludeDirs | ForEach-Object { "/XD $_ " }
    
    # Convertir a string y ejecutar robocopy
    $robocopyCmd = "robocopy `"$projectDir`" `"$backupPath`" /E /NP /NFL $excludeParam"
    Write-Log "Ejecutando: $robocopyCmd" "Gray"
    
    # Ejecutar robocopy (códigos de salida 0-7 son normales para robocopy)
    $robocopyOutput = Invoke-Expression $robocopyCmd
    
    # Crear respaldo específico de los archivos críticos
    $srcDir = Join-Path $projectDir "src"
    $srcBackupDir = Join-Path $backupPath "src_critical_files"
    
    if (-not (Test-Path $srcBackupDir)) {
        New-Item -ItemType Directory -Path $srcBackupDir -Force | Out-Null
    }

    # Copiar archivos críticos con sufijo de fecha
    Write-Log "Creando respaldo de archivos críticos..." "Yellow"
    foreach ($file in @("App.js", "App.css", "numerologyData.js")) {
        $sourcePath = Join-Path $srcDir $file
        if (Test-Path $sourcePath) {
            $destFileName = [System.IO.Path]::GetFileNameWithoutExtension($file) + "_$timestamp" + [System.IO.Path]::GetExtension($file)
            $destPath = Join-Path $srcBackupDir $destFileName
            Copy-Item -Path $sourcePath -Destination $destPath -Force
            Write-Log "  - Respaldo creado: $destFileName" "Yellow"
        }
        else {
            Write-Log "  - Advertencia: No se encontró el archivo $file" "Yellow"
        }
    }

    # Mensaje de finalización
    Write-Log "`nRespaldo completado exitosamente: $backupName" "Green"
    Write-Log "Ubicación: $backupPath" "Green"

    # Consejos para el control de versiones
    Write-Log "`nRecomendaciones para el control de versiones:" "Magenta"
    Write-Log "1. Ejecuta este script regularmente o antes de realizar cambios importantes" "White"
    Write-Log "2. Usa 'git add .' para preparar tus cambios" "White"
    Write-Log "3. Usa 'git commit -m \"Descripción del cambio\"' para confirmar tus cambios" "White"
    Write-Log "4. Considera usar 'git branch' para trabajar en diferentes características" "White"
}
catch {
    Write-Log "ERROR: $($_.Exception.Message)" "Red"
    Write-Log "Línea: $($_.InvocationInfo.ScriptLineNumber)" "Red"
    Write-Log "Comando: $($_.InvocationInfo.Line)" "Red"
    
    # Pausa para que el usuario pueda leer el error
    Write-Log "`nPresiona cualquier tecla para salir..." "Yellow"
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}
