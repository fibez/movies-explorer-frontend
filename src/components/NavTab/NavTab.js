import './NavTab.css';

function NavTab() {
    return (
        <nav className="navtab">
            <ul className="navtab__list">
                <li>
                    <a className="navtab__item" href="#about-project">
                        О проекте
                    </a>
                </li>
                <li>
                    <a className="navtab__item" href="#tehcs">
                        Технологии
                    </a>
                </li>
                <li>
                    <a className="navtab__item" href="#aboutme">
                        Студент
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default NavTab;
