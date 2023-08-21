import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Devider.css';

function Devider(props) {
    const location = useLocation();
    const pathname = location.pathname;
    const [pageHasMovies, setPageMoviesState] = useState(true);

    useEffect(() => {
        if (props.filteredMovies) {
            setPageMoviesState(!props.filteredMovies.length > 0);
        }
    }, [props.filteredMovies]);

    return (
        <section className="devider">
            {(pageHasMovies && localStorage.getItem('userRequest') !== null) ||
            (pathname === '/saved-movies' && pageHasMovies) ? (
                <p className="devider__text">Ничего не найдено</p>
            ) : null}
        </section>
    );
}

export default Devider;
