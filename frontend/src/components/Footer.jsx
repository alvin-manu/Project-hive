import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaDiscord } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is loaded
import icon from "../assets/icon.png"


const Footer = () => {
  return (
    <>
      {/* Separator Line */}
      <hr className="m-0 border-secondary mb-4" />

      <footer className="bg-dark text-white">
        <div className="container-fluid px-3 px-md-5">
          <div className="row">
            {/* ProjectHive Branding with Logo */}
            <div className="col-lg-3 col-md-6 mb-4 d-flex flex-column align-items-start">
              <div className="d-flex align-items-center">
                <img 
                  src={icon}
                  alt="ProjectHive Logo" 
                  className="me-2"
                  style={{ width: "30px", height: "30px" }} 
                />
                <h4 className="text-primary fw-bold mb-0 fs-5">ProjectHive</h4>
              </div>
              <p className="small mt-2">The Stage for Your Creations</p>
              <p className="small">
                ProjectHive is a platform where developers and creators showcase their work, collaborate, and inspire others.
              </p>
            </div>

            {/* Resources */}
            <div className="col-lg-3 col-md-6 d-md-flex justify-content-center">
              <div>
              <h5 className="text-primary">Resources</h5>
              <ul className="list-unstyled">
                <li><Link to="/explore" className="text-white text-decoration-none">Explore Projects</Link></li>
                <li><Link to="/blog" className="text-white text-decoration-none">Blog & Guides</Link></li>
                <li><Link to="/docs" className="text-white text-decoration-none">API Documentation</Link></li>
                <li><Link to="/faq" className="text-white text-decoration-none">FAQs</Link></li>
              </ul>
              </div>
            </div>

            {/* Community */}
            <div className="col-lg-3 col-md-6 mb-4 d-lg-flex justify-content-center">
              <div>
              <h5 className="text-primary">Community</h5>
              <ul className="list-unstyled">
                <li><a href="https://github.com/ProjectHive" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">GitHub</a></li>
                <li><a href="https://discord.gg/ProjectHive" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">Discord Server</a></li>
                <li><a href="https://twitter.com/ProjectHive" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">Twitter</a></li>
                <li><a href="https://linkedin.com/company/ProjectHive" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">LinkedIn</a></li>
              </ul>
              </div>
            </div>

            {/* Support */}
            <div className="col-lg-3 col-md-6 mb-4 d-md-flex justify-content-center">
              <div>
              <h5 className="text-primary">Support</h5>
              <ul className="list-unstyled">
                <li><Link to="/contact" className="text-white text-decoration-none">Contact Us</Link></li>
                <li><Link to="/report-issue" className="text-white text-decoration-none">Report an Issue</Link></li>
                <li><Link to="/terms" className="text-white text-decoration-none">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-white text-decoration-none">Privacy Policy</Link></li>
              </ul>
            </div>
            </div>
          </div>

          {/* Social Media + Copyright */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 border-top pt-3">
            <p className="mb-0 small">&copy; {new Date().getFullYear()} <span className="text-primary">ProjectHive</span>. All rights reserved.</p>
            
            {/* Social Media Icons */}
            <div>
              <a href="https://github.com/ProjectHive" target="_blank" rel="noopener noreferrer" className="text-white fs-4 mx-2">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/company/ProjectHive" target="_blank" rel="noopener noreferrer" className="text-white fs-4 mx-2">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com/ProjectHive" target="_blank" rel="noopener noreferrer" className="text-white fs-4 mx-2">
                <FaTwitter />
              </a>
              <a href="https://discord.gg/ProjectHive" target="_blank" rel="noopener noreferrer" className="text-white fs-4 mx-2">
                <FaDiscord />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
