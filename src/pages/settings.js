import React, { useState, useEffect } from "react";
import SidebarHeader from "../components/SidebarHeader/SidebarHeader";
import "../css/settings.css"; // Use a dedicated CSS file for Settings

function Settings() {
  const [apiKey, setApiKey] = useState(null);

  const fetchApiKey = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        alert("User ID is missing. Please sign in again.");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/get_api_key/${userId}`);
      const data = await response.json();

      if (response.ok) {
        if (data.apiKey) {
          setApiKey(data.apiKey); // Set the fetched API Key
        }
      } else {
        console.error("Error fetching API Key:", data.message);
      }
    } catch (error) {
      console.error("Error fetching API Key:", error);
    }
  };

  const generateApiKey = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        alert("User ID is missing. Please sign in again.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/generate_api_key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (response.ok) {
        setApiKey(data.apiKey);
        alert("API Key generated successfully!");
      } else {
        alert(data.message || "Error generating API Key.");
      }
    } catch (error) {
      console.error("Error generating API key:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Fetch the API Key when the component mounts
  useEffect(() => {
    fetchApiKey();
  }, []);

  return (
    <SidebarHeader title="Settings" companyName="MeetlyAi">
      <div className="settings-container">
        <h1>Settings</h1>
        <div className="api-key-section">
          <h2>API Key for Calendar</h2>
          {apiKey ? (
            <div className="api-key-display">
              <p>Your API Key:</p>
              <code>{apiKey}</code>
              <button onClick={generateApiKey}>Regenerate API Key</button>
            </div>
          ) : (
            <button onClick={generateApiKey}>Generate API Key</button>
          )}
        </div>
      </div>
    </SidebarHeader>
  );
}

export default Settings;
