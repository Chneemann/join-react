import React, { Component } from "react";
import "./assigned.css";
import { User } from "../../../interfaces/user.interface";

interface AssignedProps {
  users: User[];
  assigned: string[];
  onAssignedChange: (assigned: string[]) => void;
}

interface AssignedState {
  searchQuery: string;
  isListVisible: boolean;
}

class Assigned extends Component<AssignedProps, AssignedState> {
  constructor(props: AssignedProps) {
    super(props);
    this.state = {
      searchQuery: "",
      isListVisible: false,
    };
  }

  // Handle adding/removing users from the assigned list
  addAssignedToTask = (userId: string) => {
    const { assigned, onAssignedChange } = this.props;
    if (assigned.includes(userId)) {
      onAssignedChange(assigned.filter((id) => id !== userId));
    } else {
      onAssignedChange([...assigned, userId]);
    }
  };

  // Filter users based on search query
  filteredUsers = () => {
    const { users } = this.props;
    const { searchQuery } = this.state;
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Update search query state
  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  // Handle focus event to show the list
  handleInputFocus = () => {
    this.setState({ isListVisible: true });
  };

  // Handle blur event to hide the list (with a small delay to allow clicking)
  handleInputBlur = () => {
    setTimeout(() => {
      this.setState({ isListVisible: false });
    }, 150);
  };

  render() {
    const { assigned } = this.props;
    const { isListVisible, searchQuery } = this.state;

    return (
      <section className="assigned">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={this.handleSearchChange}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
        />

        {isListVisible && (
          <div className="assigned-list">
            {this.filteredUsers().map((user) => (
              <div
                key={user.id}
                className={`content ${
                  assigned.includes(user.id!) ? "selected" : ""
                }`}
                onClick={() => this.addAssignedToTask(user.id!)}
              >
                <div className="circle" style={{ backgroundColor: user.color }}>
                  <div className="initials">{user.initials}</div>
                </div>
                <div className="details">
                  <div className="name">
                    <p>{user.firstName}</p>
                    <span>,&nbsp;</span>
                    <p className="last-name">{user.lastName}</p>
                  </div>
                </div>
                <div className="checkbox">
                  {assigned.includes(user.id!) ? (
                    <img
                      className="checkbox-img"
                      src="./../../../../assets/img/add-task/checkbox-checked.svg"
                      alt="Checked"
                    />
                  ) : (
                    <img
                      className="checkbox-img"
                      src="./../../../../assets/img/add-task/checkbox-empty.svg"
                      alt="Empty"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Assigned;
