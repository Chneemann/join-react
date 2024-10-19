import React from "react";
import { Navigate } from "react-router-dom";
import { logout } from "../../services/auth.service";

class Logout extends React.Component {
  state = {
    isLoggedOut: false,
  };

  componentDidMount() {
    this.handleLogout();
  }

  handleLogout = async () => {
    try {
      await logout();
      this.setState({ isLoggedOut: true });
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  render() {
    if (this.state.isLoggedOut) {
      return <Navigate to="/login" />;
    }

    return <Navigate to="/summary" />;
  }
}

export default Logout;
