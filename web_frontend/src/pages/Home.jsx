import React from 'react';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import donorImage from '../assets/web.png';
import logo2 from '../assets/logo2.png'; // Import your logo image

const Home = () => {
  return (
    <>
      <style>{`
        .home {
          font-family: 'Segoe UI', sans-serif;
          color: #fff;
        }

        /* Header Styles with Logo */
        .header {
          display: flex;
          justify-content: space-between;
          padding: 15px 40px;
          background-color: #fff;
          align-items: center;
            border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

        }

        .logo-container {
          display: flex;
          align-items: center;
        }

        .logo-img {
          height: 60px; /* Adjust based on your logo's aspect ratio */
          width: 60px;
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          font-size: 1rem;
          transition: color 0.3s;
        }

        .nav a:hover {
          color: #d32f2f;
        }

        .request-btn {
          background-color: #d32f2f;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          border: none;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .request-btn:hover {
          background-color: #b71c1c;
        }

        /* Main Section Styles */
        .main-section {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 60px 40px;
          flex-wrap: wrap;
          background-color: #fff; /* Light red background */
        }

        .text-content {
          max-width: 500px;
        }

        .text-content h1 {
          font-size: 2.8rem;
          margin-bottom: 20px;
          line-height: 1.2;
          color: #000;
        }

        .text-content p {
          font-size: 1.1rem;
          margin-bottom: 25px;
          color: #000;
        }

        .app-buttons {
          display: flex;
          gap: 15px;
        }

        .icon-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          border-radius: 25px;
          font-weight: bold;
          cursor: pointer;
          font-size: 0.9rem;
          border: none;
          transition: transform 0.2s;
        }

        .icon-button:hover {
          transform: translateY(-2px);
        }

        .google-btn {
          background-color: #34a853;
          color: white;
        }

        .apple-btn {
          background-color: #000;
          color: white;
        }

        .image-content img {
          max-width: 480px;
          height: auto;
        }

        /* Footer Styles */
        .footer {
          background-color: #E72929;
          color: #fff;
          padding: 40px;
        }

        .footer-columns {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-columns h4 {
          margin-bottom: 15px;
          color: #fff;
          font-size: 1.2rem;
        }

        .footer-columns p {
          margin: 8px 0;
          cursor: pointer;
          transition: color 0.3s;
        }

        .footer-columns p:hover {
          color: #d32f2f;
        }

        .footer-bottom {
          text-align: center;
          font-size: 0.85rem;
          margin-top: 30px;
          color: #fff;
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            padding: 15px;
          }

          .nav {
            margin-top: 15px;
            flex-direction: column;
            gap: 15px;
          }

          .main-section {
            padding: 30px 20px;
            flex-direction: column;
          }

          .text-content {
            margin-bottom: 30px;
            text-align: center;
          }

          .app-buttons {
            justify-content: center;
          }

          .image-content img {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="home">
        <header className="header">
          <div className="logo-container">
            <img src={logo2} alt="Company Logo" className="logo-img" />
          </div>
          <nav className="nav">
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <button className="request-btn">Request Blood</button>
          </nav>
        </header>

        <main className="main-section">
          <div className="text-content">
            <h1>Your Blood, <br />Their Hope</h1>
            <p>A simple way to connect donors with those who need lifesaving blood.</p>
            <div className="app-buttons">
              <button className="icon-button google-btn">
                <FaGooglePlay size={20} /> Google Play
              </button>
              <button className="icon-button apple-btn">
                <FaApple size={20} /> App Store
              </button>
            </div>
          </div>
          <div className="image-content">
            <img src={donorImage} alt="donor illustration" />
          </div>
        </main>

        <footer className="footer">
          <div className="footer-columns">
            <div>
              <h4>Quick Links</h4>
              <p>Dashboard</p>
              <p>Request Blood</p>
              <p>Community</p>
            </div>
            <div>
              <h4>Support</h4>
              <p>Help Center</p>
              <p>Contact Support</p>
              <p>Privacy Policy • Terms</p>
            </div>
          </div>
          <p className="footer-bottom">© 2025 RedAlert. All rights reserved. Version 1.0.0</p>
        </footer>
      </div>
    </>
  );
};

export default Home;