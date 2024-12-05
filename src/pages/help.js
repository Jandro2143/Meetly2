import React from "react";
import SidebarHeader from "../components/SidebarHeader/SidebarHeader";
import "../css/home.css";

function Help() {
  return (
    <SidebarHeader title="Dashboard" companyName="MeetlyAi">
      <div className="home-container">
        <h1>Help</h1>
      </div>
    </SidebarHeader>
  );
}

export default Help;
