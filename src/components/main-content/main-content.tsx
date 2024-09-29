import React from "react";
import { Route, Routes } from "react-router-dom";
import "./main-content.css";
import Help from "../shared/components/legal/help";
import Summary from "./summary";
import AddTask from "./add-task";
import Contacts from "./contacts";
import Board from "./board/board";
import { fetchTasks } from "../../services/firebase.service";
import { Task } from "../../interfaces/task.interface";

interface MainContentProps {}

interface MainContentState {
  tasks: Task[];
  loading: boolean;
}

class MainContent extends React.Component<MainContentProps, MainContentState> {
  state: MainContentState = {
    tasks: [],
    loading: true,
  };

  componentDidMount() {
    this.loadTasks();
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

  render() {
    const { tasks, loading } = this.state;
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
          <Route path="/board" element={<Board />} />
        </Routes>
      </main>
    );
  }
}

export default MainContent;
