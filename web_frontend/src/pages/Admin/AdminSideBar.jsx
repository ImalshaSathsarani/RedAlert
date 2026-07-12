import React from 'react'
import logo from '../../assets/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
//import { Cursor } from 'mongoose';

const AdminSideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const linkStyle = {
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '18px',
    color: 'black',
    fontFamily: 'Poppins',
    padding: '10px 15px',
    borderRadius: '8px',
    display: 'block',
    cursor: 'pointer'
  }

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: '#f5b5b5', // darker or highlighted background
  }

  const handleLogout = () =>{
    localStorage.removeItem('token');
    alert("Logged out successfully");
    navigate('/adminLogin');
  }

  return (
    <div>
      <div style={{ width: '250px', height: '100%', backgroundColor: '#FFE3E3', padding: '20px' }}>
        <img
          src={logo}
          alt="logo"
          style={{
            width: '200px',
            height: '200px',
            marginBottom: '10px',
            marginLeft: '10px',
            marginTop: '0px'
          }}
        />
        <ul style={{ listStyle: 'none', padding: '0' }}>
          <li style={{ marginBottom: '30px' }}>
            <Link
              to="/adminDashboard"
              style={location.pathname === '/adminDashboard' ? activeLinkStyle : linkStyle}
            >
              Dashboard
            </Link>
          </li>
           <li style={{ marginBottom: '30px' }}>
            <Link
              to="/registrationRequests"
              style={location.pathname === '/registrationRequests' ? activeLinkStyle : linkStyle}
            >
              Registration Requests
            </Link>
          </li>
          <li style={{ marginBottom: '30px' }}>
            <Link
              to="/adminRegisteredUsers"
              style={location.pathname === '/adminRegisteredUsers' ? activeLinkStyle : linkStyle}
            >
              Registered Users
            </Link>
          </li>
          <li style={{ marginBottom: '30px' }}>
            <Link
              to="/adminRegisteredHospitals"
              style={location.pathname === '/adminRegisteredHospitals' ? activeLinkStyle : linkStyle}
            >
              Registered Hospitals
            </Link>
          </li>
          <li style={{ marginBottom: '30px' }}>
            <Link
              to="/adminInquiries"
              style={location.pathname === '/adminInquiries' ? activeLinkStyle : linkStyle}
            >
              Inquiries
            </Link>
          </li>
           <li style={{ marginBottom: '30px' }}>
            
             <span onClick={handleLogout} style={linkStyle}>Log out</span>
           
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminSideBar
