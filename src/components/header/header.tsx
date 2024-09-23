import React from "react";
import "./header.css";
import SmallBtn from "../shared/buttons/small-btn/small-btn";
import MemberCircle from "../shared/member-circle/member-circle";

interface HeaderProps {}

interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
  state = {};

  render() {
    return (
      <header>
        <img className="logo" src="assets/img/logo_small_white.svg" alt="" />
        <div className="container-right">
          <p>Kanban Project Management Tool</p>
          <SmallBtn image="help.svg"></SmallBtn>
          <MemberCircle memberInitials="GG"></MemberCircle>
        </div>
      </header>
    );
  }
}

export default Header;
