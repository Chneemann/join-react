import React, { Component } from "react";
import "./contact-detail.css";
import { User } from "../../../interfaces/user.interface";

interface ContactDetailsProps {
  users: User[];
  currentUser: User;
  selectedUser: string | null;
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
      selectedUser,
      closeUserDetails,
      openEditDialog,
      deleteContact,
      toggleNav,
    } = this.props;

    return (
      <div className="contact-details">
        <div className="header">
          <div className="headline">
            <div className="title">Contacts</div>
            <div className="blue-bar"></div>
            <div className="metrics-txt">Better with a team</div>
          </div>
          {selectedUser && (
            <div className="btn-back" onClick={closeUserDetails}>
              <img src="./../../../../assets/img/arrow-left.svg" alt="back" />
            </div>
          )}
        </div>

        {selectedUser &&
          this.checkUserData(selectedUser).map((user) => (
            <div
              key={user.id}
              className={`contact-details ${
                selectedUser ? "animation-coming-in" : ""
              }`}
            >
              <div className="content">
                <div className="circle" style={{ backgroundColor: user.color }}>
                  <img
                    src={
                      user.status
                        ? "./../../../assets/img/contact/online.svg"
                        : "./../../../assets/img/contact/offline.svg"
                    }
                    alt=""
                  />
                  <div className="initials">{user.initials}</div>
                </div>
                <div className="word-wrap">
                  <div className="name">
                    {user.firstName} {user.lastName}{" "}
                    {user.id === currentUser.id && "(You)"}
                  </div>

                  {(user.uId === "" || user.id === selectedUser) && (
                    <div className="btns">
                      <div className="btn btn-edit">
                        <img
                          src="./../../../../assets/img/contact/edit.svg"
                          alt="edit"
                        />
                        <p onClick={openEditDialog}>Edit</p>
                      </div>
                      {user.id !== currentUser.id && (
                        <div className="btn btn-delete">
                          <img
                            src="./../../../../assets/img/contact/delete.svg"
                            alt="delete"
                          />
                          <p onClick={deleteContact}>Delete</p>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="btn-mobile" onClick={toggleNav}>
                    <img
                      src="./../../../assets/img/contact/points.svg"
                      alt="menu"
                    />
                  </div>
                </div>
              </div>

              <div className="contact word-wrap">
                <div className="headline">Contact Info</div>
                <div className="info">
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
