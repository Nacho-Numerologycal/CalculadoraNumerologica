import React, { useState, useRef, useEffect } from 'react';
import { Calculator, X, PenLine, Eraser, RotateCcw, Palette } from 'lucide-react';
import './App.css';
import { numerologyInfo, reduceNumber, subtractWithRules } from './numerologyData';

// Paleta de colores inspirada en tu imagen
const colors = {
  turquoise: "#7DD1C8",
  gold: "#D4B675",
  beige: "#F2E7D5",
  white: "#FFFFFF",
  lightBeige: "#FCF9F3",
  goldDark: "#C19F55",
  black: "#333333",
  red: "#E57373",
  blue: "#64B5F6",
  purple: "#BA68C8"
};

const App = () => {
  // Estados para la fecha de nacimiento
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  
  // Estados para los resultados y visualización
  const [numberResults, setNumberResults] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedNumberType, setSelectedNumberType] = useState(null);
  
  // Estados para herramienta de dibujo
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingTool, setDrawingTool] = useState('pen');
  const [currentColor, setCurrentColor] = useState(colors.black);
  const [brushSize, setBrushSize] = useState(3);
  
  // Referencias para el canvas
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const ctxRef = useRef(null);

  // Inicializar canvas y contexto
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      // Configurar el canvas para responder correctamente a diferentes dispositivos
      canvas.width = canvasContainerRef.current.offsetWidth;
      canvas.height = canvasContainerRef.current.offsetHeight || 500;
      
      // Configurar el contexto para dibujar
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
      ctxRef.current = ctx;
    }
  }, [numberResults, currentColor, brushSize]);

  // Cálculos numerológicos
  const calculateNumerology = () => {
    // Validar entrada
    if (!day || !month || !year || 
        isNaN(parseInt(day)) || isNaN(parseInt(month)) || isNaN(parseInt(year)) ||
        day < 1 || day > 31 || month < 1 || month > 12 || year < 1) {
      alert('Por favor, introduce una fecha válida');
      return;
    }

    // Calcular números principales
    const birthDay = parseInt(day);
    const birthMonth = parseInt(month);
    const birthYear = parseInt(year);

    // Número del día de nacimiento (valor directo)
    const dayNumber = reduceNumber(birthDay);
    
    // Número del mes de nacimiento (valor directo)
    const monthNumber = reduceNumber(birthMonth);
    
    // Número del año de nacimiento (suma y reducción)
    const yearNumber = reduceNumber(birthYear);
    
    // Número de la fecha completa (camino de vida)
    const lifePathNumber = reduceNumber(birthDay + birthMonth + birthYear);
    
    // Número de destino (suma de cada dígito de la fecha completa)
    const destinyNumber = reduceNumber(
      day.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0) +
      month.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0) +
      year.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
    );

    // Guardar resultados
    setNumberResults({
      dayNumber,
      monthNumber,
      yearNumber,
      lifePathNumber,
      destinyNumber
    });
    
    // Seleccionar el primer número por defecto
    setSelectedNumber(dayNumber);
    setSelectedNumberType('dayNumber');
    
    // Limpiar canvas después de un nuevo cálculo
    if (ctxRef.current) {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  // Funciones para el dibujo
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    
    const { offsetX, offsetY } = nativeEvent;
    
    if (drawingTool === 'pen') {
      ctxRef.current.lineTo(offsetX, offsetY);
      ctxRef.current.stroke();
    } else if (drawingTool === 'eraser') {
      // Configurar borrador
      ctxRef.current.globalCompositeOperation = 'destination-out';
      ctxRef.current.lineTo(offsetX, offsetY);
      ctxRef.current.stroke();
      // Restaurar para próximo dibujo
      ctxRef.current.globalCompositeOperation = 'source-over';
    }
  };

  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleToolChange = (tool) => {
    setDrawingTool(tool);
    
    if (tool === 'pen') {
      ctxRef.current.strokeStyle = currentColor;
      ctxRef.current.lineWidth = brushSize;
    } else if (tool === 'eraser') {
      ctxRef.current.strokeStyle = '#FFFFFF';
      ctxRef.current.lineWidth = brushSize * 2;
    }
  };

  const handleColorChange = (color) => {
    setCurrentColor(color);
    if (drawingTool === 'pen') {
      ctxRef.current.strokeStyle = color;
    }
  };

  const handleNumberSelect = (number, type) => {
    setSelectedNumber(number);
    setSelectedNumberType(type);
  };

  // Obtener nombre descriptivo del tipo de número
  const getNumberTypeName = (type) => {
    const typeNames = {
      dayNumber: 'Número del Día',
      monthNumber: 'Número del Mes',
      yearNumber: 'Número del Año',
      lifePathNumber: 'Número del Camino de Vida',
      destinyNumber: 'Número del Destino'
    };
    return typeNames[type] || 'Número';
  };

  // Renderizado condicional de la información del número seleccionado
  const renderNumberInfo = () => {
    if (!selectedNumber && selectedNumber !== 0) return null;
    
    const info = numerologyInfo[selectedNumber];
    if (!info) return <p>No hay información disponible para este número.</p>;
    
    return (
      <div className="number-info">
        <h3>{getNumberTypeName(selectedNumberType)}: {selectedNumber}</h3>
        
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

  return (
    <div className="app">
      <header className="header">
        <h1>
          <Calculator size={24} />
          Calculadora de Numerología
        </h1>
      </header>
      
      <div className="calculator-container">
        <section className="input-section">
          <h2>Ingresa tu fecha de nacimiento</h2>
          <div className="date-input">
            <input
              type="number"
              placeholder="Día (1-31)"
              min="1"
              max="31"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mes (1-12)"
              min="1"
              max="12"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <input
              type="number"
              placeholder="Año (ej. 1980)"
              min="1"
              max="9999"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <button className="calculate-btn" onClick={calculateNumerology}>
            Calcular
          </button>
        </section>
        
        {numberResults && (
          <section className="results-section">
            <h2>Tus Números Numerológicos</h2>
            <div className="number-results">
              <div className="number-grid">
                <div className="number-item">
                  <div 
                    className={`number-cell ${selectedNumberType === 'dayNumber' ? 'selected' : ''}`}
                    onClick={() => handleNumberSelect(numberResults.dayNumber, 'dayNumber')}
                  >
                    {numberResults.dayNumber}
                  </div>
                  <span className="number-label">Día</span>
                </div>
                
                <div className="number-item">
                  <div 
                    className={`number-cell ${selectedNumberType === 'monthNumber' ? 'selected' : ''}`}
                    onClick={() => handleNumberSelect(numberResults.monthNumber, 'monthNumber')}
                  >
                    {numberResults.monthNumber}
                  </div>
                  <span className="number-label">Mes</span>
                </div>
                
                <div className="number-item">
                  <div 
                    className={`number-cell ${selectedNumberType === 'yearNumber' ? 'selected' : ''}`}
                    onClick={() => handleNumberSelect(numberResults.yearNumber, 'yearNumber')}
                  >
                    {numberResults.yearNumber}
                  </div>
                  <span className="number-label">Año</span>
                </div>
                
                <div className="number-item">
                  <div 
                    className={`number-cell ${selectedNumberType === 'lifePathNumber' ? 'selected' : ''}`}
                    onClick={() => handleNumberSelect(numberResults.lifePathNumber, 'lifePathNumber')}
                  >
                    {numberResults.lifePathNumber}
                  </div>
                  <span className="number-label">Camino de Vida</span>
                </div>
                
                <div className="number-item">
                  <div 
                    className={`number-cell ${selectedNumberType === 'destinyNumber' ? 'selected' : ''}`}
                    onClick={() => handleNumberSelect(numberResults.destinyNumber, 'destinyNumber')}
                  >
                    {numberResults.destinyNumber}
                  </div>
                  <span className="number-label">Destino</span>
                </div>
              </div>
            </div>
            
            <div className="info-and-drawing-container">
              <div className="info-container">
                {renderNumberInfo()}
              </div>
              
              <div className="drawing-container">
                <div className="drawing-tools">
                  <button 
                    className={`tool-btn ${drawingTool === 'pen' ? 'active' : ''}`}
                    onClick={() => handleToolChange('pen')}
                    title="Lápiz"
                  >
                    <PenLine size={20} />
                  </button>
                  <button 
                    className={`tool-btn ${drawingTool === 'eraser' ? 'active' : ''}`}
                    onClick={() => handleToolChange('eraser')}
                    title="Borrador"
                  >
                    <Eraser size={20} />
                  </button>
                  <button 
                    className="tool-btn" 
                    onClick={clearCanvas}
                    title="Limpiar lienzo"
                  >
                    <RotateCcw size={20} />
                  </button>
                  
                  <div className="color-picker">
                    <Palette size={20} />
                    {Object.entries({
                      black: colors.black,
                      red: colors.red,
                      blue: colors.blue,
                      turquoise: colors.turquoise,
                      gold: colors.gold,
                      purple: colors.purple
                    }).map(([name, color]) => (
                      <div
                        key={name}
                        className={`color-option ${currentColor === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorChange(color)}
                        title={name.charAt(0).toUpperCase() + name.slice(1)}
                      />
                    ))}
                  </div>
                  
                  <div className="brush-size-control">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={brushSize}
                      onChange={(e) => setBrushSize(parseInt(e.target.value))}
                      title="Tamaño del pincel"
                    />
                  </div>
                </div>
                
                <div 
                  className="canvas-container"
                  ref={canvasContainerRef}
                  style={{ height: '500px' }}
                >
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={endDrawing}
                    onMouseLeave={endDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={endDrawing}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      
      <footer className="footer">
        <p> 2024 - Calculadora de Numerología</p>
      </footer>
    </div>
  );
};

export default App;
