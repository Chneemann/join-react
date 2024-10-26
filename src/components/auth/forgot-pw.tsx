import React from "react";
import "./forgot-pw.css";
import { withTranslation, WithTranslation } from "react-i18next";
import SmallBtn from "../shared/components/buttons/small-btn";

interface ForgotPasswordProps extends WithTranslation {}

interface ForgotPasswordState {}

class ForgotPassword extends React.Component<
  ForgotPasswordProps,
  ForgotPasswordState
> {
  render() {
    const { t } = this.props;

    return (
      <div className="forgot-pw">
        {/* Header */}
        <div className="forgot-pw-header">
          <div className="forgot-pw-headline">
            <SmallBtn image="back.svg" to="/login"></SmallBtn>
            <div className="forgot-pw-title">{t("forgotPw.forgot")}</div>
            <div className="forgot-pw-spacer"></div>
          </div>
          <div className="forgot-pw-line">
            <img src="./../../../assets/img/auth/line.svg" alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(ForgotPassword);
