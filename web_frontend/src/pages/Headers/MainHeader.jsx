import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo2 from '../../assets/logo2.png'
import logo from '../../assets/logo.png'

const MainHeader = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const location = useLocation();

    const toggleSidebar = ()=> setSidebarOpen(!sidebarOpen);

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
      margin:'50px',
      border:'1px solid rgba(180, 57, 41, 0.3)',
      borderRadius:'30px',
      boxShadow:'0 4px 12px rgba(180,57, 41, 0.3)',
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
        <Link to="/dashboard" style={navLinkStyle}>Dashboard</Link>
        <Link to="/community" style={navLinkStyle}>Community</Link>
        <Link to="/profile" style={navLinkStyle}>Profile</Link>
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
            <li style ={{width:'100%'}}><Link to="/dashboard" onClick={toggleSidebar} style={location.pathname ==='/dashboard' ? activeSidebarLinkStyle : sidebarLinkStyle}>Find Donors</Link></li>
            <li style ={{width:'100%'}}><Link to="/community" onClick={toggleSidebar} style={location.pathname ==='/community' ? activeSidebarLinkStyle : sidebarLinkStyle}>Community</Link></li>
            <li style ={{width:'100%'}}><Link to="/profile" onClick={toggleSidebar} style={location.pathname ==='/profile' ? activeSidebarLinkStyle : sidebarLinkStyle}>Profile</Link></li>
            <li style ={{width:'100%'}}><Link to="/dashboard" onClick={toggleSidebar} style={sidebarLinkStyle}>Blood Inventory</Link></li>
            <li style ={{width:'100%'}}><Link to="/dashboard" onClick={toggleSidebar} style={sidebarLinkStyle}>Notification</Link></li>
            <li style ={{width:'100%'}}><Link to="/dashboard" onClick={toggleSidebar} style={sidebarLinkStyle}>Help</Link></li>  
            <li style ={{width:'100%'}}><Link to="/dashboard" onClick={toggleSidebar} style={sidebarLinkStyle}>Logout</Link></li>
          </ul>    
        </div>
    )}
    </>
  );
};

const navLinkStyle = {
  color: 'black',
  textDecoration: 'none',
  fontWeight: '500'
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

export default MainHeader;
