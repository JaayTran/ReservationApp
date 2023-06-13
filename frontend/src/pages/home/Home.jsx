import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ViewContext } from "../../context/ViewContext";
import "./home.css";

const Home = () => {
  const { handleViewChange } = useContext(ViewContext);
  const [password, setPassword] = useState("");
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    // Check if the password is correct (e.g., "admin")
    if (password === "1") {
      handleViewChange("tables", true); // Set adminView to true
      setShowPasswordPopup(false); // Hide the password popup
      window.location.href = "/tables"; // Navigate to /tables
    } else {
      alert("Incorrect password. Please try again."); // Show an error message
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <div>
        <Link to="/tables">
          <div className="home-button">View Tables/Reservations</div>
        </Link>
      </div>
      <div>
        <Link to="/contacts">
          <div className="home-button">View Contacts</div>
        </Link>
      </div>
      <div>
        <div className="home-button" onClick={() => setShowPasswordPopup(true)}>
          Add/Edit Tables
        </div>
      </div>
      {showPasswordPopup && (
        <div className="password-popup">
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
