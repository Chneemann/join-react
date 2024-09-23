import React from "react";
import "./navbar.css";

interface NavbarProps {}

interface NavbarState {}

class Navbar extends React.Component<NavbarProps, NavbarState> {
  state = {};
  render() {
    return (
      <div className="navbar">
        <nav>
          <div className="nav-item">
            <img src="./../../assets/img/summary.svg" alt="Summary" />
            <span>Summary</span>
          </div>
          <div className="nav-item">
            <img src="./../../assets/img/add-task.svg" alt="Add Task" />
            <span>Add Task</span>
          </div>
          <div className="nav-item">
            <img src="./../../assets/img/board.svg" alt="Board" />
            <span>Board</span>
          </div>
          <div className="nav-item">
            <img src="./../../assets/img/contacts.svg" alt="Contacts" />
            <span>Contacts</span>
          </div>
        </nav>
        <div className="navbar-footer">
          <div className="navbar-footer-item">Privacy Policy</div>
          <div className="navbar-footer-item">Legal Notice</div>
          <div className="navbar-footer-item">Log Out</div>
        </div>
      </div>
    );
  }
}

export default Navbar;
