
import React from "react";
import './Footer.css';
import { FaLinkedin } from "react-icons/fa";


function Footer() {
  return (
    <div className="footer-main">
          <div className="footer-brand">
            <span className="copyright">© 2023 Pursuit Software. All rights reserved.</span>
          </div>
          <div className="footer-links">
            <a href="https://www.pursuitsoftware.com/" target="_blank" rel="noopener noreferrer">
              Visit our website
            </a>
            <a href="https://www.linkedin.com/company/pursuit-software/" target="_blank" rel="noopener noreferrer">
              {/* <img src={LinkedIn_Logo} alt=" LinkedIn"  /> */}
              <FaLinkedin  className="linkedin-icon"/>   
            </a>
          </div>
    </div>
  );
}

export default Footer;

