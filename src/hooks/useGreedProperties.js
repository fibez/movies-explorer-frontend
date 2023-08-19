import { useEffect, useState } from 'react';

function handleCardGreed(movies, screenWidth) {
    let firstSectionMovieNumber = 0;
    let additionalMoviesNumber = 0;
    let maxSections = 0;
    let remainingMovies = 0;

    if (movies === null) {
        return { maxSections, remainingMovies, firstSectionMovieNumber, additionalMoviesNumber };
    }

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

    maxSections = Math.floor(
        (movies.length - firstSectionMovieNumber > 0 ? movies.length - firstSectionMovieNumber : 0) /
            additionalMoviesNumber
    );

    remainingMovies =
        movies.length < firstSectionMovieNumber
            ? movies.length
            : (movies.length - firstSectionMovieNumber) % additionalMoviesNumber;

    return { maxSections, remainingMovies, firstSectionMovieNumber, additionalMoviesNumber };
}

export function useGreedProperties(movies) {
    const screenWidth = window.innerWidth;
    const [anotherSectionButtonPressed, setAnotherSectionButtonPressed] = useState(0);
    const { maxSections, remainingMovies, firstSectionMovieNumber, additionalMoviesNumber } = handleCardGreed(
        movies,
        screenWidth
    );
    const startIndex = 0;
    const endIndex = Math.min(
        startIndex + firstSectionMovieNumber + additionalMoviesNumber * anotherSectionButtonPressed,
        startIndex + firstSectionMovieNumber + additionalMoviesNumber * maxSections + remainingMovies
    );

    return { startIndex, endIndex, maxSections, anotherSectionButtonPressed, setAnotherSectionButtonPressed };
}
