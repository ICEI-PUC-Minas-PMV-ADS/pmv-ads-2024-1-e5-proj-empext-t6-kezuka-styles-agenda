import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    FormControl,
    FormLabel,
    Stack,
    Image,
    Box,
    HStack,
    Link,
    Text,
    useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/loginService';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo-kezuka.svg';

function ModalLogin() {
    const { login } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (location.pathname === '/login-modal') {
            onOpen();
        }
    }, [location, onOpen]);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const data = await loginUser({ email, senha: password });
            login(data, data.token);
            toast({
                title: "Login efetuado com sucesso!",
                description: `Seja bem vindo, ${data.nome}!`,
                status: "success",
                duration: 2000,
                isClosable: true
            });
            onClose();
            setIsLoading(false);

            switch (data.tipoUsuario) {
                case 'Gestor':
                    navigate('/lista-agendamento-gestor');
                    break;
                case 'Colaborador':
                    navigate('/lista-agendamento-colaborador');
                    break;
                case 'Cliente':
                    navigate('/lista-agendamento');
                    break;
                default:
                    navigate('/');
                    break;
            }
        } catch (error) {
            toast({
                title: "Ops, o login falhou...",
                description: error.response?.data?.message || "Verifique o login e senha, os dados podem estar errados...",
                status: "info",
                duration: 3000,
                isClosable: true
            });
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
        if (!location.pathname.includes('dashboard')) {
            navigate('/');
        }
    };

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={handleClose} isClosable={false} motionPreset="scale">
                <ModalOverlay
                    bg='blackAlpha.300'
                    style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, #606dbc, #606dbc 10px, #465298 10px, #465298 20px)'
                    }}
                />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack align="center" paddingTop={10}>
                            <Image
                                src={logo} 
                                boxSize="180px"
                                alt="Logo AgendaOn Kezuka Style's"
                            />
                            <ModalHeader>Acessar AgendaOn</ModalHeader>
                            <FormControl isRequired>
                                <FormLabel>E-mail</FormLabel>
                                <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Insira seu e-mail" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Senha</FormLabel>
                                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Insira sua senha" />
                                <HStack justifyContent="center">
                                    <Text mt={2} textAlign="center" fontSize="sm">
                                        <Link color="black" onClick={() => navigate('/esqueci-minha-senha')}>Esqueci minha senha</Link>
                                    </Text>
                                    <Text mt={2} textAlign="center" fontSize="sm">
                                        |
                                    </Text>
                                    <Text mt={2} textAlign="center" fontSize="sm">
                                        <Link color="black" onClick={() => navigate('/cadastro-cliente')}>Não possuo cadastro</Link>
                                    </Text>
                                </HStack>
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <HStack spacing={4} width="full" justify="center">
                            <Box
                                as='button'
                                onClick={handleLogin}
                                p={3}
                                color='white'
                                fontWeight='bold'
                                borderRadius='md'
                                bgGradient='linear(to-l, #244196, #244196)'
                                _hover={{
                                    bg: "#7786D9",
                                }}
                                disabled={isLoading}
                            >
                                LOGAR
                            </Box>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalLogin;
