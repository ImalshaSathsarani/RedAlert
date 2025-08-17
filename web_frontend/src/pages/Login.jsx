import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post(
        "https://redalert-production.up.railway.app/api/auth/signin",
        {
          email,
          password,
        },
        {
          withCredentials: true, // ✅ VERY IMPORTANT
        }
      );

      // Save the token if needed
      localStorage.setItem("token", response.data.token);
      //  Save the hospital ID
      localStorage.setItem("hospitalId", response.data.hospital.id);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "500px",
          width: "700px",
          border: "1px solid #FFBFBF",
          backgroundColor: "#FFE2E2",
          borderRadius: "10px",
          boxShadow: "(0.1,0,0,0),rgba(#000)",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "150px",
            height: "150px",
            marginBottom: "0px",
          }}
        ></img>

        <div style={{ marginBottom: "20px", width: "400px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "18px",
              color: "#B43929",
              fontSize: "14px",
              fontWeight: "500",
              border: "1px solid #B43929",
              borderRadius: "10px",
              width: "100%",
              height: "50px",
              padding: "10px",
            }}
          >
            Email
            <input
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              marginBottom: "5px",
              color: "#B43929",
              fontSize: "14px",
              fontWeight: "500",
              border: "1px solid #B43929",
              borderRadius: "10px",
              width: "100%",
              height: "50px",
              padding: "10px",
            }}
          >
            Password
            <input
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
        </div>

        <button
          type="submit"
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
            padding: "10px",
          }}
        >
          Login
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p
          style={{
            marginTop: "80px",
            fontSize: "10px",
          }}
        >
          © 2025 RedAlert | Contact Us | Privacy Policy{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
