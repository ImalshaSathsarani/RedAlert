import React, { useState } from "react";
import { CheckCircle, ArrowLeft } from "react-feather";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image1.png";

const Notification = () => {

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ width: "100%", height: 200, backgroundColor: "#E72929" }}>
        <div style={{ paddingTop: 30, paddingLeft: 30 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              color: "white",
              fontSize: 18,
              marginBottom: 10,
              marginLeft: 20
            }}
          >
            <ArrowLeft size={24} color="white" />
          </button>
          <h1 style={{ color: "white", fontSize: 36, fontWeight: "bold", marginLeft: 30 }}>
            Notification
          </h1>
          <p style={{ color: "white", fontSize: 18, marginLeft: 30, marginTop: 20 }}>
            See received blood request
          </p>
        </div>
      </div>

      {/* Card 1 */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 10,
                    padding: "20px 40px",
                }}
            >  
            <div
                style={{
                width: "100%",
                height: 60,
                backgroundColor: "white",
                borderRadius: 15,
                padding: 30,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                marginLeft:60,
                marginRight:60,
                marginTop:30
                }}
            >
            <div style={{ display: "flex", alignItems: "center" }}>
                <img
                    src={image1}
                    alt="profile"
                    style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    marginRight: 20,
                    }}
                />
                <div
                    style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flex: 1,
                    }}
                >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6,marginLeft:10 }}>
                        <CheckCircle color="green" size={18} />
                        <span style={{ color: "green", fontWeight: "bold", fontSize: 18,marginLeft:10 }}>
                          Accepted
                        </span>
                        <span style={{ color: "#777", fontSize: 14, marginLeft: 30}}>
                          1h ago
                        </span>
                      </div>
                      <div
                        style={{
                          color: "#777",
                          fontSize: 16,
                          marginTop: 8,
                          marginLeft:10
                        }}
                      >
                        Kierra Fanci
                      </div>
                    </div>

                    <button
                    style={{
                        marginTop: 25,
                        backgroundColor: "#E72929",
                        borderRadius: 20,
                        padding: "8px 14px",
                        border: "none",
                        color: "white",
                        fontSize: 14,
                        cursor: "pointer",
                        marginLeft:10
                    }}
                    onClick={handleViewDetails}
                    >
                    View Details
                    </button>
                    <div
                    style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: 18,
                        marginLeft: 15,
                    }}
                    >
                    O+
                    </div>
                </div>
            </div>

            </div>
            </div>
            
            {/* Modal Popup */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: 30,
              borderRadius: 20,
              width: '400px',
              boxShadow: '0 0 20px rgba(0,0,0,0.2)',
              position: 'relative'
            }}
          >
            <h2 style={{ color: '#E72929', marginBottom: 10 }}>Blood Request Details</h2>
            <p><strong>Donor:</strong> Kierra Fanci</p>
            <p><strong>Blood Group:</strong> O+</p>
            <p><strong>Status:</strong> Accepted</p>
            <p><strong>Accepted Time:</strong> 1 hour ago</p>
            <p><strong>Contact No:</strong> 0123456789</p>

            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: 20,
                right: 25,
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: 24,
                cursor: 'pointer',
                color: '#888'
              }}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
   
      {/* Card 2 */}
      <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 10,
                    padding: "20px 40px",
                }}
            >  
            <div
                style={{
                width: "100%",
                height: 60,
                backgroundColor: "white",
                borderRadius: 15,
                padding: 30,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                marginLeft:60,
                marginRight:60,
                }}
            >
            <div style={{ display: "flex", alignItems: "center" }}>
                <img
                    src={image1}
                    alt="profile"
                    style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    marginRight: 20,
                    }}
                />
                <div
                    style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flex: 1,
                    }}
                >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6,marginLeft:10 }}>
                        <CheckCircle color="green" size={18} />
                        <span style={{ color: "green", fontWeight: "bold", fontSize: 18,marginLeft:10 }}>
                          Accepted
                        </span>
                        <span style={{ color: "#777", fontSize: 14, marginLeft: 30}}>
                          1h ago
                        </span>
                      </div>
                      <div
                        style={{
                          color: "#777",
                          fontSize: 16,
                          marginTop: 8,
                          marginLeft:10
                        }}
                      >
                        Kierra Fanci
                      </div>
                    </div>

                    <button
                    style={{
                        marginTop: 25,
                        backgroundColor: "#E72929",
                        borderRadius: 20,
                        padding: "8px 14px",
                        border: "none",
                        color: "white",
                        fontSize: 14,
                        cursor: "pointer",
                        marginLeft:10
                    }}
                    onClick={handleViewDetails}
                    >
                    View Details
                    </button>
                    <div
                    style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: 18,
                        marginLeft: 15,
                    }}
                    >
                    O+
                    </div>
                </div>
            </div>

            </div>
            </div>
            
            {/* Modal Popup */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: 30,
              borderRadius: 20,
              width: '400px',
              boxShadow: '0 0 20px rgba(0,0,0,0.2)',
              position: 'relative'
            }}
          >
            <h2 style={{ color: '#E72929', marginBottom: 10 }}>Blood Request Details</h2>
            <p><strong>Donor:</strong> Kierra Fanci</p>
            <p><strong>Blood Group:</strong> O+</p>
            <p><strong>Status:</strong> Accepted</p>
            <p><strong>Accepted Time:</strong> 1 hour ago</p>
            <p><strong>Contact No:</strong> 0123456789</p>

            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: 20,
                right: 25,
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: 24,
                cursor: 'pointer',
                color: '#888'
              }}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Card 3 */}
      <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 10,
                    padding: "20px 40px",
                }}
            >  
            <div
                style={{
                width: "100%",
                height: 60,
                backgroundColor: "white",
                borderRadius: 15,
                padding: 30,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                marginLeft:60,
                marginRight:60,
                }}
            >
            <div style={{ display: "flex", alignItems: "center" }}>
                <img
                    src={image1}
                    alt="profile"
                    style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    marginRight: 20,
                    }}
                />
                <div
                    style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flex: 1,
                    }}
                >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6,marginLeft:10 }}>
                        <CheckCircle color="green" size={18} />
                        <span style={{ color: "green", fontWeight: "bold", fontSize: 18,marginLeft:10 }}>
                          Accepted
                        </span>
                        <span style={{ color: "#777", fontSize: 14, marginLeft: 30}}>
                          1h ago
                        </span>
                      </div>
                      <div
                        style={{
                          color: "#777",
                          fontSize: 16,
                          marginTop: 8,
                          marginLeft:10
                        }}
                      >
                        Kierra Fanci
                      </div>
                    </div>

                    <button
                    style={{
                        marginTop: 25,
                        backgroundColor: "#E72929",
                        borderRadius: 20,
                        padding: "8px 14px",
                        border: "none",
                        color: "white",
                        fontSize: 14,
                        cursor: "pointer",
                        marginLeft:10
                    }}
                    onClick={handleViewDetails}
                    >
                    View Details
                    </button>
                    <div
                    style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: 18,
                        marginLeft: 15,
                    }}
                    >
                    O+
                    </div>
                </div>
            </div>

            </div>
            </div>
            
            {/* Modal Popup */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: 30,
              borderRadius: 20,
              width: '400px',
              boxShadow: '0 0 20px rgba(0,0,0,0.2)',
              position: 'relative'
            }}
          >
            <h2 style={{ color: '#E72929', marginBottom: 10 }}>Blood Request Details</h2>
            <p><strong>Donor:</strong> Kierra Fanci</p>
            <p><strong>Blood Group:</strong> O+</p>
            <p><strong>Status:</strong> Accepted</p>
            <p><strong>Accepted Time:</strong> 1 hour ago</p>
            <p><strong>Contact No:</strong> 0123456789</p>

            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: 20,
                right: 25,
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: 24,
                cursor: 'pointer',
                color: '#888'
              }}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}


      {/* Card 4 */}
      <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 10,
                    padding: "20px 40px",
                }}
            >  
            <div
                style={{
                width: "100%",
                height: 60,
                backgroundColor: "white",
                borderRadius: 15,
                padding: 30,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                marginLeft:60,
                marginRight:60,
                }}
            >
            <div style={{ display: "flex", alignItems: "center" }}>
                <img
                    src={image1}
                    alt="profile"
                    style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    marginRight: 20,
                    }}
                />
                <div
                    style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flex: 1,
                    }}
                >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6,marginLeft:10 }}>
                        <CheckCircle color="green" size={18} />
                        <span style={{ color: "green", fontWeight: "bold", fontSize: 18,marginLeft:10 }}>
                          Accepted
                        </span>
                        <span style={{ color: "#777", fontSize: 14, marginLeft: 30}}>
                          1h ago
                        </span>
                      </div>
                      <div
                        style={{
                          color: "#777",
                          fontSize: 16,
                          marginTop: 8,
                          marginLeft:10
                        }}
                      >
                        Kierra Fanci
                      </div>
                    </div>

                    <button
                    style={{
                        marginTop: 25,
                        backgroundColor: "#E72929",
                        borderRadius: 20,
                        padding: "8px 14px",
                        border: "none",
                        color: "white",
                        fontSize: 14,
                        cursor: "pointer",
                        marginLeft:10
                    }}
                    onClick={handleViewDetails}
                    >
                    View Details
                    </button>
                    <div
                    style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: 18,
                        marginLeft: 15,
                    }}
                    >
                    O+
                    </div>
                </div>
            </div>

            </div>
            </div>
            
            {/* Modal Popup */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: 30,
              borderRadius: 20,
              width: '400px',
              boxShadow: '0 0 20px rgba(0,0,0,0.2)',
              position: 'relative'
            }}
          >
            <h2 style={{ color: '#E72929', marginBottom: 10 }}>Blood Request Details</h2>
            <p><strong>Donor:</strong> Kierra Fanci</p>
            <p><strong>Blood Group:</strong> O+</p>
            <p><strong>Status:</strong> Accepted</p>
            <p><strong>Accepted Time:</strong> 1 hour ago</p>
            <p><strong>Contact No:</strong> 0123456789</p>

            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: 20,
                right: 25,
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: 24,
                cursor: 'pointer',
                color: '#888'
              }}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
          

 
    </div>
  );
};

export default Notification;
