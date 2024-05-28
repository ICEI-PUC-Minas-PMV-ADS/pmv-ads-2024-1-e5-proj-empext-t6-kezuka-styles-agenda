import { useEffect, useState } from 'react';
import { HStack, ChakraProvider, Flex, Box, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// import DataGridCommission from '../../components/common/DataGridCommission';
import TitleSection from '../../components/layout/TitleSection';
import { useAuth } from '../../contexts/AuthContext';
import { getCommission, deleteCommission } from '../../services/commissionService';

const ListaComissoes = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  const handleUpdate = (commission) => {
    navigate(`/atualizar-comissao/${commission.comissaoId}`, { state: { commission } });
  };

  const handleClose = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    getCommission(token)
      .then(setData)
      .catch(error => {
        console.error("Erro ao carregar dados:", error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados das comissões. Por favor, tente novamente.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  }, [0]);

  const handleDelete = async (id) => {
    try {
      await deleteCommission(id, token);
      toast({
        title: "Comissão deletada",
        description: `A Comissão com ID ${id} foi removida.`,
        status: "success",
        duration: 2500,
        isClosable: true,
      });
      setData(prevData => prevData.filter(item => item.comissaoId !== id));
    } catch (error) {
      toast({
        title: "Erro ao deletar",
        description: "Não foi possível remover a comissão.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (

    <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #455559, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
      <TitleSection title="Lista de percentuais de Comissões" subtitle="Comissões sob serviços dos colaboradores." />
      <Box bg="#fff" p={1} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '70%']} maxWidth="1350px" marginX="auto" marginTop="2rem" marginBottom="2rem" mt="1rem">
        <ChakraProvider>
          <DataGridCommission data={data} onUpdate={handleUpdate} onDelete={handleDelete} />
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

export default ListaComissoes;
