import './MovieCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import Devider from '../Devider/Devider';
import AddFilmsButton from '../AddFilmsButton/AddFilmsButton';

function MovieCardList(props) {
    function getElementNameByMovieListLength() {
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
            <MovieCard movies={sliceMoviesList()} />
            {getElementNameByMovieListLength()}
        </section>
    );
}

export default MovieCardList;
