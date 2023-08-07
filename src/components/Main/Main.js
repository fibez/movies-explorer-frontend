import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Tehcs from '../Tehcs/Tehcs';
import AbooutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';

function Main(props) {
    return (
        <>
            <Header isLoggedIn={props.isLoggedOut}></Header>
            <main className="main">
                <Promo />
                <NavTab />
                <AboutProject />
                <Tehcs />
                <AbooutMe />
            </main>
            <Footer />
        </>
    );
}

export default Main;
