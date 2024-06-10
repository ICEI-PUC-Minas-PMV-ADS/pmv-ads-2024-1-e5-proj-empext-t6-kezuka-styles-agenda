import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Badge,
    VStack,
    HStack,
    Avatar,
    Card,
    Box,
    ChakraProvider,
    useToast
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { ScrollTop } from 'primereact/scrolltop';
import DataGridService from '../../components/common/DataGridService';
import { getServicesFromAgendamentoClient } from '../../services/serviceService';
import { cancelSchedulingForClient } from '../../services/schedulingService';

const AgendamentoModal = ({ isOpen, onClose, data }) => {
    const { user, token } = useAuth();
    const [containerHeight] = useState('200px');
    const [dataService, setData] = useState([]);
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const agendamentoId = data?.agendamentoId;
    const statusCancelado = 2;
    const statusReativado = 1;

    useEffect(() => {
        if (!token || !agendamentoId || !user.id) return;

        getServicesFromAgendamentoClient(token, agendamentoId, user.id)
            .then(setData)
            .catch(error => {
                console.error("Erro ao carregar dados:", error);
                toast({
                    title: "Erro ao carregar dados",
                    description: "Não foi possível carregar os dados dos serviços. Por favor, tente novamente.",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            });
    }, [token, agendamentoId, user.id, toast]);

    const handleStatusChange = async (status) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            await cancelSchedulingForClient(agendamentoId, status, token);
            toast({
                title: status === statusCancelado ? "Cancelado!" : "Reagendado!",
                description: status === statusCancelado ? "O Agendamento foi cancelado!" : "O Agendamento foi reagendado!",
                status: "success",
                duration: 2000,
                isClosable: true,
                onCloseComplete: () => {
                    setIsSubmitting(false);
                    onClose();
                }
            });

        } catch (error) {
            toast({
                title: "Erro ao cancelar",
                description: error.message || "Não foi possível cancelar o agendamento.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            setIsSubmitting(false);
        }
    };

    if (!data) return null;

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
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" motionPreset="scale">
            <ModalOverlay />
            <ModalContent maxW="33vw" w="100%">
                <ModalHeader fontWeight="bold" color="#172237" mb={2}>
                    <HStack>
                        <Avatar name={user?.nome || 'No Name'} src={user?.image || 'https://fallback-url.com/default-avatar.png'} mr={2} />
                        <VStack align="flex-start" spacing={0}>
                            <Text fontSize="md" color="#172237" fontWeight="bold">{"Olá,"}&nbsp;&nbsp;{user?.nome || 'No Name'}</Text>
                            <Text fontSize="sm" color="#172237">{user?.email || 'noemail@example.com'}</Text>
                        </VStack>
                    </HStack>
                    <Text paddingTop={5} fontSize="20px" textTransform="uppercase" color="#172237" fontWeight="bold">
                        Veja os detalhes de seu agendamento:
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack align="start" spacing={4}>
                        <Card maxW="33vw" bg='#FFF8D0' p={5} w="100%">
                            <HStack align="center" paddingBottom={2}>
                                <i className="pi pi-calendar-clock" style={{ fontSize: '20px', verticalAlign: 'middle', color: '#504E42' }} />
                                <Text fontSize="15px" color="#504E42" fontWeight="bold">{formatDate(data.dataHoraAgendamento)}</Text>
                            </HStack>
                            <HStack align="center" paddingBottom={2}>
                                <i className="pi pi-clock" style={{ fontSize: '20px', verticalAlign: 'middle', color: '#504E42' }} />
                                <Text fontSize="15px" color="#504E42" fontWeight="bold">{formatTime(data.dataHoraAgendamento)}</Text>
                            </HStack>
                            <HStack align="center" paddingBottom={2}>
                                <i className="pi pi-user" style={{ fontSize: '20px', verticalAlign: 'middle', color: '#504E42' }} />
                                <Text fontSize="15px" color="#504E42" fontWeight="bold">{data.colaboradorNome}</Text>
                            </HStack>
                            <HStack align="center">
                                <i className="pi pi-tag" style={{ fontSize: '20px', verticalAlign: 'middle', color: '#504E42' }} />
                                <Text fontSize="15px" color="#504E42" fontWeight="bold">{data.clienteNome}</Text>
                            </HStack>
                            <Text paddingTop={5} fontSize="16px" color="#504E42" fontWeight="bold" alignItems="left">
                                Observações: &nbsp;<Text fontSize="15px"> {data.observacoes}</Text>
                            </Text>
                            <HStack paddingTop={5} paddingBottom={1} align="center">
                                <Text fontSize="16px" color="#504E42" fontWeight="bold" alignItems="left">
                                    Status:&nbsp;&nbsp;&nbsp;
                                </Text>
                                <Badge 
                                    colorScheme={data.statusDescricao === "CANCELADO" ? "red" : "green"} 
                                    mb={0} 
                                    borderRadius="full" 
                                    px={2} 
                                    py={1} 
                                    fontSize="0.8em"
                                >
                                    {data.statusDescricao}
                                </Badge>
                            </HStack>
                        </Card>

                        <VStack spacing={4}>
                            <ChakraProvider>
                                <Box w={{ base: '100%', md: '100%' }} height={containerHeight} overflow="auto" position="relative">
                                    <DataGridService data={dataService} onUpdate={null} onDelete={null} />
                                    <ScrollTop target="parent" threshold={100} className="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
                                </Box>
                            </ChakraProvider>
                        </VStack>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    {data.statusDescricao === "CANCELADO" ? (
                        <HStack spacing={4} paddingTop={5}>
                            <Button color="white" onClick={() => handleStatusChange(statusReativado)} bg="green" _hover={{ bg: "#2A542B" }} w="full" py={6} rightIcon={<ArrowBackIcon />} justifyContent="space-between">Agendar</Button>
                        </HStack>
                    ) : (
                        <HStack spacing={4} paddingTop={5}>
                            <Button color="white" onClick={() => handleStatusChange(statusCancelado)} bg="#A70D00" _hover={{ bg: "#460B06" }} w="full" py={6} rightIcon={<ArrowBackIcon />} justifyContent="space-between" isDisabled={data.statusDescricao === "CANCELADO"}>Cancelar</Button>
                        </HStack>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

AgendamentoModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.shape({
        agendamentoId: PropTypes.number.isRequired,
        colaboradorNome: PropTypes.string.isRequired,
        colaboradorId: PropTypes.number.isRequired,
        clienteNome: PropTypes.string.isRequired,
        clienteId: PropTypes.number.isRequired,
        calendarioId: PropTypes.number.isRequired,
        statusDescricao: PropTypes.string.isRequired,
        observacoes: PropTypes.string,
        dataHoraAgendamento: PropTypes.string.isRequired
    }).isRequired,
};

export default AgendamentoModal;

