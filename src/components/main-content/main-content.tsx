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
import OverlayMsg from "../shared/components/overlay-msg";

interface MainContentProps {
  currentUser: User;
}

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

  async componentDidMount() {
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

  // Method for displaying the overlay message
  showOverlayMsg = (
    message: string,
    timeout: number,
    action: { reload?: boolean; href?: string }
  ) => {
    const overlayTimeout = timeout || this.state.overlayTimeout;

    this.setState({ showOverlay: true, overlayMsg: message });

    setTimeout(() => {
      this.setState({ showOverlay: false, overlayMsg: "" });

      if (action) {
        this.performAction(action);
      }
    }, overlayTimeout);
  };

  // Auxiliary method for executing the overlay message action
  performAction = (action: { reload?: boolean; href?: string }) => {
    if (action.reload) {
      window.location.reload();
    } else if (action.href) {
      window.location.href = action.href;
    }
  };

  render() {
    const { tasks, users, loading, showOverlay, overlayMsg } = this.state;
    const { currentUser } = this.props;

    if (currentUser) {
      return (
        <main>
          <Routes>
            <Route path="/help" element={<Help />} />
            <Route
              path="/summary"
              element={
                <Summary
                  tasks={tasks}
                  loading={loading}
                  currentUser={currentUser}
                />
              }
            />
            <Route
              path="/add-task"
              element={
                <AddTask
                  addTask={this.addNewTask}
                  users={users}
                  showOverlayMsg={this.showOverlayMsg}
                  currentUser={currentUser}
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
                  currentUser={currentUser}
                  updateTaskStatus={this.updateTaskStatus}
                  showOverlayMsg={this.showOverlayMsg}
                />
              }
            />
          </Routes>
          {showOverlay && <OverlayMsg msg={overlayMsg} />}
        </main>
      );
    }
  }
}

export default MainContent;
