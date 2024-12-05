import React from "react";
import SidebarHeader from "../components/SidebarHeader/SidebarHeader";
import "../css/home.css";

function Reports() {
  return (
    <SidebarHeader title="Dashboard" companyName="MeetlyAi">
      <div className="home-container">
        <h1>Reports</h1>
      </div>
    </SidebarHeader>
  );
}

export default Reports;
