import { useState } from 'react';
import { Flex, Box, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../components/layout/CustomInput';
import TitleSection from '../components/layout/TitleSection';
import { registerClient } from '../services/clientService';
import moment from 'moment-timezone';
import ActionButtons from '../components/layout/ActionButtons';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10,11}$/;
const dateOfBirthRegex = /^(19[0-9]{2}|20[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;


const CadastroCliente = () => {

    const toast = useToast();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        celular: '',
        dataNascimento: '',
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

        if (!dateOfBirthRegex.test(formData.dataNascimento)) {
            toast({
                title: "Erro de validação",
                description: "Por favor, insira uma data de nascimento válida.",
                status: "error",
                duration: 1000,
                isClosable: true,
                onCloseComplete: () => {
                    setIsSubmitting(false)
                }
            });
            return;
        } if (!emailRegex.test(formData.email)) {
            toast({
                title: "Erro de validação",
                description: "Por favor, insira um e-mail válido.",
                status: "error",
                duration: 2000,
                isClosable: true,
                onCloseComplete: () => {
                    setIsSubmitting(false)
                }
            });
            return;
        } if (!phoneRegex.test(formData.celular)) {
            toast({
                title: "Erro de validação",
                description: "Por favor, insira um número de celular válido. (10 a 11 dígitos)",
                status: "error",
                duration: 2000,
                isClosable: true,
                onCloseComplete: () => {
                    setIsSubmitting(false)
                }
            });
            return;
        }
        try {
            const dataCadastro = moment().tz("America/Sao_Paulo").format();
            const data = await registerClient({ ...formData, dataCadastro });
            toast({
                title: "Cliente cadastrado",
                description: `Os dados foram cadastrados com sucesso! Bem-vindo(a), ${data.nome || 'cliente'}.`,
                status: "success",
                duration: 2500,
                isClosable: true,
                onCloseComplete: () => navigate('/login-modal')
            });
        } catch (error) {
            toast({
                title: "Erro ao cadastrar",
                description: error.message || "Não foi possível cadastrar o cliente.",
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
            <TitleSection title="Cadastro de Clientes" subtitle="Olá amigo(a) cliente para obter um login de acesso, gentileza efetuar cadastro." />
            <Box bg="#fff" p={5} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '50%']} maxWidth="960px" marginX="auto" marginTop="2rem" marginBottom="2rem" mt="1rem">
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <CustomInput label="Nome" name="nome" placeholder="Digite o nome completo" value={formData.nome} onChange={handleChange} />
                        <CustomInput label="Email" name="email" type="email" placeholder="Este e-mail será utilizado para o login" value={formData.email} onChange={handleChange} />
                        <CustomInput label="Senha" name="senha" type="password" placeholder="Senha" value={formData.senha} onChange={handleChange} />
                        <CustomInput label="Celular" name="celular" placeholder="Celular" value={formData.celular} onChange={handleChange} />
                        <CustomInput label="Data de Nascimento" name="dataNascimento" type="date" placeholder="Data de Nascimento" value={formData.dataNascimento} onChange={handleChange} />
                        <ActionButtons onBack={handleClose} onSave={handleSubmit} isSaveDisabled={null} />
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
};

export default CadastroCliente;