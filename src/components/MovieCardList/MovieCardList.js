import './MovieCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import Devider from '../Devider/Devider';
import AddFilmsButton from '../AddFilmsButton/AddFilmsButton';
import { useEffect, useState } from 'react';

function MovieCardList(props) {
    const [anotherSectionButtonPressed, setAnotherSectionButtonPressed] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const [maxSections, setMaxSections] = useState(0);

    useEffect(() => {
        getCards(props.filteredMovies);
    }, [props.filteredMovies, props.savedMovies]);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            const { startIndex, endIndex, maxSections } = handleCardGreed(props, screenWidth);
            setStartIndex(startIndex);
            setEndIndex(endIndex);
            setMaxSections(maxSections);
        };

        window.addEventListener('resize', handleResize);

        if (props.filteredMovies) {
            handleResize();
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [props, anotherSectionButtonPressed]);

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

    function handleCardGreed(props) {
        let screenWidth = window.innerWidth;
        let firstSectionMovieNumber = 0;
        let additionalMoviesNumber = 0;

        switch (true) {
            case screenWidth <= 600:
                firstSectionMovieNumber = 5;
                additionalMoviesNumber = 2;
                break;
            case screenWidth <= 950:
                firstSectionMovieNumber = 8;
                additionalMoviesNumber = 2;
                break;
            case screenWidth < 1150:
                firstSectionMovieNumber = 12;
                additionalMoviesNumber = 3;
                break;
            default:
                firstSectionMovieNumber = 16;
                additionalMoviesNumber = 4;
                break;
        }

        const maxSections = Math.floor(
            (props.filteredMovies.length - firstSectionMovieNumber > 0
                ? props.filteredMovies.length - firstSectionMovieNumber
                : 0) / additionalMoviesNumber
        );

        const remainingMovies =
            props.filteredMovies.length < firstSectionMovieNumber
                ? props.filteredMovies.length
                : (props.filteredMovies.length - firstSectionMovieNumber) % additionalMoviesNumber;

        const startIndex = 0;
        const endIndex = Math.min(
            startIndex + firstSectionMovieNumber + additionalMoviesNumber * anotherSectionButtonPressed,
            startIndex + firstSectionMovieNumber + additionalMoviesNumber * maxSections + remainingMovies
        );

        return { startIndex, endIndex, maxSections };
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
