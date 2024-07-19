import React from 'react';
import Logo from "../assets/Logo2.png";
import '../styles/footer.css'; // Make sure to create this CSS file
function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-column">
        <div className="footer-logo">
          <img src={Logo}/>
        </div>
      </div>
      <div className="footer-column">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>123 JobAmi Street, Toronto, ON, Canada</p>
          <p>Email: contact@jobami.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-column">
        <div className="footer-section">
          <h3>Legal</h3>
          <p><a href="/terms">Terms of Use</a></p>
          <p><a href="/privacy">Privacy Policy</a></p>
        </div>
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Helping Students Find Part-Time Jobs</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 JobAmi. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
