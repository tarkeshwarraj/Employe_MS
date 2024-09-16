import { useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/Dashboard.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Header from "./components/Header.jsx";
import Profile from "./pages/Profile.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Attendance from "./pages/Attendance.jsx";

function App() {
  const location = useLocation(); //get the current location

  //Determine whether to show the sidebar
  const showSidebar =
    location.pathname === "/dashboard" ||
    location.pathname === "/profile" ||
    location.pathname === "/attendance";

  return (
    <div className="app-layout w-full h-full">
      <Header />
      <div className="grid grid-cols-[1fr] md:grid-cols-[auto_1fr] h-[calc(100vh-5rem)]">
        {showSidebar && <Sidebar />} {/* Conditionally render Sidebar */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<DashBoard />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route
            path="/attendance"
            element={<PrivateRoute element={<Attendance />} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
