import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import auth from '../../utils/auth';
import Cookies from 'js-cookie';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { BEAT_FILM_BASE_URL } from '../../utils/config/url';

function App() {
    const navigation = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const [isBurgerMenuOppened, setBurgerMenuOpened] = useState(false);
    const [isProfileEdit, setProfileEdit] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [savedFilteredMovies, setSavedFilteredMovies] = useState([]);

    const [isUserRequestSucces, setUserRequestSeccess] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [formValidationMessage, setFormValidationMessage] = useState('');

    useEffect(() => {
        const jwt = Cookies.get('jwt');

        if (jwt) {
            mainApi
                .getUserInfo()
                .then((res) => {
                    setCurrentUser(res);
                    setLoggedIn(true);
                    navigation('/movies');
                })
                .then(() => {
                    mainApi.getSavedMovies().then((res) => {
                        setSavedFilteredMovies(res);
                        setSavedMovies(res);
                        localStorage.setItem('savedMovies', JSON.stringify(res));
                        if (localStorage.getItem('foundMovies') !== null) {
                            setFilteredMovies(JSON.parse(localStorage.getItem('foundMovies')));
                        }
                    });
                });
        }
    }, []);

    useEffect(() => {
        handleDisableProfileEdit();
        handleBurgerMenuClose();
    }, [path]);

    // Поиск и фильтрация

    async function handleSearchMovies(keyword, checkboxState) {
        setLoading(true);

        try {
            if (!JSON.parse(localStorage.getItem('movies'))) {
                const apiMovies = await moviesApi.getMovies();
                localStorage.setItem('movies', JSON.stringify(apiMovies));
            }
            const movies = JSON.parse(localStorage.getItem('movies'));

            const foundedFilteredMovies = filterMovies(movies, keyword, checkboxState);
            localStorage.setItem('foundMovies', JSON.stringify(foundedFilteredMovies));
            setFilteredMovies(foundedFilteredMovies);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    function handleSearchSavedMovies(keyword, checkboxState) {
        if (savedMovies) {
            setLoading(true);

            const foundedFilteredSavedMovies = filterMovies(savedMovies, keyword, checkboxState);
            setSavedFilteredMovies(foundedFilteredSavedMovies);
            setLoading(false);
        }
    }

    function filterMovies(movies, formValue, checkboxState) {
        const keyword = formValue ? formValue : '';
        const maxDuration = 40;
        return movies.filter((movie) => {
            const keywordMatches =
                movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
                movie.nameEN.toLowerCase().includes(keyword.toLowerCase());

            const durationMatches = checkboxState ? movie.duration <= maxDuration : true;

            return keywordMatches && durationMatches;
        });
    }

    // Сохранение и удаление фильмов

    function handleSaveMovie(movie) {
        const savedMovie = {
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year.toString(),
            description: movie.description,
            image: BEAT_FILM_BASE_URL + movie.image.url,
            trailerLink: movie.trailerLink.toString(),
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            thumbnail: BEAT_FILM_BASE_URL + movie.image.formats.thumbnail.url,
            movieId: movie.id,
        };

        mainApi
            .addMovie(savedMovie)
            .then(() => {
                putNewSavedMovieInState(savedMovie);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function putNewSavedMovieInState(movie) {
        setSavedMovies((oldSavedMovies) => [...oldSavedMovies, movie]);

        const existingSavedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        const updatedSavedMovies = [...existingSavedMovies, movie];
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
    }

    function handleDeleteMovieFromSaved(id, parentCard) {
        mainApi.deleteMovie(id).then(() => {
            if (location.pathname === '/saved-movies') {
                parentCard.remove();
            }
            removeSavedMovieFromState(id);
        });
    }

    function removeSavedMovieFromState(movieId) {
        setSavedMovies((oldSavedMovies) => oldSavedMovies.filter((movie) => movie.movieId !== movieId));

        const existingSavedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        const updatedSavedMovies = existingSavedMovies.filter((movie) => movie.movieId !== movieId);
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
    }

    // Регистрация, авторизация и выход из приложения

    function handleSignUp(formValues) {
        const { password, email, name } = formValues;
        setLoading(true);
        setUserRequestSeccess(false);
        setFormValidationMessage('');

        auth.register(password, email, name)
            .then(() => {
                setUserRequestSeccess(true);
                setFormValidationMessage('Вы успешно зарегестрированы');
                setTimeout(() => {
                    setFormValidationMessage('');
                    setLoading(false);
                }, 750);
            })
            .then(() => {
                handleSignIn(formValues);
            })
            .catch((err) => {
                console.log(err);
                setUserRequestSeccess(false);
                setFormValidationMessage('Что-то пошло не так...');
                setTimeout(() => {
                    setLoading(false);
                }, 750);
            });
    }

    function handleSignIn(formValues) {
        if (!formValues.email || !formValues.password) {
            return;
        }
        setLoading(true);
        setUserRequestSeccess(false);
        setFormValidationMessage('');

        const { email, password } = formValues;
        auth.login(email, password)
            .then((data) => {
                if (data.jwt) {
                    Cookies.set('jwt', data.jwt);
                    mainApi
                        .getUserInfo()
                        .then((res) => {
                            setUserRequestSeccess(true);
                            setFormValidationMessage('Вы успешно авторизированы');
                            setCurrentUser(res);
                            setTimeout(() => {
                                setFormValidationMessage('');
                                setLoading(false);
                                setLoggedIn(true);
                                navigation('/movies');
                            }, 750);
                        })
                        .then(() => {
                            mainApi.getSavedMovies().then((res) => {
                                setSavedFilteredMovies(res);
                                setSavedMovies(res);
                                localStorage.setItem('savedMovies', JSON.stringify(res));
                                setFilteredMovies(JSON.parse(localStorage.getItem('foundMovies')));
                            });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                setUserRequestSeccess(false);
                setFormValidationMessage('Что-то пошло не так...');
                setTimeout(() => {
                    setLoading(false);
                }, 750);
            });
    }

    function handleLogOut() {
        Cookies.remove('jwt');
        localStorage.clear();
        setLoggedIn(false);
        setSavedMovies([]);
        setFilteredMovies([]);
        setCurrentUser({});
    }

    function handleProfileChange(formValues) {
        const { email, name } = formValues;
        setLoading(true);

        mainApi.updateUserInfo(email, name).then(() => {
            mainApi
                .getUserInfo()
                .then((res) => {
                    setUserRequestSeccess(true);
                    setCurrentUser(res);
                    setFormValidationMessage('Данные профиля успешно изменены');
                })
                .catch((err) => {
                    setUserRequestSeccess(false);
                    setFormValidationMessage('Что-то пошло не так...');
                    console.log(err);
                })
                .finally(() => {
                    setTimeout(() => {
                        setFormValidationMessage('');
                        handleDisableProfileEdit();
                        setLoading(false);
                    }, 750);
                });
        });
    }

    function navigateToMovie() {
        navigation('/movies');
    }

    function handleEnableProfileEdit() {
        setProfileEdit(true);
    }

    function handleDisableProfileEdit() {
        setProfileEdit(false);
    }

    function handleLogUot() {
        setLoggedIn(false);
    }

    function handleBurgerMenuOpen() {
        setBurgerMenuOpened(true);
    }

    function handleBurgerMenuClose() {
        setBurgerMenuOpened(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Main
                                isLoggedIn={isLoggedIn}
                                handleLogUot={handleLogUot}
                                isBurgerMenuOppened={isBurgerMenuOppened}
                                onBurgerMenuOpen={handleBurgerMenuOpen}
                                onBurgerMenuClose={handleBurgerMenuClose}
                            ></Main>
                        }
                    ></Route>
                    <Route
                        path="/movies"
                        element={
                            <ProtectedRouteElement
                                element={Movies}
                                isLoggedIn={isLoggedIn}
                                isBurgerMenuOppened={isBurgerMenuOppened}
                                onBurgerMenuOpen={handleBurgerMenuOpen}
                                onBurgerMenuClose={handleBurgerMenuClose}
                                isLoading={isLoading}
                                onSubmit={handleSearchMovies}
                                filteredMovies={filteredMovies}
                                savedMovies={savedMovies}
                                onDeleteMovie={handleDeleteMovieFromSaved}
                                onSaveMovie={handleSaveMovie}
                            />
                        }
                    ></Route>
                    <Route
                        path="/saved-movies"
                        element={
                            <ProtectedRouteElement
                                element={SavedMovies}
                                isLoggedIn={isLoggedIn}
                                isBurgerMenuOppened={isBurgerMenuOppened}
                                onBurgerMenuOpen={handleBurgerMenuOpen}
                                onBurgerMenuClose={handleBurgerMenuClose}
                                isLoading={isLoading}
                                onSubmit={handleSearchSavedMovies}
                                filteredMovies={savedFilteredMovies}
                                savedMovies={savedFilteredMovies}
                                onDeleteMovie={handleDeleteMovieFromSaved}
                            />
                        }
                    ></Route>
                    <Route
                        path="/signin"
                        element={
                            <Login
                                isLoggedIn={isLoggedIn}
                                onNavigate={navigateToMovie}
                                onSubmitSignIn={handleSignIn}
                                formValidationMessage={formValidationMessage}
                                isLoading={isLoading}
                                isUserRequestSucces={isUserRequestSucces}
                            />
                        }
                    ></Route>
                    <Route
                        path="/signup"
                        element={
                            <Register
                                isLoggedIn={isLoggedIn}
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
                                isProfileEdit={isProfileEdit}
                                onProfileEdit={handleEnableProfileEdit}
                                onProfileEditSubmit={handleDisableProfileEdit}
                                isBurgerMenuOppened={isBurgerMenuOppened}
                                onBurgerMenuOpen={handleBurgerMenuOpen}
                                onBurgerMenuClose={handleBurgerMenuClose}
                                onSubmitProfileChanges={handleProfileChange}
                                formValidationMessage={formValidationMessage}
                                isLoading={isLoading}
                                isUserRequestSucces={isUserRequestSucces}
                                onLogOut={handleLogOut}
                            />
                        }
                    ></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
