import './Profile.css';
import Header from '../Header/Header';
import AuthenticationPage from '../AuthenticationPage/AuthenticationPage';
import { useEffect, useContext } from 'react';
import useForm from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function Profile(props) {
    const currentUser = useContext(CurrentUserContext);
    const isLogoHidden = true;
    const { formValues, handleChange, isValid, inputErrors, resetForm } = useForm();
    const location = useLocation;

    useEffect(() => {
        props.onBurgerMenuClose();

        if (currentUser) {
            resetForm(currentUser, {}, true);
        }
    }, [currentUser, resetForm]);

    useEffect(() => {
        props.pathHandler(location.pathname);
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                props.onProfileEditSubmit();
                resetForm(currentUser, {}, true);
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    function handleSubmitForm() {
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
                    title={`Привет, ${currentUser.name}!`}
                    submitButtonText={'Сохранить'}
                    linkText={'Выйти из аккаунта'}
                    isProfileEdit={props.isProfileEdit}
                    onProfileEdit={props.onProfileEdit}
                    onSubmit={handleSubmitForm}
                    isValid={isValid}
                    formValidationMessage={props.formValidationMessage}
                    isLoading={props.isLoading}
                    isUserRequestSucces={props.isUserRequestSucces}
                    onLogOut={props.onLogOut}
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
                            disabled={props.isProfileEdit ? '' : 'disabled'}
                            onChange={handleChange}
                            value={formValues.name || ''}
                        />
                    </div>
                    <span className="profile__input-error profile__error-name">{inputErrors.name || ''}</span>
                    <div className="profile__input-container profile__input-container_borderless">
                        <label htmlFor="email" className="profile__input-label">
                            E-mail
                        </label>
                        <input
                            className="profile__input"
                            name="email"
                            id="email"
                            placeholder="E-mail"
                            autoComplete="off"
                            disabled={props.isProfileEdit ? '' : 'disabled'}
                            onChange={handleChange}
                            value={formValues.email || ''}
                        />
                    </div>
                    <span className="profile__input-error profile__error-email">{inputErrors.email || ''}</span>
                </AuthenticationPage>
            </main>
        </>
    );
}

export default Profile;
