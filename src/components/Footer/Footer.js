import { useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const location = useLocation();
    const path = location.pathname;

    return (
        <section className={`footer footer_type_mobile${path === '/' && ' footer_type_promo'}`}>
            <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
            <div className="footer__links">
                <span className="footer__copyright">© 2023</span>
                <ul className="footer__links-list">
                    <li>
                        <a className="footer__links-list-element" href="https://practicum.yandex.ru/">
                            Яндекс.Практикум
                        </a>
                    </li>
                    <li>
                        <a className="footer__links-list-element" href="https://github.com/fibez">
                            Github
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Footer;
