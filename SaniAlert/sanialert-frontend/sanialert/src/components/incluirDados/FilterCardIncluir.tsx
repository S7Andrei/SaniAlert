import React, { useState } from 'react';
import './FilterCardIncluir.css';

interface FilterCardIncluirProps {
  onSearch: (cidade: string, bairro: string) => void;
  onClear: () => void;
}

const FilterCardIncluir: React.FC<FilterCardIncluirProps> = ({ onSearch, onClear }) => {
  const [cidade, setCidade] = useState('Maringá');
  const [bairro, setBairro] = useState('Jardim Alvorada');

  const handleSearchClick = () => {
    onSearch(cidade, bairro);
  };

  const handleClearClick = () => {
    onClear(); 
  };

  return (
    <div className="filter-card-incluir">
      <div className="filter-card-incluir-header">
        <h3>Filtrar Poços Artesianos</h3>
      </div>
      <div className="filter-card-incluir-body">
        <div className="form-group-inline">
          <label htmlFor="cidade-incluir">Cidade</label>
          <select 
            id="cidade-incluir" 
            value={cidade} 
            onChange={(e) => setCidade(e.target.value)}
            disabled
          >
            <option value="Maringá">Maringá</option>
          </select>
        </div>
        <div className="form-group-inline">
          <label htmlFor="bairro-incluir">Bairro</label>
          <select 
            id="bairro-incluir" 
            value={bairro} 
            onChange={(e) => setBairro(e.target.value)}
            disabled
          >
            <option value="Jardim Alvorada">Jardim Alvorada</option>
          </select>
        </div>
        <div className="filter-actions-inline">
          <button onClick={handleSearchClick} className="btn-buscar-incluir">Buscar</button>
          <button onClick={handleClearClick} className="btn-limpar-incluir">Limpar</button> 
        </div>
      </div>
    </div>
  );
};

export default FilterCardIncluir;
