import { FormControl, FormLabel, Input, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const CustomInput = ({ label, name, type = 'text', placeholder, onChange, value }) => {
    const inputTextColor = useColorModeValue('teal', 'gray.200');
    return (
        <FormControl isRequired>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input
                id={name}h
                name={name}
                type={type}
                placeholder={placeholder}
                size='lg'
                color={inputTextColor}
                _placeholder={{ color: 'inherit' }}
                value={value}
                onChange={onChange}
            />
        </FormControl>
    );
};

CustomInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

CustomInput.defaultProps = {
    type: 'text',
    placeholder: ''
};

export default CustomInput;
