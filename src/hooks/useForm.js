import { useState, useCallback, useEffect } from 'react';
import { minNameLength, maxNameLength, passwordRegex } from '../utils/config/inputsValidationSettings.js';
const validator = require('email-validator');

// import isEmail from 'validator/es/lib/isEmail';
// import { NAME_ERROR, EMAIL_ERROR } from '../utils/configs/errorsConfig.js';

function useForm() {
    const [formValues, setFormValues] = useState({});
    const [isValid, setIsValid] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === 'name' && !nameInputValidation(value)) {
            e.target.setCustomValidity('NAME_ERROR');
        } else if (name === 'email' && !validator.validate(value)) {
            e.target.setCustomValidity('EMAIL_ERROR');
        } else {
            e.target.setCustomValidity('');
        }
        setFormValues((values) => ({ ...values, [name]: value }));
        // setFormValues((errors) => ({ ...errors, [name]: e.target.validationMessage }));
        const formValid = e.target.closest('form').checkValidity();
        setIsValid(formValid);
    }

    function nameInputValidation(value) {
        const length = value.trim().length;
        return length >= minNameLength && length <= maxNameLength;
    }

    return {
        formValues,
        setFormValues,
        handleChange,
        isValid,
    };
}

export default useForm;
