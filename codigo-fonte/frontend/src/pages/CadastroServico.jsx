import { useState } from 'react';
import { Flex, Box, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../components/layout/CustomInput';
import TitleSection from '../components/layout/TitleSection';
import { registerService } from '../services/serviceService';
import { useAuth } from '../contexts/AuthContext';
import ActionButtons from '../components/layout/ActionButtons';
import { useUserRedirect } from "../hooks/UseUserRedirect";

const CadastroServico = () => {
    const { token } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { redirectToDashboard } = useUserRedirect();

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
        redirectToDashboard();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        if (!formData.nome.trim()) {
            toast({
                title: "Erro de validação",
                description: "Por favor, insira o nome do serviço.",
                status: "error",
                duration: 3000,
                isClosable: true,
                onCloseComplete: () => {
                    setIsSubmitting(false)
                }
            });
            return;
        }

        const valorCorrigido = formData.valor.replace(',', '.');

        if (!valorCorrigido.trim()) {
            toast({
                title: "Erro de validação",
                description: "Por favor, insira o valor do serviço.",
                status: "error",
                duration: 3000,
                isClosable: true,
                onCloseComplete: () => {
                    setIsSubmitting(false)
                }
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
                onCloseComplete: () => {
                    setIsSubmitting(false)
                }
            });
            return;
        }

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
                onCloseComplete: () => {
                    setIsSubmitting(false)
                }
            });
        }
    };

    return (
        <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #455559, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
            <TitleSection title="Serviços" subtitle="Cadastro de Serviços" />
            <Box bg="#fff" p={5} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '50%']} maxWidth="960px" marginX="auto" marginTop="2rem" marginBottom="2rem" mt="1rem">
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <CustomInput label="Nome" name="nome" placeholder="Descrição do Serviço" value={formData.nome} onChange={handleChange} />
                        <CustomInput label="Valor" name="valor" placeholder="Valor do serviço" value={formData.valor} onChange={handleChange} />
                        <ActionButtons onBack={handleClose} onSave={handleSubmit} isSaveDisabled={null} />
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
};

export default CadastroServico;
