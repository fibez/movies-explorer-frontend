import Popup from '../Popup/Popup';
import AuthorisedMenu from '../AuthorisedMenu/AuthorisedMenu';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.css';

function BurgerMenu(props) {
    return (
        <Popup isOpen={props.isBurgerMenuOppened} onClose={props.onClose}>
            <nav className={`burgermenu ${props.isBurgerMenuOppened ? 'burgermenu_is_opened' : ''}`}>
                <button className="burgermenu__close-button" type="button" onClick={props.onBurgerMenuClose}></button>
                <ul className="burgermenu__nav-list">
                    <li>
                        <NavLink to="/" className="burgermenu__nav-link">
                            Главная
                        </NavLink>
                    </li>
                    <AuthorisedMenu />
                </ul>
            </nav>
        </Popup>
    );
}

export default BurgerMenu;
