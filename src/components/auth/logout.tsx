import React from "react";
import { Navigate } from "react-router-dom";
import { logout } from "../../services/auth.service";

class Logout extends React.Component {
  state = {
    isLoggedOut: false,
  };

  /**
   * This lifecycle method is called after the component has been rendered to the DOM.
   * It will call the handleLogout function which will log the user out and redirect
   * them to the login page.
   */
  componentDidMount() {
    this.handleLogout();
  }

  // Logs the user out and redirects them to the login page
  handleLogout = async () => {
    try {
      await logout();
      this.setState({ isLoggedOut: true });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  /**
   * Renders the logout component. Displays a message indicating that the user
   * is currently being logged out if the logout process is not yet complete.
   */
  render() {
    if (!this.state.isLoggedOut) {
      return <div>Logging out...</div>;
    }
  }
}

export default Logout;
