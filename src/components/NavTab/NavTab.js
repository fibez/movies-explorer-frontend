import './NavTab.css';

function NavTab() {
    return (
        <ul className="navtab">
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
    );
}

export default NavTab;
