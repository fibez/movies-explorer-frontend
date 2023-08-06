import { NavLink } from 'react-router-dom';
import './UnauthorisedMenu.css';

function UnauthorisedMenu() {
    return (
        <ul className="unauthorised-menu">
            <li>
                <NavLink to="/signup" className="unauthorised-menu__link">
                    Регистрация
                </NavLink>
            </li>
            <li>
                <NavLink to="/signin" className="unauthorised-menu__link unauthorised-menu__link_type_button">
                    <button className="unauthorised-menu__button unauthorised-menu__button_type_login">Войти</button>
                </NavLink>
            </li>
        </ul>
    );
}

export default UnauthorisedMenu;
