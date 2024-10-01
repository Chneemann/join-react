import React, { Component, MouseEvent } from "react";
import { Task } from "../../../interfaces/task.interface";
import { User } from "../../../interfaces/user.interface";
import "./tasks.css";
import { useDrag } from "react-dnd";

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

const DraggableTask = ({
  task,
  users,
  handleDialogMouseMove,
  handleDialogMouseLeave,
}: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const userBadgedColor = (id: string): string => {
    const user = users.find((user: User) => user.id === id);
    return user ? user.color : "";
  };

  const userBadged = (id: string): string => {
    const user = users.find((user: User) => user.id === id);
    return user
      ? user.firstName === "Guest"
        ? user.firstName.charAt(0)
        : user.firstName.charAt(0) + user.lastName.charAt(0)
      : "";
  };

  return (
    <div ref={drag} className={`task ${isDragging ? "dragging" : ""}`}>
      <div className="task-header">
        <div
          className="task-category"
          style={{
            backgroundColor:
              task.category === "User Story" ? "#0038ff" : "#20d7c2",
          }}
        >
          {task.category}
        </div>
        <div className="menu-btn" onClick={() => console.log("Menu clicked")}>
          <img
            className="menu-img"
            src="./../../../../assets/img/board/menu.svg"
            alt="menu"
          />
        </div>
      </div>
      <div className="task-headline">{task.title}</div>
      <div className="task-description">{task.description}</div>
      {task.subtasksTitle.length > 0 && (
        <div className="task-subtask">
          <div className="task-subtask-line">
            <span
              className="task-subtask-line-filler"
              style={{
                width: `${
                  (task.subtasksDone.length / task.subtasksTitle.length) * 100
                }%`,
              }}
            ></span>
          </div>
          <div className="task-subtask-text">
            {task.subtasksDone.length} / {task.subtasksTitle.length} Subtasks
          </div>
        </div>
      )}
      <div className="footer">
        <div className="footer-badge">
          <span
            className="footer-badged"
            onMouseMove={(e) => handleDialogMouseMove(task.creator, e)}
            onMouseLeave={handleDialogMouseLeave}
            style={{
              backgroundColor: userBadgedColor(task.creator),
            }}
          >
            {userBadged(task.creator)}
          </span>
          {task.assigned.map(
            (assigned: string, index: React.Key | null | undefined) => (
              <span
                key={index}
                className="footer-badged"
                onMouseMove={(e) => handleDialogMouseMove(assigned, e)}
                onMouseLeave={handleDialogMouseLeave}
                style={{
                  backgroundColor: userBadgedColor(assigned),
                }}
              >
                {userBadged(assigned)}
              </span>
            )
          )}
        </div>
        <div className={`footer-priority prio-${task.priority}`}></div>
      </div>
    </div>
  );
};

class Tasks extends Component<TasksProps, TasksState> {
  constructor(props: TasksProps) {
    super(props);
    this.state = {
      dialogId: "",
      dialogX: 0,
      dialogY: 0,
    };
  }

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

  render() {
    const { status, tasks, users } = this.props;
    const { dialogId, dialogX, dialogY } = this.state;
    const user = users.find((u) => u.id === dialogId);

    return (
      <div id={status} className="tasks">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <DraggableTask
              key={task.id}
              task={task}
              users={users}
              handleDialogMouseMove={this.handleDialogMouseMove}
              handleDialogMouseLeave={this.handleDialogMouseLeave}
            />
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
              {user.firstName} {dialogId === users[0].id && <span>(du)</span>}
            </p>
            <p>{user.lastName}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Tasks;
