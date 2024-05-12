import React, { useState } from 'react';

interface Servico {
  servicoId: number;
  nome: string;
  valor: number;
}

interface ServicoComponentProps {
  servico?: Servico; // Agora servico é opcional
  onUpdate?: (novosDados: Servico) => void;
  onExcluir?: () => void;
  onAdicionar?: () => void; // Novo prop para adicionar serviço
}

const ServicoComponent: React.FC<ServicoComponentProps> = ({ servico, onUpdate, onExcluir, onAdicionar }) => {
  const [adicionando, setAdicionando] = useState(false); // Estado para rastrear se estamos adicionando um novo serviço
  const [nome, setNome] = useState(servico?.nome || ''); // Estado para o nome do serviço
  const [valor, setValor] = useState(servico?.valor || 0); // Estado para o valor do serviço

  // Função para lidar com a adição de um novo serviço
  const handleAdicionar = () => {
    setAdicionando(true);
    if (onAdicionar) {
      onAdicionar();
    }
  };

  // Função para salvar as alterações no serviço
  const handleSalvar = () => {
    if (onUpdate && servico) { // Verificando se o serviço está definido
      onUpdate({ ...servico, nome, valor });
    }
    setAdicionando(false); // Definir adicionando como falso após salvar
  };

  return (
    <div>
      {adicionando ? (
        // Renderizar campos para adicionar novo serviço
        <div>
          <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="number" placeholder="Valor" value={valor} onChange={(e) => setValor(parseFloat(e.target.value))} />
          <button onClick={() => setAdicionando(false)}>Cancelar</button>
          <button onClick={handleSalvar}>Salvar</button>
        </div>
      ) : (
        // Renderizar detalhes do serviço existente e botões de edição
        <div>
          <h2>{servico ? servico.nome : 'Novo Serviço'}</h2>
          {servico && <p>Valor: R$ {servico.valor},00</p>}
          {/* Renderizar os botões de edição apenas se onUpdate e onExcluir estiverem definidos */}
          {onUpdate && onExcluir && (
            <div>
              <button onClick={() => setAdicionando(true)}>Editar</button>
              <button onClick={onExcluir}>Excluir</button>
            </div>
          )}
          {/* Adicionar botão para adicionar um novo serviço */}
          {!servico && <button onClick={handleAdicionar}>Adicionar Novo Serviço</button>}
        </div>
      )}
    </div>
  );
};

export default ServicoComponent;
