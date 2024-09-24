import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import MainContent from "./components/main-content/main-content";
import "./App.css";
import "./i18n.tsx";

class App extends Component {
  state = {};

  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <div className="container">
            <Navbar />
            <MainContent />
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
