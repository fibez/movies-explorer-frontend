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
    isSubmitButtonDisable,
}) {
    return (
        <section className="authenticationpage">
            <div className="authenticationpage__title-container">
                <Logo isLogoHidden={isLogoHidden} />
                <h1
                    className={`authenticationpage__title ${
                        type === 'profile' ? 'authenticationpage__title_type_profile' : ''
                    }`}
                >
                    {title}
                </h1>
            </div>
            <Form
                buttonText={submitButtonText}
                type={type}
                name={'register'}
                isProfileEdit={isProfileEdit}
                onSubmit={onSubmit}
                isSubmitButtonDisable={isSubmitButtonDisable}
            >
                {children}
            </Form>
            {isLoggedIn && (
                <div className="authenticationpage__footer authenticationpage__footer_type_profile">
                    <button
                        className={`authenticationpage__footer-link authenticationpage__footer-link_type_edit-profile ${
                            isProfileEdit ? 'authenticationpage__footer-link_type_hidden' : ''
                        }`}
                        onClick={onProfileEdit}
                    >
                        Редактировать
                    </button>
                    <NavLink
                        to="/"
                        className={`authenticationpage__footer-link authenticationpage__footer-link_type_profile-logout ${
                            isProfileEdit ? 'authenticationpage__footer-link_type_hidden' : ''
                        }`}
                    >
                        Выйти из аккаунта
                    </NavLink>
                </div>
            )}
            {!isLoggedIn && (
                <div className="authenticationpage__footer">
                    <p className="authenticationpage__footer-link-description">{linkDescriptionText}</p>
                    <a
                        href="/"
                        className={`authenticationpage__footer-link ${
                            type === 'profile' ? 'authenticationpage__footer-link_type_profile' : ''
                        }`}
                    >
                        {linkText}
                    </a>
                </div>
            )}
        </section>
    );
}

export default AuthenticationPage;
