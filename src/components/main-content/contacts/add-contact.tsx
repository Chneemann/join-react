import React, { Component } from "react";
import "./add-contact.css";
import { withTranslation, WithTranslation } from "react-i18next";
import SmallBtn from "../../shared/components/buttons/small-btn";
import AddContactForm from "./add-contact-form";

interface AddContactProps extends WithTranslation {
  closeDialog: () => void;
}

class AddContact extends Component<AddContactProps> {
  render() {
    const { t, closeDialog } = this.props;

    return (
      <div className="add-contact" onClick={closeDialog}>
        <div
          className="add-contact-dialog"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="add-contact-header">
            <img src="../../../../assets/img/logo-small-white.svg" alt="Logo" />
            <p>Add Contact</p>
            <SmallBtn image="clear.svg" onClick={closeDialog}></SmallBtn>
          </div>

          <div className="add-contact-content">
            <div className="add-contact-badge">
              <div className="add-contact-color-picker">
                <input type="color" />
                <div className="add-contact-initials"></div>
              </div>
            </div>

            <div className="add-contact-form">
              <AddContactForm closeDialog={closeDialog} />
            </div>
          </div>

          <div className="add-contact-notice">
            Notice: Click in the circle to change the colour.
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(AddContact);
