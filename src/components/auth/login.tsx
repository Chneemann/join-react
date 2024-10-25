import React from "react";
import "./login.css";
import { withTranslation, WithTranslation } from "react-i18next";
import { login } from "../../services/auth.service";
import LargeButton from "../shared/components/buttons/large-btn";
import { FirebaseError } from "firebase/app";

interface LoginProps extends WithTranslation {}

interface LoginState {
  email: string;
  password: string;
  errorMail: string | null;
  errorPassword: string | null;
  isSubmitting: boolean;
  isEmailValid: boolean;
  isPasswordValid: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMail: null,
      errorPassword: null,
      isSubmitting: false,
      isEmailValid: true,
      isPasswordValid: true,
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Update state based on input change
    this.setState(
      (prevState) => ({
        ...prevState,
        [name]: value,
      }),
      () => {
        // Perform validation after state update
        if (name === "email") {
          this.setState({ isEmailValid: this.validateEmail(value) });
        } else if (name === "password") {
          this.setState({ isPasswordValid: this.validatePassword(value) });
        }
      }
    );
  };

  validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  validatePassword = (password: string) => {
    return password.length > 8;
  };

  handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    const { t } = this.props;
    const { email, password, isEmailValid, isPasswordValid } = this.state;

    this.setState({ errorMail: null, errorPassword: null, isSubmitting: true });

    if (!isEmailValid || !isPasswordValid) {
      this.setState({ isSubmitting: false });
      return;
    }

    try {
      await login(email, password);
      window.location.href = "/summary";
    } catch (error) {
      if (error instanceof FirebaseError) {
        let errorMail = null;
        let errorPassword = null;

        if (error.code === "auth/invalid-email") {
          errorMail = t("login.errorMail1");
        } else if (error.code === "auth/invalid-credential") {
          errorPassword = t("login.errorPassword1");
        }

        this.setState({ errorMail, errorPassword });
      } else {
        this.setState({ errorMail: t("login.errorMail0") });
      }
      this.setState({ isSubmitting: false });
    }
  };

  handleGuestLogin = () => {
    this.setState(
      {
        email: process.env.REACT_APP_GUEST_EMAIL as string,
        password: process.env.REACT_APP_GUEST_PASSWORD as string,
      },
      () => {
        this.handleSubmit();
      }
    );
  };

  render() {
    const { t } = this.props;
    const {
      email,
      password,
      errorMail,
      errorPassword,
      isSubmitting,
      isEmailValid,
      isPasswordValid,
    } = this.state;

    return (
      <div className="login">
        <div className="login-title">{t("login.login")}</div>
        <div className="login-line">
          <img src="./../../../assets/img/auth/line.svg" alt="" />
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-fields">
            <input
              type="text"
              name="email"
              placeholder={t("login.email")}
              value={email}
              onChange={this.handleChange}
            />
            <img
              className="icon-mail"
              src="./../../../assets/img/auth/mail.svg"
              alt=""
            />
            <div className="login-error-msg">
              {!isEmailValid && <p>{t("login.errorMail0")}</p>}
              {errorMail && <p>{errorMail}</p>}
            </div>
            <input
              type="password"
              name="password"
              placeholder={t("login.password")}
              value={password}
              onChange={this.handleChange}
            />
            <img
              className="icon-password"
              src="./../../../assets/img/auth/lock.svg"
              alt=""
            />
            <div className="login-error-msg">
              {!isPasswordValid && <p>{t("login.errorPassword0")}</p>}
              {errorPassword && <p>{errorPassword}</p>}
            </div>
            <div className="forgot-pw">
              <a href="#TODO">Forgotten password?</a>
            </div>
          </div>
          <div className="login-button-google">
            <LargeButton
              type="button"
              imgPath="google"
              imgPosition="left"
              isWhite={true}
              disabled={isSubmitting}
              value={t("login.google")}
              onClick={this.handleGuestLogin}
            />
          </div>
          <div className="login-buttons">
            <LargeButton
              type="submit"
              disabled={
                isSubmitting || !email || !password || password.length <= 8
              }
              value={t("login.login")}
            />
            <LargeButton
              type="button"
              isWhite={true}
              disabled={isSubmitting}
              value={t("login.guest")}
              onClick={this.handleGuestLogin}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withTranslation()(Login);
