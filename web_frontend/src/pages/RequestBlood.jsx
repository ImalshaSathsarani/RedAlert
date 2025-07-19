import React, { useState } from "react";
import axios from "axios";
import MainHeader from "./Headers/MainHeader";

const RequestBlood = () => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    city: "",
    contactPersonName: "",
    emergencyContact: "",
    bloodType: "",
    quantity: "",
    urgency: "",
    requiredDate: "",
    requiredTime: "",
    patientName: "",
    ward: "",
    medicalCondition: "",
    donationLocation: "",
    donationTime: "",
    additionalInfo: "",
  });

  const [requestFileName, setRequestFileName] = useState(null);
  const [requestFile, setRequestFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleRegisterFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setRequestFileName(file.name);
    else setRequestFileName(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRequestFile(file);
    setRequestFileName(file ? file.name : null);
  };

  const handleSubmit = async (e) => {
    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      if (requestFile) {
        submitData.append("doctorRequestFile", requestFile);
      }

      console.log("Sending request to backend...");

      const response = await axios.post(
        "http://localhost:8000/api/request/request-blood",
        submitData,
        {
          withCredentials: true, // needed for cookies
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setMessage("Request successfully submitted!");
      } else {
        setMessage("Failed to submit request.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      setMessage("Server error.");
    }
  };

  return (
    <>
      <MainHeader />

      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
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
            Request Blood
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
            District/City
            <input
              type="text"
              placeholder="Colombo"
              name="city"
              value={formData.city}
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
            Contact Person Name
            <input
              type="text"
              placeholder="A.B.C.Perera"
              name="contactPersonName"
              value={formData.contactPersonName}
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
            Emergency Contact Number
            <input
              type="text"
              placeholder="07xxxxxxxx"
              name="emergencyContact"
              value={formData.emergencyContact}
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
              2. Blood Request Details
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
            Blood Group Needed
            <select
              name="bloodType"
              value={formData.bloodType}
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
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
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
            Quantity Needed
            <input
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              type="text"
              placeholder="1 units/pints"
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
            Urgency Level
            <select
              name="urgency"
              value={formData.urgency}
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
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
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
            Required Date
            <input
              name="requiredDate"
              value={formData.requiredDate}
              onChange={handleChange}
              type="date"
              placeholder="Colombo"
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
            Required Time(If Necessary)
            <input
              name="requiredTime"
              value={formData.requiredTime}
              onChange={handleChange}
              type="time"
              placeholder="10:00"
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
              3. Patient and Medical Info
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
            Patient Name
            <input
              type="text"
              placeholder="John Doe"
              name="patientName"
              value={formData.patientName}
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
            Ward
            <input
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              type="text"
              placeholder="10/A"
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
            Medical Condition (Accident, Surgery, etc.)
            <input
              name="medicalCondition"
              value={formData.medicalCondition}
              onChange={handleChange}
              type="text"
              placeholder="Accident"
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
              4. Donation Info
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
              height: "70px",
              padding: "10px",
              marginTop: "20px",
            }}
          >
            Donation Location ( e.g. : Blood Bank, Room 12, General Hospital
            ,Colombo)
            <textarea
              name="donationLocation"
              value={formData.donationLocation}
              onChange={handleChange}
              type="text"
              placeholder=" Blood Bank, Room 12, General Hospital ,Colombo"
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
            Available Donation Time (e.g. 10:00 - 16:00)
            <input
              name="donationTime"
              value={formData.donationTime}
              onChange={handleChange}
              type="text"
              placeholder="10:00- 16:00"
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
            htmlFor="request-pdf"
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
            Attach Doctor Request Form
            <input
              type="file"
              accept=".pdf"
              id="request-pdf"
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
                {requestFileName ? requestFileName : "No File Chosen"}
              </p>

              <label
                htmlFor="request-pdf"
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
            Description for community page
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              type="text"
              placeholder="e.g: Urgently need 3 units of A+ blood group"
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
            //onClick={handleSubmit}
            onClick={() => {
              console.log("Button clicked!");
              handleSubmit();
            }}
            style={{
              border: "solid 1px #B43929",
              width: "300px",
              height: "60px",
              borderRadius: "10px",
              backgroundColor: "#B43929",
              color: "white",
              fontSize: "20px",
              marginTop: "20px",
              fontFamily: "poppins",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            Request and add to Community
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
    </>
  );
};

export default RequestBlood;
