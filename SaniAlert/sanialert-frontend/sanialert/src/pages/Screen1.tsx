import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCards, deleteCards, clearSelectedCards, selectAllCards } from '../store/cardSlice';
import Card from '../components/Card';
import CardForm from '../components/CardForm';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import './Screen1.css';

interface Screen1Props {
  pocoAddress?: string;
  onNavigateBack?: () => void; 
}

const Screen1: React.FC<Screen1Props> = ({ pocoAddress = 'Rua Malvino Gardin, nº 300', onNavigateBack }) => {
  const dispatch = useAppDispatch();
  const { cards, selectedCardIds, loading, error } = useAppSelector((state) => state.cards);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false); 

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(fetchCards()); 
  };

  const handleDeleteSelected = async () => {
    if (selectedCardIds.length > 0) {
      await dispatch(deleteCards(selectedCardIds));
      dispatch(clearSelectedCards());
      setShowDeleteToast(true);
      setShowSuccessToast(false);
    }
  };

  const handleToggleAll = () => {
    if (selectedCardIds.length === cards.length && cards.length > 0) {
      dispatch(clearSelectedCards());
    } else {
      dispatch(selectAllCards());
    }
  };

  return (
    <div className="screen1-container">
      {onNavigateBack && (
        <button onClick={onNavigateBack} className="btn btn-back">Voltar</button>
      )}
      <div className="poco-details-header">
        <h2>Poço: {pocoAddress}</h2>
        <hr className="divider" />
      </div>

      <div className="actions-bar">
        <button onClick={openModal} className="btn btn-primary">
          <span className="material-icons" style={{ fontSize: 18, verticalAlign: 'middle', marginRight: 6 }}>add</span>
          ADICIONAR ANÁLISE
        </button>
        <div className="actions-group">
          <div className="todos-checkbox-group">
            <span className="todos-label">Todos:</span>
            <input
              type="checkbox"
              checked={selectedCardIds.length === cards.length && cards.length > 0}
              onChange={handleToggleAll}
            />
            <span style={{ fontSize: 13, color: '#555' }}>{selectedCardIds.length}</span>
            |
          </div>
          {selectedCardIds.length > 0 && (
            <button onClick={handleDeleteSelected} className="btn btn-danger" title="Excluir Selecionados" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-icons" style={{ fontSize: 20, marginRight: 0 }}>delete</span>
            </button>
          )}
          {selectedCardIds.length > 0 && (
            <button onClick={() => dispatch(clearSelectedCards())} className="btn btn-secondary" title="Limpar Seleção">
              Limpar
            </button>
          )}
        </div>
      </div>

      <h3>Histórico de Análises</h3> 

      {loading && <p>Carregando cards...</p>}
      {error && <p>Erro ao carregar cards: {error}</p>}
      
      {!loading && !error && cards.length === 0 && (
        <p className="no-cards-message">Nenhuma análise cadastrada para este poço ainda.</p>
      )}

      <div className="cards-grid">
        {cards.map((card) => (
          <Card 
            key={card.id} 
            card={card} 
            selectable={true} 
          />
        ))}
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <CardForm 
            onClose={closeModal} 
            onSuccess={() => {
              setShowSuccessToast(true);
              setShowDeleteToast(false);
            }} 
          />
        </Modal>
      )}
      <Toast 
        message="Cards excluídos com sucesso!" 
        show={showDeleteToast} 
        onClose={() => setShowDeleteToast(false)} 
        type="success" 
      />
      <Toast 
        message="Card criado com sucesso!" 
        show={showSuccessToast} 
        onClose={() => setShowSuccessToast(false)} 
        type="success"
      />
    </div>
  );
};

export default Screen1;
