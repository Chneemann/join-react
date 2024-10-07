import React from "react";
import "./large-btn.css";

interface LargeButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  imgPath?: string;
  isWhite?: boolean;
  value: string;
  onClick?: () => void;
}

class LargeButton extends React.Component<LargeButtonProps> {
  render() {
    const { type, disabled, imgPath, isWhite, value, onClick } = this.props;

    const buttonClass = `large-btn ${isWhite ? "white" : ""}`;

    return (
      <button
        className={buttonClass}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        <p>{value}</p>
        {imgPath && (
          <img
            src={`./../../../../assets/img/btns/${imgPath}.svg`}
            alt={imgPath}
            className={`large-btn-icon ${isWhite ? "white" : ""}`}
          />
        )}
      </button>
    );
  }
}

export default LargeButton;
