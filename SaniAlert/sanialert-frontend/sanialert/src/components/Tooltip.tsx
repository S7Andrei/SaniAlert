import React from 'react';
import './Tooltip.css';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  show: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, show }) => {
  return (
    <div className="tooltip-container">
      {children}
      {show && text && (
        <div className="tooltip-text">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
