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

function App() {
    const navigation = useNavigate();
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState('/');
    const [isBurgerMenuOppened, setBurgerMenuOpened] = useState(false);
    const [isProfileEdit, setProfileEdit] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [isShortFilm, setIsShortFilm] = useState(false);
    const [userRequest, setUserRequest] = useState('');
    const [savedMoviesUserRequest, setSavedMoviesUserRequest] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [savedFilteredMovies, setSavedFilteredMovies] = useState([]);

    const [isUserRequestSucces, setUserRequestSeccess] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [formValidationMessage, setFormValidationMessage] = useState('');

    useEffect(() => {
        if (Cookies.get('jwt')) {
            mainApi
                .getUserInfo()
                .then((res) => {
                    setCurrentUser(res);
                    setLoggedIn(true);
                    navigation('/movies');
                })
                .then(() => {
                    return mainApi.getSavedMovies();
                })
                .then((res) => {
                    setSavedFilteredMovies(res);
                    setSavedMovies(res);
                    localStorage.setItem('savedMovies', JSON.stringify(res));
                });
        }
        setLoggedIn(false);
        navigation('/');
    }, []);

    useEffect(() => {
        checkLocalStarage();
    }, [userRequest]);

    useEffect(() => {
        handleChangePath(location.pathname);
        handleDisableProfileEdit();
    }, [currentPath]);

    function handleChangePath(pathname) {
        setCurrentPath(pathname);
    }

    function checkLocalStarage() {
        if (JSON.parse(localStorage.getItem('movies'))) {
            setFilteredMovies(JSON.parse(localStorage.getItem('movies')));
        }
    }

    async function handleSearhMovies(keyword) {
        setLoading(true);
        localStorage.setItem('userRequest', keyword);
        localStorage.setItem('checkBoxState', isShortFilm);

        try {
            if (!JSON.parse(localStorage.getItem('movies'))) {
                const movies = await moviesApi.getMovies();
                localStorage.setItem('movies', JSON.stringify(movies));
            }
            const movies = JSON.parse(localStorage.getItem('movies'));

            const foundedFilteredMovies = filterMovies(movies, keyword);
            localStorage.setItem('foundMovies', JSON.stringify(foundedFilteredMovies));
            setFilteredMovies(foundedFilteredMovies);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    function handleSearchSavedMovies(keyword) {
        setLoading(true);

        const curentSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const foundedFilteredSavedMovies = filterMovies(curentSavedMovies, keyword);
        setSavedFilteredMovies(foundedFilteredSavedMovies);
        setLoading(false);
    }

    function filterMovies(movies, keyword) {
        const maxDuration = 40;
        return movies.filter((movie) => {
            const keywordMatches =
                movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
                movie.nameEN.toLowerCase().includes(keyword.toLowerCase());

            const durationMatches = isShortFilm ? movie.duration <= maxDuration : true;

            return keywordMatches && durationMatches;
        });
    }

    function handleSignUp(formValues) {
        const { password, email, name } = formValues;
        setLoading(true);

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
                auth.login(email, password).then((data) => {
                    if (data.jwt) {
                        Cookies.set('jwt', data.jwt);
                        setLoggedIn(true);
                        navigation('/movies');
                    }
                });
            })
            .catch((err) => {
                console.log(err);
                setFormValidationMessage('Что-то пошло не так...');
            });
    }

    function handleSignIn(formValues) {
        if (!formValues.email || !formValues.password) {
            return;
        }
        setLoading(true);

        const { email, password } = formValues;
        auth.login(email, password)
            .then((data) => {
                if (data.jwt) {
                    Cookies.set('jwt', data.jwt);
                    mainApi.getUserInfo().then((res) => {
                        setUserRequestSeccess(true);
                        setFormValidationMessage('Вы успешно авторизированы');
                        setCurrentUser(res);
                        setTimeout(() => {
                            setFormValidationMessage('');
                            setLoading(false);
                            setLoggedIn(true);
                            navigation('/movies');
                        }, 750);
                    });
                }
            })
            .catch((err) => {
                setFormValidationMessage('Что-то пошло не так...');
                console.log(err);
            });
    }

    function handleLogOut() {
        Cookies.remove('jwt');
        setLoggedIn(false);
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
                    setFormValidationMessage('Что-то пошло не так...');
                    console.log(err);
                })
                .finally(() => {
                    setTimeout(() => {
                        setFormValidationMessage('');
                        handleDisableProfileEdit();
                        setLoading(false);
                    }, 1500);
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

    function handleLogIn() {
        setLoggedIn(true);
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

    function handleAddNewSavedMovie(movie) {
        setSavedMovies((oldSavedMovies) => [...oldSavedMovies, movie]);

        const existingSavedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        const updatedSavedMovies = [...existingSavedMovies, movie];
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
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
                                setMovies={setMovies}
                                moviesToRender={filteredMovies}
                                isShortFilm={isShortFilm}
                                setIsShortFilm={setIsShortFilm}
                                setUserRequest={setUserRequest}
                                userRequest={userRequest}
                                onSubmitNew={handleSearhMovies}
                                savedMovies={savedMovies}
                                addToSaved={handleAddNewSavedMovie}
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
                                // movies={savedFilteredMovies}
                                isLoading={isLoading}
                                moviesToRender={savedFilteredMovies}
                                setMoviesToRender={setSavedFilteredMovies}
                                savedMovies={savedFilteredMovies}
                                setSavedMovies={setSavedFilteredMovies}
                                onSubmitNew={handleSearchSavedMovies}
                                setIsShortFilm={setIsShortFilm}
                                isShortFilm={isShortFilm}
                                setUserRequest={setSavedMoviesUserRequest}
                                userRequest={savedMoviesUserRequest}
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
                                onSubmitProfileChanges={handleProfileChange}
                                pathHandler={handleChangePath}
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
