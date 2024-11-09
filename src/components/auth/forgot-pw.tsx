import React from "react";
import "./forgot-pw.css";
import { withTranslation, WithTranslation } from "react-i18next";
import SmallBtn from "../shared/components/buttons/small-btn";
import LargeButton from "../shared/components/buttons/large-btn";
import { passwordReset } from "../../services/auth.service";

interface ForgotPasswordProps extends WithTranslation {}

interface ForgotPasswordState {
  email: string;
  errorEmail: string | null;
  emailWasSend: boolean;
  isEmailValid: boolean;
  isSubmitting: boolean;
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
      emailWasSend: false,
      isEmailValid: true,
      isSubmitting: false,
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

  /**
   * Validates the email field in the registration form based on its value.
   *
   * @param {string} name - The name of the field to validate (e.g., "email").
   * @param {string} value - The current value of the field to validate.
   */
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

  // Handle form submission
  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isEmailValid, email } = this.state;

    if (isEmailValid) {
      try {
        await passwordReset(email.toLowerCase());
        this.setState({ isSubmitting: true, emailWasSend: true });
      } catch (error) {
        console.error("Error sending the email:", error);
        this.setState({ emailWasSend: false });
      } finally {
        this.setState({ isSubmitting: false });
      }
    }
  };

  render() {
    const { t } = this.props;
    const { email, errorEmail, isSubmitting, emailWasSend } = this.state;

    return (
      <div className="forgot-pw">
        <form
          className="forgot-pw-form"
          id="form"
          onSubmit={this.handleSubmit}
          noValidate
        >
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
          {(!emailWasSend && (
            <div className="forgot-pw-content">
              <div className="forgot-pw-input-fields">
                {/* Email Field */}
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={t("forgotPw.email")}
                  value={email}
                  onChange={this.handleChange}
                  required
                />
                <img
                  className="forgot-pw-icon-mail"
                  src="./../../../assets/img/auth/mail.svg"
                  alt="mail"
                />
                <div className="error-msg">
                  {errorEmail && <p>{errorEmail}</p>}
                </div>
              </div>

              <div className="forgot-pw-notice">
                <p>{t("forgotPw.notice")}</p>
              </div>

              <div className="forgot-pw-button">
                <LargeButton
                  type="submit"
                  disabled={isSubmitting || !email || errorEmail !== null}
                  value={t("forgotPw.sendMail")}
                />
              </div>
            </div>
          )) || (
            <div className="forgot-pw-content">
              <div className="forgot-pw-notice">
                <p>{t("forgotPw.noticeSend")}</p>
              </div>

              <div className="forgot-pw-login">
                <a href="/login">Zurück zum Login</a>
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default withTranslation()(ForgotPassword);
