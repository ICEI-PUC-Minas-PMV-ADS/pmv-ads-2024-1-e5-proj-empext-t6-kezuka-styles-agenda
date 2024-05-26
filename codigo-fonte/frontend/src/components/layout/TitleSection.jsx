import { Heading, Text, Flex, Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const TitleSection = ({ title, subtitle }) => {
    return (
        <Flex
            w="full"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            textAlign="center" 
        >
            <Box bg="#fff" p={5} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '50%']} maxWidth="960px" marginX="auto">
            <Heading
                as="h1"
                size="xl"
                fontWeight="bold"
                color="#172237"
                textTransform="uppercase"
                mb={2}
            >
                {title}
            </Heading>
            <Text fontSize="lg" fontWeight="bold" color="#172237">
                {subtitle}
            </Text>
            </Box>
        </Flex>
    );
};

TitleSection.propTypes = {
    title: PropTypes.string.isRequired,  
    subtitle: PropTypes.string          
};


TitleSection.defaultProps = {
    subtitle: 'preencha um sub titulo SR. DEV'  
};

export default TitleSection;
