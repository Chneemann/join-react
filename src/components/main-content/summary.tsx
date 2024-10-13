import React, { Component } from "react";
import { Task } from "../../interfaces/task.interface";
import { withTranslation, WithTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import "./summary.css";
import "./summary-mobile.css";
import { User } from "../../interfaces/user.interface";

interface SummaryProps extends WithTranslation {
  tasks: Task[];
  currentUser: User;
}

interface SummaryState {
  taskCounts: {
    todo: number;
    inProgress: number;
    awaitFeedback: number;
    done: number;
    urgent: Task[];
  };
  formattedDueDate: string;
  isMobile: boolean;
  currentUser: User;
}

class Summary extends Component<SummaryProps, SummaryState> {
  constructor(props: SummaryProps) {
    super(props);
    this.state = {
      taskCounts: {
        todo: 0,
        inProgress: 0,
        awaitFeedback: 0,
        done: 0,
        urgent: [],
      },
      formattedDueDate: "No Deadline",
      isMobile: window.innerWidth <= 1200,
      currentUser: props.currentUser,
    };
    this.handleResize = this.handleResize.bind(this);
  }

  /**
   * Aggregates the task counts based on the initial tasks passed as props when the component is first mounted.
   */
  componentDidMount() {
    this.aggregateTaskCounts(this.props.tasks);
    window.addEventListener("resize", this.handleResize);
  }

  /**
   * Re-aggregates the task counts if the `tasks` prop has changed.
   * Ensures that the component reflects the updated tasks.
   * @param prevProps The previous props
   */
  componentDidUpdate(prevProps: SummaryProps) {
    if (prevProps.tasks !== this.props.tasks) {
      this.aggregateTaskCounts(this.props.tasks);
    }
  }

  /**
   * Remove the event listener from the window that listens for the "resize" event.
   * This is called when the component is being unmounted.
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  /**
   * Aggregate the task counts and store them in the component's state.
   * Also finds the earliest due date of the urgent tasks and formats it to be displayed in the summary.
   * @param tasks The tasks to aggregate
   */
  aggregateTaskCounts(tasks: Task[]) {
    const taskCounts = tasks.reduce(
      (counts, task) => {
        if (task.priority === "urgent") counts.urgent.push(task);
        switch (task.status) {
          case "todo":
            counts.todo++;
            break;
          case "inprogress":
            counts.inProgress++;
            break;
          case "awaitfeedback":
            counts.awaitFeedback++;
            break;
          case "done":
            counts.done++;
            break;
        }
        return counts;
      },
      {
        todo: 0,
        inProgress: 0,
        awaitFeedback: 0,
        done: 0,
        urgent: [] as Task[],
      }
    );

    // Determine the earliest due date among urgent tasks, format it, and update the component state
    const earliestDueDate = taskCounts.urgent
      .map((task) => new Date(task.date))
      .sort((a, b) => a.getTime() - b.getTime())[0];

    const formattedDueDate = earliestDueDate
      ? earliestDueDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "No Deadline";

    // Update the component state with task counts and the formatted due date
    this.setState({ taskCounts, formattedDueDate });
  }

  /**
   * Handles window resize events and updates the component state to reflect whether the
   * component should render in mobile or desktop mode.
   */
  handleResize() {
    this.setState({ isMobile: window.innerWidth <= 1200 });
  }

  render() {
    const { t } = this.props;
    const { taskCounts, formattedDueDate, isMobile, currentUser } = this.state;

    return (
      <div className="summary">
        <div className="summary-headline">
          {t("summary.goodMorning")} <span>{currentUser.firstName}</span>
        </div>
        <div className="summary-content">
          <div className="summary-content-container-upper">
            <NavLink to="/board" className="urgent-task">
              <div className="urgent-task-container">
                <div className="urgent-task-info">
                  <div className="urgent-task-icon">
                    <img
                      className="img"
                      src="./../assets/img/summary/urgent.svg"
                      alt="Urgent task icon"
                    />
                    <span>{taskCounts.urgent.length}</span>
                  </div>
                  <p>{t("summary.tasksUrgent")}</p>
                </div>
                <div className="urgent-task-divider"></div>
                <div className="urgent-task-deadline">
                  <span>{formattedDueDate}</span>
                  <p>{t("summary.upcomingDeadline")}</p>
                </div>
              </div>
            </NavLink>
            {!isMobile ? (
              <NavLink to="/board" className="task-in-board">
                <div className="task-in-board-container">
                  <div className="task-in-board-info">
                    <div className="task-in-board-icon">
                      <img
                        className="img"
                        src="./../assets/img/summary/board.svg"
                        alt="Board task icon"
                      />
                      <span>{this.props.tasks.length}</span>
                    </div>
                    <p>{t("summary.tasksInBoard")}</p>
                  </div>
                </div>
              </NavLink>
            ) : (
              <NavLink to="/board" className="task-todo">
                <div className="task-todo-container">
                  <div className="task-todo-info">
                    <div className="task-todo-icon">
                      <img
                        className="img"
                        src="./../assets/img/summary/todo.svg"
                        alt="Todo task icon"
                      />
                      <span>{taskCounts.todo}</span>
                    </div>
                    <p>{t("summary.tasksTodo")}</p>
                  </div>
                </div>
              </NavLink>
            )}
          </div>
          <div className="summary-content-container-lower">
            {isMobile ? (
              <NavLink to="/board" className="task-in-board">
                <div className="task-in-board-container">
                  <div className="task-in-board-info">
                    <div className="task-in-board-icon">
                      <img
                        className="img"
                        src="./../assets/img/summary/board.svg"
                        alt="Board task icon"
                      />
                      <span>{this.props.tasks.length}</span>
                    </div>
                    <p>{t("summary.tasksInBoard")}</p>
                  </div>
                </div>
              </NavLink>
            ) : (
              <NavLink to="/board" className="task-todo">
                <div className="task-todo-container">
                  <div className="task-todo-info">
                    <div className="task-todo-icon">
                      <img
                        className="img"
                        src="./../assets/img/summary/todo.svg"
                        alt="Todo task icon"
                      />
                      <span>{taskCounts.todo}</span>
                    </div>
                    <p>{t("summary.tasksTodo")}</p>
                  </div>
                </div>
              </NavLink>
            )}
            <NavLink to="/board" className="task-other">
              <div className="task-other-container">
                <div className="task-other-info">
                  <div className="task-other-icon">
                    <img
                      className="img"
                      src="./../assets/img/summary/in-progress.svg"
                      alt="In progress task icon"
                    />
                    <span>{taskCounts.inProgress}</span>
                  </div>
                  <p>{t("summary.tasksInProgress")}</p>
                </div>
              </div>
            </NavLink>
            <NavLink to="/board" className="task-other">
              <div className="task-other-container">
                <div className="task-other-info">
                  <div className="task-other-icon">
                    <img
                      className="img"
                      src="./../assets/img/summary/await-feedback.svg"
                      alt="Await feedback task icon"
                    />
                    <span>{taskCounts.awaitFeedback}</span>
                  </div>
                  <p>{t("summary.awaitFeedback")}</p>
                </div>
              </div>
            </NavLink>
            <NavLink to="/board" className="task-done">
              <div className="task-done-container">
                <div className="task-done-info">
                  <div className="task-done-icon">
                    <img
                      className="img"
                      src="./../assets/img/summary/done.svg"
                      alt="Done task icon"
                    />
                    <span>{taskCounts.done}</span>
                  </div>
                  <p>{t("summary.tasksDone")}</p>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Summary);
