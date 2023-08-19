import { useEffect, useState } from 'react';
import './FilterSwitch.css';

function FilterSwitch(props) {
    function handleCheckboxChange(e) {
        props.setCheckBoxState(e.target.checked);
    }

    return (
        <div className="filterswitch">
            <label className="filterswitch__input-label">
                <input
                    type="checkbox"
                    className="filterswitch__invisible-checkbox"
                    id="checkbox"
                    name="checkbox"
                    checked={props.checkBoxState}
                    onChange={handleCheckboxChange}
                />
                <span className="filterswitch__visible-checkbox filterswitch__visible-checkbox_type_checked"></span>
            </label>
            <p className="filterswitch__text">Короткометражки</p>
        </div>
    );
}

export default FilterSwitch;
