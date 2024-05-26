import { Box, Container, Stack, Text, Flex } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="#28403D" color="white" width="full">
      <Container as={Stack} maxW="6xl" py={4} spacing={4} justify="center" align="center">
        <Flex justifyContent="space-between" alignItems="center" flexDirection={["column", "row"]}>
          <Text color="#fff" paddingRight={10}>© {new Date().getFullYear()} AgendaOn - Kezuka Style's Professional's. Todos os direitos reservados.</Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
