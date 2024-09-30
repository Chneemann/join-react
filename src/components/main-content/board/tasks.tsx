import React, { Component, MouseEvent } from "react";
import { Task } from "../../../interfaces/task.interface";
import "./tasks.css";

interface TasksProps {
  status: string;
  tasks: Task[];
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
