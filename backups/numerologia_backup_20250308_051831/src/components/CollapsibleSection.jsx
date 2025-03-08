import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Íconos para indicar abierto/cerrado

const CollapsibleSection = ({ title, children, initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <div className="collapsible-section">
      <header 
        className="collapsible-header"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h3>{title}</h3>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </header>
      
      {isOpen && (
        <div className="collapsible-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;
