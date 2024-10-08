import React from "react";
import "./main-content.css";
import { Route, Routes } from "react-router-dom";
import Help from "../shared/components/legal/help";
import Summary from "./summary";
import AddTask from "./add-task/add-task";
import Contacts from "./contacts";
import Board from "./board/board";
import {
  fetchTasks,
  fetchUsers,
  updateTaskStatus,
  addNewTask,
} from "../../services/firebase.service";
import { Task } from "../../interfaces/task.interface";
import { User } from "../../interfaces/user.interface";
import Overlay from "../shared/components/overlay";

interface MainContentProps {}

interface MainContentState {
  tasks: Task[];
  users: User[];
  loading: boolean;
  showOverlay: boolean;
  overlayMsg: string;
  overlayTimeout: number;
}

class MainContent extends React.Component<MainContentProps, MainContentState> {
  state: MainContentState = {
    tasks: [],
    users: [],
    loading: true,
    showOverlay: false,
    overlayMsg: "",
    overlayTimeout: 0,
  };

  componentDidMount() {
    this.loadTasks();
    this.loadUsers();
  }
  // Loads tasks and saves them in the state.
  loadTasks = async () => {
    try {
      const tasksList = await fetchTasks();
      this.setState({ tasks: tasksList });
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  // Loads users and saves them in the state.
  loadUsers = async () => {
    try {
      const userList = await fetchUsers();
      this.setState({ users: userList });
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  // Updates the status of a task in the state.
  updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      this.setState((prevState) => ({
        tasks: prevState.tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        ),
      }));
    } catch (error) {
      console.error("Error updating task status on server:", error);
    }
  };

  // Adds a new task to the state.
  addNewTask = async (newTask: Task) => {
    try {
      const taskId = await addNewTask(newTask);
      this.setState((prevState) => ({
        tasks: [...prevState.tasks, { ...newTask, id: taskId }],
      }));
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  // Shows an overlay with a message for a specific time.
  showOverlay = (message: string, timeout?: number) => {
    const overlayTimeout = timeout || this.state.overlayTimeout;

    this.setState({ showOverlay: true, overlayMsg: message });

    setTimeout(() => {
      this.setState({ showOverlay: false, overlayMsg: "" });
    }, overlayTimeout);
  };

  render() {
    const { tasks, users, loading, showOverlay, overlayMsg } = this.state;

    return (
      <main>
        <Routes>
          <Route path="/help" element={<Help />} />
          <Route
            path="/summary"
            element={<Summary tasks={tasks} loading={loading} />}
          />
          <Route
            path="/add-task"
            element={
              <AddTask
                addTask={this.addNewTask}
                users={users}
                showOverlay={this.showOverlay}
              />
            }
          />
          <Route path="/contacts" element={<Contacts />} />
          <Route
            path="/board"
            element={
              <Board
                tasks={tasks}
                users={users}
                updateTaskStatus={this.updateTaskStatus}
              />
            }
          />
        </Routes>
        {showOverlay && <Overlay msg={overlayMsg} />}
      </main>
    );
  }
}

export default MainContent;
