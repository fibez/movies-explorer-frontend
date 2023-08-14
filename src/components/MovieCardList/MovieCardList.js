import './MovieCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import Devider from '../Devider/Devider';
import AddFilmsButton from '../AddFilmsButton/AddFilmsButton';
import { useEffect, useState } from 'react';
import { useGreedProperties } from '../../utils/cardGreedHandler';
import { useLocation } from 'react-router-dom';

function MovieCardList(props) {
    const location = useLocation();
    const path = location.pathname;

    function getCards(movies) {
        return movies.map((movie, index) => (
            <MovieCard
                key={index}
                movie={movie}
                addToSaved={props.addToSaved}
                savedMovies={props.savedMovies ? props.savedMovies : []}
            />
        ));
    }
    const { startIndex, endIndex, maxSections, anotherSectionButtonPressed, setAnotherSectionButtonPressed } =
        useGreedProperties(props);

    return (
        <>
            {maxSections >= anotherSectionButtonPressed && maxSections > 0 && props.renderedMovies.length > endIndex ? (
                <div>
                    <section className="moviecardlist">
                        <ul className="moviecard">{getCards(props.renderedMovies.slice(startIndex, endIndex))}</ul>
                        <AddFilmsButton
                            anotherSectionButtonPressed={anotherSectionButtonPressed}
                            setAnotherSectionButtonPressed={setAnotherSectionButtonPressed}
                        />
                    </section>
                </div>
            ) : (
                <div>
                    <section className="moviecardlist">
                        <ul className="moviecard">{getCards(props.renderedMovies.slice(0, endIndex))}</ul>
                    </section>
                    <Devider />
                </div>
            )}
        </>
    );
}

export default MovieCardList;
