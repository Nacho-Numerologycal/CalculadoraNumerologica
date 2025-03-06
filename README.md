# Calculadora de Numerología

Aplicación web para cálculos numerológicos basada en React.

## Cambios Recientes

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
