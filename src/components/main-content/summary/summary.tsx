import React from "react";
import { Task } from "../../../interfaces/task.interface";
import "./summary.css";

interface SummaryProps {
  tasks: Task[];
  loading: boolean;
}

const Summary: React.FC<SummaryProps> = ({ tasks, loading }) => {
  // Aggregate task counts
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

  // Find the earliest due date among urgent tasks
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

  return (
    <div className="summary">
      <div className="headline">
        Good morning, <span>Guest</span>
      </div>
      <div className="content">
        <div className="content-container-upper">
          <div className="urgent-task">
            <div className="urgent-task-container">
              <div className="urgent-task-info">
                <div className="urgent-task-icon">
                  <img
                    className="img"
                    src="./../assets/img/summary/urgent.svg"
                    alt="Urgent task icon"
                  />
                  {/* Placeholder for the number of urgent tasks */}
                  <span>
                    {loading ? (
                      <img
                        className="sync-img"
                        src="./../assets/img/sync.svg"
                        alt=""
                      />
                    ) : (
                      taskCounts.urgent.length
                    )}
                  </span>
                </div>
                <p>Tasks Urgent</p>
              </div>
              <div className="urgent-task-divider"></div>
              <div className="urgent-task-deadline">
                {/* Placeholder for the due date */}
                <span>
                  {loading ? (
                    <span className="loading-dots">
                      Loading
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </span>
                  ) : (
                    formattedDueDate
                  )}
                </span>
                <p>Upcoming Deadline</p>
              </div>
            </div>
          </div>
          <div className="task-in-board">
            <div className="task-in-board-container">
              <div className="task-in-board-info">
                <div className="task-in-board-icon">
                  <img
                    className="img"
                    src="./../assets/img/summary/board.svg"
                    alt="Board task icon"
                  />
                  {/* Placeholder for the number of tasks in the board */}
                  <span>
                    {loading ? (
                      <img
                        className="sync-img"
                        src="./../assets/img/sync.svg"
                        alt=""
                      />
                    ) : (
                      tasks.length
                    )}
                  </span>
                </div>
                <p>
                  Tasks in
                  <br />
                  Board
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-container-lower">
          <div className="task-todo">
            <div className="task-todo-container">
              <div className="task-todo-info">
                <div className="task-todo-icon">
                  <img
                    className="img"
                    src="./../assets/img/summary/todo.svg"
                    alt="Todo task icon"
                  />
                  {/* Placeholder for the number of to-do tasks */}
                  <span>
                    {loading ? (
                      <img
                        className="sync-img"
                        src="./../assets/img/sync.svg"
                        alt=""
                      />
                    ) : (
                      taskCounts.todo
                    )}
                  </span>
                </div>
                <p>Tasks To-do</p>
              </div>
            </div>
          </div>
          <div className="task-other">
            <div className="task-other-container">
              <div className="task-other-info">
                <div className="task-other-icon">
                  <img
                    className="img"
                    src="./../assets/img/summary/in-progress.svg"
                    alt="In progress task icon"
                  />
                  {/* Placeholder for the number of in-progress tasks */}
                  <span>
                    {loading ? (
                      <img
                        className="sync-img"
                        src="./../assets/img/sync.svg"
                        alt=""
                      />
                    ) : (
                      taskCounts.inProgress
                    )}
                  </span>
                </div>
                <p>
                  Tasks in
                  <br />
                  Progress
                </p>
              </div>
            </div>
          </div>
          <div className="task-other">
            <div className="task-other-container">
              <div className="task-other-info">
                <div className="task-other-icon">
                  <img
                    className="img"
                    src="./../assets/img/summary/await-feedback.svg"
                    alt="Await feedback task icon"
                  />
                  {/* Placeholder for the number of Await Feedback tasks */}
                  <span>
                    {loading ? (
                      <img
                        className="sync-img"
                        src="./../assets/img/sync.svg"
                        alt=""
                      />
                    ) : (
                      taskCounts.awaitFeedback
                    )}
                  </span>
                </div>
                <p>
                  Awaiting
                  <br />
                  Feedback
                </p>
              </div>
            </div>
          </div>
          <div className="task-done">
            <div className="task-done-container">
              <div className="task-done-info">
                <div className="task-done-icon">
                  <img
                    className="img"
                    src="./../assets/img/summary/done.svg"
                    alt="Done task icon"
                  />
                  {/* Placeholder for the number of completed tasks */}
                  <span>
                    {loading ? (
                      <img
                        className="sync-img"
                        src="./../assets/img/sync.svg"
                        alt=""
                      />
                    ) : (
                      taskCounts.done
                    )}
                  </span>
                </div>
                <p>
                  Tasks
                  <br />
                  Done
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
