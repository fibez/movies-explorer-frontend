import './AboutProject.css';
import PromoSectionTitle from '../PromoSectionTitle/PromoSectionTitile';

function AboutProject() {
    return (
        <section className="about-project">
            <PromoSectionTitle title={'О проекте'} />
            <ul className="about-project__content">
                <li>
                    <h3 className="about-project__content-title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__content-description">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
                        доработки.
                    </p>
                </li>
                <li>
                    <h3 className="about-project__content-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__content-description">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно
                        защититься.
                    </p>
                </li>
            </ul>
            <ul className="about-project__stages">
                <li className="about-project__stages-element about-project__stages-element_type-backend">
                    <h4 className="about-project__stages-period about-project__stages-period_type-backend">1 неделя</h4>
                    <p className="about-project__stages-description">Back-end</p>
                </li>
                <li className="about-project__stages-element about-project__stages-element_type-frontend">
                    <h4 className="about-project__stages-period about-project__stages-period_type-frontend">
                        4 недели
                    </h4>
                    <p className="about-project__stages-description">Front-end</p>
                </li>
            </ul>
        </section>
    );
}

export default AboutProject;
