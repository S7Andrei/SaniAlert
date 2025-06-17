import React from 'react';
import './BairroCard.css';

interface Bairro {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
}

interface BairroCardProps {
  bairro: Bairro;
  onClick: () => void;
}

const BairroCard: React.FC<BairroCardProps> = ({ bairro, onClick }) => {
  return (
    <div className="bairro-card" onClick={onClick}>
      <img src={bairro.imagem} alt={bairro.nome} className="bairro-card-imagem" />
      <div className="bairro-card-conteudo">
        <h3>{bairro.nome}</h3>
        <p>{bairro.descricao}</p>
      </div>
    </div>
  );
};

export default BairroCard;
