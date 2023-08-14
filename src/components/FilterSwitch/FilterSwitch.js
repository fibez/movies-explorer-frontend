import React, { useEffect, useState } from 'react';
import './FilterSwitch.css';

function FilterSwitch(props) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        const newIsChecked = event.target.checked;
        setIsChecked(newIsChecked);
        props.setIsShortFilm(newIsChecked);
        props.setUserRequest(props.inputValue);
    };

    return (
        <div className="filterswitch">
            <label className="filterswitch__input-label">
                <input
                    type="checkbox"
                    className="filterswitch__invisible-checkbox"
                    id="checkbox"
                    name="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <span className="filterswitch__visible-checkbox filterswitch__visible-checkbox_type_checked"></span>
            </label>
            <p className="filterswitch__text">Короткометражки</p>
        </div>
    );
}

export default FilterSwitch;
