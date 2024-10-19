import React from "react";
import "./login.css";
import { withTranslation, WithTranslation } from "react-i18next";
import { login } from "../../services/auth.service";

interface LoginProps extends WithTranslation {}

interface LoginState {
  email: string;
  password: string;
  error: string | null;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    const { t } = this.props;
    const { email, password } = this.state;

    try {
      await login(email, password);
      window.location.href = "/summary";
    } catch (error) {
      this.setState({
        error: t("login.errorMail1"),
      });
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
    const { email, password, error } = this.state;

    return (
      <div className="login">
        <div className="login-container">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder={t("login.email")}
              value={email}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder={t("login.password")}
              value={password}
              onChange={this.handleChange}
            />
            <button type="submit">{t("login.login")}</button>
            <button type="button" onClick={this.handleGuestLogin}>
              {t("login.guest")}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    );
  }
}

export default withTranslation()(Login);
