import React from "react";
import "./auth.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./login";
import { User } from "../../interfaces/user.interface";
import Register from "./register";
import ForgotPassword from "./forgot-pw";
import LegalNotice from "../shared/components/legal/legal-notice";
import PrivacyPolicy from "../shared/components/legal/privacy-policy";
import HeaderWrapper from "../shared/components/header/header-wrapper";
import Footer from "../shared/components/footer/footer";

interface AuthProps {
  currentUser: User | null;
}

const Auth: React.FC<AuthProps> = ({ currentUser }) => {
  const location = useLocation();

  // Define legal paths
  const legalPaths = ["/privacy-policy", "/legal-notice"];
  const isDisplayingLegalContent = legalPaths.includes(location.pathname);

  // Define the container class based on whether legal content is displayed
  const containerClass = isDisplayingLegalContent
    ? "container-auth-center-none"
    : "container-auth-center";

  // If there's no current user, display the auth routes
  if (!currentUser) {
    return (
      <div className="container-auth">
        {!isDisplayingLegalContent && <HeaderWrapper currentUser={null} />}
        <div className={containerClass}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-pw" element={<ForgotPassword />} />
            <Route path="/legal-notice" element={<LegalNotice />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
        {!isDisplayingLegalContent && <Footer />}
      </div>
    );
  }
  // Return null or redirect if the user is logged in
  return null;
};

export default Auth;
