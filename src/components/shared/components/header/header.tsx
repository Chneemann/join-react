import React from "react";
import "./header.css";
import SmallBtn from "../buttons/small-btn";
import MemberCircle from "../member-circle/member-circle";
import { withTranslation, WithTranslation } from "react-i18next";
import { User } from "../../../../interfaces/user.interface";
import LargeButton from "../buttons/large-btn";
import { log } from "console";
import MemberMenu from "./member-menu";

interface HeaderProps extends WithTranslation {
  currentUser: User | null;
  navigate: (path: string) => void;
  location: { pathname: string };
}

interface HeaderState {
  toggleMemberMenu: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      toggleMemberMenu: false,
    };
  }
  changeLanguage = () => {
    const { i18n } = this.props;
    const newLang = i18n.language === "en" ? "de" : "en";
    i18n.changeLanguage(newLang);
  };

  handleRegisterClick = () => {
    this.props.navigate("/register");
  };

  openMemberMenu = () => {
    this.state.toggleMemberMenu
      ? this.setState({ toggleMemberMenu: false })
      : this.setState({ toggleMemberMenu: true });
  };

  render() {
    const { t, currentUser, location } = this.props;
    const { toggleMemberMenu } = this.state;
    const isLoginRoute =
      location.pathname === "/login" || location.pathname === "/";

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
              <div className="header-member-circle">
                <MemberCircle
                  memberInitials={currentUser.initials}
                  onClick={this.openMemberMenu}
                />
                {toggleMemberMenu && <MemberMenu />}
              </div>
            </div>
          </div>
        ) : (
          <div className="header-auth">
            <img
              className="header-logo-auth"
              src="./assets/img/logo-small-blue.svg"
              alt=""
            />
            <div className="header-language">
              <SmallBtn
                image="language.svg"
                onClick={this.changeLanguage}
              ></SmallBtn>
            </div>
            {isLoginRoute && (
              <div className="header-register">
                <div className="header-register-question">
                  {t("header.notAUser")}
                </div>
                <LargeButton
                  type="button"
                  value={t("header.signup")}
                  onClick={this.handleRegisterClick}
                />
              </div>
            )}
          </div>
        )}
      </header>
    );
  }
}

export default withTranslation()(Header);
