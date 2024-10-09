import React from "react";
import "./overlay.css";

interface OverlayProps {
  msg: string;
}

interface OverlayState {
  msg: string;
}

class Overlay extends React.Component<OverlayProps, OverlayState> {
  constructor(props: OverlayProps) {
    super(props);
    this.state = {
      msg: this.props.msg,
    };
  }
  render() {
    const { msg } = this.state;

    return (
      <div className="overlay">
        <div className="dialog">
          <p>{msg}</p>
        </div>
      </div>
    );
  }
}

export default Overlay;
