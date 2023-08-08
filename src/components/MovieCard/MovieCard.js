import { useLocation } from 'react-router-dom';
import './MovieCard.css';

function MovieCard(props) {
    const location = useLocation();

    function getClassByPath() {
        const currentPath = location.pathname;

        if (currentPath === '/saved-movies') {
            return 'moviecard__card-save-button_type_remove-from-saved';
        } else return '';
    }

    function setMokupFilmCards() {
        return props.movies.map((element) => {
            return (
                <li key={element.id} className="moviecard__card">
                    <img
                        className="moviecard__card-cover"
                        src={element.cover}
                        alt={`Обложка фильма ${element.title}`}
                    />
                    <div className="moviecard__card-container">
                        <h2 className="moviecard__card-title">{element.title}</h2>
                        <button
                            className={`moviecard__card-save-button ${
                                element.isSaved ? 'moviecard__card-save-button_type_saved' : ''
                            } ${getClassByPath()}`}
                            type="button"
                        ></button>
                    </div>
                    <p className="moviecard__card-duration">{element.duration}</p>
                </li>
            );
        });
    }

    return <ul className="moviecard">{setMokupFilmCards()}</ul>;
}

export default MovieCard;
