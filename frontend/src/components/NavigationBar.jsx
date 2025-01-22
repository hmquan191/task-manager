import React from "react";
import { Link } from "react-router-dom";
import "./styles/NavigationBar.css";

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h3 className="logo">Todo App</h3>
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/tasks" className="navbar-link">
              Tasks
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
