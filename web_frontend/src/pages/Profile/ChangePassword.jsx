import React, { useState } from "react";
import axios from "axios";
import Profile from "./Profile";
import SubFooter from "../Footers/SubFooter";
import { API_ROUTES } from "../../config/config";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate new password confirmation
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      setSuccess("");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Get JWT token from localStorage

      const response = await axios.patch(
        API_ROUTES.CHANGE_PASSWORD,
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );

      console.log(response.data);
      setSuccess("Password updated successfully!");
      setError("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
      setSuccess("");
    }
  };

  return (
    <div>
      <Profile />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "70px",
          paddingBottom: "30px",
        }}
      >
        <div
          style={{
            width: "400px",
            padding: "40px",
            borderRadius: "10px",
            border: "1px solid #B43929",
            backgroundColor: "#f8f8f8",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Change Password</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="currentPassword"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="newPassword"
                style={{ display: "block", marginBottom: "5px" }}
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="confirmPassword"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "#B43929",
                color: "#fff",
                borderRadius: "5px",
                border: "none",
                fontFamily: "poppins",
                marginTop: "10px",
                fontWeight: "600",
                fontSize: "16px",
                marginLeft: "10px",
              }}
            >
              Change Password
            </button>

            {error && (
              <p style={{ marginTop: "15px", color: "red", fontSize: "14px" }}>
                {error}
              </p>
            )}
            {success && (
              <p
                style={{ marginTop: "15px", color: "green", fontSize: "14px" }}
              >
                {success}
              </p>
            )}
          </form>
        </div>
      </div>
      <SubFooter />
    </div>
  );
};

export default ChangePassword;
