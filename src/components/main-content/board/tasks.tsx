import React, { Component, MouseEvent } from "react";
import { Task } from "../../../interfaces/task.interface";
import { User } from "../../../interfaces/user.interface";
import "./tasks.css";

interface TasksProps {
  status: string;
  tasks: Task[];
  users: User[];
}

class Tasks extends Component<TasksProps> {
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

  handleMouseMove = (user: string, event: MouseEvent<HTMLSpanElement>) => {
    console.log("Mouse moved over user:", user, event);
    // Füge hier zusätzliche Logik für Dialog-Handling hinzu
  };

  handleMouseLeave = () => {
    console.log("Mouse left");
    // Füge hier zusätzliche Logik für Dialog-Handling hinzu
  };

  /**
   * Return the color of a user with the given id.
   * @param id The id of the user to find
   * @returns The color of the user or an empty string
   */
  userBadgedColor(id: string): string {
    const userId = String(id);
    const user = this.props.users.find((user) => user.id === userId);
    if (user) {
      return user.color;
    } else {
      return "";
    }
  }

  /**
   * Returns the initials of the user with the given id.
   * @param id The id of the user to find
   * @returns User initials or an empty string
   */
  userBadged(id: string): string {
    const userId = String(id);
    const user = this.props.users.find((user) => user.id === userId);
    if (user) {
      if (user.firstName === "Guest") {
        return user.firstName.charAt(0);
      } else {
        const firstNameLetter = user.firstName.charAt(0);
        const lastNameLetter = user.lastName.charAt(0);
        return firstNameLetter + lastNameLetter;
      }
    } else {
      return "";
    }
  }

  /**
   * Counts the number of subtasks that are completed
   * @param {Task} task The task object
   * @returns {number} The number of completed subtasks
   */
  completedSubtasks(task: Task): number {
    return task.subtasksDone.filter((subtask: boolean) => subtask === true)
      .length;
  }

  /**
   * Calculates the percentage of subtasks that are completed
   * @param {Task} task The task object
   * @returns {number} The percentage of completed subtasks
   */
  completedSubtasksPercent(task: Task): number {
    const subtasks = task.subtasksDone;
    const completedSubtasksCount = subtasks.filter(
      (subtask: boolean) => subtask === true
    ).length;

    return (completedSubtasksCount / subtasks.length) * 100;
  }

  render() {
    const { status, tasks } = this.props;
    const isPageViewMedia = true;

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
                      task.id !== undefined &&
                      this.handleMenuButtonClick(event, task.id)
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
                    onMouseMove={(e) => this.handleMouseMove(task.creator, e)}
                    onMouseLeave={this.handleMouseLeave}
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
                      onMouseMove={(e) => this.handleMouseMove(assigned, e)}
                      onMouseLeave={this.handleMouseLeave}
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
      </div>
    );
  }
}

export default Tasks;
