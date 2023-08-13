import './SearchForm.css';
import searchIcon from '../../images/searchIcon.svg';
import findButtonIcon from '../../images/findIcon.svg';
import FilterSwitch from '../FilterSwitch/FilterSwitch';
import React, { useState, useEffect } from 'react';

function SearchForm(props) {
    // const [isChecked, setIsChecked] = useState(false); // Состояние чекбокса
    const [inputValue, setInputValue] = useState(''); // Состояние Input Field

    function searchFormSubmit(e) {
        e.preventDefault();
        console.log(inputValue);
        // props.setUserRequest(inputValue);
        props.onSubmitNew(props.userRequest);
    }

    function handleChange(e) {
        props.setUserRequest(e.target.value);
        console.log(e.target.value);
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
                        inputValue={inputValue}
                        setUserRequest={props.setUserRequest}
                    />
                </form>
            </div>
        </section>
    );
}

export default SearchForm;
