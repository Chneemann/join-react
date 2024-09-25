import React, { useEffect, useState } from "react";
import { fetchTasks } from "../../../services/firebase.service";
import { Task } from "../../../interfaces/task.interface";
import "./summary.css";

const Summary: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const tasksList = await fetchTasks();
      setTasks(tasksList);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Count the number of tasks
  let tasksTodoCount = 0;
  let tasksInProgressCount = 0;
  let tasksAwaitingFeedbackCount = 0;
  let tasksDoneCount = 0;
  const tasksInBoard = tasks.length;

  const urgentTasks = tasks.filter((task) => {
    if (task.priority === "urgent") {
      return true;
    }

    switch (task.status) {
      case "todo":
        tasksTodoCount++;
        break;
      case "inprogress":
        tasksInProgressCount++;
        break;
      case "awaitfeedback":
        tasksAwaitingFeedbackCount++;
        break;
      case "done":
        tasksDoneCount++;
        break;
    }

    return false;
  });

  const urgentTasksCount = urgentTasks.length;

  // Find the earliest due date among the “urgent” tasks
  const earliestDueDate = urgentTasks
    .map((task) => new Date(task.date))
    .sort((a, b) => a.getTime() - b.getTime())[0];

  // Convert the earliest due date into a readable format
  const formatDueDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  const formattedDueDate = earliestDueDate
    ? formatDueDate(earliestDueDate)
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
                    src="./../assets/img/summary/urgent.svg"
                    alt="Urgent task icon"
                  />
                  <span>{urgentTasksCount}</span>
                </div>
                <p>Tasks Urgent</p>
              </div>
              <div className="urgent-task-divider"></div>
              <div className="urgent-task-deadline">
                <span>{formattedDueDate}</span>
                <p>Upcoming Deadline</p>
              </div>
            </div>
          </div>
          <div className="task-in-board">
            <div className="task-in-board-container">
              <div className="task-in-board-info">
                <div className="task-in-board-icon">
                  <img
                    src="./../assets/img/summary/board.svg"
                    alt="Board task icon"
                  />
                  <span>{tasksInBoard}</span>
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
                    src="./../assets/img/summary/todo.svg"
                    alt="Todo task icon"
                  />
                  <span>{tasksTodoCount}</span>
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
                    src="./../assets/img/summary/in-progress.svg"
                    alt="Todo task icon"
                  />
                  <span>{tasksInProgressCount}</span>
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
                    src="./../assets/img/summary/awaiting-feedback.svg"
                    alt="Todo task icon"
                  />
                  <span>{tasksAwaitingFeedbackCount}</span>
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
                    src="./../assets/img/summary/done.svg"
                    alt="Todo task icon"
                  />
                  <span>{tasksDoneCount}</span>
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
