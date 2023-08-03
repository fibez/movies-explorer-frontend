import { NavLink } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    return (
        <section className="notfound">
            <h1 className="notfound__title">404</h1>
            <p className="notfound__description">Страница не найдена</p>
            <NavLink className="notfound__return-link" to={-1}>
                Назад
            </NavLink>
        </section>
    );
}

export default NotFound;
