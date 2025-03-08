import React, { useState, useRef, useEffect, useCallback } from 'react';

export const useDrawingTools = () => {
  // Estados para herramienta de dibujo
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingTool, setDrawingTool] = useState('laser'); // 'pen', 'eraser', o 'laser'
  const [currentColor, setCurrentColor] = useState('#FF6B6B'); // Rojo por defecto
  const [lineWidth, setLineWidth] = useState(8); // Grosor máximo por defecto
  const [showLineWidthPicker, setShowLineWidthPicker] = useState(false);
  const [laserTrail, setLaserTrail] = useState([]);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showDrawingTool, setShowDrawingTool] = useState(false);
  const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
  
  // Referencias para el canvas
  const canvasRef = useRef(null);
  const blankCanvasRef = useRef(null);
  const ctxRef = useRef(null);

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

  // Función para alternar el canvas en blanco
  const toggleDrawingCanvas = () => {
    const newState = !showDrawingCanvas;
    setShowDrawingCanvas(newState);
    
    // Si estamos abriendo el canvas en blanco, aseguramos que la herramienta de dibujo esté visible
    if (newState) {
      setShowDrawingTool(true);
      
      // Aseguramos que el selector de color y grosor estén cerrados al abrir el canvas
      setShowColorPicker(false);
      setShowLineWidthPicker(false);
    }
    
    // Limpiar la estela del láser al cambiar de modo
    setLaserTrail([]);
    
    // Configurar el nuevo canvas en el siguiente ciclo de renderizado
    setTimeout(() => {
      setupCanvas();
    }, 0);
  };
  
  // Configurar el canvas
  const setupCanvas = () => {
    if (!canvasRef.current && !blankCanvasRef.current) return;
    
    // Determinar qué canvas configurar
    const canvas = showDrawingCanvas ? blankCanvasRef.current : canvasRef.current;
    if (!canvas) return;
    
    // Configurar el tamaño del canvas para que cubra toda la ventana
    if (showDrawingCanvas) {
      // En modo ventana de dibujo en blanco, ajustar al contenedor
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight - 40; // Restar altura del header
    } else {
      // En modo normal, cubrir toda la ventana
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
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

    // Si estamos en modo ventana de dibujo en blanco, aplicar un fondo blanco
    if (showDrawingCanvas) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctxRef.current = ctx;
  };

  // Función para cambiar la herramienta de dibujo
  const changeDrawingTool = (tool) => {
    // Si seleccionamos el puntero láser, limpiar el canvas
    if (tool === 'laser' && drawingTool !== 'laser') {
      clearCanvas();
    }
    
    setDrawingTool(tool);
    setupCanvas();
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
    
    if (drawingTool === 'laser') {
      // Para el puntero láser, solo registramos la posición para la estela
      setLaserTrail(prevTrail => [...prevTrail, { x, y }]);
      
      // Limitar la longitud de la estela para que se desvanezca más rápido
      if (laserTrail.length > 10) { 
        setLaserTrail(prevTrail => prevTrail.slice(-10));
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
  };
  
  // Función para dibujar la estela del láser
  const drawLaserTrail = useCallback(() => {
    const canvas = showDrawingCanvas ? blankCanvasRef.current : canvasRef.current;
    if (!canvas || laserTrail.length === 0) return;
    
    const ctx = canvas.getContext('2d');
    
    // Limpiar el canvas para dibujar solo la estela
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
    
    // Limpiar también la estela del láser
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

  // Efecto para dibujar la estela del láser
  useEffect(() => {
    if (drawingTool === 'laser') {
      drawLaserTrail();
    }
  }, [drawingTool, laserTrail, drawLaserTrail]);

  // Efecto para manejar la estela del láser
  useEffect(() => {
    if (drawingTool === 'laser' && laserTrail.length > 0) {
      // Crear un intervalo para ir desvaneciendo la estela
      const fadeInterval = setInterval(() => {
        setLaserTrail(prevTrail => {
          if (prevTrail.length === 0) return prevTrail;
          // Eliminar el punto más antiguo de la estela
          const newTrail = [...prevTrail];
          newTrail.shift();
          return newTrail;
        });
      }, 50); // 50 ms para que se desvanezca más rápido
      
      return () => {
        clearInterval(fadeInterval);
      };
    }
  }, [drawingTool, laserTrail]);

  return {
    // Estados
    isDrawing,
    drawingTool,
    currentColor,
    lineWidth,
    showLineWidthPicker,
    laserTrail,
    showColorPicker,
    showDrawingTool,
    showDrawingCanvas,
    
    // Referencias
    canvasRef,
    blankCanvasRef,
    ctxRef,
    
    // Funciones
    hexToRgb,
    toggleDrawingTool,
    toggleDrawingCanvas,
    setupCanvas,
    changeDrawingTool,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    
    // Setters
    setCurrentColor,
    setLineWidth,
    setShowLineWidthPicker,
    setShowColorPicker
  };
};
