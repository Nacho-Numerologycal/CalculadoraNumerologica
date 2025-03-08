# Calculadora de Numerología

Aplicación web para cálculos numerológicos basada en React.

## Cambios Recientes

### 08/03/2025 - Creación de Punto de Recuperación Adicional

1. **Backup completo del proyecto con estructura modular CSS**
   - Creación de un backup integral del proyecto con la nueva estructura CSS modular implementada
   - Ubicación del punto de recuperación: `D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA\backups\numerologia_backup_modular_css_20250308_000339`
   - Tamaño total del backup: 2.5 MB (50 archivos)
   - Inclusión de todos los archivos del proyecto excepto `node_modules`, `.git` y carpetas de backup anteriores

2. **Método utilizado para la creación del backup**
   - Utilización de PowerShell para automatizar el proceso de backup
   - Comandos utilizados:
     ```powershell
     # Crear directorio de backup con timestamp
     $backupDir = "D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA\backups\numerologia_backup_modular_css_20250308_000339"
     New-Item -Path $backupDir -ItemType Directory -Force
     
     # Copiar archivos excluyendo carpetas innecesarias
     Get-ChildItem -Path "D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA" -Exclude "node_modules", ".git", "backups" | Copy-Item -Destination $backupDir -Recurse -Force
     ```
   - Verificación del backup mediante conteo de archivos y tamaño total

3. **Contenido del backup**
   - Estructura completa de carpetas y archivos del proyecto
   - Nueva estructura modular CSS con todos los archivos separados por componentes
   - Documentación actualizada (README.md y DOCUMENTATION.md)
   - Archivos de configuración y recursos

### 07/03/2025 - Mejoras de Responsive Design para Dispositivos Móviles

1. **Optimización completa para visualización en smartphones**
   - Implementación de media queries específicas para diferentes tamaños de pantalla (tablets, smartphones y smartphones pequeños)
   - Solución de problemas de superposición de elementos y texto en pantallas pequeñas
   - Ajuste dinámico de tamaños de fuente, círculos y espaciados según el tamaño de dispositivo
   - Implementación de desplazamiento horizontal para tablas y elementos que requieren visualización completa

2. **Mejoras en la experiencia de usuario móvil**
   - Reorganización de secciones en formato de columna para mejor navegación vertical
   - Contenedores con scroll horizontal para la exploración de números y tablas
   - Reducción proporcional de elementos visuales manteniendo la estética de la aplicación
   - Optimización de la herramienta de dibujo para pantallas táctiles pequeñas

3. **Ajustes técnicos para compatibilidad**
   - Implementación de tres breakpoints principales: 768px (tablets), 576px (smartphones) y 400px (smartphones pequeños)
   - Uso de contenedores con overflow-x: auto para mantener la integridad de los datos en tablas
   - Preservación de la funcionalidad completa en todos los tamaños de pantalla
   - Mantenimiento de la coherencia visual con la versión de escritorio

### 07/03/2025 - Implementación de Estructura Modular de CSS

1. **Reorganización completa de la estructura CSS**
   - Implementación de una arquitectura modular con archivos CSS separados por componentes
   - Creación de una estructura de carpetas organizada en `src/css/` y `src/css/components/`
   - Separación de variables, estilos base y componentes específicos en archivos independientes
   - Implementación de un sistema de importación centralizado a través de `main.css`

2. **Mejoras en la organización del código**
   - Centralización de variables CSS en `variables.css` para mantener consistencia visual
   - Separación de estilos por componentes funcionales (header, footer, calculator, etc.)
   - Aislamiento de media queries en `responsive.css` para facilitar ajustes de responsividad
   - Mejora de la legibilidad y mantenibilidad del código CSS

3. **Optimización de la herramienta de dibujo**
   - Solución del problema de visibilidad de los controles de dibujo en la ventana de dibujo en blanco
   - Implementación de estilos específicos en `drawing-tool.css` para asegurar consistencia
   - Mejora de la experiencia de usuario al utilizar la herramienta de dibujo
   - Mantenimiento de la funcionalidad completa en todos los modos de visualización

4. **Nuevo punto de recuperación**
   - Creación de un nuevo punto de respaldo con la estructura modular de CSS implementada
   - Ubicación del punto de recuperación: `D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA\backups\numerologia_backup_modular_css_20250307_232100`
   - Preservación de la nueva estructura de archivos y carpetas
   - Punto de referencia seguro para futuras modificaciones

### 07/03/2025 - Punto de recuperación y preparación para modularización del CSS

1. **Creación de punto de recuperación completo del proyecto**
   - Implementación de una copia de seguridad integral del proyecto en su estado estable
   - Ubicación del punto de recuperación: `D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA\backups\numerologia_backup_completo_20250307_210542`
   - Preservación de todos los archivos del proyecto, incluyendo código fuente, documentación y recursos
   - Punto de referencia seguro para futuras modificaciones o en caso de problemas

2. **Planificación para modularización del CSS**
   - Análisis del archivo CSS actual para identificar oportunidades de modularización
   - Preparación para dividir el CSS en componentes lógicos después del lanzamiento
   - Estrategia para mejorar la mantenibilidad sin afectar la estabilidad del proyecto
   - Enfoque en la organización por componentes y secciones funcionales

### 06/03/2025 - Visualización mejorada de números maestros en Etapas Vitales

1. **Implementación de visualización especial para el número maestro 11**
   - Desarrollo de una lógica para mostrar "11/2" cuando un 2 en las oportunidades proviene del número maestro 11
   - Implementación de verificaciones específicas para cada etapa vital:
     - Primera etapa: Comprueba si el número personal y el femenino suman 11
     - Segunda etapa: Comprueba si el número personal y el masculino suman 11
     - Tercera etapa: Comprueba si el número mental y el emocional suman 11
     - Cuarta etapa: Comprueba si el número femenino y el masculino suman 11
   - Preservación de la lógica de cálculo original, modificando solo la visualización
   - Mejora en la precisión numerológica al distinguir el origen de los números reducidos

### 06/03/2025 - Mejoras en la interfaz de usuario y consistencia visual

1. **Optimización de la Tabla de Energía Anual**
   - Aumento del tamaño de fuente para los números a 1.8rem
   - Aplicación de texto en negrita para todos los números
   - Uso de color turquesa homogéneo para los valores numéricos
   - Resaltado de la columna del año actual con color dorado oscuro
   - Mejora en el espaciado y alineación de las celdas

2. **Mejoras en los campos de entrada de fecha**
   - Simplificación de los placeholders eliminando ejemplos entre paréntesis
   - Cambio del color del texto de los placeholders a un gris más suave
   - Mejora en la experiencia de usuario al hacer más intuitiva la entrada de datos
   - Mantenimiento de la funcionalidad de validación de entradas

3. **Consistencia visual en títulos de sección**
   - Unificación del color de todos los títulos de sección a dorado oscuro (var(--color-gold-dark))
   - Aplicación del mismo estilo al título "Componentes de la Fecha" para mantener coherencia con "Universo Numérico"
   - Uso de variables CSS para garantizar consistencia en toda la aplicación
   - Mejora en la jerarquía visual de la información

### 06/03/2025 - Corrección del cálculo de Etapas Vitales

1. **Implementación correcta de la fórmula de Etapas Vitales**
   - Corrección del cálculo de la primera etapa vital utilizando la fórmula 36 - Camino de Vida
   - Ajuste preciso de los rangos de edad para cada etapa según la fórmula estándar
   - Implementación de la lógica correcta para determinar la etapa actual del usuario
   - Optimización de la visualización de rangos de edad en cada etapa

2. **Mejora en los valores de Oportunidades y Retos**
   - Asignación correcta de los valores de Oportunidades para cada etapa (Emocional, Mental, Talento, Masculino+Femenino)
   - Implementación precisa de los valores de Retos para cada etapa (Trabajo, Energético, Desafío, |Masculino-Femenino|)
   - Reducción de todos los valores a una sola cifra (1-9) para mantener la coherencia numerológica
   - Mejora en la interactividad de los números al hacer clic para ver sus definiciones

3. **Optimización visual de la tabla**
   - Implementación del símbolo "<" para indicar que la última etapa continúa indefinidamente
   - Mejora en la visualización de la etapa actual con resaltado visual
   - Mantenimiento de la coherencia con el resto de la interfaz de usuario
   - Optimización del código para mejorar el rendimiento

### 06/03/2025 - Optimización de la Tabla Ideal y mejora de interactividad

1. **Restauración y optimización de la Tabla Ideal**
   - Implementación correcta del cálculo de números reales, excesos y faltas
   - Reducción adecuada de todos los números a una sola cifra (1-9)
   - Corrección de la lógica de cálculo para mantener la precisión numerológica
   - Optimización del rendimiento en los cálculos de la tabla

2. **Mejora de interactividad en la Tabla Ideal**
   - Todos los números en la tabla (incluidos los ceros) son ahora clicables
   - Implementación de selección de números en las filas de Ideal, Real, Exceso y Falta
   - Visualización de definiciones al hacer clic en cualquier número de la tabla
   - Mejora en la experiencia de usuario con feedback visual al interactuar con los números

3. **Correcciones y optimizaciones**
   - Mejora en la gestión de eventos de clic para todos los números
   - Optimización del código para reducir la duplicación
   - Mantenimiento de la coherencia visual con el resto de la aplicación

### 06/03/2025 - Mejora en la sección de números maestros ocultos

1. **Sección desplegable para números maestros ocultos**
   - Implementación de una sección desplegable (collapsible) para los números maestros ocultos
   - Eliminación de cálculos duplicados para una visualización más limpia
   - Mejora en la presentación visual con estilos específicos para la sección
   - Optimización del espacio en la interfaz manteniendo toda la funcionalidad

2. **Simplificación del método de cálculo principal**
   - Estandarización del método de cálculo principal para usar siempre la suma tradicional
   - Preservación de todos los métodos alternativos de cálculo en la sección desplegable
   - Mejora en la consistencia de los resultados mostrados

3. **Mejoras visuales en la presentación de fórmulas**
   - Diseño mejorado para las fórmulas de cálculo de números maestros
   - Implementación de efectos hover y transiciones suaves
   - Mejor organización visual de las fórmulas y resultados

### 06/03/2025 - Reorganización de la interfaz y mejoras en la exploración de números

1. **Rediseño de la sección de exploración de números**
   - Implementación de una fila horizontal de números significativos en numerología (0-9 y maestros 11, 22, 33, 44)
   - Distinción visual entre números normales (turquesa) y números maestros (dorado)
   - Mejora de la interactividad con efectos hover y transiciones suaves
   - Optimización del espaciado y organización visual

2. **Mejoras en la presentación de información**
   - Aumento del tamaño de letra en la sección de información para mejor legibilidad
   - Expansión de la sección de información a ancho completo
   - Mejora en la estructura de los textos con títulos más destacados
   - Optimización de márgenes y espaciados para una mejor experiencia visual

3. **Reorganización de la herramienta de dibujo**
   - Reubicación de la herramienta de dibujo debajo de la sección de información
   - Simplificación de la interfaz de dibujo con iconos de Font Awesome
   - Corrección de errores en la inicialización del canvas
   - Mejora en el manejo de errores para evitar problemas con el contexto del canvas

### 05/03/2025 - Mejoras en la visualización de tablas y compatibilidad entre navegadores

1. **Mejoras en la Tabla de Años**
   - Corrección del diseño de grid para mostrar 4 columnas en lugar de 5
   - Implementación de resaltado visual para la columna del año actual con fondo y borde sutiles
   - Optimización de los estilos CSS para mejorar la coherencia visual
   - Corrección de duplicaciones en las definiciones de estilos

2. **Mejoras en la Tabla de Etapas Vitales**
   - Reordenamiento de las tablas para mostrar la Tabla de Etapas Vitales antes que la Tabla de Años
   - Mantenimiento del diseño horizontal con círculos decorativos para cada etapa
   - Preservación del resaltado de la etapa actual con color turquesa
   - Conservación de los colores distintivos para números de oportunidad y retos

3. **Mejoras de compatibilidad entre navegadores**
   - Adición de la propiedad estándar `appearance: textfield` junto con `-moz-appearance: textfield` para mejorar la compatibilidad
   - Corrección de advertencias relacionadas con propiedades CSS específicas de navegador

### 05/03/2025 - Corrección de errores y mejoras en el cálculo de números maestros

1. **Corrección del error crítico en la edición de fechas**
   - Se solucionó el problema que causaba un error "Maximum call stack size exceeded" al borrar valores en los campos de fecha
   - Se mejoró la validación de entradas en los campos de día, mes y año
   - Se optimizaron las funciones de reducción numérica para manejar correctamente valores vacíos o inválidos

2. **Mejoras en el cálculo de números maestros**
   - Se modificó el cálculo del camino de vida para preservar correctamente los números maestros en los componentes originales (día, mes, año)
   - Se implementó la detección de números maestros en diferentes combinaciones de la fecha de nacimiento
   - Se añadió la suma dígito por dígito de la fecha completa para detectar números maestros ocultos

3. **Mejoras en la visualización**
   - Se rediseñó la sección "Componentes de la Fecha" para mostrar claramente los valores reducidos y los números maestros
   - Se mejoró la presentación de la "Suma Total" de los componentes de fecha
   - Se optimizó la sección de "Números Maestros Ocultos" para mostrar solo las combinaciones relevantes

### 04/03/2025 - Implementación de la sección de componentes de fecha

1. **Nueva sección "Componentes de la Fecha"**
   - Visualización de los componentes individuales de la fecha (día, mes, año)
   - Detección y visualización de números maestros (11, 22, 33, 44)
   - Suma total de los componentes con preservación de números maestros

2. **Detección de números maestros ocultos**
   - Implementación de la función `getMasterNumbersInProfile()` para detectar números maestros en diferentes combinaciones
   - Visualización de las fórmulas que dan como resultado números maestros
   - Interactividad para ver el significado de cada número maestro

## Actualizaciones Recientes

### 08/03/2025 - Modularización de CSS y Mejoras en la Estructura de Componentes

1. **Modularización del CSS**
   - División del CSS en archivos separados (variables.css, base.css, layout.css)
   - Creación de archivos CSS específicos para componentes (collapsible-section.css, floating-number-info.css, drawing-tool.css, responsive.css)
   - Importación centralizada de todos los archivos CSS en main.css
   - Implementación de variables CSS globales para colores, tipografía y espaciados

2. **Reestructuración de Componentes**
   - Creación de nuevos componentes (DateInputForm, NumerologyResults, DrawingTools, FloatingNumberInfo)
   - Implementación de hooks personalizados (useRecentDates, useDrawingTools)
   - Integración de componentes en App.js para mejorar la organización del código
   - Implementación de secciones desplegables (CollapsibleSection) para mejorar la experiencia de usuario

3. **Mejoras en Responsividad**
   - Implementación de CSS Grid y Flexbox para layouts principales
   - Uso de clamp() para tamaños de fuente, paddings y anchos
   - Configuración de scroll horizontal para tablas en pantallas pequeñas
   - Adición de transiciones suaves para mejorar la experiencia de usuario

4. **Optimización del Manejo de Errores**
   - Implementación de estado errorMessage para mostrar mensajes de error en la UI
   - Eliminación de alertas intrusivas en favor de mensajes integrados en la interfaz
   - Mejora en la validación de datos de entrada

5. **Puntos de Recuperación**
   - Creación de dos puntos de recuperación para garantizar la estabilidad del proyecto:
     - Backup previo a la modularización: `D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA\backups\numerologia_backup_completo_20250307_210542`
     - Backup con estructura modular: `D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA\backups\numerologia_backup_modular_css_20250308_000339`

## Características Principales

- Cálculo de números numerológicos a partir de la fecha de nacimiento
- Detección y preservación de números maestros (11, 22, 33, 44)
- Visualización interactiva del universo numérico
- Historial de fechas recientes
- Calendario para selección visual de fechas
- Información detallada de cada número y su significado
- Tabla de Energía Anual con resaltado del año actual
- Interfaz intuitiva con campos de entrada simplificados
- Diseño visual coherente con paleta de colores armónica

## Tecnologías Utilizadas

- React.js
- CSS3 con variables para consistencia visual
- HTML5
- LocalStorage para persistencia de datos

## Control de Versiones y Respaldo

### Configuración de Control de Versiones (Git)

Este proyecto utiliza Git para el control de versiones, lo que permite:
- Rastrear todos los cambios realizados en el código
- Revertir a versiones anteriores si es necesario
- Trabajar en diferentes características sin afectar el código principal

#### Comandos Git Básicos

```bash
# Ver el estado actual del repositorio
git status

# Añadir cambios al área de preparación
git add .

# Confirmar los cambios con un mensaje descriptivo
git commit -m "Descripción del cambio realizado"

# Ver el historial de commits
git log
```

### Estrategia de Respaldo Automático

Para prevenir la pérdida accidental de código, se ha implementado un script de respaldo automático:

1. **Script de Respaldo (`backup-script.ps1`)**
   - Crea copias de seguridad con fecha y hora en la carpeta `backups`
   - Guarda versiones específicas de los archivos críticos (App.js, App.css, numerologyData.js)
   - Se recomienda ejecutar antes de realizar cambios importantes

2. **Uso del Script de Respaldo**
   ```powershell
   # Ejecutar desde PowerShell en el directorio del proyecto
   .\backup-script.ps1
   ```

3. **Configuración de Auto-guardado en VS Code**
   - Configurado para guardar automáticamente al cambiar de ventana (onWindowChange)
   - Ayuda a prevenir la pérdida de código al cambiar entre aplicaciones

### Mejores Prácticas

1. **Antes de iniciar una sesión de trabajo:**
   - Ejecutar el script de respaldo
   - Verificar que no hay cambios sin confirmar con `git status`

2. **Durante el desarrollo:**
   - Guardar cambios frecuentemente (Ctrl+S)
   - Hacer commits pequeños y frecuentes con mensajes descriptivos

3. **Al finalizar una sesión de trabajo:**
   - Ejecutar el script de respaldo
   - Confirmar todos los cambios con `git commit`
