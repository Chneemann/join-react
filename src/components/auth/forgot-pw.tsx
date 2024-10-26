import React from "react";
import "./forgot-pw.css";
import { withTranslation, WithTranslation } from "react-i18next";

interface ForgotPasswordProps extends WithTranslation {}

interface ForgotPasswordState {}

class ForgotPassword extends React.Component<
  ForgotPasswordProps,
  ForgotPasswordState
> {
  render() {
    const { t } = this.props;

    return <div className="forgot-pw"></div>;
  }
}

export default withTranslation()(ForgotPassword);
