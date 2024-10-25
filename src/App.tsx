import React, { Component } from "react";
import { Navigate, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/shared/components/header/header";
import Navbar from "./components/navbar/navbar";
import MainContent from "./components/main-content/main-content";
import "./App.css";
import "./i18n";
import { User } from "./interfaces/user.interface";
import { observeAuthState } from "./services/auth.service";
import Auth from "./components/auth/auth";
import Footer from "./components/shared/components/footer/footer";

interface AppState {
  currentUser: User | null;
  loadingAuth: boolean;
  isAuthenticated: boolean;
}

class App extends Component<{}, AppState> {
  unsubscribeFromAuth: (() => void) | undefined;

  state: AppState = {
    currentUser: null,
    loadingAuth: true,
    isAuthenticated: false,
  };

  /**
   * Sets up an authentication state listener on mount.
   * Updates `isAuthenticated`, `currentUser`, and `loadingAuth` based on the user's status.
   */
  async componentDidMount() {
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

    return (
      <Router>
        {/* Loading indicator when authentication is loaded */}
        {loadingAuth}

        {/* Redirect to login page if not authenticated */}
        {!loadingAuth && !isAuthenticated && (
          <React.Fragment>
            <div className="container-auth">
              <Header currentUser={null} />
              <div className="container-auth-center">
                <Auth currentUser={null} />
              </div>
              <Footer />
            </div>
          </React.Fragment>
        )}

        {/* Authenticated user */}
        {!loadingAuth && currentUser && (
          <React.Fragment>
            <Header currentUser={currentUser} />
            <div className="container">
              <Navbar />
              <MainContent currentUser={currentUser} />
            </div>
          </React.Fragment>
        )}
      </Router>
    );
  }
}

export default App;
