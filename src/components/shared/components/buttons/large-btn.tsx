import React from "react";
import "./large-btn.css";

interface LargeButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  imgPath?: string;
  value: string;
}

class LargeButton extends React.Component<LargeButtonProps> {
  render() {
    const { type, disabled, imgPath, value } = this.props;

    return (
      <button className="large-btn" type={type} disabled={disabled}>
        <p>{value}</p>
        {imgPath && (
          <img
            src={`./../../../../assets/img/btns/${imgPath}.svg`}
            alt={imgPath}
            className="large-btn-icon"
          />
        )}
      </button>
    );
  }
}

export default LargeButton;
