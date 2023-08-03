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
            return 'header__authorized';
        } else {
            return 'header__unauthorized';
        }
    }

    function isAuthorisedPath() {
        return currentPath === '/movies' || currentPath === '/saved-movies' || currentPath === '/profile';
    }

    return (
        <header
            className={`header ${getClassNameByPath()} ${
                currentPath === '/profile' ? 'header__authorized_type_profile' : ''
            }`}
        >
            <Logo></Logo>
            <Navigation isLoggedIn={props.isLoggedIn}></Navigation>
            {isAuthorisedPath() && (
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
