import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Badge, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Icon, TimeIcon } from '@chakra-ui/icons';
import { useUserRedirect } from '../../hooks/UseUserRedirect';
import { useAuth } from '../../contexts/AuthContext';

const DataGridScheduling = ({ data, onRowClick }) => {
    const { canEditOrDelete } = useUserRedirect();
    const isEditable = canEditOrDelete();
    const { user } = useAuth();

    const formatDate = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        return [
            date.getDate().toString().padStart(2, '0'),
            (date.getMonth() + 1).toString().padStart(2, '0'),
            date.getFullYear().toString()
        ].join('/');
    };

    const formatTime = (dateTimeStr) => {
        const time = new Date(dateTimeStr);
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.dataHoraAgendamento);
        const dateB = new Date(b.dataHoraAgendamento);
        return dateA - dateB;
    });

    const getStatusColor = (statusDescricao) => {
        switch (statusDescricao) {
            case 'CANCELADO':
                return 'red';
            case 'CONCLUÍDO':
                return 'purple';
            case 'AGENDADO':
                return 'green';
        }
    };

    return (
        <TableContainer maxHeight="400px" overflowY="auto">
            <Table size='md'>
                <Thead position="sticky" top={0} bg="white" zIndex={1}>
                    <Tr align="center">
                        <Th fontSize="14px" color="#3D5A73" fontWeight="bold" alignItems="left">
                            <i className="pi pi-calendar-clock" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'green' }} />
                            &nbsp; Data
                        </Th>
                        <Th fontSize="14px" color="#3D5A73" fontWeight="bold" alignItems="left">
                            <i className="pi pi-clock" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'green' }} />
                            &nbsp;Hora
                        </Th>
                        <Th fontSize="14px" color="#3D5A73" fontWeight="bold" alignItems="left">
                            <i className="pi pi-user" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'green' }} />
                            &nbsp;{user.tipoUsuario === 'Cliente' ? 'Colaborador' : 'Cliente'}
                        </Th>
                        <Th fontSize="14px" color="#3D5A73" fontWeight="bold" alignItems="left">
                            <i className="pi pi-tag" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'green' }} />
                            &nbsp;&nbsp;Status
                        </Th>
                        {/* {isEditable && <Th><i className="pi pi-file-edit" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'green' }} /></Th>}
                        {isEditable && <Th><i className="pi pi-trash" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'red' }} /></Th>} */}
                    </Tr>
                </Thead>
                <Tbody>
                    {sortedData.map(item => (
                        <Tr key={item.agendamentoId} onClick={() => onRowClick(item)} cursor="pointer">
                            <Td fontSize="18px" color="#3D5A73" fontWeight="bold" alignItems="center">
                                <Flex align="center">
                                    <Icon as={TimeIcon} color="green" mr="4" boxSize="6" alignItems="center" />
                                    {formatDate(item.dataHoraAgendamento)}
                                </Flex>
                            </Td>
                            <Td fontSize="18px" color="#3D5A73" fontWeight="bold" alignItems="center">
                                {formatTime(item.dataHoraAgendamento)}
                            </Td>
                            <Td fontSize="18px" color="#3D5A73" fontWeight="bold" alignItems="center">
                                &nbsp; &nbsp;&nbsp;{user.tipoUsuario === 'Cliente' ? item.colaboradorNome : item.clienteNome}
                            </Td>
                            <Td fontSize="16px" color="#3D5A73" fontWeight="bold" alignItems="center">
                                <Badge 
                                    colorScheme={getStatusColor(item.statusDescricao)} 
                                    mb={0} 
                                    borderRadius="full" 
                                    px={2} 
                                    py={1} 
                                    fontSize="0.8em"
                                >
                                    {item.statusDescricao}
                                </Badge>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

DataGridScheduling.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            agendamentoId: PropTypes.number.isRequired,
            colaboradorNome: PropTypes.string.isRequired,
            colaboradorId: PropTypes.number.isRequired,
            clienteNome: PropTypes.string.isRequired,
            clienteId: PropTypes.number.isRequired,
            calendarioId: PropTypes.number.isRequired,
            statusDescricao: PropTypes.string.isRequired,
            observacoes: PropTypes.string.isRequired,
            dataHoraAgendamento: PropTypes.string.isRequired,
        })
    ).isRequired,
    onRowClick: PropTypes.func.isRequired,
};

export default DataGridScheduling;
