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

## Repositorio Visual de Capturas de Pantalla

Se ha implementado un sistema organizado para mantener capturas de pantalla de las diferentes secciones de la aplicación, permitiendo documentar visualmente la evolución del diseño y la funcionalidad.

### Estructura de Carpetas

Las capturas se organizan en el directorio `docs/capturas/` con la siguiente estructura:

- `entrada-fecha/`: Sección de entrada de fecha con calendario
- `resumen/`: Sección de resumen con visualización de números maestros
- `universo-numerico/`: Distribución del universo numérico
- `numeros-maestros/`: Sección de números maestros ocultos
- `etapas-vitales/`: Tabla de etapas vitales con oportunidades y retos
- `tabla-energia-anual/`: Tabla de energía anual
- `tabla-ideal/`: Tabla ideal numérica

### Convención de Nombrado

Para mantener un orden cronológico y facilitar el seguimiento de cambios:

```
YYYYMMDD_descripcion.png
```

Ejemplo: `20250307_calendario_implementado.png`

### Proceso Recomendado

1. Capturar cada sección usando la herramienta de recortes (Win+Shift+S)
2. Guardar la imagen en la carpeta correspondiente siguiendo la convención de nombrado
3. Documentar cambios significativos en el diseño o la funcionalidad
4. Considerar incluir capturas antes y después de implementar cambios importantes

Para más detalles, consultar el archivo `docs/capturas/README.md`.

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
Última actualización: 07/03/2025 - Añadido repositorio visual de capturas
