import './Logo.css';
import logo from '../../images/logo.svg';
import { useNavigate } from 'react-router-dom';

function Logo(props) {
    function navigateToMain() {
        navigation('/');
    }

    const navigation = useNavigate();
    return (
        <img
            className={`logo ${props.isLogoHidden ? 'logo__hidden' : ''}`}
            src={logo}
            alt="Логотип проекта Movie-explorer"
            onClick={navigateToMain}
        />
    );
}

export default Logo;
