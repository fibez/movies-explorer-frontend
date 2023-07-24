import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';


function Header(props) {
    return ( 
        <header className='header header_unauthorized'>
            <Logo></Logo>
            <Navigation isLoggedIn={props.isLoggedIn}></Navigation>
        </header>
    );
}

export default Header;
