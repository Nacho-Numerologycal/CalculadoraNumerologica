// Función para verificar si un número es un número maestro
const isMasterNumber = (num) => {
  return num === 11 || num === 22 || num === 33 || num === 44;
};

// Función para renderizar un valor numérico con clase especial si es número maestro
const renderNumberValue = (num, type) => {
  if (num === undefined || num === null) return <span className="result-value">-</span>;
  
  let className = "result-value";
  
  if (isMasterNumber(num)) {
    className += " master-number";
  } else if (type === 'workFamilyNumber' && num === 0) {
    className += " zero-value";
  }
  
  return (
    <span 
      className={className} 
      onClick={() => handleNumberSelect(num, type)}
    >
      {num}
    </span>
  );
};

// Función para renderizar un valor numérico en el universo numérico (siempre reducido a una cifra)
const renderUniverseNumber = (num) => {
  // Para el universo numérico, siempre reducimos a una cifra
  if (num === undefined || num === null) return '';
  try {
    const reducedNum = reduceNumber(num);
    return reducedNum;
  } catch (error) {
    console.error("Error al reducir número:", error, "Número:", num);
    return '';
  }
};
