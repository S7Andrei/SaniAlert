import React from 'react';
import './PocoArtesianoList.css';
import PocoArtesianoItem from './PocoArtesianoItem';

interface PocoArtesianoData {
  id: string;
  nomeRua: string;
  numero: string;
  proximoA: string;
  descricaoUso: string;
  linkIcon?: string;
}

const pocosData: PocoArtesianoData[] = [
  {
    id: '1',
    nomeRua: 'Rua Malvino Gardin',
    numero: '300',
    proximoA: 'Próximo à Unidade Básica de Saúde Jardim Alvorada III',
    descricaoUso: 'Poço artesiano usado para abastecimento emergencial e rega de hortas comunitárias.',
    linkIcon: 'open_in_new' 
  },
  {
    id: '2',
    nomeRua: 'Rua Vítor do Amaral',
    numero: '512',
    proximoA: 'Atrás da Escola Municipal Gabriel Sampaio',
    descricaoUso: 'Poço perfurado para fins escolares e irrigação da área verde.',
    linkIcon: 'open_in_new'
  },
  {
    id: '3',
    nomeRua: 'Praça Ouro Preto',
    numero: 'centro da praça',
    proximoA: 'Área pública de lazer com campo e parquinho',
    descricaoUso: 'Poço utilizado para fonte e manutenção de plantas e jardins.',
    linkIcon: 'open_in_new'
  },
  {
    id: '4',
    nomeRua: 'Avenida Pedro Taques',
    numero: '2300 (condomínio popular)',
    proximoA: 'Conjunto habitacional no limite norte do bairro',
    descricaoUso: 'Poço artesiano comunitário para suporte em períodos de estiagem.',
    linkIcon: 'open_in_new'
  },
  {
    id: '5',
    nomeRua: 'Rua Cezar Lattes',
    numero: 'próximo ao nº 410',
    proximoA: 'Em um terreno de igreja ou associação comunitária',
    descricaoUso: 'Poço usado para fins comunitários e sociais, incluindo lavagem e jardinagem.',
    linkIcon: 'open_in_new'
  },
  {
    id: '6',
    nomeRua: 'Alameda João Paulino',
    numero: 'esquina com Rua Hipócrates',
    proximoA: 'Terreno baldio da prefeitura adaptado para projeto ambiental',
    descricaoUso: 'Poço para uso em estufas e horta comunitária de reeducação ambiental.',
    linkIcon: 'open_in_new'
  },
];

interface PocoArtesianoListProps {
  onPocoClick: (pocoId: string) => void;
}

const PocoArtesianoList: React.FC<PocoArtesianoListProps> = ({ onPocoClick }) => {
  return (
    <div className="poco-artesiano-list-container">
      <div className="poco-artesiano-list">
        {pocosData.map(poco => (
          <PocoArtesianoItem 
            key={poco.id} 
            poco={poco} 
            onIconClick={() => {
              if (poco.id === '1') { 
                onPocoClick(poco.id);
              }
            }}
            isClickable={poco.id === '1'}
          />
        ))}
      </div>
    </div>
  );
};

export default PocoArtesianoList;
