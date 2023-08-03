import UnauthorisedMenu from '../UnauthorisedMenu/UnauthorisedMenu';
import AuthorisedMenu from '../AuthorisedMenu/AuthorisedMenu';
import './Navigation.css';

function Navigation(props) {
    const isLoggedIn = props.isLoggedIn;

    return <ul className="navigation">{isLoggedIn ? <AuthorisedMenu /> : <UnauthorisedMenu />}</ul>;
}

export default Navigation;
