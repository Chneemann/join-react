import React from "react";
import { Route, Routes } from "react-router-dom";
import "./main-content.css";
import Help from "../shared/legal/help";

interface MainContentProps {}

interface MainContentState {}

class MainContent extends React.Component<MainContentProps, MainContentState> {
  state = {};
  render() {
    return (
      <main>
        <Routes>
          <Route path="/help" element={<Help />} />
        </Routes>
      </main>
    );
  }
}

export default MainContent;
