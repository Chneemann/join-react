import React from "react";
import "./summary.css";

interface SummaryProps {}

interface SummaryState {}

class Summary extends React.Component<SummaryProps, SummaryState> {
  state = {};
  render() {
    return (
      <div className="summary">
        <div className="headline">
          Good morning, <span>Guest</span>
        </div>
        <div className="content">
          <div className="content-container-upper">
            <div className="urgent-tasks"></div>
            <div className="task-in-board"></div>
          </div>
          <div className="content-container-lower">
            <div className="task-todo"></div>
            <div className="task-container"></div>
            <div className="task-container"></div>
            <div className="task-done"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
