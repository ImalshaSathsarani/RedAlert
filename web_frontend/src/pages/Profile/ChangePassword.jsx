import React from 'react'
import Profile from './Profile'
import SubFooter from '../Footers/SubFooter'

const ChangePassword = () => {
  return (
    <div>
      <Profile/>
      <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', paddingTop:'70px', paddingBottom:'30px'}}>
        <div style={{width:'400px', padding:'40px', borderRadius:'10px', border:'1px solid #B43929', backgroundColor:'#f8f8f8'}}>
          <h2 style={{textAlign:'center'}}>Change Password</h2>
          <form>
            <div style={{marginBottom:'15px'}}>
              <label htmlFor="currentPassword" style={{display:'block', marginBottom:'5px'}}>Current Password</label>
              <input type="password" id="currentPassword" name="currentPassword" required style={{width:'100%', padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}}/>
            </div>
            <div style={{marginBottom:'15px'}}>
              <label htmlFor="newPassword" style={{display:'block', marginBottom:'5px'}}>New Password</label>
              <input type="password" id="newPassword" name="newPassword" required style={{width:'100%', padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}}/>
            </div>
            <div style={{marginBottom:'15px'}}>
              <label htmlFor="confirmPassword" style={{display:'block', marginBottom:'5px'}}>Confirm New Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required style={{width:'100%', padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}}/>
            </div>
            <button type="submit" style={{width:'100%', padding:'15px', backgroundColor:'#B43929', color:'#fff', borderRadius:'5px', border:'none', fontFamily:'poppins', marginTop:'10px', fontWeight:'600',fontSize:'16px',marginLeft:'10px'}}>Change Password</button>
          </form>
        </div>

      </div>
      <SubFooter/>
    </div>
  )
}

export default ChangePassword
