import { useEffect, useState } from 'react';
import './Devider.css';

function Devider(props) {
    const [pageHasMovies, setPageMoviesState] = useState(true);

    useEffect(() => {
        setPageMoviesState(!props.filteredMovies.length > 0);
    }, [props.filteredMovies]);

    return (
        <section className="devider">
            {pageHasMovies ? <p className="devider__text">Ничего не найдено</p> : null}
        </section>
    );
}

export default Devider;
