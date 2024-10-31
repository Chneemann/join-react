import React, { Component } from "react";
import "./add-contact-form.css";
import LargeButton from "../../../shared/components/buttons/large-btn";

type AddContactFormProps = {
  currentUserId?: string;
  closeDialog: () => void;
  onUserInitialsChange: (initials: string) => void;
};

type AddContactFormState = {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  currentUserId?: string;
  windowWidth: number;
};

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
      },
      windowWidth: window.innerWidth,
    };
  }

  /**
   * Adds an event listener to the window that listens for the "resize" event.
   */
  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions);
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

  // Calculates the initials
  getUserInitials = (firstName: string, lastName: string) => {
    const initialFirst = firstName ? firstName.charAt(0).toUpperCase() : "";
    const initialLast = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${initialFirst}${initialLast}`;
  };

  render() {
    const { closeDialog } = this.props;
    const { formData, currentUserId, windowWidth } = this.state;
    const isFirstNameValid = /^[A-Za-z]+$/.test(formData.firstName);
    const isLastNameValid = /^[A-Za-z]+$/.test(formData.lastName);
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
            placeholder="First Name"
            value={formData.firstName}
            onChange={this.handleInputChange}
            required
          />
          {!isFirstNameValid && formData.firstName && windowWidth <= 800 && (
            <div className="add-contact-form-error-msg">
              <p>
                {!isFirstNameValid
                  ? "Only letters are allowed"
                  : "contactDialogForm.invalidFirstName"}
              </p>
            </div>
          )}

          <input
            id="lastName"
            type="text"
            className="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={this.handleInputChange}
            required
          />
          {!isLastNameValid && formData.lastName && windowWidth <= 800 && (
            <div className="add-contact-form-error-msg">
              <p>
                {!isLastNameValid
                  ? "Only letters are allowed"
                  : "contactDialogForm.invalidLastName"}
              </p>
            </div>
          )}
        </div>
        <div className="add-contact-form-error-msg">
          {(!isFirstNameValid || !isLastNameValid) &&
            (formData.firstName || formData.lastName) &&
            windowWidth >= 800 && (
              <p>
                {!isFirstNameValid && formData.firstName
                  ? "Only letters are allowed in the first name"
                  : !isLastNameValid && formData.lastName
                  ? "Only letters are allowed in the last name"
                  : ""}
              </p>
            )}
        </div>

        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={this.handleInputChange}
          required
        />
        <div className="add-contact-form-error-msg">
          {!isEmailValid && formData.email && (
            <p>This is not a valid email format</p>
          )}
        </div>

        <input
          id="phone"
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={this.handleInputChange}
          required
        />
        <div className="add-contact-form-error-msg">
          {!isPhoneValid && formData.phone && (
            <p>{"contactDialogForm.invalidPhone"}</p>
          )}
        </div>

        <div className="add-contact-buttons">
          <LargeButton
            type="button"
            isWhite={true}
            onClick={closeDialog}
            value="Cancel"
          />
          <LargeButton
            type="submit"
            disabled={
              !isFirstNameValid ||
              !isLastNameValid ||
              !isEmailValid ||
              !isPhoneValid
            }
            value="Save"
          />
        </div>
      </form>
    );
  }
}

export default AddContactForm;
