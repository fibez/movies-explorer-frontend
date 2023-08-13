import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import defaultMovies from '../../utils/mokupFillms';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import auth from '../../utils/auth';
import Cookies from 'js-cookie';

function App() {
    const navigation = useNavigate();
    const [isBurgerMenuOppened, setBurgerMenuOpened] = useState(false);
    const [isProfileEdit, setProfileEdit] = useState(false);
    const [isLoading, setLoading] = useState(false);
    // Фильмы ----------------------------------------------------------------
    // Фильмы ----------------------------------------------------------------
    // Фильмы ----------------------------------------------------------------
    // Фильмы ----------------------------------------------------------------
    // Фильмы ----------------------------------------------------------------

    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);

    // Фильтры
    const [isShortFilm, setIsShortFilm] = useState(false);
    const [userRequest, setUserRequest] = useState('');
    // Фильмы
    // const [initialMovies, setInitialMovies] = useState([]); // тут буду хранить фсе фильмы из api
    const [filteredMovies, setFilteredMovies] = useState([]); // тут буду хранить фильмы, которые фильтрует пользователь
    // const [shortMovieState, setShortMovieState] = useState(false); // Чекбокс короткометражки. Дублируется в локалсторэдж при монтировании
    // const [firstEntery, setFirstEntery] = useState(true);
    let counter = 0;
    // let firstEntery = true;

    const [isUserRequestSuccesfull, setUserRequestSeccess] = useState(true);

    // useEffect(() => {
    //     const lsFilms = JSON.parse(localStorage.getItem('movies'));
    //     console.log('сначала это');
    //     console.log(lsFilms);
    //     fetchData();
    // }, []);

    useEffect(() => {
        console.log(userRequest);
        checkLocalStorageNew();
    }, [userRequest]);

    function checkLocalStorageNew() {
        if (JSON.parse(localStorage.getItem('movies'))) {
            setFilteredMovies(JSON.parse(localStorage.getItem('movies')));
        }
    }

    function handleSearhFormSubmit(keyword) {
        setLoading(true);
        localStorage.setItem('userRequest', keyword);
        moviesApi
            .getMovies()
            .then((res) => {
                return filterMovies(res, keyword);
            })
            .then((filtered) => {
                setFilteredMovies(filtered);
                saveToLocalStorage(filtered);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function saveToLocalStorage(movies) {
        return localStorage.setItem('movies', JSON.stringify(movies));
    }

    // useEffect(() => {
    //     console.log('jopa');
    //     handleSearhFormSubmit(userRequest);
    // }, [userRequest, isShortFilm]);

    async function fetchData() {
        console.log('отправляюсь проверять локал');
        await checkLocalStorage();
    }

    async function checkLocalStorage() {
        console.log('потом это');
        const testsavedMovies = await getSavedMovies();
        // console.log('вот что было в сохранённых:', testsavedMovies);

        if (testsavedMovies.length > 0) {
            // console.log('отправляю сохранённые фильмы в фильтрованные');
            setFilteredMovies(testsavedMovies);
        } else {
            // setInitialMovies(getMoviesByRequest());
            handleMovieList();
        }
    }

    function filterMovies(movies, keyword, maxDuration = 40) {
        // console.log('фильтрую');
        // console.log(keyword);
        // if (!keyword) {
        //     keyword = '';
        //     console.log('заменил кейворд');
        // }
        // console.log('кейворд', keyword);
        // console.log(movies);
        return movies.filter((movie) => {
            const keywordMatches =
                movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
                movie.nameEN.toLowerCase().includes(keyword.toLowerCase());

            const durationMatches = isShortFilm ? movie.duration <= maxDuration : true;

            return keywordMatches && durationMatches;
        });
    }

    async function handleMovieList() {
        setFilteredMovies(filterMovies(await getMoviesByRequest(), userRequest));
    }

    async function getMoviesByRequest() {
        setLoading(true);
        try {
            const unfilteredMovies = await moviesApi.getMovies();
            // console.log('вот эти фильмы получил:');
            // console.log(unfilteredMovies);
            // setInitialMovies(unfilteredMovies);

            setUserRequestSeccess(true);
            return unfilteredMovies;
        } catch (error) {
            console.log(error);
            setUserRequestSeccess(false);
        } finally {
            setLoading(false);
        }
    }

    function getSavedMovies() {
        // console.log('собираюсь получить фильмы');
        // setInitialMovies(await getMoviesByRequest());
        return JSON.parse(localStorage.getItem('movies'));
    }
    // Конец=======================================================================

    // Конец=======================================================================

    // Конец=======================================================================

    // Конец=======================================================================

    // Конец=======================================================================

    // Конец=======================================================================

    // Начало блока регистрации и авторизации

    const [isLoggedIn, setLoggedIn] = useState(false);

    const [currentUser, setCurrentUser] = useState({});

    const [registrationError, setRegistrationError] = useState(false);

    useEffect(() => {
        if (Cookies.get('jwt')) {
            mainApi.getUserInfo().then((res) => {
                setCurrentUser(res);
                setLoggedIn(true);
                navigation('/movies');
            });
        }
        setLoggedIn(false);
        navigation('/');
    }, []);

    function handleSignUp(formValues) {
        const { password, email, name } = formValues;

        auth.register(password, email, name).then(() => {
            navigation('/movies');
        });
    }

    function handleSignIn(formValues) {
        if (!formValues.email || !formValues.password) {
            return;
        }

        const { email, password } = formValues;
        auth.login(email, password).then((data) => {
            if (data.jwt) {
                Cookies.set('jwt', data.jwt);
                mainApi.getUserInfo().then((res) => {
                    console.log(res);
                    setCurrentUser(res);
                    setLoggedIn(true);
                    navigation('/movies');
                });
            }
        });
    }

    function handleProfileChange(formValues) {
        console.log(formValues);
        // const { email, name } = formValues;

        mainApi.updateUserInfo(formValues);
    }

    // function handleSignIn(formValues) {
    //     if (!formValues.email || !formValues.password) {
    //         return;
    //     }

    //     const { email, password } = formValues;
    //     auth.login(email, password).then(() => {
    //         mainApi.getUserInfo().then((res) => {
    //             // console.log(res);
    //             setCurrentUser(res);
    //             setLoggedIn(true);
    //             navigation('/movies');
    //         });
    //     });
    // }

    function consolelog() {
        // mainApi.getUserInfo().then((res) => {
        //     console.log(res);
        // });

        // console.log(currentUser);
        const body = JSON.stringify({
            email: 'artem@mail.ru',
            name: 'artemiy',
        });

        mainApi.updateUserInfo(body).then((res) => {
            console.log(res);
        });
    }

    // Начало блока поиска по фильмам

    function navigateToMovie() {
        navigation('/movies');
    }

    function handleEnableProfileEdit() {
        setProfileEdit(true);
    }

    function handleDisableProfileEdit() {
        setProfileEdit(false);
    }

    function handleLogIn() {
        setLoggedIn(true);
    }

    function handleLogUot() {
        setLoggedIn(false);
    }

    function handleBurgerMenuOpen() {
        console.log(isBurgerMenuOppened);
        setBurgerMenuOpened(true);
    }

    function handleBurgerMenuClose() {
        setBurgerMenuOpened(false);
    }

    return (
        <div className="page">
            <Routes>
                <Route path="/" element={<Main isLoggedIn={isLoggedIn} handleLogUot={handleLogUot}></Main>}></Route>
                <Route
                    path="/movies"
                    element={
                        <ProtectedRouteElement
                            element={Movies}
                            isLoggedIn={isLoggedIn}
                            handleLogIn={handleLogIn}
                            isBurgerMenuOppened={isBurgerMenuOppened}
                            onBurgerMenuOpen={handleBurgerMenuOpen}
                            onBurgerMenuClose={handleBurgerMenuClose}
                            movies={movies}
                            isLoading={isLoading}
                            onMovieFindSubmit={handleMovieList}
                            setMovies={setMovies}
                            testMovies={filteredMovies}
                            //Фильтры
                            setIsShortFilm={setIsShortFilm}
                            setUserRequest={setUserRequest}
                            userRequest={userRequest}
                            //
                            //
                            //
                            //
                            onConsoleLog={consolelog}
                            onSubmitNew={handleSearhFormSubmit}
                        />
                    }
                ></Route>
                <Route
                    path="/saved-movies"
                    element={
                        <ProtectedRouteElement
                            element={SavedMovies}
                            isLoggedIn={isLoggedIn}
                            handleLogIn={handleLogIn}
                            isBurgerMenuOppened={isBurgerMenuOppened}
                            onBurgerMenuOpen={handleBurgerMenuOpen}
                            onBurgerMenuClose={handleBurgerMenuClose}
                            movies={savedMovies}
                            isLoading={isLoading}
                        />
                    }
                ></Route>
                <Route
                    path="/signin"
                    element={
                        <Login
                            isLoggedIn={isLoggedIn}
                            handleLogUot={handleLogUot}
                            onNavigate={navigateToMovie}
                            onSubmitSignIn={handleSignIn}
                        />
                    }
                ></Route>
                <Route
                    path="/signup"
                    element={
                        <Register
                            isLoggedIn={isLoggedIn}
                            handleLogUot={handleLogUot}
                            onNavigate={navigateToMovie}
                            onSubmitSignUp={handleSignUp}
                        />
                    }
                ></Route>
                <Route
                    path="/profile"
                    element={
                        <ProtectedRouteElement
                            element={Profile}
                            isLoggedIn={isLoggedIn}
                            handleLogIn={handleLogIn}
                            isProfileEdit={isProfileEdit}
                            onProfileEdit={handleEnableProfileEdit}
                            onProfileEditSubmit={handleDisableProfileEdit}
                            isBurgerMenuOppened={isBurgerMenuOppened}
                            onBurgerMenuOpen={handleBurgerMenuOpen}
                            onBurgerMenuClose={handleBurgerMenuClose}
                            userData={currentUser}
                            onSubmitProfileChanges={handleProfileChange}
                        />
                    }
                ></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </div>
    );
}

export default App;
