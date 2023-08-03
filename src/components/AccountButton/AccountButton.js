import './AccountButton.css';
import accountIcon from '../../images/accounticon.svg';
import { NavLink } from 'react-router-dom';

function AccountButton() {
    return (
        <NavLink to="/profile" className="accountbutton">
            <button className="accountbutton__button">
                <img className="accountbutton-icon>" src={accountIcon} alt="account icon"></img>Аккаунт
            </button>
        </NavLink>
    );
}

export default AccountButton;
