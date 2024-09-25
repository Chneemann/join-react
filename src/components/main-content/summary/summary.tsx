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
            <div className="urgent-task">
              <div className="urgent-task-container">
                <div className="urgent-task-info">
                  <div className="urgent-task-icon">
                    <img
                      src="./../assets/img/summary/urgent.svg"
                      alt="Urgent task icon"
                    />
                    <span>1</span>
                  </div>
                  <p>Tasks Urgent</p>
                </div>
                <div className="urgent-task-divider"></div>
                <div className="urgent-task-deadline">
                  <span>October 16, 2022</span>
                  <p>Upcoming Deadline</p>
                </div>
              </div>
            </div>
            <div className="task-in-board">
              <div className="task-in-board-container">
                <div className="task-in-board-info">
                  <div className="task-in-board-icon">
                    <img
                      src="./../assets/img/summary/board.svg"
                      alt="Urgent task icon"
                    />
                    <span>1</span>
                  </div>
                  <p>
                    Tasks in
                    <br />
                    Board
                  </p>
                </div>
              </div>
            </div>
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
