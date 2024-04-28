import React, { useState, useEffect } from 'react';

function Clientes (){
  const [cliente, setClientes] = useState([]);

  useEffect(() => {
    async function fetchClientes() {
      try {
        // Substitua a chamada abaixo com a função que busca os dados do seu banco de dados
        const response = await fetch('URL_PARA_API_SERVICOS');
        const data = await response.json();
        setClientes(data); // Define os dados recebidos do banco de dados no estado
      } catch (error) {
        console.error('Erro ao buscar os serviços:', error);
      }
    }

    fetchClientes(); // Chama a função de busca ao montar o componente
  }, []); // O segundo parâmetro [] garante que useEffect seja chamado apenas uma vez, ao montar o componente

  return (

  <div>
    <div style={{display: 'grid',gridtemplatecolumns:'auto auto auto auto auto auto auto', gap: '10px', border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden'}}>
     <div style={{ backgroundColor: '#f0f0f0', padding: '10px', fontWeight: 'bold' }}>ClienteId</div>
     <div style={{ backgroundColor: '#f0f0f0', padding: '10px', fontWeight: 'bold' }}>Nome</div>
     <div style={{ backgroundColor: '#f0f0f0', padding: '10px', fontWeight: 'bold' }}>E-mail</div>
     <div style={{ backgroundColor: '#f0f0f0', padding: '10px', fontWeight: 'bold' }}>Senha</div>
     <div style={{ backgroundColor: '#f0f0f0', padding: '10px', fontWeight: 'bold' }}>Celular</div>
     <div style={{ backgroundColor: '#f0f0f0', padding: '10px', fontWeight: 'bold' }}>Aniversário</div>
     <div style={{ backgroundColor: '#f0f0f0', padding: '10px', fontWeight: 'bold' }}>Data Cadastro</div>

      {cliente.map(item=> (
      <React.Fragment key={item.ClientesId}>
      </React.Fragment>

    ))}
    </div>
  </div>
    //mapear e adicionar clientes de exemplo

   
    
  )
}

export default Clientes;