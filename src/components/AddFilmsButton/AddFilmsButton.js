import './AddFilmsButton.css';

function AddFilmsButton(props) {
    const handleButtonClick = () => {
        props.setAnotherSectionButtonPressed(props.anotherSectionButtonPressed + 1);
    };

    return (
        <button className="addfilmsbutton" type="button" onClick={handleButtonClick}>
            Ещё
        </button>
    );
}

export default AddFilmsButton;
