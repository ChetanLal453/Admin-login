import React from "react";
import "./App.css";

function AdminPage({ username, onSignOut, isDarkMode, toggleDarkMode }) {
  return (
    <div className={`form-container ${isDarkMode ? "dark-mode" : ""}`}>
      <h1>Welcome To Admin Page</h1>
      <button onClick={onSignOut} className="mode-toggle">
        Sign Out
      </button>
    </div>
  );
}

export default AdminPage;
