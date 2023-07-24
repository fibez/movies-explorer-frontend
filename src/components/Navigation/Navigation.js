import AuthenticationMenu from '../AuthenticationMenu/AuthenticationMenu';
import './Navigation.css';

function Navigation(props) {
    const isLoggedIn = props.isLoggedIn;

    return (
        <ul className='navigation'>
            <AuthenticationMenu></AuthenticationMenu>
            {isLoggedIn ? <p>привет</p> : null}
        </ul>
    )
}

export default Navigation;