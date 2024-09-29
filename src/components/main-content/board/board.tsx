import React, { Component } from "react";
import "./board.css";
import { Task } from "../../../interfaces/task.interface";
import Tasks from "./tasks";

interface State {
  searchValue: string;
  tasks: Task[];
}

class Board extends Component<{}, State> {
  searchInput: HTMLInputElement | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      searchValue: "",
      tasks: [],
    };
  }

  clearInput = () => {
    this.setState({ searchValue: "" });
  };

  render() {
    const { searchValue } = this.state;

    const statusDisplayNames: { [key: string]: string } = {
      todo: "To-do",
      inprogress: "In Progress",
      awaitfeedback: "Await Feedback",
      done: "Done",
    };

    return (
      <div className="board">
        <div className="header">
          <div className="title">{"Board"}</div>
          <div className="search">
            <div className="search-inner">
              <input
                ref={(input) => (this.searchInput = input)}
                id="search-task"
                type="text"
                placeholder="Find Task"
                value={searchValue}
                onChange={(e) => this.setState({ searchValue: e.target.value })}
              />
              <span>
                {searchValue ? (
                  <img
                    src="./../../../assets/img/board/clear.svg"
                    className="icon-clear"
                    alt="clear"
                    onClick={this.clearInput}
                  />
                ) : (
                  <img
                    src="./../../../assets/img/board/search.svg"
                    className="icon-search"
                    alt="search"
                  />
                )}
              </span>
              <span className="line"></span>
            </div>
            <button className="btn" type="submit">
              <div className="btn-inside">
                <span>Add Task</span>
                <img
                  src="./../../../assets/img/board/add_white.svg"
                  alt="check"
                />
              </div>
            </button>
          </div>
        </div>
        <div className="content">
          <div className="status">
            {["todo", "inprogress", "awaitfeedback", "done"].map((status) => (
              <div key={status} className="column">
                <div className="headline">
                  <span>{statusDisplayNames[status]}</span>
                  <img src="./../../../assets/img/board/plus.svg" alt="add" />
                </div>
                <Tasks status={status}></Tasks>
              </div>
            ))}
          </div>
          <div id="content-tasks"></div>
        </div>
      </div>
    );
  }
}

export default Board;
