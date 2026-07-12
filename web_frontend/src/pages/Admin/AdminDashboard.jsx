
import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend } from "chart.js";
import { API_ROUTES } from "../../config/config";
import axios from "axios";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
 const[requests, setRequests] = useState([]);
 const[adminName, setAdminName] = useState("");
 
  // const handleDownloadReport = (id)=>{
  //   window.open(`${API_ROUTES.BASE_URL}api/admin/hospital-report/${id}`, "_blank");
  // }
  const handleDownloadReport = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_ROUTES.BASE_URL}api/admin/hospital-report/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob" // important for files
    });

    // Create a download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `report_${id}.pdf`); // set file name
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Download failed:", error);
    alert("Failed to download report");
  }
};


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
  useEffect(() => {
  const name = localStorage.getItem("adminName");
  if (name) setAdminName(name);
}, []);
const [stats, setStats] = useState({
  donorCount:0,
  hospitalCount:0,
  pendingRequests:0,
})

const [monthlyData, setMonthlyData] = useState({
    donors: Array(12).fill(0),
    hospitals: Array(12).fill(0),
  });

const [userDistribution, setUserDistribution] = useState({
  labels: ["Donors","Hospitals"],
  data: [0,0],
})

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

 const fetchDashboardStats = async () => {
    try {
      const res = await axios.get(API_ROUTES.GET_DASHBOARD_STATS,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    }
  };

   const fetchMonthlyRegistrations = async () => {
    try {
      const res = await axios.get(API_ROUTES.GET_MONTHLY_REGISTRATION, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMonthlyData(res.data.monthly);
    } catch (err) {
      console.error("Error fetching monthly registrations:", err);
    }
  };

   const fetchUserDistribution = async () => {
    try {
      const res = await axios.get(API_ROUTES.GET_USER_DISTRIBUTION,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUserDistribution(res.data.chartData);
    } catch (err) {
      console.error("Error fetching user distribution:", err);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchMonthlyRegistrations();
    fetchUserDistribution();
  }, []);

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Donor Registrations",
        data: monthlyData.donors,
        borderWidth: 3,
        borderColor: "#FF4D4D",
        tension: 0.4,
      },
      {
        label: "Hospital Registrations",
        data: monthlyData.hospitals,
        borderWidth: 3,
        borderColor: "#190F8A",
        tension: 0.4,
      },
    ],
  };

  const pieData = {
    labels: userDistribution.labels,
    datasets: [
      {
        data: userDistribution.data,
        backgroundColor: ["#FFE2E2", "#5db3ecff"],
        borderWidth: 2,
      },
    ],
  };
 
  return (
    <div style={{ display: "flex", fontFamily: "Poppins, sans-serif",width: "100%", overflowX:'hidden' }}>
      <AdminSideBar />

      <div style={{ paddingLeft: "20px",paddingTop:'20px', paddingBottom:'20px',paddingRight:'35px', width: "100%" }}>
        {/* Greeting */}
        {/* <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>Hello Admin!</h1> */}<h1 style={{ fontSize: "36px", fontWeight: "bold" }}>
  Hello {adminName || "Admin"}!
</h1>

        <p style={{ marginTop: "-10px", color: "#555" }}>Here’s an overview of your platform activity</p>

        {/* Stats Cards */}
        <div style={{ display: "flex", gap: "60px", marginTop: "40px", flexWrap: "wrap",marginLeft:'40px' }}>
          {[
            { title: "Registered Donors", value: stats.donorCount },
            { title: "Registered Hospitals", value: stats.hospitalCount },
            { title: "Pending Requests", value: stats.pendingRequests },
         
          ].map((card, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#FFE2E2",
                borderRadius: "20px",
                padding: "25px",
                width: "250px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ fontSize: "18px", marginBottom: "10px",textAlign:'center' }}>{card.title}</h3>
              <h1 style={{ fontSize: "48px", textAlign: "center", margin: 0 }}>{card.value}</h1>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div style={{ display: "flex", marginTop: "60px", gap: "20px", flexWrap: "wrap", width:'100%',
          overflowX:'auto',
          paddingBottom:'10px' }}>
          {/* Line Chart */}
          <div
            style={{
              width: "55%",
              minWidth: "350px",
              background: "#fff",
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ fontSize: "20px", marginBottom: "20px" }}>Monthly Registrations Trend</h3>
            <Line data={lineData} />
          </div>

          {/* Pie Chart */}
          <div
            style={{
              width: "35%",
              minWidth: "300px",
              background: "#fff",
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ fontSize: "20px", marginBottom: "20px" }}>User Distribution</h3>
            <Pie data={pieData} />
          </div>
        </div>

        {/* Section Title */}
        <h2 style={{ fontSize: "26px", fontWeight: "bold", marginTop: "60px" }}>
          Recent Registration Requests
        </h2>
        <div style={{
          width:'100%',
          overflowX:'auto',
          paddingBottom:'10px',
          marginTop: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          borderRadius: "20px",
          //paddingRight:'30px',
        }}>
           {/* <table
          style={{
            minWidth:"1200px",
            width: "100%",
            marginTop: "20px",
            borderCollapse: "separate",
            borderSpacing: "0 8px",
            background: "transparent",
            // background: "#fff",
            // borderRadius: "10px",
            // overflow: "hidden",
            // boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <thead style={{ backgroundColor: "#fafafa" }}>
            <tr>
              {[
                "Hospital Reg. No",
                "Hospital Name",
                "User Name",
                "Phone",
                "Email",
                "Reg. Doc",
                "Office Letter",
                "Report",
                "Requested Date",
                "Actions",
              ].map((header, i) => (
                <th
                  key={i}
                  style={{
                    padding: "14px",
                    fontSize: "14px",
                    textAlign: "center",
                    backgroundColor: "#f5f5f5",
                    borderRadius: i === 0 ? "10px 0 0 10px" : i === 9 ? "0 10px 10px 0" : 0,
                    whiteSpace: "nowrap",
                    width: "120px",
                    //borderBottom: "1px solid #eee",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <tr 
                key={i} 
                style={{ 
                   background: "#ffffff",
                   borderRadius: "12px",
                   boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                 // borderBottom: "1px solid #eee", 
                   }}>
                  <td style={{padding: "12px", textAlign: "center", width: "auto" }}>A1234567{i}</td>
                  <td style={{padding: "12px", textAlign: "center", width: "auto"}}>City Hospital</td>
                  <td style={{padding: "12px", textAlign: "center", width: "auto"}}>Imalsha</td>
                  <td style={{padding: "12px", textAlign: "center", width: "auto"}}>0712345678</td>
                  <td style={{padding: "12px", textAlign: "center", width: "auto"}}>example@mail.com</td>

                  {["Reg Doc", "Letter", "Report"].map((item, j) => (
                    <td key={j}>
                      <button
                        style={{
                          backgroundColor: "#190F8A",
                          color: "white",
                          border: "none",
                          borderRadius: "15px",
                          padding: "8px 12px",
                          cursor: "pointer",
                        }}
                      >
                        Download
                      </button>
                    </td>
                  ))}

                  <td style={{ padding: "12px", textAlign: "center", width: "auto" }}>2025/10/05</td>

                  <td style={{ padding: "12px", width: "auto" }}>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                      <button
                        style={{
                          backgroundColor: "#28a745",
                          color: "white",
                          padding: "8px 14px",
                          border: "none",
                          borderRadius: "15px",
                          cursor: "pointer",
                        }}
                      >
                        Approve
                      </button>
                      <button
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                          padding: "8px 14px",
                          border: "none",
                          borderRadius: "15px",
                          cursor: "pointer",
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table> */}
         <table style={{
                    minWidth: "900px",
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontFamily: 'poppins',
                   
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
                          requests.filter(req=>req.status ==="pending" && !req.isApproved)
                          .slice(0,5).map((req)=>(
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

        {/* Modern Table */}
       
      </div>
    </div>
  );
};

export default AdminDashboard;


