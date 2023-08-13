import { NavLink } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';

import './AuthenticationPage.css';

function AuthenticationPage({
    isLoggedIn,
    type,
    isLogoHidden,
    title,
    submitButtonText,
    linkDescriptionText,
    linkText,
    children,
    isProfileEdit,
    onProfileEdit,
    onSubmit,
    isValid,
    navTo,
}) {
    return (
        <section className="authenticationpage">
            <div className="authenticationpage__title-container">
                <Logo isLogoHidden={isLogoHidden} />
                <h1
                    className={`authenticationpage__title ${
                        type === 'profile' ? 'authenticationpage__title_profile' : ''
                    }`}
                >
                    {title}
                </h1>
            </div>
            <Form
                buttonText={submitButtonText}
                type={type}
                name={type}
                isProfileEdit={isProfileEdit}
                onSubmit={onSubmit}
                isFormValid={isValid}
            >
                {children}
            </Form>
            {isLoggedIn && (
                <div className="authenticationpage__footer authenticationpage__footer_profile">
                    <button
                        className={`authenticationpage__footer-link authenticationpage__footer-link_edit-profile ${
                            isProfileEdit ? 'authenticationpage__footer-link_hidden' : ''
                        }`}
                        onClick={onProfileEdit}
                        type="button"
                    >
                        Редактировать
                    </button>
                    <NavLink
                        to="/signin"
                        className={`authenticationpage__footer-link authenticationpage__footer-link_profile-logout ${
                            isProfileEdit ? 'authenticationpage__footer-link_hidden' : ''
                        }`}
                    >
                        Выйти из аккаунта
                    </NavLink>
                </div>
            )}
            {!isLoggedIn && (
                <div className="authenticationpage__footer">
                    <p className="authenticationpage__footer-link-description">{linkDescriptionText}</p>
                    <NavLink to={navTo} className={`authenticationpage__footer-link`}>
                        {linkText}
                    </NavLink>
                </div>
            )}
        </section>
    );
}

export default AuthenticationPage;
