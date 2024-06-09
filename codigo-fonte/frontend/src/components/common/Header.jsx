import {
  Box,
  Button,
  Flex,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Text,
  Avatar,
  HStack,
  useToast,
  Badge
} from '@chakra-ui/react';
import { HamburgerIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { MenuCliente } from './MenuCliente';
import { MenuColaborador } from './MenuColaborador';
import { MenuGestor } from './MenuGestor';

export const Header = () => {
  const toast = useToast();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
    toast({
      title: "Logout realizado",
      description: "Volte sempre, " + (user?.nome || "Usuário") + "!",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top"
    });
  };

  return (
    <Box px={10} py={3} boxShadow="md" w="100%" bg="#2D2654">
      <Flex justify="space-between" align="center" w="100%">
        <HStack spacing={4}>
          <Avatar name={user?.nome || 'No Name'} src={user?.image || 'https://fallback-url.com/default-avatar.png'} mr={2} />
          <VStack align="flex-start" spacing={0}>
            <Text fontSize="md" color="white" fontWeight="bold">{"Olá,"}&nbsp;&nbsp;{user?.nome || 'No Name'}</Text>
            <Text fontSize="sm" color="white">{user?.email || 'noemail@example.com'}</Text>
          </VStack>
        </HStack>
        <IconButton
          icon={<HamburgerIcon />}
          variant="outline"
          aria-label="Open Menu"
          onClick={onToggle}
          size="lg"
          color="white"
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent bg="#221D40">
          <DrawerCloseButton color="white" />
          <DrawerBody>
            <Flex direction="column" paddingTop={20} align="center" mt={4}>
              <Badge colorScheme="green" mb={4} borderRadius="full" px={2} py={1} fontSize="0.8em">
                &#9679; Acesso: {user?.tipoUsuario || 'Desconhecido'}
              </Badge>

              <Flex direction="column" mt="50px" align="center" w="100%">
                {!user ? (
                  <>
                    <RouterLink to="/login-modal" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={onClose}>
                      <Button bg="white" mb={4} onClick={onClose} w="full">
                        Login
                      </Button>
                    </RouterLink>

                    <RouterLink to="/cadastro-cliente" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={onClose}>
                      <Button color="white" bg="#244196" _hover={{ bg: "#244196" }} w="full">Cadastre-se</Button>
                    </RouterLink>
                  </>
                ) : (
                  <>
                    {
                      user?.tipoUsuario === 'Cliente' ? (
                        <MenuCliente onClose={onClose} />
                      ) : user?.tipoUsuario === 'Colaborador' ? (
                        <MenuColaborador onClose={onClose} />
                      ) : user?.tipoUsuario === 'Gestor' ? (
                        <MenuGestor onClose={onClose} />
                      ) : <></>
                    }

                    <RouterLink to="/" onClick={handleLogout} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Button color="white" boxSize="20" bg="#0B111B" _hover={{ bg: "#A70D00" }} w="full" py={6} rightIcon={<ArrowBackIcon />} justifyContent="space-between">
                        Logout
                      </Button>
                    </RouterLink>
                  </>
                )}
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
