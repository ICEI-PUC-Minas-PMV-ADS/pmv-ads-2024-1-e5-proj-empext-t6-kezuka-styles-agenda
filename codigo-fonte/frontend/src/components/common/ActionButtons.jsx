import { Box, HStack, Icon } from '@chakra-ui/react';
import { CheckCircleIcon, ArrowBackIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const ActionButtons = ({ onBack, onSave, isSaveDisabled, showPagination, onPrevious, onNext, currentPage, totalPages }) => {
    return (
        <Box bg="#172237" p={3} shadow="md" borderWidth="1px" borderRadius="md" w={['100%', '100%', '100%']}>
            <HStack spacing={4} width="full" justify="center">
                <Box
                    as='button'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    onClick={onBack}
                    px={4} py={2}
                    color='white'
                    borderRadius='md'
                    bgGradient='linear(to-l, #3D5A73, #3D5A73)'
                    _hover={{ bg: "#3D5A90" }}
                >
                    <Icon boxSize="4" as={ArrowBackIcon} />&nbsp;&nbsp;Menu
                </Box>
                {onSave && (
                    <Box
                        as='button'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        onClick={onSave}
                        px={4} py={2}
                        color='white'
                        borderRadius='md'
                        bgGradient='linear(to-l, green, green)'
                        _hover={{ bg: "#2A542B" }}
                        isDisabled={isSaveDisabled}
                    >
                        <Icon boxSize="4" as={CheckCircleIcon} />&nbsp;&nbsp;Salvar
                    </Box>
                )}
                {showPagination && (
                    <>
                        <Box
                            as='button'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            px={4} py={2}
                            color='white'
                            borderRadius='md'
                            bgGradient='linear(to-l, green, green)'
                            _hover={{ bg: "#2A542B" }}
                            onClick={onPrevious}
                            isDisabled={currentPage === 1}>
                            <i className="pi pi-arrow-circle-left" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'white' }} />
                        </Box>
                        <Box
                            as='button'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            px={4} py={2}
                            color='white'
                            borderRadius='md'
                            bgGradient='linear(to-l, green, green)'
                            onClick={onNext}
                            _hover={{ bg: "#2A542B" }} isDisabled={currentPage === totalPages}>
                            <i className="pi pi-arrow-circle-right" style={{ fontSize: '20px', verticalAlign: 'middle', color: 'white' }} />
                        </Box>
                    </>
                )}
            </HStack>
        </Box>
    );
};

ActionButtons.propTypes = {
    onBack: PropTypes.func.isRequired,
    onSave: PropTypes.func,
    isSaveDisabled: PropTypes.bool,
    showPagination: PropTypes.bool,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number
};

export default ActionButtons;
