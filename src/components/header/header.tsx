import React from "react";
import "./header.css";
import SmallBtn from "../shared/components/buttons/small-btn";
import MemberCircle from "../shared/components/member-circle/member-circle";
import { withTranslation, WithTranslation } from "react-i18next";
import { User } from "../../interfaces/user.interface";

interface HeaderProps extends WithTranslation {
  currentUser: User | null;
}

interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
  state = {
    currentUser: null,
  };

  changeLanguage = () => {
    const { i18n } = this.props;
    const newLang = i18n.language === "en" ? "de" : "en";
    i18n.changeLanguage(newLang);
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
            {" "}
            <img
              className="header-logo-auth"
              src="./assets/img/logo-small-blue.svg"
              alt=""
            />
          </div>
        )}
      </header>
    );
  }
}

export default withTranslation()(Header);
