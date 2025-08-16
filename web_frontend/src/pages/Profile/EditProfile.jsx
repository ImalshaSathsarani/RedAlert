import React, { useState, useEffect } from "react";
import axios from "axios";
import MainHeader from "../Headers/MainHeader";
import { FaCamera, FaEdit, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SubFooter from "../Footers/SubFooter";

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [formData, setFormData] = useState({
    hospitalName: "",
    type: "",
    name: "",
    phone: "",
    designation: "",
    email: "",
    profilePicture: "",  // <-- Added for base64 image
  });
  console.log("PP: ",formData)

  // Handle logout
  const handleLogout = () => {
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://redalert-production.up.railway.app/api/hospital/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { data } = res.data;
        setFormData({
          hospitalName: data.name || "",
          type: data.type || "",
          name: "", // you might want to add this in your backend response
          phone: data.phoneNumber || "",
          designation: "", // add this in backend response if needed
          email: "", // also add this in backend response if needed
          profilePicture: data.profilePicture || "", // <-- if backend returns it
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error.message);
      }
    };

    fetchProfile();
  }, []);

  // 🔁 Update state on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🖼 Handle image upload and convert to base64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Submit updated profile including profilePicture base64
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://redalert-production.up.railway.app/api/hospital/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert("Profile updated successfully");
        navigate("/profileDetails");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Update Error:", error.message);
      alert("Error updating profile");
    }
  };

  return (
    <div>
      <MainHeader />
      <div
        style={{
          backgroundColor: "#B43929",
          width: "100%",
          height: "250px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "40px",
            display: "flex",
            gap: "20px",
          }}
        >
          <Link to="/editProfile">
            <FaEdit size={22} color="white" style={{ cursor: "pointer" }} />
          </Link>
          <FaSignOutAlt
            size={22}
            color="white"
            style={{ cursor: "pointer" }}
            onClick={() => setShowLogoutModal(true)}
          ></FaSignOutAlt>
        </div>
        <h1
          style={{
            color: "white",
            paddingLeft: "40px",
            paddingTop: "20px",
            marginBottom: "4px",
            fontSize: "50px",
            fontFamily: "poppins",
            fontWeight: "600",
          }}
        >
          Hospital Profile
        </h1>
        <p
          style={{ color: "white", paddingLeft: "40px", fontFamily: "poppins" }}
        >
          Update your hospital’s information, contact details, and request
          settings.
        </p>
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            left: "1200px",
            right: "40px",
            height: "220px",
            width: "220px",
            top: "110px",
            backgroundColor: "white",
            borderRadius: "100%",
            border: "1px solid #B43929",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Show uploaded image preview if exists, else FaUser icon */}
          {formData.profilePicture ? (
            <img
              src={formData.profilePicture}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <FaUser size={100} color="#B43929" />
          )}

          {/* File input over camera icon */}
          <label
            htmlFor="profileImage"
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              backgroundColor: "#B43929",
              borderRadius: "50%",
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <FaCamera size={20} color="white" />
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "100px",
            right: "40px",
            height: "60px",
            display: "flex",
            alignItems: "flex-end",
            gap: "60px",
          }}
        >
          <NavTab
            to="/profileDetails"
            label="Profile Details"
            active={isActive("/profileDetails")}
          />
          <NavTab
            to="/requestHistory"
            label="Request History"
            active={isActive("/requestHistory")}
          />
          <NavTab
            to="/changePassword"
            label="Change Password"
            active={isActive("/changePassword")}
          />
        </div>
      </div>

      {showLogoutModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
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
              width: "300px",
              textAlign: "center",
              fontFamily: "Poppins",
            }}
          >
            <p
              style={{
                marginBottom: "20px",
                fontSize: "16px",
                fontFamily: "Poppins",
              }}
            >
              Are you sure you want to logout?
            </p>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button
                onClick={handleLogout}
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#B43929",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#ccc",
                  color: "black",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "90px",
          paddingBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "auto",
            width: "1000px",
            border: "1px solid #FFBFBF",
            backgroundColor: "#FFE2E2",
            borderRadius: "10px",
            boxShadow: "(0.1,0,0,0),rgba(#000)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "30px",
              marginTop: "40px",
              fontStyle: "poppins",
            }}
          >
            Edit Profile
          </h1>
          <div
            style={{
              width: "100%",
              padding: "0 40px",
              boxSizing: "border-box",
              marginTop: "30px",
            }}
          >
            <p
              style={{
                color: "#B43929",
                fontSize: "16px",
                marginBottom: "5px",
              }}
            >
              1. Hospital Information
            </p>
            <hr
              style={{
                border: "0",
                height: "1px",
                backgroundColor: "#B43929",
                width: "100%",
              }}
            />
          </div>
          <label
            style={{
              display: "block",
              marginBottom: "18px",
              color: "#B43929",
              fontSize: "14px",
              fontWeight: "500",
              border: "1px solid #B43929",
              borderRadius: "10px",
              width: "900px",
              height: "50px",
              padding: "10px",
              marginTop: "20px",
            }}
          >
            Hospital Name
            <input
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              type="text"
              placeholder="XYZ Hospital"
              style={{
                display: "block",
                backgroundColor: "#FFE2E2",
                border: "none",
                fontSize: "16px",
                fontFamily: "poppins",
                marginTop: "6px",
                outline: "none",
                width: "100%",
              }}
            />
          </label>
          <label
            style={{
              display: "block",
              marginBottom: "18px",
              color: "#B43929",
              fontSize: "14px",
              fontWeight: "500",
              border: "1px solid #B43929",
              borderRadius: "10px",
              width: "900px",
              height: "50px",
              padding: "10px",
              marginTop: "20px",
            }}
          >
            Hospital Type
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={{
                display: "block",
                backgroundColor: "#FFE2E2",
                border: "1px solid #B43929",
                fontSize: "16px",
                fontFamily: "poppins",
                marginTop: "6px",
                outline: "none",
                width: "200px",
                borderRadius: "6px",
                color: "#000",
                padding: "6px",
              }}
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
              <option value="Teaching">Teaching</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <div
            style={{
              width: "100%",
              padding: "0 40px",
              boxSizing: "border-box",
              marginTop: "30px",
            }}
          >
            <p
              style={{
                color: "#B43929",
                fontSize: "16px",
                marginBottom: "5px",
              }}
            >
              2. Contact Person (Hospital Representative)
            </p>
            <hr
              style={{
                border: "0",
                height: "1px",
                backgroundColor: "#B43929",
                width: "100%",
              }}
            />
          </div>
          <label
            style={{
              display: "block",
              marginBottom: "18px",
              color: "#B43929",
              fontSize: "14px",
              fontWeight: "500",
              border: "1px solid #B43929",
              borderRadius: "10px",
              width: "900px",
              height: "50px",
              padding: "10px",
              marginTop: "20px",
            }}
          >
            Full Name
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="A.B.C.Perera"
              style={{
                display: "block",
                backgroundColor: "#FFE2E2",
                border: "none",
                fontSize: "16px",
                fontFamily: "poppins",
                marginTop: "6px",
                outline: "none",
                width: "100%",
              }}
            />
          </label>
          <label
            style={{
              display: "block",
              marginBottom: "18px",
              color: "#B43929",
              fontSize: "14px",
              fontWeight: "500",
              border: "1px solid #B43929",
              borderRadius: "10px",
              width: "900px",
              height: "50px",
              padding: "10px",
              marginTop: "20px",
            }}
          >
            Phone Number
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="phone"
              placeholder="07xxxxxxxx"
              style={{
                display: "block",
                backgroundColor: "#FFE2E2",
                border: "none",
                fontSize: "16px",
                fontFamily: "poppins",
                marginTop: "6px",
                outline: "none",
                width: "100%",
              }}
            />
          </label>
          <label
            style={{
              display: "block",
              marginBottom: "18px",
              color: "#B43929",
              fontSize: "14px",
              fontWeight: "500",
              border: "1px solid #B43929",
              borderRadius: "10px",
              width: "900px",
              height: "50px",
              padding: "10px",
              marginTop: "20px",
            }}
          >
            Designation (Medical Officer, Admin)
            <input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              type="text"
              placeholder="Medical Officer"
              style={{
                display: "block",
                backgroundColor: "#FFE2E2",
                border: "none",
                fontSize: "16px",
                fontFamily: "poppins",
                marginTop: "6px",
                outline: "none",
                width: "100%",
              }}
            />
          </label>
          <div
            style={{
              width: "100%",
              padding: "0 40px",
              boxSizing: "border-box",
              marginTop: "30px",
            }}
          >
            <p
              style={{
                color: "#B43929",
                fontSize: "16px",
                marginBottom: "5px",
              }}
            >
              3. Account Details
            </p>
            <hr
              style={{
                border: "0",
                height: "1px",
                backgroundColor: "#B43929",
                width: "100%",
              }}
            />
          </div>
          <label
            style={{
              display: "block",
              marginBottom: "18px",
              color: "#B43929",
              fontSize: "14px",
              fontWeight: "500",
              border: "1px solid #B43929",
              borderRadius: "10px",
              width: "900px",
              height: "50px",
              padding: "10px",
              marginTop: "20px",
            }}
          >
            Email
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="abcprerera@example.com"
              style={{
                display: "block",
                backgroundColor: "#FFE2E2",
                border: "none",
                fontSize: "16px",
                fontFamily: "poppins",
                marginTop: "6px",
                outline: "none",
                width: "100%",
              }}
            />
          </label>
          <button
            onClick={handleSubmit}
            style={{
              border: "solid 1px #B43929",
              width: "200px",
              height: "40px",
              borderRadius: "10px",
              backgroundColor: "#B43929",
              color: "white",
              fontSize: "20px",
              marginTop: "20px",
              fontFamily: "poppins",
              marginBottom: "40px",
            }}
          >
            Change
          </button>
        </div>
      </div>
      <SubFooter />
    </div>
  );
};

const NavTab = ({ to, label, active }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <Link
      to={to}
      style={{
        ...navLinkStyle,
        ...(active ? activeTabStyle : {}),
      }}
    >
      {label}
    </Link>
  </div>
);

const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "10px 16px",
  fontFamily: "Poppins",
  fontSize: "18px",
  transition: "all 0.3s ease",
  borderRadius: "6px",
};

const activeTabStyle = {
  backgroundColor: "#912e22", // darker red
  fontWeight: "600",
  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
};

export default EditProfile;
