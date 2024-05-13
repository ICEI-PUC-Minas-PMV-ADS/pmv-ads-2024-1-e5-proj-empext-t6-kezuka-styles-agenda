import { Heading, Text, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const TitleSection = ({ title, subtitle }) => {
    return (
        <Flex
            w="full"
            bg="#182625"
            p={5}
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            textAlign="center" 
        >
            <Heading
                as="h1"
                size="xl"
                fontWeight="bold"
                color="white"
                textTransform="uppercase"
                mb={2}
            >
                {title}
            </Heading>
            <Text fontSize="lg" color="gray.200">
                {subtitle}
            </Text>
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
