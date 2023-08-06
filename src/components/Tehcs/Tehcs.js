import './Tehcs.css';
import PromoSectionTitle from '../PromoSectionTitle/PromoSectionTitile';

function Tehcs() {
    return (
        <section className="tehcs" id="tehcs">
            <PromoSectionTitle title={'Технологии'} marginClass={'section-title_type_big-margin'} />
            <div className="tehcs__content">
                <h3 className="tehcs__title">7 технологий</h3>
                <p className="tehcs__descriptions">
                    На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                </p>
                <ul className="tehcs__list">
                    <li className="tehcs__list-element">HTML</li>
                    <li className="tehcs__list-element">CSS</li>
                    <li className="tehcs__list-element">JS</li>
                    <li className="tehcs__list-element">React</li>
                    <li className="tehcs__list-element">Git</li>
                    <li className="tehcs__list-element">Express.js</li>
                    <li className="tehcs__list-element">mongoDB</li>
                </ul>
            </div>
        </section>
    );
}

export default Tehcs;
