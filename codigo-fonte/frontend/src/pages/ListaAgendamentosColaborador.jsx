import { useEffect, useState } from 'react';
import { ChakraProvider, Flex, Box, useToast, VStack } from '@chakra-ui/react';
import { ScrollTop } from 'primereact/scrolltop';
import DataGridScheduling from '../components/common/DataGridScheduling';
import TitleSection from '../components/layout/TitleSection';
import { getSchedulingForCollaborator } from '../services/schedulingService';
import { useAuth } from '../contexts/AuthContext';
import AgendamentoModal from '../components/layout/AgendamentoModal';
import MenuColaborador from '../components/common/MenuColaborador';
import Footer from '../components/common/Footer';

const ListaAgendamentosColaborador = () => {
  const [data, setData] = useState([]);
  const toast = useToast();
  const [containerHeight] = useState('400px');
  const { user, token } = useAuth();
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);

  const reloadData = () => {
    if (token && user.id) {
        getSchedulingForCollaborator(user.id, token)
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
    }
  };

  useEffect(() => {
    reloadData();
  }, [token, user.id, toast]);

  const handleRowClick = (item) => {
    setSelectedAgendamento(item);
  };

  const handleModalClose = () => {
    setSelectedAgendamento(null);
    reloadData();
  };

  return (
    <Flex direction="column" minH="100vh" bg="#fff" w="100vw" m="0" p="0" overflow="hidden">
      <MenuColaborador />
      <Flex direction="column" align="center" justify="center" bgGradient="linear(180deg, #3C3885, #3CCB95)" w="100vw" m="0" p="0" flex="1" overflow="hidden">
        <TitleSection title="Minha Agenda" subtitle="Para ver os detalhes clique no agendamento" />
        <Box bg="#fff" p={5} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '50%']} maxWidth="960px" mx="auto" my="2rem">
          <VStack spacing={4}>
            <ChakraProvider>
              <Box w="100%" height={containerHeight} overflowY="auto" position="relative">
                <DataGridScheduling data={data} onRowClick={handleRowClick} onUpdate={null} onDelete={null} />
                <ScrollTop target="parent" threshold={100} className="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
              </Box>
            </ChakraProvider>
          </VStack>
        </Box>
        {selectedAgendamento && (
          <AgendamentoModal
            isOpen={Boolean(selectedAgendamento)}
            onClose={handleModalClose}
            data={selectedAgendamento}
            onCancel={handleModalClose}
          />
        )}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default ListaAgendamentosColaborador;
