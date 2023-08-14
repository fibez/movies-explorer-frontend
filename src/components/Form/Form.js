import './Form.css';
import { useLocation, useSearchParams } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { useEffect, useState } from 'react';

function Form(props) {
    const location = useLocation();
    const isButtonDisabled = !props.isFormValid || props.isLoading;
    const isUserRequestSucces = props.isUserRequestSucces;

    function getClassNameByPath() {
        const path = location.pathname;

        if (path === '/signin') {
            return ' form__submit-button_type_login';
        } else if (path === '/signup') {
            return ' form__submit-button_type_signup';
        } else {
            return '';
        }
    }

    function getClassNameByUserRequestSuccess() {
        if (isUserRequestSucces) {
            return 'form__error-message_success';
        }
    }

    function submitForm(e) {
        e.preventDefault();
        props.onSubmit();
    }

    useEffect(() => {
        if (props.formValidationMessage) {
            console.log('jopa');
        }
    }, [props.formValidationMessage]);

    return (
        <form action="#" className="form" name={props.name} onSubmit={submitForm} noValidate>
            {props.children}
            <span
                className={`form__error-message ${getClassNameByUserRequestSuccess()} ${
                    location.pathname === '/signin' || location.pathname === '/signup'
                        ? 'form__error-message_auth-page'
                        : ''
                }`}
            >
                {props.formValidationMessage}
            </span>
            <button
                type="submit"
                disabled={isButtonDisabled}
                className={`form__submit-button${props.type === 'profile' ? ' form__submit-button_type_profile' : ''}${
                    props.isProfileEdit ? ' form__submit-button_type_profile-shown' : ''
                }${getClassNameByPath()}${''}`}
            >
                {props.buttonText}
            </button>
        </form>
    );
}

export default Form;
