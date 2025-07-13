import React from 'react'
import Profile from './Profile'

import logo2 from '../../assets/logo2.png';
import SubFooter from '../Footers/SubFooter';

const ProfileDetails = () => {
  return (
    <div>
     <Profile/> 
<div style={{paddingTop:'70px', paddingLeft:'70px', paddingRight:'70px',paddingBottom:'30px'}} >
  <div style={{display:'flex', flexDirection:'row', gap:'60px'}}>
      <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
    <div style={{backgroundColor:'#f8f8f8', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px',paddingBottom:'10px',borderRadius:'10px',border:'1px solid #B43929', width:'300px'}}>
      <p><strong>Name:</strong> General Hospital Colombo</p>
    </div>
     <div style={{backgroundColor:'#f8f8f8', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px',paddingBottom:'10px',borderRadius:'10px',border:'1px solid #B43929', width:'300px'}}>
      <p><strong>Registration Number:</strong> 123456789</p>
    </div>
     <div style={{backgroundColor:'#f8f8f8', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px',paddingBottom:'10px',borderRadius:'10px',border:'1px solid #B43929', width:'300px'}}>
      <p><strong>City:</strong> Colombo</p>
    </div>
    
  </div>
   <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
    <div style={{backgroundColor:'#f8f8f8', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px',paddingBottom:'10px',borderRadius:'10px',border:'1px solid #B43929', width:'300px'}}>
      <p><strong>Type:</strong> Government</p>
    </div>
     <div style={{backgroundColor:'#f8f8f8', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px',paddingBottom:'10px',borderRadius:'10px',border:'1px solid #B43929', width:'300px'}}>
      <p><strong>Address:</strong> 123 Main St, Colombo</p>
    </div>
     <div style={{backgroundColor:'#f8f8f8', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px',paddingBottom:'10px',borderRadius:'10px',border:'1px solid #B43929', width:'300px'}}>
      <p><strong>Phone Number:</strong> 0123456789</p>
    </div>
    
  </div>
  <img src={logo2} alt="Logo2" style={{width:'150px', height:'150px', marginTop:'160px',marginLeft:'400px'}}/>

  </div>

 

</div>
     <SubFooter/>
    </div>
  )
}

export default ProfileDetails
