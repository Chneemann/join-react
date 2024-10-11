import React, { Component } from "react";
import "./task-details.css";
import { Task } from "../../../interfaces/task.interface";
import SmallBtn from "../../shared/components/buttons/small-btn";

interface TaskDetailsProps {
  task: Task | null;
  onClose: () => void;
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

  render() {
    const { task, onClose } = this.props;

    if (!task) return null;

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
          <div className="task-details-headline">{task.title}</div>
          <div className="task-details-description">{task.description}</div>
          <div className="task-details-date">
            <p>Date:</p>
            {this.timeConverter(task.date)}
          </div>

          <div className="task-details-priority">
            <p>Priority:</p>
            {this.capitalizeFirstLetter(task.priority)}
            <div className={`priority-bg priority-${task.priority}`}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskDetails;
