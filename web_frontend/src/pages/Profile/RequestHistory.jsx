// import React from 'react'
// import Profile from './Profile'
// import MainFooter from '../Footers/MainFooter';
// import check from '../../assets/check.png';
// import logo2 from '../../assets/logo2.png'

// const RequestHistory = () => {
//   return (
//     <div>
//      <Profile/>
//   <div style={{paddingTop:'70px', paddingLeft:'70px', paddingRight:'70px',paddingBottom:'30px', display:'flex', flexDirection:'column', gap:'20px'}} >

//     <div style={{display:'flex', flexDirection:'row', gap:'20px', border:'1px solid #B43929', borderRadius:'10px', padding:'20px', height:'90px', width:'800px',cursor:'pointer'}}>
//       <div style={{ border:'1px solid #B43929' , color:'black',backgroundColor:'#FFBFBF', width:'80px', height:'80px', borderRadius:'10px'}}><p style={{textAlign:'center',fontWeight:'600', fontFamily:'poppins', fontSize:'30px', marginTop:'18px'}}>A+</p></div>
//       <div style={{display:'flex', flexDirection:'column',paddingBottom:'10px', justifyContent:'center'}}>
//         <p style={{fontFamily:'poppins', fontSize:'16px',marginTop:'20px'}}><strong>Name:</strong> A.B.C.Perera</p>
//         <p style={{fontFamily:'poppins', fontSize:'16px', marginTop:0}}><strong>Date:</strong> 2023-10-01</p>
//         <p style={{fontFamily:'poppins', fontSize:'16px', marginTop:0}}><strong>Status:</strong> Pending</p>
//       </div>

//     </div>

//     <div style={{display:'flex', flexDirection:'row', gap:'20px', border:'1px solid #B43929', borderRadius:'10px', padding:'20px', height:'90px', width:'800px', cursor:'pointer'}}>
//       <div style={{ border:'1px solid #B43929' , color:'black',backgroundColor:'#FFBFBF', width:'80px', height:'80px', borderRadius:'10px'}}><p style={{textAlign:'center',fontWeight:'600', fontFamily:'poppins', fontSize:'30px', marginTop:'18px'}}>A+</p></div>
//       <div style={{display:'flex', flexDirection:'column',paddingBottom:'10px', justifyContent:'center'}}>
//         <p style={{fontFamily:'poppins', fontSize:'16px',marginTop:'20px'}}><strong>Name:</strong> A.B.C.Perera</p>
//         <p style={{fontFamily:'poppins', fontSize:'16px', marginTop:0}}><strong>Date:</strong> 2023-10-01</p>
//         <p style={{fontFamily:'poppins', fontSize:'16px', marginTop:0}}><strong>Status:</strong> Pending</p>
//       </div>

//     </div>

//     <div style={{display:'flex', flexDirection:'row', gap:'20px', border:'1px solid #B43929', borderRadius:'10px', padding:'20px', height:'90px', width:'800px', cursor:'pointer'}}>
//       <div style={{ border:'1px solid #B43929' , color:'black',backgroundColor:'#FFBFBF', width:'80px', height:'80px', borderRadius:'10px'}}><p style={{textAlign:'center',fontWeight:'600', fontFamily:'poppins', fontSize:'30px', marginTop:'18px'}}>A+</p></div>
//       <div style={{display:'flex', flexDirection:'column',paddingBottom:'10px', justifyContent:'center'}}>
//         <p style={{fontFamily:'poppins', fontSize:'16px',marginTop:'20px'}}><strong>Name:</strong> A.B.C.Perera</p>
//         <p style={{fontFamily:'poppins', fontSize:'16px', marginTop:0}}><strong>Date:</strong> 2023-10-01</p>
//         <div style={{display:'flex', flexDirection:'row', gap:'5px'}}>
//           <p style={{fontFamily:'poppins', fontSize:'16px', marginTop:0}}><strong>Status:</strong> Completed</p>
//           <img src={check} alt="check" style={{ width:'20px', height:'20px',marginTop:'3px'}}/>
//         </div>

//       </div>

//     </div>

//   </div>

//      <MainFooter/>
//     </div>
//   )
// }

// export default RequestHistory

import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import axios from "axios";

import check from "../../assets/check.png";
import SubFooter from "../Footers/SubFooter";

const RequestHistory = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT token from localStorage or cookies
        const response = await axios.get(
          "http://redalert-production.up.railway.app/api/request/hospital-requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleCardClick = (requestData) => {
    setSelectedRequest(requestData);
  };

  const closeModal = () => setSelectedRequest(null);
  return (
    <div>
      <Profile />
      <div
        style={{
          paddingTop: "70px",
          paddingLeft: "70px",
          paddingRight: "70px",
          paddingBottom: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {requests.map((req, index) => (
          <RequestCard
            key={index}
            name={req.name}
            date={new Date(req.date).toLocaleDateString()}
            status={req.status}
            bloodType="A+" // Replace with actual blood group if available
            onClick={handleCardClick}
            showCheck={req.status.toLowerCase() === "completed"}
          />
        ))}
      </div>

      {selectedRequest && (
        <RequestModal request={selectedRequest} onClose={closeModal} />
      )}
      <SubFooter />
    </div>
  );
};

const RequestCard = ({
  name,
  date,
  status,
  bloodType,
  showCheck = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    border: "1px solid #B43929",
    borderRadius: "10px",
    padding: "20px",
    height: "90px",
    width: "800px",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    transform: isHovered ? "translateY(-5px)" : "translateY(0)",
    boxShadow: isHovered ? "0 4px 8px rgba(0,0,0,0.2)" : "none",
  };

  const requestData = { name, date, status, bloodType, showCheck };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(requestData)}
    >
      <div
        style={{
          border: "1px solid #B43929",
          color: "black",
          backgroundColor: "#FFBFBF",
          width: "80px",
          height: "80px",
          borderRadius: "10px",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontWeight: "600",
            fontFamily: "poppins",
            fontSize: "30px",
            marginTop: "18px",
          }}
        >
          {bloodType}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "10px",
          justifyContent: "center",
        }}
      >
        <p
          style={{ fontFamily: "poppins", fontSize: "16px", marginTop: "20px" }}
        >
          <strong>Name:</strong> {name}
        </p>
        <p style={{ fontFamily: "poppins", fontSize: "16px", marginTop: 0 }}>
          <strong>Date:</strong> {date}
        </p>
        <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <p style={{ fontFamily: "poppins", fontSize: "16px", marginTop: 0 }}>
            <strong>Status:</strong> {status}
          </p>
          {showCheck && (
            <img
              src={check}
              alt="check"
              style={{ width: "20px", height: "20px", marginTop: "3px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestHistory;

const RequestModal = ({ request, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          width: "600px",

          fontFamily: "Poppins",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
        <h3 style={{ color: "#B43929", textAlign: "center" }}>
          Request Details
        </h3>
        <p>
          <strong> Patient Name:</strong> {request.name}
        </p>
        <p>
          <strong>Date:</strong> {request.date}
        </p>
        <p>
          <strong>Status:</strong> {request.status}
        </p>
        <p>
          <strong>Blood Group:</strong> {request.bloodType}
        </p>
        <p>
          <strong>Patient Address:</strong> 123 Main St, Colombo
        </p>
        <p>
          <strong>Patient Phone Number:</strong> 0123456789
        </p>
        <p>
          <strong>Patient Medical Condition:</strong> Hypertension
        </p>
        <p>
          <strong>Urgency Level:</strong> High
        </p>
        <p>
          <strong>Donor Name:</strong> A.B.C.Perera
        </p>
        <p>
          <strong>Donor Contact:</strong> 071-2345678
        </p>
        <p>
          <strong>Donor Address:</strong> 123 Main St, Colombo
        </p>
      </div>
    </div>
  );
};
