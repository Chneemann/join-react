import React from "react";
import "./login.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./login";
import { User } from "../../interfaces/user.interface";

interface AuthProps {
  currentUser: User | null;
}

interface AuthState {}

class Auth extends React.Component<AuthProps, AuthState> {
  render() {
    const { currentUser } = this.props;

    if (!currentUser) {
      return (
        <>
          <Navigate to="/"></Navigate>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      );
    }
  }
}

export default Auth;
