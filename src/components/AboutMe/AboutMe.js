import './AboutMe.css';
import PromoSectionTitle from '../PromoSectionTitle/PromoSectionTitile';
import Portfolio from '../Portfolio/Portfolio';
import photo from '../../images/me.jpg';

function AbooutMe() {
    return (
        <section className="aboutme" id="aboutme">
            <PromoSectionTitle title={'Студент'} />
            <div className="aboutme__container">
                <div className="aboutme__desription">
                    <div className="aboutme__description-container">
                        <h3 className="aboutme__content-title">Артём</h3>
                        <p className="aboutme__content-student">Фронтенд-разработчик, 25 лет</p>
                        <p className="aboutme__content-bio">
                            Я родился в Санкт-Петербурге, сейчас живу в Грузии. Я закончил кафедру электроакустики и
                            ультразвуковой техники в "ЛЭТИ". В 2020 году я пришел в "НаПоправку.ру" и сейчас я менеджер
                            проектов. Прохожу курс по фронтенд-разработке чтобы развиться в профессиональном плане и
                            начать выполнять фриланс-заказы.
                        </p>
                    </div>
                    <a className="aboutme__github-link" href="https://github.com/fibez">
                        Github
                    </a>
                </div>
                <img src={photo} className="aboutme__photo" alt="student portrait"></img>
            </div>
            <Portfolio />
        </section>
    );
}

export default AbooutMe;
