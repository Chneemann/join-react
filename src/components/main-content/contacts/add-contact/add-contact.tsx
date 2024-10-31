import React, { Component } from "react";
import "./add-contact.css";
import { withTranslation, WithTranslation } from "react-i18next";
import SmallBtn from "../../../shared/components/buttons/small-btn";
import AddContactForm from "./add-contact-form";

interface AddContactProps extends WithTranslation {
  closeDialog: () => void;
}

interface AddContactState {
  currentColor: string;
}

class AddContact extends Component<AddContactProps, AddContactState> {
  constructor(props: AddContactProps) {
    super(props);
    this.state = {
      currentColor: this.getRandomColor(),
    };
  }

  // Generating a random hex color
  getRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Updating the color
  updateColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = event.target.value;
    this.setState({
      currentColor: selectedColor,
    });
  };

  render() {
    const { t, closeDialog } = this.props;
    const { currentColor } = this.state;

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
                <input
                  type="color"
                  value={currentColor}
                  style={{ background: currentColor }}
                  onChange={this.updateColor}
                />
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
