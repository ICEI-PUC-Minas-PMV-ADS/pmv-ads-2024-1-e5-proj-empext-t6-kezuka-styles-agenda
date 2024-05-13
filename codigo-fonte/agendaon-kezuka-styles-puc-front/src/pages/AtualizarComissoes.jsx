import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HStack, Flex, Box, VStack, useToast, Select } from '@chakra-ui/react';
import CustomInput from '../components/layout/CustomInput';
import TitleSection from '../components/layout/TitleSection';
import { updateCommission } from '../services/commissionService';
import { useAuth } from '../contexts/AuthContext';

const AtualizarComissoes = () => {
    const { token } = useAuth();
    const toast = useToast();
    const location = useLocation();
    const navigate = useNavigate();
    const commission = location.state.commission;

    const [formData, setFormData] = useState({
        comissaoId: 0,
        colaboradorId: 0,
        servicoId: 0,
        percentual: '',
    });

    useEffect(() => {
        if (commission) {
            setFormData({
                comissaoId: commission.comissaoId,
                colaboradorId: commission.colaboradorId,
                servicoId: commission.servicoId,
                percentual: commission.percentual,
            });
        }
    }, [commission]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: name === "percentual" ? parseFloat(value) : value,
        }));
    };

    const handleClose = () => {
        navigate('/dashboard');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToUpdate = {
            comissaoId: formData.comissaoId,
            colaboradorId: formData.colaboradorId,
            servicoId: formData.servicoId,
            percentual: parseFloat(formData.percentual),
        };

        console.log("Dados a serem enviados:", dataToUpdate);

        try {
            const data = await updateCommission(dataToUpdate.comissaoId, dataToUpdate, token);
            toast({
                title: "Comissão atualizada",
                description: `Os dados foram atualizados com sucesso! ${data.percentual}%`,
                status: "success",
                duration: 2500,
                isClosable: true,
                onCloseComplete: () => navigate('/lista-comissao')
            });
        } catch (error) {
            const errorMessage = error.response?.message || "Não foi possível atualizar a comissão.";
            toast({
                title: "Erro ao atualizar",
                description: errorMessage,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #455559, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
            <TitleSection title="Atualizar Comissão" subtitle="Formulário para atualização de comissões." />
            <Box bg="#fff" p={5} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '50%']} maxWidth="960px" marginX="auto" marginTop="2rem" marginBottom="2rem" mt="5rem">
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <Select
                            name="colaboradorId"
                            value={formData.colaboradorId}
                            onChange={handleChange}
                            isDisabled
                        >
                            <option value={formData.colaboradorId}>{commission.nomeColaborador}</option>
                        </Select>
                        <Select
                            name="servicoId"
                            value={formData.servicoId}
                            onChange={handleChange}
                            isDisabled
                        >
                            <option value={formData.servicoId}>{commission.nomeServico}</option>
                        </Select>
                        <CustomInput
                            label="Percentual"
                            name="percentual"
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            value={formData.percentual}
                            onChange={handleChange}
                        />
                        <HStack spacing={4} width="full" justify="center">
                            <Box
                                as="button"
                                onClick={handleClose}
                                p={3}
                                color="white"
                                fontWeight="bold"
                                borderRadius="md"
                                bgGradient="linear(to-l, #3D5A73, #3D5A73)"
                                _hover={{
                                    bg: "#182625",
                                }}
                            >
                                VOLTAR
                            </Box>
                            <Box
                                type="submit"
                                as="button"
                                p={3}
                                color="white"
                                fontWeight="bold"
                                borderRadius="md"
                                bgGradient="linear(to-l, #244196, #244196)"
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

export default AtualizarComissoes;
