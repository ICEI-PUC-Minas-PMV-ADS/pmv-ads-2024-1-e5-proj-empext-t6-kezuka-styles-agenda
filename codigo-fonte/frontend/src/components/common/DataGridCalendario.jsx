import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton } from '@chakra-ui/react';
import { Icon, TimeIcon, DeleteIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const DataGridCalendario = ({ data, onDelete }) => {
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

    return (
        <TableContainer>
            <Table size='md'>
                <Thead>
                    <Tr>
                        <Th fontSize="14px" color="#3D5A73" fontWeight="bold" alignItems="left">Data</Th>
                        <Th fontSize="14px" color="#3D5A73" fontWeight="bold" alignItems="left">Hora</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map(item => (
                        <Tr key={item.calendarioId}>
                            <Td fontSize="18px" color="#3D5A73" fontWeight="bold" alignItems="center">
                                <Icon as={TimeIcon} color="green" mr="4" boxSize="6" alignItems="center" />
                                {formatDate(item.dataHoraConfigurada)}
                            </Td>
                            <Td fontSize="18px" color="#3D5A73" fontWeight="bold" alignItems="center">
                                {formatTime(item.dataHoraConfigurada)}</Td>
                            <Td>
                                <IconButton
                                    aria-label="Delete schedule"
                                    icon={<DeleteIcon />}
                                    size="sm"
                                    colorScheme="red"
                                    onClick={() => onDelete(item.calendarioId)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

DataGridCalendario.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            calendarioId: PropTypes.number.isRequired,
            dataHoraConfigurada: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default DataGridCalendario;
