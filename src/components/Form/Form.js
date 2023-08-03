import './Form.css';

function Form(props) {
    function submitForm(e) {
        e.preventDefault();
        props.onSubmit();
    }

    return (
        <form action="#" className="form" name={props.name} onSubmit={submitForm}>
            {props.children}

            <button
                type="submit"
                className={`form__submit-button ${props.type === 'profile' ? 'form__submit-button_type_profile' : ''} ${
                    props.isProfileEdit ? 'form__submit-button_type_profile-enable' : ''
                }`}
            >
                {props.buttonText}
            </button>
        </form>
    );
}

export default Form;
