import React from "react";
import "./member-circle.css";

interface MemberCircleProps {
  memberInitials: string;
  onClick?: () => void;
}

interface MemberCircleState {}

class MemberCircle extends React.Component<
  MemberCircleProps,
  MemberCircleState
> {
  state = {};
  render() {
    const { onClick } = this.props;

    return (
      <div className="member-circle" onClick={onClick}>
        <div className="inner-border"></div>
        <p>{this.props.memberInitials}</p>
      </div>
    );
  }
}

export default MemberCircle;
