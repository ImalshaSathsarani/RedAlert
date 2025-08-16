// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MainHeader from "../pages/Headers/MainHeader";
import SubFooter from "../pages/Footers/SubFooter";
import { useEffect, useState } from "react";

export default function FindDonorsPage() {
  const [requests, setRequests] = useState([]);
  const hospitalId = localStorage.getItem("hospitalId");

  useEffect(() => {
    axios
      .get(`http://redalert-production.up.railway.app/api/request/blood-request/pending?hospitalId=${hospitalId}`)
      .then((res) => setRequests(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <MainHeader />

        <div style={{ padding: "40px 20px", maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 30, color: "#B43929" }}>
            Pending Blood Requests
          </h2>

          {requests.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666", fontSize: 16 }}>
              No pending requests at the moment.
            </p>
          ) : (
            <div style={{ display: "grid", gap: 20 }}>
              {requests.map((req) => (
                <div
                  key={req._id}
                  style={{
                    backgroundColor: "#fff",
                    padding: 20,
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <p style={{ fontSize: 18, margin: 0 }}>
                      <strong>Blood Type:</strong> {req.bloodType}
                    </p>
                    <p style={{ fontSize: 16, color: "#555", margin: "6px 0 0" }}>
                      <strong>Quantity:</strong> {req.quantity}
                    </p>
                  </div>

                  <Link
                    to={`/requests/${req._id}`}
                    style={{
                      marginTop: 10,
                      backgroundColor: "#E72929",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: 8,
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: 14,
                    }}
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <SubFooter />
    </>
  );
}
