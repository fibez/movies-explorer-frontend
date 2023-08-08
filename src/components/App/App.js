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

function App() {
    const navigation = useNavigate();
    const [isBurgerMenuOppened, setBurgerMenuOpened] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState('false');
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [isProfileEdit, setProfileEdit] = useState(false);
    const [isLoading] = useState(false);

    useEffect(() => {
        setMovies(defaultMovies);
    }, []);

    useEffect(() => {
        setSavedMovies(getSavedMovies());
    }, []);

    function navigateToMovie() {
        navigation('/movies');
    }

    function getSavedMovies() {
        const savedFilms = defaultMovies.filter((film) => film.isSaved === true);
        return savedFilms;
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
                        <Movies
                            isLoggedIn={isLoggedIn}
                            handleLogIn={handleLogIn}
                            isBurgerMenuOppened={isBurgerMenuOppened}
                            onBurgerMenuOpen={handleBurgerMenuOpen}
                            onBurgerMenuClose={handleBurgerMenuClose}
                            movies={movies}
                            isLoading={isLoading}
                        />
                    }
                ></Route>
                <Route
                    path="/saved-movies"
                    element={
                        <SavedMovies
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
                    element={<Login isLoggedIn={isLoggedIn} handleLogUot={handleLogUot} onNavigate={navigateToMovie} />}
                ></Route>
                <Route
                    path="/signup"
                    element={
                        <Register isLoggedIn={isLoggedIn} handleLogUot={handleLogUot} onNavigate={navigateToMovie} />
                    }
                ></Route>
                <Route
                    path="/profile"
                    element={
                        <Profile
                            isLoggedIn={isLoggedIn}
                            handleLogIn={handleLogIn}
                            isProfileEdit={isProfileEdit}
                            onProfileEdit={handleEnableProfileEdit}
                            onProfileEditSubmit={handleDisableProfileEdit}
                            isBurgerMenuOppened={isBurgerMenuOppened}
                            onBurgerMenuOpen={handleBurgerMenuOpen}
                            onBurgerMenuClose={handleBurgerMenuClose}
                        />
                    }
                ></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </div>
    );
}

export default App;
