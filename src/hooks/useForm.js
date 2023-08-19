import { useState, useCallback } from 'react';
import { nameRegex, passwordRegex } from '../utils/config/regex.js';
const validator = require('email-validator');

function useForm() {
    const [formValues, setFormValues] = useState({});
    const [inputErrors, setInputErrors] = useState({});
    const [isValid, setIsValid] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === 'name' && !regexInputValidation(value, nameRegex) && nameInputValidation(value)) {
            e.target.setCustomValidity('Имя должно содержать только латиницу, кириллицу, пробел или дефис');
        } else if (name === 'name' && !nameInputValidation(value)) {
            e.target.setCustomValidity('Имя должно быть длинне чем 2 символа');
        } else if (name === 'email' && !validator.validate(value)) {
            e.target.setCustomValidity('Введен некорректный e-mail.');
        } else if (name === 'password' && !passwordInputValidation(value)) {
            e.target.setCustomValidity('Пароль должен содержать минимум 6 знаков');
        } else {
            e.target.setCustomValidity('');
        }

        setFormValues((values) => ({ ...values, [name]: value }));
        setInputErrors((inputErrors) => ({ ...inputErrors, [name]: e.target.validationMessage }));
        const formValid = e.target.closest('form').checkValidity();
        setIsValid(formValid);
    }

    function regexInputValidation(value, regex) {
        return regex.test(value);
    }
    function nameInputValidation(value) {
        return value.length >= 2 && value.length <= 30;
    }

    function passwordInputValidation(value) {
        return value.length >= 6;
    }

    const resetForm = useCallback(function reset(values = {}, errors = {}, formValid = false) {
        setFormValues(values);
        setInputErrors(errors);
        setIsValid(formValid);
    }, []);

    return {
        formValues,
        setFormValues,
        handleChange,
        isValid,
        inputErrors,
        resetForm,
    };
}

export default useForm;
