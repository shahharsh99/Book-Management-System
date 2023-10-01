import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ProtectedRoutes, { isTokenGenerated } from "./routes/ProtectedRoutes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Helmet } from "react-helmet";

const App: React.FC = () => {
  const isLoggedIn = isTokenGenerated();

  return (
    <>
      <Helmet>
        <title>Book Management System</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/flowbite@1.5.3/dist/flowbite.min.css"
        />
        <script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
      </Helmet>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route
              path="/signup"
              element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />}
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
