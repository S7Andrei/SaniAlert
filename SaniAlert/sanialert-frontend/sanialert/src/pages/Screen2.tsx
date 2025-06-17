import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchMostRecentCard, fetchOtherCards } from '../store/cardSlice';
import Card from '../components/Card';
import './Screen2.css';
import JardimAlvoradaPic from '../assets/JardimAlvoradaPic.png'; 

interface Screen2Props {
  bairroName?: string; 
  onNavigateBack?: () => void; 
}

const Screen2: React.FC<Screen2Props> = ({ bairroName = 'Jardim Alvorada', onNavigateBack }) => {
  const dispatch = useAppDispatch();
  const { mostRecentCard, otherCards, loading, error } = useAppSelector((state) => state.cards);

  useEffect(() => {
    dispatch(fetchMostRecentCard());
    dispatch(fetchOtherCards());
  }, [dispatch]);

  const displayedHighlightedCard = mostRecentCard;
  const displayedOtherCards = mostRecentCard 
    ? otherCards.filter(card => card.id !== mostRecentCard.id)
    : otherCards;

  return (
    <div className="screen2-container">
      <div className="screen2-header-row">
        {onNavigateBack && (
          <button onClick={onNavigateBack} className="btn btn-back-situacao">Voltar</button>
        )}
        <h2 className="screen2-title">
          Situação da Água: 
          <br/> <span className="screen2-bairro-name">{bairroName}: (R. Malvino Gardin)</span>
        </h2>
      </div>
      {loading && <p>Carregando dados de monitoramento...</p>}
      {error && <p>Erro ao carregar dados: {error}</p>}

      {!loading && !error && !mostRecentCard && (
        <p className="no-data-message">Nenhum dado de monitoramento disponível para este bairro.</p>
      )}

      {!loading && !error && mostRecentCard && (
        <div className="monitoring-layout">
          <div className="map-section">
            <img src={JardimAlvoradaPic} alt={`Mapa de ${bairroName}`} className="map-image" />
          </div>
          <div className="highlighted-card-section">
            {displayedHighlightedCard && (
              <div className="highlighted-card-wrapper">
                <h3>Análise Recente</h3>
                <Card card={displayedHighlightedCard} highlighted={true} />
              </div>
            )}
          </div>
        </div>
      )}

      {!loading && !error && displayedOtherCards.length > 0 && (
        <div className="other-cards-section">
          <h4>Histórico de Análises Anteriores</h4>
          <div className="other-cards-grid">
            {displayedOtherCards.map((card) => (
              <Card 
                key={card.id} 
                card={card} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Screen2;
