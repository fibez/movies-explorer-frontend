import UnauthorisedMenu from '../UnauthorisedMenu/UnauthorisedMenu';
import AuthorisedMenu from '../AuthorisedMenu/AuthorisedMenu';
import './Navigation.css';
import { useLocation } from 'react-router-dom';

function Navigation(props) {
    const isLoggedIn = props.isLoggedIn;
    const path = useLocation().pathname;

    function getClassNameByPath() {
        if (path === '/') {
            return ' navigation_promo';
        } else return '';
    }

    return (
        <div className={`navigation${getClassNameByPath()}`}>
            {isLoggedIn ? <AuthorisedMenu /> : <UnauthorisedMenu />}
        </div>
    );
}

export default Navigation;
