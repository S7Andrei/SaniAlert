import React, { useState } from "react";
import type { CardDTO } from "../types/card";
import {
  ParameterQualityDescription,
  WaterQualityStatusDescription,
} from "../types/card";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleCardSelection } from "../store/cardSlice";
import Modal from "./Modal"; 
import "./Card.css";

interface CardProps {
  card: CardDTO;
  highlighted?: boolean;
  selectable?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Card: React.FC<CardProps> = ({
  card,
  highlighted = false,
  selectable = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  const dispatch = useAppDispatch();
  const selectedCardIds = useAppSelector(
    (state) => state.cards.selectedCardIds
  );
  const isSelected = selectedCardIds.includes(card.id);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const truncateName = (name: string, maxLength: number) => {
    const nameWithoutSpaces = name.replace(/\s/g, '');
    if (nameWithoutSpaces.length > maxLength) {
      let currentLength = 0;
      let truncatedName = '';
      for (let i = 0; i < name.length; i++) {
        if (name[i] !== ' ') {
          currentLength++;
        }
        if (currentLength <= maxLength) {
          truncatedName += name[i];
        } else {
          break;
        }
      }
      return truncatedName.trimEnd() + '...';
    }
    return name;
  };

  const handleToggleSelection = () => {
    if (selectable) {
      dispatch(toggleCardSelection(card.id));
    }
  };

  const getQualityColor = (quality: string): string => {
    switch (quality) {
      case "GOOD":
        return "green";
      case "REGULAR":
        return "orange";
      case "CRITICAL":
        return "red";
      default:
        return "gray";
    }
  };

  const dateFormatted = card.date.split('-').reverse().join('/');

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`card ${highlighted ? "highlighted" : ""} ${
        isSelected ? "selected" : ""
      }`}
      onClick={selectable ? handleToggleSelection : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {selectable && (
        <div className="card-checkbox-date-group">
          <span className="card-date-screen1">{dateFormatted}</span>
          <div className="card-checkbox">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleToggleSelection}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
      <div className="card-header">
        <h3 title={card.technicalResponsible}>{truncateName(card.technicalResponsible, 16)}</h3>
        {!selectable && (
          <span className={highlighted ? "card-date-highlighted" : "card-date-screen1"}>
            {dateFormatted}
          </span>
        )}
      </div>
      <div className="card-body">
        <div className="parameter">
          <span className="parameter-label">pH:</span>
          <span className="parameter-value">{card.ph}</span>
          <span
            className="parameter-quality"
            style={{ color: getQualityColor(card.phQuality) }}
          >
            {ParameterQualityDescription[card.phQuality]}
          </span>
        </div>

        <div className="parameter">
          <span className="parameter-label">Turbidez:</span>
          <span className="parameter-value">{card.turbidity}</span>
          <span
            className="parameter-quality"
            style={{ color: getQualityColor(card.turbidityQuality) }}
          >
            {ParameterQualityDescription[card.turbidityQuality]}
          </span>
        </div>

        <div className="parameter">
          <span className="parameter-label">Oxigênio Dissolvido:</span>
          <span className="parameter-value">{card.dissolvedOxygen}</span>
          <span
            className="parameter-quality"
            style={{ color: getQualityColor(card.dissolvedOxygenQuality) }}
          >
            {ParameterQualityDescription[card.dissolvedOxygenQuality]}
          </span>
        </div>

        <div className="parameter">
          <span className="parameter-label">Metais Pesados:</span>
          <span className="parameter-value">
            {card.heavyMetalsPresent ? "Sim" : "Não"}
            {card.heavyMetalsPresent &&
              card.heavyMetalsLevel !== undefined &&
              ` (${card.heavyMetalsLevel})`}
          </span>
          <span
            className="parameter-quality"
            style={{ color: getQualityColor(card.heavyMetalsQuality) }}
          >
            {ParameterQualityDescription[card.heavyMetalsQuality]}
          </span>
        </div>
        <div className="parameter">
          <span className="parameter-label" style={{ display: 'flex', alignItems: 'center' }}>
            Resíduos:
            {card.residuesDetected && (
              <button
                onClick={openModal} 
                style={{
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  padding: '0',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  verticalAlign: 'middle',
                  marginLeft: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                i
              </button>
            )}
          </span>
          <span className="parameter-value">
            {card.residuesDetected ? "Sim" : "Não"}
          </span>
          <span
            className="parameter-quality"
            style={{ color: getQualityColor(card.residuesQuality) }}
          >
            {ParameterQualityDescription[card.residuesQuality]}
          </span>
        </div>
      </div>

      <div
        className="card-footer"
        style={{ backgroundColor: getQualityColor(card.status) }}
      >
        <span className="status-label">Situação:</span>
        <span className="status-value">
          {WaterQualityStatusDescription[card.status]}
        </span>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="card-details-modal-content">
          <h2>Detalhes da Coleta</h2>
          <div className="modal-info-grid">
            <div className="modal-info-item">
              <strong>Responsável Técnico:</strong>
              <p>{card.technicalResponsible}</p>
            </div>
            <div className="modal-info-item">
              <strong>Data da Coleta:</strong>
              <p>{dateFormatted}</p>
            </div>
            <div className="modal-info-item modal-info-item-residues">
              <strong>Resíduos Detectados:</strong>
              <p>{card.residuesDetected ? "Sim" : "Não"}</p>
            </div>
          </div>
          <div className="modal-description-section">
            <h3>Descrição dos Resíduos:</h3>
            <p>{card.description || "Nenhuma descrição disponível."}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Card;
