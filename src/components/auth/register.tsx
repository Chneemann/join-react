import React from "react";
import "./register.css";
import { withTranslation, WithTranslation } from "react-i18next";

interface RegisterProps extends WithTranslation {}

interface RegisterState {}

class Register extends React.Component<RegisterProps, RegisterState> {
  render() {
    const { t } = this.props;

    return <div className="register"></div>;
  }
}

export default withTranslation()(Register);
