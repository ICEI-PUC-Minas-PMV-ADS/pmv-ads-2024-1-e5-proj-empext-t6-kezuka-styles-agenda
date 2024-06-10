import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { DeleteIcon, RepeatIcon } from '@chakra-ui/icons';
import { useUserRedirect } from '../../hooks/UseUserRedirect';

const DataGridService = ({ data, onUpdate, onDelete }) => {
    const { canEditOrDelete } = useUserRedirect();
    const isEditable = canEditOrDelete();

    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const sortedData = data.sort((a, b) => a.nome.localeCompare(b.nome));

    return (
        <TableContainer>
            <Table size='md'>
                <Thead>
                    <Tr>
                        <Th fontSize="14px" color="#3D5A73" fontWeight="bold" alignItems="left">
                            <i className="pi pi-tag" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'green' }} />
                            &nbsp;&nbsp;Descrição do Serviço
                        </Th>
                        <Th fontSize="14px" color="#3D5A73" fontWeight="bold" alignItems="left">
                            <i className="pi pi-money-bill" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'green' }} />
                            &nbsp;&nbsp;Valor
                        </Th>
                        {isEditable && (
                            <>
                                <Th>
                                    <i className="pi pi-file-edit" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'green' }} />
                                </Th>
                                <Th>
                                    <i className="pi pi-trash" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'red' }} />
                                </Th>
                            </>
                        )}
                    </Tr>
                </Thead>
                <Tbody>
                    {sortedData.map(item => (
                        <Tr key={item.servicoId}>
                            <Td fontSize="18px" color="#3D5A73" fontWeight="bold" alignItems="center">
                                <i className="pi pi-clipboard" style={{ fontSize: '25px', verticalAlign: 'middle', color: 'green' }} />
                                &nbsp; &nbsp;&nbsp;{item.nome}
                            </Td>
                            <Td fontSize="18px" color="green" fontWeight="bold" alignItems="center">
                                {formatCurrency(parseFloat(item.valor))}
                            </Td>
                            {isEditable && (
                                <>
                                    <Td>
                                        <IconButton
                                            aria-label="Update service"
                                            icon={<RepeatIcon />}
                                            size="sm"
                                            colorScheme="blue"
                                            onClick={() => onUpdate(item)}
                                        />
                                    </Td>
                                    <Td>
                                        <IconButton
                                            aria-label="Delete service"
                                            icon={<DeleteIcon />}
                                            size="sm"
                                            colorScheme="red"
                                            onClick={() => onDelete(item.servicoId)}
                                        />
                                    </Td>
                                </>
                            )}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

DataGridService.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            servicoId: PropTypes.number.isRequired,
            nome: PropTypes.string.isRequired,
            valor: PropTypes.string.isRequired,
        })
    ).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default DataGridService;
