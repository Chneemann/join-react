// Header.tsx
import React from "react";
import "./header.css";
import SmallBtn from "../buttons/small-btn";
import MemberCircle from "../member-circle/member-circle";
import { withTranslation, WithTranslation } from "react-i18next";
import { User } from "../../../../interfaces/user.interface";
import LargeButton from "../buttons/large-btn";

interface HeaderProps extends WithTranslation {
  currentUser: User | null;
  navigate: (path: string) => void;
}
class Header extends React.Component<HeaderProps> {
  state = {
    currentUser: null,
  };

  changeLanguage = () => {
    const { i18n } = this.props;
    const newLang = i18n.language === "en" ? "de" : "en";
    i18n.changeLanguage(newLang);
  };

  // Method for navigating to the registration page
  handleRegisterClick = () => {
    this.props.navigate("/register");
  };

  render() {
    const { t, currentUser } = this.props;

    return (
      <header>
        {currentUser != null ? (
          <div className="header">
            <img
              className="header-logo"
              src="./assets/img/logo-small-white.svg"
              alt=""
            />
            <div className="header-container">
              <p className="header-title">{t("header.title")}</p>
              <SmallBtn image="help.svg" to="/help" />
              <SmallBtn image="language.svg" onClick={this.changeLanguage} />
              <MemberCircle memberInitials={currentUser.initials} />
            </div>
          </div>
        ) : (
          <div className="header-auth">
            <img
              className="header-logo-auth"
              src="./assets/img/logo-small-blue.svg"
              alt=""
            />
            <div className="header-register">
              <div className="header-register-question">
                {t("header.notAUser")}
              </div>
              <LargeButton
                type="button"
                value={t("header.signup")}
                onClick={this.handleRegisterClick} // Setze den onClick-Handler
              />
            </div>
          </div>
        )}
      </header>
    );
  }
}

export default withTranslation()(Header);
