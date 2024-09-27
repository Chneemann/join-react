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
            <img src="./../../assets/img/navbar/summary.svg" alt="S" />
            <span>Summary</span>
          </NavLink>
          <NavLink
            to="/add-task"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <img src="./../../assets/img/navbar/add-task.svg" alt="T" />
            <span>Add Task</span>
          </NavLink>
          <NavLink
            to="/board"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <img src="./../../assets/img/navbar/board.svg" alt="B" />
            <span>Board</span>
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <img src="./../../assets/img/navbar/contacts.svg" alt="C" />
            <span>Contacts</span>
          </NavLink>
        </nav>
        <div className="navbar-footer">
          <div className="navbar-footer-item">
            <div className="footer-text">Privacy Policy</div>
            <div className="footer-icon">
              <img
                src="./../../assets/img/navbar/privacy-policy.svg"
                alt="privacy policy"
              />
            </div>
          </div>
          <div className="navbar-footer-item">
            <div className="footer-text">Legal Notice</div>
            <div className="footer-icon">
              <img
                src="./../../assets/img/navbar/legal-notice.svg"
                alt="privacy policy"
              />
            </div>
          </div>
          <div className="navbar-footer-item">
            {" "}
            <div className="footer-text">Log Out</div>
            <div className="footer-icon">
              <img
                src="./../../assets/img/navbar/log-out.svg"
                alt="privacy policy"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
