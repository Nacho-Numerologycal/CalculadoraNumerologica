import React from 'react';
import { X } from 'lucide-react';

const FloatingNumberInfo = ({ content, onClose }) => {
  if (!content) return null;

  return (
    <div className="floating-number-info">
      <button className="close-btn" onClick={onClose}>
        <X size={20} />
      </button>
      <div className="floating-content">
        {content}
      </div>
    </div>
  );
};

export default FloatingNumberInfo;
