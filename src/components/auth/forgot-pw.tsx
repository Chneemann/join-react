import React from "react";
import "./forgot-pw.css";
import { withTranslation, WithTranslation } from "react-i18next";
import SmallBtn from "../shared/components/buttons/small-btn";

interface ForgotPasswordProps extends WithTranslation {}

interface ForgotPasswordState {
  email: string;
  errorEmail: string | null;
  isEmailValid: boolean;
}

class ForgotPassword extends React.Component<
  ForgotPasswordProps,
  ForgotPasswordState
> {
  constructor(props: ForgotPasswordProps) {
    super(props);
    this.state = {
      email: "",
      errorEmail: null,
      isEmailValid: true,
    };
  }

  // Handle form input changes
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState(
      (prevState) => ({
        ...prevState,
        [name]: value,
      }),
      () => {
        this.validateField(name, value);
      }
    );
  };

  validateField(name: string, value: string) {
    const { t } = this.props;

    if (name === "email") {
      const isEmailValid = /\S+@\S+\.\S+/.test(value);
      this.setState({
        isEmailValid,
        errorEmail: isEmailValid ? null : t("register.errorMailPattern"),
      });
    }
  }

  render() {
    const { t } = this.props;
    const { email, errorEmail } = this.state;

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
        <div className="forgot-pw-input-fields">
          {/* Email Field */}
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder={t("register.email")}
            value={email}
            onChange={this.handleChange}
            required
          />
          <img
            className="forgot-pw-icon-mail"
            src="./../../../assets/img/auth/mail.svg"
            alt="mail"
          />
          <div className="error-msg">{errorEmail && <p>{errorEmail}</p>}</div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(ForgotPassword);
