import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo2 from '../../assets/logo2.png'
import logo from '../../assets/logo.png'

const MainHeader = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const location = useLocation();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const toggleSidebar = ()=> setSidebarOpen(!sidebarOpen);

    const handleLogoutClick = () => {
  setSidebarOpen(false); // close sidebar
  setShowLogoutConfirm(true); // show popup
};

const handleLogoutConfirm = () => {
  setShowLogoutConfirm(false);
  // Perform logout logic here (e.g. clear auth, redirect)
  window.location.href = "/"; // or use navigate('/')
};

const handleLogoutCancel = () => {
  setShowLogoutConfirm(false);
};

    useEffect(()=>{
      const handleClickOutSide = (event) =>{
        if(sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setSidebarOpen(false)
        }
      }

      if(sidebarOpen){
        document.addEventListener('mousedown', handleClickOutSide);

      }else{
        document.removeEventListener('mousedown', handleClickOutSide);
      }
    }, [sidebarOpen])
  return (
    <>
    <header style={{
      backgroundColor: 'white',
      padding: '5px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Poppins',
      color: 'black',
      margin:'35px',
      border:'1px solid rgba(61, 50, 48, 0.3)',
      borderRadius:'40px',
      boxShadow:'0 4px 12px rgba(92, 17, 7, 0.3)',
      position:'relative',
      zIndex: 1
      
    }}>

        <div style={{
            display:'flex',
            alignItems:'center',
            gap:'20px'
        }}>
            <div 
                onClick={toggleSidebar}
                style={{
                fontSize:'28px',
                cursor:'pointer',
                color:'#B43928',
                userSelect:'none'
            }}>
                &#9776;

            </div>
            <img src={logo2} alt="logo2" style={{
    height:'100px',
    width:'100px'
 }}>
 </img>
        </div>
     
<nav style={{
  display: 'flex',
  gap: '30px',
  fontSize: '16px'
}}>
  <Link
    to="/dashboard"
    style={{
      ...navLinkStyle,
      ...(location.pathname === '/dashboard' ? activeNavLinkStyle : {})
    }}
  >
    Dashboard
  </Link>

  <Link
    to="/community"
    style={{
      ...navLinkStyle,
      ...(location.pathname === '/community' ? activeNavLinkStyle : {})
    }}
  >
    Community
  </Link>

  <Link
    to="/profileDetails"
    style={{
      ...navLinkStyle,
      ...(location.pathname === '/profileDetails' || location.pathname === '/editProfile' || location.pathname === '/changePassword' || location.pathname === '/requestHistory' ? activeNavLinkStyle : {})
    }}
  >
    Profile
  </Link>
</nav>

 
      
    </header>

    {sidebarOpen && (
        <div ref={sidebarRef}
            style={{
            position:'fixed',
            top:'0',
            left:'0',
            width:'300px',
            height:'100%',
            backgroundColor:'#B43929',
            padding:'20px',
            zIndex:2,
            fontFamily:'Poppins',
            opacity:'92%'
        }}>
        
        <div style={{
          display:'flex',
          alignItems:'center',
          flexDirection:'row',
          gap:'10px'
        }}>
          <img src={logo} alt="logo" style={{
            height:'50px',
            width:'50px',
            borderRadius:'50%',
            
            marginRight:'10px'
          }}/>
           <h1 style ={{
            fontSize:'24px',
            color:'white',
           }}>Colombo General Hospital</h1>  
        </div>
        

        
          <ul style={{ listStyle: 'none', padding: 0, margin:0, display:'flex', flexDirection:'column', gap:'20px',paddingTop:'20px' }}>
            <li style ={{width:'100%'}}><Link to="/dashboard" onClick={toggleSidebar} style={location.pathname ==='/dashboard' ? activeSidebarLinkStyle : sidebarLinkStyle}>Dashboard</Link></li>
            <li style ={{width:'100%'}}><Link to="/request-blood" onClick={toggleSidebar} style={location.pathname ==='/request-blood' ? activeSidebarLinkStyle : sidebarLinkStyle}>Request Blood</Link></li>
            <li style ={{width:'100%'}}><Link to="/dashboard" onClick={toggleSidebar} style={location.pathname ==='/dashboard' ? activeSidebarLinkStyle : sidebarLinkStyle}>My Requests</Link></li>
            <li style ={{width:'100%'}}><Link to="/findDonors" onClick={toggleSidebar} style={location.pathname ==='/findDonors' ? activeSidebarLinkStyle : sidebarLinkStyle}>Find Donors</Link></li>
            <li style ={{width:'100%'}}><Link to="/community" onClick={toggleSidebar} style={location.pathname ==='/community' ? activeSidebarLinkStyle : sidebarLinkStyle}>Community</Link></li>
            <li style ={{width:'100%'}}><Link to="/profileDetails" onClick={toggleSidebar} style={location.pathname ==='/profileDetails' || location.pathname ==='/editProfile' || location.pathname ==='/changePassword' || location.pathname ==='/requestHistory' ? activeSidebarLinkStyle : sidebarLinkStyle}>Profile</Link></li>
            <li style ={{width:'100%'}}><Link to="/dashboard" onClick={toggleSidebar} style={sidebarLinkStyle}>Blood Inventory</Link></li>
            <li style ={{width:'100%'}}><Link to="/notification" onClick={toggleSidebar} style={sidebarLinkStyle}>Notification</Link></li>
            <li style ={{width:'100%'}}><Link to="/dashboard" onClick={toggleSidebar} style={sidebarLinkStyle}>Help</Link></li>  
            <li style={{ width: '100%' }}>
  <span onClick={handleLogoutClick} style={{ ...sidebarLinkStyle, cursor: 'pointer' }}>Logout</span>
</li>

          </ul>    
        </div>
    )}
    {showLogoutConfirm && (
  <LogoutConfirmation
    onConfirm={handleLogoutConfirm}
    onCancel={handleLogoutCancel}
  />
)}

    </>
  );
};

const navLinkStyle = {
  color: 'black',
  textDecoration: 'none',
  fontWeight: '600',
  fontFamily: 'Poppins',
  fontSize: '18px',
 
};

const sidebarLinkStyle = {
  display: 'block',
  color: 'white',
  textDecoration: 'none',
  fontWeight: '500',
  padding: '12px 20px',
  width:'100%',
  boxSizing: 'border-box',
  
};

const activeSidebarLinkStyle ={
  ...sidebarLinkStyle,
  backgroundColor:'#670404',
  borderRadius: '10px',
}

const activeNavLinkStyle = {
  borderBottom: '3px solid #B43929',
  paddingBottom: '8px'
};

const LogoutConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div style={popupOverlayStyle}>
      <div style={popupBoxStyle}>
        <p style={{ fontSize: '18px', fontFamily: 'Poppins' }}>Are you sure you want to log out?</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button onClick={onCancel} style={cancelButtonStyle}>Cancel</button>
          <button onClick={onConfirm} style={confirmButtonStyle}>Logout</button>
        </div>
      </div>
    </div>
  );
};

const popupOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999
};

const popupBoxStyle = {
  backgroundColor: 'white',
  padding: '25px 30px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  width: '320px'
};

const cancelButtonStyle = {
  padding: '10px 15px',
  backgroundColor: '#ccc',
  border: 'none',
  borderRadius: '5px',
  fontFamily: 'Poppins',
  cursor: 'pointer'
};

const confirmButtonStyle = {
  padding: '10px 15px',
  backgroundColor: '#B43929',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontFamily: 'Poppins',
  cursor: 'pointer'
};


export default MainHeader;
