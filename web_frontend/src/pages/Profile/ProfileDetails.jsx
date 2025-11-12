import React, { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./Profile";
import logo2 from "../../assets/logo2.png";
import SubFooter from "../Footers/SubFooter";
import { API_ROUTES } from "../../config/config";

const ProfileDetails = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    registrationNumber: "",
    city: "",
    type: "",
    address: "",
    phoneNumber: "",
    image: "", // add this
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          API_ROUTES.HOSPITAL_PROFILE,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setProfileData(res.data.data);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <Profile />
      <div
        style={{
          paddingTop: "70px",
          paddingLeft: "70px",
          paddingRight: "70px",
          paddingBottom: "30px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "60px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div
              style={{
                backgroundColor: "#f8f8f8",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderRadius: "10px",
                border: "1px solid #B43929",
                width: "300px",
              }}
            >
              <p>
                <strong>Name:</strong> {profileData.name}
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#f8f8f8",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderRadius: "10px",
                border: "1px solid #B43929",
                width: "300px",
              }}
            >
              <p>
                <strong>Registration Number:</strong>{" "}
                {profileData.registrationNumber}
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#f8f8f8",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderRadius: "10px",
                border: "1px solid #B43929",
                width: "300px",
              }}
            >
              <p>
                <strong>City:</strong> {profileData.city}
              </p>
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div
              style={{
                backgroundColor: "#f8f8f8",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderRadius: "10px",
                border: "1px solid #B43929",
                width: "300px",
              }}
            >
              <p>
                <strong>Type:</strong> {profileData.type}
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#f8f8f8",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderRadius: "10px",
                border: "1px solid #B43929",
                width: "300px",
              }}
            >
              <p>
                <strong>Address:</strong> {profileData.address}
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#f8f8f8",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderRadius: "10px",
                border: "1px solid #B43929",
                width: "300px",
              }}
            >
              <p>
                <strong>Phone Number:</strong> {profileData.phoneNumber}
              </p>
            </div>
          </div>
          <img
            src={logo2}
            alt="Logo2"
            style={{
              width: "150px",
              height: "150px",
              marginTop: "160px",
              marginLeft: "400px",
              objectFit: "cover",
              borderRadius: "50%", // optional: make it circular
            }}
          />
        </div>
      </div>
      <SubFooter />
    </div>
  );
};

export default ProfileDetails;
