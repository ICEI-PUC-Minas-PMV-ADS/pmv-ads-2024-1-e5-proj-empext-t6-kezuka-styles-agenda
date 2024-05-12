import React, { useState } from 'react';
import ServicoComponent from '../../shared/components/ServicoComponent';

export function EditarServicos(){

  // Lista de serviços (suponha que você tenha essa lista)
  const [servicos, setServicos] = useState([
    { servicoId: 1, nome: 'Serviço 1', valor: 100 },
    { servicoId: 2, nome: 'Serviço 2', valor: 150 },
    { servicoId: 3, nome: 'Serviço 3', valor: 200 },
  ]);

  // Função para atualizar os dados de um serviço
  const handleUpdateServico = (servicoId: number, novosDados: any) => {
    setServicos(servicos.map(servico => {
      if (servico.servicoId === servicoId) {
        return { ...servico, ...novosDados };
      }
      return servico;
    }));
  };

  // Função para excluir um serviço
  const handleExcluirServico = (servicoId: number) => {
    setServicos(servicos.filter(servico => servico.servicoId !== servicoId));
  };

  // Função para adicionar um novo serviço
  const handleAdicionarServico = () => {
    const novoServicoId = Math.max(...servicos.map(servico => servico.servicoId)) + 1;
    setServicos([
      ...servicos,
      { servicoId: novoServicoId, nome: 'Novo Serviço', valor: 0 }
    ]);
  };

  return (
    <div>
      <h1>Editar Serviços</h1>
      {/* Iterando sobre a lista de serviços e renderizando o componente ServicoComponent para cada serviço */}
      {servicos.map((servico) => (
        <div key={servico.servicoId}>
          {/* Passando o serviço, a função de atualização e a função de exclusão para o componente ServicoComponent */}
          <ServicoComponent
            servico={servico}
            onUpdate={(novosDados: any) => handleUpdateServico(servico.servicoId, novosDados)}
            onExcluir={() => handleExcluirServico(servico.servicoId)}
          />
        </div>
      ))}
      {/* Botão para adicionar um novo serviço */}
      <button onClick={handleAdicionarServico}>Adicionar Novo Serviço</button>
    </div>
  );
};

export default EditarServicos;
