import './MovieCardList.css';
import MovieCard from '../MovieCard/MovieCard';

function MovieCardList(props) {
    function getClassNameByMovieListLength() {
        if (props.movies.length < 25) {
            return 'moviecardlist__more-films_type_hidden';
        }
    }

    function sliceMoviesList() {
        return props.movies.slice(0, 24);
    }

    return (
        <section className="moviecardlist">
            <div className="moviecardlist__container">
                <ul className="moviecardlist__cards">
                    <MovieCard movies={sliceMoviesList()} />
                </ul>
            </div>
            <button className={`moviecardlist__more-films ${getClassNameByMovieListLength()}`}>Еще</button>
        </section>
    );
}

export default MovieCardList;
