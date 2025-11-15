import React, { useEffect, useState } from 'react';
import AdminSideBar from './AdminSideBar';
import axios from 'axios';
import { API_ROUTES } from '../../config/config';

const RegisteredUsers = () => {
  const [bloodDonors, setBloodDonors] = useState([]);
  

  useEffect(()=> {
    const fetchBloodDonors = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          API_ROUTES.GET_BLOOD_DONORS,{
            headers:{
              Authorization: `Bearer ${token}`,
            }
          },
        )
         if(res.data.success){
          setBloodDonors(res.data.data);
          console.log("Fetched Blood donors:", res.data.data);
         }
        }catch(e){
          console.error("Error fetching blood donors:", e);
        }
      }
      fetchBloodDonors();
      
  
  },[]);

  const handleDownload = async (donorId) =>{
    try{
    //   const token = localStorage.getItem('token');
    //   console.log(`${API_ROUTES.DOWNLOAD_DONOR_REPORT}/${donorId}`);

    //   const response = await axios.get(`{API_ROUTES.DOWNLOAD_DONOR_REPORT}${donorId}`,{
    //     headers:{
    //       Authorization: `Bearer ${token}`,
    //     },
    //     responseType:'blob',
    //   });

    //   // Create a file download
    // const url = window.URL.createObjectURL(new Blob([response.data]));
    // const link = document.createElement("a");
    // link.href = url;
    // link.setAttribute("download", `donor-report-${donorId}.pdf`);
    // document.body.appendChild(link);
    // link.click();
    window.open(`${API_ROUTES.BASE_URL}api/admin/donor-report/${donorId}`, "_blank");



    }catch(e){
      console.error("Error downloading donor report:",e)
    }
  }

  const handleDelete = async (donorId)=>{
    try{
        const confirmDelete = window.confirm("Are you sure you want to delete this donor?");
    if (!confirmDelete) return; 
       const token = localStorage.getItem('token');
       await axios.put(
        API_ROUTES.DELETE_DONOR(donorId),{},{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        }
       )
       alert("Donor deleted successfully");

       setBloodDonors((prev)=>
      prev.map((donor)=>
      donor._id === donorId ? { ...donor, status: "inactive" } : donor
      )
    );
    }catch(e){
      console.error("Error deleting donor:",e)
    }
  }
  return (
    <div style={{ display: 'flex', fontFamily: 'poppins' }}>
      
      <AdminSideBar />
      
      <div style={{ paddingLeft: 100, paddingTop: 80, width: '100%' }}>
        
        <div style={{ fontSize: 24, fontWeight: 'bold',marginTop:10 }}>
          Registered Users (Blood Donors)
        </div>

        <div>
          <table style={{
            width: '80%',
            borderCollapse: 'collapse',
            fontFamily: 'poppins',
            marginTop: 40
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f9f9f9', textAlign: 'left' }}>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Name</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Email</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Phone Number</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Is the user available</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Registered Date</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>History</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Delete User</th>
              </tr>
            </thead>
            
              <tbody>
               {bloodDonors.map((donor)=>(
                 <tr  key = {donor._id}style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>{donor.name}</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>{donor.email}</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px',textAlign:'center' }}>{donor.contactNumber ? donor.contactNumber:"-"}</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>{donor.isAvailable?"Yes":"No"}</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>{donor.createdAt ? new Date(donor.createdAt).toLocaleDateString():"Not Available"}</td>
                  <td style={{ padding: '12px 12px', fontSize: '14px',textAlign:'center'}}>
                    <button 
                    onClick = {()=> handleDownload(donor._id)}
                    style={{ 
                      backgroundColor: '#190f8aff', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '20px', 
                      padding: '12px 12px', 
                      cursor: 'pointer', 
                      fontFamily:'poppins' }}>Download</button></td>
                   <td style={{ padding: '12px 12px', fontSize: '14px',textAlign:'center'}}>
                    {donor.status == "inactive"?(
                      <button
        disabled
        style={{
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          padding: '12px 12px',
          fontFamily: 'poppins',
          opacity: 0.7,
          cursor: 'not-allowed'
        }}
      >
        Deleted
      </button>
                    ):(
                        <button 
                        onClick={()=>handleDelete(donor._id)}
                        style={{ backgroundColor: '#8a0f15ff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Delete</button>
                    )}
                    
                   </td>
                
                </tr>
               ))}
                 
                 
                
              </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default RegisteredUsers
