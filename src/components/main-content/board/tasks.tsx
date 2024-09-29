import React, { Component } from "react";
import { Task } from "../../../interfaces/task.interface";

interface Props {
  status: string;
}

interface State {
  tasks: Task[];
}

class Tasks extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  getTaskStatus = (status: string) => {
    return this.state.tasks.filter((task) => task.status === status);
  };

  render() {
    const { status } = this.props;
    const tasksWithStatus = this.getTaskStatus(status);

    return (
      <div id={status} className="details">
        {tasksWithStatus.length > 0 ? (
          tasksWithStatus.map((task) => <div key={task.id}>{task.title}</div>)
        ) : (
          <div>No Tasks</div>
        )}
      </div>
    );
  }
}

export default Tasks;
