import React, { useState } from 'react';
import './FilterBarSituacao.css';

interface FilterBarSituacaoProps {
  onSearch: (cidade: string, bairro: string) => void;
  onClear: () => void;
}

const FilterBarSituacao: React.FC<FilterBarSituacaoProps> = ({ onSearch, onClear }) => {
  const [cidade, setCidade] = useState('Maringá');
  const [bairro, setBairro] = useState('');

  const handleSearchClick = () => {
    onSearch(cidade, bairro);
  };

  const handleClearClick = () => {
    setBairro('');
    onClear();
  };

  return (
    <div className="filter-bar-situacao">
      <div className="filter-group">
        <label htmlFor="cidade-situacao">Cidade</label>
        <select 
          id="cidade-situacao" 
          value={cidade} 
          onChange={(e) => setCidade(e.target.value)}
          disabled 
        >
          <option value="Maringá">Maringá</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="bairro-situacao">Bairro</label>
        <select id="bairro-situacao" value={bairro} onChange={(e) => setBairro(e.target.value)}>
          <option value="">Todos</option>
          <option value="Jardim Alvorada">Jardim Alvorada</option>
        </select>
      </div>
      <div className="filter-actions">
        <button onClick={handleSearchClick} className="btn-buscar">Buscar</button>
        <button onClick={handleClearClick} className="btn-limpar">Limpar</button>
      </div>
    </div>
  );
};

export default FilterBarSituacao;
