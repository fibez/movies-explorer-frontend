import Popup from '../Popup/Popup';
import { NavLink, useLocation } from 'react-router-dom';
import './BurgerMenu.css';
import AccountButton from '../AccountButton/AccountButton';
import { useEffect } from 'react';

function BurgerMenu(props) {
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                props.onBurgerMenuClose();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        <Popup isOpen={props.isBurgerMenuOppened}>
            <nav className={`burgermenu ${props.isBurgerMenuOppened ? 'burgermenu_is_opened' : ''}`}>
                <button className="burgermenu__close-button" type="button" onClick={props.onBurgerMenuClose}></button>
                <div className="burgermenu__nav-list-container">
                    <ul className="burgermenu__nav-list">
                        <li>
                            <NavLink to="/" className="burgermenu__nav-link">
                                Главная
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/movies"
                                className={`burgermenu__nav-link ${
                                    path === '/movies' && 'burgermenu__nav-link_type_active'
                                }`}
                            >
                                Фильмы
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/saved-movies"
                                className={`burgermenu__nav-link ${
                                    path === '/saved-movies' && 'burgermenu__nav-link_type_active'
                                }`}
                            >
                                Сохранённые фильмы
                            </NavLink>
                        </li>
                    </ul>
                    <AccountButton />
                </div>
            </nav>
        </Popup>
    );
}

export default BurgerMenu;
