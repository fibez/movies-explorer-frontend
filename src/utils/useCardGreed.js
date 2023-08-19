import { useState } from 'react';

function useCardGreed(moviesList) {
    const startIndex = 0;
    const [endIndex, setEndIndex] = useState(0);
    const [maxSections, setMaxSections] = useState(0);
    const [remainingMovies, setRemainingMovies] = useState(0);

    function calculateEndIndex() {
        setEndIndex(
            Math.min(
                startIndex + firstSectionMovieNumber + additionalMoviesNumber * anotherSectionButtonPressed,
                startIndex + firstSectionMovieNumber + additionalMoviesNumber * maxSections + remainingMovies
            )
        );
    }

    function calculateRemainingMovies() {
        setRemainingMovies(
            moviesList.length < firstSectionMovieNumber
                ? moviesList.length
                : (moviesList.length - firstSectionMovieNumber) % additionalMoviesNumber
        );
    }
    return { startIndex, endIndex, maxSections, anotherSectionButtonPressed, setAnotherSectionButtonPressed };
}
