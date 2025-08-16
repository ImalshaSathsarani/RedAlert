// import React, {  useEffect,useState } from "react";
// import { CheckCircle, ArrowLeft } from "react-feather";
// import { useNavigate } from "react-router-dom";
// import image1 from "../assets/image1.png";
// import axios from "axios";

// const Notification = () => {
  
//   const [notifications, setNotifications] = useState([]);
//   const [selectedNotification, setSelectedNotification] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();


//    const hospitalId = "YOUR_HOSPITAL_ID_HERE";

//   const handleViewDetails = (notification) => {
//     setSelectedNotification(notification);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/notifications/hospital/${hospitalId}`);
//         setNotifications(res.data);
//       } catch (err) {
//         console.error("Failed to fetch notifications", err);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   return (
//     <div style={{ backgroundColor: 'white', minHeight: "100vh" }}>
//       {/* Header */}
//       <div style={{ width: "100%", height: 200, backgroundColor: "#E72929" }}>
//         <div style={{ paddingTop: 30, paddingLeft: 30 }}>
//           <button
//             onClick={() => navigate(-1)}
//             style={{
//               background: "transparent",
//               border: "none",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               color: "white",
//               fontSize: 18,
//               marginBottom: 10,
//               marginLeft: 20
//             }}
//           >
//             <ArrowLeft size={24} color="white" />
//           </button>
//           <h1 style={{ color: "white", fontSize: 36, fontWeight: "bold", marginLeft: 30 }}>
//             Notification
//           </h1>
//           <p style={{ color: "white", fontSize: 18, marginLeft: 30, marginTop: 20 }}>
//             See received blood request
//           </p>
//         </div>
//       </div>

//       {/* Card 1 */}
//             <div
//                 style={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     justifyContent: "center",
//                     gap: 10,
//                     padding: "20px 40px",
//                 }}
//             >  
//             <div
//                 style={{
//                 width: "100%",
//                 height: 60,
//                 backgroundColor: "white",
//                 borderRadius: 15,
//                 padding: 30,
//                 boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
//                 marginLeft:60,
//                 marginRight:60,
//                 marginTop:30
//                 }}
//             >
//             <div style={{ display: "flex", alignItems: "center" }}>
//                 <img
//                     src={image1}
//                     alt="profile"
//                     style={{
//                     width: 60,
//                     height: 60,
//                     borderRadius: "50%",
//                     marginRight: 20,
//                     }}
//                 />
//                 <div
//                     style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-start",
//                     flex: 1,
//                     }}
//                 >
//                     <div style={{ flex: 1 }}>
//                       <div style={{ display: "flex", alignItems: "center", gap: 6,marginLeft:10 }}>
//                         <CheckCircle color="green" size={18} />
//                         <span style={{ color: "green", fontWeight: "bold", fontSize: 18,marginLeft:10 }}>
//                           Accepted
//                         </span>
//                         <span style={{ color: "#777", fontSize: 14, marginLeft: 30}}>
//                           1h ago
//                         </span>
//                       </div>
//                       <div
//                         style={{
//                           color: "#777",
//                           fontSize: 16,
//                           marginTop: 8,
//                           marginLeft:10
//                         }}
//                       >
//                         Kierra Fanci
//                       </div>
//                     </div>

//                     <button
//                     style={{
//                         marginTop: 25,
//                         backgroundColor: "#E72929",
//                         borderRadius: 20,
//                         padding: "8px 14px",
//                         border: "none",
//                         color: "white",
//                         fontSize: 14,
//                         cursor: "pointer",
//                         marginLeft:10
//                     }}
//                     onClick={handleViewDetails}
//                     >
//                     View Details
//                     </button>
//                     <div
//                     style={{
//                         color: "#000",
//                         fontWeight: "bold",
//                         fontSize: 18,
//                         marginLeft: 15,
//                     }}
//                     >
//                     O+
//                     </div>
//                 </div>
//             </div>

//             </div>
//             </div>
            
//             {/* Modal Popup */}
//       {showModal && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0, left: 0, right: 0, bottom: 0,
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 1000
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: 'white',
//               padding: 30,
//               borderRadius: 20,
//               width: '400px',
//               boxShadow: '0 0 20px rgba(0,0,0,0.2)',
//               position: 'relative'
//             }}
//           >
//             <h2 style={{ color: '#E72929', marginBottom: 10 }}>Blood Request Details</h2>
//             <p><strong>Donor:</strong> Kierra Fanci</p>
//             <p><strong>Blood Group:</strong> O+</p>
//             <p><strong>Status:</strong> Accepted</p>
//             <p><strong>Accepted Time:</strong> 1 hour ago</p>
//             <p><strong>Contact No:</strong> 0123456789</p>

//             <button
//               onClick={handleCloseModal}
//               style={{
//                 position: 'absolute',
//                 top: 20,
//                 right: 25,
//                 backgroundColor: 'transparent',
//                 border: 'none',
//                 fontSize: 24,
//                 cursor: 'pointer',
//                 color: '#888'
//               }}
//               aria-label="Close"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
   
//       {/* Card 2 */}
//       <div
//                 style={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     justifyContent: "center",
//                     gap: 10,
//                     padding: "20px 40px",
//                 }}
//             >  
//             <div
//                 style={{
//                 width: "100%",
//                 height: 60,
//                 backgroundColor: "white",
//                 borderRadius: 15,
//                 padding: 30,
//                 boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
//                 marginLeft:60,
//                 marginRight:60,
//                 }}
//             >
//             <div style={{ display: "flex", alignItems: "center" }}>
//                 <img
//                     src={image1}
//                     alt="profile"
//                     style={{
//                     width: 60,
//                     height: 60,
//                     borderRadius: "50%",
//                     marginRight: 20,
//                     }}
//                 />
//                 <div
//                     style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-start",
//                     flex: 1,
//                     }}
//                 >
//                     <div style={{ flex: 1 }}>
//                       <div style={{ display: "flex", alignItems: "center", gap: 6,marginLeft:10 }}>
//                         <CheckCircle color="green" size={18} />
//                         <span style={{ color: "green", fontWeight: "bold", fontSize: 18,marginLeft:10 }}>
//                           Accepted
//                         </span>
//                         <span style={{ color: "#777", fontSize: 14, marginLeft: 30}}>
//                           1h ago
//                         </span>
//                       </div>
//                       <div
//                         style={{
//                           color: "#777",
//                           fontSize: 16,
//                           marginTop: 8,
//                           marginLeft:10
//                         }}
//                       >
//                         Kierra Fanci
//                       </div>
//                     </div>

//                     <button
//                     style={{
//                         marginTop: 25,
//                         backgroundColor: "#E72929",
//                         borderRadius: 20,
//                         padding: "8px 14px",
//                         border: "none",
//                         color: "white",
//                         fontSize: 14,
//                         cursor: "pointer",
//                         marginLeft:10
//                     }}
//                     onClick={handleViewDetails}
//                     >
//                     View Details
//                     </button>
//                     <div
//                     style={{
//                         color: "#000",
//                         fontWeight: "bold",
//                         fontSize: 18,
//                         marginLeft: 15,
//                     }}
//                     >
//                     O+
//                     </div>
//                 </div>
//             </div>

//             </div>
//             </div>
            
//             {/* Modal Popup */}
//       {showModal && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0, left: 0, right: 0, bottom: 0,
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 1000
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: 'white',
//               padding: 30,
//               borderRadius: 20,
//               width: '400px',
//               boxShadow: '0 0 20px rgba(0,0,0,0.2)',
//               position: 'relative'
//             }}
//           >
//             <h2 style={{ color: '#E72929', marginBottom: 10 }}>Blood Request Details</h2>
//             <p><strong>Donor:</strong> Kierra Fanci</p>
//             <p><strong>Blood Group:</strong> O+</p>
//             <p><strong>Status:</strong> Accepted</p>
//             <p><strong>Accepted Time:</strong> 1 hour ago</p>
//             <p><strong>Contact No:</strong> 0123456789</p>

//             <button
//               onClick={handleCloseModal}
//               style={{
//                 position: 'absolute',
//                 top: 20,
//                 right: 25,
//                 backgroundColor: 'transparent',
//                 border: 'none',
//                 fontSize: 24,
//                 cursor: 'pointer',
//                 color: '#888'
//               }}
//               aria-label="Close"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Card 3 */}
//       <div
//                 style={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     justifyContent: "center",
//                     gap: 10,
//                     padding: "20px 40px",
//                 }}
//             >  
//             <div
//                 style={{
//                 width: "100%",
//                 height: 60,
//                 backgroundColor: "white",
//                 borderRadius: 15,
//                 padding: 30,
//                 boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
//                 marginLeft:60,
//                 marginRight:60,
//                 }}
//             >
//             <div style={{ display: "flex", alignItems: "center" }}>
//                 <img
//                     src={image1}
//                     alt="profile"
//                     style={{
//                     width: 60,
//                     height: 60,
//                     borderRadius: "50%",
//                     marginRight: 20,
//                     }}
//                 />
//                 <div
//                     style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-start",
//                     flex: 1,
//                     }}
//                 >
//                     <div style={{ flex: 1 }}>
//                       <div style={{ display: "flex", alignItems: "center", gap: 6,marginLeft:10 }}>
//                         <CheckCircle color="green" size={18} />
//                         <span style={{ color: "green", fontWeight: "bold", fontSize: 18,marginLeft:10 }}>
//                           Accepted
//                         </span>
//                         <span style={{ color: "#777", fontSize: 14, marginLeft: 30}}>
//                           1h ago
//                         </span>
//                       </div>
//                       <div
//                         style={{
//                           color: "#777",
//                           fontSize: 16,
//                           marginTop: 8,
//                           marginLeft:10
//                         }}
//                       >
//                         Kierra Fanci
//                       </div>
//                     </div>

//                     <button
//                     style={{
//                         marginTop: 25,
//                         backgroundColor: "#E72929",
//                         borderRadius: 20,
//                         padding: "8px 14px",
//                         border: "none",
//                         color: "white",
//                         fontSize: 14,
//                         cursor: "pointer",
//                         marginLeft:10
//                     }}
//                     onClick={handleViewDetails}
//                     >
//                     View Details
//                     </button>
//                     <div
//                     style={{
//                         color: "#000",
//                         fontWeight: "bold",
//                         fontSize: 18,
//                         marginLeft: 15,
//                     }}
//                     >
//                     O+
//                     </div>
//                 </div>
//             </div>

//             </div>
//             </div>
            
//             {/* Modal Popup */}
//       {showModal && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0, left: 0, right: 0, bottom: 0,
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 1000
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: 'white',
//               padding: 30,
//               borderRadius: 20,
//               width: '400px',
//               boxShadow: '0 0 20px rgba(0,0,0,0.2)',
//               position: 'relative'
//             }}
//           >
//             <h2 style={{ color: '#E72929', marginBottom: 10 }}>Blood Request Details</h2>
//             <p><strong>Donor:</strong> Kierra Fanci</p>
//             <p><strong>Blood Group:</strong> O+</p>
//             <p><strong>Status:</strong> Accepted</p>
//             <p><strong>Accepted Time:</strong> 1 hour ago</p>
//             <p><strong>Contact No:</strong> 0123456789</p>

//             <button
//               onClick={handleCloseModal}
//               style={{
//                 position: 'absolute',
//                 top: 20,
//                 right: 25,
//                 backgroundColor: 'transparent',
//                 border: 'none',
//                 fontSize: 24,
//                 cursor: 'pointer',
//                 color: '#888'
//               }}
//               aria-label="Close"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}


//       {/* Card 4 */}
//       <div
//                 style={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     justifyContent: "center",
//                     gap: 10,
//                     padding: "20px 40px",
//                 }}
//             >  
//             <div
//                 style={{
//                 width: "100%",
//                 height: 60,
//                 backgroundColor: "white",
//                 borderRadius: 15,
//                 padding: 30,
//                 boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
//                 marginLeft:60,
//                 marginRight:60,
//                 }}
//             >
//             <div style={{ display: "flex", alignItems: "center" }}>
//                 <img
//                     src={image1}
//                     alt="profile"
//                     style={{
//                     width: 60,
//                     height: 60,
//                     borderRadius: "50%",
//                     marginRight: 20,
//                     }}
//                 />
//                 <div
//                     style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-start",
//                     flex: 1,
//                     }}
//                 >
//                     <div style={{ flex: 1 }}>
//                       <div style={{ display: "flex", alignItems: "center", gap: 6,marginLeft:10 }}>
//                         <CheckCircle color="green" size={18} />
//                         <span style={{ color: "green", fontWeight: "bold", fontSize: 18,marginLeft:10 }}>
//                           Accepted
//                         </span>
//                         <span style={{ color: "#777", fontSize: 14, marginLeft: 30}}>
//                           1h ago
//                         </span>
//                       </div>
//                       <div
//                         style={{
//                           color: "#777",
//                           fontSize: 16,
//                           marginTop: 8,
//                           marginLeft:10
//                         }}
//                       >
//                         Kierra Fanci
//                       </div>
//                     </div>

//                     <button
//                     style={{
//                         marginTop: 25,
//                         backgroundColor: "#E72929",
//                         borderRadius: 20,
//                         padding: "8px 14px",
//                         border: "none",
//                         color: "white",
//                         fontSize: 14,
//                         cursor: "pointer",
//                         marginLeft:10
//                     }}
//                     onClick={handleViewDetails}
//                     >
//                     View Details
//                     </button>
//                     <div
//                     style={{
//                         color: "#000",
//                         fontWeight: "bold",
//                         fontSize: 18,
//                         marginLeft: 15,
//                     }}
//                     >
//                     O+
//                     </div>
//                 </div>
//             </div>

//             </div>
//             </div>
            
//             {/* Modal Popup */}
//       {showModal && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0, left: 0, right: 0, bottom: 0,
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 1000
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: 'white',
//               padding: 30,
//               borderRadius: 20,
//               width: '400px',
//               boxShadow: '0 0 20px rgba(0,0,0,0.2)',
//               position: 'relative'
//             }}
//           >
//             <h2 style={{ color: '#E72929', marginBottom: 10 }}>Blood Request Details</h2>
//             <p><strong>Donor:</strong> Kierra Fanci</p>
//             <p><strong>Blood Group:</strong> O+</p>
//             <p><strong>Status:</strong> Accepted</p>
//             <p><strong>Accepted Time:</strong> 1 hour ago</p>
//             <p><strong>Contact No:</strong> 0123456789</p>

//             <button
//               onClick={handleCloseModal}
//               style={{
//                 position: 'absolute',
//                 top: 20,
//                 right: 25,
//                 backgroundColor: 'transparent',
//                 border: 'none',
//                 fontSize: 24,
//                 cursor: 'pointer',
//                 color: '#888'
//               }}
//               aria-label="Close"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
          

 
//     </div>
//   );
// };

// export default Notification;


import React, { useEffect, useState } from "react";
import { CheckCircle, ArrowLeft, Clock, XCircle } from "react-feather";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image1.png";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [sentNotifications, setSentNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("inbox");

  const navigate = useNavigate();

  // TODO: Replace with actual hospital ID from login or context
  const hospitalId = localStorage.getItem("hospitalId") ;

  const handleViewDetails = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `http://redalert-production.up.railway.app/api/notifications/hospital/${hospitalId}`
        );
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchSentNotifications = async () => {
      try {
        const res = await axios.get(
          `http://redalert-production.up.railway.app/api/notifications/hospital/sentbox/${hospitalId}`
        );
        setSentNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };

    fetchSentNotifications();
  }, []);

const sentBoxNotifications = sentNotifications.filter(
  (n) => n.status === "pending"
);

console.log("Sentbox notifications", sentBoxNotifications);
  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ width: "100%", height: 200, backgroundColor: "#E72929" }}>
        <div style={{ paddingTop: 30, paddingLeft: 30 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              color: "white",
              fontSize: 18,
              marginBottom: 10,
              marginLeft: 20,
            }}
          >
            <ArrowLeft size={24} color="white" />
          </button>
          <h1
            style={{
              color: "white",
              fontSize: 36,
              fontWeight: "bold",
              marginLeft: 30,
            }}
          >
            Notification
          </h1>
          <p
            style={{
              color: "white",
              fontSize: 18,
              marginLeft: 30,
              marginTop: 20,
            }}
          >
            See received blood request
          </p>
        </div>
      </div>


     <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
  <button
    onClick={() => setActiveTab("inbox")}
    style={{
      padding: "10px 300px",
      backgroundColor: activeTab === "inbox" ? "#E72929" : "#f0f0f0",
      color: activeTab === "inbox" ? "white" : "#333",
      border: "none",
      borderRadius: "10px 0 0 10px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Inbox
  </button>
  <button
    onClick={() => setActiveTab("sentbox")}
    style={{
      padding: "10px 300px",
      backgroundColor: activeTab === "sentbox" ? "#E72929" : "#f0f0f0",
      color: activeTab === "sentbox" ? "white" : "#333",
      border: "none",
      borderRadius: "0 10px 10px 0",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Sentbox
  </button>
</div>
 

      {/* Notification Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          padding: "30px 60px",
        }}
      >
        {(activeTab === "inbox"? notifications : sentBoxNotifications).length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>No {activeTab} notifications yet.</p>
        ) : (
          (activeTab === "inbox"? notifications:sentBoxNotifications).map((notification, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                borderRadius: 15,
                padding: 30,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* <img
                  src={image1}
                  alt="profile"
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    marginRight: 20,
                  }}
                /> */}
                {
  notification.userId?.profilePicture ? (
    <img
      src={`http://redalert-production.up.railway.app${notification.userId.profilePicture}`}
      alt="Donor Profile"
      style={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        marginRight: 20,
        objectFit: "cover",
      }}
    />
  ) : (
    <FaUserCircle
      size={60}
      color="#ccc"
      style={{
        marginRight: 20,
      }}
    />
  )
}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flex: 1,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginLeft: 10,
                      }}
                    >
                      {/* <CheckCircle
                        color={notification.status === "accepted" ? "green" : "red"}
                        size={18}
                      />
                      <span
                        style={{
                          color:
                            notification.status === "accepted" ? "green" : "red",
                          fontWeight: "bold",
                          fontSize: 18,
                          marginLeft: 10,
                        }}
                      >
                        {notification.status.charAt(0).toUpperCase() +
                          notification.status.slice(1)}
                      </span> */}
                      {notification.status === "accepted" && (
  <>
    <CheckCircle color="green" size={18} />
    <span style={{ color: "green", fontWeight: "bold", fontSize: 18, marginLeft: 10 }}>
      Accepted
    </span>
  </>
)}

{notification.status === "pending" && (
  <>
    <Clock color="blue" size={18} /> {/* Or use an info or clock icon */}
    <span style={{ color: "blue", fontWeight: "bold", fontSize: 18, marginLeft: 10 }}>
      Pending
    </span>
  </>
)}

{notification.status === "declined" && (
  <>
    <XCircle color="red" size={18} />
    <span style={{ color: "red", fontWeight: "bold", fontSize: 18, marginLeft: 10 }}>
      Declined
    </span>
  </>
)}

                      <span
                        style={{
                          color: "#777",
                          fontSize: 14,
                          marginLeft: 30,
                        }}
                      >
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div
                      style={{
                        color: "#777",
                        fontSize: 16,
                        marginTop: 8,
                        marginLeft: 10,
                      }}
                    >
                      {notification.title}
                    </div>
                  </div>

                  <button
                    style={{
                      marginTop: 25,
                      backgroundColor: "#E72929",
                      borderRadius: 20,
                      padding: "8px 14px",
                      border: "none",
                      color: "white",
                      fontSize: 14,
                      cursor: "pointer",
                      marginLeft: 10,
                    }}
                    onClick={() => handleViewDetails(notification)}
                  >
                    View Details
                  </button>

                  {/* <div
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: 18,
                      marginLeft: 15,
                    }}
                  >
                    {notification.bloodType}
                  </div> */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Popup */}
      {showModal && selectedNotification && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: 30,
              borderRadius: 20,
              width: "400px",
              boxShadow: "0 0 20px rgba(0,0,0,0.2)",
              position: "relative",
            }}
          >
            <h2 style={{ color: "#E72929", marginBottom: 10 }}>
              Blood Request Details
            </h2>
            <p>
              <strong>Donor:</strong> {selectedNotification.userId?.name}
            </p>
            <p>
              <strong>Blood Group:</strong> {selectedNotification.bloodType}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedNotification.status.charAt(0).toUpperCase() +
                selectedNotification.status.slice(1)}
            </p>
            <p>
              <strong>Accepted Time:</strong>{" "}
              {new Date(selectedNotification.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Message:</strong> {selectedNotification.message}
            </p>
             <p>
              <strong>Contact Number:</strong> {selectedNotification.userId?.mobileNo}
            </p>

            <button
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: 20,
                right: 25,
                backgroundColor: "transparent",
                border: "none",
                fontSize: 24,
                cursor: "pointer",
                color: "#888",
              }}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
