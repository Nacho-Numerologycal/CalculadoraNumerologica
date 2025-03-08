import React, { useEffect, useRef } from 'react';
import { X, PenLine, Eraser, RotateCcw, Square } from 'lucide-react';

const DrawingTools = ({
  showDrawingTool,
  showDrawingCanvas,
  toggleDrawingTool,
  toggleDrawingCanvas,
  drawingTool,
  changeDrawingTool,
  currentColor,
  setShowColorPicker,
  showColorPicker,
  setCurrentColor,
  lineWidth,
  setLineWidth,
  showLineWidthPicker,
  setShowLineWidthPicker,
  clearCanvas,
  canvasRef,
  blankCanvasRef,
  startDrawing,
  draw,
  stopDrawing
}) => {
  // Función para convertir hexadecimal a RGB
  const hexToRgb = (hex) => {
    // Eliminar el # si está presente
    hex = hex.replace('#', '');
    
    // Convertir a RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  };

  // Colores predefinidos para el selector
  const predefinedColors = [
    "#FF6B6B", // Rojo
    "#4D96FF", // Azul
    "#7DD1C8", // Turquesa
    "#F0C987", // Dorado
    "#BA68C8", // Púrpura
    "#4CAF50", // Verde
    "#FFEB3B", // Amarillo
    "#FF9800", // Naranja
    "#000000", // Negro
    "#FFFFFF"  // Blanco
  ];

  return (
    <>
      {/* Canvas para dibujar */}
      {(showDrawingTool || showDrawingCanvas) && (
        <div className="floating-drawing-tool">
          <canvas
            ref={showDrawingCanvas ? blankCanvasRef : canvasRef}
            className="floating-canvas"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      )}
      
      {/* Botón flotante para activar la herramienta de dibujo */}
      <button 
        className="floating-draw-button"
        onClick={toggleDrawingTool}
      >
        {showDrawingTool ? <X size={24} /> : <PenLine size={24} />}
      </button>
      
      {/* Controles de dibujo */}
      {(showDrawingTool || showDrawingCanvas) && (
        <>
          <div className={`floating-drawing-controls ${showDrawingCanvas ? 'in-blank-canvas' : ''}`}>
            <button
              className={`drawing-btn ${drawingTool === 'pen' ? 'active' : ''}`}
              onClick={() => changeDrawingTool('pen')}
              title="Lápiz"
            >
              <PenLine size={24} />
            </button>
            
            <button
              className={`drawing-btn ${drawingTool === 'eraser' ? 'active' : ''}`}
              onClick={() => changeDrawingTool('eraser')}
              title="Borrador"
            >
              <Eraser size={24} />
            </button>
            
            <button
              className={`drawing-btn ${drawingTool === 'laser' ? 'active' : ''}`}
              onClick={() => changeDrawingTool('laser')}
              title="Puntero láser"
            >
              <span className="laser-icon">●</span>
            </button>
            
            <button
              className="drawing-btn color-btn"
              onClick={() => setShowColorPicker(!showColorPicker)}
              title="Cambiar color"
            >
              <div className="color-indicator" style={{ backgroundColor: currentColor }}></div>
            </button>
            
            <button
              className="drawing-btn"
              onClick={() => setShowLineWidthPicker(!showLineWidthPicker)}
              title="Cambiar grosor"
            >
              <PenLine size={24} />
            </button>
            
            <button
              className="drawing-btn"
              onClick={clearCanvas}
              title="Limpiar todo"
            >
              <RotateCcw size={24} />
            </button>
            
            {!showDrawingCanvas && (
              <button
                className="drawing-btn"
                onClick={toggleDrawingCanvas}
                title="Zona de dibujo en blanco"
              >
                <Square size={24} />
              </button>
            )}
          </div>
          
          {/* Selector de colores */}
          {showColorPicker && (
            <div className="color-picker">
              {predefinedColors.map((color, index) => (
                <div
                  key={index}
                  className={`color-option ${color === currentColor ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setCurrentColor(color);
                    setShowColorPicker(false);
                  }}
                ></div>
              ))}
            </div>
          )}
          
          {/* Selector de grosor de línea */}
          {showLineWidthPicker && (
            <div className="line-width-picker">
              {[2, 4, 6, 8].map((width) => (
                <div
                  key={width}
                  className={`line-width-option ${width === lineWidth ? 'selected' : ''}`}
                  onClick={() => {
                    setLineWidth(width);
                    setShowLineWidthPicker(false);
                  }}
                >
                  <div 
                    className="line-width-preview" 
                    style={{ 
                      height: `${width}px`,
                      backgroundColor: currentColor
                    }}
                  ></div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default DrawingTools;
