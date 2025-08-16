// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// export default function RequestDetailsPage() {
//   const { id } = useParams();
//   const [request, setRequest] = useState(null);
//   const [donors, setDonors] = useState([]);
//   const [searchClicked, setSearchClicked] = useState(false); // NEW

//   useEffect(() => {
//     axios.get(`http://localhost:8000/api/request/blood-requests/${id}`)
//       .then(res => setRequest(res.data))
//       .catch(err => console.error(err));
//   }, [id]);

//   const findDonors = () => {
//     setSearchClicked(true); // Mark that user clicked the button
//     axios.get(`http://localhost:8000/api/request/donors/find/${id}`)
//       .then(res => setDonors(res.data))
//       .catch(err => console.error(err));
//   };
 
//   const sendNotification = (donorId) => {
//      console.log("Sending Notification:", {
//     userId: donorId,
//     title: "Urgent Blood Request",
//     message: `You are a matching donor for a patient needing ${request.bloodType} blood.`,
//     bloodType: request.bloodType,
//     requestId: request._id,
//   });
//   axios.post('http://localhost:8000/api/notifications/send', {
//     userId: donorId,
//     title: "Urgent Blood Request",
//     message: `You are a matching donor for a patient needing ${request.bloodType} blood. Please respond if you're available.`,
//     bloodType: request.bloodType,
//     requestId: request._id
//   })
//   .then(() => {
//     alert('Notification sent to donor.');
//   })
//   .catch(err => {
//     console.error(err);
//     alert('Failed to send notification.');
//   });
// };


//   if (!request) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>Request Details</h2>
//       <p>Patient: {request.patientName}</p>
//       <p>Blood Type: {request.bloodType}</p>
//       <button onClick={findDonors}>Find Donors</button>

//       {searchClicked && (
//         <div>
//           <h3>Eligible Donors</h3>

//           {donors.length === 0 ? (
//             <p style={{ color: 'red' }}>No matching donors found.</p>
//           ) : (
//             <ul>
//               {donors.map(donor => (
//                 <li key={donor._id}>
//                   <p>Name: {donor.name}</p>
//                   <p>Blood Type: {donor.bloodType}</p>
//                   <p>Mobile: {donor.mobileNo}</p>
//                   <p>Location: {donor.location}</p>
//                   <button onClick={() => sendNotification(donor._id)}>Send Notification</button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainHeader from "./Headers/MainHeader";
import SubFooter from "./Footers/SubFooter";

export default function RequestDetailsPage() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [donors, setDonors] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  
   const hospitalId = localStorage.getItem("hospitalId");
  useEffect(() => {
    axios
      .get(`http://redalert-production.up.railway.app/api/request/blood-requests/${id}`)
      .then((res) => setRequest(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const findDonors = () => {
    setSearchClicked(true);
    axios
      .get(`http://redalert-production.up.railway.app/api/request/donors/find/${id}`)
      .then((res) => setDonors(res.data))
      .catch((err) => console.error(err));
  };

  const sendNotification = (donorId) => {
    axios
      .post("http://redalert-production.up.railway.app/api/notifications/send", {
        userId: donorId,
        hospitalId,
        title: "Urgent Blood Request",
        message: `You are a matching donor for a patient needing ${request.bloodType} blood. Please respond if you're available.`,
        bloodType: request.bloodType,
        requestId: request._id,
      })
      .then(() => {
        alert("Notification sent to donor.");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to send notification.");
      });
  };

  if (!request) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <>
      <MainHeader/>
      <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "40px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, color: "#E72929", marginBottom: 20 }}>Blood Request Details</h2>
          <div
            style={{
              backgroundColor: "#fff",
              padding: 24,
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              marginBottom: 30,
            }}
          >
            <p style={{ fontSize: 18 }}>
              <strong>Patient:</strong> {request.patientName}
            </p>
            <p style={{ fontSize: 18 }}>
              <strong>Blood Type:</strong> {request.bloodType}
            </p>
            <button
              onClick={findDonors}
              style={{
                marginTop: 20,
                backgroundColor: "#E72929",
                color: "white",
                padding: "10px 18px",
                borderRadius: 8,
                border: "none",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Find Matching Donors
            </button>
          </div>

          {searchClicked && (
            <div>
              <h3 style={{ fontSize: 22, color: "#333", marginBottom: 20 }}>Eligible Donors</h3>

              {donors.length === 0 ? (
                <p style={{ color: "#888", fontSize: 16 }}>No matching donors found.</p>
              ) : (
                <div style={{ display: "grid", gap: 20 }}>
                  {donors.map((donor) => (
                    <div
                      key={donor._id}
                      style={{
                        backgroundColor: "#fff",
                        padding: 20,
                        borderRadius: 10,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <p>
                        <strong>Name:</strong> {donor.name}
                      </p>
                      <p>
                        <strong>Blood Type:</strong> {donor.bloodType}
                      </p>
                      <p>
                        <strong>Mobile:</strong> {donor.mobileNo || "N/A"}
                      </p>
                      <p>
                        <strong>Location:</strong> {donor.location || "Unknown"}
                      </p>
                      <button
                        onClick={() => sendNotification(donor._id)}
                        style={{
                          marginTop: 10,
                          backgroundColor: "#E72929",
                          color: "white",
                          padding: "8px 14px",
                          borderRadius: 8,
                          border: "none",
                          fontSize: 14,
                          cursor: "pointer",
                          alignSelf: "flex-start",
                        }}
                      >
                        Send Notification
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <SubFooter/>
    </>
  );
}
