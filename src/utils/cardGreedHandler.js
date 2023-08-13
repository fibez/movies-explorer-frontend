import { useEffect, useState } from 'react';

function handleCardGreed(props, screenWidth) {
    let baseColumns = 0;
    let firstSectionMovieNumber = 0;
    let additionalMoviesNumber = 0;

    switch (true) {
        case screenWidth <= 600:
            baseColumns = 1;
            firstSectionMovieNumber = 5;
            additionalMoviesNumber = 2;
            break;
        case screenWidth <= 950:
            baseColumns = 2;
            firstSectionMovieNumber = 8;
            additionalMoviesNumber = 2;
            break;
        case screenWidth < 1150:
            baseColumns = 3;
            firstSectionMovieNumber = 12;
            additionalMoviesNumber = 3;
            break;
        default:
            baseColumns = 4;
            firstSectionMovieNumber = 16;
            additionalMoviesNumber = 4;
            break;
    }

    const maxSections = Math.floor(
        (props.testMovies.length - firstSectionMovieNumber > 0
            ? props.testMovies.length - firstSectionMovieNumber
            : 0) / additionalMoviesNumber
    );

    const remainingMovies =
        props.testMovies.length < firstSectionMovieNumber
            ? props.testMovies.length
            : (props.testMovies.length - firstSectionMovieNumber) % additionalMoviesNumber;

    return { maxSections, remainingMovies, firstSectionMovieNumber, additionalMoviesNumber };
}

export function useGreedProperties(props) {
    const screenWidth = window.innerWidth;
    const [anotherSectionButtonPressed, setAnotherSectionButtonPressed] = useState(0);
    const { maxSections, remainingMovies, firstSectionMovieNumber, additionalMoviesNumber } = handleCardGreed(
        props,
        screenWidth
    );
    const startIndex = 0;
    const endIndex = Math.min(
        startIndex + firstSectionMovieNumber + additionalMoviesNumber * anotherSectionButtonPressed,
        startIndex + firstSectionMovieNumber + additionalMoviesNumber * maxSections + remainingMovies
    );

    return { startIndex, endIndex, maxSections, anotherSectionButtonPressed, setAnotherSectionButtonPressed };
}
