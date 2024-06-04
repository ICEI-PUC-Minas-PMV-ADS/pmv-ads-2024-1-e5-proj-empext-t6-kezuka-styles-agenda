import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton } from '@chakra-ui/react';
import { DeleteIcon, RepeatIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { useUserRedirect } from '../../hooks/UseUserRedirect';

const DataGridCommission = ({ data, onUpdate, onDelete }) => {
    const { canEditOrDelete } = useUserRedirect();
    const isEditable = canEditOrDelete();

    return (
        <TableContainer>
            <Table size='md'>
                <Thead>
                    <Tr>
                        <Th fontSize="14px" color="#3D5A73" fontWeight="bold" alignItems="left">
                            <i className="pi pi-user" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'green' }} />
                            &nbsp;&nbsp;Colaborador</Th>
                        <Th fontSize="14px" color="#3D5A73" fontWeight="bold" alignItems="left">
                            <i className="pi pi-clipboard" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'green' }} />
                            &nbsp;Serviço</Th>
                        <Th>
                            <i className="pi pi-percentage" style={{ fontSize: '16px', verticalAlign: 'middle', color: 'green' }} />
                        </Th>
                        {isEditable && <Th>
                            <i className="pi pi-file-edit" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'green' }} /></Th>}
                        {isEditable && <Th>
                            <i className="pi pi-trash" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'red' }} /></Th>}
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map(item => (
                        <Tr key={item.comissaoId}>
                            <Td fontSize="16px" color="#3D5A73" fontWeight="bold" alignItems="center">
                                {item.nomeColaborador}
                            </Td>
                            <Td fontSize="16px" color="#3D5A73" fontWeight="bold" alignItems="center">{item.nomeServico}</Td>
                            <Td fontSize="18px" color="green" fontWeight="bold" alignItems="center">
                                {`${item.percentual}`}
                                <i className="pi pi-percentage" style={{ fontSize: '10px', verticalAlign: 'middle', color: 'green' }} />
                            </Td>
                            {isEditable && (
                                <Td>
                                    <IconButton
                                        display='flex'
                                        alignItems='center'
                                        justifyContent='center'
                                        aria-label="Delete schedule"
                                        icon={<RepeatIcon />}
                                        size="sm"
                                        colorScheme="blue"
                                        onClick={() => onUpdate(item)}
                                    />
                                </Td>
                            )}
                            {isEditable && (
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
                            )}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

DataGridCommission.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            comissaoId: PropTypes.number.isRequired,
            nomeColaborador: PropTypes.string.isRequired,
            nomeServico: PropTypes.string.isRequired,
            percentual: PropTypes.string.isRequired,
        })
    ).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default DataGridCommission;
