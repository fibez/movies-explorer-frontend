import './AuthenticationMenu.css';

function AuthenticationMenu() {
    return (
        <ul className='authentication-menu'>
            <li>
                <button className='authentication-menu__button'>Регистрация</button>
            </li>
            <li >
                <button className='authentication-menu__button authentication-menu__button_type_login'>Вход</button>
            </li>
        </ul>
    )
}

export default AuthenticationMenu;