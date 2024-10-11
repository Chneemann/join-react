import React from "react";
import "./small-btn.css";
import { Link } from "react-router-dom";

interface SmallBtnProps {
  image: string;
  to?: string;
  onClick?: () => void;
}

export default class SmallBtn extends React.Component<SmallBtnProps> {
  render() {
    const { image, to, onClick } = this.props;

    return to ? (
      <Link to={to}>
        <div className="small-btn" onClick={onClick}>
          <img src={"./../../assets/img/btns/" + image} alt="" />
        </div>
      </Link>
    ) : (
      <div className="small-btn" onClick={onClick}>
        <img src={"./../../assets/img/btns/" + image} alt="" />
      </div>
    );
  }
}
