import React from "react";
import { Route, Routes } from "react-router-dom";
import "./main-content.css";
import Help from "../shared/legal/help/help";
import Summary from "./summary/summary";
import AddTask from "./add-task/add-task";
import Contacts from "./contacts/contacts";
import Board from "./board/board";

interface MainContentProps {}

interface MainContentState {}

class MainContent extends React.Component<MainContentProps, MainContentState> {
  state = {};
  render() {
    return (
      <main>
        <Routes>
          <Route path="/help" element={<Help />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </main>
    );
  }
}

export default MainContent;
