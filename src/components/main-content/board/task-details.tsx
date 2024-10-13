import React, { Component } from "react";
import "./task-details.css";
import { Task } from "../../../interfaces/task.interface";
import { User } from "../../../interfaces/user.interface";
import { deleteTask } from "../../../services/firebase.service";
import SmallBtn from "../../shared/components/buttons/small-btn";

interface TaskDetailsProps {
  task: Task | null;
  users: User[];
  currentUser: User;
  onClose: () => void;
  showOverlayMsg: (
    message: string,
    timeout: number,
    action: { reload?: boolean; href?: string }
  ) => void;
}

interface TaskDetailsState {}

class TaskDetails extends Component<TaskDetailsProps, TaskDetailsState> {
  constructor(props: TaskDetailsProps) {
    super(props);
  }

  // Close the dialog if the user clicks outside of it
  handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const dialog = document.querySelector(".task-details-dialog");
    if (dialog && !dialog.contains(event.target as Node)) {
      this.props.onClose();
    }
  };

  // Capitalize the first letter of a string
  capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Convert a date string to a formatted time
  timeConverter = (dateString: string): string => {
    const dateObj = new Date(dateString);

    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Handle the deletion of a task
  handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      this.props.showOverlayMsg("Task added successfully", 1500, {
        reload: true,
      });
    } catch (error) {
      this.props.showOverlayMsg("Error deleting task", 1500, {
        reload: true,
      });
      console.error("Error deleting task:", error);
    }
  };

  render() {
    const { task, users, currentUser, onClose } = this.props;

    if (!task) return null;

    const creatorDetails = users.find((user) => user.id === task.creator);
    const isTaskCreator = task.creator === currentUser.id;

    return (
      <div className="task-details" onClick={this.handleClickOutside}>
        <div className="task-details-dialog">
          <div className="task-details-header">
            <div
              className="task-details-category"
              style={{
                backgroundColor:
                  task.category === "User Story" ? "#0038ff" : "#20d7c2",
              }}
            >
              {task.category}
            </div>
            <SmallBtn image="close.svg" onClick={onClose} />
          </div>
          <div className="task-details-content">
            <div className="task-details-headline">{task.title}</div>
            <div className="task-details-description">{task.description}</div>
            <div className="task-details-date">
              <p>Date:</p>
              {this.timeConverter(task.date)}
            </div>
            <div className="task-details-priority">
              <p>Priority:</p>
              {this.capitalizeFirstLetter(task.priority)}
              <div
                className={`task-details-priority-bg task-details-priority-${task.priority}`}
              ></div>
            </div>

            {creatorDetails && (
              <div className="task-details-creator">
                <p>Creator:</p>
                <div className="task-details-users">
                  <div
                    className="task-details-circle"
                    style={{ backgroundColor: creatorDetails.color }}
                  >
                    <div className="task-details-initials">
                      {creatorDetails.initials}
                    </div>
                  </div>
                  <div className="task-details-details">
                    <p>
                      {creatorDetails.firstName} {creatorDetails.lastName}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="task-details-assigned">
              <p>Assigned to:</p>
              {task.assigned.map((userId: string) => {
                const userDetails = users.find((user) => user.id === userId);
                if (!userDetails) return null;
                return (
                  <div className="task-details-users" key={userId}>
                    <div
                      className="task-details-circle"
                      style={{ backgroundColor: userDetails.color }}
                    >
                      <div className="task-details-initials">
                        {userDetails.initials}
                      </div>
                    </div>
                    <div className="task-details-details">
                      <p>
                        {userDetails.firstName} {userDetails.lastName}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {isTaskCreator && task.id ? (
            <div className="task-details-btns">
              <div
                className="task-details-btn task-details-btn-delete"
                onClick={() => {
                  if (task?.id) {
                    this.handleDeleteTask(task.id);
                  }
                }}
              >
                <img
                  src="./../../../../../assets/img/contact/delete.svg"
                  alt="delete"
                />
                <p>Delete Task</p>
              </div>
              <span>|</span>
              <div className="task-details-btn task-details-btn-edit">
                <img
                  src="./../../../../../assets/img/contact/edit.svg"
                  alt="edit"
                />
                <p>Edit Task</p>
              </div>
            </div>
          ) : (
            <div className="task-details-notice">
              <p>Notice: Only the creator can edit or delete the task.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TaskDetails;