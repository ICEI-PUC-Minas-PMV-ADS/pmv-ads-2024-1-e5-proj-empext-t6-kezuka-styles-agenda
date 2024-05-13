// import { useEffect, useState } from 'react';
// import { HStack, ChakraProvider, Flex, Box, useToast } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';
// import DataGridClient from '../components/common/DataGridClient';
// import TitleSection from '../components/layout/TitleSection';
// import { getClient } from '../services/clientService';
// import { useAuth } from '../contexts/AuthContext';

// const ListaCliente = () => {
//   const { token } = useAuth();
//   const [data, setData] = useState([]);
//   const toast = useToast();
//   const navigate = useNavigate();

// //   const handleUpdate = (collaborator) => {
// //     navigate(`/atualizar-colaborador/${collaborator.colaboradorId}`, { state: { collaborator } });
// //   };

//   const handleClose = () => {
//     navigate('/dashboard');
//   };

//   useEffect(() => {
//     getClient(token)
//       .then(setData)
//       .catch(error => {
//         console.error("Erro ao carregar dados:", error);
//         toast({
//           title: "Erro ao carregar dados",
//           description: "Não foi possível carregar os dados dos clientes. Por favor, tente novamente.",
//           status: "error",
//           duration: 4000,
//           isClosable: true,
//         });
//       });
//   }, []);

//   return (

//     <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #455559, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
//       <TitleSection title="Lista de Clientes" subtitle="Qualquer negócio depende de um bom relacionamento com o cliente. Só assim a marca será forte e duradoura de verdade." />
//       <Box bg="#fff" p={1} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '70%']} maxWidth="1350px" marginX="auto" marginTop="2rem" marginBottom="2rem" mt="5rem">
//         <ChakraProvider>
//           <DataGridClient data={data}/>
//         </ChakraProvider>
//       </Box>
//       <HStack spacing={4} width="full" justify="center">
//         <Box
//           as='button'
//           onClick={handleClose}
//           p={3}
//           color='white'
//           fontWeight='bold'
//           borderRadius='md'
//           bgGradient='linear(to-l, #3D5A73, #3D5A73)'
//           _hover={{
//             bg: "#182625",
//           }}
//         >
//           VOLTAR
//         </Box>
//       </HStack>
//     </Flex>
//   );
// };

// export default ListaCliente;

import { useEffect, useState } from 'react';
import { HStack, ChakraProvider, Flex, Box, Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import DataGridClient from '../components/common/DataGridClient';
import TitleSection from '../components/layout/TitleSection';
import { getClient } from '../services/clientService';
import { useAuth } from '../contexts/AuthContext';

const ListaCliente = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();
  const navigate = useNavigate();

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
    navigate('/dashboard');
  };

  return (
    <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #455559, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
      <TitleSection title="Lista de Clientes" subtitle="Qualquer negócio depende de um bom relacionamento com o cliente. Só assim a marca será forte e duradoura de verdade." />
      <Box bg="#fff" p={1} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '70%']} maxWidth="1350px" marginX="auto" marginTop="2rem" marginBottom="2rem" mt="5rem">
        <ChakraProvider>
          <DataGridClient data={data} />
        </ChakraProvider>
      </Box>
      <HStack spacing={4} width="full" justify="center">
        <Button onClick={handlePrevious} isDisabled={currentPage === 1}>
          Anterior
        </Button>
        <Button onClick={handleNext} isDisabled={currentPage === totalPages}>
          Próximo
        </Button>
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

export default ListaCliente;
