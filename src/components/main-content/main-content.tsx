import React from "react";
import { Route, Routes } from "react-router-dom";
import "./main-content.css";
import Help from "../shared/components/legal/help";
import Summary from "./summary";
import AddTask from "./add-task";
import Contacts from "./contacts";
import Board from "./board/board";
import { fetchTasks, fetchUsers } from "../../services/firebase.service";
import { Task } from "../../interfaces/task.interface";
import { User } from "../../interfaces/user.interface";

interface MainContentProps {}

interface MainContentState {
  tasks: Task[];
  users: User[];
  loading: boolean;
}

class MainContent extends React.Component<MainContentProps, MainContentState> {
  state: MainContentState = {
    tasks: [],
    users: [],
    loading: true,
  };

  componentDidMount() {
    this.loadTasks();
    this.loadUsers();
  }

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

  updateTaskStatus = (taskId: string, newStatus: string) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ),
    }));
  };

  render() {
    const { tasks, users, loading } = this.state;

    return (
      <main>
        <Routes>
          <Route path="/help" element={<Help />} />
          <Route
            path="/summary"
            element={<Summary tasks={tasks} loading={loading} />}
          />
          <Route path="/add-task" element={<AddTask />} />
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
      </main>
    );
  }
}

export default MainContent;
