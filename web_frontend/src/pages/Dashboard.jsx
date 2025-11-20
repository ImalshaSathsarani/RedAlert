// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import MainHeader from "./Headers/MainHeader";
// import SubFooter from "./Footers/SubFooter";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Label,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// // Dummy data for last month's requests
// const requestData = [
//   { date: "Jun 1", requests: 5 },
//   { date: "Jun 5", requests: 12 },
//   { date: "Jun 10", requests: 8 },
//   { date: "Jun 15", requests: 18 },
//   { date: "Jun 20", requests: 24 },
//   { date: "Jun 25", requests: 15 },
//   { date: "Jun 30", requests: 20 },
// ];

// const bloodGroupData = [
//   { name: "A+", value: 400 },
//   { name: "B+", value: 300 },
//   { name: "O+", value: 300 },
//   { name: "AB+", value: 200 },
//   { name: "A-", value: 100 },
//   { name: "B-", value: 80 },
//   { name: "O-", value: 120 },
//   { name: "AB-", value: 60 },
// ];

// const COLORS = [
//   "#FF6384",
//   "#36A2EB",
//   "#FFCE56",
//   "#8AFFC1",
//   "#FF9F40",
//   "#AF7AC5",
//   "#4BC0C0",
//   "#F67280",
// ];

// const Dashboard = () => {
//   const [requestData, setRequestData] = useState([]);
//   const [bloodGroupData, setBloodGroupData] = useState([]);
//   const [summary, setSummary] = useState({
//     totalRequests: 0,
//     pendingRequests: 0,
//   });
//   const [matchedDonorsCount, setMatchedDonorsCount] = useState(0);
//   const [recentRequests, setRecentRequests] = useState([]);
//   const [matchedDonors, setMatchedDonors] = useState([]);
//   const [hospitalData, setHospitalData] = useState([]);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const token = localStorage.getItem("token"); // ensure the token is saved at login

//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         const [
//           trendsRes,
//           bloodGroupRes,
//           summaryRes,
//           matchedCountRes,
//           recentReqRes,
//           matchedDonorRes,
//           hospitalDataRes
//         ] = await Promise.all([
//           axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/trends`, config),
//           axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/blood-groups`, config),
//           axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/summary`, config),
//           axios.get(
//            `${process.env.REACT_APP_API_BASE_URL}/dashboard/matched-donors-count`,
//             config
//           ),
//           axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/recent`, config),
//           axios.get(
//             `${process.env.REACT_APP_API_BASE_URL}/dashboard/matched-donors`,
//             config
//           ),
//           axios.get(
//            `${process.env.REACT_APP_API_BASE_URL}/hospital/profile`,
//             config
//           ),
//         ]);

//         console.log("Trends response:", trendsRes.data);
// console.log("Blood group response:", bloodGroupRes.data);
// console.log("Summary response:", summaryRes.data);
// console.log("Matched donors count:", matchedCountRes.data);
// console.log("Recent requests:", recentReqRes.data);
// console.log("Matched donors:", matchedDonorRes.data);
// console.log("Hospital Profile:", hospitalDataRes.data);


//         // Format trend data to match chart structure
//         const formattedTrends = trendsRes.data.data.map((entry) => ({
//           date: entry._id,
//           requests: entry.count,
//         }));

//         // Format blood group pie chart data
//         const formattedGroups = bloodGroupRes.data.data.map((entry) => ({
//           name: entry._id,
//           value: entry.count,
//         }));

//         console.log("Hospital Data:", hospitalDataRes.data);
//         setRequestData(formattedTrends);
//         setBloodGroupData(formattedGroups);
//         setSummary(summaryRes.data.data);
//         setMatchedDonorsCount(matchedCountRes.data.count);
//         setRecentRequests(recentReqRes.data.data);
//         setMatchedDonors(matchedDonorRes.data.data);
//         setHospitalData(hospitalDataRes.data.data);

//       } catch (error) {
//         console.error("Dashboard fetch error:", error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   return (
//     <>
//       <MainHeader />

//       <div
//         style={{ fontFamily: "poppins" }}
//       >
//         <div
//           style={{
//             fontSize: 40,
//             paddingLeft: 120,
//             paddingTop: 40,
//             fontWeight: "bold",
//           }}
//         >
//           Welcome {hospitalData.name} !
//         </div>

//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             paddingTop: 20,
//             paddingLeft: 120,
//           }}
//         >
//           <span style={{ fontSize: 18 }}>Status :</span>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               marginLeft: 10,
//               fontSize: 18,
//             }}
//           >
//             <span>{hospitalData.isApproved ? "Verified" : "Not Verified"}</span>
//             <span
//               style={{
//                 marginLeft: 8,
//                 backgroundColor: "green",
//                 color: "white",
//                 borderRadius: "50%",
//                 width: 20,
//                 height: 20,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 14,
//               }}
//             >
//               ✔
//             </span>
//           </div>
//         </div>

//         <div
//           style={{
//             display: "flex",
//             gap: 40,
//             paddingLeft: 120,
//             paddingTop: 80,
//             paddingRight: 120,
//           }}
//         >
//           {/* First Rectangle: Line Chart */}
//           <div
//             style={{
//               border: "2px solid #f5c2c2",
//               backgroundColor: "#fff",
//               boxShadow: "3px 3px 12px rgba(255, 0, 0, 0.2)",
//               borderRadius: 12,
//               padding: "30px 40px",
//               fontSize: 16,
//               fontWeight: "bold",
//               width: 700,
//               height: 300,
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <div style={{ marginBottom: 40, fontSize: 28 }}>
//               Blood Requests Overtime
//             </div>
//             <ResponsiveContainer width={600} height={200}>
//               <LineChart data={requestData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date">
//                   <Label
//                     value="Date"
//                     position="insideBottom"
//                     offset={-5}
//                     style={{ fontSize: 14 }}
//                   />
//                 </XAxis>
//                 <YAxis>
//                   <Label
//                     value="Number of Requests"
//                     angle={-90}
//                     position="insideLeft"
//                     offset={10}
//                     style={{ fontSize: 14 }}
//                   />
//                 </YAxis>
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="requests"
//                   stroke="#ff4d4f"
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Second Rectangle: Text */}
//           {/* Second Rectangle: Pie Chart */}
//           <div
//             style={{
//               border: "2px solid #f5c2c2",
//               backgroundColor: "#fff",
//               boxShadow: "3px 3px 12px rgba(255, 0, 0, 0.2)",
//               borderRadius: 12,
//               padding: "20px",
//               width: 400,
//               height: 320,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               fontWeight: "bold",
//             }}
//           >
//             <div style={{ marginBottom: 40, fontSize: 28 }}>
//               Blood Groups Demand
//             </div>
//             <PieChart width={200} height={200}>
//               <Pie
//                 data={bloodGroupData}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label
//               >
//                 {bloodGroupData.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//             </PieChart>
//           </div>
//         </div>

//         <div
//           style={{
//             display: "flex",
//             gap: 140,
//             paddingLeft: 120,
//             paddingTop: 80,
//             paddingRight: 120,
//           }}
//         >
//           <div
//             style={{
//               border: "2px solid #f5c2c2",
//               backgroundColor: "#fff",
//               boxShadow: "3px 3px 12px rgba(255, 0, 0, 0.2)",
//               borderRadius: 12,
//               padding: "20px 30px",
//               fontSize: 24,
//               width: 500,
//               height: 180,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               textAlign: "center",
//             }}
//           >
//             <div>Total Requests</div>
//             <div
//               style={{
//                 marginTop: 50,
//                 marginBottom: 30,
//                 fontSize: 50,
//                 fontWeight: "bold",
//                 color: "red",
//               }}
//             >
//               {summary.totalRequests}
//             </div>
//           </div>
//           <div
//             style={{
//               border: "2px solid #f5c2c2",
//               backgroundColor: "#fff",
//               boxShadow: "3px 3px 12px rgba(255, 0, 0, 0.2)",
//               borderRadius: 12,
//               padding: "20px 30px",
//               fontSize: 24,
//               width: 500,
//               height: 180,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               textAlign: "center",
//             }}
//           >
//             <div>Matched Donars</div>
//             <div
//               style={{
//                 marginTop: 50,
//                 marginBottom: 30,
//                 fontSize: 50,
//                 fontWeight: "bold",
//                 color: "red",
//               }}
//             >
//               {matchedDonorsCount}
//             </div>
//           </div>
//           <div
//             style={{
//               border: "2px solid #f5c2c2",
//               backgroundColor: "#fff",
//               boxShadow: "3px 3px 12px rgba(255, 0, 0, 0.2)",
//               borderRadius: 12,
//               padding: "20px 30px",
//               fontSize: 24,
//               width: 500,
//               height: 180,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               textAlign: "center",
//             }}
//           >
//             <div>Pending</div>
//             <div
//               style={{
//                 marginTop: 50,
//                 marginBottom: 30,
//                 fontSize: 50,
//                 fontWeight: "bold",
//                 color: "red",
//               }}
//             >
//               {summary.pendingRequests}
//             </div>
//           </div>
//         </div>

//         <div
//           style={{
//             display: "flex",
//             gap: 150,
//             paddingLeft: 120,
//             paddingTop: 80,
//             paddingRight: 120,
//           }}
//         >
//           <div
//             style={{
//               border: "2px solid #f5c2c2",
//               backgroundColor: "#fff",
//               boxShadow: "3px 3px 12px rgba(255, 0, 0, 0.2)",
//               borderRadius: 12,
//               padding: "20px 30px",
//               fontSize: 28,
//               display: "flex",
//               flexDirection: "column",
//               minHeight: 250, 
//               width: "fit-content",
//               height: "fit-content",
//             }}
//           >
//             <div
//               style={{
//                 marginBottom: 40,
//                 fontWeight: "bold",
//                 marginLeft: 20,
//                 marginTop: 10,
//               }}
//             >
//               Recent Blood Requests
//             </div>
//             <div style={{ marginLeft: 20 }}>
//               <div
//                 style={{
//                   display: "flex",
//                   fontWeight: "bold",
//                   fontSize: 23,
//                   marginBottom: 10,
//                   color: "red",
//                   gap: "60px",
//                 }}
//               >
//                 <div style={{ width: "100px" }}>ID</div>
//                 <div style={{ width: "100px" }}>Blood</div>
//                 <div style={{ width: "100px" }}>Units</div>
//                 <div style={{ width: "100px" }}>Status</div>
//               </div>

//               {recentRequests.map((req, idx) => (
//                 <div
//                   key={idx}
//                   style={{
//                     display: "flex",
//                     fontSize: 20,
//                     color: "gray",
//                     gap: "60px",
//                     marginTop: 20,
//                   }}
//                 >
//                   <div style={{ width: "100px" }}>{idx + 1}</div>
//                   <div style={{ width: "100px" }}>{req.bloodType}</div>
//                   <div style={{ width: "100px" }}>{req.quantity}</div>
//                   <div style={{ width: "100px" }}>{req.status}</div>
//                 </div>
//               ))}

//               {/*<div
//                 style={{
//                   display: "flex",
//                   fontSize: 20,
//                   color: "gray",
//                   gap: "60px",
//                   marginTop: 20,
//                 }}
//               >
//                 <div style={{ width: "100px" }}>001</div>
//                 <div style={{ width: "100px" }}>A+</div>
//                 <div style={{ width: "100px" }}>2</div>
//                 <div style={{ width: "100px" }}>Pending</div>
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   fontSize: 20,
//                   color: "gray",
//                   gap: "60px",
//                   marginTop: 20,
//                 }}
//               >
//                 <div style={{ width: "100px" }}>001</div>
//                 <div style={{ width: "100px" }}>A+</div>
//                 <div style={{ width: "100px" }}>2</div>
//                 <div style={{ width: "100px" }}>Pending</div>
//               </div>

//               <div
//                 style={{
//                   display: "flex",
//                   fontSize: 20,
//                   color: "gray",
//                   gap: "60px",
//                   marginTop: 20,
//                 }}
//               >
//                 <div style={{ width: "100px" }}>001</div>
//                 <div style={{ width: "100px" }}>A+</div>
//                 <div style={{ width: "100px" }}>2</div>
//                 <div style={{ width: "100px" }}>Pending</div>
//               </div>*/}
//             </div>
//           </div>

//           <div
//             style={{
//               border: "2px solid #f5c2c2",
//               backgroundColor: "#fff",
//               boxShadow: "3px 3px 12px rgba(255, 0, 0, 0.2)",
//               borderRadius: 12,
//               padding: "30px 30px",
//               width: 300,
//               height: 230,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 20,
//             }}
//           >
//             <div style={{ fontSize: 28, fontWeight: "bold", marginBottom: 30 }}>
//               Quick Actions
//             </div>

//             <button
//               style={{
//                 border: "2px solid red",
//                 backgroundColor: "white",
//                 color: "red",
//                 padding: "10px 20px",
//                 borderRadius: 30,
//                 fontSize: 18,
//                 cursor: "pointer",
//               }}
//             >
//               Request Blood
//             </button>

//             <button
//               style={{
//                 border: "2px solid red",
//                 backgroundColor: "white",
//                 color: "red",
//                 padding: "10px 20px",
//                 borderRadius: 30,
//                 fontSize: 18,
//                 cursor: "pointer",
//                 marginBottom: 20,
//               }}
//             >
//               Search Donors
//             </button>
//           </div>
//         </div>

//         <div
//           style={{
//             display: "flex",
//             gap: 40,
//             paddingLeft: 120,
//             paddingTop: 80,
//             paddingRight: 120,
//           }}
//         >
//           <div
//             style={{
//               border: "2px solid #f5c2c2",
//               backgroundColor: "#fff",
//               boxShadow: "3px 3px 12px rgba(255, 0, 0, 0.2)",
//               borderRadius: 12,
//               padding: "20px 30px",
//               fontSize: 28,
//               width: "100%",
//               height: "fit-content",
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <div
//               style={{
//                 marginBottom: 40,
//                 marginTop: 20,
//                 marginLeft: 20,
//                 fontWeight: "bold",
//               }}
//             >
//               Matched Donars for Active Requests
//             </div>

//             <div style={{ marginLeft: 20, whiteSpace: "nowrap" }}>
//               <div
//                 style={{
//                   display: "flex",
//                   fontWeight: "bold",
//                   fontSize: 23,
//                   marginBottom: 10,
//                   color: "red",
//                   gap: "180px",
//                 }}
//               >
//                 <div style={{ width: "100px" }}>Name</div>
//                 <div style={{ width: "100px", textAlign: "center" }}>
//                   Blood Group
//                 </div>
//                 <div style={{ width: "100px" }}>Last Donation</div>
//                 <div style={{ width: "100px" }}>StatusContact</div>
//               </div>

//               {/* <div
//                 style={{
//                   display: "flex",
//                   fontSize: 20,
//                   color: "gray",
//                   marginTop: 20,
//                   gap: "180px",
//                 }}
//               >
//                 <div style={{ width: "100px" }}>Nimal Perera</div>
//                 <div style={{ width: "100px", textAlign: "center" }}>A+</div>
//                 <div style={{ width: "100px" }}>2 months ago</div>
//                 <div style={{ width: "100px" }}>0123456789</div>
//               </div>

//               <div
//                 style={{
//                   display: "flex",
//                   fontSize: 20,
//                   color: "gray",
//                   marginTop: 20,
//                   gap: "180px",
//                 }}
//               >
//                 <div style={{ width: "100px" }}>Nimal Perera</div>
//                 <div style={{ width: "100px", textAlign: "center" }}>A+</div>
//                 <div style={{ width: "100px" }}>2 months ago</div>
//                 <div style={{ width: "100px" }}>0123456789</div>
//               </div>*/}

//               {matchedDonors.map((donor, idx) => (
//                 <div
//                   key={idx}
//                   style={{
//                     display: "flex",
//                     fontSize: 20,
//                     color: "gray",
//                     marginTop: 20,
//                     gap: "180px",
//                   }}
//                 >
//                   <div style={{ width: "100px" }}>{donor.name}</div>
//                   <div style={{ width: "100px", textAlign: "center" }}>
//                     {donor.bloodGroup}
//                   </div>
//                   <div style={{ width: "100px" }}>{donor.lastDonation}</div>
//                   <div style={{ width: "100px" }}>{donor.contact}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//        <div style = {{marginTop:'40px'}}><SubFooter/></div>
//     </>
//   );
// };

// // Reusable box component
// const DashboardBox = ({ title, value }) => (
//   <div
//     style={{
//       border: "2px solid #f5c2c2",
//       backgroundColor: "#fff",
//       boxShadow: "3px 3px 12px rgba(255, 0, 0, 0.2)",
//       borderRadius: 12,
//       padding: "20px 30px",
//       fontSize: 24,
//       width: 500,
//       height: 180,
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       textAlign: "center",
//     }}
//   >
//     <div>{title}</div>
//     <div
//       style={{
//         marginTop: 50,
//         marginBottom: 30,
//         fontSize: 50,
//         fontWeight: "bold",
//         color: "red",
//       }}
//     >
//       {value !== undefined ? value : "-"}
//     </div>
   
//   </div>
// );

// export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import MainHeader from "./Headers/MainHeader";
import SubFooter from "./Footers/SubFooter";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useNavigate } from "react-router-dom";

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#8AFFC1",
  "#FF9F40",
  "#AF7AC5",
  "#4BC0C0",
  "#F67280",
];

const Dashboard = () => {
  const [requestData, setRequestData] = useState([]);
  const [bloodGroupData, setBloodGroupData] = useState([]);
  const [summary, setSummary] = useState({ totalRequests: 0, pendingRequests: 0 });
  const [matchedDonorsCount, setMatchedDonorsCount] = useState(0);
  const [recentRequests, setRecentRequests] = useState([]);
  const [matchedDonors, setMatchedDonors] = useState([]);
  const [hospitalData, setHospitalData] = useState({});
  const navigate = useNavigate();
  //====================
  // FETCH DASHBOARD DATA
  //====================
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const [
          trendsRes,
          bloodGroupRes,
          summaryRes,
          matchedCountRes,
          recentReqRes,
          matchedDonorRes,
          hospitalDataRes,
        ] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/trends`, config),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/blood-groups`, config),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/summary`, config),
          axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/dashboard/matched-donors-count`,
            config
          ),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/recent`, config),
          axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/dashboard/matched-donors`,
            config
          ),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/hospital/profile`, config),
        ]);

        setRequestData(
          trendsRes.data.data.map((v) => ({
            date: v._id,
            requests: v.count,
          }))
        );

        setBloodGroupData(
          bloodGroupRes.data.data.map((v) => ({
            name: v._id,
            value: v.count,
          }))
        );

        setSummary(summaryRes.data.data);
        setMatchedDonorsCount(matchedCountRes.data.count);
        setRecentRequests(recentReqRes.data.data);
        setMatchedDonors(matchedDonorRes.data.data);
        setHospitalData(hospitalDataRes.data.data);
      } catch (err) {
        console.error("Dashboard load error:", err);
      }
    };

    loadDashboard();
  }, []);

  return (
    <>
      <MainHeader />

      <div style={{ padding: "40px 120px", fontFamily: "Poppins" }}>
        {/*=============================
           HOSPITAL WELCOME SECTION
        ===============================*/}
        <h1 style={{ fontSize: 36, fontWeight: 700 }}>
          Welcome, {hospitalData.name} 
        </h1>

        <div style={{ marginTop: 5, fontSize: 18, display: "flex", alignItems: "center", gap: 10 }}>
          <p style={{ margin: 0 }}>Status:</p>
          <p
            style={{
              margin: 0,
              padding: "4px 12px",
              backgroundColor: hospitalData.isApproved ? "#d4edda" : "#f8d7da",
              color: hospitalData.isApproved ? "#155724" : "#721c24",
              fontWeight: "bold",
              borderRadius: 20,
             
            }}
          >
            {hospitalData.isApproved ? "Verified" : "Not Verified"}
          </p>
        </div>

        {/*=============================
           TOP CHARTS SECTION 
        ===============================*/}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 60,
            flexWrap: "wrap",
          }}
        >
          {/*======================
             LINE CHART CARD
          ========================*/}
          <div
            style={{
              flex: 1,
              minWidth: 600,
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 30,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #f1b4b4",
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Blood Requests Over Time
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={requestData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="requests" stroke="#ff4d4f" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/*======================
             PIE CHART CARD
          ========================*/}
          <div
            style={{
              width: 380,
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 30,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #f1b4b4",
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Blood Group Demand
            </div>

            <PieChart width={340} height={280}>
              <Pie
                data={bloodGroupData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                label
              >
                {bloodGroupData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>

        {/*=============================
           SUMMARY CARDS
        ===============================*/}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 80,
            flexWrap: "wrap",
          }}
        >
          {/* CARD TEMPLATE */}
          {[
            {
              title: "Total Requests",
              value: summary.totalRequests,
            },
            {
              title: "Matched Donors",
              value: matchedDonorsCount,
            },
            {
              title: "Pending",
              value: summary.pendingRequests,
            },
          ].map((card, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                minWidth: 300,
                textAlign: "center",
                backgroundColor: "#fff",
                padding: 30,
                borderRadius: 12,
                border: "1px solid #f1b4b4",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 600 }}>{card.title}</div>
              <div
                style={{
                  marginTop: 20,
                  fontSize: 50,
                  fontWeight: "bold",
                  color: "#e60000",
                }}
              >
                {card.value}
              </div>
            </div>
          ))}
        </div>

        {/*=============================
           RECENT REQUESTS + QUICK ACTIONS
        ===============================*/}
        <div
          style={{
            display: "flex",
            gap: 60,
            marginTop: 80,
            flexWrap: "wrap",
          }}
        >
          {/* RECENT REQUESTS TABLE */}
          <div
            style={{
              flex: 1,
              minWidth: 580,
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 30,
              border: "1px solid #f1b4b4",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontSize: 24, fontWeight: "bold", marginBottom: 30 }}>
              Recent Blood Requests
            </div>

            {/* TABLE HEADERS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                fontWeight: "bold",
                fontSize: 20,
                color: "red",
                marginBottom: 20,
              }}
            >
              <span>ID</span>
              <span>Blood</span>
              <span>Units</span>
              <span>Status</span>
            </div>

            {/* TABLE ROWS */}
            {recentRequests.map((req, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  padding: "10px 0",
                  fontSize: 18,
                  color: "#666",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span>{i + 1}</span>
                <span>{req.bloodType}</span>
                <span>{req.quantity}</span>
                <span>{req.status}</span>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS */}
          <div
            style={{
              width: 300,
              height: 260,
              backgroundColor: "#fff",
              padding: 30,
              borderRadius: 12,
              border: "1px solid #f1b4b4",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <div style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
              Quick Actions
            </div>

            <button
             onClick={()=>{
              navigate('/request-blood');

             }}
              style={{
                border: "2px solid red",
                background: "white",
                color: "red",
                padding: "12px 20px",
                borderRadius: 30,
                fontSize: 16,
                cursor: "pointer",
                fontFamily:'poppins'
              }}
            >
              Request Blood
            </button>

            <button
            onClick={()=>{
              navigate('/findDonors');
            }}
              style={{
                border: "2px solid red",
                background: "white",
                color: "red",
                padding: "12px 20px",
                borderRadius: 30,
                fontSize: 16,
                cursor: "pointer",
                fontFamily:'poppins'
              }}
            >
              Search Donors
            </button>
          </div>
        </div>

        {/*=============================
           MATCHED DONORS LIST
        ===============================*/}
        <div
          style={{
            marginTop: 80,
            padding: 30,
            backgroundColor: "#fff",
            borderRadius: 12,
            border: "1px solid #f1b4b4",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: 24, fontWeight: "bold", marginBottom: 30 }}>
            Matched Donors for Active Requests
          </div>

          {/* HEADERS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              fontWeight: "bold",
              fontSize: 20,
              color: "red",
              marginBottom: 20,
            }}
          >
            <span>Name</span>
            <span>Blood Group</span>
            <span>Last Donation</span>
            <span>Contact</span>
          </div>

          {/* ROWS */}
          {matchedDonors.map((donor, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                padding: "12px 0",
                fontSize: 18,
                color: "#666",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>{donor.name}</span>
              <span>{donor.bloodGroup}</span>
              <span>{donor.lastDonationDate || "N/A"}</span>
              <span>{donor.phone || "N/A"}</span>
            </div>
          ))}
        </div>
      </div>

      <SubFooter />
    </>
  );
};

export default Dashboard;
