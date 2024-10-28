import React from "react";
import "./member-menu.css";
import { withTranslation, WithTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

interface MemberMenuProps extends WithTranslation {}

interface MemberMenuState {}

const MenuItem = ({ to, label }: { to: string; label: string }) => (
  <div className="member-menu-link">
    <NavLink to={to}>
      <span>{label}</span>
    </NavLink>
  </div>
);

class MemberMenu extends React.Component<MemberMenuProps, MemberMenuState> {
  render() {
    const { t } = this.props;

    const footerItems = [
      {
        to: "/privacy-policy",
        label: t("navbar.privacyPolicy"),
      },
      {
        to: "/legal-notice",
        label: t("navbar.legalNotice"),
      },
      {
        to: "/logout",
        label: t("navbar.logout"),
      },
    ];

    return (
      <div className="member-menu">
        {footerItems.map((item, index) => (
          <MenuItem key={index} to={item.to} label={item.label} />
        ))}
      </div>
    );
  }
}

export default withTranslation()(MemberMenu);
