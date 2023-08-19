import './MovieCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import Devider from '../Devider/Devider';
import AddFilmsButton from '../AddFilmsButton/AddFilmsButton';
import { useEffect, useState } from 'react';
import { useGreedProperties } from '../../hooks/useGreedProperties';

function MovieCardList(props) {
    const { startIndex, endIndex, maxSections, anotherSectionButtonPressed, setAnotherSectionButtonPressed } =
        useGreedProperties(props.filteredMovies);

    useEffect(() => {
        getCards(props.filteredMovies);
    }, [props.filteredMovies, props.savedMovies]);

    function getCards(movies) {
        if (movies) {
            return movies.map((movie, index) => (
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
            {maxSections >= anotherSectionButtonPressed && maxSections > 0 && props.filteredMovies.length > endIndex ? (
                <div>
                    <section className="moviecardlist">
                        <ul className="moviecard">{getCards(props.filteredMovies.slice(startIndex, endIndex))}</ul>
                        <AddFilmsButton
                            anotherSectionButtonPressed={anotherSectionButtonPressed}
                            setAnotherSectionButtonPressed={setAnotherSectionButtonPressed}
                        />
                    </section>
                </div>
            ) : (
                <div>
                    <section className="moviecardlist">
                        <ul className="moviecard">
                            {props.filteredMovies ? getCards(props.filteredMovies.slice(0, endIndex)) : null}
                        </ul>
                    </section>
                    <Devider filteredMovies={props.filteredMovies} />
                </div>
            )}
        </>
    );
}

export default MovieCardList;
