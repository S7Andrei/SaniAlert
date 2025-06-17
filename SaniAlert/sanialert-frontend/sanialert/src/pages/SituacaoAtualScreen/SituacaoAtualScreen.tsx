import React, { useState } from 'react';
import './SituacaoAtualScreen.css';
import BairroCard from '../../components/situacaoAtual/BairroCard';
import FilterBarSituacao from '../../components/situacaoAtual/FilterBarSituacao';
import jardimAlvoradaImage from '../../assets/jardim-alvorada.png'; 
import ZonaSete from '../../assets/ZonaSete.png';
import NovoCentro from '../../assets/NovoCentro.png';
import VilaOperaria from '../../assets/VilaOperaria.png';
import ParqueIndustrial from '../../assets/ParqueIndustrial.png';

interface SituacaoAtualScreenProps {
  onNavigateToSituacaoBairro: () => void;
}

const bairrosMock = [
  { id: '1', nome: 'Jardim Alvorada', descricao: 'Bairro tradicional com boa infraestrutura e áreas verdes.', imagem: jardimAlvoradaImage },
  { id: '2', nome: 'Zona 07', descricao: 'Região universitária com comércio vibrante.', imagem: ZonaSete },
  { id: '3', nome: 'Novo Centro', descricao: 'Área moderna com edifícios comerciais e residenciais.', imagem: NovoCentro },
  { id: '4', nome: 'Vila Operária', descricao: 'Bairro histórico com forte identidade comunitária.', imagem: VilaOperaria },
  { id: '5', nome: 'Parque Industrial', descricao: 'Polo industrial com diversas empresas e fácil acesso.', imagem: ParqueIndustrial },
];

const SituacaoAtualScreen: React.FC<SituacaoAtualScreenProps> = ({ onNavigateToSituacaoBairro }) => {
  const [selectedBairro, setSelectedBairro] = useState<string>('');

  const handleSearch = (_cidade: string, bairro: string) => {
    setSelectedBairro(bairro);
  };

  const handleClear = () => {
    setSelectedBairro('');
  };

  const filteredBairros = selectedBairro
    ? bairrosMock.filter(b => b.nome === selectedBairro)
    : bairrosMock;

  return (
    <div className="situacao-atual-screen">
      <FilterBarSituacao onSearch={handleSearch} onClear={handleClear} />
      <div className="bairros-grid">
        {filteredBairros.map(bairro => (
          <BairroCard 
            key={bairro.id} 
            bairro={bairro} 
            onClick={() => {
              if (bairro.nome === 'Jardim Alvorada') {
                onNavigateToSituacaoBairro();
              }
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export default SituacaoAtualScreen;
