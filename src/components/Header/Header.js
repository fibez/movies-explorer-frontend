import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import BurgerMenuButton from '../BurgerMenuButton/BurgerMenuButton';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useLocation } from 'react-router-dom';

function Header(props) {
    const location = useLocation();
    const currentPath = location.pathname;

    function getClassNameByPath() {
        if (currentPath === '/movies' || currentPath === '/saved-movies' || currentPath === '/profile') {
            return 'header_authorized';
        } else {
            return 'header_unauthorized';
        }
    }

    // function isAuthorisedPath() {
    //     return currentPath === '/movies' || currentPath === '/saved-movies' || currentPath === '/profile';
    // }

    return (
        <header
            className={`header ${getClassNameByPath()} ${
                currentPath === '/profile' ? 'header_authorized-profile' : ''
            }`}
        >
            <Logo></Logo>
            <Navigation isLoggedIn={props.isLoggedIn}></Navigation>
            {props.isLoggedIn && (
                <>
                    <BurgerMenuButton onBurgerMenuOpen={props.onBurgerMenuOpen} />
                    <BurgerMenu
                        isBurgerMenuOppened={props.isBurgerMenuOppened}
                        onBurgerMenuClose={props.onBurgerMenuClose}
                    />
                </>
            )}
        </header>
    );
}

export default Header;
