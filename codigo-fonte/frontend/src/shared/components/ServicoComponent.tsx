import React from 'react';

interface Servico {
  servicoId: number;
  nome: string;
  valor: number;
}

interface ServicoComponentProps {
  servico: Servico;
  onUpdate?: (novosDados: any) => void;
  onExcluir?: () => void;
}

const ServicoComponent: React.FC<ServicoComponentProps> = ({ servico, onUpdate, onExcluir }) => {
  return (
    <div>
      <h2>{servico.nome}</h2>
      <p>Valor: R$ {servico.valor}</p>
      {/* Renderizar os botões de edição apenas se onUpdate e onExcluir estiverem definidos */}
      {onUpdate && onExcluir && (
        <div>
          <button onClick={() => onUpdate({ nome: 'Novo Nome', valor: 999 })}>Editar</button>
          <button onClick={onExcluir}>Excluir</button>
        </div>
      )}
    </div>
  );
};

export default ServicoComponent;
