import React from "react";
import { NavLink } from "react-router-dom";
import { withTranslation, WithTranslation } from "react-i18next";
import "./navbar.css";

interface NavbarProps extends WithTranslation {}

// Create NavItem component
const NavItem = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: string;
  label: string;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
  >
    <img src={icon} alt={label} />
    <span>{label}</span>
  </NavLink>
);

// Create FooterItem component
const FooterItem = ({ icon, label }: { icon: string; label: string }) => (
  <div className="navbar-footer-item">
    <div className="footer-text">{label}</div>
    <div className="footer-icon">
      <img src={icon} alt={label} />
    </div>
  </div>
);

// Navbar component
class Navbar extends React.Component<NavbarProps> {
  render() {
    const { t } = this.props;

    // Navbar Items Configuration
    const navItems = [
      {
        to: "/summary",
        icon: "/assets/img/navbar/summary.svg",
        label: t("navbar.summary"),
      },
      {
        to: "/add-task",
        icon: "/assets/img/navbar/add-task.svg",
        label: t("navbar.addTask"),
      },
      {
        to: "/board",
        icon: "/assets/img/navbar/board.svg",
        label: t("navbar.board"),
      },
      {
        to: "/contacts",
        icon: "/assets/img/navbar/contacts.svg",
        label: t("navbar.contacts"),
      },
    ];

    // Footer Items Configuration
    const footerItems = [
      {
        icon: "/assets/img/navbar/privacy-policy.svg",
        label: t("navbar.privacyPolicy"),
      },
      {
        icon: "/assets/img/navbar/legal-notice.svg",
        label: t("navbar.legalNotice"),
      },
      { icon: "/assets/img/navbar/log-out.svg", label: t("navbar.logout") },
    ];

    return (
      <div className="navbar">
        <nav>
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </nav>
        <div className="navbar-footer">
          {footerItems.map((item, index) => (
            <FooterItem key={index} icon={item.icon} label={item.label} />
          ))}
        </div>
      </div>
    );
  }
}

export default withTranslation()(Navbar);
