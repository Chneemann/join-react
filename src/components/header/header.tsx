import React from "react";
import "./header.css";
import SmallBtn from "../shared/buttons/small-btn/small-btn";
import MemberCircle from "../shared/member-circle/member-circle";
import { withTranslation, WithTranslation } from "react-i18next";

interface HeaderProps extends WithTranslation {}

interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
  state = {};

  render() {
    const { t, i18n } = this.props;

    const changeLanguage = (lng: string) => {
      i18n.changeLanguage(lng);
    };

    return (
      <header>
        <img className="logo" src="assets/img/logo-small-white.svg" alt="" />
        <div className="container-right">
          <p>{t("projectTitle")}</p>
          <SmallBtn image="help.svg" />
          <SmallBtn
            image="language.svg"
            onClick={() => changeLanguage(i18n.language === "en" ? "de" : "en")}
          />
          <MemberCircle memberInitials="GG" />
        </div>
      </header>
    );
  }
}

export default withTranslation()(Header);
