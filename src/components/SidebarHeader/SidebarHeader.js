import React from "react";
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import "../../css/SidebarHeader.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const SidebarHeader = ({ title, userProfileImage, companyName, children }) => {
  const location = useLocation(); // Get the current location
  const { uniqueId } = useParams(); // Extract the unique ID from the URL
  const navigate = useNavigate(); // React Router's navigation hook

  const handleLogout = () => {
    // Clear session storage or any other data
    sessionStorage.clear();

    // Redirect to the sign-in page
    navigate("/sign_in");
  };

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
            <li className={location.pathname === `/home/${uniqueId}` ? "active" : ""}>
              <Link to={`/home/${uniqueId}`}>
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
            <li className={location.pathname === `/reports/${uniqueId}` ? "active" : ""}>
              <Link to={`/reports/${uniqueId}`}>
                <i className="fas fa-chart-line"></i> Reports
              </Link>
            </li>
            <li className={location.pathname === `/appointments/${uniqueId}` ? "active" : ""}>
              <Link to={`/appointments/${uniqueId}`}>
                <i className="fas fa-calendar-alt"></i> Appointments
              </Link>
            </li>
            <li className={location.pathname === `/messages/${uniqueId}` ? "active" : ""}>
              <Link to={`/messages/${uniqueId}`}>
                <i className="fas fa-envelope"></i> Messages
              </Link>
            </li>
            <li className={location.pathname === `/settings/${uniqueId}` ? "active" : ""}>
              <Link to={`/settings/${uniqueId}`}>
                <i className="fas fa-cog"></i> Settings
              </Link>
            </li>
            <li className={location.pathname === `/help/${uniqueId}` ? "active" : ""}>
              <Link to={`/help/${uniqueId}`}>
                <i className="fas fa-question-circle"></i> Help
              </Link>
            </li>
          </ul>
          <button className="logout-button" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </aside>
        <div className="content-area">{children}</div>
      </div>
    </div>
  );
};

export default SidebarHeader;
