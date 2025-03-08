import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Calculator, X, PenLine, Eraser, RotateCcw, Palette, Calendar, Square } from 'lucide-react';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { 
  numerologyInfo, 
  reduceNumber, 
  reduceNumberPreserveMaster,
  subtractWithRules, 
  calculateExcessAndMissing,
  idealNumberMapping
} from './numerologyData';

// Paleta de colores inspirada en tu imagen
const colors = {
  turquoise: "#7DD1C8",
  gold: "#F0C987",
  goldDark: "#E2B15B",
  red: "#FF6B6B",
  blue: "#4D96FF",
  white: "#FFFFFF",
  black: "#333333",
  gray: "#CCCCCC",
  grayLight: "#EEEEEE",
  purple: "#BA68C8",
  brown: "#964B00"
};

const App = () => {
  // Registrar localización española para el DatePicker
  registerLocale('es', es);
  
  // Estados para la fecha de nacimiento
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [recentDates, setRecentDates] = useState([]);
  
  // Referencias para los inputs de fecha
  const dayInputRef = useRef(null);
  const monthInputRef = useRef(null);
  const yearInputRef = useRef(null);
  
  // Estados para los resultados y visualización
  const [numberResults, setNumberResults] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedNumberType, setSelectedNumberType] = useState(null);
  const [calculated, setCalculated] = useState(false);
  
  // Estados para herramienta de dibujo
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingTool, setDrawingTool] = useState('laser'); // 'pen', 'eraser', o 'laser'
  const [currentColor, setCurrentColor] = useState('#FF6B6B'); // Cambiado a rojo por defecto
  const [lineWidth, setLineWidth] = useState(8); // Cambiado a máximo grosor por defecto
  const [showLineWidthPicker, setShowLineWidthPicker] = useState(false); // Mostrar selector de grosor
  const [laserTrail, setLaserTrail] = useState([]); // Puntos para la estela del láser
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showDrawingTool, setShowDrawingTool] = useState(false);
  const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
  
  // Referencias para el canvas
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const appContentRef = useRef(null);
  const ctxRef = useRef(null);
  const blankCanvasRef = useRef(null); // Referencia para el canvas en blanco

  // Función para alternar la herramienta de dibujo
  const toggleDrawingTool = () => {
    const newState = !showDrawingTool;
    setShowDrawingTool(newState);
    
    if (newState) {
      // Al activar, configuramos el canvas en el siguiente ciclo de renderizado
      setTimeout(() => {
        setupCanvas();
      }, 0);
    }
  };
  
  // Configurar el canvas
  const setupCanvas = () => {
    if (!canvasRef.current && !blankCanvasRef.current) return;
    
    // Determinar qué canvas configurar
    const canvas = showDrawingCanvas ? blankCanvasRef.current : canvasRef.current;
    if (!canvas) return;
    
    // Configurar el tamaño del canvas para que cubra toda la ventana
    canvas.width = showDrawingCanvas ? canvas.parentElement.clientWidth : window.innerWidth;
    canvas.height = showDrawingCanvas ? canvas.parentElement.clientHeight : window.innerHeight;
    
    // Configurar el contexto
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = drawingTool === 'eraser' ? 20 : lineWidth;
    
    if (drawingTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }
  };

  // Función para iniciar el dibujo
  const startDrawing = (e) => {
    const canvas = showDrawingCanvas ? blankCanvasRef.current : canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    
    // Calcular la posición del cursor relativa al canvas
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setLastPosition({ x, y });
  };
  
  // Función para dibujar
  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = showDrawingCanvas ? blankCanvasRef.current : canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Calcular la posición del cursor relativa al canvas
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Si es modo láser, solo registrar la posición para la estela
    if (drawingTool === 'laser') {
      setLaserTrail(prevTrail => [...prevTrail, { x, y }]);
      // Limitar la longitud de la estela para evitar problemas de rendimiento
      if (laserTrail.length > 20) {
        setLaserTrail(prevTrail => prevTrail.slice(-20));
      }
      setLastPosition({ x, y });
      return;
    }
    
    // Para los otros modos de dibujo (pen, eraser)
    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(x, y);
    
    if (drawingTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 20;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = currentColor;
    }
    
    ctx.lineCap = 'round';
    ctx.stroke();
    
    setLastPosition({ x, y });
    
    // Agregar puntos a la estela del láser si corresponde
    if (drawingTool === 'laser') {
      setLaserTrail([...laserTrail, { x, y }]);
    }
  };
  
  // Función para detener el dibujo
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  
  // Función para limpiar el canvas
  const clearCanvas = () => {
    const canvas = showDrawingCanvas ? blankCanvasRef.current : canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Limpiar la estela del láser
    setLaserTrail([]);
  };
  
  // Efecto para configurar el canvas cuando se activa la herramienta de dibujo
  useEffect(() => {
    const handleScroll = () => {
      clearCanvas();
    };
    
    const handleResize = () => {
      setupCanvas();
    };
    
    if (showDrawingTool || showDrawingCanvas) {
      setupCanvas();
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [showDrawingTool, showDrawingCanvas]);

  // Efecto para manejar la estela del láser
  useEffect(() => {
    if (drawingTool === 'laser' && laserTrail.length > 0) {
      // Crear un intervalo para ir desvaneciendo la estela
      const fadeInterval = setInterval(() => {
        setLaserTrail(prevTrail => {
          // Eliminar el punto más antiguo de la estela
          const newTrail = [...prevTrail];
          newTrail.shift();
          return newTrail;
        });
      }, 100); // Velocidad de desvanecimiento
      
      return () => {
        clearInterval(fadeInterval);
      };
    }
  }, [drawingTool, laserTrail]);
  
  // Función para dibujar la estela del láser
  const drawLaserTrail = useCallback(() => {
    const canvas = showDrawingCanvas ? blankCanvasRef.current : canvasRef.current;
    if (!canvas || laserTrail.length === 0) return;
    
    const ctx = canvas.getContext('2d');
    
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar la estela con opacidad decreciente
    laserTrail.forEach((point, index) => {
      // Calcular la opacidad: los puntos más recientes son más opacos
      const opacity = (index + 1) / laserTrail.length;
      
      // Calcular el tamaño: los puntos más recientes son más grandes
      const size = lineWidth * (0.5 + (opacity * 0.5));
      
      ctx.beginPath();
      ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${hexToRgb(currentColor)}, ${opacity})`;
      ctx.fill();
      
      // Dibujar un brillo alrededor del punto más reciente
      if (index === laserTrail.length - 1) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(currentColor)}, 0.2)`;
        ctx.fill();
      }
    });
  }, [laserTrail, currentColor, lineWidth, showDrawingCanvas]);
  
  // Función para convertir color hex a rgb
  const hexToRgb = (hex) => {
    // Eliminar el # si existe
    hex = hex.replace('#', '');
    
    // Convertir a valores RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  };
  
  // Efecto para dibujar la estela del láser
  useEffect(() => {
    if (drawingTool === 'laser') {
      drawLaserTrail();
    }
  }, [drawingTool, laserTrail, drawLaserTrail]);

  // Cálculos numerológicos
  const handleCalculate = () => {
    if (!day || !month || !year) {
      alert('Por favor, ingresa tu fecha de nacimiento completa.');
      return;
    }
    
    // Validar fecha
    const dayValue = parseInt(day);
    const monthValue = parseInt(month);
    const yearValue = parseInt(year);
    
    if (dayValue < 1 || dayValue > 31 || monthValue < 1 || monthValue > 12 || yearValue < 1000 || yearValue > 9999) {
      alert('Por favor, ingresa una fecha válida.');
      return;
    }
    
    // Guardar la fecha en el historial reciente
    saveToRecentDates();
    
    // Calcular números
    const birthdate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    
    // Calcular la edad
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Calcular números numerológicos básicos
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    
    // Valores reducidos para cálculos
    const reducedDayNum = reduceNumber(dayNum);
    const reducedMonthNum = reduceNumber(monthNum);
    const reducedYearNum = reduceNumber(yearNum);
    
    // Cálculos según las nuevas fórmulas
    const personalNum = reduceNumberPreserveMaster(reducedDayNum);
    const feminineNum = reduceNumberPreserveMaster(reducedMonthNum);
    const masculineNum = reduceNumberPreserveMaster(reducedYearNum);
    
    // Calcular sumas antes de reducir para preservar números maestros
    const mentalSum = personalNum + masculineNum;
    const emotionalSum = personalNum + feminineNum;
    const talentSum = mentalSum + emotionalSum;
    
    // Calcular camino de vida preservando números maestros en componentes
    const dayComponent = isMasterNumber(dayNum) ? dayNum : reducedDayNum;
    const monthComponent = isMasterNumber(monthNum) ? monthNum : reducedMonthNum;
    const yearComponent = isMasterNumber(yearNum) ? yearNum : reducedYearNum;
    const lifePathSum = dayComponent + monthComponent + yearComponent;
    
    const purposeSum = personalNum + lifePathSum;
    
    // Reducir respetando números maestros
    const mentalNum = reduceNumberPreserveMaster(mentalSum);
    const emotionalNum = reduceNumberPreserveMaster(emotionalSum);
    const talentNum = reduceNumberPreserveMaster(talentSum);
    const workNum = subtractWithRules(personalNum, feminineNum);
    const energeticNum = subtractWithRules(personalNum, masculineNum);
    const challengeNum = subtractWithRules(workNum, energeticNum);
    const lifePathNum = reduceNumberPreserveMaster(lifePathSum);
    const purposeNum = reduceNumberPreserveMaster(purposeSum);

    // Crear el objeto de resultados
    const results = {
      personalityNumber: personalNum,
      feminineNumber: feminineNum,
      masculineNumber: masculineNum,
      mentalNumber: mentalNum,
      emotionalNumber: emotionalNum,
      talentNumber: talentNum,
      workFamilyNumber: workNum,
      energeticNumber: energeticNum,
      challengeNumber: challengeNum,
      lifePathNumber: lifePathNum,
      purposeNumber: purposeNum,
      age: age,
      
      // Calcular tabla ideal
      idealTable: {},
      
      // Calcular tabla de etapas vitales
      lifeStages: (() => {
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
      })(),
      
      // Calcular tabla de años
      years: {
        previous: {
          year: new Date().getFullYear() - 1,
          age: age - 1,
          generalYear: reduceNumberPreserveMaster(new Date().getFullYear() - 1),
          personalYear: reduceNumberPreserveMaster(dayNum + monthNum + reduceNumber(new Date().getFullYear() - 1)),
          vitalYear: reduceNumberPreserveMaster(lifePathNum + reduceNumber(new Date().getFullYear() - 1))
        },
        current: {
          year: new Date().getFullYear(),
          age: age,
          generalYear: reduceNumberPreserveMaster(new Date().getFullYear()),
          personalYear: reduceNumberPreserveMaster(dayNum + monthNum + reduceNumber(new Date().getFullYear())),
          vitalYear: reduceNumberPreserveMaster(lifePathNum + reduceNumber(new Date().getFullYear()))
        },
        next: {
          year: new Date().getFullYear() + 1,
          age: age + 1,
          generalYear: reduceNumberPreserveMaster(new Date().getFullYear() + 1),
          personalYear: reduceNumberPreserveMaster(dayNum + monthNum + reduceNumber(new Date().getFullYear() + 1)),
          vitalYear: reduceNumberPreserveMaster(lifePathNum + reduceNumber(new Date().getFullYear() + 1))
        }
      }
    };
    
    // Calcular tabla ideal usando la función calculateExcessAndMissing
    Object.entries(idealNumberMapping).forEach(([key, ideal]) => {
      // Obtener el valor real directamente
      const real = results[key];
      
      // Reducir el valor real a una cifra (sin preservar números maestros)
      const reducedReal = reduceNumber(real);
      
      // Calcular exceso y falta
      const { excess, missing } = calculateExcessAndMissing(ideal, reducedReal);
      
      // Guardar en la tabla ideal
      results.idealTable[key] = {
        ideal,
        real: reducedReal,
        excess,
        missing
      };
    });
    
    setNumberResults(results);
    setCalculated(true);
    
    // Seleccionar el número de camino de vida por defecto
    setSelectedNumber(lifePathNum);
    setSelectedNumberType('lifePathNumber');
    
    // Limpiar canvas después de un nuevo cálculo
    if (ctxRef.current) {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  // Función para verificar si un número es un número maestro
  const isMasterNumber = (num) => {
    return num === 11 || num === 22 || num === 33 || num === 44;
  };

  // Función para reducir omitiendo los 9
  const reduceNumberWithout9 = (num) => {
    if (num === undefined || num === null || isNaN(num)) return 0;
    
    // Si ya es un dígito, devolverlo
    if (num >= 0 && num <= 9) return num;
    
    // Si es un número maestro, devolverlo
    if (isMasterNumber(num)) return num;
    
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

  // Función para obtener todos los números maestros en el perfil y posibles combinaciones ocultas
  const getMasterNumbersInProfile = () => {
    const results = [];
    
    // Valores originales de día, mes y año
    const originalDay = parseInt(day);
    const originalMonth = parseInt(month);
    const originalYear = parseInt(year);
    
    // Valores reducidos de día, mes y año (método tradicional)
    const reducedDay = reduceNumber(originalDay);
    const reducedMonth = reduceNumber(originalMonth);
    const reducedYear = reduceNumber(originalYear);
    
    // Valores reducidos omitiendo los 9
    const reducedDayWithout9 = reduceNumberWithout9(originalDay);
    const reducedMonthWithout9 = reduceNumberWithout9(originalMonth);
    const reducedYearWithout9 = reduceNumberWithout9(originalYear);
    
    // Verificar si los valores originales son números maestros
    if (isMasterNumber(originalDay)) {
      results.push({ type: 'Día', value: originalDay });
    }
    
    if (isMasterNumber(originalMonth)) {
      results.push({ type: 'Mes', value: originalMonth });
    }
    
    if (isMasterNumber(originalYear)) {
      results.push({ type: 'Año', value: originalYear });
    }
    
    // Verificar si las reducciones omitiendo 9 son números maestros
    if (isMasterNumber(reducedDayWithout9) && reducedDayWithout9 !== reducedDay) {
      results.push({ 
        type: 'Día (omitiendo 9)', 
        value: reducedDayWithout9,
        formula: `${originalDay} → ${reducedDayWithout9} (omitiendo 9)`
      });
    }
    
    if (isMasterNumber(reducedMonthWithout9) && reducedMonthWithout9 !== reducedMonth) {
      results.push({ 
        type: 'Mes (omitiendo 9)', 
        value: reducedMonthWithout9,
        formula: `${originalMonth} → ${reducedMonthWithout9} (omitiendo 9)`
      });
    }
    
    if (isMasterNumber(reducedYearWithout9) && reducedYearWithout9 !== reducedYear) {
      results.push({ 
        type: 'Año (omitiendo 9)', 
        value: reducedYearWithout9,
        formula: `${originalYear} → ${reducedYearWithout9} (omitiendo 9)`
      });
    }
    
    // Verificar combinaciones para encontrar números maestros ocultos
    // Combinación 1: Día + Mes + Año (todos reducidos)
    const combo1 = reducedDay + reducedMonth + reducedYear;
    if (isMasterNumber(combo1)) {
      results.push({ 
        type: 'Combinación (D+M+A reducidos)', 
        value: combo1, 
        formula: `${reducedDay} + ${reducedMonth} + ${reducedYear} = ${combo1}` 
      });
    }
    
    // Combinación 1B: Día + Mes + Año (reducidos omitiendo 9)
    const combo1b = reducedDayWithout9 + reducedMonthWithout9 + reducedYearWithout9;
    if (isMasterNumber(combo1b) && combo1b !== combo1) {
      results.push({ 
        type: 'Combinación (D+M+A reducidos omitiendo 9)', 
        value: combo1b, 
        formula: `${reducedDayWithout9} + ${reducedMonthWithout9} + ${reducedYearWithout9} = ${combo1b}` 
      });
    }
    
    // Combinación 2: Día original (si es maestro) + Mes reducido + Año reducido
    if (isMasterNumber(originalDay)) {
      const combo2 = originalDay + reducedMonth + reducedYear;
      if (isMasterNumber(combo2)) {
        results.push({ 
          type: 'Combinación (D maestro + M + A reducidos)', 
          value: combo2, 
          formula: `${originalDay} + ${reducedMonth} + ${reducedYear} = ${combo2}` 
        });
      }
    }
    
    // Combinación 3: Día reducido + Mes original (si es maestro) + Año reducido
    if (isMasterNumber(originalMonth)) {
      const combo3 = reducedDay + originalMonth + reducedYear;
      if (isMasterNumber(combo3)) {
        results.push({ 
          type: 'Combinación (D + M maestro + A reducidos)', 
          value: combo3, 
          formula: `${reducedDay} + ${originalMonth} + ${reducedYear} = ${combo3}` 
        });
      }
    }
    
    // Combinación 4: Día reducido + Mes reducido + Año original (si es maestro o da un maestro al reducir)
    const yearSum = String(originalYear).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    if (isMasterNumber(yearSum)) {
      const combo4 = reducedDay + reducedMonth + yearSum;
      if (isMasterNumber(combo4)) {
        results.push({ 
          type: 'Combinación (D + M reducidos + suma de dígitos de A)', 
          value: combo4, 
          formula: `${reducedDay} + ${reducedMonth} + ${yearSum} = ${combo4}` 
        });
      }
    }
    
    // Combinación 5: Usando el método de omitir 9 en el año
    const yearSumWithout9 = String(originalYear)
      .split('')
      .filter(d => d !== '9')
      .reduce((sum, digit) => sum + parseInt(digit), 0);
      
    if (isMasterNumber(yearSumWithout9) && yearSumWithout9 !== yearSum) {
      const combo5 = reducedDay + reducedMonth + yearSumWithout9;
      if (isMasterNumber(combo5)) {
        results.push({ 
          type: 'Combinación (D + M reducidos + A omitiendo 9)', 
          value: combo5, 
          formula: `${reducedDay} + ${reducedMonth} + ${yearSumWithout9} = ${combo5}` 
        });
      }
    }
    
    // Suma dígito por dígito de toda la fecha
    const allDigits = (day.padStart(2, '0') + month.padStart(2, '0') + year.padStart(4, '0')).split('');
    const digitByDigitSum = allDigits.reduce((sum, digit) => sum + parseInt(digit), 0);
    if (isMasterNumber(digitByDigitSum) || isMasterNumber(reduceNumber(digitByDigitSum))) {
      const masterValue = isMasterNumber(digitByDigitSum) ? digitByDigitSum : reduceNumber(digitByDigitSum);
      const formula = allDigits.join('+') + '=' + digitByDigitSum;
      const finalFormula = isMasterNumber(digitByDigitSum) ? formula : formula + '=' + masterValue;
      
      results.push({ 
        type: 'Suma dígito por dígito', 
        value: masterValue, 
        formula: finalFormula
      });
    }
    
    // Suma dígito por dígito omitiendo los 9
    const allDigitsWithout9 = allDigits.filter(d => d !== '9');
    if (allDigitsWithout9.length > 0) {
      const digitByDigitSumWithout9 = allDigitsWithout9.reduce((sum, digit) => sum + parseInt(digit), 0);
      if ((isMasterNumber(digitByDigitSumWithout9) || isMasterNumber(reduceNumber(digitByDigitSumWithout9))) && 
          digitByDigitSumWithout9 !== digitByDigitSum) {
        const masterValue = isMasterNumber(digitByDigitSumWithout9) ? digitByDigitSumWithout9 : reduceNumber(digitByDigitSumWithout9);
        const formula = allDigitsWithout9.join('+') + '=' + digitByDigitSumWithout9;
        const finalFormula = isMasterNumber(digitByDigitSumWithout9) ? formula : formula + '=' + masterValue;
        
        results.push({ 
          type: 'Suma dígito por dígito (omitiendo 9)', 
          value: masterValue, 
          formula: finalFormula + ' (omitiendo 9)'
        });
      }
    }
    
    // Método 3: Fecha completa como un solo número, omitiendo los 9
    const fullDateWithout9 = (day.padStart(2, '0') + month.padStart(2, '0') + year.padStart(4, '0')).replace(/9/g, '');
    if (fullDateWithout9.length > 0) {
      const fullDateNumWithout9 = parseInt(fullDateWithout9);
      const reducedFullDateWithout9 = reduceNumber(fullDateNumWithout9);
      
      if (isMasterNumber(fullDateNumWithout9)) {
        results.push({ 
          type: 'Fecha completa sin 9', 
          value: fullDateNumWithout9, 
          formula: `Fecha sin 9: ${fullDateWithout9} = ${fullDateNumWithout9}`
        });
      } else if (isMasterNumber(reducedFullDateWithout9)) {
        results.push({ 
          type: 'Fecha completa sin 9 (reducida)', 
          value: reducedFullDateWithout9, 
          formula: `Fecha sin 9: ${fullDateWithout9} → ${reducedFullDateWithout9}`
        });
      }
    }
    
    // Método 4: Sumar los componentes reducidos (con 9)
    const sumOfReducedComponents = reducedDay + reducedMonth + reducedYear;
    if (isMasterNumber(sumOfReducedComponents)) {
      results.push({ 
        type: 'Suma de componentes reducidos', 
        value: sumOfReducedComponents, 
        formula: `${reducedDay} + ${reducedMonth} + ${reducedYear} = ${sumOfReducedComponents}`
      });
    } else {
      const reducedSum = reduceNumber(sumOfReducedComponents);
      if (isMasterNumber(reducedSum)) {
        results.push({ 
          type: 'Suma de componentes reducidos (reducida)', 
          value: reducedSum, 
          formula: `${reducedDay} + ${reducedMonth} + ${reducedYear} = ${sumOfReducedComponents} → ${reducedSum}`
        });
      }
    }
    
    // Método 5: Sumar componentes reducidos (día y mes con 9, año sin 9)
    const sumWithYearWithout9 = reducedDay + reducedMonth + reducedYearWithout9;
    if (isMasterNumber(sumWithYearWithout9) && sumWithYearWithout9 !== sumOfReducedComponents) {
      results.push({ 
        type: 'Suma con año sin 9', 
        value: sumWithYearWithout9, 
        formula: `${reducedDay} + ${reducedMonth} + ${reducedYearWithout9} = ${sumWithYearWithout9}`
      });
    } else {
      const reducedSumWithYearWithout9 = reduceNumber(sumWithYearWithout9);
      if (isMasterNumber(reducedSumWithYearWithout9) && reducedSumWithYearWithout9 !== reduceNumber(sumOfReducedComponents)) {
        results.push({ 
          type: 'Suma con año sin 9 (reducida)', 
          value: reducedSumWithYearWithout9, 
          formula: `${reducedDay} + ${reducedMonth} + ${reducedYearWithout9} = ${sumWithYearWithout9} → ${reducedSumWithYearWithout9}`
        });
      }
    }
    
    // Método 6: Sumar todos los componentes reducidos sin 9
    const sumOfReducedComponentsWithout9 = reducedDayWithout9 + reducedMonthWithout9 + reducedYearWithout9;
    if (isMasterNumber(sumOfReducedComponentsWithout9) && 
        sumOfReducedComponentsWithout9 !== sumOfReducedComponents && 
        sumOfReducedComponentsWithout9 !== sumWithYearWithout9) {
      results.push({ 
        type: 'Suma de componentes reducidos sin 9', 
        value: sumOfReducedComponentsWithout9, 
        formula: `${reducedDayWithout9} + ${reducedMonthWithout9} + ${reducedYearWithout9} = ${sumOfReducedComponentsWithout9}`
      });
    } else {
      const reducedSumWithout9 = reduceNumber(sumOfReducedComponentsWithout9);
      if (isMasterNumber(reducedSumWithout9) && 
          reducedSumWithout9 !== reduceNumber(sumOfReducedComponents) && 
          reducedSumWithout9 !== reduceNumber(sumWithYearWithout9)) {
        results.push({ 
          type: 'Suma de componentes reducidos sin 9 (reducida)', 
          value: reducedSumWithout9, 
          formula: `${reducedDayWithout9} + ${reducedMonthWithout9} + ${reducedYearWithout9} = ${sumOfReducedComponentsWithout9} → ${reducedSumWithout9}`
        });
      }
    }
    
    // Añadir todos los números maestros del perfil numerológico
    const allNumbers = [
      { type: 'Propósito', value: numberResults.purposeNumber },
      { type: 'Mental', value: numberResults.mentalNumber },
      { type: 'Emocional', value: numberResults.emotionalNumber },
      { type: 'Trabajo', value: numberResults.workFamilyNumber },
      { type: 'Energético', value: numberResults.energeticNumber },
      { type: 'Masculino', value: numberResults.masculineNumber },
      { type: 'Femenino', value: numberResults.feminineNumber },
      { type: 'Personal', value: numberResults.personalityNumber },
      { type: 'Camino de Vida', value: numberResults.lifePathNumber },
      { type: 'Talento', value: numberResults.talentNumber },
      { type: 'Reto', value: numberResults.challengeNumber }
    ];
    
    allNumbers.forEach(num => {
      if (isMasterNumber(num.value)) {
        results.push(num);
      }
    });
    
    return results;
  };

  // Renderizado condicional de la información del número seleccionado
  const renderNumberInfo = () => {
    if (!selectedNumber && selectedNumber !== 0) {
      return (
        <div className="number-info">
          <h3>Selecciona un número para ver su significado</h3>
          {renderAllNumbers()}
        </div>
      );
    }

    const infoNumber = selectedNumber;
    const info = numerologyInfo[infoNumber];
    
    if (!info) return <p>No hay información disponible para este número.</p>;
    
    return (
      <div className="number-info">
        <h3>
          {getNumberTypeName(selectedNumberType)}: {selectedNumber}
        </h3>
        
        {info.centro && (
          <div className="info-section">
            <h4>Centro</h4>
            <p>{info.centro}</p>
          </div>
        )}
        
        {info.reto && (
          <div className="info-section">
            <h4>Reto</h4>
            <p>{info.reto}</p>
          </div>
        )}
        
        {info.arquetipo && (
          <div className="info-section">
            <h4>Arquetipo</h4>
            <p>{info.arquetipo}</p>
          </div>
        )}
        
        {info.energia && (
          <div className="info-section">
            <h4>Energía</h4>
            <p>{info.energia}</p>
          </div>
        )}
        
        {info.aprendizaje && (
          <div className="info-section">
            <h4>Aprendizaje</h4>
            <p>{info.aprendizaje}</p>
          </div>
        )}
        
        {info.edad && (
          <div className="info-section">
            <h4>Edad</h4>
            <p>{info.edad}</p>
          </div>
        )}
        
        {info.talentos && (
          <div className="info-section">
            <h4>Talentos</h4>
            <p>{info.talentos}</p>
          </div>
        )}
        
        {info.caminoDeVida && (
          <div className="info-section">
            <h4>Camino de Vida</h4>
            <p>{info.caminoDeVida}</p>
          </div>
        )}
        
        {info.proposito && (
          <div className="info-section">
            <h4>Propósito</h4>
            <p>{info.proposito}</p>
          </div>
        )}
        
        {info.mental && (
          <div className="info-section">
            <h4>Mental</h4>
            <p>{info.mental}</p>
          </div>
        )}
        
        {info.emocionalRelaciones && (
          <div className="info-section">
            <h4>Emocional/Relaciones</h4>
            <p>{info.emocionalRelaciones}</p>
          </div>
        )}
        
        {info.trabajo && (
          <div className="info-section">
            <h4>Trabajo</h4>
            <p>{info.trabajo}</p>
          </div>
        )}
        
        {info.familia && (
          <div className="info-section">
            <h4>Familia</h4>
            <p>{info.familia}</p>
          </div>
        )}
        
        {info.territorio && (
          <div className="info-section">
            <h4>Territorio</h4>
            <p>{info.territorio}</p>
          </div>
        )}
        
        {info.energetico && (
          <div className="info-section">
            <h4>Energético</h4>
            <p>{info.energetico}</p>
          </div>
        )}
        
        {info.creativo && (
          <div className="info-section">
            <h4>Creativo</h4>
            <p>{info.creativo}</p>
          </div>
        )}
        
        {info.sexual && (
          <div className="info-section">
            <h4>Sexual</h4>
            <p>{info.sexual}</p>
          </div>
        )}
        
        {info.conclusion && (
          <div className="info-section">
            <h4>Conclusión</h4>
            <p>{info.conclusion}</p>
          </div>
        )}
      </div>
    );
  };

  // Manejador de eventos para seleccionar un número
  const handleNumberSelect = (number, type) => {
    setSelectedNumber(number);
    setSelectedNumberType(type);
  };

  // Renderizar universo numérico
  const renderNumericalUniverse = () => {
    if (!numberResults) return null;
    
    return (
      <div className="numerical-universe">
        <h3>Universo Numérico</h3>
        <div className="universe-container">
          {/* Fila 1: Propósito y Camino de Vida */}
          <div className="universe-row">
            <div className="universe-item">
              <div 
                className="number-cell gold-bg"
                onClick={() => handleNumberSelect(numberResults.purposeNumber, 'purposeNumber')}
              >
                {reduceNumber(numberResults.purposeNumber)}
              </div>
              <span className="number-label">N° De Propósito</span>
            </div>
            
            <div className="universe-item">
              <div 
                className="number-cell turquoise-bg"
                onClick={() => handleNumberSelect(numberResults.lifePathNumber, 'lifePathNumber')}
              >
                {reduceNumber(numberResults.lifePathNumber)}
              </div>
              <span className="number-label">N° Camino De Vida</span>
            </div>
          </div>
          
          {/* Fila 2: Talento */}
          <div className="universe-row">
            <div className="universe-item">
              <div 
                className="number-cell turquoise-bg"
                onClick={() => handleNumberSelect(numberResults.talentNumber, 'talentNumber')}
              >
                {reduceNumber(numberResults.talentNumber)}
              </div>
              <span className="number-label">N° Talento</span>
            </div>
          </div>
          
          {/* Fila 3: Emocional y Mental */}
          <div className="universe-row">
            <div className="universe-item">
              <div 
                className="number-cell gold-bg"
                onClick={() => handleNumberSelect(reduceNumber(numberResults.emotionalNumber), 'emotionalNumber')}
              >
                {reduceNumber(numberResults.emotionalNumber)}
              </div>
              <span className="number-label">N° Emocional/Relaciones</span>
            </div>
            
            <div className="universe-item">
              <div 
                className="number-cell gold-bg"
                onClick={() => handleNumberSelect(reduceNumber(numberResults.mentalNumber), 'mentalNumber')}
              >
                {reduceNumber(numberResults.mentalNumber)}
              </div>
              <span className="number-label">N° Mental</span>
            </div>
          </div>
          
          {/* Fila 4: Femenino, Personal y Masculino */}
          <div className="universe-row">
            <div className="universe-item">
              <div 
                className="number-cell turquoise-bg"
                onClick={() => handleNumberSelect(numberResults.feminineNumber, 'feminineNumber')}
              >
                {reduceNumber(numberResults.feminineNumber)}
              </div>
              <span className="number-label">N° Energía Femenina</span>
            </div>
            
            <div className="universe-item">
              <div 
                className="number-cell turquoise-bg"
                onClick={() => handleNumberSelect(numberResults.personalityNumber, 'personalityNumber')}
              >
                {reduceNumber(numberResults.personalityNumber)}
              </div>
              <span className="number-label">N° Personal</span>
            </div>
            
            <div className="universe-item">
              <div 
                className="number-cell turquoise-bg"
                onClick={() => handleNumberSelect(numberResults.masculineNumber, 'masculineNumber')}
              >
                {reduceNumber(numberResults.masculineNumber)}
              </div>
              <span className="number-label">N° Energía Masculina</span>
            </div>
          </div>
          
          {/* Fila 5: Trabajo y Energético */}
          <div className="universe-row">
            <div className="universe-item">
              <div 
                className="number-cell gold-bg"
                onClick={() => handleNumberSelect(numberResults.workFamilyNumber, 'workFamilyNumber')}
              >
                {reduceNumber(numberResults.workFamilyNumber)}
              </div>
              <span className="number-label">N° Trabajo/Familia/Territorio</span>
            </div>
            
            <div className="universe-item">
              <div 
                className="number-cell gold-bg"
                onClick={() => handleNumberSelect(numberResults.energeticNumber, 'energeticNumber')}
              >
                {reduceNumber(numberResults.energeticNumber)}
              </div>
              <span className="number-label">N° Energético/Creativo/Sexual</span>
            </div>
          </div>
          
          {/* Fila 6: Alma */}
          <div className="universe-row">
            <div className="universe-item">
              <div 
                className="number-cell turquoise-bg"
                onClick={() => handleNumberSelect(numberResults.challengeNumber, 'challengeNumber')}
              >
                {reduceNumber(numberResults.challengeNumber)}
              </div>
              <span className="number-label">N° Reto</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Función para renderizar un valor numérico en el universo numérico (siempre reducido a una cifra)
  const renderUniverseNumber = (num) => {
    // Para el universo numérico, siempre reducimos a una cifra
    if (num === undefined || num === null) return '';
    try {
      return reduceNumber(num);
    } catch (error) {
      console.error("Error al reducir número:", error, "Número:", num);
      return '';
    }
  };

  // Renderizar un valor numérico con formato adecuado
  const renderNumberValue = (num, type) => {
    if (num === undefined || num === null) return <span className="result-value">-</span>;
    
    let className = "result-value";
    let displayValue = num;
    
    // Si es un número maestro, aplicar clase especial
    if (isMasterNumber(num)) {
      className += " master-number";
      // Para números maestros, mostrar el número maestro y su reducción
      if (type === 'generalYear' || type === 'personalYear' || type === 'vitalYear') {
        displayValue = `${num}/${reduceNumber(num)}`;
      }
    } else if ((type === 'workFamilyNumber' || type === 'energeticNumber') && num === 0) {
      className += " zero-value";
      displayValue = "0"; // Asegurarse de que el 0 se muestre como texto
    } else if (type === 'age') {
      className = "age-value"; 
      // Si es la edad actual, aplicar clase especial
      if (num === numberResults.age) {
        className += " current-age";
      }
    }
    
    // Si es un número 0, asegurarse de que se muestre como "0"
    if (num === 0) {
      displayValue = "0";
    }
    
    // Para todos los números
    return (
      <span 
        className={className} 
        onClick={() => handleNumberSelect(num, type)}
      >
        {displayValue}
      </span>
    );
  };

  // Componente para mostrar números en la tabla ideal
  const IdealTableNumber = ({ num, className, onClick }) => {
    return (
      <div 
        className={className}
        onClick={onClick}
      >
        {num === 0 ? "0" : num}
      </div>
    );
  };

  // Renderizar tabla ideal
  const renderIdealTable = () => {
    if (!numberResults || !numberResults.idealTable) return null;
    
    // Extraer datos para la tabla
    const idealNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const excessNumbers = idealNumbers.map(num => {
      const key = Object.keys(idealNumberMapping).find(k => idealNumberMapping[k] === num);
      return numberResults.idealTable[key]?.excess || 0;
    });
    const realNumbers = idealNumbers.map(num => {
      const key = Object.keys(idealNumberMapping).find(k => idealNumberMapping[k] === num);
      // Asegurarse de que el valor real sea 0 si no existe o es undefined
      return numberResults.idealTable[key]?.real !== undefined ? numberResults.idealTable[key].real : 0;
    });
    const missingNumbers = idealNumbers.map(num => {
      const key = Object.keys(idealNumberMapping).find(k => idealNumberMapping[k] === num);
      return numberResults.idealTable[key]?.missing || 0;
    });
    
    return (
      <div className="ideal-table">
        <h3>Tabla Ideal Numérica</h3>
        <div className="ideal-table-grid">
          <div className="table-row">
            <div className="table-label">Ideal:</div>
            {idealNumbers.map(num => (
              <IdealTableNumber 
                key={`ideal-${num}`} 
                num={num} 
                className="ideal-number clickable"
                onClick={() => handleNumberSelect(num, 'idealNumber')}
              />
            ))}
          </div>
          
          <div className="table-row">
            <div className="table-label">Exceso:</div>
            {excessNumbers.map((num, index) => (
              <IdealTableNumber 
                key={`excess-${index}`} 
                num={num} 
                className="excess-number clickable"
                onClick={() => handleNumberSelect(num, 'excessNumber')}
              />
            ))}
          </div>
          
          <div className="table-row">
            <div className="table-label">Real:</div>
            {realNumbers.map((num, index) => (
              <IdealTableNumber 
                key={`real-${index}`} 
                num={num} 
                className="real-number clickable"
                onClick={() => {
                  const key = Object.keys(idealNumberMapping).find(k => idealNumberMapping[k] === idealNumbers[index]);
                  handleNumberSelect(num, key);
                }}
              />
            ))}
          </div>
          
          <div className="table-row">
            <div className="table-label">Falta:</div>
            {missingNumbers.map((num, index) => (
              <IdealTableNumber 
                key={`missing-${index}`} 
                num={num} 
                className="missing-number clickable"
                onClick={() => handleNumberSelect(num, 'missingNumber')}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // Renderizar tabla de años
  const renderYearsTable = () => {
    if (!numberResults || !numberResults.years) return null;
    
    return (
      <div className="years-table-container">
        <h3 className="table-title">Tabla de Energía Anual</h3>
        <div className="years-table-grid">
          {/* Primera fila: Fechas */}
          <div className="table-header">Fecha</div>
          <div className="table-cell" data-type="year">
            {numberResults.years.previous.year}
          </div>
          <div className="table-cell current-year-column" data-type="year">
            {numberResults.years.current.year}
          </div>
          <div className="table-cell" data-type="year">
            {numberResults.years.next.year}
          </div>
          
          {/* Segunda fila: Edades */}
          <div className="table-header">Edad</div>
          <div className="table-cell">
            {renderNumberValue(numberResults.years.previous.age, 'age')}
          </div>
          <div className="table-cell current-year-column" data-type="age">
            {renderNumberValue(numberResults.years.current.age, 'age')}
          </div>
          <div className="table-cell">
            {renderNumberValue(numberResults.years.next.age, 'age')}
          </div>
          
          {/* Tercera fila: Año General */}
          <div className="table-header">Año<br/>General</div>
          <div className="table-cell clickable" data-type="number" onClick={() => handleNumberSelect(numberResults.years.previous.generalYear, 'generalYear')}>
            {renderNumberValue(numberResults.years.previous.generalYear, 'generalYear')}
          </div>
          <div className="table-cell clickable current-year-column" data-type="number" onClick={() => handleNumberSelect(numberResults.years.current.generalYear, 'generalYear')}>
            {renderNumberValue(numberResults.years.current.generalYear, 'generalYear')}
          </div>
          <div className="table-cell clickable" data-type="number" onClick={() => handleNumberSelect(numberResults.years.next.generalYear, 'generalYear')}>
            {renderNumberValue(numberResults.years.next.generalYear, 'generalYear')}
          </div>
          
          {/* Cuarta fila: Año Personal */}
          <div className="table-header">Año<br/>Personal</div>
          <div className="table-cell clickable" data-type="number" onClick={() => handleNumberSelect(numberResults.years.previous.personalYear, 'personalYear')}>
            {renderNumberValue(numberResults.years.previous.personalYear, 'personalYear')}
          </div>
          <div className="table-cell clickable current-year-column" data-type="number" onClick={() => handleNumberSelect(numberResults.years.current.personalYear, 'personalYear')}>
            {renderNumberValue(numberResults.years.current.personalYear, 'personalYear')}
          </div>
          <div className="table-cell clickable" data-type="number" onClick={() => handleNumberSelect(numberResults.years.next.personalYear, 'personalYear')}>
            {renderNumberValue(numberResults.years.next.personalYear, 'personalYear')}
          </div>
          
          {/* Quinta fila: Año Vital */}
          <div className="table-header">Año<br/>Vital</div>
          <div className="table-cell clickable" data-type="number" onClick={() => handleNumberSelect(numberResults.years.previous.vitalYear, 'vitalYear')}>
            {renderNumberValue(numberResults.years.previous.vitalYear, 'vitalYear')}
          </div>
          <div className="table-cell clickable current-year-column" data-type="number" onClick={() => handleNumberSelect(numberResults.years.current.vitalYear, 'vitalYear')}>
            {renderNumberValue(numberResults.years.current.vitalYear, 'vitalYear')}
          </div>
          <div className="table-cell clickable" data-type="number" onClick={() => handleNumberSelect(numberResults.years.next.vitalYear, 'vitalYear')}>
            {renderNumberValue(numberResults.years.next.vitalYear, 'vitalYear')}
          </div>
        </div>
      </div>
    );
  };
  
  // Renderizar tabla de etapas vitales
  const renderLifeStagesTable = () => {
    if (!numberResults || !numberResults.lifeStages) return null;
    
    return (
      <div className="life-stages-table">
        <h3 className="bold-title">Etapas Vitales</h3>
        <div className="life-stages-container">
          {/* Fila de etapas con círculos decorativos */}
          <div className="life-stages-row">
            <div className="life-stages-label">Etapas:</div>
            {Object.entries(numberResults.lifeStages).map(([stage, data], index) => {
              const stageNumber = parseInt(stage.replace('stage', ''));
              const startAge = stageNumber === 1 ? 0 : numberResults.lifeStages[`stage${stageNumber - 1}`].endAge + 1;
              const endAgeDisplay = data.endAge === null ? "<" : data.endAge;
              
              // Aplicar clase especial si es la etapa actual
              const circleClass = data.isCurrent ? "current-stage-circle" : "stage-circle";
              
              return (
                <div key={`stage-${stageNumber}`} className="life-stage-item">
                  <div className={circleClass}>
                    {startAge}/{endAgeDisplay}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Fila de oportunidades */}
          <div className="life-stages-row">
            <div className="life-stages-label">Oportunidades:</div>
            {Object.entries(numberResults.lifeStages).map(([stage, data], index) => {
              const stageNumber = parseInt(stage.replace('stage', ''));
              
              return (
                <div key={`opportunity-${stageNumber}`} className="life-stage-number">
                  <div 
                    className="opportunity-number"
                    onClick={() => handleNumberSelect(reduceNumber(data.opportunities), `stage${stageNumber}Opportunity`)}
                  >
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
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Línea divisoria */}
          <div className="life-stages-divider"></div>
          
          {/* Fila de retos */}
          <div className="life-stages-row">
            <div className="life-stages-label">Retos:</div>
            {Object.entries(numberResults.lifeStages).map(([stage, data], index) => {
              const stageNumber = parseInt(stage.replace('stage', ''));
              
              return (
                <div key={`challenge-${stageNumber}`} className="life-stage-number">
                  <div 
                    className="challenge-number"
                    onClick={() => handleNumberSelect(reduceNumber(data.challenges), `stage${stageNumber}Challenge`)}
                  >
                    {reduceNumber(data.challenges)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Renderizar fila horizontal de números clickeables
  const renderHorizontalNumbers = () => {
    // Números regulares del 0 al 9
    const regularNumbers = Array.from({ length: 10 }, (_, i) => i);
    // Números maestros
    const masterNumbers = [11, 22, 33, 44];
    // Todos los números significativos
    const significantNumbers = [...regularNumbers, ...masterNumbers];
    
    return (
      <div className="horizontal-numbers">
        {significantNumbers.map(num => (
          <div 
            key={`horizontal-number-${num}`}
            className={`horizontal-number ${masterNumbers.includes(num) ? 'master' : ''}`}
            onClick={() => handleNumberSelect(num, 'directNumber')}
          >
            {num}
          </div>
        ))}
      </div>
    );
  };

  // Renderizar todos los números del 0 al 44 para selección directa
  const renderAllNumbers = () => {
    // Números regulares del 0 al 9
    const regularNumbers = Array.from({ length: 10 }, (_, i) => i);
    // Números maestros
    const masterNumbers = [11, 22, 33, 44];
    
    return (
      <div className="all-numbers-container">
        <h3>Explorar significados de números</h3>
        
        <div className="numbers-section">
          <h4>Números Simples</h4>
          <div className="numbers-grid">
            {regularNumbers.map(num => (
              <div 
                key={`number-${num}`}
                className="number-circle"
                onClick={() => handleNumberSelect(num, 'directNumber')}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
        
        <div className="numbers-section">
          <h4>Números Maestros</h4>
          <div className="numbers-grid">
            {masterNumbers.map(num => (
              <div 
                key={`number-${num}`}
                className="number-circle master"
                onClick={() => handleNumberSelect(num, 'directNumber')}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Renderizar componentes de la fecha
  const renderDateComponents = () => {
    if (!calculated) return null;
    
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    
    // Método 1: Reducción tradicional
    const reducedDay = reduceNumber(dayNum);
    const reducedMonth = reduceNumber(monthNum);
    const reducedYear = reduceNumber(yearNum);
    
    // Método 2: Reducción omitiendo los 9 en cada componente
    const reducedDayWithout9 = reduceNumberWithout9(dayNum);
    const reducedMonthWithout9 = reduceNumberWithout9(monthNum);
    const reducedYearWithout9 = reduceNumberWithout9(yearNum);
    
    // Método 3: Eliminar todos los 9 de toda la fecha antes de sumar
    const allDigits = (day.padStart(2, '0') + month.padStart(2, '0') + year.padStart(4, '0')).split('');
    const allDigitsWithout9 = allDigits.filter(d => d !== '9');
    const fullDateSumWithout9 = allDigitsWithout9.length > 0 
      ? allDigitsWithout9.reduce((sum, digit) => sum + parseInt(digit), 0)
      : 0;
    const reducedFullDateWithout9 = reduceNumber(fullDateSumWithout9);
    
    const getDayComponent = () => {
      // Verificar si el número original es maestro
      if (isMasterNumber(dayNum)) return dayNum;
      
      // Método 1: Reducción tradicional
      if (isMasterNumber(reducedDay)) return reducedDay;
      
      // Método 2: Reducción omitiendo los 9
      if (isMasterNumber(reducedDayWithout9)) return reducedDayWithout9;
      
      // Si no hay número maestro, usar reducción tradicional
      return reducedDay;
    };
    
    const getMonthComponent = () => {
      // Verificar si el número original es maestro
      if (isMasterNumber(monthNum)) return monthNum;
      
      // Método 1: Reducción tradicional
      if (isMasterNumber(reducedMonth)) return reducedMonth;
      
      // Método 2: Reducción omitiendo los 9
      if (isMasterNumber(reducedMonthWithout9)) return reducedMonthWithout9;
      
      // Si no hay número maestro, usar reducción tradicional
      return reducedMonth;
    };
    
    const getYearComponent = () => {
      // Verificar si el número original es maestro
      if (isMasterNumber(yearNum)) return yearNum;
      
      // Método 1: Reducción tradicional
      if (isMasterNumber(reducedYear)) return reducedYear;
      
      // Método 2: Reducción omitiendo los 9
      if (isMasterNumber(reducedYearWithout9)) return reducedYearWithout9;
      
      // Si no hay número maestro, usar reducción tradicional
      return reducedYear;
    };
    
    // Obtener componentes aplicando los tres métodos
    const dayComponent = getDayComponent();
    const monthComponent = getMonthComponent();
    const yearComponent = getYearComponent();
    
    // Suma total de componentes (usando el método tradicional)
    const totalSum = dayComponent + monthComponent + yearComponent;
    
    // Para mostrar en la interfaz, usamos siempre la reducción tradicional
    let totalDisplay = totalSum;
    if (!isMasterNumber(totalSum)) {
      totalDisplay = reduceNumber(totalSum);
    }
    
    // Obtener números maestros ocultos para la sección desplegable
    const masterNumbers = getMasterNumbersInProfile();
    
    return (
      <div className="date-components-section">
        <h3>Componentes de la Fecha</h3>
        <div className="date-components-grid">
          <div className="date-component">
            <div className="date-component-label">Día:</div>
            <div className={`date-component-value ${isMasterNumber(dayComponent) ? 'master-number' : ''}`} 
                 onClick={() => isMasterNumber(dayComponent) && setSelectedNumber(dayComponent)}>
              {dayComponent}
            </div>
          </div>
          
          <div className="date-component">
            <div className="date-component-label">Mes:</div>
            <div className={`date-component-value ${isMasterNumber(monthComponent) ? 'master-number' : ''}`}
                 onClick={() => isMasterNumber(monthComponent) && setSelectedNumber(monthComponent)}>
              {monthComponent}
            </div>
          </div>
          
          <div className="date-component">
            <div className="date-component-label">Año:</div>
            <div className={`date-component-value ${isMasterNumber(yearComponent) ? 'master-number' : ''}`}
                 onClick={() => isMasterNumber(yearComponent) && setSelectedNumber(yearComponent)}>
              {yearComponent}
            </div>
          </div>
          
          <div className="date-component">
            <div className="date-component-label">Suma Total:</div>
            <div className={`date-component-value ${isMasterNumber(totalDisplay) ? 'master-number' : ''}`}
                 onClick={() => isMasterNumber(totalDisplay) && setSelectedNumber(totalDisplay)}>
              {totalDisplay}
            </div>
          </div>
        </div>
        
        {masterNumbers.length > 0 && (
          <div className="hidden-master-numbers">
            <details>
              <summary>
                <h4>Números Maestros Ocultos en la Fecha</h4>
              </summary>
              <div className="master-numbers-list">
                {masterNumbers
                  .filter(item => item.formula)
                  .filter((item, index, self) => 
                    index === self.findIndex(t => t.formula === item.formula)
                  )
                  .map((item, index) => (
                    <div key={index} className="hidden-master-formula">
                      <div className="formula">{item.formula}</div>
                      <div 
                        className={`master-number ${isMasterNumber(item.value) ? 'master-number' : ''}`}
                        onClick={() => setSelectedNumber(item.value)}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
              </div>
            </details>
          </div>
        )}
      </div>
    );
  };

  // Manejador de cambios en el input de día
  const handleDayChange = (e) => {
    const value = e.target.value;
    // Permitir solo números y limitar a 2 dígitos
    if (/^\d{0,2}$/.test(value)) {
      setDay(value);
    }
    // Mover al siguiente campo si ya hay 2 dígitos
    if (value.length === 2 && monthInputRef.current) {
      monthInputRef.current.focus();
    }
  };

  // Manejador de cambios en el input de mes
  const handleMonthChange = (e) => {
    const value = e.target.value;
    // Permitir solo números y limitar a 2 dígitos
    if (/^\d{0,2}$/.test(value)) {
      setMonth(value);
    }
    // Mover al siguiente campo si ya hay 2 dígitos
    if (value.length === 2 && yearInputRef.current) {
      yearInputRef.current.focus();
    }
  };

  // Manejador de cambios en el input de año
  const handleYearChange = (e) => {
    const value = e.target.value;
    // Permitir solo números y limitar a 4 dígitos
    if (/^\d{0,4}$/.test(value)) {
      setYear(value);
    }
  };

  // Manejador de la selección de fecha desde el calendario
  const handleDatePickerChange = (date) => {
    if (date) {
      setSelectedDate(date);
      setDay(date.getDate().toString().padStart(2, '0'));
      setMonth((date.getMonth() + 1).toString().padStart(2, '0'));
      setYear(date.getFullYear().toString());
    }
  };

  // Manejador de la tecla Enter en los campos de fecha
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  // Manejador para seleccionar todo el contenido del campo al hacer foco
  const handleFocus = (e) => {
    e.target.select();
  };

  // Manejador para guardar la fecha en el historial reciente
  const saveToRecentDates = () => {
    if (day && month && year) {
      const dateString = `${day}/${month}/${year}`;
      // Verificar si la fecha ya existe en el historial
      if (!recentDates.includes(dateString)) {
        // Limitar a 10 fechas recientes
        const updatedDates = [dateString, ...recentDates.slice(0, 9)];
        setRecentDates(updatedDates);
        // Guardar en localStorage para persistencia
        localStorage.setItem('recentDates', JSON.stringify(updatedDates));
      }
    }
  };

  // Cargar fechas recientes desde localStorage al iniciar
  useEffect(() => {
    const savedDates = localStorage.getItem('recentDates');
    if (savedDates) {
      setRecentDates(JSON.parse(savedDates));
    }
  }, []);

  // Obtener nombre descriptivo del tipo de número
  const getNumberTypeName = (type) => {
    const typeNames = {
      dayNumber: 'Número del Día',
      monthNumber: 'Número del Mes',
      yearNumber: 'Número del Año',
      lifePathNumber: 'Número del Camino de Vida',
      destinyNumber: 'Número del Destino',
      purposeNumber: 'Número del Propósito',
      mentalNumber: 'Número Mental',
      emotionalNumber: 'Número Emocional/Relaciones',
      workFamilyNumber: 'Número Trabajo/Familia/Territorio',
      energeticNumber: 'Número Energético/Creativo/Sexual',
      masculineNumber: 'Número de Energía Masculina',
      feminineNumber: 'Número de Energía Femenina',
      personalityNumber: 'Número de Personalidad',
      challengeNumber: 'Número de Reto',
      talentNumber: 'Número de Talento'
    };
    return typeNames[type] || 'Número';
  };

  // Función para ajustar el tamaño del canvas
  const resizeCanvas = () => {
    if (canvasRef.current && appContentRef.current) {
      const canvas = canvasRef.current;
      const container = appContentRef.current;
      
      canvas.width = container.scrollWidth;
      canvas.height = container.scrollHeight;
      
      // Restaurar configuración después de redimensionar
      if (ctxRef.current) {
        ctxRef.current.lineCap = 'round';
        ctxRef.current.lineJoin = 'round';
        ctxRef.current.strokeStyle = currentColor;
        ctxRef.current.lineWidth = lineWidth;
      }
    }
  };

  // Función para manejar el scroll
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  // Función para alternar el canvas de dibujo en blanco
  const toggleDrawingCanvas = () => {
    const newState = !showDrawingCanvas;
    setShowDrawingCanvas(newState);
    
    if (newState) {
      // Al activar, configuramos el canvas en el siguiente ciclo de renderizado
      setTimeout(() => {
        setupCanvas();
      }, 0);
    }
  };

  return (
    <div className="app" ref={appContentRef}>
      <header className="header">
        <h1>
          <Calculator size={24} />
          Calculadora de Numerología
        </h1>
      </header>
      
      <main className="main-content">
        <section className="input-section">
          <h2>Ingresa tu fecha de nacimiento</h2>
          
          <div className="date-inputs">
            <input
              ref={dayInputRef}
              type="text"
              placeholder="Día"
              value={day}
              onChange={handleDayChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              maxLength={2}
            />
            <input
              ref={monthInputRef}
              type="text"
              placeholder="Mes"
              value={month}
              onChange={handleMonthChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              maxLength={2}
            />
            <input
              ref={yearInputRef}
              type="text"
              placeholder="Año"
              value={year}
              onChange={handleYearChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              maxLength={4}
            />
            <div className="calendar-picker">
              <DatePicker
                selected={selectedDate}
                onChange={handleDatePickerChange}
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                yearDropdownItemNumber={100}
                scrollableYearDropdown
                locale="es"
                customInput={
                  <button className="calendar-button">
                    <Calendar size={18} />
                  </button>
                }
              />
            </div>
          </div>
          
          {recentDates.length > 0 && (
            <div className="recent-dates">
              <h4>Fechas recientes:</h4>
              <div className="date-history">
                {recentDates.map((date, index) => (
                  <button
                    key={index}
                    className="date-history-item"
                    onClick={() => {
                      const [d, m, y] = date.split('/');
                      setDay(d);
                      setMonth(m);
                      setYear(y);
                      setSelectedDate(new Date(`${y}-${m}-${d}`));
                    }}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <button className="calculate-btn" onClick={handleCalculate}>
            Calcular
          </button>
          
          {numberResults && (
            <div className="detailed-results">
              <div className="result-item">
                <span className="result-label">Edad:</span>
                {renderNumberValue(numberResults.age, 'age')}
              </div>
              <div className="result-item">
                <span className="result-label">N° Propósito:</span>
                {renderNumberValue(numberResults.purposeNumber, 'purposeNumber')}
              </div>
              <div className="result-item">
                <span className="result-label">N° Camino De Vida:</span>
                {renderNumberValue(numberResults.lifePathNumber, 'lifePathNumber')}
              </div>
              <div className="result-item">
                <span className="result-label">N° Mental:</span>
                {renderNumberValue(numberResults.mentalNumber, 'mentalNumber')}
              </div>
              <div className="result-item">
                <span className="result-label">N° Emocional Relaciones:</span>
                {renderNumberValue(numberResults.emotionalNumber, 'emotionalNumber')}
              </div>
              <div className="result-item">
                <span className="result-label">N° Trabajo Familia Territorio:</span>
                {renderNumberValue(numberResults.workFamilyNumber, 'workFamilyNumber')}
              </div>
              <div className="result-item">
                <span className="result-label">N° Energético Creativo Sexual:</span>
                {renderNumberValue(numberResults.energeticNumber, 'energeticNumber')}
              </div>
              <div className="result-item">
                <span className="result-label">N° Energía Masculina:</span>
                {renderNumberValue(numberResults.masculineNumber, 'masculineNumber')}
              </div>
              <div className="result-item">
                <span className="result-label">N° Personalidad:</span>
                {renderNumberValue(numberResults.personalityNumber, 'personalityNumber')}
              </div>
              <div className="result-item">
                <span className="result-label">N° Energía Femenina:</span>
                {renderNumberValue(numberResults.feminineNumber, 'feminineNumber')}
              </div>
            </div>
          )}
        </section>
        
        {calculated && (
          <section className="results-section">
            <div className="additional-sections">
              {renderDateComponents()}
              {renderNumericalUniverse()}
              {renderIdealTable()}
              {renderLifeStagesTable()}
              {renderYearsTable()}
            </div>
            
            <div className="full-width-container">
              {/* Fila horizontal de números clickeables */}
              <div className="horizontal-numbers-container">
                {renderHorizontalNumbers()}
              </div>
              
              {/* Sección de información de números */}
              <div className="info-container full-width">
                {renderNumberInfo()}
              </div>
            </div>
            
            {/* Canvas para dibujar */}
            {showDrawingTool && (
              <div className="floating-drawing-tool">
                <canvas
                  ref={canvasRef}
                  className="floating-canvas"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>
            )}
          </section>
        )}
      </main>
      
      {/* Botón flotante para activar la herramienta de dibujo */}
      <button 
        className="floating-draw-button"
        onClick={toggleDrawingTool}
      >
        {showDrawingTool ? <X size={24} /> : <PenLine size={24} />}
      </button>
      
      {/* Controles de dibujo */}
      {showDrawingTool && (
        <>
          <div className="floating-drawing-controls">
            <button
              className={`drawing-btn ${drawingTool === 'pen' ? 'active' : ''}`}
              onClick={() => setDrawingTool('pen')}
              title="Lápiz"
            >
              <PenLine size={28} />
            </button>
            
            <button
              className={`drawing-btn ${drawingTool === 'eraser' ? 'active' : ''}`}
              onClick={() => setDrawingTool('eraser')}
              title="Borrador"
            >
              <Eraser size={28} />
            </button>
            
            <button
              className={`drawing-btn ${drawingTool === 'laser' ? 'active' : ''}`}
              onClick={() => setDrawingTool('laser')}
              title="Puntero láser"
            >
              <span className="laser-icon">●</span>
            </button>
            
            <button
              className="drawing-btn"
              onClick={() => setShowColorPicker(!showColorPicker)}
              title="Cambiar color"
              style={{ backgroundColor: 'var(--color-turquoise-light)' }}
            >
              <div className="color-indicator" style={{ backgroundColor: currentColor }}></div>
            </button>
            
            <button
              className="drawing-btn"
              onClick={() => setShowLineWidthPicker(!showLineWidthPicker)}
              title="Cambiar grosor"
            >
              <PenLine size={28} />
            </button>
            
            <button
              className="drawing-btn"
              onClick={toggleDrawingCanvas}
              title="Abrir zona de dibujo"
            >
              <Square size={28} />
            </button>
            
            <button
              className="drawing-btn"
              onClick={clearCanvas}
              title="Limpiar todo"
            >
              <RotateCcw size={28} />
            </button>
            
            <button
              className="drawing-btn close-btn"
              onClick={toggleDrawingTool}
              title="Cerrar"
            >
              <X size={28} />
            </button>
          </div>
          
          {showColorPicker && (
            <div className="floating-color-picker">
              <div
                className={`color-option ${currentColor === '#4D96FF' ? 'active' : ''}`}
                style={{ backgroundColor: '#4D96FF' }}
                onClick={() => setCurrentColor('#4D96FF')}
                title="Azul"
              ></div>
              <div
                className={`color-option ${currentColor === '#FF6B6B' ? 'active' : ''}`}
                style={{ backgroundColor: '#FF6B6B' }}
                onClick={() => setCurrentColor('#FF6B6B')}
                title="Rojo"
              ></div>
              <div
                className={`color-option ${currentColor === '#5BBFB5' ? 'active' : ''}`}
                style={{ backgroundColor: '#5BBFB5' }}
                onClick={() => setCurrentColor('#5BBFB5')}
                title="Turquesa"
              ></div>
              <div
                className={`color-option ${currentColor === '#E6B54A' ? 'active' : ''}`}
                style={{ backgroundColor: '#E6B54A' }}
                onClick={() => setCurrentColor('#E6B54A')}
                title="Dorado"
              ></div>
              <div
                className={`color-option ${currentColor === '#9C6ADE' ? 'active' : ''}`}
                style={{ backgroundColor: '#9C6ADE' }}
                onClick={() => setCurrentColor('#9C6ADE')}
                title="Púrpura"
              ></div>
              <div
                className={`color-option ${currentColor === '#000000' ? 'active' : ''}`}
                style={{ backgroundColor: '#000000' }}
                onClick={() => setCurrentColor('#000000')}
                title="Negro"
              ></div>
            </div>
          )}
          
          {showLineWidthPicker && (
            <div className="floating-line-width-picker">
              <div
                className={`line-width-option ${lineWidth === 1 ? 'active' : ''}`}
                onClick={() => setLineWidth(1)}
                title="Muy fino"
              >
                <div className="line-width-preview" style={{ width: 1 }}></div>
              </div>
              <div
                className={`line-width-option ${lineWidth === 2 ? 'active' : ''}`}
                onClick={() => setLineWidth(2)}
                title="Fino"
              >
                <div className="line-width-preview" style={{ width: 2 }}></div>
              </div>
              <div
                className={`line-width-option ${lineWidth === 4 ? 'active' : ''}`}
                onClick={() => setLineWidth(4)}
                title="Normal"
              >
                <div className="line-width-preview" style={{ width: 4 }}></div>
              </div>
              <div
                className={`line-width-option ${lineWidth === 6 ? 'active' : ''}`}
                onClick={() => setLineWidth(6)}
                title="Grueso"
              >
                <div className="line-width-preview" style={{ width: 6 }}></div>
              </div>
              <div
                className={`line-width-option ${lineWidth === 8 ? 'active' : ''}`}
                onClick={() => setLineWidth(8)}
                title="Muy grueso"
              >
                <div className="line-width-preview" style={{ width: 8 }}></div>
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Canvas para dibujo en blanco */}
      {showDrawingCanvas && (
        <div className="drawing-canvas-overlay">
          <div className="drawing-canvas-container">
            <div className="drawing-canvas-header">
              <h3>Zona de dibujo</h3>
              <button className="close-canvas-btn" onClick={toggleDrawingCanvas}>
                <X size={24} />
              </button>
            </div>
            <div className="drawing-canvas-content">
              <canvas
                ref={blankCanvasRef}
                className="blank-drawing-canvas"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
              {/* Controles de dibujo para el canvas en blanco */}
              <div className="blank-canvas-controls">
                <button
                  className={`drawing-btn ${drawingTool === 'pen' ? 'active' : ''}`}
                  onClick={() => setDrawingTool('pen')}
                  title="Lápiz"
                >
                  <PenLine size={28} />
                </button>
                
                <button
                  className={`drawing-btn ${drawingTool === 'eraser' ? 'active' : ''}`}
                  onClick={() => setDrawingTool('eraser')}
                  title="Borrador"
                >
                  <Eraser size={28} />
                </button>
                
                <button
                  className={`drawing-btn ${drawingTool === 'laser' ? 'active' : ''}`}
                  onClick={() => setDrawingTool('laser')}
                  title="Puntero láser"
                >
                  <span className="laser-icon">●</span>
                </button>
                
                <button
                  className="drawing-btn"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  title="Cambiar color"
                  style={{ backgroundColor: 'var(--color-turquoise-light)' }}
                >
                  <div className="color-indicator" style={{ backgroundColor: currentColor }}></div>
                </button>
                
                <button
                  className="drawing-btn"
                  onClick={() => setShowLineWidthPicker(!showLineWidthPicker)}
                  title="Cambiar grosor"
                >
                  <PenLine size={28} />
                </button>
                
                <button
                  className="drawing-btn"
                  onClick={clearCanvas}
                  title="Limpiar todo"
                >
                  <RotateCcw size={28} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
