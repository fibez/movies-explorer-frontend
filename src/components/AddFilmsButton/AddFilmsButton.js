import './AddFilmsButton.css';

function AddFilmsButton(props) {
    // const handleButtonClick = () => {
    //     props.setAnotherSectionButtonPressed(props.anotherSectionButtonPressed + 1);
    // };

    // const handleButtonClick = () => {
    //     props.onClick;
    // };

    return (
        <button className="addfilmsbutton" type="button" onClick={props.onShowMoreMovies}>
            Ещё
        </button>
    );
}

export default AddFilmsButton;
