import { useState } from 'react';
import { Flex, Box, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../components/common/CustomInput';
import TitleSection from '../components/common/TitleSection';
import { RedefinitionAcess } from '../services/redefinitionPassword';
import ActionButtons from '../components/common/ActionButtons';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EsqueciMinhaSenha = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClose = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        if (!emailRegex.test(formData.email)) {
            toast({
                title: "Erro de validação",
                description: "Por favor, insira um e-mail válido.",
                status: "info",
                duration: 2000,
                isClosable: true,
                onCloseComplete: () => {
                    setIsSubmitting(false);
                }
            });
            return;
        }

        try {
            await RedefinitionAcess({ email: formData.email });
            toast({
                title: "E-mail enviado!",
                description: "Atenção um e-mail foi enviado para realizar a redefinição de senha",
                status: "success",
                duration: 3000,
                isClosable: true,
                onCloseComplete: () => navigate('/login-modal')
            });
        } catch (error) {
            toast({
                title: "Erro ao enviar o e-mail com a solicitação",
                description: "Não foi possível solicitar, E-mail não cadastrado!",
                status: "error",
                duration: 3000,
                isClosable: true,
                onCloseComplete: () => {
                    setIsSubmitting(false);
                }
            });
        }
    };

    return (
        <Flex direction="column" minH="100vh" align="center" justify="center" bgGradient="linear(180deg, #455559, #182625)" w="100vw" m="0" p="0" overflowX="hidden">
            <TitleSection title="Redefinir Senha" subtitle="Olá, gentileza adicionar o e-mail assim você irá receber uma senha provisória." />
            <Box bg="#fff" p={5} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '50%']} maxWidth="960px" marginX="auto" marginTop="2rem" marginBottom="2rem" mt="1rem">
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <CustomInput label="Email" name="email" type="email" placeholder="Adicione o e-mail e clique em salvar!" value={formData.email} onChange={handleChange} />
                        <ActionButtons onBack={handleClose} onSave={handleSubmit} isSaveDisabled={null} />
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
};

export default EsqueciMinhaSenha;
