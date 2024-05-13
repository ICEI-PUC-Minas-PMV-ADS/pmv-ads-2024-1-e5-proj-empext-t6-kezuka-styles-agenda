import { Box, Text, VStack } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
    const { user, token } = useAuth();

    return (
        <VStack spacing={4} align="center" justify="center" height="100vh">
            <Text fontSize="2xl" fontWeight="bold">Perfil do Usuário</Text>
            {user ? (
                <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
                    <Text><b>ID:</b> {user.id}</Text>
                    <Text><b>Nome:</b> {user.nome}</Text>
                    <Text><b>Tipo Usuário:</b> {user.tipoUsuario}</Text>
                    <Text><b>Email:</b> {user.email}</Text>
                    <Text><b>Token:</b> {token}</Text>
                </Box>
            ) : (
                <Text>Nenhum usuário está logado.</Text>
            )}
        </VStack>
    );
};

export default ProfilePage;
