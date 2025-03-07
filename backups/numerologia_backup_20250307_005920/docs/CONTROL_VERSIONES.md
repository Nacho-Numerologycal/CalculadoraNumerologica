# Estrategia de Control de Versiones y Respaldo

Este documento detalla la estrategia implementada para prevenir la pérdida de código en el proyecto de la Calculadora de Numerología, tras el incidente de pérdida de código del 6 de marzo de 2025.

## Sistema de Control de Versiones (Git)

### Configuración Inicial

El proyecto utiliza Git como sistema de control de versiones. La configuración incluye:

- Archivo `.gitignore` configurado para excluir:
  - Directorio `node_modules/`
  - Archivos de construcción (`/build/`)
  - Archivos de entorno local (`.env.*`)
  - Archivos específicos del IDE (`.vscode/`, `.idea/`)

### Flujo de Trabajo Recomendado

1. **Inicio de sesión de trabajo:**
   ```bash
   # Verificar el estado actual
   git status
   
   # Ejecutar script de respaldo
   .\backup-script.ps1
   ```

2. **Durante el desarrollo:**
   - Realizar cambios en el código
   - Guardar frecuentemente (Ctrl+S)
   - VS Code está configurado para auto-guardar al cambiar de ventana

3. **Al completar una característica o corrección:**
   ```bash
   # Ver los cambios realizados
   git status
   
   # Añadir los cambios al área de preparación
   git add .
   
   # Confirmar los cambios con un mensaje descriptivo
   git commit -m "Descripción detallada del cambio"
   ```

4. **Al finalizar la sesión de trabajo:**
   ```bash
   # Ejecutar script de respaldo
   .\backup-script.ps1
   ```

## Sistema de Respaldo Automático

### Script de Respaldo (`backup-script.ps1`)

Se ha implementado un script de PowerShell que realiza las siguientes acciones:

1. Crea un directorio de respaldo con fecha y hora (`backups/numerologia_backup_YYYYMMDD_HHMMSS/`)
2. Copia todos los archivos del proyecto (excluyendo `node_modules/` y `.git/`)
3. Crea copias específicas de los archivos críticos con sufijo de fecha y hora:
   - `App.js` → `App_YYYYMMDD_HHMMSS.js`
   - `App.css` → `App_YYYYMMDD_HHMMSS.css`
   - `numerologyData.js` → `numerologyData_YYYYMMDD_HHMMSS.js`

### Cuándo Ejecutar el Script de Respaldo

- **Obligatorio:**
  - Al iniciar una sesión de trabajo
  - Antes de realizar cambios importantes
  - Al finalizar una sesión de trabajo
  - Antes de instalar nuevas dependencias
  
- **Recomendado:**
  - Cada hora durante sesiones largas de desarrollo
  - Después de implementar una nueva característica
  - Antes de refactorizar código existente

## Configuración de Auto-guardado en VS Code

VS Code está configurado para guardar automáticamente los archivos cuando se cambia de ventana (onWindowChange), lo que ayuda a prevenir la pérdida de código al cambiar entre aplicaciones o pestañas.

Para verificar o modificar esta configuración:
1. Abrir la configuración de VS Code (Ctrl+,)
2. Buscar "Auto Save"
3. Seleccionar "onWindowChange" en el menú desplegable

## Recuperación de Versiones Anteriores

### Usando Git

```bash
# Ver historial de commits
git log --oneline

# Volver temporalmente a una versión anterior
git checkout <commit-hash>

# Volver a la versión más reciente
git checkout master

# Revertir a una versión anterior permanentemente
git revert <commit-hash>
```

### Usando Respaldos Manuales

1. Navegar al directorio de respaldos (`backups/`)
2. Seleccionar el respaldo deseado por fecha y hora
3. Copiar los archivos necesarios al directorio principal del proyecto

## Prevención de Pérdida de Código

Para evitar situaciones como la pérdida de código del 6 de marzo, sigue estas prácticas:

1. **Nunca sobrescribir archivos sin respaldo**
   - Siempre ejecutar el script de respaldo antes de realizar cambios importantes
   - Considerar crear una rama Git para cambios experimentales

2. **Mantener múltiples copias**
   - Respaldos locales (script de respaldo)
   - Control de versiones (Git)
   - Considerar añadir respaldos en la nube (OneDrive ya está en uso)

3. **Documentar cambios significativos**
   - Usar mensajes de commit descriptivos
   - Mantener actualizado el historial de cambios en README.md
   - Añadir comentarios en el código para explicar lógica compleja

4. **Verificar regularmente los respaldos**
   - Comprobar periódicamente que los respaldos se están creando correctamente
   - Verificar que se pueden restaurar archivos desde los respaldos

---

Documento creado: 07/03/2025  
Última actualización: 07/03/2025
