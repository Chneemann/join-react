import React from "react";
import { NavLink } from "react-router-dom";
import { withTranslation, WithTranslation } from "react-i18next";
import "./navbar.css";

interface NavbarProps extends WithTranslation {}

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

const NavItemMobile = ({
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
    className={({ isActive }) =>
      isActive ? "nav-item-mobile active" : "nav-item-mobile"
    }
  >
    <img src={icon} alt={label} />
    <span>{label}</span>
  </NavLink>
);

const FooterItem = ({ icon, label }: { icon: string; label: string }) => (
  <div className="navbar-footer-item">
    <div className="footer-text">{label}</div>
    <div className="footer-icon">
      <img src={icon} alt={label} />
    </div>
  </div>
);

// Definition der navItems
const getNavItems = (t: any) => [
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

const DesktopNavbar: React.FC<NavbarProps> = ({ t }) => {
  const navItems = getNavItems(t);

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
    <React.Fragment>
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
    </React.Fragment>
  );
};

const NavbarMobile: React.FC<NavbarProps> = ({ t }) => {
  const navItems = getNavItems(t);

  return (
    <React.Fragment>
      <nav>
        {navItems.map((item, index) => (
          <NavItemMobile
            key={index}
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </nav>
    </React.Fragment>
  );
};

class Navbar extends React.Component<NavbarProps> {
  render() {
    return (
      <div>
        <div className="navbar-desktop">
          <DesktopNavbar {...this.props} />
        </div>
        <div className="navbar-mobile">
          <NavbarMobile {...this.props} />
        </div>
      </div>
    );
  }
}

export default withTranslation()(Navbar);
