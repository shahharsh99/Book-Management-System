import React from "react";
import Header from "./common/Header";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate: Function = useNavigate();
  const email = localStorage.getItem("auth")?.toString();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <>
      <Header email={email} onLogout={handleLogout} />
    </>
  );
};

export default Dashboard;
