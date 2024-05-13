import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HStack, Flex, Box, VStack, useToast } from '@chakra-ui/react';
import CustomInput from '../components/layout/CustomInput';
import TitleSection from '../components/layout/TitleSection';
import { updateService } from '../services/serviceService';
import { useAuth } from '../contexts/AuthContext'; 

const AtualizarServico = () => {
    const { token } = useAuth(); 
    const toast = useToast();
    const location = useLocation();
    const navigate = useNavigate();
    const service = location.state.service;

    const [formData, setFormData] = useState({
        servicoId: '',
        nome: '',
        valor: '',
    });

    useEffect(() => {
        if (service) {
            setFormData({
                servicoId: service.servicoId,
                nome: service.nome,
                valor: service.valor,
            });
        }
    }, [service]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClose = () => {
        navigate('/dashboard');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const valorCorrigido = formData.valor.replace(',', '.');

        const dataToUpdate = {
            servicoId: formData.servicoId,
            nome: formData.nome,
            valor: valorCorrigido,
        };

        try {
            const data = await updateService(formData.servicoId, dataToUpdate, token);
            toast({
                title: "Serviço atualizado",
                description: `Os dados foram atualizados com sucesso! ${data.nome || 'serviço'}.`,
                status: "success",
                duration: 2500,
                isClosable: true,
                onCloseComplete: () => navigate('/lista-servico')
            });
        } catch (error) {
            toast({
                title: "Erro ao atualizar",
                description: error.message || "Não foi possível atualizar o serviço.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #455559, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
            <TitleSection title="Atualização de Serviços" subtitle="Formulário de atualização de serviços." />
            <Box bg="#fff" p={5} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '50%']} maxWidth="960px" marginX="auto" marginTop="2rem" marginBottom="2rem" mt="5rem">
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <CustomInput label="Nome" name="nome" placeholder="Digite o nome completo" value={formData.nome} onChange={handleChange} />
                        <CustomInput label="Valor" name="valor" placeholder="Digite o valor do serviço" value={formData.valor} onChange={handleChange} />
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
                            <Box
                                type='submit'
                                as='button'
                                p={3}
                                color='white'
                                fontWeight='bold'
                                borderRadius='md'
                                bgGradient='linear(to-l, #244196, #244196)'
                                _hover={{
                                    bg: "#7786D9",
                                }}
                            >
                                ATUALIZAR
                            </Box>
                        </HStack>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
};

export default AtualizarServico;
