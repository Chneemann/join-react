import React from "react";
import "./large-btn.css";

interface LargeButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  imgPath?: string;
  imgPosition?: "left" | "right";
  isWhite?: boolean;
  value: string;
  onClick?: () => void;
}

class LargeButton extends React.Component<LargeButtonProps> {
  render() {
    const { type, disabled, imgPath, imgPosition, isWhite, value, onClick } =
      this.props;

    const buttonClass = `large-btn ${isWhite ? "white" : ""}`;

    return (
      <button
        className={buttonClass}
        type={type}
        disabled={disabled}
        onClick={onClick}
        style={{ display: "flex", alignItems: "center" }}
      >
        {imgPath && (
          <img
            src={`./../../../../assets/img/btns/${imgPath}.svg`}
            alt={imgPath || "button icon"}
            className={`large-btn-icon ${
              isWhite && imgPath !== "google" ? "white" : ""
            }`}
            style={{ order: imgPosition === "left" ? -1 : 1 }}
          />
        )}
        <p>{value}</p>
      </button>
    );
  }
}

export default LargeButton;
