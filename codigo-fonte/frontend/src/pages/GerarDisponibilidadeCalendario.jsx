import { useState, useEffect } from "react";
import { Calendar } from 'primereact/calendar';
import usePrimeReactLocale from '../hooks/usePrimeReactLocale';
import { Flex, Box, VStack, useToast, Select, Table, TableContainer, Thead, Tbody, Tr, Th, Td, IconButton, Icon, Button } from '@chakra-ui/react';
import { TimeIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import TitleSection from '../components/layout/TitleSection';
import { useNavigate } from 'react-router-dom';
import { registerCalendar } from '../services/serviceCalendar';
import { useAuth } from '../contexts/AuthContext';
import { getCollaborators } from '../services/collaboratorService';
import ActionButtons from '../components/layout/ActionButtons';

const GerarDisponibilidadeCalendario = () => {
    usePrimeReactLocale();
    const { token, user } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const [collaborators, setCollaborators] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCollaboratorId, setSelectedCollaboratorId] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const [startWorkTime, setStartWorkTime] = useState(null);
    const [endWorkTime, setEndWorkTime] = useState(null);
    const [startLunchTime, setStartLunchTime] = useState(null);
    const [endLunchTime, setEndLunchTime] = useState(null);
    const [timeInterval, setTimeInterval] = useState(null);
    const [scheduleList, setScheduleList] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const collabData = await getCollaborators(token);
                setCollaborators(collabData);
            } catch (error) {
                toast({
                    title: "Erro ao carregar dados",
                    description: "Não foi possível carregar dados necessários.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        };
        fetchData();
    }, [token, toast]);

    const handleGenerateSchedules = () => {
        if (!selectedCollaboratorId || !selectedDate || !startWorkTime || !endWorkTime || !startLunchTime || !endLunchTime || !timeInterval) {
            toast({
                title: "Informações Incompletas",
                description: "Por favor, preencha todos os campos necessários.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
    
        // Convertendo o intervalo de timeInterval (que é um objeto Date) para minutos
        const intervalMinutes = timeInterval.getHours() * 60 + timeInterval.getMinutes();
        if (intervalMinutes <= 0) {
            toast({
                title: "Intervalo Inválido",
                description: "O intervalo deve ser maior que zero minutos.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
    
        const schedules = [];
        let currentTime = new Date(selectedDate);
        currentTime.setHours(startWorkTime.getHours(), startWorkTime.getMinutes(), 0, 0);
        const endTime = new Date(selectedDate);
        endTime.setHours(endWorkTime.getHours(), endWorkTime.getMinutes(), 0, 0);
        const lunchStartTime = new Date(selectedDate);
        lunchStartTime.setHours(startLunchTime.getHours(), startLunchTime.getMinutes(), 0, 0);
        const lunchEndTime = new Date(selectedDate);
        lunchEndTime.setHours(endLunchTime.getHours(), endLunchTime.getMinutes(), 0, 0);
    
        while (currentTime < endTime) {
            if (!(currentTime >= lunchStartTime && currentTime < lunchEndTime)) {
                const formattedDateTime = `${currentTime.toLocaleDateString('en-CA')}T${currentTime.toLocaleTimeString('en-GB', { hour12: false })}`;
                schedules.push({
                    dataHoraConfigurada: formattedDateTime,
                    gestorId: user.id,
                    colaboradorId: parseInt(selectedCollaboratorId, 10)
                });
            }
            currentTime = new Date(currentTime.getTime() + intervalMinutes * 60000); // Incrementa o tempo baseado no intervalo
        }
    
        setScheduleList(schedules);
    
        setIsAdding(true);
        toast({
            title: "Horários Gerados",
            description: "Os horários foram gerados com sucesso, excluindo o período de almoço.",
            status: "success",
            duration: 2000,
            isClosable: true,
            onCloseComplete: () => setIsAdding(false)
        });
    };
    

    const handleRemoveSchedule = index => {
        const newScheduleList = scheduleList.filter((_, i) => i !== index);
        setScheduleList(newScheduleList);
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            await registerCalendar(scheduleList, token);
            toast({
                title: "Disponibilidade cadastrada",
                description: "Os horários foram cadastrados com sucesso.",
                status: "success",
                duration: 2500,
                isClosable: true,
                onCloseComplete: () => navigate('/dashboard')
            });
        } catch (error) {
            toast({
                title: "Erro ao cadastrar",
                description: error.message || "Não foi possível cadastrar a disponibilidade.",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        navigate('/dashboard');
    };

    return (
        <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #3D5A73, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
            <TitleSection title="Gerar Disponibilidade" subtitle="Formulário para gerar disponibilidades para colaborador." />
            <Box bg="#fff" p={5} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '50%']} maxWidth="960px" marginX="auto" marginTop="2rem" marginBottom="2rem" mt="1rem">
                <VStack spacing={4}>
                    <div className="card flex flex-wrap gap-3 p-fluid">
                        <Select placeholder="Selecione o Colaborador" name="colaboradorId" fontSize="18px" color="#3D5A73" fontWeight="bold" onChange={(e) => setSelectedCollaboratorId(parseInt(e.target.value, 10))}>
                            {collaborators.map(col => (
                                <option key={col.colaboradorId} value={col.colaboradorId}>{col.nome}</option>
                            ))}
                        </Select>
                        <div className="flex-auto">
                            <Calendar
                                id="buttondisplay"
                                value={selectedDate}
                                placeholder="Data da Disponibilidade"
                                onChange={(e) => setSelectedDate(e.value)}
                                showIcon style={{ fontSize: '20px' }}
                                dateFormat="dd/mm/yy"
                                icon={() => <i className="pi pi-calendar" style={{ fontSize: '20px' }} />} />
                        </div>
                        <div className="flex-auto">
                            <Calendar
                                value={timeInterval}
                                placeholder="Intervalo entre horários"
                                onChange={(e) => setTimeInterval(e.value)}
                                showIcon style={{ fontSize: '20px' }} timeOnly
                                icon={() => <i className="pi pi-clock" style={{ fontSize: '20px' }} />} />
                        </div>
                        <div className="flex-auto">
                            <Calendar
                                value={startWorkTime}
                                placeholder="Início Expediente"
                                onChange={(e) => setStartWorkTime(e.value)}
                                showIcon style={{ fontSize: '20px' }} timeOnly
                                icon={() => <i className="pi pi-clock" style={{ fontSize: '20px' }} />} />
                        </div>
                        <div className="flex-auto">
                            <Calendar
                                value={endWorkTime}
                                placeholder="Fim Expediente"
                                onChange={(e) => setEndWorkTime(e.value)}
                                showIcon style={{ fontSize: '20px' }} timeOnly
                                icon={() => <i className="pi pi-clock" style={{ fontSize: '20px' }} />} />
                        </div>
                        <div className="flex-auto">
                            <Calendar
                                value={startLunchTime}
                                placeholder="Início Almoço"
                                onChange={(e) => setStartLunchTime(e.value)}
                                showIcon style={{ fontSize: '20px' }} timeOnly
                                icon={() => <i className="pi pi-clock" style={{ fontSize: '20px' }} />} />
                        </div>
                        <div className="flex-auto">
                            <Calendar
                                value={endLunchTime}
                                placeholder="Fim Almoço"
                                onChange={(e) => setEndLunchTime(e.value)}
                                showIcon style={{ fontSize: '20px' }} timeOnly
                                icon={() => <i className="pi pi-clock" style={{ fontSize: '20px' }} />} />
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Button
                                px={4} py={2}
                                color='white'
                                fontWeight='bold'
                                borderRadius='md'
                                bgGradient='linear(to-l, green, green)'
                                _hover={{ bg: "#2A542B" }}
                                onClick={handleGenerateSchedules}
                                isLoading={isAdding}
                                loadingText="Adicionando"
                                spinnerPlacement="end"
                            >
                                <Icon boxSize="4" alignItems="center" as={AddIcon} />
                                &nbsp;&nbsp;Adicionar
                            </Button>
                        </div>
                    </div>

                    <TableContainer paddingY="7">
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th fontSize="14px" color="#3D5A73" fontWeight="bold" alignItems="left">Data</Th>
                                    <Th fontSize="14px" color="#3D5A73" fontWeight="bold" alignItems="left">Hora</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {scheduleList.map((item, index) => {
                                    const date = new Date(item.dataHoraConfigurada);
                                    return (
                                        <Tr key={index}>
                                            <Td fontSize="18px" color="#3D5A73" fontWeight="bold" alignItems="center">
                                                <Icon as={TimeIcon} color="green" mr="4" boxSize="6" alignItems="center" />
                                                {date.toLocaleDateString()}
                                            </Td>
                                            <Td fontSize="18px" color="#3D5A73" fontWeight="bold" alignItems="center">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Td>
                                            <Td alignItems="center">
                                                <IconButton size="sm" colorScheme="red" aria-label="Delete schedule" icon={<DeleteIcon />} onClick={() => handleRemoveSchedule(index)} />
                                            </Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <ActionButtons onBack={handleClose} onSave={handleSubmit} isSaveDisabled={scheduleList.length === 0 || isSubmitting} />
                </VStack>
            </Box>
        </Flex>
    );
};

export default GerarDisponibilidadeCalendario;