import React from "react";
import "./header.css";
import SmallBtn from "../shared/buttons/small-btn/small-btn";

interface HeaderProps {}

interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
  state = {};

  render() {
    return (
      <header>
        <img className="logo" src="assets/img/logo_small_white.svg" alt="" />
        <div className="right-side">
          <SmallBtn image="help.svg"></SmallBtn>
        </div>
      </header>
    );
  }
}

export default Header;
