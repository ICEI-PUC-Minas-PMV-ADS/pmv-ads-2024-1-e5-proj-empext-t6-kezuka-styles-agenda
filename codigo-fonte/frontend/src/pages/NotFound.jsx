import { Link } from 'react-router-dom';
import { Box, Flex, Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Header } from '../components/common/Header';
import Footer from '../components/common/Footer';

import style from './NotFound.module.css';

const NotFoundPage = () => {
  return (
    <Flex direction="column" minH="100vh" bg="#f1f1f1" w="100vw" m="0" p="0" overflowX="hidden">
      <Header />
      <Box flex="1" w="100%" overflow="hidden" p="0">
        <div className={style.container}>
          <h1>Erro 404</h1>
          <p>A página que você procura não foi encontrada ou não existe.</p>
          <Link to="/">
            <Button
              color='white'
              bg='#2d2654'
              gap={2}
              _hover={{ bg: '#28403d' }}
              >
              <ArrowBackIcon /> Volte para a página inicial
            </Button>
          </Link>
        </div>
      </Box>
      <Footer />
    </Flex>
  );
};

export default NotFoundPage;
