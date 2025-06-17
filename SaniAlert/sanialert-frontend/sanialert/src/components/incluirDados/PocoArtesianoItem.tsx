import React from 'react';
import './PocoArtesianoItem.css';

interface PocoArtesianoData {
  id: string;
  nomeRua: string;
  numero: string;
  proximoA: string;
  descricaoUso: string;
  linkIcon?: string;
}

interface PocoArtesianoItemProps {
  poco: PocoArtesianoData;
  onIconClick: () => void;
  isClickable: boolean;
}

const PocoArtesianoItem: React.FC<PocoArtesianoItemProps> = ({ poco, onIconClick, isClickable }) => {
  return (
    <div className={`poco-artesiano-item ${isClickable ? 'clickable' : ''}`}>
      <div className="poco-info">
        <h4>
          {poco.nomeRua}, {poco.numero}
          {poco.linkIcon && (
            <span 
              className={`link-icon ${isClickable ? 'active' : ''}`}
              onClick={isClickable ? onIconClick : undefined}
              role={isClickable ? "button" : undefined}
              tabIndex={isClickable ? 0 : -1}
            >
              <span className="material-icons">{poco.linkIcon}</span>
            </span>
          )}
        </h4>
        <p className="proximo-a"><span className="material-icons" style={{fontSize: '16px', verticalAlign: 'middle', marginRight: '4px', color: '#e74c3c'}}>place</span>{poco.proximoA}</p>
        <p className="descricao-uso"><span className="material-icons" style={{fontSize: '16px', verticalAlign: 'middle', marginRight: '4px', color: '#3498db'}}>water_drop</span>{poco.descricaoUso}</p>
      </div>
    </div>
  );
};

export default PocoArtesianoItem;
