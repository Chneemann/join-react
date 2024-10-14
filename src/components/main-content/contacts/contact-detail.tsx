import React, { Component } from "react";
import "./contacts.css";
import { User } from "../../../interfaces/user.interface";

interface ContactDetailsProps {
  users: User[];
  selectedUserId: string;
}

interface ContactDetailsState {}

class ContactDetails extends Component<
  ContactDetailsProps,
  ContactDetailsState
> {
  constructor(props: ContactDetailsProps) {
    super(props);
  }

  render() {
    const { users, selectedUserId } = this.props;

    return <div className="contact-details">{selectedUserId}</div>;
  }
}

export default ContactDetails;
