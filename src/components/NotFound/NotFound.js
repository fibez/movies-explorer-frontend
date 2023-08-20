import './NotFound.css';

function NotFound(props) {
    return (
        <main className="notfound">
            <section className="notfound__content">
                <h1 className="notfound__title">404</h1>
                <p className="notfound__description">Страница не найдена</p>
                <button className="notfound__return-link" onClick={props.onNavigate}>
                    Назад
                </button>
            </section>
        </main>
    );
}

export default NotFound;
