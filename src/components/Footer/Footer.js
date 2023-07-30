import './Footer.css';

function Footer() {
    return (
        <section className="footer">
            <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
            <div className="footer__links">
                <span className="footer__copyright">© 2020</span>
                <ul className="footer__links-list">
                    <li>
                        <a className="footer__links-list-element" href="/">
                            Яндекс.Практикум
                        </a>
                    </li>
                    <li>
                        <a className="footer__links-list-element" href="/">
                            Github
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Footer;
