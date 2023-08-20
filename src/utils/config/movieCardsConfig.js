// switch (true) {
//     case screenWidth <= 600:
//         firstSectionMovieNumber = 5;
//         additionalMoviesNumber = 2;
//         break;
//     case screenWidth <= 950:
//         firstSectionMovieNumber = 8;
//         additionalMoviesNumber = 2;
//         break;
//     case screenWidth < 1150:
//         firstSectionMovieNumber = 12;
//         additionalMoviesNumber = 3;
//         break;
//     default:
//         firstSectionMovieNumber = 16;
//         additionalMoviesNumber = 4;
//         break;
// }
const SHORT_MOVIE_DURATION = 40;

const RES_DESKTOP = 1150;
const RES_TABLET = 950;
const RES_MOBILE = 600;

const ADD_MORE_FILMS_DESKTOP_M = 4;
const ADD_MORE_FILMS_DESKTOP_S = 3;
const ADD_MORE_FILMS_TABLET = 2;
const ADD_MORE_FILMS_MOBILE = 2;

const DEFAULT_SECTION_SIZE_DESKTOP_M = 16;
const DEFAULT_SECTION_SIZE_DESKTOP_S = 12;
const DEFAULT_SECTION_SIZE_TABLET = 8;
const DEFAULT_SECTION_SIZE_MOBILE = 5;

export {
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
    SHORT_MOVIE_DURATION,
};
