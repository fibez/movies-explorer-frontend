import './MovieCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import Devider from '../Devider/Devider';
import AddFilmsButton from '../AddFilmsButton/AddFilmsButton';

function MovieCardList(props) {
    function getClassNameByMovieListLength() {
        if (props.movies.length <= 24) {
            return <Devider />;
        } else {
            return <AddFilmsButton />;
        }
    }

    function sliceMoviesList() {
        return props.movies.slice(0, 24);
    }

    return (
        <section className="moviecardlist">
            <div className="moviecardlist__cards">
                <MovieCard movies={sliceMoviesList()} />
            </div>
            {getClassNameByMovieListLength()}
        </section>
    );
}

export default MovieCardList;
