import './Register.css';
import AuthenticationPage from '../AuthenticationPage/AuthenticationPage';

function Register(props) {
    return (
        <main className="register">
            <AuthenticationPage
                title={'Добро пожаловать!'}
                submitButtonText={'Зарегистрироваться'}
                linkDescriptionText={'Уже зарегистрированы?'}
                linkText={'Войти'}
                onSubmit={props.onNavigate}
                navTo="/signin"
            >
                <label className="register__input-label">Имя</label>
                <input
                    type="text"
                    className="register__input"
                    name="name"
                    id="name"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="30"
                    autoComplete="off"
                    defaultValue="Виталий"
                    required
                />
                <span className="register__error"></span>
                <label htmlFor="email" className="register__input-label">
                    E-mail
                </label>
                <input
                    type="email"
                    className="register__input"
                    name="email"
                    id="email"
                    placeholder="E-mail"
                    minLength="6"
                    maxLength="30"
                    autoComplete="off"
                    defaultValue="pochta@yandex.ru"
                    required
                />
                <span className="register__error"></span>
                <label htmlFor="password" className="register__input-label">
                    Пароль
                </label>
                <input
                    type="password"
                    className="register__input register__input_is_not-valid"
                    name="password"
                    id="password"
                    placeholder="Пароль"
                    minLength="6"
                    maxLength="30"
                    autoComplete="off"
                    defaultValue="12345678987654"
                    required
                />
                <span className="register__error">Что-то пошло не так...</span>
            </AuthenticationPage>
        </main>
    );
}

export default Register;
