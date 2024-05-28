import { useState, useEffect } from 'react';
import { Flex, Box, VStack, useToast, Select } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import CustomInput from '../../components/layout/CustomInput';
import TitleSection from '../../components/layout/TitleSection';
import { registerCommission } from '../../services/commissionService';
import { getCollaborators } from '../../services/collaboratorService';
import ActionButtons from '../../components/layout/ActionButtons';
import { getServices } from '../../services/serviceService';
import { useAuth } from '../../contexts/AuthContext';

const CadastroComissoes = () => {

    const { token } = useAuth();
    const toast = useToast();
    const [collaborators, setCollaborators] = useState([]);
    const [services, setServices] = useState([]);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        colaboradorId: '',
        servicoId: '',
        percentual: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const collabData = await getCollaborators(token);
                const serviceData = await getServices(token);
                setCollaborators(collabData);
                setServices(serviceData);
            } catch (error) {
                toast({
                    title: "Erro ao carregar dados",
                    description: "Não foi possível carregar dados necessários.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        };
        fetchData();
    }, [token, toast]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "percentual") {
            setFormData(prevState => ({
                ...prevState,
                [name]: parseFloat(value)
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleClose = () => {
        navigate('/dashboard');
    };

    // Função para envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);


        if (!formData.colaboradorId) {
            toast({
                title: "Erro de validação",
                description: "Por favor, selecione um colaborador.",
                status: "error",
                duration: 3000,
                isClosable: true,
                onCloseComplete: () => {
                    setIsSubmitting(false)
                }
            });
            return;
        }

        if (!formData.servicoId) {
            toast({
                title: "Erro de validação",
                description: "Por favor, selecione um serviço.",
                status: "error",
                duration: 3000,
                isClosable: true,
                onCloseComplete: () => {
                    setIsSubmitting(false)
                }
            });
            return;
        }

        if (!formData.percentual) {
            toast({
                title: "Erro de validação",
                description: "Por favor, insira um percentual.",
                status: "error",
                duration: 3000,
                isClosable: true,
                onCloseComplete: () => {
                    setIsSubmitting(false)
                }
            });
            return;
        }

        try {
            const data = await registerCommission({ ...formData }, token);
            toast({
                title: "Comissão cadastrada",
                description: `A comissão foi registrada com sucesso! ${data.percentual}%` || 'serviço',
                status: "success",
                duration: 1000,
                isClosable: true,
                onCloseComplete: () => navigate('/lista-comissao')
            });

        } catch (error) {
            if (error.response) {
                toast({
                    title: "Erro ao cadastrar",
                    description: error.response.data.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    onCloseComplete: () => {
                        setIsSubmitting(false)
                    }
                });
            } else {
                toast({
                    title: "Erro de validação",
                    description: error.message || "Uma comissão com este colaborador e serviço já existe.",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                    onCloseComplete: () => {
                        setIsSubmitting(false)
                    }
                });
            }
        }
    };

    return (
        <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #455559, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
            <TitleSection title="Cadastro de Comissões" subtitle="Formulário para cadastro de comissões de serviços aos colaboradores." />
            <Box bg="#fff" p={5} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '50%']} maxWidth="960px" marginX="auto" marginTop="2rem" marginBottom="2rem" mt="1rem">
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <Select placeholder="Selecione o Colaborador" name="colaboradorId" onChange={handleChange} value={formData.colaboradorId}>
                            {collaborators.map(col => (
                                <option key={col.colaboradorId} value={col.colaboradorId}>{col.nome}</option>
                            ))}
                        </Select>
                        <Select placeholder="Selecione o Serviço" name="servicoId" onChange={handleChange} value={formData.servicoId}>
                            {services.map(serv => (
                                <option key={serv.servicoId} value={serv.servicoId}>{serv.nome}</option>
                            ))}
                        </Select>
                        <CustomInput
                            label="Percentual"
                            name="percentual"
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            defaultValue={formData.percentual}
                            placeholder="Digite o percentual"
                            value={formData.percentual}
                            onChange={handleChange}
                        />
                     <ActionButtons onBack={handleClose} onSave={handleSubmit} isSaveDisabled={null} />
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
};

export default CadastroComissoes;
