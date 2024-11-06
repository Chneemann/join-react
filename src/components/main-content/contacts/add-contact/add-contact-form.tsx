import React, { Component } from "react";
import "./add-contact-form.css";
import { withTranslation, WithTranslation } from "react-i18next";
import LargeButton from "../../../shared/components/buttons/large-btn";
import {
  addNewContact,
  updateContact,
} from "../../../../services/firebase.service";
import { User } from "../../../../interfaces/user.interface";

interface AddContactFormProps extends WithTranslation {
  users: User[];
  selectedUserId: string | null;
  currentColor: string;
  closeDialog: () => void;
  onUserInitialsChange: (initials: string) => void;
  showOverlayMsg: (
    message: string,
    timeout: number,
    action: { reload?: boolean; href?: string }
  ) => void;
}

interface AddContactFormState {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    initials: string;
  };
  windowWidth: number;
}

class AddContactForm extends Component<
  AddContactFormProps,
  AddContactFormState
> {
  constructor(props: AddContactFormProps) {
    super(props);
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        initials: "",
      },
      windowWidth: window.innerWidth,
    };
  }

  /**
   * Adds an event listener to the window that listens for the "resize" event.
   */
  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions);
    this.loadUserData();
  }

  /**
   * React lifecycle method, called after updating occurs. This is used to refetch
   * @param prevProps - The props before the update.
   */
  componentDidUpdate(prevProps: AddContactFormProps) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadUserData();
    }
  }

  /**
   * Removes the event listener from the window that listens for the "resize" event.
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  // Update the state when the window is resized
  updateWindowDimensions = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  // Set the state of the form data
  setFormData = (formData: AddContactFormState["formData"]) => {
    this.setState({ formData });
  };

  // Updates formData
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...this.state.formData, [name]: value };

    this.setState({ formData: newFormData });

    const initials = this.getUserInitials(
      newFormData.firstName,
      newFormData.lastName
    );
    this.props.onUserInitialsChange(initials);
  };

  // Load user data
  loadUserData = () => {
    const { users, selectedUserId } = this.props;
    if (selectedUserId) {
      const selectedUser = users.find((user) => user.id === selectedUserId);
      if (selectedUser) {
        this.setFormData({
          firstName: selectedUser.firstName,
          lastName: selectedUser.lastName,
          email: selectedUser.email,
          phone: selectedUser.phone,
          initials: selectedUser.initials,
        });
        this.props.onUserInitialsChange(selectedUser.initials);
      }
    }
  };

  // Calculates the initials
  getUserInitials = (firstName: string, lastName: string) => {
    const initialFirst = firstName ? firstName.charAt(0).toUpperCase() : "";
    const initialLast = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${initialFirst}${initialLast}`;
  };

  // Save contact
  addNewContact = async () => {
    const { formData } = this.state;
    const { t, currentColor } = this.props;
    const newContact: User = {
      uId: "",
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      status: false,
      phone: formData.phone,
      initials: this.getUserInitials(formData.firstName, formData.lastName),
      color: currentColor,
      lastLogin: Date.now(),
    };
    await addNewContact(newContact);
    this.props.closeDialog();
    this.props.showOverlayMsg(t("contacts.added"), 1500, {
      reload: true,
    });
  };

  //Update contact
  updateContact = async () => {
    const { formData } = this.state;
    const { t, currentColor } = this.props;
    const newContact: User = {
      uId: "",
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      status: false,
      phone: formData.phone,
      initials: this.getUserInitials(formData.firstName, formData.lastName),
      color: currentColor,
      lastLogin: Date.now(),
    };
    await updateContact(this.props.selectedUserId!, newContact);
    this.props.closeDialog();
    this.props.showOverlayMsg(t("contacts.updated"), 1500, {
      reload: true,
    });
  };

  render() {
    const { t, closeDialog } = this.props;
    const { formData, windowWidth } = this.state;
    const isFirstNameValid = /^[A-Za-zäöüÄÖÜß' -]+$/.test(formData.firstName);
    const isLastNameValid = /^[A-Za-zäöüÄÖÜß' -]+$/.test(formData.lastName);
    const isEmailValid = /^\S+@\S+\.\S+$/.test(formData.email);
    const isPhoneValid = /^[\d\+\-\(\)\/]{10,15}$/.test(formData.phone);

    return (
      <form className="add-contact-form" onSubmit={(e) => e.preventDefault()}>
        <div className="add-contact-form-name">
          <input
            id="firstName"
            type="text"
            className="firstName"
            name="firstName"
            placeholder={t("contacts.firstName")}
            autoComplete="off"
            value={formData.firstName}
            onChange={this.handleInputChange}
            required
          />
          {windowWidth <= 800 && (
            <div className="add-contact-form-error-msg">
              {!isFirstNameValid && formData.firstName && (
                <p>{!isFirstNameValid ? t("contacts.errorLetters") : ""}</p>
              )}
            </div>
          )}
          <input
            id="lastName"
            type="text"
            className="lastName"
            name="lastName"
            placeholder={t("contacts.lastName")}
            autoComplete="off"
            value={formData.lastName}
            onChange={this.handleInputChange}
            required
          />
          {windowWidth <= 800 && (
            <div className="add-contact-form-error-msg">
              {!isLastNameValid && formData.lastName && (
                <p>{!isLastNameValid ? t("contacts.errorLetters") : ""}</p>
              )}
            </div>
          )}
        </div>
        {windowWidth >= 800 && (
          <div className="add-contact-form-error-msg">
            {(!isFirstNameValid || !isLastNameValid) &&
              (formData.firstName || formData.lastName) && (
                <p>
                  {!isFirstNameValid && formData.firstName
                    ? t("contacts.errorLettersFirstName")
                    : !isLastNameValid && formData.lastName
                    ? t("contacts.errorLettersLastName")
                    : ""}
                </p>
              )}
          </div>
        )}

        <input
          id="email"
          type="email"
          name="email"
          placeholder={t("contacts.email")}
          autoComplete="off"
          value={formData.email}
          onChange={this.handleInputChange}
          required
        />
        <div className="add-contact-form-error-msg">
          {!isEmailValid && formData.email && (
            <p>{t("contacts.errorEmailFormat")}</p>
          )}
        </div>

        <input
          id="phone"
          type="tel"
          name="phone"
          placeholder={t("contacts.phone")}
          autoComplete="off"
          value={formData.phone}
          onChange={this.handleInputChange}
          required
        />
        <div className="add-contact-form-error-msg">
          {!isPhoneValid && formData.phone && (
            <p>{t("contacts.errorPhoneFormat")}</p>
          )}
        </div>

        <div className="add-contact-buttons">
          <LargeButton
            type="button"
            isWhite={true}
            onClick={closeDialog}
            value={t("contacts.cancel")}
          />
          {!this.props.selectedUserId ? (
            <LargeButton
              type="submit"
              disabled={
                !isFirstNameValid ||
                !isLastNameValid ||
                !isEmailValid ||
                !isPhoneValid
              }
              value={t("contacts.save")}
              onClick={this.addNewContact}
            />
          ) : (
            <LargeButton
              type="submit"
              disabled={
                !isFirstNameValid ||
                !isLastNameValid ||
                !isEmailValid ||
                !isPhoneValid
              }
              value={t("contacts.update")}
              onClick={this.updateContact}
            />
          )}
        </div>
      </form>
    );
  }
}

export default withTranslation()(AddContactForm);
