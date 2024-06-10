import { useEffect, useState } from 'react';
import { VStack, ChakraProvider, Flex, Box, useToast } from '@chakra-ui/react';
import { ScrollTop } from 'primereact/scrolltop';
import { useNavigate } from 'react-router-dom';
import DataGridCollaborator from '../components/common/DataGridCollaborator';
import TitleSection from '../components/layout/TitleSection';
import { getCollaborators, deleteCollaborator } from '../services/collaboratorService';
import { useAuth } from '../contexts/AuthContext';
import { useUserRedirect } from "../hooks/UseUserRedirect";
import ActionButtons from '../components/layout/ActionButtons';

const ListaColaboradores = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const { redirectToDashboard } = useUserRedirect();
  const [containerHeight] = useState('400px');

  const handleUpdate = (collaborator) => {
    navigate(`/atualizar-colaborador/${collaborator.colaboradorId}`, { state: { collaborator } });
  };

  const handleClose = () => {
    redirectToDashboard();
  };

  useEffect(() => {
    getCollaborators(token)
      .then(setData)
      .catch(error => {
        console.error("Erro ao carregar dados:", error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados dos colaboradores. Por favor, tente novamente.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  }, [token, toast]);

  const handleDelete = async (id) => {
    try {
      await deleteCollaborator(id, token);
      toast({
        title: "Colaborador deletado",
        description: `O colaborador com ID ${id} foi removido.`,
        status: "success",
        duration: 2500,
        isClosable: true,
      });
      setData(prevData => prevData.filter(item => item.colaboradorId !== id));
    } catch (error) {
      toast({
        title: "Erro ao deletar",
        description: "Não foi possível remover o colaborador.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (

    <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #455559, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
      <TitleSection title="Colaboradores" subtitle={null} />
      <Box bg="#fff" p={5} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '50%']} maxWidth="960px" marginX="auto" marginTop="2rem" marginBottom="2rem" mt="1rem">
        <VStack spacing={4}>
            <ChakraProvider>
              <Box w={{ base: '100%', md: '100%' }} height={containerHeight} overflow="auto" position="relative">
              <DataGridCollaborator data={data} onUpdate={handleUpdate} onDelete={handleDelete} />
              <ScrollTop target="parent" threshold={100} className="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
              </Box>
            </ChakraProvider>
          <ActionButtons onBack={handleClose} onSave={null} isSaveDisabled={null} />
        </VStack> 
      </Box>
    </Flex>
  );
};

export default ListaColaboradores;
