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
{{ ... }}
