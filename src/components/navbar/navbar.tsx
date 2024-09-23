import React from "react";
import "./navbar.css";

interface NavbarProps {}

interface NavbarState {}

class Navbar extends React.Component<NavbarProps, NavbarState> {
  state = {};
  render() {
    return (
      <div className="navbar">
        <nav></nav>
      </div>
    );
  }
}

export default Navbar;
