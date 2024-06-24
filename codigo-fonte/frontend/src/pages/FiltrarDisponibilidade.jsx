import { useState, useEffect } from "react";
import { Calendar } from 'primereact/calendar';
import usePrimeReactLocale from '../hooks/usePrimeReactLocale';
import { ScrollTop } from 'primereact/scrolltop';
import { ChakraProvider, Flex, Box, VStack, useToast } from '@chakra-ui/react';
import TitleSection from '../components/common/TitleSection';
import DataGridCalendario from '../components/common/DataGridCalendario';
import { useAuth } from '../contexts/AuthContext';
import { getCalendarInDisponibility, deleteCalendar } from '../services/calendarService';
import ActionButtons from '../components/common/ActionButtons';
import { useUserRedirect } from "../hooks/UseUserRedirect";

const FiltrarDisponibilidade = () => {
    usePrimeReactLocale();
    const { token, user } = useAuth(); // Aqui você já tem acesso ao user.ID
    const toast = useToast();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [data, setData] = useState([]);
    const { redirectToDashboard } = useUserRedirect();
    const [containerHeight ] = useState('300px');

    useEffect(() => {
        setData([]);
        if (selectedDate) {
            const formattedDate = `${selectedDate.getFullYear()}-${selectedDate.getDate().toString().padStart(2, '0')}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}`;
            getCalendarInDisponibility(user.id, formattedDate, token)
                .then(setData)
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
    }, [user.id, selectedDate, token, toast]);

    const handleClose = () => {
        redirectToDashboard();
    };

    const handleDelete = async (id) => {
        try {
            await deleteCalendar(id, token);
            toast({
                title: "Disponibilidade deletada",
                description: `A disponibilidade a data e hora do calendario foi removida.`,
                status: "success",
                duration: 2500,
                isClosable: true,
            });
            setData(prevData => prevData.filter(item => item.calendarioId !== id));
        } catch (error) {
            toast({
                title: "Erro ao deletar",
                description: "Não foi possível remover o serviço.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #3D5A73, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
            <TitleSection title="Filtrar Disponibilidade" subtitle="Veja a suas disponibilidades, os horários agendados não irão aparecer." />
            <Box bg="#fff" p={5} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '50%']} maxWidth="960px" marginX="auto" marginTop="2rem" marginBottom="2rem" mt="1rem">
                <VStack spacing={4}>
                    <div className="flex-auto">
                        <Calendar
                            id="buttondisplay"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.value)}
                            showIcon style={{ fontSize: '20px' }}
                            dateFormat="dd/mm/yy"
                            icon={() => <i className="pi pi-calendar" style={{ fontSize: '20px' }} />}
                            minDate={new Date()} />
                    </div>
                    <ChakraProvider>
                        <Box w={{ base: '100%', md: '70%' }} height={containerHeight} overflow="auto" position="relative">
                            <DataGridCalendario data={data} onDelete={handleDelete} />
                            <ScrollTop target="parent" threshold={100} className="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
                        </Box>    
                    </ChakraProvider>
                    <ActionButtons onBack={handleClose} onSave={null} isSaveDisabled={null} />
                </VStack>
            </Box>
        </Flex>
    );
};

export default FiltrarDisponibilidade;
