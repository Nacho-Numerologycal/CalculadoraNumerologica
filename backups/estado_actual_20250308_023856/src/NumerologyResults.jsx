import React from 'react';
import CollapsibleSection from './CollapsibleSection';

const NumerologyResults = ({
  numberResults,
  renderNumberValue,
  renderDateComponents,
  renderNumericalUniverse,
  renderIdealTable,
  renderLifeStagesTable,
  renderYearsTable,
  renderHorizontalNumbers,
  renderNumberInfo,
  showDrawingTool,
  showDrawingCanvas,
  canvasRef,
  handleNumberSelect
}) => {
  if (!numberResults) return null;

  return (
    <section className="results-section">
      <CollapsibleSection title="Resultados Detallados" initialOpen={true}>
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
      </CollapsibleSection>

      <div className="additional-sections">
        <CollapsibleSection title="Componentes de la Fecha" initialOpen={true}>
          {renderDateComponents()}
        </CollapsibleSection>
        
        <CollapsibleSection title="Universo Numérico" initialOpen={true}>
          {renderNumericalUniverse()}
        </CollapsibleSection>
        
        <CollapsibleSection title="Tabla Ideal Numérica" initialOpen={true}>
          {renderIdealTable()}
        </CollapsibleSection>
        
        <CollapsibleSection title="Tabla Etapas Vitales" initialOpen={true}>
          {renderLifeStagesTable()}
        </CollapsibleSection>
        
        <CollapsibleSection title="Tabla de Energía Anual" initialOpen={true}>
          {renderYearsTable()}
        </CollapsibleSection>
      </div>
      
      <div className="full-width-container">
        {/* Fila horizontal de números clickeables */}
        <CollapsibleSection title="Números Clickeables" initialOpen={true}>
          <div className="horizontal-numbers-container">
            {renderHorizontalNumbers()}
          </div>
        </CollapsibleSection>
        
        {/* Sección de información de números */}
        <CollapsibleSection title="Información de Números" initialOpen={true}>
          <div className="info-container full-width">
            {renderNumberInfo()}
          </div>
        </CollapsibleSection>
      </div>
      
      {/* Canvas para dibujar */}
      {(showDrawingTool || showDrawingCanvas) && (
        <div className="floating-drawing-tool">
          <canvas
            ref={canvasRef}
            className="floating-canvas"
          />
        </div>
      )}
    </section>
  );
};

export default NumerologyResults;
