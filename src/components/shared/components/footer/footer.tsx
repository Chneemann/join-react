import React from "react";
import "./footer.css";
import { withTranslation, WithTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

interface FooterProps extends WithTranslation {}

class Footer extends React.Component<FooterProps> {
  render() {
    const { t } = this.props;

    return (
      <footer>
        <NavLink to="/privacy-policy">{t("footer.privacyPolicy")}</NavLink>
        <NavLink to="/legal-notice">{t("footer.legalNotice")}</NavLink>
      </footer>
    );
  }
}

export default withTranslation()(Footer);
