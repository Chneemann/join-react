import React, { Component, createRef } from "react";
import "./contacts.css";
import { User } from "../../../interfaces/user.interface";
import ContactDetails from "./contact-detail";
import { withTranslation, WithTranslation } from "react-i18next";
import AddContact from "./add-contact/add-contact";
import { deleteContact } from "../../../services/firebase.service";
import { ColorUtil } from "../../../services/shared.service";
import { t } from "i18next";

interface ContactsProps extends WithTranslation {
  users: User[];
  currentUser: User;
  onDeleteUser: (userId: string) => void;
  showOverlayMsg: (
    message: string,
    timeout: number,
    action: { reload?: boolean; href?: string }
  ) => void;
}

interface ContactsState {
  showContactList: boolean;
  selectedUserId: string | null;
  addNewContact: boolean;
}

class Contacts extends Component<ContactsProps, ContactsState> {
  mediaNavRef = createRef<HTMLDivElement>();

  constructor(props: ContactsProps) {
    super(props);
    this.state = {
      showContactList: true,
      selectedUserId: null,
      addNewContact: false,
    };
  }

  // Toggle the media nav
  toggleAddNewContact = () => {
    this.setState({ addNewContact: !this.state.addNewContact });
  };

  // Show the selected user
  showUserId = (userId: string) => {
    this.setState({ selectedUserId: userId });
  };

  // Sort the list by first letter
  sortFirstLetter = (): string[] => {
    const letters = new Set(
      this.props.users.map((user) => user.firstName.charAt(0).toUpperCase())
    );
    return Array.from(letters).sort();
  };

  // Sort the users by first letter
  sortUsersByFirstLetter = (letter: string): User[] => {
    return this.props.users.filter((user) => user.firstName.startsWith(letter));
  };

  /**
   * Initializes the component by setting up the resize event listener
   */
  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  /**
   * Cleans up the event listeners when the component is unmounted.
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  // Show or hide the contact list based on the screen size
  handleResize = () => {
    if (window.innerWidth <= 1050) {
      this.setState({ showContactList: false });
    } else {
      this.setState({ showContactList: true });
    }
  };

  // ContactDetails component
  // Closing the user details area
  handleCloseUserDetails = () => {
    this.setState({ selectedUserId: null });
  };

  // Opening the contact (new) dialog
  handleNewContact = () => {
    this.setState({ selectedUserId: null });
    this.toggleAddNewContact();
  };

  // Opening the contact (edit) dialog
  handleEditContact = (userId: string) => {
    this.setState({ selectedUserId: userId });
    this.toggleAddNewContact();
  };

  // Deleting a contact from the database
  handleDeleteContact = (userId: string) => {
    deleteContact(userId)
      .then(() => {
        this.props.showOverlayMsg(t("contact.deleted"), 1500, {
          reload: false,
        });
        this.props.onDeleteUser(userId);
        this.setState({ selectedUserId: null });
      })
      .catch((error) => {
        this.props.showOverlayMsg(t("contact.deleteError"), 1700, {
          reload: false,
        });
      });
  };

  // Get the color of the selected user
  getSelectedUserColor = (): string | undefined => {
    const { users } = this.props;
    const { selectedUserId } = this.state;
    const selectedUser = users.find((user) => user.id === selectedUserId);
    return selectedUser?.color;
  };

  render() {
    const { showContactList, selectedUserId, addNewContact } = this.state;
    const { t, users, currentUser } = this.props;

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
            onClick={this.handleNewContact}
          >
            <div className="contacts-btn-inside">
              <span>{t("contacts.newContact")}</span>
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
                        {user.id === currentUser.id && (
                          <p>&nbsp;({t("contacts.you")})</p>
                        )}
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
            editContact={(userId: string) => this.handleEditContact(userId)}
            deleteContact={(userId: string) => this.handleDeleteContact(userId)}
          />
        </div>

        {addNewContact && (
          <AddContact
            closeDialog={this.toggleAddNewContact}
            selectedUserId={selectedUserId}
            users={users}
            userColor={
              this.getSelectedUserColor() || ColorUtil.generateRandomColor()
            }
            showOverlayMsg={this.props.showOverlayMsg}
          />
        )}
      </div>
    );
  }
}

export default withTranslation()(Contacts);
