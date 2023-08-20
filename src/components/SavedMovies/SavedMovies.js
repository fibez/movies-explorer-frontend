import Header from '../Header/Header';
import MovieCardList from '../MovieCardList/MovieCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';

function SavedMovies(props) {
    useEffect(() => {
        props.onSubmit('');
    }, [props.allSavedMovies]);
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
                <SearchForm onSubmit={props.onSubmit} isLoading={props.isLoading} />
                {props.isLoading ? (
                    <Preloader />
                ) : (
                    <MovieCardList
                        filteredMovies={props.filteredMovies}
                        savedMovies={props.savedMovies}
                        onDeleteMovie={props.onDeleteMovie}
                    />
                )}
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;
