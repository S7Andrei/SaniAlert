import React, { useState } from 'react';
import './IncluirDadosScreen.css';
import PocoArtesianoList from '../../components/incluirDados/PocoArtesianoList'; 
import FilterCardIncluir from "../../components/incluirDados/FilterCardIncluir"; 

interface IncluirDadosScreenProps {
  onNavigateToPocoDetails: () => void;
}

const IncluirDadosScreen: React.FC<IncluirDadosScreenProps> = ({ onNavigateToPocoDetails }) => {
  const [showPocos, setShowPocos] = useState(false);
  const [lastFilter, setLastFilter] = useState<{ cidade: string; bairro: string } | null>(null);

  const handleSearchPocos = (cidade: string, bairro: string) => {
    setShowPocos(true);
    setLastFilter({ cidade, bairro });
  };

  const handleClearPocos = () => {
    setShowPocos(false);
    setLastFilter(null);
  };

  return (
    <div className="incluir-dados-screen">
      <FilterCardIncluir onSearch={handleSearchPocos} onClear={handleClearPocos} />
      {showPocos && (
        <>
          <h2 className="pocos-header">Poços Artesianos</h2>
          <PocoArtesianoList onPocoClick={onNavigateToPocoDetails} />
        </>
      )}
    </div>
  );
};

export default IncluirDadosScreen;
