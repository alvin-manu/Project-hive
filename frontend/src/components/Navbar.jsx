import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is loaded
import icon from "../assets/icon.png";
import { isAuthTokenContext } from "../Context/ContextShare";
import { useContext } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  
      const {isAuthToken, setisAuthToken}= useContext(isAuthTokenContext);
  
  const logout = () => {
    if (sessionStorage.getItem("token")) {
      sessionStorage.removeItem("token");
    }
    if (sessionStorage.getItem("existingUser")) {
      sessionStorage.removeItem("existingUser");
    }
    setisAuthToken(false)
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark  px-4">
        <div className="container-fluid">
          {/* Logo and Brand Name */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={icon}
              alt="ProjectNest Logo"
              className="me-2"
              style={{ width: "30px", height: "30px" }}
            />
            <span className="text-primary fw-bold fs-5">ProjectHive</span>
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/project">
                  Project
                </NavLink>
              </li>
            </ul>

            {/* Right Side - Login & Register */}
            <div className="d-flex ms-lg-3">
              
              {isAuthToken ? (
                <button className="btn btn-primary" onClick={logout}>
                  Logout
                </button>
              ) : (
                <Link to="/login">
                  <button className="btn btn-primary">
                    Login
                  </button>
                </Link> 
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Separator Line */}
      <hr className="m-0 border-secondary" />
    </>
  );
};

export default Navbar;
