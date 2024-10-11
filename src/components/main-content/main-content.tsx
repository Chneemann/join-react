import React from "react";
import "./main-content.css";
import { Navigate, Route, Routes } from "react-router-dom";
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
import { login, observeAuthState } from "../../services/auth.service";

interface MainContentProps {}

interface MainContentState {
  tasks: Task[];
  users: User[];
  loading: boolean;
  showOverlay: boolean;
  overlayMsg: string;
  overlayTimeout: number;
  loadingAuth: boolean;
  isAuthenticated: boolean;
  currentUser: User | null;
}

class MainContent extends React.Component<MainContentProps, MainContentState> {
  unsubscribeFromAuth: (() => void) | null = null;
  state: MainContentState = {
    tasks: [],
    users: [],
    loading: true,
    showOverlay: false,
    overlayMsg: "",
    overlayTimeout: 0,
    loadingAuth: true,
    isAuthenticated: false,
    currentUser: null,
  };

  async componentDidMount() {
    this.loadTasks();
    this.loadUsers();

    try {
      // Testbenutzer einloggen
      await login("guest@guestaccount.com", "guest@guestaccount.com");
    } catch (error) {
      console.error("Login failed:", error);
    }

    // Auth-Status überwachen
    this.unsubscribeFromAuth = observeAuthState((user) => {
      if (user) {
        this.setState({
          isAuthenticated: true,
          loadingAuth: false,
          currentUser: user,
        });
      } else {
        this.setState({
          isAuthenticated: false,
          loadingAuth: false,
          currentUser: null,
        });
      }
    });
  }

  // Unsubscribe from the auth state listener when the component unmounts
  componentWillUnmount() {
    if (this.unsubscribeFromAuth) {
      this.unsubscribeFromAuth();
    }
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
    const {
      tasks,
      users,
      loading,
      showOverlay,
      overlayMsg,
      isAuthenticated,
      loadingAuth,
      currentUser,
    } = this.state;

    // Wait until Auth-Status is loaded
    if (loadingAuth) {
      return;
    }

    // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    if (isAuthenticated && currentUser) {
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
                  showOverlay={this.showOverlay}
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
}

export default MainContent;
