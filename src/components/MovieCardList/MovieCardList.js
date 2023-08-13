import './MovieCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import Devider from '../Devider/Devider';
import AddFilmsButton from '../AddFilmsButton/AddFilmsButton';
import { useEffect, useState } from 'react';
import { useGreedProperties } from '../../utils/cardGreedHandler';

function MovieCardList(props) {
    function getCards(movies) {
        return movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);
    }
    const { startIndex, endIndex, maxSections, anotherSectionButtonPressed, setAnotherSectionButtonPressed } =
        useGreedProperties(props);

    return (
        <>
            {maxSections >= anotherSectionButtonPressed && maxSections > 0 && props.testMovies.length > endIndex ? (
                <div>
                    <section className="moviecardlist">
                        <ul className="moviecard">{getCards(props.testMovies.slice(startIndex, endIndex))}</ul>
                    </section>
                    <AddFilmsButton
                        anotherSectionButtonPressed={anotherSectionButtonPressed}
                        setAnotherSectionButtonPressed={setAnotherSectionButtonPressed}
                    />
                </div>
            ) : (
                <div>
                    <section className="moviecardlist">
                        <ul className="moviecard">{getCards(props.testMovies.slice(0, endIndex))}</ul>
                    </section>
                    <Devider />
                </div>
            )}
        </>
    );
}

export default MovieCardList;
