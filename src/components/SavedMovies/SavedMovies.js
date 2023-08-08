import Header from '../Header/Header';
import MovieCardList from '../MovieCardList/MovieCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';

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
                <SearchForm />
                {props.isLoading ? <Preloader /> : <MovieCardList movies={props.movies} />}
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;
