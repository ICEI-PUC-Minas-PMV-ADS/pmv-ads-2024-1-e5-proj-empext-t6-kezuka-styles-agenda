import {
  Button, MenuButton,
  Menu,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

export const MenuColaborador = ({onClose}) => (
  <>
    <RouterLink to="/disponibilidade-calendario" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={onClose}>
      <Button color="white" bg="green" _hover={{ bg: "#2A542B" }} mb={4} py={8} w="full" justifyContent="space-between">
        <i className="pi pi-clock" style={{ fontSize: '25px', verticalAlign: 'middle' }} />&nbsp;&nbsp;Agendar
      </Button>
    </RouterLink>
    <Menu>
      <MenuButton color="white" boxSize="20" bg="#313DFA" _hover={{ bg: "#3D5A90" }} mb={4} py={6} w="full" as={Button} rightIcon={<ChevronDownIcon />} justifyContent="space-between">
        <i className="pi pi-list" style={{ fontSize: '25px', verticalAlign: 'middle' }} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Listar
      </MenuButton>
      <MenuList bg="#3D5A90">
        <MenuItem bg="#3D5A90">
          <RouterLink to="/disponibilidade-filtro-calendario" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={onClose}>
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
              <i className="pi pi-calendar-plus" style={{ fontSize: '25px', verticalAlign: 'middle' }} />&nbsp;&nbsp;Customizar<br />Disponibilidade
            </Button>
          </RouterLink>
        </MenuItem>
        <MenuItem bg="#3D5A90">
          <RouterLink to="/programar-disponibilidade-calendario" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={onClose}>
            <Button color="white" bg="#172237" _hover={{ bg: "#3D5A90" }} mb={0} py={8} w="full" justifyContent="space-between">
              <i className="pi pi-calendar-clock" style={{ fontSize: '25px', verticalAlign: 'middle' }} />&nbsp;&nbsp;Programar<br />Disponibilidade
            </Button>
          </RouterLink>
        </MenuItem>
      </MenuList>
    </Menu>
  </>
);
