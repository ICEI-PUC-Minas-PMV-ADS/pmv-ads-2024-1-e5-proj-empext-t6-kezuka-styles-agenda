import { useState } from 'react';
import { HStack, Flex, Box, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../components/layout/CustomInput';
import TitleSection from '../components/layout/TitleSection';
import { registerService } from '../services/serviceService';
import { useAuth } from '../contexts/AuthContext';

const CadastroServico = () => {
    const { token } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: '',
        valor: '',
    });

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

        if (!formData.nome.trim()) {
            toast({
                title: "Erro de validação",
                description: "Por favor, insira o nome do serviço.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Substituir vírgulas por pontos no valor
        const valorCorrigido = formData.valor.replace(',', '.');

        if (!valorCorrigido.trim()) {
            toast({
                title: "Erro de validação",
                description: "Por favor, insira o valor do serviço.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (isNaN(Number(valorCorrigido)) || Number(valorCorrigido) <= 0) {
            toast({
                title: "Erro de validação",
                description: "O valor do serviço deve ser um número positivo.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Atualizar o valor no objeto `formData`
        const formDataCorrigido = { ...formData, valor: valorCorrigido };

        try {
            const data = await registerService(formDataCorrigido, token);
            toast({
                title: "Serviço cadastrado",
                description: `Os dados foram cadastrados com sucesso! ${data.nome || 'serviço'}.`,
                status: "success",
                duration: 2500,
                isClosable: true,
                onCloseComplete: () => navigate('/lista-servico')
            });
        } catch (error) {
            toast({
                title: "Erro ao cadastrar",
                description: error.message || "Não foi possível cadastrar o serviço.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #455559, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
            <TitleSection title="Cadastro de Serviços" subtitle="Formulário de cadastro de serviços." />
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
                                CADASTRAR
                            </Box>
                        </HStack>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
};

export default CadastroServico;
