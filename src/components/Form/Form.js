import './Form.css';
import { useLocation, useSearchParams } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { useEffect, useState } from 'react';

function Form(props) {
    const { isValid } = useForm();
    const location = useLocation();
    // const isButtonDisabled = !props.isFormValid;
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

    function submitForm(e) {
        e.preventDefault();
        props.onSubmit();
    }

    return (
        <form action="#" className="form" name={props.name} onSubmit={props.onSubmit} noValidate>
            {props.children}

            <button
                type="submit"
                // disabled={isButtonDisabled}
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
