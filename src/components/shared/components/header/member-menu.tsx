import React from "react";
import "./member-menu.css";
import { withTranslation, WithTranslation } from "react-i18next";

interface MemberMenuProps extends WithTranslation {}

interface MemberMenuState {}

class MemberMenu extends React.Component<MemberMenuProps, MemberMenuState> {
  render() {
    const { t } = this.props;

    return <div className="member-menu"></div>;
  }
}

export default withTranslation()(MemberMenu);
