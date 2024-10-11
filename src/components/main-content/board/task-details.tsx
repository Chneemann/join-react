import React from "react";
import "./task-details.css";
import { Task } from "../../../interfaces/task.interface";

interface TaskDetailsProps {
  task: Task | null;
  onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onClose }) => {
  if (!task) return null;

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const dialog = document.querySelector(".task-details-dialog");
    if (dialog && !dialog.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div className="task-details" onClick={handleClickOutside}>
      <div className="task-details-dialog">
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>Assigned to: {task.assigned.join(", ")}</p>
        <p>Due Date: {task.date}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskDetails;
