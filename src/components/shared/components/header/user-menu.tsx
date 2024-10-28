import React from "react";
import "./user-menu.css";
import { withTranslation, WithTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

interface UserMenuProps extends WithTranslation {
  onClose: () => void;
}

const MenuItem = ({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) => (
  <div className="user-menu-link" onClick={onClick}>
    <NavLink to={to}>
      <span>{label}</span>
    </NavLink>
  </div>
);

class UserMenu extends React.Component<UserMenuProps> {
  render() {
    const { t, onClose } = this.props;

    const footerItems = [
      { to: "/privacy-policy", label: t("navbar.privacyPolicy") },
      { to: "/legal-notice", label: t("navbar.legalNotice") },
      { to: "/logout", label: t("navbar.logout") },
    ];

    return (
      <div className="user-menu">
        {footerItems.map((item, index) => (
          <MenuItem
            key={index}
            to={item.to}
            label={item.label}
            onClick={onClose}
          />
        ))}
      </div>
    );
  }
}

export default withTranslation()(UserMenu);
