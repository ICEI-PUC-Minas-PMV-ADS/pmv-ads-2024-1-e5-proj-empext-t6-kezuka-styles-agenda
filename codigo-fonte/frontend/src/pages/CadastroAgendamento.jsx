import { useState, useEffect } from "react";
import { Calendar } from 'primereact/calendar';
import { ScrollTop } from 'primereact/scrolltop';
import usePrimeReactLocale from '../hooks/usePrimeReactLocale';
import { ChakraProvider, Flex, Box, VStack, useToast, Select, Switch, Text, HStack, Input } from '@chakra-ui/react';
import TitleSection from '../components/layout/TitleSection';
import DataGridHour from '../components/common/DataGridHour';
import DataGridHourService from '../components/common/DataGridHourService';
import { getCollaborators } from '../services/collaboratorService';
import { getServices } from '../services/serviceService';
import { registerScheduling } from '../services/schedulingService';
import { getCalendarInDisponibility } from '../services/calendarService';
import ActionButtons from '../components/layout/ActionButtons';
import { useUserRedirect } from '../hooks/UseUserRedirect';
import { useAuth } from '../contexts/AuthContext';

const CadastroAgendamento = () => {
    usePrimeReactLocale();
    const { user, token } = useAuth();
    const toast = useToast();
    const [collaborators, setCollaborators] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedCollaboratorId, setSelectedCollaboratorId] = useState('');
    const [data, setData] = useState([]);
    const [dataService, setDataService] = useState([]);
    const { redirectToDashboard } = useUserRedirect();
    const [selectedItem, setSelectedItem] = useState(null);
    const agendado = 1;
    const [selectedItemService, setSelectedItemsService] = useState([]);
    const [isServiceSwitchOn, setIsServiceSwitchOn] = useState(false);
    const [isCalendarSelectOn, setIsCalendarSelectOn] = useState(false);
    const [containerHeight, setContainerHeight] = useState('200px');
    const [containerHeight2, setContainerHeight2] = useState('200px');
    const [showSelectedServices, setShowSelectedServices] = useState(false);
    const [showInputObs, setShowInputObs] = useState(true);
    const [isServiceSwitchOnObs, setIsServiceSwitchOnObs] = useState(false);
    const [isServiceSwitchOnObsInput, setIsServiceSwitchOnObsInput] = useState(false);
    const [observacoes, setObservacoes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

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

    useEffect(() => {
        setData([]);
        setIsCalendarSelectOn(false);
        if (selectedCollaboratorId && selectedDate) {
            const formattedDate = `${selectedDate.getFullYear()}-${selectedDate.getDate().toString().padStart(2, '0')}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}`;
            getCalendarInDisponibility(selectedCollaboratorId, formattedDate, token)
                .then(response => {
                    setData(response);
                    setIsCalendarSelectOn(true);
                    toast({
                        title: "Consulta",
                        description: "Escolha um horário para atendimento...",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                })
                .catch(error => {
                    toast({
                        title: "Consulta",
                        description: error.message || "Não há horários disponíveis para esta data.",
                        status: "info",
                        duration: 3000,
                        isClosable: true,
                    });
                });
        }
    }, [selectedCollaboratorId, selectedDate, token, toast]);

    const handleClose = () => {
        redirectToDashboard();
    };

    const handleCheckboxHourClick = (calendarioId, dataHoraConfigurada) => {
        setSelectedItem(prevSelected => {
            const newSelection = prevSelected && prevSelected.calendarioId === calendarioId ? null : { calendarioId, dataHoraConfigurada };
            setContainerHeight(newSelection ? '100px' : '200px');
            return newSelection;
        });
    };

    const handleCheckboxServiceClick = (serviceId) => {
        setSelectedItemsService(prevSelected => {
            const alreadySelected = Array.isArray(prevSelected) ? prevSelected.includes(serviceId) : false;
            if (alreadySelected) {
                return prevSelected.filter(id => id !== serviceId);

            } else {
                return [...(prevSelected || []), serviceId];
            }
        });
    };

    const handleShowSelectedServices = () => {
        setShowSelectedServices(prevState => {
            setContainerHeight2(prevState ? '200px' : '100px');
            setIsServiceSwitchOnObs(!prevState);
            setIsServiceSwitchOnObsInput(!prevState);
            return !prevState;
        });
    };

    const handleShowObs = () => {
        setShowInputObs(prevState => {
            setIsServiceSwitchOnObsInput(!prevState);
            return !prevState;
        });
    };

    const filteredDataService = showSelectedServices ? dataService.filter(item => selectedItemService.includes(item.servicoId)) : dataService;

    const handleServiceSwitchChange = async () => {
        const newSwitchState = !isServiceSwitchOn;
        setIsServiceSwitchOn(newSwitchState);
        if (newSwitchState) {
            try {
                const servicesData = await getServices(token);
                setDataService(servicesData);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                toast({
                    title: "Erro ao carregar dados",
                    description: "Não foi possível carregar os dados dos serviços. Por favor, tente novamente.",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            }
        } else {
            setDataService([]);
            setShowSelectedServices(false);
            setShowInputObs(false);
            setIsServiceSwitchOnObs(false);
            setIsServiceSwitchOnObsInput(false);
        }
    };

    const handleSave = async () => {
        if (isAdding || isSubmitting) return;

        if (!selectedItem) {
            setIsAdding(true);
            toast({
                title: "Atenção!",
                description: "Selecione uma data e hora para o agendamento.",
                status: "info",
                duration: 3000,
                isClosable: true,
                onCloseComplete: () => setIsAdding(false)
            });
            return;
        }

        if (!showSelectedServices && !isServiceSwitchOnObs) {
            setIsAdding(true);
            toast({
                title: "Selecione pelo menos um serviço para agendar.",
                description: "Ao selecionar os serviços, não se esqueça de adionar-los.",
                status: "info",
                duration: 5000,
                isClosable: true,
                onCloseComplete: () => setIsAdding(false)
            });
            return;
        }
       
        if (isServiceSwitchOnObsInput && !observacoes.trim()) {
            setIsAdding(true);
            toast({
                title: "Adicione as observações!",
                description: "Caso não queira adicionar favor desmarcar!",
                status: "info",
                duration: 5000,
                isClosable: true,
                onCloseComplete: () => setIsAdding(false)
            });
            return;
        }

        setIsAdding(true);

        const payload = {
            colaboradorId: selectedCollaboratorId,
            clienteId: user.id,
            calendarioId: selectedItem.calendarioId,
            statusId: agendado,
            observacoes,
            dataHoraAgendamento: selectedItem.dataHoraConfigurada,
            servicos: selectedItemService.map(serviceId => ({
                servicoId: serviceId,
                quantidade: 1
            }))
        };

        try {
            await registerScheduling(payload, token);
            toast({
                title: "Agendamento de Horário",
                description: "Agendamento realizado com sucesso.",
                status: "success",
                duration: 2500,
                isClosable: true,
                onCloseComplete: () => { redirectToDashboard(); setIsAdding(false) }
            });
        } catch (error) {
            toast({
                title: "Erro ao registrar agendamento",
                description: error.message || "Não foi possível registrar o agendamento.",
                status: "error",
                duration: 3000,
                isClosable: true,
                onCloseComplete: () => setIsAdding(false)
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #3D5A73, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
            <TitleSection title="Agendamento" subtitle="Preencha os campos para realizar o agendamento" />
            <Box bg="#fff" p={5} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '50%']} maxWidth="960px" marginX="auto" marginTop="2rem" marginBottom="2rem" mt="1rem">
                <VStack spacing={4}>
                    <Box className="card flex flex-wrap gap-3 p-fluid">
                        <Select placeholder="Selecione o Colaborador" name="colaboradorId" fontSize="18px" color="#3D5A73" fontWeight="bold" onChange={(e) => setSelectedCollaboratorId(parseInt(e.target.value, 10))}>
                            {collaborators.map(col => (
                                <option key={col.colaboradorId} value={col.colaboradorId}>{col.nome}</option>
                            ))}
                        </Select>
                        <Box className="flex-auto">
                            <Calendar
                                id="buttondisplay"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.value)}
                                showIcon style={{ fontSize: '20px' }}
                                dateFormat="dd/mm/yy"
                                icon={() => <i className="pi pi-calendar" style={{ fontSize: '20px' }} />}
                                minDate={new Date()}
                            />
                        </Box>
                    </Box>
                    {isCalendarSelectOn && (
                        <ChakraProvider>
                            <Box w={{ base: '100%', md: '70%' }} height={containerHeight} overflow="auto" position="relative">
                                <DataGridHour data={data} onCheckboxClick={handleCheckboxHourClick} selectedItem={selectedItem} />
                                <ScrollTop target="parent" threshold={100} className="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
                            </Box>
                        </ChakraProvider>
                    )}
                    <HStack py={4} align="left">
                        <Switch colorScheme="green" size='lg' isChecked={isServiceSwitchOn} onChange={handleServiceSwitchChange} />
                        <Text fontSize="18px" color="#3D5A73" fontWeight="bold" paddingLeft={4} alignItems="left">Selecione os Serviços</Text>
                    </HStack>
                    {isServiceSwitchOn && (
                        <ChakraProvider>
                            <Box w={{ base: '100%', md: '70%' }} height={containerHeight2} overflow="auto" position="relative">
                                <DataGridHourService data={filteredDataService} onCheckboxClick={handleCheckboxServiceClick} selectedItemService={selectedItemService} />
                                <ScrollTop target="parent" threshold={100} className="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
                            </Box>
                            <HStack py={4} align="left">
                                <Switch colorScheme="green" size="lg" isChecked={showSelectedServices} onChange={handleShowSelectedServices} />
                                <Text fontSize="18px" color="#3D5A73" paddingLeft={4} alignItems="left" fontWeight="bold">Adicionar Serviços</Text>
                                {isServiceSwitchOnObs && (
                                    <HStack align="left">
                                        <Switch paddingLeft={4} colorScheme="green" size="lg" isChecked={showInputObs} onChange={handleShowObs} />
                                        <Text fontSize="18px" color="#3D5A73" paddingLeft={4} alignItems="left" fontWeight="bold">Adicionar Observações?</Text>
                                    </HStack>
                                )}
                            </HStack>
                            {isServiceSwitchOnObsInput && showInputObs && (
                                <Box w={{ base: '100%', md: '70%' }} overflow="auto" position="relative">
                                    <Input placeholder='Observações' size='lg' fontSize="18px" color="#3D5A73" fontWeight="bold" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
                                </Box>
                            )}
                        </ChakraProvider>

                    )}

                    <ActionButtons onBack={handleClose} onSave={handleSave} isSaveDisabled={isAdding || isSubmitting} />
                </VStack>
            </Box>
        </Flex>
    );
};

export default CadastroAgendamento;


