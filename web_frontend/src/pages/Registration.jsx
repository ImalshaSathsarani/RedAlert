import React, { useState } from "react";
import axios from "axios";
import logo2 from "../assets/logo2.png";
import { useNavigate } from "react-router-dom";

const WebPortal = () => {
  const navigate = useNavigate();
  const [formDataValues, setFormDataValues] = useState({
    hospitalName: "",
    type: "",
    registrationNumber: "",
    district: "",
    address: "",
    name: "",
    phone: "",
    designation: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Add these to your state
  const [registerFile, setRegisterFile] = useState(null);
  const [registerFileName, setRegisterFileName] = useState(null);
  const [letterFile, setLetterFile] = useState(null);
  const [letterFileName, setLetterFileName] = useState(null);

  const handleRegisterFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setRegisterFile(file);
      setRegisterFileName(file.name);
    } else {
      setRegisterFile(null);
      setRegisterFileName(null);
    }
  };

  const handleLetterFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLetterFile(file);
      setLetterFileName(file.name);
    } else {
      setLetterFile(null);
      setLetterFileName(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formDataValues.password !== formDataValues.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(formDataValues).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (registerFile) formData.append("registrationDocument", registerFile);
      if (letterFile) formData.append("officeLetter", letterFile);

      const response = await axios.post(
        "http://redalert-production.up.railway.app/api/auth/signup",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response.data);
     
     localStorage.setItem("hospitalId", response.data.hospitalId);

      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert("Registration Failed. Please try again.");
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
          Register Your Hospital
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
          />{" "}
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
            type="text"
            placeholder="XYZ Hospital"
            value={formDataValues.hospitalName}
            onChange={handleInputChange}
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
            value={formDataValues.type}
            onChange={handleInputChange}
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
          Registration Number
          <input
            name="registrationNumber"
            type="text"
            placeholder="1234567"
            value={formDataValues.registrationNumber}
            onChange={handleInputChange}
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
          District/City
          <input
            name="district"
            type="text"
            placeholder="Colombo"
            value={formDataValues.district}
            onChange={handleInputChange}
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
            height: "70px",
            padding: "10px",
            marginTop: "20px",
          }}
        >
          Address
          <textarea
            name="address"
            type="text"
            placeholder="XYZ Hospital,Colombo"
            value={formDataValues.address}
            onChange={handleInputChange}
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
            2. Contact Person (Hospital Representative)
          </p>
          <hr
            style={{
              border: "0",
              height: "1px",
              backgroundColor: "#B43929",
              width: "100%",
            }}
          />{" "}
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
            type="text"
            placeholder="A.B.C.Perera"
            value={formDataValues.name}
            onChange={handleInputChange}
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
            value={formDataValues.phone}
            onChange={handleInputChange}
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
            type="text"
            placeholder="Medical Officer"
            value={formDataValues.designation}
            onChange={handleInputChange}
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
          />{" "}
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
            type="email"
            placeholder="abcprerera@example.com"
            value={formDataValues.email}
            onChange={handleInputChange}
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
            value={formDataValues.password}
            onChange={handleInputChange}
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
            value={formDataValues.confirmPassword}
            onChange={handleInputChange}
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
            4. Verification Documents
          </p>
          <hr
            style={{
              border: "0",
              height: "1px",
              backgroundColor: "#B43929",
              width: "100%",
            }}
          />{" "}
        </div>

        <label
          htmlFor="registration-pdf"
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
          Proof of Registration
          <input
            type="file"
            accept=".pdf"
            id="registration-pdf"
            onChange={handleRegisterFileChange}
            style={{ display: "none" }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <p
              style={{
                margin: "0",
                fontSize: "14px",
                fontFamily: "poppins",
                color: "black",
              }}
            >
              <strong>Selected File: </strong>{" "}
              {registerFileName ? registerFileName : "No File Chosen"}
            </p>

            <label
              htmlFor="registration-pdf"
              style={{
                padding: "10px 20px",
                backgroundColor: "#FFE2E2",
                color: "black",
                borderRadius: "8px",
                cursor: "pointer",
                fontFamily: "poppins",
                fontSize: "16px",
                border: "1px solid #B43929",
                width: "100px",

                textAlign: "center",
              }}
            >
              Upload
            </label>
          </div>
        </label>

        <label
          htmlFor="office-pdf"
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
          Office Letter/ Stamp
          <input
            type="file"
            accept=".pdf"
            id="office-pdf"
            onChange={handleLetterFileChange}
            style={{ display: "none" }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <p
              style={{
                margin: "0",
                fontSize: "14px",
                fontFamily: "poppins",
                color: "black",
              }}
            >
              <strong>Selected File: </strong>{" "}
              {letterFileName ? letterFileName : "No File Chosen"}
            </p>

            <label
              htmlFor="office-pdf"
              style={{
                padding: "10px 20px",
                backgroundColor: "#FFE2E2",
                color: "black",
                borderRadius: "8px",
                cursor: "pointer",
                fontFamily: "poppins",
                fontSize: "16px",
                border: "1px solid #B43929",
                width: "100px",

                textAlign: "center",
              }}
            >
              Upload
            </label>
          </div>
        </label>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "30px",
            marginBottom: "10px",
            fontFamily: "poppins",
            fontSize: "14px",
            color: "#B43929",
          }}
        >
          <input
            type="checkbox"
            id="agree"
            style={{ width: "16px", height: "16px" }}
          />
          <label htmlFor="agree">
            I agree to the{" "}
            <a
              href="/terms"
              style={{ color: "#B43929", textDecoration: "underline" }}
            >
              Terms and Conditions
            </a>
          </label>
        </div>

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
            marginTop: "90px",
            fontSize: "10px",
          }}
        >
          © 2025 RedAlert | Contact Us | Privacy Policy{" "}
        </p>
      </div>
    </div>
  );
};

export default WebPortal;
