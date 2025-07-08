import React, { useState } from 'react'
import MainHeader from '../Headers/MainHeader'
import { FaEdit, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout =() =>{
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path;
  return (
    <div>
      <MainHeader/>
      <div style ={{ backgroundColor:'#B43929', width:'100%', height:'250px', position:'relative'}}>
        <div style={{ position:'absolute', top: '20px', right:'40px', display:'flex',gap:'20px'}}>
          <Link to="/editProfile"><FaEdit size={22} color='white' style={{cursor:'pointer'}}/></Link>
          <FaSignOutAlt size={22} color='white' style={{cursor:'pointer'}} onClick ={()=> setShowLogoutModal(true)}></FaSignOutAlt>

        </div>
        <h1 style ={{color:'white', paddingLeft:'40px', paddingTop:'20px',marginBottom:'4px', fontSize:'50px',fontFamily:'poppins',fontWeight:'600'}}>Hospital Profile</h1>
        <p style ={{color:'white', paddingLeft:'40px',fontFamily:'poppins'}}>Update your hospital’s information, contact details, and request settings.</p>
        <div style={{ position: 'absolute', bottom: '0px', left: '1200px', right: '40px', height: '220px',  width:'220px',top:'110px',backgroundColor: 'white', borderRadius: '100%', border:'1px solid #B43929', display:'flex', justifyContent:'center', alignItems:'center' }}>
          <FaUser size={100} color="#B43929" />
        </div>
        <div style ={{ position:'absolute', bottom:'10px', left:'100px', right:'40px', height:'60px', display:'flex', alignItems:'flex-end', gap:'60px'}}> 
  <NavTab to ="/profileDetails" label="Profile Details" active={isActive('/profileDetails')}/>
   <NavTab to="/requestHistory" label="Request History" active={isActive("/requestHistory")} />
          
          <NavTab to="/changePassword" label="Change Password" active={isActive("/changePassword")} />


</div>
      </div>
{showLogoutModal && (
   <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            width: '300px',
            textAlign: 'center',
            fontFamily: 'Poppins'
          }}>
            <p style={{ marginBottom: '20px', fontSize: '16px', fontFamily: 'Poppins' }}>Are you sure you want to logout?</p>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 20px',
                  backgroundColor: '#B43929',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontFamily: 'Poppins',
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                style={{
                  padding: '8px 20px',
                  backgroundColor: '#ccc',
                  color: 'black',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontFamily: 'Poppins',
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
)}
      
    </div>
  )
}

const NavTab = ({ to, label, active}) =>(
  <div style = {{ display:'flex', flexDirection:'column', alignItems:'center'}}>
     <Link
    to={to}
    style={{
      ...navLinkStyle,
      ...(active ? activeTabStyle : {}),
    }}
  >
    {label}
  </Link>
  </div>
)

const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
   padding: '10px 16px',
  fontFamily: 'Poppins',
  fontSize: '18px',
  transition: 'all 0.3s ease',
   borderRadius: '6px',
};

const activeTabStyle ={
  backgroundColor: '#912e22', // darker red
  fontWeight: '600',
  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
}

export default Profile
