import './FilterSwitch.css';

function FilterSwitch() {
    return (
        <div className="filterswitch">
            <label className="filterswitch__input-label">
                <input type="checkbox" className="filterswitch__invisible-checkbox" id="checkbox" name="checkbox" />
                <span className="filterswitch__visible-checkbox filterswitch__visible-checkbox_type_checked"></span>
            </label>
            <p className="filterswitch__text">Короткометражки</p>
        </div>
    );
}

export default FilterSwitch;
