import './Profile.css';
import Header from '../Header/Header';
import AuthenticationPage from '../AuthenticationPage/AuthenticationPage';
import { useEffect, useState } from 'react';
import useForm from '../../hooks/useForm';

function Profile(props) {
    const isLogoHidden = true;
    const [nameInputValue, setNameInputValue] = useState('');
    const [emailInputValue, setEmailInputValue] = useState('');
    const [submitButtonState, setSubmitButtonState] = useState(true);

    const { formValues, handleChange, isValid } = useForm();

    useEffect(() => {
        formValues.name = props.userData.name;
        formValues.email = props.userData.email;
    }, []);

    function handleSubmitForm(e) {
        console.log(formValues);
        e.preventDefault();
        props.onSubmitProfileChanges(formValues);
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
                    title={`Привет, ${props.userData.name}!`}
                    submitButtonText={'Сохранить'}
                    linkText={'Выйти из аккаунта'}
                    isProfileEdit={props.isProfileEdit}
                    onProfileEdit={props.onProfileEdit}
                    onSubmit={handleSubmitForm}
                    isValid={isValid}
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
                            required
                            // defaultValue={nameInputValue}
                            disabled={props.isProfileEdit ? '' : 'disabled'}
                            onChange={handleChange}
                            value={formValues.name}
                        />
                    </div>
                    <div className="profile__input-container profile__input-container_borderless">
                        <label htmlFor="email" className="profile__input-label">
                            E-mail
                        </label>
                        <input
                            // type="email"
                            className="profile__input"
                            name="email"
                            id="email"
                            placeholder="E-mail"
                            autoComplete="off"
                            // defaultValue={emailInputValue}
                            required
                            disabled={props.isProfileEdit ? '' : 'disabled'}
                            // onChange={handleEmailInputChange}
                            onChange={handleChange}
                            value={formValues.email}
                        />
                    </div>
                </AuthenticationPage>
            </main>
        </>
    );
}

export default Profile;
