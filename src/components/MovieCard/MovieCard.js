import { useLocation } from 'react-router-dom';
import './MovieCard.css';

function MovieCard(props) {
    const location = useLocation();

    function getClassByPath() {
        const currentPath = location.pathname;

        if (currentPath === '/saved-movies') {
            return 'moviecard__card-save-button_type_remove-from-saved';
        }
    }

    function setMokupFilmCards() {
        return props.movies.map((element) => {
            return (
                <li key={element.id} className="moviecard__card">
                    <img className="moviecard__card-cover" src={element.cover} alt="movie cover" />
                    <div className="moviecard__card-container">
                        <p className="moviecard__card-title">{element.title}</p>
                        <button
                            className={`moviecard__card-save-button ${
                                element.isSaved ? 'moviecard__card-save-button_type_saved' : ''
                            } ${getClassByPath()}`}
                        ></button>
                    </div>
                    <p className="moviecard__card-duration">{element.duration}</p>
                </li>
            );
        });
    }

    return (
        <div className="moviecard__container">
            <ul className="moviecard__cards">{setMokupFilmCards()}</ul>
        </div>
    );
}

export default MovieCard;
