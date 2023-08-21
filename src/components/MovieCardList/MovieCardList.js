import './MovieCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import Devider from '../Devider/Devider';
import AddFilmsButton from '../AddFilmsButton/AddFilmsButton';
import { useEffect, useState } from 'react';

import {
    RES_DESKTOP,
    RES_TABLET,
    RES_MOBILE,
    ADD_MORE_FILMS_DESKTOP_M,
    ADD_MORE_FILMS_DESKTOP_S,
    ADD_MORE_FILMS_TABLET,
    ADD_MORE_FILMS_MOBILE,
    DEFAULT_SECTION_SIZE_DESKTOP_M,
    DEFAULT_SECTION_SIZE_DESKTOP_S,
    DEFAULT_SECTION_SIZE_TABLET,
    DEFAULT_SECTION_SIZE_MOBILE,
} from '../../utils/config/movieCardsConfig';

function MovieCardList(props) {
    const [moviesToShow, setMoviesToShow] = useState(0);

    useEffect(() => {
        calculateShownMovies();
        const handleResize = () => {
            calculateShownMovies();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [props.filteredMovies]);

    function calculateShownMovies() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= RES_MOBILE) {
            setMoviesToShow(DEFAULT_SECTION_SIZE_MOBILE);
        } else if (screenWidth <= RES_TABLET) {
            setMoviesToShow(DEFAULT_SECTION_SIZE_TABLET);
        } else if (screenWidth < RES_DESKTOP) {
            setMoviesToShow(DEFAULT_SECTION_SIZE_DESKTOP_S);
        } else {
            setMoviesToShow(DEFAULT_SECTION_SIZE_DESKTOP_M);
        }
    }

    function calculateAndAddMoreMovies() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= RES_MOBILE) {
            setMoviesToShow(moviesToShow + ADD_MORE_FILMS_MOBILE);
        } else if (screenWidth <= RES_TABLET) {
            setMoviesToShow(moviesToShow + ADD_MORE_FILMS_TABLET);
        } else if (screenWidth < RES_DESKTOP) {
            setMoviesToShow(moviesToShow + ADD_MORE_FILMS_DESKTOP_S);
        } else {
            setMoviesToShow(moviesToShow + ADD_MORE_FILMS_DESKTOP_M);
        }
    }

    function getCards() {
        if (props.filteredMovies) {
            return props.filteredMovies
                .slice(0, moviesToShow)
                .map((movie, index) => (
                    <MovieCard
                        key={movie.id || movie.movieId}
                        index={index}
                        movie={movie}
                        savedMovies={props.savedMovies}
                        onDeleteMovie={props.onDeleteMovie}
                        onSaveMovie={props.onSaveMovie}
                    />
                ));
        } else {
            return;
        }
    }

    return (
        <>
            {props.filteredMovies && props.filteredMovies.length > moviesToShow ? (
                <div>
                    <section className="moviecardlist">
                        <ul className="moviecard">{getCards()}</ul>
                        <AddFilmsButton onShowMoreMovies={calculateAndAddMoreMovies} />
                    </section>
                </div>
            ) : (
                <div>
                    <section className="moviecardlist">
                        <ul className="moviecard">{props.filteredMovies ? getCards() : null}</ul>
                    </section>
                    <Devider filteredMovies={props.filteredMovies} />
                </div>
            )}
        </>
    );
}

export default MovieCardList;
