import { useEffect, useState } from 'react';
import { ChakraProvider, Flex, Box, useToast, VStack} from '@chakra-ui/react';
import { ScrollTop } from 'primereact/scrolltop';
import { useNavigate } from 'react-router-dom';
import DataGridService from '../components/common/DataGridService';
import TitleSection from '../components/layout/TitleSection';
import { getServices, deleteService } from '../services/serviceService';
import { useAuth } from '../contexts/AuthContext';
import { useUserRedirect } from "../hooks/UseUserRedirect";
import ActionButtons from '../components/layout/ActionButtons';

const ListaServicos = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const { redirectToDashboard } = useUserRedirect();
  const [containerHeight] = useState('400px');

  const handleUpdate = (service) => {
    navigate(`/atualizar-servico/${service.servicoId}`, { state: { service } });
  };

  const handleClose = () => {
    redirectToDashboard();
  };

  useEffect(() => {
    getServices(token)
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
  }, [0]);

  const handleDelete = async (id) => {
    try {
      await deleteService(id, token);
      toast({
        title: "Serviço deletado",
        description: `O serviço com ID ${id} foi removido.`,
        status: "success",
        duration: 2500,
        isClosable: true,
      });
      setData(prevData => prevData.filter(item => item.servicoId !== id));
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

    <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #455559, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
      <TitleSection title="Lista de Serviços" subtitle={null} />
      <Box bg="#fff" p={5} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '50%']} maxWidth="960px" marginX="auto" marginTop="2rem" marginBottom="2rem" mt="1rem">
        <VStack spacing={4}>
            <ChakraProvider>
              <Box w={{ base: '100%', md: '80%' }} height={containerHeight} overflow="auto" position="relative">
                <DataGridService data={data} onUpdate={handleUpdate} onDelete={handleDelete} />
                <ScrollTop target="parent" threshold={100} className="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
              </Box>
            </ChakraProvider>
          <ActionButtons onBack={handleClose} onSave={null} isSaveDisabled={null} />
        </VStack>
      </Box>
    </Flex>
  );
};

export default ListaServicos;
