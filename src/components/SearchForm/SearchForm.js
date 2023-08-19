import './SearchForm.css';
import searchIcon from '../../images/searchIcon.svg';
import findButtonIcon from '../../images/findIcon.svg';
import FilterSwitch from '../FilterSwitch/FilterSwitch';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm(props) {
    const [userRequest, setUserRequest] = useState('');
    const [checkBoxState, setCheckBoxState] = useState(false);
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        if (path === '/movies') {
            if (localStorage.getItem('userRequest') !== null) {
                setUserRequest(localStorage.getItem('userRequest'));
            }
            setCheckBoxState(localStorage.getItem('checkBoxState') === 'true');
        }
    }, [path]);

    function searchFormSubmit(e) {
        e.preventDefault();

        if (path === '/movies') {
            localStorage.setItem('userRequest', userRequest);
            localStorage.setItem('checkBoxState', JSON.stringify(checkBoxState));
        }

        props.onSubmit(userRequest, checkBoxState);
    }

    function handleChange(e) {
        setUserRequest(e.target.value);
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
                                value={userRequest || ''}
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
                    <FilterSwitch setCheckBoxState={setCheckBoxState} checkBoxState={checkBoxState} />
                </form>
            </div>
        </section>
    );
}

export default SearchForm;
