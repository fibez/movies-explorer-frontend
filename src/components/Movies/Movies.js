import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MovieCardList from '../MovieCardList/MovieCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

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
                    onSubmit={props.onMovieFindSubmit}
                    setMovies={props.setMovies}
                    //Фильтры
                    setIsShortFilm={props.setIsShortFilm}
                    setUserRequest={props.setUserRequest}
                    userRequest={props.userRequest}
                    onSubmitNew={props.onSubmitNew}
                />
                {props.isLoading ? <Preloader /> : <MovieCardList testMovies={props.testMovies} />}
            </main>
            <Footer />
        </>
    );
}

export default Movies;
