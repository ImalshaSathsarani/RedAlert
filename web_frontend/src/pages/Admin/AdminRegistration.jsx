import React, { useState } from "react";
import axios from "axios";
import logo2 from "../../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../../config/config";

const AdminRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] =useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        confirmPassword:""
    });

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };
    const handleSubmit = async () => {
        console.log("ADM REGISTER URL:", API_ROUTES.ADMIN_REGISTER);

  const { name, email, phone, password, confirmPassword } = formData;

  if (!name || !email || !phone || !password) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await axios.post(API_ROUTES.ADMIN_REGISTER, {
      name,
      email,
      phone,
      password,
    });

    //  Save Token
    localStorage.setItem("token", response.data.token);

    //  Save Admin Info
    localStorage.setItem("adminId", response.data.admin._id);
    localStorage.setItem("adminEmail", response.data.admin.email);
    localStorage.setItem("adminName", response.data.admin.name); 
    localStorage.setItem("adminRole", response.data.admin.role);

    alert("Admin Registration Successful!");

    navigate("/adminDashboard");

  } catch (error) {
    alert(error.response?.data?.message || "Registration failed");
  }
};

 

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start",
        
      }}
    >
      <img
        src={logo2}
        alt="Logo"
        style={{
          width: "150px",
          height: "150px",
          marginBottom: "0px",
          //marginRight:'10px'
        }}
      ></img>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
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
          Admin Registration
        </h1>


        

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
            type="text"
            placeholder="A.B.C.Perera"
            value={formData.name}
            onChange={handleChange}
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
          Email
          <input
            name="email"
            type="email"
            placeholder="abcprerera@example.com"
            value={formData.email}
            onChange={handleChange}
           
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
            type="phone"
            placeholder="07xxxxxxxx"
            value={formData.phone}
            onChange={handleChange}
            
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
          Password
          <input
            name="password"
            type="password"
            placeholder="****************"
            value={formData.password}
            onChange={handleChange}
            
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
          {" "}
          Confirm Password
          <input
            name="confirmPassword"
            type="password"
            placeholder="****************"
            value={formData.confirmPassword}
            onChange={handleChange}
           
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
          }}
        >
          Register
        </button>

        <p
          style={{
            marginTop: "50px",
            fontSize: "10px",
          }}
        >
          © 2025 RedAlert | Contact Us | Privacy Policy{" "}
        </p>
      </div>
    </div>
  );
};

export default AdminRegistration;
