import React from "react";
import "./login.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./login";
import { User } from "../../interfaces/user.interface";
import Register from "./register";

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
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </>
      );
    }
  }
}

export default Auth;
