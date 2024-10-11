import React, { Component } from "react";
import { Navigate, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import MainContent from "./components/main-content/main-content";
import "./App.css";
import "./i18n";
import { User } from "./interfaces/user.interface";
import { login, observeAuthState } from "./services/auth.service";

interface AppState {
  currentUser: User | null;
  loadingAuth: boolean;
  isAuthenticated: boolean;
}
class App extends Component<{}, AppState> {
  unsubscribeFromAuth: (() => void) | undefined; // Typ für die Abmeldefunktion

  state: AppState = {
    currentUser: null,
    loadingAuth: true,
    isAuthenticated: false,
  };

  async componentDidMount() {
    // Testbenutzer einloggen
    // try {
    //   await login("guest@guestaccount.com", "guest@guestaccount.com");
    // } catch (error) {
    //   console.error("Login failed:", error);
    // }

    // Monitor Auth-Status
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

  render() {
    const { currentUser, isAuthenticated, loadingAuth } = this.state;

    // Wait until Auth-Status is loaded
    if (loadingAuth) {
      return;
    }

    // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    // If the user is authenticated, render the main content
    if (currentUser) {
      return (
        <Router>
          <React.Fragment>
            <Header currentUser={currentUser} />
            <div className="container">
              <Navbar />
              <MainContent currentUser={currentUser} />
            </div>
          </React.Fragment>
        </Router>
      );
    }
  }
}

export default App;
