import { NavLink, useNavigate } from 'react-router-dom';
import './UnauthorisedMenu.css';

function UnauthorisedMenu() {
    const navigate = useNavigate();

    function navigateToLogin() {
        navigate('/signin');
    }
    return (
        <ul className="unauthorised-menu">
            <li>
                <NavLink to="/signup" className="unauthorised-menu__link">
                    Регистрация
                </NavLink>
            </li>
            <li>
                <button
                    className="unauthorised-menu__button unauthorised-menu__button_login"
                    type="button"
                    onClick={navigateToLogin}
                >
                    Войти
                </button>
            </li>
        </ul>
    );
}

export default UnauthorisedMenu;
