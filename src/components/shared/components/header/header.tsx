import React, { createRef } from "react";
import "./header.css";
import SmallBtn from "../buttons/small-btn";
import MemberCircle from "../member-circle/member-circle";
import { withTranslation, WithTranslation } from "react-i18next";
import { User } from "../../../../interfaces/user.interface";
import LargeButton from "../buttons/large-btn";
import UserMenu from "./user-menu";

interface HeaderProps extends WithTranslation {
  currentUser: User | null;
  navigate: (path: string) => void;
  location: { pathname: string };
}

interface HeaderState {
  toggleUserMenu: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  menuRef = createRef<HTMLDivElement>();

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      toggleUserMenu: false,
    };
  }

  /**
   * Changes the language.
   */
  changeLanguage = () => {
    const { i18n } = this.props;
    const newLang = i18n.language === "en" ? "de" : "en";
    i18n.changeLanguage(newLang);
  };

  /**
   * Navigates to the register page.
   */
  handleRegisterClick = () => {
    this.props.navigate("/register");
  };

  // User menu

  /**
   * Handles outside click to hide the user menu. This is
   * attached to the document in componentDidMount.
   */
  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
  }

  /**
   * Removes the event listener on the document for outside clicks
   * of the user menu. This is called when the component is unmounted.
   */
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
  }

  /**
   * Handles outside click to hide the user menu.
   */
  handleOutsideClick = (event: MouseEvent) => {
    if (
      this.state.toggleUserMenu &&
      this.menuRef.current &&
      !this.menuRef.current.contains(event.target as Node)
    ) {
      this.setState({ toggleUserMenu: false });
    }
  };

  /**
   * Toggles the member menu.
   */
  toggleMemberMenu = () => {
    this.setState((prevState) => ({
      toggleUserMenu: !prevState.toggleUserMenu,
    }));
  };

  render() {
    const { t, currentUser, location } = this.props;
    const { toggleUserMenu } = this.state;
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
              <div className="header-member-circle" ref={this.menuRef}>
                <MemberCircle
                  memberInitials={currentUser.initials}
                  onClick={this.toggleMemberMenu}
                />
                {toggleUserMenu && <UserMenu onClose={this.toggleMemberMenu} />}
              </div>
            </div>
          </div>
        ) : (
          <div className="header-auth">
            <a href="/">
              <img
                className="header-logo-auth"
                src="./assets/img/logo-small-blue.svg"
                alt=""
              />
            </a>
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
