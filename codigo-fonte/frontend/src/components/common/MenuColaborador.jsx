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
    Badge,
    MenuButton,
    Menu,
    MenuList,
    MenuItem

} from '@chakra-ui/react';
import { HamburgerIcon, ArrowBackIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const MenuColaborador = () => {
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
        <Box px={10} py={3} boxShadow="md" w="100%" bg="#173937">
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
                <DrawerContent bg="#173937">
                    <DrawerCloseButton color="white" />
                    <DrawerBody>
                        <Flex direction="column" paddingTop={20} align="center" mt={4}>
                            <Badge colorScheme="green" mb={4} borderRadius="full" px={2} py={1} fontSize="0.8em">
                                &#9679; Acesso: {user?.tipoUsuario || 'Desconhecido'}
                            </Badge>

                            <Flex direction="column" mt="50px" align="center" w="100%">
{/* 
                                <RouterLink to="/disponibilidade-calendario" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={onClose}>
                                    <Button color="white" bg="green" _hover={{ bg: "#2A542B" }} mb={4} py={8} w="full" justifyContent="space-between">
                                        <i className="pi pi-clock" style={{ fontSize: '25px', verticalAlign: 'middle' }} />&nbsp;&nbsp;Agendar
                                    </Button>
                                </RouterLink> */}
                                <RouterLink to="/lista-agendamento-colaborador" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={onClose}>
                                    <Button color="white" bg="#8965E2" _hover={{ bg: "#493678" }} mb={4} py={8} w="full" justifyContent="space-between">
                                        <i className="pi pi-calendar-clock" style={{ fontSize: '25px', verticalAlign: 'middle' }} />&nbsp;&nbsp;Minha Agenda
                                    </Button>
                                </RouterLink>
                                <Menu>
                                    <MenuButton color="white" boxSize="20" bg="#313DFA" _hover={{ bg: "#3D5A90" }} mb={4} py={6} w="full" as={Button} rightIcon={<ChevronDownIcon />} justifyContent="space-between">
                                        <i className="pi pi-list" style={{ fontSize: '25px', verticalAlign: 'middle' }} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Listar
                                    </MenuButton>
                                    <MenuList bg="#3D5A90">
                                        <MenuItem bg="#3D5A90">
                                            <RouterLink to="/disponibilidade-filtro-calendario-colaborador" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={onClose}>
                                                <Button color="white" bg="#172237" _hover={{ bg: "#3D5A90" }} mb={0} py={6} w="full" justifyContent="space-between">
                                                    <i className="pi pi-filter" style={{ fontSize: '25px', verticalAlign: 'middle' }} />&nbsp;&nbsp;Disponibilidades
                                                </Button>
                                            </RouterLink>
                                        </MenuItem>
                                        <MenuItem bg="#3D5A90">
                                            <RouterLink to="/lista-colaborador" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={onClose}>
                                                <Button color="white" bg="#172237" _hover={{ bg: "#3D5A90" }} mb={0} py={6} w="full" justifyContent="space-between">
                                                    <i className="pi pi-users" style={{ fontSize: '25px', verticalAlign: 'middle' }} />&nbsp;&nbsp;Colaboradores
                                                </Button>
                                            </RouterLink>
                                        </MenuItem>
                                        <MenuItem bg="#3D5A90">
                                            <RouterLink to="/lista-comissao" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={onClose}>
                                                <Button color="white" bg="#172237" _hover={{ bg: "#3D5A90" }} mb={0} py={6} w="full" justifyContent="space-between">
                                                    <i className="pi pi-list-check" style={{ fontSize: '25px', verticalAlign: 'middle' }} />&nbsp;&nbsp;Comissões
                                                </Button>
                                            </RouterLink>
                                        </MenuItem>
                                        <MenuItem bg="#3D5A90">
                                            <RouterLink to="/lista-servico" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={onClose}>
                                                <Button color="white" bg="#172237" _hover={{ bg: "#3D5A90" }} mb={0} py={6} w="full" justifyContent="space-between">
                                                    <i className="pi pi-list" style={{ fontSize: '25px', verticalAlign: 'middle' }} />&nbsp;&nbsp;Serviços
                                                </Button>
                                            </RouterLink>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>

                                <Menu>
                                    <MenuButton color="white" boxSize="20" bg="#FF9D00" _hover={{ bg: "#FA7A32" }} mb={4} py={6} w="full" as={Button} rightIcon={<ChevronDownIcon />} justifyContent="space-between">
                                        <i className="pi pi-plus-circle" style={{ fontSize: '25px', verticalAlign: 'middle' }} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cadastrar
                                    </MenuButton>
                                    <MenuList bg="#3D5A90">
                                        <MenuItem bg="#3D5A90">
                                            <RouterLink to="/customizar-disponibilidade-calendario" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={onClose}>
                                                <Button color="white" bg="#172237" _hover={{ bg: "#3D5A90" }} mb={0} py={8} w="full" justifyContent="space-between">
                                                    <i className="pi pi-calendar-plus" style={{ fontSize: '25px', verticalAlign: 'middle' }} />&nbsp;&nbsp;Customizar<br/>Disponibilidade
                                                </Button>
                                            </RouterLink>
                                        </MenuItem>
                                        <MenuItem bg="#3D5A90">
                                            <RouterLink to="/programar-disponibilidade-calendario" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={onClose}>
                                                <Button color="white" bg="#172237" _hover={{ bg: "#3D5A90" }} mb={0} py={8} w="full" justifyContent="space-between">
                                                    <i className="pi pi-calendar-clock" style={{ fontSize: '25px', verticalAlign: 'middle' }} />&nbsp;&nbsp;Programar<br/>Disponibilidade
                                                </Button>
                                            </RouterLink>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>

                                <RouterLink to="/" onClick={handleLogout} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <Button color="white" boxSize="20" bg="#A70D00" _hover={{ bg: "#460B06" }} w="full" py={6} rightIcon={<ArrowBackIcon />} justifyContent="space-between">
                                        Logout
                                    </Button>
                                </RouterLink>
                            </Flex>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default MenuColaborador;
