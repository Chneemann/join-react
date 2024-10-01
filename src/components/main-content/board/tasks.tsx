import React, { Component, MouseEvent } from "react";
import { Task } from "../../../interfaces/task.interface";
import { User } from "../../../interfaces/user.interface";
import "./tasks.css";

interface TasksProps {
  status: string;
  tasks: Task[];
  users: User[];
}

interface TasksState {
  dialogId: string;
  dialogX: number;
  dialogY: number;
}

class Tasks extends Component<TasksProps, TasksState> {
  constructor(props: TasksProps) {
    super(props);
    this.state = {
      dialogId: "",
      dialogX: 0,
      dialogY: 0,
    };
  }

  categoryColors = new Map<string, string>([
    ["User Story", "#0038ff"],
    ["Technical Task", "#20d7c2"],
  ]);

  handleMenuButtonClick = (
    event: MouseEvent<HTMLDivElement>,
    taskId: string
  ) => {
    console.log("Button clicked for task:", taskId);
  };

  handleDialogMouseMove = (
    userId: string,
    event: MouseEvent<HTMLSpanElement>
  ) => {
    this.setState({
      dialogId: userId,
      dialogX: event.clientX + 25,
      dialogY: event.clientY + 10,
    });
  };

  handleDialogMouseLeave = () => {
    this.setState({ dialogId: "" });
  };

  /**
   * Return the color of a user with the given id.
   * @param id The id of the user to find
   * @returns The color of the user or an empty string
   */
  userBadgedColor(id: string): string {
    const user = this.props.users.find((user) => user.id === id);
    return user ? user.color : "";
  }

  /**
   * Returns the initials of the user with the given id.
   * @param id The id of the user to find
   * @returns User initials or an empty string
   */
  userBadged(id: string): string {
    const user = this.props.users.find((user) => user.id === id);
    if (!user) return "";
    return user.firstName === "Guest"
      ? user.firstName.charAt(0)
      : user.firstName.charAt(0) + user.lastName.charAt(0);
  }

  /**
   * Finds the user details by user ID
   * @param id The user ID
   * @returns The User object or undefined if not found
   */
  getUserById(id: string): User | undefined {
    return this.props.users.find((user) => user.id === id);
  }

  completedSubtasks(task: Task): number {
    return task.subtasksDone.filter((subtask) => subtask).length;
  }

  completedSubtasksPercent(task: Task): number {
    const { subtasksDone } = task;
    return (this.completedSubtasks(task) / subtasksDone.length) * 100;
  }

  render() {
    const { status, tasks } = this.props;
    const { dialogId, dialogX, dialogY } = this.state;
    const isPageViewMedia = true;

    // Hole den Benutzer für den Dialog
    const user = this.getUserById(dialogId);

    return (
      <div id={status} className="tasks">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="task">
              <div className="task-header">
                <div
                  className="task-category"
                  style={{
                    backgroundColor:
                      this.categoryColors.get(task.category) || "#ccc",
                  }}
                >
                  {task.category}
                </div>
                {isPageViewMedia && (
                  <div
                    className="menu-btn"
                    onClick={(event) =>
                      task.id && this.handleMenuButtonClick(event, task.id)
                    }
                  >
                    <img
                      className="menu-img"
                      src="./../../../../assets/img/board/menu.svg"
                      alt="menu"
                    />
                  </div>
                )}
              </div>
              <div className="task-headline">{task.title}</div>
              <div className="task-description">{task.description}</div>
              {task.subtasksTitle.length > 0 && (
                <div className="task-subtask">
                  <div className="task-subtask-line">
                    <span
                      className="task-subtask-line-filler"
                      style={{
                        width: `${this.completedSubtasksPercent(task)}%`,
                      }}
                    ></span>
                  </div>
                  <div className="task-subtask-text">
                    {this.completedSubtasks(task)} / {task.subtasksTitle.length}
                    &nbsp;Subtasks
                  </div>
                </div>
              )}
              <div className="footer">
                <div className="footer-badge">
                  {/* Creator Badge */}
                  <span
                    className="footer-badged"
                    onMouseMove={(e) =>
                      this.handleDialogMouseMove(task.creator, e)
                    }
                    onMouseLeave={this.handleDialogMouseLeave}
                    style={{
                      backgroundColor: this.userBadgedColor(task.creator),
                    }}
                  >
                    {this.userBadged(task.creator)}
                  </span>
                  {task.assigned.map((assigned, index) => (
                    <span
                      key={index}
                      className="footer-badged"
                      onMouseMove={(e) =>
                        this.handleDialogMouseMove(assigned, e)
                      }
                      onMouseLeave={this.handleDialogMouseLeave}
                      style={{
                        backgroundColor: this.userBadgedColor(assigned),
                      }}
                    >
                      {this.userBadged(assigned)}
                    </span>
                  ))}
                </div>
                <div className={`footer-priority prio-${task.priority}`}></div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-tasks">No Tasks</div>
        )}
        {dialogId && user && (
          <div
            className="task-dialog"
            style={{
              left: `${dialogX}px`,
              top: `${dialogY}px`,
              position: "absolute",
            }}
          >
            <p>
              {user.firstName}{" "}
              {"TODO: Transfer currently logged in user from the database"}
              {dialogId === this.props.users[0].id && <span>(du)</span>}
            </p>
            <p>{user.lastName}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Tasks;
