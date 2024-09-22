import React from "react";
import "./header.css";

interface HeaderProps {}

interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
  state = {};
  render() {
    return (
      <header>
        <img className="logo" src="assets/img/logo_small_white.svg" alt="" />
      </header>
    );
  }
}

export default Header;
