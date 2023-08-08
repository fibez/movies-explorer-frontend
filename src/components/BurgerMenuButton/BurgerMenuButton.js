import './BurgerMenuButton.css';

function BurgerMenuButton(props) {
    return <button className={`burgermenubutton`} type="button" onClick={props.onBurgerMenuOpen}></button>;
}

export default BurgerMenuButton;
