import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <li className="portfolio__list-element">
                    <a
                        href="https://github.com/fibez/how-to-learn"
                        className="portfolio__list-link"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span className="portfolio__list-text">Статичный сайт</span>
                        <span className="portfolio__list-arrow">↗</span>
                    </a>
                </li>
                <li className="portfolio__list-element">
                    <a
                        href="https://github.com/fibez/russian-travel"
                        className="portfolio__list-link"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span className="portfolio__list-text">Адаптивный сайт</span>
                        <span className="portfolio__list-arrow">↗</span>
                    </a>
                </li>
                <li className="portfolio__list-element">
                    <a
                        href="https://github.com/fibez/express-mesto-gha"
                        className="portfolio__list-link"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span className="portfolio__list-text">Одностраничное приложение</span>
                        <span className="portfolio__list-arrow">↗</span>
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;
