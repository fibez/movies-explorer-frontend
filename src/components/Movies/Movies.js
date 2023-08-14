import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MovieCardList from '../MovieCardList/MovieCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { useEffect } from 'react';

function Movies(props) {
    return (
        <>
            <Header
                isLoggedIn={props.isLoggedIn}
                handleLogIn={props.handleLogIn}
                isBurgerMenuOppened={props.isBurgerMenuOppened}
                onBurgerMenuOpen={props.onBurgerMenuOpen}
                onBurgerMenuClose={props.onBurgerMenuClose}
            />
            <main className="movies">
                <SearchForm
                    //Фильтры
                    setIsShortFilm={props.setIsShortFilm}
                    isShortFilm={props.issShortFilm}
                    setUserRequest={props.setUserRequest}
                    userRequest={props.userRequest}
                    onSubmitNew={props.onSubmitNew}
                />
                {props.isLoading ? (
                    <Preloader />
                ) : (
                    <MovieCardList
                        renderedMovies={props.moviesToRender}
                        savedMovies={props.savedMovies}
                        addToSaved={props.addToSaved}
                    />
                )}
            </main>
            <Footer />
        </>
    );
}

export default Movies;
