import React, { useEffect, useState } from 'react';
import AdminSideBar from './AdminSideBar';
import axios from 'axios';
import { API_ROUTES } from '../../config/config';
import { useParams } from 'react-router-dom';

const RegistrationRequests = () => {

  const[requests, setRequests] = useState([]);
  const { id } = useParams();
  const handleDownloadReport = (id)=>{
    window.open(`${API_ROUTES.BASE_URL}api/admin/hospital-report/${id}`, "_blank");
  }

  const handleApprove = async(requestId) =>{
    try{
      const token = localStorage.getItem('token');
      await axios.put(
        API_ROUTES.APPROVE_HOSPITAL_REQUEST(requestId),{},{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        }
      )

      alert("Request approved successfully");
       // Update the requests list locally — remove the approved one
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req._id !== requestId)
      );

    }catch(e){
      console.error("Error approving request:", e.message);
    }
  }
  const handleReject = async(requestId) =>{
    try{
      if(!window.confirm("Are you sure you want to reject this request?")) return;
      const token = localStorage.getItem('token');
      await axios.put(
        API_ROUTES.REJECT_HOSPITAL_REQUEST(requestId),{},{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        }
      )

      alert("Request  rejected");
       // Update the requests list locally — remove the approved one
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req._id !== requestId)
      );

    }catch(e){
      console.error("Error approving request:", e.message);
    }
  }

  useEffect(()=>{
    const fetchRequests = async () =>{
      try{
        const token = localStorage.getItem('token');
        const res = await axios.get(
           API_ROUTES.GET_HOSPITAL_REQUESTS,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
           },
        )
        if(res.data.success){
          setRequests(res.data.data);
          console.log("Fetched Registration Requests:", res.data.data);
        }
      }catch(e){
        console.error("Error fetching registration requests:", e.message);
      }
    }
    fetchRequests();
  }, [])

  console.log("Registration Requests State:", requests);
  return (
    <div style={{ display: 'flex', fontFamily: 'poppins' }}>
      
      <AdminSideBar />
      
      <div style={{ paddingLeft: 20, paddingTop: 80, width: '100%' }}>
        
        <div style={{ fontSize: 24, fontWeight: 'bold',marginTop:10 }}>
          Registration Requests
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
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Hospital Registration Number</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Hospital Name</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>User Name</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>User Phone Number</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>User Email</th>
                
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Registration Document</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Office Letter</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Report</th>
                 <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Requested Date</th>
                 <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold',textAlign:'center' }}>Actions</th>
              </tr>
            </thead>
            
              <tbody>
                {requests.length > 0 ? (
                  requests.map((req)=>(
                  <tr key={req._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>{req.registrationNumber}</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>{req.hospitalName}</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>{req.name}</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>{req.phone}</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>{req.email}</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>
                     <a 
                     href={`${API_ROUTES.BASE_URL}${req.registrationDocument}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     style={{ 
                      backgroundColor: '#190f8aff', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '20px', 
                      padding: '12px 12px', 
                      cursor: 'pointer', 
                      fontFamily:'poppins',
                      textDecoration:'none' }}>
                        Download</a>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
                    <a
                    href={`${API_ROUTES.BASE_URL}${req.officeLetter}`}
                    target="_blank"
                    rel="noopener noreferrer" 
                    style={{ 
                      backgroundColor: '#190f8aff', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '20px', 
                      padding: '12px 12px', 
                      cursor: 'pointer', 
                      fontFamily:'poppins',
                      textDecoration:'none'  }}>
                        Download</a>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>
                    <button 
                     onClick={() => handleDownloadReport(req._id)}
                    style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>{new Date(req.createdAt).toLocaleDateString()}</td>
                  {/* <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>

                      <button 
                      onClick={() => handleApprove(req._id)}
                      style={{ backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Approve</button>
                    <button 
                     onClick={()=>handleReject(req._id)}
                    style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Reject</button>
                    </div>
                    
                  </td> */}
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
    {req.status === 'rejected' ? (
      // Show only the rejected button
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
        Rejected
      </button>
    ) : (
      // Otherwise show both Approve & Reject
      <>
        <button
          onClick={() => handleApprove(req._id)}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '12px 12px',
            cursor: 'pointer',
            fontFamily: 'poppins'
          }}
        >
          Approve
        </button>
        <button
          onClick={() => handleReject(req._id)}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '12px 12px',
            cursor: 'pointer',
            fontFamily: 'poppins'
          }}
        >
          Reject
        </button>
      </>
    )}
  </div>
</td>

                </tr>

                  ))
                ):(
                   <tr>
                  <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                    No pending requests.
                  </td>
                </tr>
                )}
               
                 {/* <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>A12345678</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>1234567890</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>example@example.com</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>
                     <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
                    <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>
                    <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>05/10/2025</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Approve</button>
                    <button style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Reject</button>
                    </div>
                    
                  </td>
                </tr>
                 <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>A12345678</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>1234567890</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>example@example.com</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>
                     <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
                    <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>
                    <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>05/10/2025</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Approve</button>
                    <button style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Reject</button>
                    </div>
                    
                  </td>
                </tr>
                 <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>A12345678</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>1234567890</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>example@example.com</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>
                     <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
                    <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>
                    <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>05/10/2025</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Approve</button>
                    <button style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Reject</button>
                    </div>
                    
                  </td>
                </tr> */}

                
              </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default RegistrationRequests
