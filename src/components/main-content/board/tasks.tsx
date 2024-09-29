import React, { Component } from "react";
import { Task } from "../../../interfaces/task.interface";
import "./tasks.css";

interface TasksProps {
  status: string;
  tasks: Task[];
}

class Tasks extends Component<TasksProps> {
  render() {
    const { status, tasks } = this.props;

    return (
      <div id={status} className="tasks">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="task">
              {task.title}
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
