import './Form.css';
import { useLocation } from 'react-router-dom';

function Form(props) {
    const location = useLocation();

    function getClassNameByPath() {
        const path = location.pathname;

        if (path === '/signin') {
            return ' form__submit-button_type_login';
        } else if (path === '/signup') {
            return ' form__submit-button_type_signin';
        } else {
            return '';
        }
    }

    function disableButton() {
        if (props.isSubmitButtonDisable === false) {
            return ' form__submit-button_type_profile-disabled';
        } else {
            return '';
        }
    }

    function submitForm(e) {
        e.preventDefault();
        props.onSubmit();
    }

    return (
        <form action="#" className={`form`} name={props.name} onSubmit={submitForm}>
            {props.children}

            <button
                type="submit"
                className={`form__submit-button${props.type === 'profile' ? ' form__submit-button_type_profile' : ''}${
                    props.isProfileEdit ? ' form__submit-button_type_profile-shown' : ''
                }${getClassNameByPath()}${disableButton()}`}
            >
                {props.buttonText}
            </button>
        </form>
    );
}

export default Form;
