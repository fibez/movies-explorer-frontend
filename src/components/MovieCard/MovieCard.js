import { useLocation } from 'react-router-dom';
import './MovieCard.css';
import mainApi from '../../utils/MainApi';
import { BEAT_FILM_BASE_URL } from '../../utils/config/url';

function MovieCard(props) {
    const location = useLocation();
    const path = location.pathname;

    checkIfAlreadySaved(props.savedMovies);

    function getClassByPath() {
        const currentPath = location.pathname;

        if (currentPath === '/saved-movies') {
            return 'moviecard__card-save-button_type_remove-from-saved';
        } else return '';
    }

    function checkIfAlreadySaved() {
        const alreadySaved = props.savedMovies.some((movie) => movie.movieId === props.movie.id);
        if (alreadySaved) {
            props.movie.isSaved = true;
        }
    }

    function getImgUrl() {
        if (location.pathname === '/saved-movies') {
            return props.movie.image;
        } else {
            return BEAT_FILM_BASE_URL + props.movie.image.url;
        }
    }

    function saveMovieOnServer() {
        const savedMovie = {
            country: props.movie.country,
            director: props.movie.director,
            duration: props.movie.duration,
            year: props.movie.year.toString(),
            description: props.movie.description,
            image: BEAT_FILM_BASE_URL + props.movie.image.url,
            trailerLink: props.movie.trailerLink.toString(),
            nameRU: props.movie.nameRU,
            nameEN: props.movie.nameEN,
            thumbnail: BEAT_FILM_BASE_URL + props.movie.image.formats.thumbnail.url,
            movieId: props.movie.id,
        };
        mainApi
            .addMovie(savedMovie)
            .then(() => {
                props.addToSaved(savedMovie);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function deleteMovieFromSaved(id, parentCard) {
        mainApi.deleteMovie(id).then(() => {
            if (location.pathname === '/saved-movies') {
                parentCard.remove();
            }
        });
    }

    function toggleIsSaved(e) {
        if (location.pathname === '/movies') {
            props.movie.isSaved = !props.movie.isSaved;
            e.target.className = `moviecard__card-save-button ${
                props.movie.isSaved ? 'moviecard__card-save-button_type_saved' : ''
            } ${getClassByPath()}`;
            props.movie.isSaved ? saveMovieOnServer() : deleteMovieFromSaved(props.movie.id);
        } else {
            const closestCard = e.target.closest('.moviecard__card');
            deleteMovieFromSaved(props.movie.movieId, closestCard);
        }
    }

    return (
        <li className="moviecard__card">
            <img className="moviecard__card-cover" src={getImgUrl()} alt={`Обложка фильма ${props.movie.nameRU}`} />
            <div className="moviecard__card-container">
                <h2 className="moviecard__card-title">{props.movie.nameRU}</h2>
                <button
                    className={`moviecard__card-save-button ${
                        props.movie.isSaved ? 'moviecard__card-save-button_type_saved' : ''
                    } ${getClassByPath()}`}
                    type="button"
                    onClick={toggleIsSaved}
                ></button>
            </div>
            <p className="moviecard__card-duration">{`${String(Math.floor(props.movie.duration / 60))}ч${String(
                props.movie.duration % 60
            )}м`}</p>
        </li>
    );
}

export default MovieCard;
