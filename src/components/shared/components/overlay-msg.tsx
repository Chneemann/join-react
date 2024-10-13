import React from "react";
import "./overlay-msg.css";

interface OverlayMsgProps {
  msg: string;
}

interface OverlayMsgState {
  msg: string;
}

class OverlayMsg extends React.Component<OverlayMsgProps, OverlayMsgState> {
  constructor(props: OverlayMsgProps) {
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

export default OverlayMsg;
