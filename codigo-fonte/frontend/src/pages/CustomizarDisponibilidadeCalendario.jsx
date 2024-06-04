import { useState, useEffect } from "react";
import { Calendar } from 'primereact/calendar';
import usePrimeReactLocale from '../hooks/usePrimeReactLocale';
import { Flex, Box, VStack, useToast, Select, ChakraProvider, Icon, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import DataGridCalendario from '../components/common/DataGridCalendario';
import TitleSection from '../components/layout/TitleSection';
import { registerCalendar } from '../services/calendarService';
import { useAuth } from '../contexts/AuthContext';
import { getCollaborators } from '../services/collaboratorService';
import ActionButtons from '../components/layout/ActionButtons';
import { useUserRedirect } from "../hooks/UseUserRedirect";
import { ScrollTop } from 'primereact/scrolltop';

const CustomizarDisponibilidadeCalendario = () => {
    usePrimeReactLocale();
    const { token, user } = useAuth();
    const toast = useToast();
    const [collaborators, setCollaborators] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState(null);
    const [selectedCollaboratorId, setSelectedCollaboratorId] = useState('');
    const [scheduleList, setScheduleList] = useState([]);
    const [isToastShowing, setIsToastShowing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const { redirectToDashboard } = useUserRedirect();
    const [containerHeight] = useState('300px');

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

    const handleAddSchedule = () => {
        if (!selectedCollaboratorId || !selectedDate || !selectedHour) {
            if (!isToastShowing) {
                setIsToastShowing(true);
                toast({
                    title: "Atenção!",
                    description: "Por favor, selecione um colaborador, data e horário.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    onCloseComplete: () => setIsToastShowing(false)
                });
            }
            return;
        }
    
        const date = new Date(selectedDate);
        date.setHours(selectedHour.getHours(), selectedHour.getMinutes(), 0, 0);
    
        if (scheduleList.some(item => new Date(item.dataHoraConfigurada).getTime() === date.getTime())) {
            toast({
                title: "Erro de validação",
                description: "Este horário já foi adicionado à lista!",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
    
        const offset = date.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(date.getTime() - offset)).toISOString().slice(0, -1);
        const calendarioId = Math.floor(Math.random() * 1000);
        const newSchedule = {
            calendarioId: calendarioId,
            dataHoraConfigurada: localISOTime,
            gestorId: user.id,
            colaboradorId: selectedCollaboratorId
        };
    
        setScheduleList((prev) => [...prev, newSchedule]);
        setSelectedHour(null);
    
        setIsAdding(true);
        toast({
            title: "Horário Adicionado",
            description: "Um novo horário foi adicionado com sucesso à lista.",
            status: "info",
            duration: 2000,
            isClosable: true,
            onCloseComplete: () => setIsAdding(false)
        });
    };

    const handleRemoveSchedule = calendarioId => {
        const newScheduleList = scheduleList.filter(item => item.calendarioId !== calendarioId);
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
                onCloseComplete: () => {
                    redirectToDashboard();
                    setIsSubmitting(false);
                }
            });
        } catch (error) {
            if (!isToastShowing) {
            setIsToastShowing(true);
            toast({
                title: "Erro ao cadastrar",
                description: error.message || "Não foi possível cadastrar a disponibilidade.",
                status: "error",
                duration: 2000,
                isClosable: true,
                onCloseComplete: () => {
                    setIsSubmitting(false)
                    setIsToastShowing(false)
                }
            });
            }
        }
    };

    const handleClose = () => {
        redirectToDashboard();
    };

    return (
        <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #3D5A73, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
            <TitleSection title="Disponibilidade" subtitle="Customizar disponibilidade, hora em hora" />
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
                                onChange={(e) => setSelectedDate(e.value)}
                                showIcon style={{ fontSize: '20px' }}
                                dateFormat="dd/mm/yy"
                                icon={() => <i className="pi pi-calendar" style={{ fontSize: '20px' }} />} />
                        </div>
                        <div className="flex-auto">
                            <Calendar
                                value={selectedHour}
                                onChange={(e) => setSelectedHour(e.value)}
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
                                onClick={handleAddSchedule}
                                isLoading={isAdding}
                                loadingText="Adicionando"
                                spinnerPlacement="end"
                            >
                                <Icon boxSize="4" alignItems="center" as={AddIcon} />
                                &nbsp;&nbsp;Adicionar
                            </Button>
                        </div>
                    </div>
                     <ChakraProvider>
                        <Box w={{ base: '100%', md: '70%' }} height={containerHeight} overflow="auto" position="relative">
                            <DataGridCalendario data={scheduleList} onDelete={handleRemoveSchedule} />
                            <ScrollTop target="parent" threshold={100} className="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
                        </Box>
                    </ChakraProvider>
                    <ActionButtons onBack={handleClose} onSave={handleSubmit} isSaveDisabled={scheduleList.length === 0 || isSubmitting} />
                </VStack>
            </Box>
        </Flex>
    );
};

export default CustomizarDisponibilidadeCalendario;
