import React, { useEffect, useState } from 'react';
import AdminSideBar from './AdminSideBar';
import axios from 'axios';
import { API_ROUTES } from '../../config/config';

const RegisteredUsers = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(API_ROUTES.GET_REGISTERED_HOSPITALS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setHospitals(res.data.data);
          console.log("Fetched Registered Hospitals:", res.data.data);
        }
      } catch (e) {
        console.error("Error fetching registered hospitals:", e);
      }
    };

    fetchHospitals();
  }, []);

  // Delete Hospital Handler
  const handleDeleteHospital = async (hospitalId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        API_ROUTES.DELETE_HOSPITAL(hospitalId),
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.message) {
        alert(res.data.message);

        // Update state to mark hospital as inactive
        setHospitals((prev) =>
          prev.map((h) =>
            h._id === hospitalId ? { ...h, status: "inactive" } : h
          )
        );
      }
    } catch (e) {
      console.error("Error deleting hospital:", e);
      alert("Failed to delete hospital");
    }
  };
   const handleDownloadReport = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_ROUTES.BASE_URL}api/admin/hospital-history/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob" // important for files
    });

    // Create a download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `report_${id}.pdf`); // set file name
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Download failed:", error);
    alert("Failed to download report");
  }
};

  return (
    <div style={{ display: 'flex', fontFamily: 'poppins' }}>
      <AdminSideBar />

      <div style={{ paddingLeft: 100, paddingTop: 80, width: '100%' }}>
        <div style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10 }}>
          Registered Hospitals
        </div>

        <div>
          <table
            style={{
              width: '80%',
              borderCollapse: 'collapse',
              fontFamily: 'poppins',
              marginTop: 40
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f9f9f9', textAlign: 'left' }}>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Hospital Registration Number</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Hospital Name</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>User Name</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>User Phone Number</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Status</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Registration Document</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Office Letter</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>History</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Registered date</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Delete Hospital</th>
              </tr>
            </thead>

            <tbody>
              {hospitals.map((hospital) => (
                <tr key={hospital._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>{hospital.registrationNumber}</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>{hospital.hospitalName}</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>{hospital.name}</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>{hospital.phone}</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>{hospital.status ? hospital.status : "-"}</td>

                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>
                    <a
                      href={`${API_ROUTES.BASE_URL}${hospital.registrationDocument}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: '#190f8aff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '12px 12px',
                        cursor: 'pointer',
                        fontFamily: 'poppins',
                        textDecoration: 'none'
                      }}
                    >
                      Download
                    </a>
                  </td>

                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>
                    <a
                      href={`${API_ROUTES.BASE_URL}${hospital.officeLetter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: '#190f8aff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '12px 12px',
                        cursor: 'pointer',
                        fontFamily: 'poppins',
                        textDecoration: 'none'
                      }}
                    >
                      Download
                    </a>
                  </td>

                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>
                    <button
                      style={{
                        backgroundColor: '#190f8aff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '12px 12px',
                        cursor: 'pointer',
                        fontFamily: 'poppins'
                      }}
                      onClick={() => {
                        handleDownloadReport(hospital._id);
                      }}
                    >
                      Download
                    </button>
                  </td>

                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>{new Date(hospital.createdAt).toLocaleDateString()}</td>

                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
                    {hospital.status === "inactive" ? (
                      <button
                        disabled
                        style={{
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '20px',
                          padding: '12px 12px',
                          fontFamily: 'poppins',
                          opacity: 0.7,
                          cursor: 'not-allowed'
                        }}
                      >
                        Deleted
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeleteHospital(hospital._id)}
                        style={{
                          backgroundColor: '#8a0f15ff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '20px',
                          padding: '12px 12px',
                          cursor: 'pointer',
                          fontFamily: 'poppins'
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default RegisteredUsers;
