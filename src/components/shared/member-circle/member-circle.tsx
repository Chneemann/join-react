import React from "react";
import "./member-circle.css";

interface MemberCircleProps {
  memberInitials: string;
}

interface MemberCircleState {}

class MemberCircle extends React.Component<
  MemberCircleProps,
  MemberCircleState
> {
  state = {};
  render() {
    return (
      <div className="member-circle">
        <div className="inner-border"></div>
        <p>{this.props.memberInitials}</p>
      </div>
    );
  }
}

export default MemberCircle;
