import { useEffect, useState } from 'react';
import { VStack, ChakraProvider, Flex, Box, useToast } from '@chakra-ui/react';
import DataGridClient from '../components/common/DataGridClient';
import TitleSection from '../components/layout/TitleSection';
import { getClient } from '../services/clientService';
import { useAuth } from '../contexts/AuthContext';
import { useUserRedirect } from "../hooks/UseUserRedirect";
import { ScrollTop } from 'primereact/scrolltop';
import ActionButtons from '../components/layout/ActionButtons';

const ListaCliente = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();
  const { redirectToDashboard } = useUserRedirect();
  const [containerHeight] = useState('300px');

  const loadClients = (page) => {
    getClient(token, page, pageSize)
      .then((response) => {
        setData(response.data);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
      })
      .catch((error) => {
        console.error("Erro ao carregar dados:", error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados dos clientes. Por favor, tente novamente.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    loadClients(currentPage);
  }, [token, currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClose = () => {
    redirectToDashboard();
  };

  return (
    <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #455559, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
      <TitleSection title="Clientes" subtitle={null} />
      <Box bg="#fff" p={5} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '50%']} maxWidth="960px" marginX="auto" marginTop="2rem" marginBottom="2rem" mt="1rem">
        <VStack spacing={4}>
          <ChakraProvider>
            <Box w={{ base: '100%', md: '100%' }} height={containerHeight} overflow="auto" position="relative">
            <DataGridClient data={data} />
            <ScrollTop target="parent" threshold={100} className="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
            </Box>
          </ChakraProvider>
          <ActionButtons 
            onBack={handleClose} 
            onSave={null} 
            isSaveDisabled={null} 
            showPagination={true}
            onPrevious={handlePrevious}
            onNext={handleNext}
            currentPage={currentPage}
            totalPages={totalPages}
          />
          </VStack> 
      </Box>
    </Flex>
  );
};

export default ListaCliente;

