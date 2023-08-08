import './Profile.css';
import Header from '../Header/Header';
import AuthenticationPage from '../AuthenticationPage/AuthenticationPage';
import { useEffect, useState } from 'react';

function Profile(props) {
    const isLogoHidden = true;
    const userName = 'Виталий';

    const [nameInputValue, setNameInputValue] = useState('');
    const [emailInputValue, setEmailInputValue] = useState('');
    const [submitButtonState, setSubmitButtonState] = useState(true);

    useEffect(() => {
        disableButton();
    }, [nameInputValue, emailInputValue, submitButtonState]);

    function handleNameInputChange(event) {
        const value = event.target.value;
        setNameInputValue(value);
    }

    function handleEmailInputChange(event) {
        const value = event.target.value;
        setEmailInputValue(value);
    }

    function disableButton() {
        return setSubmitButtonState(nameInputValue.length > 4 || emailInputValue.length > 4);
    }

    return (
        <>
            <Header
                isLoggedIn={props.isLoggedIn}
                handleLogIn={props.handleLogIn}
                isBurgerMenuOppened={props.isBurgerMenuOppened}
                onBurgerMenuOpen={props.onBurgerMenuOpen}
                onBurgerMenuClose={props.onBurgerMenuClose}
            />
            <main className="profile">
                <AuthenticationPage
                    isLoggedIn={props.isLoggedIn}
                    type={'profile'}
                    isLogoHidden={isLogoHidden}
                    title={`Привет, ${userName}!`}
                    submitButtonText={'Сохранить'}
                    linkText={'Выйти из аккаунта'}
                    isProfileEdit={props.isProfileEdit}
                    onProfileEdit={props.onProfileEdit}
                    onSubmit={props.onProfileEditSubmit}
                    isSubmitButtonDisable={submitButtonState}
                >
                    <div className="profile__input-container">
                        <label className="profile__input-label" htmlFor="name">
                            Имя
                        </label>
                        <input
                            type="text"
                            className="profile__input"
                            name="name"
                            id="name"
                            placeholder="Имя"
                            minLength="2"
                            maxLength="30"
                            autoComplete="off"
                            defaultValue="Виталий"
                            required
                            disabled={props.isProfileEdit ? '' : 'disabled'}
                            onChange={handleNameInputChange}
                        />
                    </div>
                    <div className="profile__input-container profile__input-container_borderless">
                        <label htmlFor="email" className="profile__input-label">
                            E-mail
                        </label>
                        <input
                            type="email"
                            className="profile__input"
                            name="email"
                            id="email"
                            placeholder="E-mail"
                            minLength="6"
                            maxLength="30"
                            autoComplete="off"
                            defaultValue="pochta@yandex.ru"
                            required
                            disabled={props.isProfileEdit ? '' : 'disabled'}
                            onChange={handleEmailInputChange}
                        />
                    </div>
                </AuthenticationPage>
            </main>
        </>
    );
}

export default Profile;
