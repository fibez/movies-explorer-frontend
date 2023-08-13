import { useLocation } from 'react-router-dom';
import './MovieCard.css';
import { BEAT_FILM_API_URL, BEAT_FILM_BASE_URL } from '../../utils/config/url';

function MovieCard(props) {
    const location = useLocation();

    function getClassByPath() {
        const currentPath = location.pathname;

        if (currentPath === '/saved-movies') {
            return 'moviecard__card-save-button_type_remove-from-saved';
        } else return '';
    }

    return (
        <li key={props.movie.id} className="moviecard__card">
            <img
                className="moviecard__card-cover"
                src={BEAT_FILM_BASE_URL + props.movie.image.url}
                alt={`Обложка фильма ${props.movie.nameRU}`}
            />
            <div className="moviecard__card-container">
                <h2 className="moviecard__card-title">{props.movie.nameRU}</h2>
                <button
                    className={`moviecard__card-save-button ${
                        props.movie.isSaved ? 'moviecard__card-save-button_type_saved' : ''
                    } ${getClassByPath()}`}
                    type="button"
                ></button>
            </div>
            <p className="moviecard__card-duration">{`${String(Math.floor(props.movie.duration / 60))}ч${String(
                props.movie.duration % 60
            )}м`}</p>
        </li>
    );
}

export default MovieCard;
