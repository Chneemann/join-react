import React, { Component, createRef } from "react";
import "./contact-detail.css";
import { User } from "../../../interfaces/user.interface";
import { withTranslation, WithTranslation } from "react-i18next";

interface ContactDetailsProps extends WithTranslation {
  users: User[];
  currentUser: User;
  selectedUserId: string | null;
  closeUserDetails: () => void;
  editContact: (userId: string) => void;
  deleteContact: (userId: string) => void;
}

interface ContactDetailsState {
  mediaNav: boolean;
}

class ContactDetails extends Component<
  ContactDetailsProps,
  ContactDetailsState
> {
  mediaNavRef = createRef<HTMLDivElement>();
  mediaNavButtonRef = createRef<HTMLDivElement>();

  constructor(props: ContactDetailsProps) {
    super(props);
    this.state = {
      mediaNav: false,
    };
  }

  /**
   * Initializes the component by setting up the resize event listener
   */
  componentDidMount() {
    document.addEventListener("mousedown", this.handleToggleMediaNav);
  }

  /**
   * Cleans up the event listeners when the component is unmounted.
   */
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleToggleMediaNav);
  }

  // Handle open and close media nav
  handleToggleMediaNav = (event: MouseEvent) => {
    const { mediaNavRef, mediaNavButtonRef } = this;
    const clickedOutsideNav =
      mediaNavRef.current &&
      !mediaNavRef.current.contains(event.target as Node);
    const clickedOnButton =
      mediaNavButtonRef.current &&
      mediaNavButtonRef.current.contains(event.target as Node);

    if (clickedOnButton) {
      this.setState((prevState) => ({ mediaNav: !prevState.mediaNav }));
    } else if (clickedOutsideNav) {
      this.setState({ mediaNav: false });
    }
  };

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
      t,
      currentUser,
      selectedUserId,
      closeUserDetails,
      editContact,
      deleteContact,
    } = this.props;
    const { mediaNav } = this.state;

    return (
      <div className="contact-details">
        <div className="contact-details-header">
          <div className="contact-details-headline">
            <div className="contact-details-title">{t("contacts.title")}</div>
            <div className="contact-details-blue-bar"></div>
            <div className="contact-details-metrics-txt">
              {t("contacts.teamSlogan")}
            </div>
          </div>
          {selectedUserId && (
            <div
              className="contact-details-return-button"
              onClick={closeUserDetails}
            >
              <img
                src="./../../../../assets/img/arrow-left.svg"
                alt={t("contacts.back")}
              />
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
                  {user.id === currentUser.id && `(${t("contacts.you")})`}
                  {(user.uId === "" || user.id === currentUser.id) && (
                    <div className="contact-details-edit-options">
                      <div
                        className="contact-details-button"
                        onClick={() => editContact(user.id!)}
                      >
                        <img
                          src="./../../../../assets/img/contact/edit.svg"
                          alt={t("contacts.edit")}
                        />
                        <p>{t("contacts.edit")}</p>
                      </div>
                      {user.id !== currentUser.id && (
                        <div
                          className="contact-details-button"
                          onClick={() => deleteContact(user.id!)}
                        >
                          <img
                            src="./../../../../assets/img/contact/delete.svg"
                            alt={t("contacts.delete")}
                          />
                          <p>{t("contacts.delete")}</p>
                        </div>
                      )}
                    </div>
                  )}
                  <div
                    className="contact-details-button-mobile"
                    ref={this.mediaNavButtonRef}
                  >
                    <img
                      src="./../../../assets/img/contact/points.svg"
                      alt={t("contacts.menu")}
                    />
                  </div>
                </div>
              </div>

              {mediaNav && (
                <nav className="contacts-nav" ref={this.mediaNavRef}>
                  <div className="contacts-nav-link">
                    <span
                      onClick={() => {
                        editContact(selectedUserId);
                        this.setState({ mediaNav: false });
                      }}
                    >
                      {t("contacts.edit")}
                    </span>
                  </div>
                  <div className="contacts-nav-link">
                    <span
                      onClick={() => {
                        deleteContact(selectedUserId);
                        this.setState({ mediaNav: false });
                      }}
                    >
                      {t("contacts.delete")}
                    </span>
                  </div>
                </nav>
              )}

              <div className="contact-details-contact word-wrap">
                <div className="contact-details-contact-title">
                  {t("contacts.contactInformation")}
                </div>
                <div className="contact-details-info">
                  <p>{t("contacts.email")}</p>
                  <a href={`mailto:${user.email}`}>{user.email}</a>

                  <p>{t("contacts.phone")}</p>
                  {user.phone === "" ? (
                    <span>{t("contacts.noPhone")}</span>
                  ) : (
                    <a href={`tel:${user.phone}`}>{user.phone}</a>
                  )}

                  {user.id !== "" && (
                    <>
                      <p>{t("contacts.lastOnline")}</p>
                      {user.status ? (
                        <span>{t("contacts.online")}</span>
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

export default withTranslation()(ContactDetails);
