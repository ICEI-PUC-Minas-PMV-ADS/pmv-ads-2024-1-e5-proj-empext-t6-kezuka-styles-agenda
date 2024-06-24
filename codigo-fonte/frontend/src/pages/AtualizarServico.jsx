import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flex, Box, VStack, useToast } from '@chakra-ui/react';
import CustomInput from '../components/common/CustomInput';
import TitleSection from '../components/common/TitleSection';
import { updateService } from '../services/serviceService';
import { useAuth } from '../contexts/AuthContext'; 
import ActionButtons from '../components/common/ActionButtons';
import { useUserRedirect } from "../hooks/UseUserRedirect";

const AtualizarServico = () => {
    const { token } = useAuth(); 
    const toast = useToast();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const service = location.state.service;
    const { redirectToDashboard } = useUserRedirect();

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
                valor: service.valor.toString(), // Converte valor para string aqui
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
        redirectToDashboard();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

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
                onCloseComplete: () => {
                    setIsSubmitting(false)
                }
            });
        }
    };

    return (
        <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #455559, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
            <TitleSection title="Atualização de Serviços" subtitle="Formulário de atualização de serviços." />
            <Box bg="#fff" p={5} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '50%']} maxWidth="960px" marginX="auto" marginTop="2rem" marginBottom="2rem" mt="1rem">
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <CustomInput label="Nome" name="nome" placeholder="Digite o nome completo" value={formData.nome} onChange={handleChange} />
                        <CustomInput label="Valor" name="valor" placeholder="Digite o valor do serviço" value={formData.valor} onChange={handleChange} />
                        <ActionButtons onBack={handleClose} onSave={handleSubmit} isSaveDisabled={null} />
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
};

export default AtualizarServico;
