import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const DataGridPeople = ({ data, onUpdate, onDelete }) => {

  return (
    <TableContainer>
      <Table size='md'>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Celular</Th>
            <Th>Data de Nascimento</Th>
            <Th>Data de Cadastro</Th>
            <Th>Atualizar</Th>
            <Th>Excluir</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(item => (
            <Tr key={item.colaboradorId}>
              <Td>{item.nome}</Td>
              <Td>{item.email}</Td>
              <Td>{item.celular}</Td>
              <Td>{new Date(item.dataNascimento).toLocaleDateString()}</Td>
              <Td>
                {new Date(item.dataCadastro).toLocaleDateString()} {new Date(item.dataCadastro).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Td>
              <Td>
                <Button onClick={() => onUpdate(item)} colorScheme="blue">Atualizar</Button>
              </Td>
              <Td>
                <Button onClick={() => onDelete(item.colaboradorId)} colorScheme="red">Excluir</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

DataGridPeople.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      colaboradorId: PropTypes.number.isRequired,
      nome: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      senha: PropTypes.string.isRequired,
      celular: PropTypes.string.isRequired,
      dataNascimento: PropTypes.instanceOf(Date).isRequired,
      dataCadastro: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DataGridPeople;
