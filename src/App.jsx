import React, { useState, useEffect } from "react";
import "./App.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AdminPage from "./AdminPage";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true" || false
  );
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme());
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isAdmin", isAdmin);
    localStorage.setItem("theme", JSON.stringify(isDarkMode));
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [user, isAdmin, isDarkMode]);

  function getInitialTheme() {
    const storedTheme = JSON.parse(localStorage.getItem("theme"));
    return storedTheme === null ? false : storedTheme;
  }

  const handleSignIn = (userData, isAdminStatus) => {
    setUser(userData);
    setIsAdmin(isAdminStatus);
  };

  const handleSignOut = () => {
    setUser(null);
    setIsAdmin(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="app">
      {user ? (
        isAdmin ? (
          <AdminPage
            user={user}
            onSignOut={handleSignOut}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        ) : (
          <div>
            <h1>Welcome, {user.username}!</h1>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        )
      ) : isSignUp ? (
        <SignUp
          onSignUp={handleSignIn}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          toggleSignUp={toggleSignUp}
        />
      ) : (
        <SignIn
          onSignIn={handleSignIn}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          toggleSignUp={toggleSignUp}
        />
      )}
    </div>
  );
}

export default App;
