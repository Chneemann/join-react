import React, { Component } from "react";
import "./contacts.css";
import { User } from "../../../interfaces/user.interface";
import ContactDetails from "./contact-detail";

interface ContactsProps {
  users: User[];
  currentUser: User;
}

interface ContactsState {
  showContactList: boolean;
  selectedUserId: string | null;
}

class Contacts extends Component<ContactsProps, ContactsState> {
  constructor(props: ContactsProps) {
    super(props);
    this.state = {
      showContactList: true,
      selectedUserId: null,
    };
  }

  openNewContactDialog = () => {
    console.log("Opening new contact dialog...");
  };

  showUserId = (userId: string) => {
    this.setState({ selectedUserId: userId });
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

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  // Logic for resizing the contact list
  handleResize = () => {
    if (window.innerWidth <= 1050) {
      this.setState({ showContactList: false });
    } else {
      this.setState({ showContactList: true });
    }
  };

  // ContactDetails component
  // Logic for closing the user details area
  handleCloseUserDetails = () => {
    this.setState({ selectedUserId: null });
  };

  // Logic for opening the edit dialog
  handleOpenEditDialog = () => {
    // TODO
  };

  // Logic for deleting a contact
  handleDeleteContact = () => {
    // TODO
  };

  // Logic for toggling the navigation on mobile devices
  handleToggleNav = () => {
    // TODO
  };

  render() {
    const { showContactList, selectedUserId } = this.state;
    const { users, currentUser } = this.props;

    return (
      <div className="contacts">
        <div
          className={`contacts-contact-list ${
            !showContactList && selectedUserId
              ? "d-none"
              : !showContactList
              ? "max-width"
              : ""
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
                      selectedUserId === user.id
                        ? "contacts-contact-active"
                        : ""
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
        <div
          className={`contacts-contact-detail ${
            !showContactList && !selectedUserId ? "d-none" : ""
          }`}
        >
          <ContactDetails
            users={users}
            currentUser={currentUser}
            selectedUserId={selectedUserId}
            closeUserDetails={this.handleCloseUserDetails}
            openEditDialog={this.handleOpenEditDialog}
            deleteContact={this.handleDeleteContact}
            toggleNav={this.handleToggleNav}
          />
        </div>
      </div>
    );
  }
}

export default Contacts;
