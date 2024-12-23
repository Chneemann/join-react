import React, {
  Component,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Task } from "../../../interfaces/task.interface";
import { User } from "../../../interfaces/user.interface";
import "./tasks.css";
import { useDrag } from "react-dnd";
import TaskDetails from "./task-details";
import { withTranslation, WithTranslation } from "react-i18next";

interface TasksProps extends WithTranslation {
  status: string;
  tasks: Task[];
  users: User[];
  currentUser: User;
  statusDisplayNames: { [key: string]: string };
  updateTaskStatus: (taskId: string, newStatus: string) => void;
  handleToggleTaskOverlay: (taskStatus: string, taskId: string | null) => void;
  showOverlayMsg: (
    message: string,
    timeout: number,
    action: { reload?: boolean; href?: string }
  ) => void;
}

interface TasksState {
  dialogId: string;
  dialogX: number;
  dialogY: number;
  selectedTask: Task | null;
}

class Tasks extends Component<TasksProps, TasksState> {
  constructor(props: TasksProps) {
    super(props);
    this.state = {
      dialogId: "",
      dialogX: 0,
      dialogY: 0,
      selectedTask: null,
    };
  }

  // When a user is hovered, set the dialogId to that user
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

  // Set the dialogId to an empty string when the mouse leaves the dialog
  handleDialogMouseLeave = () => {
    this.setState({ dialogId: "" });
  };

  // When a task is clicked, set the selectedTask to that task
  handleTaskClick = (task: Task) => {
    this.setState({ selectedTask: task });
  };

  // When a task is closed, set the selectedTask to null
  closeTaskDetails = () => {
    this.setState({ selectedTask: null });
  };

  render() {
    const { t, status, tasks, users, currentUser } = this.props;
    const { dialogId, dialogX, dialogY, selectedTask } = this.state;
    const user = users.find((u) => u.id === dialogId);

    return (
      <div id={status} className="tasks">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <DraggableTask
              t={t}
              key={task.id}
              task={task}
              users={users}
              statusDisplayNames={this.props.statusDisplayNames}
              updateTaskStatus={this.props.updateTaskStatus}
              handleDialogMouseMove={this.handleDialogMouseMove}
              handleDialogMouseLeave={this.handleDialogMouseLeave}
              onTaskClick={this.handleTaskClick}
            />
          ))
        ) : (
          <div className="no-tasks">{t("board.noTasks")}</div>
        )}
        {dialogId && user && (
          <div
            className="task-assigned-dialog"
            style={{
              left: `${dialogX}px`,
              top: `${dialogY}px`,
            }}
          >
            <p>
              {user.firstName}
              {user.firstName && user.lastName ? (
                <>
                  ,<br />
                  {user.lastName}
                </>
              ) : null}
              {dialogId === currentUser.id && <span> ({t("board.you")})</span>}
            </p>
          </div>
        )}
        {selectedTask && (
          <TaskDetails
            task={selectedTask}
            users={users}
            currentUser={currentUser}
            onClose={this.closeTaskDetails}
            showOverlayMsg={this.props.showOverlayMsg}
            handleToggleTaskOverlay={this.props.handleToggleTaskOverlay}
          />
        )}
      </div>
    );
  }
}

/**
 * @description A single task in the board, which can be dragged to change
 * its status.
 * @param {Object} task - The task object from the database.
 * @param {Array<User>} users - List of all users in the database.
 * @param {Function} handleDialogMouseMove - Function to handle user mouse move events.
 * @param {Function} handleDialogMouseLeave - Function to handle user mouse leave events.
 * @returns {ReactElement} A React component representing a single task.
 */
const DraggableTask = ({
  t,
  task,
  users,
  handleDialogMouseMove,
  handleDialogMouseLeave,
  updateTaskStatus,
  statusDisplayNames,
  onTaskClick,
}: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [menuId, setMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Add event listeners to handle clicks outside of the task menu
  useEffect(() => {
    /**
     * @description Handles a click outside of the task menu.
     * @param {Event} event - The event that triggered this function.
     * @returns {void}
     */
    const handleClickOutside = (event: Event) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  /**
   * @description Toggles the task menu for the given task id.
   * @param {string} taskId - The id of the task to toggle the menu for.
   * @returns {void}
   */
  const toggleTaskMenu = (taskId: string) => {
    setMenuId(menuId === taskId ? null : taskId);
  };

  /**
   * @description Given a user id, returns the color associated with that user.
   * @param {string} id - The id of the user.
   * @returns {string} The color associated with the user.
   */
  const userBadgedColor = (id: string): string => {
    const user = users.find((user: User) => user.id === id);
    return user ? user.color : "";
  };

  /**
   * @description Given a user id, returns the initials associated with that user.
   * @param {string} id - The id of the user.
   * @returns {string} The initials associated with the user.
   */
  const userBadged = (id: string): string => {
    const user = users.find((user: User) => user.id === id);
    return user
      ? user.firstName === "Guest"
        ? user.firstName.charAt(0)
        : user.firstName.charAt(0) + user.lastName.charAt(0)
      : "";
  };

  return (
    <div
      ref={drag}
      className={`task ${isDragging ? "dragging" : ""}`}
      onClick={() => onTaskClick(task)}
    >
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
        <div
          className="menu-btn"
          onClick={(e) => {
            e.stopPropagation();
            toggleTaskMenu(task.id);
          }}
        >
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
                  (task.subtasksDone.filter((done: boolean) => done).length /
                    task.subtasksTitle.length) *
                  100
                }%`,
              }}
            ></span>
          </div>
          <div className="task-subtask-text">
            {task.subtasksDone.filter((done: boolean) => done).length} /{" "}
            {task.subtasksTitle.length} {t("board.subtasks")}
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
      {menuId === task.id && (
        <div ref={menuRef}>
          <TaskMenu
            task={task}
            updateTaskStatus={updateTaskStatus}
            statusDisplayNames={statusDisplayNames}
          />
        </div>
      )}
    </div>
  );
};

/**
 * A dropdown menu for changing the status of a task.
 * @param {Task} task - The task to change the status of.
 * @param {(taskId: string, newStatus: string) => void} updateTaskStatus - A function to call when a new status is selected.
 * @param {{[key: string]: string}} statusDisplayNames - A mapping of status codes to display names.
 * @returns A React component that renders a dropdown menu with links to change the status of a task.
 */
const TaskMenu = ({
  task,
  updateTaskStatus,
  statusDisplayNames,
}: {
  task: Task;
  updateTaskStatus: (taskId: string, newStatus: string) => void;
  statusDisplayNames: { [key: string]: string };
}) => {
  const statusOptions = Object.keys(statusDisplayNames);

  return (
    <div className="task-menu" onClick={(e) => e.stopPropagation()}>
      {statusOptions.map(
        (status) =>
          task.status !== status && (
            <div
              key={status}
              className="task-menu-link"
              onClick={() => task.id && updateTaskStatus(task.id, status)}
            >
              {statusDisplayNames[status]}
            </div>
          )
      )}
    </div>
  );
};

export default withTranslation()(Tasks);
