import React, { Component } from "react";
import "./board.css";
import { Task } from "../../../interfaces/task.interface";
import { User } from "../../../interfaces/user.interface";
import Tasks from "./tasks";

interface BoardProps {
  tasks: Task[];
  users: User[];
}

interface BoardState {
  searchValue: string;
}

class Board extends Component<BoardProps, BoardState> {
  searchInput: HTMLInputElement | null = null;

  constructor(props: BoardProps) {
    super(props);
    this.state = {
      searchValue: "",
    };
  }

  clearInput = () => {
    this.setState({ searchValue: "" });
  };

  render() {
    const { searchValue } = this.state;
    const { tasks, users } = this.props;

    const statusDisplayNames: { [key: string]: string } = {
      todo: "To-do",
      inprogress: "In Progress",
      awaitfeedback: "Await Feedback",
      done: "Done",
    };

    // Filter tasks based on search value
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchValue.toLowerCase())
    );

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
                {/* Pass filtered tasks to Tasks component */}
                <Tasks
                  tasks={filteredTasks.filter((task) => task.status === status)}
                  users={users}
                  status={status}
                ></Tasks>
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
