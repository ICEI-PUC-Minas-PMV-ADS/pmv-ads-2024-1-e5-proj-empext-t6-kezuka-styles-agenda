import React from 'react';
import ServicoComponent from '../../shared/components/ServicoComponent';

export function ExibirServicos(){

  // Lista de serviços (suponha que você tenha essa lista)
  const servicos = [
    { servicoId: 1, nome: 'Serviço 1', valor: 100 },
    { servicoId: 2, nome: 'Serviço 2', valor: 150 },
    { servicoId: 3, nome: 'Serviço 3', valor: 200 },
  ];

  return (
    <div>
      <h1>Meus Serviços</h1>
      {/* Iterando sobre a lista de serviços e renderizando o componente ServicoComponent para cada serviço */}
      {servicos.map((servico) => (  
        <ServicoComponent key={servico.servicoId} servico={servico} />
      ))}
    </div>
  );
};

export default ExibirServicos;
