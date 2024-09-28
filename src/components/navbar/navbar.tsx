import React from "react";
import { NavLink } from "react-router-dom";
import { withTranslation, WithTranslation } from "react-i18next";
import "./navbar.css";

interface NavbarProps extends WithTranslation {}

class Navbar extends React.Component<NavbarProps> {
  render() {
    const { t } = this.props;

    return (
      <div className="navbar">
        <nav>
          <NavLink
            to="/summary"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <img src="./../../assets/img/navbar/summary.svg" alt="summary" />
            <span>{t("navbar.summary")}</span>
          </NavLink>
          <NavLink
            to="/add-task"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <img src="./../../assets/img/navbar/add-task.svg" alt="add task" />
            <span>{t("navbar.addTask")}</span>
          </NavLink>
          <NavLink
            to="/board"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <img src="./../../assets/img/navbar/board.svg" alt="board" />
            <span>{t("navbar.board")}</span>
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <img src="./../../assets/img/navbar/contacts.svg" alt="contacts" />
            <span>{t("navbar.contacts")}</span>
          </NavLink>
        </nav>
        <div className="navbar-footer">
          <div className="navbar-footer-item">
            <div className="footer-text">{t("navbar.privacyPolicy")}</div>
            <div className="footer-icon">
              <img
                src="./../../assets/img/navbar/privacy-policy.svg"
                alt="privacy policy"
              />
            </div>
          </div>
          <div className="navbar-footer-item">
            <div className="footer-text">{t("navbar.legalNotice")}</div>
            <div className="footer-icon">
              <img
                src="./../../assets/img/navbar/legal-notice.svg"
                alt="legal notice"
              />
            </div>
          </div>
          <div className="navbar-footer-item">
            <div className="footer-text">{t("navbar.logout")}</div>
            <div className="footer-icon">
              <img src="./../../assets/img/navbar/log-out.svg" alt="log out" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Navbar);
