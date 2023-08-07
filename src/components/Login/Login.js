import './Login.css';
import AuthenticationPage from '../AuthenticationPage/AuthenticationPage';

function Login(props) {
    return (
        <main className="login">
            <AuthenticationPage
                title={'Рады видеть!'}
                submitButtonText={'Войти'}
                linkDescriptionText={'Ещё не зарегистрированы?'}
                linkText={'Регистрация'}
                onSubmit={props.onNavigate}
                navTo="/signup"
            >
                <label htmlFor="email" className="login__input-label">
                    E-mail
                </label>
                <input
                    type="email"
                    className="login__input"
                    name="email"
                    id="email"
                    placeholder="Почта"
                    minLength="6"
                    maxLength="30"
                    autoComplete="off"
                    defaultValue="pochta@yandex.ru"
                    required
                />
                <span className="login__error"></span>
                <label htmlFor="password" className="login__input-label">
                    Пароль
                </label>
                <input
                    type="password"
                    className="login__input login__input_is_not-valid"
                    name="password"
                    id="password"
                    placeholder="Пароль"
                    minLength="6"
                    maxLength="30"
                    autoComplete="off"
                    required
                />
                <span className="login__error"></span>
            </AuthenticationPage>
        </main>
    );
}

export default Login;
