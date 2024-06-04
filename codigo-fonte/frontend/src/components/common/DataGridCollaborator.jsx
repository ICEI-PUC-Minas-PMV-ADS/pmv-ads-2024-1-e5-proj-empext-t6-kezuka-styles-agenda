import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useUserRedirect } from '../../hooks/UseUserRedirect';

const DataGridCollaborator = ({ data, onUpdate, onDelete }) => {
  const { canEditOrDelete } = useUserRedirect();
  const isEditable = canEditOrDelete();

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
            {isEditable && <Th>
              <i className="pi pi-file-edit" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'green' }} /></Th>}
            {/* {isEditable && <Th>
              <i className="pi pi-trash" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'red' }} /></Th>} */}
          </Tr>
        </Thead>
        <Tbody>
          {data.map(item => (
            <Tr key={item.colaboradorId}>
              <Td>{item.nome}</Td>
              <Td>{item.celular}</Td>
              <Td>{item.email}</Td>
              <Td>{new Date(item.dataNascimento).toLocaleDateString()}</Td>
              <Td>
                {new Date(item.dataCadastro).toLocaleDateString()} {new Date(item.dataCadastro).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Td>
              {isEditable && (
                <Td>
                  <IconButton
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    aria-label="Delete schedule"
                    icon={<EditIcon />}
                    size="sm"
                    colorScheme="blue"
                    onClick={() => onUpdate(item)}
                  />
                </Td>
              )}
              {/* {isEditable && (
                <Td>
                  <IconButton
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    aria-label="Delete schedule"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => onDelete(item.comissaoId)}
                  />
                </Td>
              )} */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

DataGridCollaborator.propTypes = {
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

export default DataGridCollaborator;
