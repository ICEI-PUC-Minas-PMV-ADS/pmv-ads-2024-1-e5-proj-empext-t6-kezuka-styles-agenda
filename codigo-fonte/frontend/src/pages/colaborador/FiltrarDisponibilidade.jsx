import { useState, useEffect } from "react";
import { Calendar } from 'primereact/calendar';
import { useNavigate } from 'react-router-dom';
import { ChakraProvider, Flex, Box, VStack, useToast, Select } from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContext';
import TitleSection from '../../components/layout/TitleSection';
import usePrimeReactLocale from '../../hooks/usePrimeReactLocale';
import ActionButtons from '../../components/layout/ActionButtons';
import { getCollaborators } from '../../services/collaboratorService';
import DataGridCalendario from '../../components/common/DataGridCalendario';
import { getCalendarForCollaborator, deleteCalendar } from '../../services/serviceCalendar';

const FiltrarDisponibilidadeColaborador = () => {
    usePrimeReactLocale();
    const { token } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const [collaborators, setCollaborators] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCollaboratorId, setSelectedCollaboratorId] = useState('');
    const [data, setData] = useState([]);

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
        if (selectedCollaboratorId && selectedDate) {
            // Correção na formatação da data
            const formattedDate = `${selectedDate.getFullYear()}-${selectedDate.getDate().toString().padStart(2, '0')}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}`;
            getCalendarForCollaborator(selectedCollaboratorId, formattedDate, token)
                .then(setData)
                .catch(error => {
                    console.error('Erro ao buscar disponibilidades:', error);
                    toast({
                        title: "Erro ao buscar disponibilidades",
                        description: error.message || "Não foi possível buscar as disponibilidades.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                });
        }
    }, [selectedCollaboratorId, selectedDate, token, toast]);

    const handleClose = () => {
        navigate('/dashboard');
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
            description: "Não foi possível remover o servico.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      };


      return (
        <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #3D5A73, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
            <TitleSection title="Filtrar Disponibilidade" subtitle="Veja a disponibilidade do colaborador." />
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
                    </div>
                    <ChakraProvider>
                        <DataGridCalendario data={data} onDelete={handleDelete} />
                    </ChakraProvider>

                    <ActionButtons onBack={handleClose} onSave={null} isSaveDisabled={null} />
                </VStack>
            </Box>
        </Flex>
    );
};

export default FiltrarDisponibilidadeColaborador;
