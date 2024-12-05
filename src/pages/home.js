import React from "react";
import SidebarHeader from "../components/SidebarHeader/SidebarHeader";
import "../css/home.css";

function Home() {
  return (
    <SidebarHeader title="Dashboard" companyName="MeetlyAi">
      <div className="home-container">
        <h1>Welcome to SyncShift</h1>
        <p>Your all-in-one scheduling and management platform.</p>
        <div className="cards">
          <div className="card">
            <h2>Reports</h2>
            <p>Analyze your performance and productivity.</p>
          </div>
          <div className="card">
            <h2>Appointments</h2>
            <p>Manage your schedules and bookings effortlessly.</p>
          </div>
          <div className="card">
            <h2>Messages</h2>
            <p>Communicate with your clients seamlessly.</p>
          </div>
        </div>
      </div>
    </SidebarHeader>
  );
}

export default Home;
