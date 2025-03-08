# Documentación Técnica - Calculadora de Numerología

## Estructura del Proyecto

La Calculadora de Numerología es una aplicación web desarrollada con React que permite realizar cálculos numerológicos basados en la fecha de nacimiento. A continuación, se detalla la estructura técnica del proyecto y sus componentes principales.

## Archivos Principales

### `src/App.js`

El componente principal de la aplicación que contiene:

- **Estado de la aplicación**: Maneja la fecha de nacimiento, historial, números calculados y estado de la interfaz.
- **Funciones de cálculo numerológico**: Implementa los algoritmos para calcular números personales, detectar números maestros y reducir valores.
- **Renderizado de componentes**: Estructura la interfaz de usuario con secciones para entrada de fecha, visualización de resultados y exploración de números.
- **Gestión del canvas**: Implementa la herramienta de dibujo interactiva.

### `src/App.css`

Contiene todos los estilos de la aplicación, organizados en secciones:

- **Variables CSS**: Define colores, sombras, bordes y otros valores reutilizables.
- **Estilos de layout**: Estructura general, contenedores y secciones.
- **Componentes UI**: Estilos para botones, inputs, círculos y otros elementos visuales.
- **Animaciones**: Efectos de transición y hover.
- **Responsividad**: Media queries para diferentes tamaños de pantalla.
- **Sección desplegable**: Estilos específicos para la sección de números maestros ocultos.
- **Estilos de tablas**: Configuración visual para la Tabla de Energía Anual y otras tablas.

### `src/numerologyData.js`

Contiene los datos estáticos de la aplicación:

- **Significados de números**: Descripciones detalladas de cada número del 0 al 9 y números maestros.
- **Textos informativos**: Explicaciones sobre conceptos numerológicos.
- **Configuración**: Valores predeterminados y constantes.

### `src/index.js`

Punto de entrada de la aplicación que renderiza el componente App en el DOM.

## Componentes Funcionales

### Sección de Entrada de Fecha

- **Campos de entrada**: Componentes controlados para día, mes y año con placeholders intuitivos.
- **Validación**: Funciones para verificar valores válidos y formatear entradas.
- **Historial**: Almacenamiento y recuperación de fechas recientes.

### Sección de Resultados Numerológicos

- **Componentes de Fecha**: Visualización de los valores reducidos del día, mes y año.
- **Números Personales**: Cálculo y visualización de números como el camino de vida, expresión, etc.
- **Números Maestros**: Detección y preservación de números maestros (11, 22, 33, 44).
- **Sección Desplegable de Números Maestros Ocultos**: Visualización interactiva de todos los métodos de cálculo que resultan en números maestros.
- **Tabla Ideal**: Visualización y cálculo de números ideales, reales, excesos y faltas con interactividad en todos los valores.
- **Tabla de Etapas Vitales**: Cálculo y visualización de las cuatro etapas vitales basadas en el camino de vida, mostrando oportunidades y retos para cada etapa.
- **Tabla de Energía Anual**: Visualización de la energía numérica para diferentes años con resaltado del año actual.

### Exploración de Números

- **Números Horizontales**: Fila de números significativos (0-9 y maestros) para exploración rápida.
- **Información de Números**: Visualización detallada del significado de cada número seleccionado.

### Herramienta de Dibujo

- **Canvas Interactivo**: Implementación de un lienzo para dibujo libre.
- **Controles de Dibujo**: Funciones para cambiar color, tamaño y borrar.

## Algoritmos Clave

### Reducción Numérica

```javascript
const reduceToSingleDigit = (num, preserveMasterNumbers = true) => {
  if (num === null || num === undefined || isNaN(num)) return null;
  
  // Convertir a string para procesar dígito por dígito
  const numStr = num.toString();
  
  // Verificar si es un número maestro
  if (preserveMasterNumbers && (numStr === "11" || numStr === "22" || numStr === "33" || numStr === "44")) {
    return parseInt(numStr, 10);
  }
  
  // Si es un solo dígito, devolverlo
  if (numStr.length === 1) {
    return parseInt(numStr, 10);
  }
  
  // Sumar todos los dígitos
  const sum = numStr.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  
  // Reducir recursivamente hasta obtener un solo dígito o un número maestro
  return reduceToSingleDigit(sum, preserveMasterNumbers);
};
```

### Cálculo de Etapas Vitales

```javascript
// Cálculo de las etapas vitales
const calculateLifeStages = (lifePathNum, emotionalNum, mentalNum, talentNum, workNum, energeticNum, challengeNum, masculineNum, feminineNum, age) => {
  // Calcular el fin de la primera etapa: 36 - lifePath
  const firstStageEnd = 36 - lifePathNum;
  
  // Definir las etapas según la fórmula
  const stages = {
    stage1: {
      endAge: firstStageEnd,
      opportunities: reduceNumber(emotionalNum),
      challenges: reduceNumber(workNum),
      isCurrent: age <= firstStageEnd
    },
    stage2: {
      endAge: firstStageEnd + 9,
      opportunities: reduceNumber(mentalNum),
      challenges: reduceNumber(energeticNum),
      isCurrent: age > firstStageEnd && age <= (firstStageEnd + 9)
    },
    stage3: {
      endAge: firstStageEnd + 19,
      opportunities: reduceNumber(talentNum),
      challenges: reduceNumber(challengeNum),
      isCurrent: age > (firstStageEnd + 9) && age <= (firstStageEnd + 19)
    },
    stage4: {
      endAge: null,
      opportunities: reduceNumber((masculineNum || 0) + (feminineNum || 0)),
      challenges: reduceNumber(Math.abs((masculineNum || 0) - (feminineNum || 0))),
      isCurrent: age > (firstStageEnd + 19)
    }
  };
  
  return stages;
};
```

### Cálculo de la Tabla Ideal

```javascript
const calculateExcessAndMissing = (idealValue, realValue) => {
  // Reducir ambos valores a un solo dígito (1-9)
  const reducedIdeal = reduceNumber(idealValue);
  const reducedReal = reduceNumber(realValue);
  
  // Si son iguales, no hay exceso ni falta
  if (reducedIdeal === reducedReal) {
    return { excess: 0, missing: 0 };
  }
  
  // Calcular exceso y falta
  return {
    excess: reducedIdeal === reducedReal ? 0 : reducedReal,
    missing: reducedIdeal === reducedReal ? 0 : reducedIdeal
  };
};

const calculateIdealTable = () => {
  const idealTable = {};
  
  // Para cada tipo de número en el mapeo ideal
  Object.keys(idealNumberMapping).forEach(key => {
    const idealValue = idealNumberMapping[key];
    const realValue = numberResults[key] || 0;
    
    // Calcular exceso y falta para este tipo de número
    const { excess, missing } = calculateExcessAndMissing(idealValue, realValue);
    
    // Almacenar los resultados
    idealTable[key] = {
      ideal: idealValue,
      real: realValue,
      excess: excess,
      missing: missing
    };
  });
  
  return idealTable;
};
```

### Reducción Numérica Omitiendo 9

```javascript
const reduceNumberWithout9 = (num) => {
  // Filtrar los 9 y sumar los dígitos restantes
  const digits = String(num).split('').map(d => parseInt(d));
  const digitsWithout9 = digits.filter(d => d !== 9);
  
  // Si todos eran 9, devolver 9
  if (digitsWithout9.length === 0) return 9;
  
  const sum = digitsWithout9.reduce((acc, digit) => acc + digit, 0);
  
  // Verificar si la suma es un número maestro
  if (isMasterNumber(sum)) return sum;
  
  // Recursión hasta obtener un dígito o número maestro
  return sum > 9 ? reduceNumberWithout9(sum) : sum;
};
```

## Renderizado de Números

La aplicación utiliza un sistema flexible para renderizar valores numéricos con diferentes estilos según su tipo y contexto:

```javascript
const renderNumberValue = (num, type = 'default', onClick = null) => {
  if (num === null || num === undefined) return null;
  
  let className = "result-value";
  
  // Asignar clases según el tipo de número
  if (type === 'master') {
    className += " master-number";
  } else if (type === 'age') {
    className = "age-value"; 
    // Si es la edad actual, aplicar clase especial
    if (num === numberResults.age) {
      className += " current-age";
    }
  } else if (type === 'opportunity') {
    className += " opportunity-number";
  } else if (type === 'challenge') {
    className += " challenge-number";
  }
  
  // Renderizar el número con la clase apropiada y el manejador de eventos
  return (
    <span 
      className={className}
      onClick={onClick ? () => onClick(num, type) : null}
      style={onClick ? {cursor: 'pointer'} : {}}
    >
      {num}
    </span>
  );
};
```

## Visualización de Números Maestros en Etapas Vitales

La aplicación implementa una lógica especial para mostrar "11/2" cuando un número 2 en las oportunidades de las etapas vitales proviene del número maestro 11:

```javascript
// Lógica para mostrar "11/2" cuando el número 2 proviene de un 11
{reduceNumber(data.opportunities) === 2 && (
  // Primera etapa: comprobar si el número personal y el femenino suman 11
  (stageNumber === 1 && numberResults.personalityNumber + numberResults.feminineNumber === 11) ||
  // Segunda etapa: comprobar si el número personal y el masculino suman 11
  (stageNumber === 2 && numberResults.personalityNumber + numberResults.masculineNumber === 11) ||
  // Tercera etapa: comprobar si el número mental y el emocional suman 11
  (stageNumber === 3 && numberResults.mentalNumber + numberResults.emotionalNumber === 11) ||
  // Cuarta etapa: comprobar si el número femenino y el masculino suman 11
  (stageNumber === 4 && numberResults.feminineNumber + numberResults.masculineNumber === 11)
) ? "11/2" : reduceNumber(data.opportunities)}
```

Esta implementación:
- Verifica si el número reducido de oportunidades es 2
- Comprueba si los números correspondientes a cada etapa suman 11
- Muestra "11/2" en lugar de "2" cuando se cumple la condición
- No altera la lógica de cálculo subyacente, solo modifica la visualización

## Mejoras Visuales

### Estilización de Círculos en Tablas

La aplicación utiliza estilos específicos para los círculos en la Tabla Ideal y la Tabla de Etapas Vitales:

```css
/* Estilos para círculos en la Tabla Ideal */
.ideal-table .number-cell {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0 auto;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Círculo decorativo externo para números ideales */
.ideal-table .ideal-row .number-cell::after {
  content: '';
  position: absolute;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 2px solid var(--color-gold);
  opacity: 0.6;
  z-index: -1;
}

/* Estilos para círculos en la Tabla de Etapas Vitales */
.life-stages-table .stage-circle {
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0 auto;
  background-color: var(--color-turquoise-light);
  border: 2px solid var(--color-turquoise);
  color: var(--color-text-dark);
}

/* Círculo decorativo externo para etapas vitales */
.life-stages-table .stage-circle::after {
  content: '';
  position: absolute;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 2px solid var(--color-turquoise);
  opacity: 0.4;
  z-index: -1;
}
```

### Mejoras en la Tabla de Energía Anual

La aplicación implementa estilos específicos para mejorar la visualización de la Tabla de Energía Anual:

```css
/* Estilos para la Tabla de Energía Anual */
.annual-energy-table {
  margin-top: 1rem;
  width: 100%;
  border-collapse: collapse;
}

.annual-energy-table th, 
.annual-energy-table td {
  text-align: center;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
}

/* Estilo para los números en la tabla */
.annual-energy-table .energy-number {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--color-turquoise);
}

/* Resaltado para el año actual */
.annual-energy-table .current-year-column {
  background-color: var(--color-gold-light);
}

.annual-energy-table .current-year-column .energy-number {
  color: var(--color-gold-dark);
}
```

## Estilización CSS

La aplicación utiliza un sistema de variables CSS para mantener la consistencia visual:

```css
:root {
  /* Paleta de colores principal */
  --color-turquoise: #5BBFB5;        /* Turquesa principal más saturado */
  --color-turquoise-light: #C5E8E5;  /* Turquesa claro para fondos */
  --color-gold: #E6B54A;             /* Dorado principal más saturado */
  --color-gold-dark: #D19A2F;        /* Dorado oscuro para textos y acentos */
  --color-background: #F9F5F0;       /* Fondo principal (beige suave) */
  --color-white: #FFFFFF;            /* Blanco para tarjetas y contenedores */
  --color-black: #2D2D2D;            /* Negro suave para texto principal */
  
  /* Propiedades de diseño */
  --border-radius: 10px;             /* Bordes medianos */
  --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);     /* Sombra estándar */
  --transition: all 0.3s ease;        /* Transición estándar */
}
```

## Mejoras de Accesibilidad

La aplicación implementa varias características para mejorar la accesibilidad:

- **Contraste de colores**: Uso de combinaciones de colores con suficiente contraste.
- **Tamaños de fuente ajustables**: Uso de unidades relativas (rem) para permitir el escalado.
- **Foco visible**: Indicadores visuales claros para elementos con foco.
- **Textos alternativos**: Descripciones para elementos visuales.
- **Navegación por teclado**: Soporte para interacción sin ratón.

## Responsividad

La aplicación está diseñada para funcionar en diferentes tamaños de pantalla:

- **Diseño fluido**: Uso de unidades relativas y flexbox/grid para adaptarse a diferentes anchos.
- **Media queries**: Ajustes específicos para móviles, tablets y escritorio.
- **Imágenes responsivas**: Optimización de recursos visuales para diferentes dispositivos.

## Registro de Actualizaciones

### Actualización 07/03/2025 - Implementación de Estructura Modular de CSS

#### Reorganización de la Estructura CSS
- **Implementación de arquitectura modular**: Se reorganizó el CSS en archivos separados por componentes y funcionalidad.
- **Nueva estructura de carpetas**: 
  ```
  src/css/
  ├── base.css
  ├── variables.css
  ├── layout.css
  ├── components/
  │   ├── header.css
  │   ├── footer.css
  │   ├── calculator.css
  │   ├── input-section.css
  │   ├── results-section.css
  │   ├── number-grid.css
  │   ├── universe-numerical.css
  │   ├── tables.css
  │   ├── drawing-tool.css
  │   └── responsive.css
  └── main.css
  ```
- **Sistema de importación centralizado**: Implementación de un archivo `main.css` que importa todos los demás archivos CSS mediante `@import`.

#### Mejoras Técnicas
- **Centralización de variables**: Todas las variables CSS (colores, espaciados, tamaños, etc.) se centralizaron en `variables.css`.
- **Separación de estilos base**: Los estilos globales básicos se movieron a `base.css`.
- **Componentes independientes**: Cada componente funcional tiene su propio archivo CSS para facilitar el mantenimiento.
- **Aislamiento de media queries**: Todas las reglas de responsividad se agruparon en `responsive.css`.

#### Optimización de la Herramienta de Dibujo
- **Solución de problemas de visibilidad**: Se corrigió el problema donde los controles de dibujo no aparecían en la ventana de dibujo en blanco.
- **Implementación de estilos específicos**: Se creó un archivo dedicado `drawing-tool.css` con reglas específicas para la herramienta.
- **Mejora de la experiencia de usuario**: Se aseguró que todos los controles (lápiz, borrador, selector de color, etc.) sean visibles y funcionales en todos los modos.

#### Nuevo Punto de Recuperación
- **Creación de backup con estructura modular**: Se implementó un nuevo punto de respaldo con la estructura CSS modular.
- **Ubicación del punto de recuperación**: `D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA\backups\numerologia_backup_modular_css_20250307_232100`
- **Contenido del backup**: Incluye la nueva estructura de archivos y carpetas CSS, manteniendo la funcionalidad completa de la aplicación.

### Actualización 08/03/2025 - Punto de Recuperación Adicional con Estructura CSS Modular

#### Creación del Backup
- **Implementación de backup completo**: Se creó un nuevo punto de recuperación con la estructura modular CSS completamente implementada y funcional.
- **Ubicación del backup**: `D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA\backups\numerologia_backup_modular_css_20250308_000339`
- **Tamaño y contenido**: 2.5 MB aproximadamente, con 50 archivos que incluyen todo el código fuente, documentación y recursos (excluyendo node_modules, .git y backups anteriores).

#### Método de Backup Utilizado
- **Automatización con PowerShell**: Se utilizaron comandos de PowerShell para crear el backup de manera eficiente y precisa.
- **Proceso documentado**:
  ```powershell
  # Obtener timestamp para el nombre del directorio
  Get-Date -Format "yyyyMMdd_HHmmss"
  
  # Crear directorio de backup
  $backupDir = "D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA\backups\numerologia_backup_modular_css_20250308_000339"
  New-Item -Path $backupDir -ItemType Directory -Force
  
  # Copiar archivos excluyendo carpetas innecesarias
  Get-ChildItem -Path "D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA" -Exclude "node_modules", ".git", "backups" | Copy-Item -Destination $backupDir -Recurse -Force
  
  # Verificar el backup
  Get-ChildItem -Path $backupDir -Recurse | Measure-Object -Property Length -Sum
  ```
- **Verificación de integridad**: Se confirmó la correcta creación del backup mediante la verificación del número de archivos y su tamaño total.

#### Contenido del Backup
- **Estructura completa del proyecto**: Todos los archivos y carpetas necesarios para el funcionamiento de la aplicación.
- **Nueva estructura modular CSS**: 
  - Archivo principal `main.css` con importaciones
  - Variables centralizadas en `variables.css`
  - Estilos base en `base.css`
  - Estilos de layout en `layout.css`
  - Componentes individuales en la carpeta `components/`
- **Documentación actualizada**: README.md y DOCUMENTATION.md con información sobre la nueva estructura CSS y los puntos de recuperación.
- **Archivos de configuración**: package.json y otros archivos de configuración necesarios.

#### Propósito y Uso
- **Punto de referencia estable**: Permite volver a un estado conocido y funcional de la aplicación con la estructura CSS modular implementada.
- **Facilidad de restauración**: En caso de problemas futuros, se puede restaurar este backup copiando su contenido al directorio principal del proyecto.
- **Documentación del proceso**: Sirve como referencia para futuros backups, documentando el método utilizado y los comandos específicos.

### Actualización 07/03/2025 - Mejoras de Responsive Design para Dispositivos Móviles

#### Optimización para Dispositivos Móviles
- **Implementación de media queries mejoradas**: Se añadieron reglas CSS específicas para tres tamaños de pantalla (tablets, smartphones y smartphones pequeños).
- **Solución de problemas de superposición**: Se corrigieron problemas de elementos superpuestos y texto ilegible en pantallas pequeñas.
- **Tablas responsivas**: Se implementó `overflow-x: auto` en todas las tablas para permitir desplazamiento horizontal en pantallas pequeñas.
- **Reorganización de layouts**: Se modificó la disposición de elementos para adaptarse mejor a pantallas estrechas.

#### Ajustes Específicos
- **Sección de exploración de números**: 
  - Reorganización en columna para dispositivos móviles
  - Contenedor con desplazamiento horizontal para los números
  - Ajuste de tamaños de círculos y fuentes según el tamaño de pantalla
- **Tablas de datos**:
  - Implementación de contenedores con desplazamiento para mantener la integridad de los datos
  - Reducción de padding y tamaños de fuente en pantallas pequeñas
- **Herramienta de dibujo**:
  - Reorganización en columna para dispositivos móviles
  - Ajuste del tamaño del canvas para mejor visualización

#### Breakpoints Implementados
- **Tablets (max-width: 768px)**: Ajustes generales para mantener la usabilidad en tablets.
- **Smartphones (max-width: 576px)**: Reorganización significativa de elementos para pantallas de teléfonos.
- **Smartphones pequeños (max-width: 400px)**: Ajustes adicionales para dispositivos con pantallas muy pequeñas.

### Actualización 07/03/2025 - Punto de Recuperación y Planificación de Modularización CSS

#### Punto de Recuperación
- **Creación de backup completo**: Se implementó una copia de seguridad integral del proyecto en su estado estable y funcional.
- **Ubicación del punto de recuperación**: `D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA\backups\numerologia_backup_completo_20250307_210542`
- **Contenido del backup**: Incluye todos los archivos del proyecto (código fuente, documentación, recursos) excepto las carpetas `node_modules` y `.git`.
- **Propósito**: Establecer un punto de referencia seguro antes de implementar cambios estructurales en el CSS y para futuras referencias.

#### Planificación de Modularización CSS
- **Diagnóstico**: Se identificó que el tamaño del archivo CSS (>50KB) está causando problemas de mantenimiento y posibles conflictos de estilos.
- **Estrategia planificada**: 
  - División del CSS en múltiples archivos según componentes o secciones funcionales
  - Creación de una estructura de carpetas organizada para los estilos
  - Implementación gradual post-lanzamiento para minimizar riesgos
- **Estructura propuesta**:
  ```
  src/
    styles/
      base.css            (estilos globales, variables, reset)
      header.css          (estilos del encabezado)
      calculator.css      (estilos de la calculadora)
      numberExplorer.css  (estilos de exploración de números)
      meanings.css        (estilos de significados)
      tables.css          (estilos de tablas)
      drawingTool.css     (estilos de herramienta de dibujo)
  ```
- **Beneficios esperados**: Mejor mantenibilidad, reducción de conflictos de estilos, y mayor facilidad para implementar cambios futuros.

### Actualización 07/03/2025 - Mejoras en la Herramienta de Dibujo y Elementos Visuales

#### Herramienta de Dibujo
- **Controles específicos para la ventana de dibujo en blanco**: Se añadieron controles de dibujo (lápiz, borrador, puntero láser, selector de color y grosor) a la ventana de dibujo en blanco.
- **Comportamiento del puntero láser**: Se mantuvo el comportamiento original donde el puntero láser limpia el canvas al ser seleccionado, priorizando la funcionalidad correcta de la estela del láser.
- **Estilos CSS mejorados**: Se ajustaron los estilos para mejorar la visibilidad y posicionamiento de los controles de dibujo.

#### Elementos Visuales
- **Tabla Ideal Numérica**: 
  - Aumento del tamaño de los círculos y números aproximadamente un 25% (círculos interiores de 50px a 62px, círculos exteriores de 60px a 75px)
  - Aumento del tamaño de fuente de los números de 1.2rem a 1.5rem
  - Cambio en el estilo de las etiquetas (Ideal, Exceso, Real, Falta) para coincidir con el estilo de la tabla de etapas vitales, usando color turquesa y tamaño 1.5rem

- **Tabla de Etapas Vitales**:
  - Reducción del tamaño de los números en las filas de oportunidades y retos de 2rem a 1.6rem para mejorar la proporción visual

Estos cambios mejoran la experiencia de usuario al proporcionar elementos visuales más grandes y legibles, así como una herramienta de dibujo más funcional tanto en el modo normal como en la ventana de dibujo en blanco.

## Actualizaciones Recientes

### Modularización de CSS y Mejora de la Estructura de Componentes (08/03/2025)

#### Estructura Modular de CSS

La aplicación ha sido actualizada para implementar una estructura modular de CSS, dividiendo los estilos en archivos separados según su función:

1. **Variables Globales (`variables.css`)**
   ```css
   :root {
     --color-primary: #4a90e2;
     --color-secondary: #f5a623;
     --color-gold: #d4af37;
     --color-gold-dark: #b8860b;
     --color-background: #f9f9f9;
     --font-primary: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
     --font-size-base: 16px;
     --spacing-unit: 8px;
   }
   ```

2. **Estilos Base (`base.css`)**
   - Resets y normalización
   - Estilos globales para elementos HTML básicos
   - Configuración de tipografía base

3. **Layouts Globales (`layout.css`)**
   - Implementación de CSS Grid para la estructura principal
   - Configuración de Flexbox para componentes específicos
   - Definición de contenedores y secciones principales

4. **Estilos de Componentes**
   - `collapsible-section.css`: Estilos para secciones desplegables
   - `floating-number-info.css`: Estilos para la ventana flotante de información
   - `drawing-tool.css`: Estilos específicos para la herramienta de dibujo
   - `responsive.css`: Configuraciones de responsividad y media queries

5. **Importación Centralizada (`main.css`)**
   ```css
   @import 'variables.css';
   @import 'base.css';
   @import 'layout.css';
   @import 'components/collapsible-section.css';
   @import 'components/floating-number-info.css';
   @import 'components/drawing-tool.css';
   @import 'components/responsive.css';
   ```

#### Reestructuración de Componentes

Se ha implementado una arquitectura basada en componentes para mejorar la organización y mantenibilidad del código:

1. **Componentes Principales**
   - `DateInputForm.jsx`: Manejo de entrada de fecha y validación
   - `NumerologyResults.jsx`: Visualización de resultados numerológicos
   - `CollapsibleSection.jsx`: Componente reutilizable para secciones desplegables
   - `FloatingNumberInfo.jsx`: Ventana flotante para mostrar información de números
   - `DrawingTools.jsx`: Herramienta de dibujo con controles y canvas

2. **Hooks Personalizados**
   - `useRecentDates.js`: Gestión de fechas recientes en localStorage
   ```javascript
   const useRecentDates = () => {
     const [recentDates, setRecentDates] = useState([]);
     
     useEffect(() => {
       const saved = localStorage.getItem('recentDates');
       if (saved) setRecentDates(JSON.parse(saved));
     }, []);
     
     const addRecentDate = (date) => {
       const newDates = [date, ...recentDates.filter(d => d !== date)].slice(0, 5);
       setRecentDates(newDates);
       localStorage.setItem('recentDates', JSON.stringify(newDates));
     };
     
     return { recentDates, addRecentDate };
   };
   ```
   
   - `useDrawingTools.js`: Gestión del estado y lógica de la herramienta de dibujo
   ```javascript
   const useDrawingTools = () => {
     const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
     const [currentTool, setCurrentTool] = useState('pencil');
     const [color, setColor] = useState('#000000');
     
     const toggleDrawingCanvas = () => {
       setShowDrawingCanvas(!showDrawingCanvas);
     };
     
     return {
       showDrawingCanvas,
       currentTool,
       color,
       toggleDrawingCanvas,
       setCurrentTool,
       setColor
     };
   };
   ```

#### Mejoras en Responsividad

Se han implementado técnicas modernas de CSS para garantizar una experiencia óptima en todos los dispositivos:

1. **CSS Grid y Flexbox**
   ```css
   .app-container {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
     gap: var(--spacing-unit);
   }
   
   .results-section {
     display: flex;
     flex-direction: column;
     gap: calc(var(--spacing-unit) * 2);
   }
   ```

2. **Uso de `clamp()` para Tipografía Fluida**
   ```css
   .section-title {
     font-size: clamp(1.2rem, 2vw + 0.5rem, 2rem);
   }
   ```

3. **Scroll Horizontal para Tablas**
   ```css
   .table-container {
     overflow-x: auto;
     max-width: 100%;
   }
   ```

4. **Transiciones Suaves**
   ```css
   .collapsible-section {
     transition: max-height 0.3s ease-in-out;
   }
   
   .floating-info {
     transition: transform 0.2s ease, opacity 0.2s ease;
   }
   ```

#### Optimización del Manejo de Errores

Se ha mejorado la experiencia de usuario mediante un manejo de errores más amigable:

1. **Estado de Error en App.js**
   ```javascript
   const [errorMessage, setErrorMessage] = useState('');
   
   const handleDateSubmit = (date) => {
     if (!isValidDate(date)) {
       setErrorMessage('Por favor, introduce una fecha válida en formato DD/MM/AAAA');
       return;
     }
     
     setErrorMessage('');
     // Procesar fecha...
   };
   ```

2. **Visualización de Errores en UI**
   ```jsx
   {errorMessage && (
     <div className="error-message">
       <span>{errorMessage}</span>
       <button onClick={() => setErrorMessage('')}>×</button>
     </div>
   )}
   ```

#### Puntos de Recuperación

Se han establecido dos puntos de recuperación para garantizar la estabilidad del proyecto:

1. **Backup Previo a la Modularización (07/03/2025)**
   - Ubicación: `D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA\backups\numerologia_backup_completo_20250307_210542`
   - Contiene la versión funcional antes de la implementación de la estructura modular

2. **Backup con Estructura Modular (08/03/2025)**
   - Ubicación: `D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA\backups\numerologia_backup_modular_css_20250308_000339`
   - Incluye la implementación completa de la estructura modular de CSS y componentes
   - Creado utilizando el siguiente comando PowerShell:
   ```powershell
   $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
   $backupDir = "D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA\backups\numerologia_backup_modular_css_$timestamp"
   New-Item -ItemType Directory -Path $backupDir
   Copy-Item -Path "D:\OneDrive\1. NACHO-NUMEROLOGIA\CALCULADORA DE NUMEROLOGIA\*" -Destination $backupDir -Recurse -Exclude "node_modules", "backups"
   ```
