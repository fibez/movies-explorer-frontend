import { NavLink } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';

import './AuthenticationPage.css';

function AuthenticationPage(props) {
    return (
        <section className="authenticationpage">
            <div className="authenticationpage__title-container">
                <Logo isLogoHidden={props.isLogoHidden} />
                <h1 className={`authenticationpage__title ${props.type === 'profile' ? 'authenticationpage__title_profile' : ''}`}>{props.title}</h1>
            </div>
            <Form
                buttonText={props.submitButtonText}
                type={props.type}
                name={props.type}
                isProfileEdit={props.isProfileEdit}
                onSubmit={props.onSubmit}
                isFormValid={props.isValid}
                formValidationMessage={props.formValidationMessage}
                isLoading={props.isLoading}
                isUserRequestSucces={props.isUserRequestSucces}
            >
                {props.children}
            </Form>
            {props.isLoggedIn && (
                <div className="authenticationpage__footer authenticationpage__footer_profile">
                    <button
                        className={`authenticationpage__footer-link authenticationpage__footer-link_edit-profile ${
                            props.isProfileEdit ? 'authenticationpage__footer-link_hidden' : ''
                        }`}
                        onClick={props.onProfileEdit}
                        type="button"
                    >
                        Редактировать
                    </button>
                    <NavLink
                        to="/"
                        onClick={props.onLogOut}
                        className={`authenticationpage__footer-link authenticationpage__footer-link_profile-logout ${
                            props.isProfileEdit ? 'authenticationpage__footer-link_hidden' : ''
                        }`}
                    >
                        Выйти из аккаунта
                    </NavLink>
                </div>
            )}
            {!props.isLoggedIn && (
                <div className="authenticationpage__footer">
                    <p className="authenticationpage__footer-link-description">{props.linkDescriptionText}</p>
                    <NavLink to={props.navTo} className={`authenticationpage__footer-link`}>
                        {props.linkText}
                    </NavLink>
                </div>
            )}
        </section>
    );
}

export default AuthenticationPage;
