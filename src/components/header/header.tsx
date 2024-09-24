import React from "react";
import "./header.css";
import SmallBtn from "../shared/buttons/small-btn/small-btn";
import MemberCircle from "../shared/member-circle/member-circle";
import { withTranslation, WithTranslation } from "react-i18next";

interface HeaderProps extends WithTranslation {}

interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
  state = {};

  changeLanguage = () => {
    const { i18n } = this.props;
    const newLang = i18n.language === "en" ? "de" : "en";
    i18n.changeLanguage(newLang);
  };

  render() {
    const { t } = this.props;

    return (
      <header>
        <img className="logo" src="./assets/img/logo-small-white.svg" alt="" />
        <div className="container-right">
          <p>{t("header.title")}</p>
          <SmallBtn image="help.svg" to="/help" />
          <SmallBtn image="language.svg" onClick={this.changeLanguage} />
          <MemberCircle memberInitials="GG" />
        </div>
      </header>
    );
  }
}

export default withTranslation()(Header);
