import './AccountButton.css';
import accountIcon from '../../images/accounticon.svg';
import { useNavigate } from 'react-router-dom';

function AccountButton() {
    const navigate = useNavigate();

    function navigateToProfile() {
        navigate('/signin');
    }
    return (
        <button className="accountbutton" onClick={navigateToProfile} type="button">
            <img className="accountbutton-icon>" src={accountIcon} alt="Иконка кнопки аккаунта"></img>Аккаунт
        </button>
    );
}

export default AccountButton;
