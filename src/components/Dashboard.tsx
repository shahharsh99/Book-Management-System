import React from "react";
import Header from "./common/Header";
import { useNavigate } from "react-router-dom";
import BooksList from "./Books/BooksList";

const Dashboard: React.FC = () => {
  const navigate: Function = useNavigate();
  const email = localStorage.getItem("auth")?.toString();
  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("auth");
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <>
      <Header email={email} onLogout={handleLogout} />
      <BooksList />
    </>
  );
};

export default Dashboard;
