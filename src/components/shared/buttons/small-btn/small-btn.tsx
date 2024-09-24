import React from "react";
import "./small-btn.css";

interface SmallBtnProps {
  image: string;
  onClick?: () => void;
}

export default class SmallBtn extends React.Component<SmallBtnProps> {
  render() {
    return (
      <div className="small-btn" onClick={this.props.onClick}>
        <img src={"./../../assets/img/" + this.props.image} alt="" />
      </div>
    );
  }
}
