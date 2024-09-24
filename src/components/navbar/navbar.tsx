import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

interface NavbarProps {}

interface NavbarState {}

class Navbar extends React.Component<NavbarProps, NavbarState> {
  state = {};
  render() {
    return (
      <div className="navbar">
        <nav>
          <NavLink
            to="/summary"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <img src="./../../assets/img/summary.svg" alt="S" />
            <span>Summary</span>
          </NavLink>
          <NavLink
            to="/add-task"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <img src="./../../assets/img/add-task.svg" alt="T" />
            <span>Add Task</span>
          </NavLink>
          <NavLink
            to="/board"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <img src="./../../assets/img/board.svg" alt="B" />
            <span>Board</span>
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <img src="./../../assets/img/contacts.svg" alt="C" />
            <span>Contacts</span>
          </NavLink>
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
