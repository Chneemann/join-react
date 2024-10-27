import React from "react";
import "./register.css";
import { withTranslation, WithTranslation } from "react-i18next";
import LargeButton from "../shared/components/buttons/large-btn";
import SmallBtn from "../shared/components/buttons/small-btn";
import { register } from "../../services/auth.service";
import { log } from "console";

interface RegisterProps extends WithTranslation {}

interface RegisterState {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  checkboxState: boolean;
  wasCheckboxChecked: boolean;
  errorCheckbox: string | null;
  errorName: string | null;
  errorEmail: string | null;
  errorPassword: string | null;
  errorPasswordConfirm: string | null;
  isNameValid: boolean;
  isEmailValid: boolean;
  isPasswordValid: boolean;
  isPasswordConfirmValid: boolean;
  isSubmitting: boolean;
  registrationError: string | null;
  showPassword: boolean;
}

class Register extends React.Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      checkboxState: false,
      wasCheckboxChecked: false,
      errorCheckbox: null,
      errorName: null,
      errorEmail: null,
      errorPassword: null,
      errorPasswordConfirm: null,
      isNameValid: true,
      isEmailValid: true,
      isPasswordValid: true,
      isPasswordConfirmValid: true,
      isSubmitting: false,
      registrationError: null,
      showPassword: false,
    };
  }

  /**
   * Validates a specific field in the registration form based on its name.
   * Updates the component's state with validation results and appropriate error messages.
   *
   * @param {string} name - The name of the field to validate (e.g., "name", "email", "password", "passwordConfirm").
   * @param {string} value - The current value of the field to validate.
   *
   * Validation rules:
   * - "name": Checks if the value is at least 3 characters long and contains only letters and spaces.
   *   Sets `isNameValid` and an error message if invalid.
   * - "email": Checks if the value matches a basic email pattern.
   *   Sets `isEmailValid` and an error message if invalid.
   * - "password": Checks if the value is at least 8 characters long.
   *   Sets `isPasswordValid` and an error message if invalid.
   * - "passwordConfirm": Checks if the value matches the current password.
   *   Sets `isPasswordConfirmValid` and an error message if invalid.
   */
  validateField(name: string, value: string) {
    const { t } = this.props;

    if (name === "name") {
      let errorName = null;
      const isLengthValid = value.length >= 3;
      const isPatternValid = /^[A-Za-z ]+$/.test(value);

      if (!isPatternValid) {
        errorName = t("register.errorNamePattern");
      } else if (!isLengthValid) {
        errorName = t("register.errorNameLength");
      }

      this.setState({
        isNameValid: isLengthValid && isPatternValid,
        errorName,
      });
    }

    if (name === "email") {
      const isEmailValid = /\S+@\S+\.\S+/.test(value);
      this.setState({
        isEmailValid,
        errorEmail: isEmailValid ? null : t("register.errorMailPattern"),
      });
    }

    if (name === "password") {
      const isPasswordValid = value.length >= 8;
      this.setState({
        isPasswordValid,
        errorPassword: isPasswordValid
          ? null
          : t("register.errorPasswordTooShort"),
      });
    }

    if (name === "passwordConfirm") {
      const isPasswordConfirmValid = value === this.state.password;
      this.setState({
        isPasswordConfirmValid,
        errorPasswordConfirm: isPasswordConfirmValid
          ? null
          : t("register.errorPasswordMatch"),
      });
    }
  }

  // Handle form input changes
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;

    this.setState(
      (prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
        wasCheckboxChecked:
          name === "checkboxState" && checked
            ? true
            : prevState.wasCheckboxChecked,
      }),
      () => {
        this.validateField(name, value);

        if (
          name === "checkboxState" &&
          !checked &&
          this.state.wasCheckboxChecked
        ) {
          this.setState({
            errorCheckbox: this.props.t("register.privacyPolicyError"),
          });
        } else if (name === "checkboxState" && checked) {
          this.setState({ errorCheckbox: null });
        }
      }
    );
  };

  // Handle form submission
  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      isNameValid,
      isEmailValid,
      isPasswordValid,
      isPasswordConfirmValid,
      checkboxState,
      name,
      email,
      password,
    } = this.state;

    if (
      isNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isPasswordConfirmValid &&
      checkboxState
    ) {
      this.setState({ isSubmitting: true, registrationError: null });

      try {
        await register({
          name,
          firstName: name.split(" ")[0],
          lastName: name.split(" ").slice(1).join(" "),
          mail: email,
          password,
        });
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("auth/email-already-in-use")) {
            this.setState({
              errorEmail: "The email address is already in use.",
            });
          }
        }
      } finally {
        this.setState({ isSubmitting: false });
      }
    }
  };

  handleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  /**
   * Renders the registration form with its input fields, validation error messages and submit button.
   *
   * The form contains the following fields:
   * - Name
   * - Email
   * - Password
   * - Confirm Password
   * - Checkbox for accepting the privacy policy
   *
   * The form also displays error messages for each field if the input is invalid.
   * The submit button is disabled if any of the fields are invalid.
   *
   * @returns {JSX.Element} The rendered registration form.
   */
  render() {
    const { t } = this.props;
    const {
      name,
      email,
      password,
      passwordConfirm,
      checkboxState,
      errorCheckbox,
      errorName,
      errorEmail,
      errorPassword,
      errorPasswordConfirm,
      isSubmitting,
      showPassword,
    } = this.state;

    return (
      <div className="register">
        <form
          className="register-form"
          id="form"
          onSubmit={this.handleSubmit}
          noValidate
        >
          {/* Header */}
          <div className="register-header">
            <div className="register-headline">
              <SmallBtn image="back.svg" to="/login"></SmallBtn>
              <div className="register-title">{t("register.signup")}</div>
              <div className="register-spacer"></div>
            </div>
            <div className="register-line">
              <img src="./../../../assets/img/auth/line.svg" alt="" />
            </div>
          </div>

          <div className="input-fields">
            {/* Name Field */}
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder={t("register.name")}
              maxLength={20}
              value={name}
              onChange={this.handleChange}
              required
            />
            <img
              className="register-icon-user"
              src="./../../../assets/img/auth/user.svg"
              alt="user"
            />
            <div className="register-error-msg">
              {errorName && <p>{errorName}</p>}
            </div>

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
              className="register-icon-mail"
              src="./../../../assets/img/auth/mail.svg"
              alt="mail"
            />
            <div className="register-error-msg">
              {errorEmail && <p>{errorEmail}</p>}
            </div>

            {/* Password Field */}
            <input
              type={this.state.showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              placeholder={t("register.password")}
              value={password}
              onChange={this.handleChange}
              required
            />
            {password ? (
              !showPassword ? (
                <img
                  className="register-icon-eye"
                  src="./../../../assets/img/auth/close-eye.svg"
                  alt="close-eye"
                  onClick={this.handleShowPassword}
                />
              ) : (
                <img
                  className="register-icon-eye"
                  src="./../../../assets/img/auth/open-eye.svg"
                  alt="open-eye"
                  onClick={this.handleShowPassword}
                />
              )
            ) : (
              <img
                className="register-icon-password"
                src="./../../../assets/img/auth/lock.svg"
                alt="lock"
              />
            )}
            <div className="register-error-msg">
              {errorPassword && <p>{errorPassword}</p>}
            </div>

            {/* Confirm Password Field */}
            <input
              type={this.state.showPassword ? "text" : "password"}
              name="passwordConfirm"
              autoComplete="new-password"
              placeholder={t("register.passwordConfirm")}
              value={passwordConfirm}
              onChange={this.handleChange}
              required
            />
            {password ? (
              !showPassword ? (
                <img
                  className="register-icon-eye-confirm"
                  src="./../../../assets/img/auth/close-eye.svg"
                  alt="close-eye"
                  onClick={this.handleShowPassword}
                />
              ) : (
                <img
                  className="register-icon-eye-confirm"
                  src="./../../../assets/img/auth/open-eye.svg"
                  alt="open-eye"
                  onClick={this.handleShowPassword}
                />
              )
            ) : (
              <img
                className="register-icon-password-confirm"
                src="./../../../assets/img/auth/lock.svg"
                alt="lock"
              />
            )}
            <div className="register-error-msg">
              {errorPasswordConfirm && <p>{errorPasswordConfirm}</p>}
            </div>

            {/* Checkbox for accepting the privacy policy */}
            <div className="register-privacy-policy">
              <input
                type="checkbox"
                id="checkboxState"
                name="checkboxState"
                checked={checkboxState}
                onChange={this.handleChange}
                required
              />
              <label htmlFor="checkboxState">
                {t("register.privacyPolicy0")}
                <a href="/login/privacy-policy">
                  {t("register.privacyPolicy1")}
                </a>
              </label>
            </div>
            <div className="register-error-msg">
              {errorCheckbox && <p>{errorCheckbox}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="register-button">
            <LargeButton
              type="submit"
              disabled={isSubmitting || !email || !password || !checkboxState}
              value={t("register.signup")}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withTranslation()(Register);
