import './NavTab.css';

function NavTab() {
    return (
        <ul className='navtab'>
            <li><a className='navtab__item' href='/'>О проекте</a></li>
            <li><a className='navtab__item' href='/'>Технологии</a></li>
            <li><a className='navtab__item' href='/'>Студент</a></li>
        </ul>
    )
}

export default NavTab;