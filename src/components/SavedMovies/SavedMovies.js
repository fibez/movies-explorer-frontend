import Header from '../Header/Header';
import MovieCardList from '../MovieCardList/MovieCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';

function SavedMovies(props) {
    return (
        <>
            <Header
                isLoggedIn={props.isLoggedIn}
                handleLogIn={props.handleLogIn}
                isBurgerMenuOppened={props.isBurgerMenuOppened}
                onBurgerMenuOpen={props.onBurgerMenuOpen}
                onBurgerMenuClose={props.onBurgerMenuClose}
            />
            <main className="savedmovies">
                <SearchForm
                    setIsShortFilm={props.setIsShortFilm}
                    isShortFilm={props.issShortFilm}
                    setUserRequest={props.setUserRequest}
                    userRequest={props.userRequest}
                    onSubmitNew={props.onSubmitNew}
                />
                {props.isLoading ? (
                    <Preloader />
                ) : (
                    <MovieCardList renderedMovies={props.moviesToRender} savedMovies={props.savedMovies} />
                )}
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;
