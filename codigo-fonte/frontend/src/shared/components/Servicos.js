import React, { useState, useEffect } from 'react';

function Servicos() {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    async function fetchServicos() {
      try {
        // Substitua a chamada abaixo com a função que busca os dados do seu banco de dados
        const response = await fetch('URL_PARA_API_SERVICOS');
        const data = await response.json();
        setServicos(data); // Define os dados recebidos do banco de dados no estado
      } catch (error) {
        console.error('Erro ao buscar os serviços:', error);
      }
    }

    fetchServicos(); // Chama a função de busca ao montar o componente
  }, []); // O segundo parâmetro [] garante que useEffect seja chamado apenas uma vez, ao montar o componente

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '10px', border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#f0f0f0', padding: '10px', fontWeight: 'bold' }}>ServiçosId</div> 
        <div style={{ backgroundColor: '#f0f0f0', padding: '10px', fontWeight: 'bold' }}>Nome</div>
        <div style={{ backgroundColor: '#f0f0f0', padding: '10px', fontWeight: 'bold' }}>Valor</div>
        {servicos.map((item, index) => (
          <React.Fragment key={item.ServicosId}>
            <div style={{ padding: '10px', backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>{item.ServicosId}</div>
            <div style={{ padding: '10px', backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>{item.Nome}</div>
            <div style={{ padding: '10px', backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>{item.Valor}</div>
          </React.Fragment>
        ))}
        {/* Linhas de exemplo */}
        <React.Fragment>
          <div style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>1</div>
          <div style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>Corte</div>
          <div style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>R$ 35,00</div>
        </React.Fragment>
        <React.Fragment>
          <div style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>2</div>
          <div style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>Barba</div>
          <div style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>R$ 40,00</div>
        </React.Fragment>
        {/*  Fim das linhas de exemplo */}
      </div>
    </div>
  );
}

export default Servicos;
