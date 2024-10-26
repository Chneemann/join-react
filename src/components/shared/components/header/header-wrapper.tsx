import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./header";
import { User } from "../../../../interfaces/user.interface";

interface HeaderWrapperProps {
  currentUser: User | null;
}

const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ currentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Header currentUser={currentUser} navigate={navigate} location={location} />
  );
};

export default HeaderWrapper;
