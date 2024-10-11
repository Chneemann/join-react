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

  handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const dialog = document.querySelector(".task-details-dialog");
    if (dialog && !dialog.contains(event.target as Node)) {
      this.props.onClose();
    }
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
        </div>
      </div>
    );
  }
}

export default TaskDetails;
