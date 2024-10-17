import React, { Component } from "react";
import "./contact-detail.css";
import { User } from "../../../interfaces/user.interface";

interface ContactDetailsProps {
  users: User[];
  currentUser: User;
  selectedUserId: string | null;
  closeUserDetails: () => void;
  openEditDialog: () => void;
  deleteContact: () => void;
  toggleNav: () => void;
}

class ContactDetails extends Component<ContactDetailsProps> {
  // Check if user exists
  checkUserData = (userId: string) => {
    const { users } = this.props;
    return users.filter((user) => user.id === userId);
  };

  // Convert timestamp
  convertTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  render() {
    const {
      currentUser,
      selectedUserId,
      closeUserDetails,
      openEditDialog,
      deleteContact,
      toggleNav,
    } = this.props;

    return (
      <div className="contact-details">
        <div className="contact-details-header">
          <div className="contact-details-headline">
            <div className="contact-details-title">Contacts</div>
            <div className="contact-details-blue-bar"></div>
            <div className="contact-details-metrics-txt">
              Better with a team
            </div>
          </div>
          {selectedUserId && (
            <div
              className="contact-details-return-button"
              onClick={closeUserDetails}
            >
              <img src="./../../../../assets/img/arrow-left.svg" alt="back" />
            </div>
          )}
        </div>

        {selectedUserId &&
          this.checkUserData(selectedUserId).map((user) => (
            <div
              key={user.id}
              className={`contact-details-content ${
                selectedUserId ? "contact-details-animation-coming-in" : ""
              }`}
            >
              <div className="contact-details-user-content">
                <div
                  className="contact-details-circle"
                  style={{ backgroundColor: user.color }}
                >
                  <img
                    src={
                      user.status
                        ? "./../../../assets/img/contact/online.svg"
                        : "./../../../assets/img/contact/offline.svg"
                    }
                    alt=""
                  />
                  <div className="contact-details-initials">
                    {user.initials}
                  </div>
                </div>
                <div className="contact-details-name word-wrap">
                  {user.firstName} {user.lastName}{" "}
                  {user.id === currentUser.id && "(You)"}
                  {(user.uId === "" || user.id === currentUser.id) && (
                    <div className="contact-details-edit-options">
                      <div className="contact-details-button">
                        <img
                          src="./../../../../assets/img/contact/edit.svg"
                          alt="edit"
                        />
                        <p onClick={openEditDialog}>Edit</p>
                      </div>
                      {user.id !== currentUser.id && (
                        <div className="contact-details-button">
                          <img
                            src="./../../../../assets/img/contact/delete.svg"
                            alt="delete"
                          />
                          <p onClick={deleteContact}>Delete</p>
                        </div>
                      )}
                    </div>
                  )}
                  <div
                    className="contact-details-button-mobile"
                    onClick={toggleNav}
                  >
                    <img
                      src="./../../../assets/img/contact/points.svg"
                      alt="menu"
                    />
                  </div>
                </div>
              </div>

              <div className="contact-details-contact word-wrap">
                <div className="contact-details-contact-title">
                  Contact Information
                </div>
                <div className="contact-details-info">
                  <p>Email:</p>
                  <a href={`mailto:${user.email}`}>{user.email}</a>

                  <p>Phone:</p>
                  {user.phone === "" ? (
                    <span>No phone available</span>
                  ) : (
                    <a href={`tel:${user.phone}`}>{user.phone}</a>
                  )}

                  {user.id !== "" && (
                    <>
                      <p>Last Online:</p>
                      {user.status ? (
                        <span>Online</span>
                      ) : (
                        <span>{this.convertTimestamp(user.lastLogin)}</span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default ContactDetails;
