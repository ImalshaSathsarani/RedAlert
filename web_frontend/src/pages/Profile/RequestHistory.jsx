

// import React, { useState, useEffect } from "react";
// import Profile from "./Profile";
// import axios from "axios";

// import check from "../../assets/check.png";
// import SubFooter from "../Footers/SubFooter";
// import { API_ROUTES } from "../../config/config";

// const RequestHistory = () => {
//   const [requests, setRequests] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState(null);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const token = localStorage.getItem("token"); // JWT token from localStorage or cookies
//         const response = await axios.get(
//          API_ROUTES.REQUEST_HISTORY,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setRequests(response.data.data);
//         console.log("Requests fetched:", response.data.data);
//       } catch (error) {
//         console.error("Error fetching requests:", error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const handleCardClick = (requestData) => {
//     setSelectedRequest(requestData);
//   };

//   const closeModal = () => setSelectedRequest(null);
//   return (
//     <div>
//       <Profile />
//       <div
//         style={{
//           paddingTop: "70px",
//           paddingLeft: "70px",
//           paddingRight: "70px",
//           paddingBottom: "30px",
//           display: "flex",
//           flexDirection: "column",
//           gap: "20px",
//         }}
//       >
//         {requests.map((req, index) => (
//           <RequestCard
//             key={index}
//             request={req}
//             onClick={handleCardClick}
//             showCheck={req.status.toLowerCase() === "completed"}
//           />
//         ))}
//       </div>

//       {selectedRequest && (
//         <RequestModal 
//         request={selectedRequest} 
//         onClose={closeModal} 
//          onUpdateRequest={(updatedRequest) => {
//     setRequests((prev) =>
//       prev.map((req) =>
//         req._id === updatedRequest._id ? updatedRequest : req
//       )
//     );
//   }}/>
//       )}
//       <SubFooter />
//     </div>
//   );
// };

// const RequestCard = ({
//   request,
//   showCheck = false,
//   onClick,
// }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const cardStyle = {
//     display: "flex",
//     flexDirection: "row",
//     gap: "20px",
//     border: "1px solid #B43929",
//     borderRadius: "10px",
//     padding: "20px",
//     height: "90px",
//     width: "800px",
//     cursor: "pointer",
//     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//     transform: isHovered ? "translateY(-5px)" : "translateY(0)",
//     boxShadow: isHovered ? "0 4px 8px rgba(0,0,0,0.2)" : "none",
//   };

//   //const requestData = {id, name, date, status, bloodType, showCheck };

//   return (
//     <div
//       style={cardStyle}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={() => onClick(request)}
//     >
//       <div
//         style={{
//           border: "1px solid #B43929",
//           color: "black",
//           backgroundColor: "#FFBFBF",
//           width: "80px",
//           height: "80px",
//           borderRadius: "10px",
//         }}
//       >
//         <p
//           style={{
//             textAlign: "center",
//             fontWeight: "600",
//             fontFamily: "poppins",
//             fontSize: "30px",
//             marginTop: "18px",
//           }}
//         >
//           {request.bloodType}
//         </p>
//       </div>

//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           paddingBottom: "10px",
//           justifyContent: "center",
//         }}
//       >
//         <p
//           style={{ fontFamily: "poppins", fontSize: "16px", marginTop: "20px" }}
//         >
//           <strong>Name:</strong> {request.hospitalName}
//         </p>
//         <p style={{ fontFamily: "poppins", fontSize: "16px", marginTop: 0 }}>
//           <strong> Requested Date:</strong> {new Date(request.requestDate).toLocaleDateString()}
//         </p>
//         <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
//           <p style={{ fontFamily: "poppins", fontSize: "16px", marginTop: 0 }}>
//             <strong>Status:</strong> {request.status}
//           </p>
//           {showCheck && (
//             <img
//               src={check}
//               alt="check"
//               style={{ width: "20px", height: "20px", marginTop: "3px" }}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestHistory;


// const RequestModal = ({ request, onClose, onUpdateRequest }) => {
//   const [search, setSearch] = useState("");
//   const [donors, setDonors] = useState([]);
//   const [selectedDonor, setSelectedDonor] = useState(null);
//   const [loading, setLoading] = useState(false);

//   //Debounce timeout reference
//   let debounceTimeout;

//   useEffect(()=>{
//     clearTimeout(debounceTimeout);

//     if(search.trim() === ""){
//       setDonors([]);
//       return;
//     }

//     debounceTimeout = setTimeout(async ()=>{
//       try{
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`${API_ROUTES.SEARCH_DONORS}?search=${search}`, {
//           headers:{ Authorization: `Bearer ${token}` }
//         });
//         setDonors(response.data.data);
//         console.log("Donors found", response.data.data);
//       }catch(e){
//         console.log("Error searching donors", e);
//       } finally{
//         setLoading(false);
//       }
//     }, 500)
//     return () => clearTimeout(debounceTimeout);
//   },[search]);

//   //Mark request as completed with donor
//   const handleCompleteRequest = async () =>{
//     if(!selectedDonor){
//       alert("Please select a donor");
//       return;
//     }
//     try{
//       console.log("Request object:", request);
//       console.log("Request ID:", request._id);
//       console.log("Donor ID:", selectedDonor._id);
//       const token = localStorage.getItem("token");
//       await axios.put ( API_ROUTES.COMPLETE_REQUEST(request._id),
//         {donorId:selectedDonor._id},
//         {headers:{ Authorization: `Bearer ${token}` }}
//       );
//       alert("Request marked as completed");
//       // Build updated request object
//     const updatedRequest = {
//       ...request,
//       status: "Completed",
//       donorName: selectedDonor.name,
//       donorPhone: selectedDonor.phone,
//       donorEmail: selectedDonor.email,
//       donationDate: new Date().toISOString(), // or response.data.donationDate if backend returns it
//     };

//     // Update parent state
//     onUpdateRequest(updatedRequest);

//       onClose();
//     }catch(e){
//       console.log("Error completing request", e);
//     }
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         height: "100vh",
//         width: "100vw",
//         backgroundColor: "rgba(0,0,0,0.5)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 1000,
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "#fff",
//           padding: "30px",
//           borderRadius: "10px",
//           width: "600px",
//           maxHeight: "80vh",   // <-- limit height relative to viewport
//           overflowY: "auto",
//           fontFamily: "Poppins",
//           position: "relative",
//         }}
//       >
//         <button
//           onClick={onClose}
//           style={{
//             position: "absolute",
//             top: "10px",
//             right: "15px",
//             background: "transparent",
//             border: "none",
//             fontSize: "20px",
//             cursor: "pointer",
//           }}
//         >
//           &times;
//         </button>
//         <h3 style={{ color: "#B43929", textAlign: "center" }}>Request Details</h3>

//         {/* Patient details */}
//         <p><strong>Patient Name:</strong> {request.patientName}</p>
//         <p><strong>Requested Date:</strong> {new Date(request.requestDate).toLocaleDateString()}</p>
//         <p><strong>Status:</strong> {request.status}</p>
//         <p><strong>Blood Group:</strong> {request.bloodType}</p>
//         <p><strong>Quantity:</strong> {request.quantity}</p>
//         <p><strong>Urgency Level:</strong> {request.urgencyLevel}</p>
//         <p><strong>Ward:</strong> {request.ward}</p>
//         <p><strong>Condition:</strong> {request.condition}</p>
//         <p><strong>Donation Location:</strong> {request.donationLocation}</p>
//         <p><strong>Donation Needed Time:</strong> {request.donationTime}</p>
//         <p><strong>Contact Person:</strong> {request.contactPerson}</p>
//         <p><strong>Emergency Phone:</strong> {request.emergencyPhone}</p>
//         <p><strong>District:</strong> {request.district}</p>

//         {/* Donor info if request is completed */}
//         {request.status.toLowerCase() === "completed" ? (
//           <>
//             <h4 style={{ marginTop: "20px", color: "#B43929" }}>Donor Details</h4>
//             <p><strong>Donor Name:</strong> {request.donorName}</p>
//             <p><strong>Donor Contact:</strong> {request.donorPhone}</p>
//             <p><strong>Donor Email:</strong> {request.donorEmail}</p>
//             <p><strong>Donation Completed On:</strong> {new Date(request.donationDate).toLocaleDateString()}</p>
//           </>
//         ) : (
//           <>
//             {/* Search and assign donor */}
//             <h4 style={{ marginTop:"20px", color:"#B43929" }}>Assign Donor</h4>
//             <div style={{ display:'flex', gap:'10px' }}>
//               <input
//                 type="text"
//                 placeholder="Search donors by name, email, or phone"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 style={{
//                   flex:1,
//                   padding:'8px',
//                   border:'1px solid #ccc',
//                   borderRadius:'5px',
//                   fontFamily:'Poppins'
//                 }}
//               />
             
//             </div>

//             {/* Donor Search results */}
//             {loading && <p>Loading donors...</p>}
//             {donors.length > 0 && (
//               <ul style={{
//                 listStyle:'none',
//                 padding:0,
//                 marginTop:'10px',
//                 maxHeight:'150px',
//                 overflowY:'auto',
//                 border:'1px solid #ccc',
//                 borderRadius:'5px'
//               }}>
//                 {donors.map((donor)=>(
//                   <li
//                     key={donor._id}
//                     onClick={() => setSelectedDonor(donor)}
//                     style={{
//                       padding:'8px',
//                       cursor:'pointer',
//                       backgroundColor:selectedDonor?._id === donor._id ? "#FFBFBF" : "#fff",
//                       borderBottom:'1px solid #eee',
//                     }}
//                   >
//                     {donor.name} - ({donor.email} - {donor.phone})
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {/* Complete Request Button */}
//             {selectedDonor && (
//               <button 
//                 onClick={handleCompleteRequest}
//                 style={{
//                   marginTop:'15px',
//                   background:'#28a745',
//                   color:'#fff',
//                   border:'none',
//                   width:'100%',
//                   padding:'10px',
//                   borderRadius:'5px',
//                   cursor:'pointer',
//                   fontSize:'16px',
//                 }}
//               >
//                 Mark as Completed
//               </button>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import axios from "axios";

import check from "../../assets/check.png";
import SubFooter from "../Footers/SubFooter";
import { API_ROUTES } from "../../config/config";

// const RequestHistory = () => {
//   const [requests, setRequests] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState(null);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(API_ROUTES.REQUEST_HISTORY, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setRequests(response.data.data);
//         console.log("Requests fetched:", response.data.data);
//       } catch (error) {
//         console.error("Error fetching requests:", error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const handleCardClick = (requestData) => setSelectedRequest(requestData);
//   const closeModal = () => setSelectedRequest(null);

//   // Filter requests by status
//   const pendingRequests = requests.filter(
//     (req) => req.status.toLowerCase() === "pending"
//   );
//   const completedRequests = requests.filter(
//     (req) => req.status.toLowerCase() === "completed"
//   );
//   const cancelledRequests = requests.filter(
//     (req) => req.status.toLowerCase() === "cancelled"
//   );

//   return (
//     <div>
//       <Profile />
//       <div
//         style={{
//           paddingTop: "70px",
//           paddingLeft: "70px",
//           paddingRight: "70px",
//           paddingBottom: "30px",
//           display: "flex",
//           flexDirection: "column",
//           gap: "40px",
//         }}
//       >
//         {/* Pending Requests */}
//         <div>
//           <h2 style={{ color: "#B43929" }}>Pending Requests</h2>
//           {pendingRequests.length > 0 ? (
//             pendingRequests.map((req, index) => (
//               <RequestCard
//                 key={index}
//                 request={req}
//                 onClick={handleCardClick}
//                 showCheck={false}
//               />
//             ))
//           ) : (
//             <p>No pending requests.</p>
//           )}
//         </div>

//         {/* Completed Requests */}
//         <div>
//           <h2 style={{ color: "#28a745" }}>Completed Requests</h2>
//           {completedRequests.length > 0 ? (
//             completedRequests.map((req, index) => (
//               <RequestCard
//                 key={index}
//                 request={req}
//                 onClick={handleCardClick}
//                 showCheck={true}
//               />
//             ))
//           ) : (
//             <p>No completed requests.</p>
//           )}
//         </div>

//         {/* Cancelled Requests */}
//         <div>
//           <h2 style={{ color: "#6c757d" }}>Cancelled Requests</h2>
//           {cancelledRequests.length > 0 ? (
//             cancelledRequests.map((req, index) => (
//               <RequestCard
//                 key={index}
//                 request={req}
//                 onClick={handleCardClick}
//                 showCheck={false}
//               />
//             ))
//           ) : (
//             <p>No cancelled requests.</p>
//           )}
//         </div>
//       </div>

//       {selectedRequest && (
//         <RequestModal
//           request={selectedRequest}
//           onClose={closeModal}
//           onUpdateRequest={(updatedRequest) => {
//             setRequests((prev) =>
//               prev.map((req) =>
//                 req._id === updatedRequest._id ? updatedRequest : req
//               )
//             );
//           }}
//         />
//       )}
//       <SubFooter />
//     </div>
//   );
// };


const RequestHistory = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeTab, setActiveTab] = useState("pending"); // default tab

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API_ROUTES.REQUEST_HISTORY, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleCardClick = (requestData) => setSelectedRequest(requestData);
  const closeModal = () => setSelectedRequest(null);

  const filteredRequests = requests.filter(
    (req) => req.status.toLowerCase() === activeTab
  );

  return (
    <div>
      <Profile />

      {/* Tabs */}
      <div style={{ paddingTop: "70px", paddingLeft: "70px", paddingRight: "70px" ,paddingBottom:"30px"}}>
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          {["pending", "completed", "cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 20px",
                border: "none",
                borderBottom: activeTab === tab ? "3px solid #B43929" : "3px solid transparent",
                background: "transparent",
                fontWeight: activeTab === tab ? "600" : "400",
                cursor: "pointer",
                color:
                  tab === "pending"
                    ? "#B43929"
                    : tab === "completed"
                    ? "#28a745"
                    : "#6c757d",
                fontFamily: "Poppins",
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Requests List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((req, index) => (
              <RequestCard
                key={index}
                request={req}
                onClick={handleCardClick}
                showCheck={req.status.toLowerCase() === "completed"}
              />
            ))
          ) : (
            <p>No {activeTab} requests.</p>
          )}
        </div>
      </div>

      {selectedRequest && (
        <RequestModal
          request={selectedRequest}
          onClose={closeModal}
          onUpdateRequest={(updatedRequest) => {
            setRequests((prev) =>
              prev.map((req) =>
                req._id === updatedRequest._id ? updatedRequest : req
              )
            );
          }}
        />
      )}
      <SubFooter />
    </div>
  );
};

// export default RequestHistory;

const RequestCard = ({ request, showCheck = false, onClick }) => {
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

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(request)}
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
          {request.bloodType}
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
        <p style={{ fontFamily: "poppins", fontSize: "16px", marginTop: "20px" }}>
          <strong>Name:</strong> {request.hospitalName}
        </p>
        <p style={{ fontFamily: "poppins", fontSize: "16px", marginTop: 0 }}>
          <strong>Requested Date:</strong>{" "}
          {new Date(request.requestDate).toLocaleDateString()}
        </p>
        <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <p style={{ fontFamily: "poppins", fontSize: "16px", marginTop: 0 }}>
            <strong>Status:</strong> {request.status}
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

// --------------------- RequestModal ---------------------

const RequestModal = ({ request, onClose, onUpdateRequest }) => {
  const [search, setSearch] = useState("");
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [loading, setLoading] = useState(false);

  let debounceTimeout;

  useEffect(() => {
    clearTimeout(debounceTimeout);

    if (search.trim() === "") {
      setDonors([]);
      return;
    }

    debounceTimeout = setTimeout(async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_ROUTES.SEARCH_DONORS}?search=${search}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDonors(response.data.data);
        console.log("Donors found", response.data.data);
      } catch (e) {
        console.log("Error searching donors", e);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [search]);

  const handleCompleteRequest = async () => {
    if (!selectedDonor) {
      alert("Please select a donor");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        API_ROUTES.COMPLETE_REQUEST(request._id),
        { donorId: selectedDonor._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Request marked as completed");

      // Update request locally
      const updatedRequest = {
        ...request,
        status: "Completed",
        donorName: selectedDonor.name,
        donorPhone: selectedDonor.phone,
        donorEmail: selectedDonor.email,
        donationDate: new Date().toISOString(),
      };

      onUpdateRequest(updatedRequest);
      onClose();
    } catch (e) {
      console.log("Error completing request", e);
    }
  };

  const handleCancelRequest = async () =>{
    if(!window.confirm("Are you sure you want to cancel this request?")){
      return;
    }
    try{
      const token = localStorage.getItem("token");
      await axios.put(API_ROUTES.CANCEL_REQUEST(request._id), {}, {
        headers:{ Authorization: `Bearer ${token}` }
      });
      alert("Request cancelled");

      const updatedRequest = {
        ...request,
        status: "Cancelled",
      };
      onUpdateRequest(updatedRequest);
      onClose();

    }catch(e){
      console.log("Error cancelling request", e);
      
    }
  }


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
          maxHeight: "80vh",
          overflowY: "auto",
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

        <h3 style={{ color: "#B43929", textAlign: "center" }}>Request Details</h3>

        <p><strong>Patient Name:</strong> {request.patientName}</p>
        <p><strong>Requested Date:</strong> {new Date(request.requestDate).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {request.status}</p>
        <p><strong>Blood Group:</strong> {request.bloodType}</p>
        <p><strong>Quantity:</strong> {request.quantity}</p>
        <p><strong>Urgency Level:</strong> {request.urgencyLevel}</p>
        <p><strong>Ward:</strong> {request.ward}</p>
        <p><strong>Condition:</strong> {request.condition}</p>
        <p><strong>Donation Location:</strong> {request.donationLocation}</p>
        <p><strong>Donation Needed Time:</strong> {request.donationTime}</p>
        <p><strong>Contact Person:</strong> {request.contactPerson}</p>
        <p><strong>Emergency Phone:</strong> {request.emergencyPhone}</p>
        <p><strong>District:</strong> {request.district}</p>

        {request.status.toLowerCase() === "completed" ? (
          <>
            <h4 style={{ marginTop: "20px", color: "#B43929" }}>Donor Details</h4>
            <p><strong>Donor Name:</strong> {request.donorName}</p>
            <p><strong>Donor Contact:</strong> {request.donorPhone}</p>
            <p><strong>Donor Email:</strong> {request.donorEmail}</p>
            <p><strong>Donation Completed On:</strong> {new Date(request.donationDate).toLocaleDateString()}</p>
          </>
        ) : (
          <>
            <h4 style={{ marginTop:"20px", color:"#B43929" }}>Assign Donor</h4>
            <div style={{ display:'flex', gap:'10px' }}>
              <input
                type="text"
                placeholder="Search donors by name, email, or phone"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex:1,
                  padding:'8px',
                  border:'1px solid #ccc',
                  borderRadius:'5px',
                  fontFamily:'Poppins'
                }}
              />
            </div>

            {loading && <p>Loading donors...</p>}
            {donors.length > 0 && (
              <ul style={{
                listStyle:'none',
                padding:0,
                marginTop:'10px',
                maxHeight:'150px',
                overflowY:'auto',
                border:'1px solid #ccc',
                borderRadius:'5px'
              }}>
                {donors.map((donor)=>(<li
                  key={donor._id}
                  onClick={() => setSelectedDonor(donor)}
                  style={{
                    padding:'8px',
                    cursor:'pointer',
                    backgroundColor:selectedDonor?._id === donor._id ? "#FFBFBF" : "#fff",
                    borderBottom:'1px solid #eee',
                  }}
                >
                  {donor.name} - ({donor.email} - {donor.phone})
                </li>))}
              </ul>
            )}

            {selectedDonor && (
              <button 
                onClick={handleCompleteRequest}
                style={{
                  marginTop:'15px',
                  background:'#28a745',
                  color:'#fff',
                  border:'none',
                  width:'100%',
                  padding:'10px',
                  borderRadius:'5px',
                  cursor:'pointer',
                  fontSize:'16px',
                }}
              >
                Mark as Completed
              </button>
            )}

            {request.status.toLowerCase() === "pending" && (
  <button
    onClick={handleCancelRequest}
    style={{
      marginTop: "10px",
      background: "#dc3545",
      color: "#fff",
      border: "none",
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    }}
  >
    Cancel Request
  </button>
)}

          </>
        )}
      </div>
    </div>
  );
};
