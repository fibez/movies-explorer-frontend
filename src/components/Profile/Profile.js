import './Profile.css';
import Header from '../Header/Header';
import AuthenticationPage from '../AuthenticationPage/AuthenticationPage';

function Profile(props) {
    const isLogoHidden = true;
    const userName = 'Виталий';

    return (
        <>
            <Header
                isLoggedIn={props.isLoggedIn}
                handleLogIn={props.handleLogIn}
                isBurgerMenuOppened={props.isBurgerMenuOppened}
                onBurgerMenuOpen={props.onBurgerMenuOpen}
                onBurgerMenuClose={props.onBurgerMenuClose}
            />
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
            >
                <div className="profile__input-container">
                    <label className="profile__input-label">Имя</label>
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
                    />
                </div>
                <div className="profile__input-container">
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
                    />
                </div>
            </AuthenticationPage>
        </>
    );
}

export default Profile;
