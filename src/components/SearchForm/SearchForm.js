import './SearchForm.css';
import searchIcon from '../../images/searchIcon.svg';
import findButtonIcon from '../../images/findIcon.svg';
import FilterSwitch from '../FilterSwitch/FilterSwitch';

function SearchForm() {
    return (
        <section className="searchform">
            <div className="searchfomr__container">
                <form className="searchform__form" name="searchform">
                    <div className="searchform__form-elements">
                        <label className="searchform__input-label">
                            <img className="searchfomr__search-icon" src={searchIcon} alt="search icon"></img>
                            <input
                                className="searchform__input"
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Фильм"
                                autoComplete="off"
                                required
                            />
                        </label>
                        <button className="searchform__submit-button" type="submit">
                            <img className="searchform__find-button-icon" src={findButtonIcon} alt="find button"></img>
                        </button>
                    </div>
                    <FilterSwitch />
                </form>
            </div>
        </section>
    );
}

export default SearchForm;
