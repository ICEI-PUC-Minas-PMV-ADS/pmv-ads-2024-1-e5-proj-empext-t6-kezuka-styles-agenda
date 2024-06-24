import { FormControl, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const CustomInput = ({ name, type = 'text', placeholder, onChange, value }) => {
    return (
        <FormControl isRequired>
            <Input
                id={name}
                fontSize="18px"
                color="#3D5A73"
                fontWeight="bold"
                name={name}
                type={type}
                placeholder={placeholder}
                size='lg'
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
