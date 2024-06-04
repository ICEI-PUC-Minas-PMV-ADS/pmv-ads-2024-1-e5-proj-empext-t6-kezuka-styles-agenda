import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const DataGridClient = ({ data }) => {

  return (
    <TableContainer>
      <Table size='md'>
        <Thead>
          <Tr>
            <Th fontSize="14px" color="#3D5A73" fontWeight="bold" alignItems="left">
              <i className="pi pi-user" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'green' }} />
              &nbsp;&nbsp;Nome</Th>
            <Th fontSize="14px" color="#3D5A73" fontWeight="bold" alignItems="left">
              <i className="pi pi-phone" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'green' }} />
              &nbsp;&nbsp;Celular</Th>
            <Th fontSize="14px" color="#3D5A73" fontWeight="bold" alignItems="left">
              <i className="pi pi-envelope" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'green' }} />
              &nbsp;&nbsp;Email</Th>
            <Th fontSize="14px" color="#3D5A73" fontWeight="bold" alignItems="left">
              <i className="pi pi-calendar" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'green' }} />
              &nbsp;&nbsp;Aniversário</Th>
            <Th fontSize="14px" color="#3D5A73" fontWeight="bold" alignItems="left">
              <i className="pi pi-check-circle" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'green' }} />
              &nbsp;&nbsp;Cadastro</Th>
            {/* <Th>Atualizar</Th> */}
            {/* <Th>Excluir</Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {data.map(item => (
            <Tr key={item.clienteId}>
              <Td>{item.nome}</Td>
              <Td>{item.celular}</Td>
              <Td>{item.email}</Td>
              <Td>{new Date(item.dataNascimento).toLocaleDateString()}</Td>
              <Td>
                {new Date(item.dataCadastro).toLocaleDateString()} {new Date(item.dataCadastro).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Td>
              {/* <Td>
                <Button onClick={() => onUpdate(item)} colorScheme="blue">Atualizar</Button>
              </Td>
              <Td>
                <Button onClick={() => onDelete(item.colaboradorId)} colorScheme="red">Excluir</Button>
              </Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

DataGridClient.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      colaboradorId: PropTypes.number.isRequired,
      nome: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      celular: PropTypes.string.isRequired,
      dataNascimento: PropTypes.instanceOf(Date).isRequired,
      dataCadastro: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DataGridClient;
