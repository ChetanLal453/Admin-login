
import React, { useState } from "react";
import "./App.css";

function SignUp({ onSignUp, isDarkMode, toggleDarkMode, toggleSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const request = window.indexedDB.open("usersDB", 1);

    request.onerror = (event) => {
      console.error("Database open error:", event.target.errorCode);
      setError("Database error occurred.");
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      console.log("onupgradeneeded called");
      if (!db.objectStoreNames.contains("users")) {
        console.log("Creating users object store");
        db.createObjectStore("users", { keyPath: "username" });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      console.log("Database opened successfully");

      function addUser(currentDb) {
        const transaction = currentDb.transaction(["users"], "readwrite");
        const objectStore = transaction.objectStore("users");

        transaction.oncomplete = () => {
          console.log("Transaction completed");
        };

        transaction.onerror = (event) => {
          console.error("Transaction error: ", event.target.error);
          setError("Database error occurred.");
        };

        const addRequest = objectStore.add({
          username: username,
          password: password,
        });

        addRequest.onsuccess = () => {
          console.log("User registered successfully!");
          setSuccessMessage("Signup successful!");
          onSignUp({ username }, () => {
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setError("");
            toggleSignUp();
            setSuccessMessage("");
          });
        };

        addRequest.onerror = (event) => {
          console.error("Error adding user:", event.target.errorCode);
          console.error("Error details:", event.target.error);
          if (event.target.errorCode === 11) {
            setError("Username already exists.");
          } else {
            setError(
              "An error occurred during registration. Error Code:" +
                event.target.errorCode +
                " Error: " +
                event.target.error.message
            );
          }
        };
      }
      if (!db.objectStoreNames.contains("users")) {
        console.log("Object store DOES NOT exist. Creating now.");
        const version = db.version;

        const upgradeRequest = window.indexedDB.open("usersDB", version + 1);

        upgradeRequest.onupgradeneeded = (upgradeEvent) => {
          const upgradeDb = upgradeEvent.target.result;
          console.log("onupgradeneeded (upgrade request) called");
          if (!upgradeDb.objectStoreNames.contains("users")) {
            console.log("Creating users object store (in upgrade request)");
            upgradeDb.createObjectStore("users", { keyPath: "username" });
          }
        };

        upgradeRequest.onerror = (upgradeEvent) => {
          console.error("Upgrade request error: ", upgradeEvent.target.error);
          setError("Database error occurred.");
        };

        upgradeRequest.onsuccess = (upgradeEvent) => {
          const upgradeDb = upgradeEvent.target.result;
          console.log("Object store created. Now adding user.");
          addUser(upgradeDb); 
        };
      } else {
        console.log("Object store exists, calling addUser");
        addUser(db); 
      }
    };
  };

  return (
    <div className={`form-container ${isDarkMode ? "dark-mode" : ""}`}>
      <h1>Sign Up</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">User</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
        <span onClick={toggleSignUp} className="signup-link-button">
          Already have an account? Sign In
        </span>
      </form>
    </div>
  );
}

export default SignUp;
