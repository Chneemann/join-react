import { Component } from "react";
import "./board.css";
import { Task } from "../../../interfaces/task.interface";
import { User } from "../../../interfaces/user.interface";
import Tasks from "./tasks";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { withTranslation, WithTranslation } from "react-i18next";
import AddTask from "../add-task/add-task";
import SmallBtn from "../../shared/components/buttons/small-btn";
import { log } from "console";

interface BoardProps extends WithTranslation {
  tasks: Task[];
  users: User[];
  currentUser: User;
  updateTaskStatus: (taskId: string, newStatus: string) => void;
  addTask: (task: Task) => Promise<void>;
  showOverlayMsg: (
    message: string,
    timeout: number,
    action: { reload?: boolean; href?: string }
  ) => void;
}

interface BoardState {
  searchValue: string;
  showAddTaskOverlay: boolean;
  taskStatus: string;
}

class Board extends Component<BoardProps, BoardState> {
  searchInput: HTMLInputElement | null = null;

  constructor(props: BoardProps) {
    super(props);
    this.state = {
      searchValue: "",
      showAddTaskOverlay: false,
      taskStatus: "todo",
    };
  }

  // Sets the search value and clears the input
  clearInput = () => {
    this.setState({ searchValue: "" });
  };

  // Toggles the add task overlay
  handleToggleTaskOverlay = (taskStatus: string) => {
    this.setState((prevState) => ({
      showAddTaskOverlay: !prevState.showAddTaskOverlay,
      taskStatus: taskStatus,
    }));
  };

  render() {
    const { searchValue, showAddTaskOverlay, taskStatus } = this.state;
    const { t, tasks, users, updateTaskStatus } = this.props;

    // Definition of the status display names
    const statusDisplayNames: { [key: string]: string } = {
      todo: t("board.todo"),
      inprogress: t("board.inprogress"),
      awaitfeedback: t("board.awaitfeedback"),
      done: t("board.done"),
    };

    // Filter tasks based on search value
    const filteredTasks = tasks.filter((task) => {
      const searchValueLower = searchValue.toLowerCase();

      return (
        task.title.toLowerCase().includes(searchValueLower) ||
        task.description.toLowerCase().includes(searchValueLower) ||
        task.category.toLowerCase().includes(searchValueLower)
      );
    });

    return (
      <DndProvider backend={HTML5Backend}>
        <div className="board">
          <div className="board-header">
            <div className="board-search">
              <div className="board-search-inner">
                <input
                  ref={(input) => (this.searchInput = input)}
                  id="search-task"
                  name="search-task"
                  type="text"
                  placeholder={t("board.searchText")}
                  value={searchValue}
                  onChange={(e) =>
                    this.setState({ searchValue: e.target.value })
                  }
                />
                <span>
                  {searchValue ? (
                    <img
                      src="./../../../assets/img/board/clear.svg"
                      className="board-icon-clear"
                      alt="clear"
                      onClick={this.clearInput}
                    />
                  ) : (
                    <img
                      src="./../../../assets/img/board/search.svg"
                      className="board-icon-search"
                      alt="search"
                    />
                  )}
                </span>
                <span className="board-line"></span>
              </div>
              <button
                className="board-btn"
                type="submit"
                onClick={() => this.handleToggleTaskOverlay("todo")}
              >
                <div className="board-btn-inside">
                  <span>{t("board.searchBtn")}</span>
                  <img
                    src="./../../../assets/img/board/add_white.svg"
                    alt="check"
                  />
                </div>
              </button>
            </div>
          </div>
          <div className="board-content">
            <div className="board-status">
              {["todo", "inprogress", "awaitfeedback", "done"].map((status) => (
                <DroppableColumn
                  key={status}
                  status={status}
                  tasks={filteredTasks.filter((task) => task.status === status)}
                  users={users}
                  currentUser={this.props.currentUser}
                  updateTaskStatus={updateTaskStatus}
                  statusDisplayNames={statusDisplayNames}
                  showOverlayMsg={this.props.showOverlayMsg}
                  handleToggleTaskOverlay={this.handleToggleTaskOverlay}
                />
              ))}
            </div>
            <div id="board-content-tasks"></div>
          </div>
        </div>
        {showAddTaskOverlay && (
          <div
            className="add-task-overlay"
            onClick={() => this.handleToggleTaskOverlay("")}
          >
            <div
              className="add-task-overlay-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="add-task-overlay-close"
                onClick={() => this.handleToggleTaskOverlay("")}
              >
                <SmallBtn image="close.svg" />
              </div>

              <AddTask
                users={users}
                taskStatus={taskStatus}
                addTask={this.props.addTask}
                showOverlayMsg={this.props.showOverlayMsg}
                currentUser={this.props.currentUser}
              />
            </div>
          </div>
        )}
      </DndProvider>
    );
  }
}

// Droppable Column Component
const DroppableColumn = ({
  status,
  tasks,
  users,
  updateTaskStatus,
  statusDisplayNames,
  currentUser,
  showOverlayMsg,
  handleToggleTaskOverlay,
}: any) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => {
      updateTaskStatus(item.id, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`board-column ${isOver ? "hovered" : ""}`}>
      <div className="board-headline">
        <span>{statusDisplayNames[status]}</span>
        <img
          src="./../../../assets/img/board/plus.svg"
          alt="add"
          onClick={() => handleToggleTaskOverlay(status)}
        />
      </div>
      <Tasks
        tasks={tasks}
        users={users}
        status={status}
        currentUser={currentUser}
        statusDisplayNames={statusDisplayNames}
        updateTaskStatus={updateTaskStatus}
        showOverlayMsg={showOverlayMsg}
      />
    </div>
  );
};

export default withTranslation()(Board);
