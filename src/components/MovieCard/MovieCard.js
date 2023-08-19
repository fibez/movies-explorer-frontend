import { useLocation } from 'react-router-dom';
import './MovieCard.css';
import { BEAT_FILM_BASE_URL } from '../../utils/config/url';
import React, { useEffect, useState } from 'react';

function MovieCard(props) {
    const location = useLocation();
    const path = location.pathname;
    const [isLiked, setIsLiked] = useState(false);
    const [buttonClassName, setButtonClassName] = useState('');

    useEffect(() => {
        if (path === '/movies') {
            setIsLiked(checkIsMovieLiked(props.movie));
        }
    }, [props.savedMovies, path]);

    useEffect(() => {
        getButtonClass();
    }, [isLiked, path]);

    function checkIsMovieLiked(movie) {
        const savedMovies = props.savedMovies;
        return savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
    }

    function handleLikeClick(e) {
        const parentCard = e.target.closest('.moviecard__card');
        const movieId = props.movie.id ? props.movie.id : props.movie.movieId;

        if (path === '/movies') {
            if (isLiked) {
                props.onDeleteMovie(movieId);
            } else {
                props.onSaveMovie(props.movie);
            }
        } else {
            props.onDeleteMovie(movieId, parentCard);
        }
        setIsLiked(!isLiked);
    }

    function getButtonClass() {
        if (path === '/movies' && isLiked) {
            return setButtonClassName('moviecard__card-save-button_type_saved');
        } else if (path === '/movies' && !isLiked) {
            return setButtonClassName('');
        } else if (path === '/saved-movies') {
            return setButtonClassName('moviecard__card-save-button_type_remove-from-saved');
        }
    }

    function getImgUrl() {
        if (location.pathname === '/saved-movies') {
            return props.movie.image;
        } else {
            return BEAT_FILM_BASE_URL + props.movie.image.url;
        }
    }

    return (
        <li className="moviecard__card">
            <img className="moviecard__card-cover" src={getImgUrl()} alt={`Обложка фильма ${props.movie.nameRU}`} />
            <div className="moviecard__card-container">
                <h2 className="moviecard__card-title">{props.movie.nameRU}</h2>
                <button
                    className={`moviecard__card-save-button ${buttonClassName}`}
                    type="button"
                    onClick={handleLikeClick}
                ></button>
            </div>
            <p className="moviecard__card-duration">{`${String(Math.floor(props.movie.duration / 60))}ч${String(
                props.movie.duration % 60
            )}м`}</p>
        </li>
    );
}

export default MovieCard;
