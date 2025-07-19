import React, { useState } from "react";
import "./App.css";

function SignIn({ onSignIn, isDarkMode, toggleDarkMode, toggleSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      const adminUser = { username: "admin"};
      onSignIn(adminUser, true);
    } else if (username === username && password === password) {
      const regularUser = { username: username};
      onSignIn(regularUser, false);
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className={`form-container ${isDarkMode ? "dark-mode" : ""}`}>
      <h1>Sign in</h1>
      {error && <p className="error-message">{error}</p>}
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
        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button type="submit">Sign in</button>
        <a href="#" className="forgot-password">
          Forgot your password?
        </a>
        <div className="or-divider">or</div>
        <div className="social-buttons">
          <button className="google">Sign in with Google</button>
          <button className="facebook">Sign in with Facebook</button>
        </div>
        <div className="signup-link">
          Don't have an account?{" "}
          <a onClick={toggleSignUp} className="signup-link-button">
            Sign up
          </a>
        </div>
      </form>

      <button className="mode-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}

export default SignIn;
