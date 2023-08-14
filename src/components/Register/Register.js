import './Register.css';
import AuthenticationPage from '../AuthenticationPage/AuthenticationPage';
import { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';

function Register(props) {
    const navigation = useNavigate();
    const { formValues, handleChange, isValid, inputErrors, resetForm } = useForm();

    useEffect(() => {
        props.isLoggedIn && navigation('/movies', { replace: true });
    }, []);

    function handleSubmitForm(e) {
        props.onSubmitSignUp(formValues);
    }

    return (
        <main className="register">
            <AuthenticationPage
                title={'Добро пожаловать!'}
                submitButtonText={'Зарегистрироваться'}
                linkDescriptionText={'Уже зарегистрированы?'}
                linkText={'Войти'}
                onSubmit={handleSubmitForm}
                navTo="/signin"
                isValid={isValid}
                formValidationMessage={props.formValidationMessage}
                isLoading={props.isLoading}
                isUserRequestSucces={props.isUserRequestSucces}
            >
                <label className="register__input-label">Имя</label>
                <input
                    type="text"
                    className={`register__input ${inputErrors.name ? 'register__input_is_not-valid' : ''}`}
                    name="name"
                    id="name"
                    placeholder="Имя"
                    autoComplete="off"
                    value={formValues.name}
                    onChange={handleChange}
                    required
                />
                <span className="register__error">{inputErrors.name}</span>
                <label htmlFor="email" className="register__input-label">
                    E-mail
                </label>
                <input
                    type="email"
                    className={`register__input ${inputErrors.email ? 'register__input_is_not-valid' : ''}`}
                    name="email"
                    id="email"
                    placeholder="E-mail"
                    autoComplete="off"
                    value={formValues.email}
                    onChange={handleChange}
                    required
                />
                <span className="register__error">{inputErrors.email}</span>
                <label htmlFor="password" className="register__input-label">
                    Пароль
                </label>
                <input
                    type="password"
                    className={`register__input ${inputErrors.password ? 'register__input_is_not-valid' : ''}`}
                    name="password"
                    id="password"
                    placeholder="Пароль"
                    autoComplete="off"
                    value={formValues.password}
                    onChange={handleChange}
                    required
                />
                <span className="register__error">{inputErrors.password}</span>
            </AuthenticationPage>
        </main>
    );
}

export default Register;
