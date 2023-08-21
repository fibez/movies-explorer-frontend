import './Login.css';
import AuthenticationPage from '../AuthenticationPage/AuthenticationPage';
import useForm from '../../hooks/useForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const navigation = useNavigate();
    const { formValues, handleChange, isValid, inputErrors } = useForm();

    useEffect(() => {
        props.isLoggedIn ? navigation('/movies') : navigation('/signin');
    }, [props.isLoggedIn]);

    function handleSubmitForm() {
        props.onSubmitSignIn(formValues);
    }

    return (
        <main className="login">
            <AuthenticationPage
                title={'Рады видеть!'}
                submitButtonText={'Войти'}
                linkDescriptionText={'Ещё не зарегистрированы?'}
                linkText={'Регистрация'}
                onSubmit={handleSubmitForm}
                navTo="/signup"
                isValid={isValid}
                formValidationMessage={props.formValidationMessage}
                isLoading={props.isLoading}
                isUserRequestSucces={props.isUserRequestSucces}
            >
                <label htmlFor="email" className="login__input-label">
                    E-mail
                </label>
                <input
                    type="email"
                    className={`login__input ${inputErrors.email ? 'login__input_is_not-valid' : ''}`}
                    name="email"
                    id="email"
                    placeholder="Почта"
                    minLength="6"
                    maxLength="30"
                    autoComplete="off"
                    onChange={handleChange}
                    value={formValues.name}
                    required
                />
                <span className="login__error">{inputErrors.email}</span>
                <label htmlFor="password" className="login__input-label">
                    Пароль
                </label>
                <input
                    type="password"
                    className={`login__input ${inputErrors.password ? 'login__input_is_not-valid' : ''}`}
                    name="password"
                    id="password"
                    placeholder="Пароль"
                    autoComplete="off"
                    value={formValues.password || ''}
                    onChange={handleChange}
                    required
                />
                <span className="login__error">{inputErrors.password}</span>
            </AuthenticationPage>
        </main>
    );
}

export default Login;
