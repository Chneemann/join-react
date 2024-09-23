import React, { Component } from "react";
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import MainContent from "./components/main-content/main-content";
import "./App.css";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <Navbar />
          <MainContent />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
