import React from "react";
import "./auth.css";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Login from "./login";
import { User } from "../../interfaces/user.interface";
import Register from "./register";
import ForgotPassword from "./forgot-pw";
import LegalNotice from "../shared/components/legal/legal-notice";
import PrivacyPolicy from "../shared/components/legal/privacy-policy";
import HeaderWrapper from "../shared/components/header/header-wrapper";
import Footer from "../shared/components/footer/footer";
import SmallBtn from "../shared/components/buttons/small-btn";
import { useTranslation } from "react-i18next";

interface AuthProps {
  currentUser: User | null;
}

const Auth: React.FC<AuthProps> = ({ currentUser }) => {
  const location = useLocation();
  const { i18n } = useTranslation();

  // Define legal paths
  const legalPaths = ["/privacy-policy", "/legal-notice"];
  const isDisplayingLegalContent = legalPaths.includes(location.pathname);

  // Define the container class based on whether legal content is displayed
  const containerClass = isDisplayingLegalContent
    ? "container-auth-center-none"
    : "container-auth-center";

  // Function to change the language
  const changeLanguage = () => {
    const newLang = i18n.language === "en" ? "de" : "en";
    i18n.changeLanguage(newLang);
  };

  // If there's no current user, display the auth routes
  if (!currentUser) {
    return (
      <div className="container-auth">
        {!isDisplayingLegalContent ? (
          <HeaderWrapper currentUser={null} />
        ) : (
          <div className="auth-language">
            <SmallBtn image="language.svg" onClick={changeLanguage} />
          </div>
        )}
        <div className={containerClass}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-pw" element={<ForgotPassword />} />
            <Route path="/legal-notice" element={<LegalNotice />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            {/* Catch-all route for any other paths */}
            <Route
              path="*"
              element={<Navigate to="/" state={{ from: location }} />}
            />
          </Routes>
        </div>
        {!isDisplayingLegalContent && <Footer />}
      </div>
    );
  }
  // Redirect if the user is logged in
  return <Navigate to="/board" />;
};

export default Auth;
