import React from 'react'

const MainFooter = () => {
  return (
    <div>
        <style>{`
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
        }`}
        </style>
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
  )
}

export default MainFooter
