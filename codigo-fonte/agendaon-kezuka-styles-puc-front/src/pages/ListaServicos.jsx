import { useEffect, useState } from 'react';
import { HStack, ChakraProvider, Flex, Box, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import DataGridService from '../components/common/DataGridService';
import TitleSection from '../components/layout/TitleSection';
import { getServices, deleteService } from '../services/serviceService';
import { useAuth } from '../contexts/AuthContext';

const ListaServicos = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  const handleUpdate = (service) => {
    navigate(`/atualizar-servico/${service.servicoId}`, { state: { service } });
  };

  const handleClose = () => {
    navigate('/dashboard');
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
  }, []);

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
      <TitleSection title="Lista de Serviços" subtitle="As pessoas não compram bens e serviços. Elas compram relacionamentos, histórias e magia." />
      <Box bg="#fff" p={1} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '70%']} maxWidth="1350px" marginX="auto" marginTop="2rem" marginBottom="2rem" mt="5rem">
        <ChakraProvider>
          <DataGridService data={data} onUpdate={handleUpdate}  onDelete={handleDelete} />
        </ChakraProvider>
      </Box>
      <HStack spacing={4} width="full" justify="center">
        <Box
          as='button'
          onClick={handleClose}
          p={3}
          color='white'
          fontWeight='bold'
          borderRadius='md'
          bgGradient='linear(to-l, #3D5A73, #3D5A73)'
          _hover={{
            bg: "#182625",
          }}
        >
          VOLTAR
        </Box>
      </HStack>
    </Flex>
  );
};

export default ListaServicos;
