import './SearchForm.css';
import searchIcon from '../../images/searchIcon.svg';
import findButtonIcon from '../../images/findIcon.svg';
import FilterSwitch from '../FilterSwitch/FilterSwitch';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm(props) {
    const location = useLocation();
    const path = location.pathname;
    // const [isChecked, setIsChecked] = useState(false); // Состояние чекбокса
    const [inputValue, setInputValue] = useState(''); // Состояние Input Field

    function getFormParams() {
        if (path === '/movies') {
        }
    }

    function searchFormSubmit(e) {
        e.preventDefault();
        props.onSubmitNew(props.userRequest);
    }

    function handleChange(e) {
        props.setUserRequest(e.target.value);
    }

    return (
        <section className="searchform">
            <div className="searchform__container">
                <form className="searchform__form" name="searchform" onSubmit={searchFormSubmit}>
                    <div className="searchform__form-elements">
                        <label className="searchform__input-label">
                            <img className="searchform__search-icon" src={searchIcon} alt="Икнока поиска"></img>
                            <input
                                className="searchform__input"
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Фильм"
                                autoComplete="off"
                                defaultValue={localStorage.getItem('userRequest')}
                                onChange={handleChange}
                            />
                        </label>
                        <button className="searchform__submit-button" type="submit">
                            <img
                                className="searchform__find-button-icon"
                                src={findButtonIcon}
                                alt="Иконка кнопки поиска фильмов"
                            ></img>
                        </button>
                    </div>
                    <FilterSwitch
                        setIsShortFilm={props.setIsShortFilm}
                        isShortFilm={props.isShortFilm}
                        setUserRequest={props.setUserRequest}
                    />
                </form>
            </div>
        </section>
    );
}

export default SearchForm;
