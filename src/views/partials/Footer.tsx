import React from "react";
import "../../styles/Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="col-lg-3 col-md-6 footer-info">
            <h3>Movie</h3>
            <p>We keep you up to date with the latest movies.</p>
          </div>
          <div className="col-lg-3 col-md-6 footer-contact">
            <h4>Contact</h4>
            <p>
              Elvis Bonilla
              <br />
              Venezuela
              <br />
              Tachira
            </p>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/elvis-bonilla-312a071b2/"
                className="linkein"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/ElvisBonilla" className="github">
                <i className="fab fa-github-square"></i>
              </a>
              <a
                href="https://www.instagram.com/elelvisdaniel/"
                className="instagram"
              >
                <i className="fa fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="copyright">
        &copy; Copyright <strong>Movie</strong>. All Rights Reserved
      </div>
    </div>
  </footer>
);
export default Footer;
