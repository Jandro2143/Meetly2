import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../../css/SidebarHeader.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const SidebarHeader = ({ title, userProfileImage, companyName, children }) => {
  const location = useLocation(); // Get the current location

  return (
    <div className="layout-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="header-logo">{companyName || "MeetlyAI"}</div>
        </div>
        <div className="header-center">
          <input
            className="header-search"
            type="text"
            placeholder="Search for a user"
          />
        </div>
        <div className="header-right">
          <span>Profile</span>
          <img
            className="header-profile-img"
            src={userProfileImage || "https://via.placeholder.com/40"}
            alt="Profile"
          />
        </div>
      </header>

      {/* Sidebar and Content */}
      <div className="main-container">
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li className={location.pathname === "/home" ? "active" : ""}>
              <Link to="/home">
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
            <li className={location.pathname === "/reports" ? "active" : ""}>
              <Link to="/reports">
                <i className="fas fa-chart-line"></i> Reports
              </Link>
            </li>
            <li
              className={location.pathname === "/appointments" ? "active" : ""}
            >
              <Link to="/appointments">
                <i className="fas fa-calendar-alt"></i> Appointments
              </Link>
            </li>
            <li className={location.pathname === "/messages" ? "active" : ""}>
              <Link to="/messages">
                <i className="fas fa-envelope"></i> Messages
              </Link>
            </li>
            <li className={location.pathname === "/settings" ? "active" : ""}>
              <Link to="/settings">
                <i className="fas fa-cog"></i> Settings
              </Link>
            </li>
            <li className={location.pathname === "/help" ? "active" : ""}>
              <Link to="/help">
                <i className="fas fa-question-circle"></i> Help
              </Link>
            </li>
          </ul>
        </aside>
        <div className="content-area">{children}</div>
      </div>
    </div>
  );
};

export default SidebarHeader;
