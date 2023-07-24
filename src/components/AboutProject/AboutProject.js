import './AboutProject.css';

function AboutProject() {
    return (
        <div className='about-project'>
            <h2 className='about-project__title'>О проекте</h2>
            <ul className='about-project__content'>
                <li>
                    <h3 className='about-project__content-title'>Дипломный проект включал 5 этапов</h3>
                    <p className='about-project__content-description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li>
                    <h3 className='about-project__content-title'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about-project__content-description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
        </div>
    );
}

export default AboutProject;