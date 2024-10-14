import React, { Component } from "react";
import "./contacts.css";
import { User } from "../../interfaces/user.interface";

interface ContactsProps {
  users: User[];
  currentUser: User;
}

interface ContactsState {
  showAllUsers: boolean;
  selectedUser: string | undefined;
}

class Contacts extends Component<ContactsProps, ContactsState> {
  constructor(props: ContactsProps) {
    super(props);
    this.state = {
      showAllUsers: true,
      selectedUser: undefined,
    };
  }

  openNewContactDialog = () => {
    console.log("Opening new contact dialog...");
  };

  showUserId = (userId: string) => {
    this.setState({ selectedUser: userId });
  };

  closeContactEmitter = () => {
    this.setState({ selectedUser: undefined });
  };

  sortFirstLetter = (): string[] => {
    const letters = new Set(
      this.props.users.map((user) => user.firstName.charAt(0).toUpperCase())
    );
    return Array.from(letters).sort();
  };

  sortUsersByFirstLetter = (letter: string): User[] => {
    return this.props.users.filter((user) => user.firstName.startsWith(letter));
  };

  render() {
    const { showAllUsers, selectedUser } = this.state;
    const { users, currentUser } = this.props;

    return (
      <div className="contacts">
        <div
          className={`contacts-contact-list ${
            !showAllUsers && currentUser.id ? "d-none" : ""
          }`}
        >
          <button
            className="contacts-btn"
            type="button"
            onClick={this.openNewContactDialog}
          >
            <div className="contacts-btn-inside">
              <span>New Contact</span>
              <img src="./../../../assets/img/contact/add.svg" alt="add" />
            </div>
            <div className="contacts-btn-inside-mobile">
              <img src="./../../../assets/img/contact/add.svg" alt="add" />
            </div>
          </button>
          <div className="contacts-content">
            {this.sortFirstLetter().map((sortLetter) => (
              <React.Fragment key={sortLetter}>
                <div className="contacts-first-letter">{sortLetter}</div>
                <div className="contacts-line"></div>
                {this.sortUsersByFirstLetter(sortLetter).map((user) => (
                  <div
                    key={user.id}
                    className={`contacts-contact ${
                      selectedUser === user.id ? "contacts-contact-active" : ""
                    }`}
                    onClick={() => user.id && this.showUserId(user.id)}
                  >
                    <div
                      className="contacts-circle"
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
                      <div className="contacts-initials">{user.initials}</div>
                    </div>
                    <div className="contacts-name">
                      <div className="contacts-first-name">
                        <p>{user.firstName}</p>
                        <p className="contacts-last-name">
                          {user.lastName ? `,\u00A0${user.lastName}` : null}
                        </p>
                        {user.id === currentUser.id && <p>&nbsp;(You)</p>}
                      </div>
                      <div className="contacts-email">{user.email}</div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="contacts-contact-detail">
          {selectedUser ? "Contact Details " : null}
        </div>
      </div>
    );
  }
}

export default Contacts;
