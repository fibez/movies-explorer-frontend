import './AuthorisedMenu.css';
import AccountButton from '../AccountButton/AccountButton';
import { NavLink, useLocation } from 'react-router-dom';

function AuthorisedMenu() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <nav className="authorisedmenu">
            <ul className="authorisedmenu__navigation">
                <li>
                    <NavLink
                        to="/movies"
                        className={`authorisedmenu__navlink ${
                            currentPath === '/movies' ? 'authorisedmenu__navlink_type_active' : ''
                        }`}
                    >
                        Фильмы
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/saved-movies"
                        className={`authorisedmenu__navlink ${
                            currentPath === '/saved-movies' ? 'authorisedmenu__navlink_type_active' : ''
                        }`}
                    >
                        Сохранённые фильмы
                    </NavLink>
                </li>
            </ul>
            <AccountButton />
        </nav>
    );
}

export default AuthorisedMenu;
