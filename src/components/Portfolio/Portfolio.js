import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <li className="portfolio__list-element">
                    <a href="/" className="portfolio__list-link">
                        <span className="portfolio__list-text">Статичный сайт</span>
                        <span className="portfolio__list-arrow">↗</span>
                    </a>
                </li>
                <li className="portfolio__list-element">
                    <a href="/" className="portfolio__list-link">
                        <span className="portfolio__list-text">Адаптивный сайт</span>
                        <span className="portfolio__list-arrow">↗</span>
                    </a>
                </li>
                <li className="portfolio__list-element">
                    <a href="/" className="portfolio__list-link">
                        <span className="portfolio__list-text">Одностраничное приложение</span>
                        <span className="portfolio__list-arrow">↗</span>
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;
