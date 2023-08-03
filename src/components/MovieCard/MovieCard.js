import { useLocation } from 'react-router-dom';
import './MovieCard.css';

function MovieCard(props) {
    const location = useLocation();

    function getClassByPath() {
        const currentPath = location.pathname;

        if (currentPath === '/saved-movies') {
            return 'moviecardlist__card-save-button_type_remove-from-saved';
        }
    }

    function setMokupFilmCards() {
        return props.movies.map((element) => {
            return (
                <li key={element.id} className="moviecardlist__card">
                    <img className="moviecardlist__card-cover" src={element.cover} alt="movie cover" />
                    <div className="moviecardlist__card-container">
                        <p className="moviecardlist__card-title">{element.title}</p>
                        <button
                            className={`moviecardlist__card-save-button ${
                                element.isSaved ? 'moviecardlist__card-save-button_type_saved' : ''
                            } ${getClassByPath()}`}
                        ></button>
                    </div>
                    <p className="moviecardlist__card-duration">{element.duration}</p>
                </li>
            );
        });
    }

    return (
        <div className="moviecardlist__container">
            <ul className="moviecardlist__cards">{setMokupFilmCards()}</ul>
        </div>
    );
}

export default MovieCard;
