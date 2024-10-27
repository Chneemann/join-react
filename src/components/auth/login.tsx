import React from "react";
import "./login.css";
import { withTranslation, WithTranslation } from "react-i18next";
import { login, googleLogin } from "../../services/auth.service";
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
  showPassword: boolean;
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
      showPassword: false,
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

  handleGoogleLogin = async () => {
    try {
      await googleLogin();
      window.location.href = "/summary";
    } catch (error) {
      this.setState({ isSubmitting: false });
    }
  };

  handleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
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
      showPassword,
    } = this.state;

    return (
      <div className="login">
        {/* Header */}
        <div className="login-title">{t("login.login")}</div>
        <div className="login-line">
          <img src="./../../../assets/img/auth/line.svg" alt="" />
        </div>
        <form className="login-form" onSubmit={this.handleSubmit}>
          {/* Name Field */}
          <div className="login-input-fields">
            <input
              type="text"
              name="email"
              autoComplete="email"
              placeholder={t("login.email")}
              value={email}
              onChange={this.handleChange}
            />
            <img
              className="login-icon-mail"
              src="./../../../assets/img/auth/mail.svg"
              alt="mail"
            />
            <div className="login-error-msg">
              {!isEmailValid && <p>{t("login.errorMail0")}</p>}
              {errorMail && <p>{errorMail}</p>}
            </div>

            {/* Password Field */}
            <input
              type={this.state.showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              placeholder={t("login.password")}
              value={password}
              onChange={this.handleChange}
            />
            {password ? (
              !showPassword ? (
                <img
                  className="login-icon-eye"
                  src="./../../../assets/img/auth/close-eye.svg"
                  alt="close-eye"
                  onClick={this.handleShowPassword}
                />
              ) : (
                <img
                  className="login-icon-eye"
                  src="./../../../assets/img/auth/open-eye.svg"
                  alt="open-eye"
                  onClick={this.handleShowPassword}
                />
              )
            ) : (
              <img
                className="login-icon-password"
                src="./../../../assets/img/auth/lock.svg"
                alt="lock"
              />
            )}
            <div className="login-error-msg">
              {!isPasswordValid && <p>{t("login.errorPassword0")}</p>}
              {errorPassword && <p>{errorPassword}</p>}
            </div>

            {/* Forgot Password */}
            <div className="login-forgot-pw">
              <a href="/forgot-pw">Forgotten password?</a>
            </div>
          </div>

          {/* Login Buttons */}
          <div className="login-button-google">
            <LargeButton
              type="button"
              imgPath="google"
              imgPosition="left"
              isWhite={true}
              disabled={isSubmitting}
              value={t("login.google")}
              onClick={this.handleGoogleLogin}
            />
          </div>
          <div className="login-buttons">
            <LargeButton
              type="submit"
              disabled={
                isSubmitting ||
                !isEmailValid ||
                !isPasswordValid ||
                !email ||
                !password
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
