import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import { User } from "../../../../interfaces/user.interface";

interface HeaderWrapperProps {
  currentUser: User | null;
}

const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ currentUser }) => {
  const navigate = useNavigate();

  return <Header currentUser={currentUser} navigate={navigate} />;
};

export default HeaderWrapper;
