// import Logo from "../Logo/Logo";
import Header from "../Header/Header";
import Promo from '../Promo/Promo';
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";

function Main(props) {
    return (
        <>
        <Header isLoggedIn={props.isLoggedIn}></Header>
        <Promo />
        <NavTab />
        <AboutProject />
        </>
    );
}

export default Main;