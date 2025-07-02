import React from 'react'
import logo2 from "../assets/logo2.png";
import { useNavigate } from 'react-router-dom';

const WebPortal = () => {

    const navigate = useNavigate();
  return (
    <div style={{
        height:'100vh',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'flex-start',
    }}>
      <img src={logo2} alt ="Logo" style={{
            width:'150px',
            height:'150px',
            marginBottom:'0px',
            //marginRight:'10px'
           
        }}>
        </img>

      <div style={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
        height:'auto',
        width:'750px',
        border:'1px solid #FFBFBF',
        backgroundColor:'#FFE2E2',
        borderRadius:'10px',
        boxShadow:'(0.1,0,0,0),rgba(#000)'
      
    }}>

        
        <h1 style={{
            textAlign:"center",
            fontSize:'30px',
            marginTop:'40px',
            fontStyle:'poppins'
        }}>Register Your Hospital</h1>

       <div style={{
          width: '100%',
          padding: '0 40px',
          boxSizing: 'border-box',
          marginTop: '30px'
        }}>
  <p style={{
    color: '#B43929',
    fontSize: '16px',
    marginBottom: '5px'
  }}>
    1. Hospital Information
  </p>
  <hr style={{
    border: '0',
    height: '1px',
    backgroundColor: '#B43929',
    width: '100%'
  }} /> </div>

  <label style={{
    display: 'block',
    marginBottom: '18px',
    color: '#B43929',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #B43929',
    borderRadius: '10px',
    width: '650px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}>Hospital Name
     <input 
    type="text"
    placeholder="XYZ Hospital"
    style={{
     display: 'block',
      backgroundColor: '#FFE2E2',
      border: 'none',
      fontSize: '16px',
      fontFamily:'poppins',
      marginTop:'6px',
      outline: 'none',
       width: '100%',
      
    }}
  />
  </label>

  <label style={{
    display: 'block',
    marginBottom: '18px',
    color: '#B43929',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #B43929',
    borderRadius: '10px',
    width: '650px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}>Hospital Type
     <input 
    type="text"
    placeholder="XYZ Hospital"
    style={{
     display: 'block',
      backgroundColor: '#FFE2E2',
      border: 'none',
      fontSize: '16px',
      fontFamily:'poppins',
      marginTop:'6px',
      outline: 'none',
       width: '100%',
      
    }}
  />
  </label>
  <label style={{
    display: 'block',
    marginBottom: '18px',
    color: '#B43929',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #B43929',
    borderRadius: '10px',
    width: '650px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}>Registration Number
     <input 
    type="number"
    placeholder="1234567"
    style={{
     display: 'block',
      backgroundColor: '#FFE2E2',
      border: 'none',
      fontSize: '16px',
      fontFamily:'poppins',
      marginTop:'6px',
      outline: 'none',
       width: '100%',
      
    }}
  />
  </label>
  <label style={{
    display: 'block',
    marginBottom: '18px',
    color: '#B43929',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #B43929',
    borderRadius: '10px',
    width: '650px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}>District/City
     <input 
    type="text"
    placeholder="Colombo"
    style={{
     display: 'block',
      backgroundColor: '#FFE2E2',
      border: 'none',
      fontSize: '16px',
      fontFamily:'poppins',
      marginTop:'6px',
      outline: 'none',
       width: '100%',
      
    }}
  />
  </label>
  <label style={{
    display: 'block',
    marginBottom: '18px',
    color: '#B43929',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #B43929',
    borderRadius: '10px',
    width: '650px',
    height: '70px',
    padding: '10px',
    marginTop:'20px'
  }}>Address
     <textarea
    type="text"
    placeholder="XYZ Hospital,Colombo"
    style={{
     display: 'block',
      backgroundColor: '#FFE2E2',
      border: 'none',
      fontSize: '16px',
      fontFamily:'poppins',
      marginTop:'6px',
      outline: 'none',
       width: '100%',
      
    }}
  />
  </label>

    <div style={{
          width: '100%',
          padding: '0 40px',
          boxSizing: 'border-box',
          marginTop: '30px'
        }}>
  <p style={{
    color: '#B43929',
    fontSize: '16px',
    marginBottom: '5px'
  }}>
    2. Contact Person (Hospital Representative)
  </p>
  <hr style={{
    border: '0',
    height: '1px',
    backgroundColor: '#B43929',
    width: '100%'
  }} /> </div>

  <label style={{
    display: 'block',
    marginBottom: '18px',
    color: '#B43929',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #B43929',
    borderRadius: '10px',
    width: '650px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}>Full Name
     <input 
    type="text"
    placeholder="A.B.C.Perera"
    style={{
     display: 'block',
      backgroundColor: '#FFE2E2',
      border: 'none',
      fontSize: '16px',
      fontFamily:'poppins',
      marginTop:'6px',
      outline: 'none',
       width: '100%',
      
    }}
  />
  </label>

  <label style={{
    display: 'block',
    marginBottom: '18px',
    color: '#B43929',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #B43929',
    borderRadius: '10px',
    width: '650px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}>Phone Number
     <input 
    type="phone"
    placeholder="07xxxxxxxx"
    style={{
     display: 'block',
      backgroundColor: '#FFE2E2',
      border: 'none',
      fontSize: '16px',
      fontFamily:'poppins',
      marginTop:'6px',
      outline: 'none',
       width: '100%',
      
    }}
  />
  </label>

  <label style={{
    display: 'block',
    marginBottom: '18px',
    color: '#B43929',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #B43929',
    borderRadius: '10px',
    width: '650px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}>Designation (Medical Officer, Admin)
     <input 
    type="text"
    placeholder="Medical Officer"
    style={{
     display: 'block',
      backgroundColor: '#FFE2E2',
      border: 'none',
      fontSize: '16px',
      fontFamily:'poppins',
      marginTop:'6px',
      outline: 'none',
       width: '100%',
      
    }}
  />
  </label>


 <div style={{
          width: '100%',
          padding: '0 40px',
          boxSizing: 'border-box',
          marginTop: '30px'
        }}>
  <p style={{
    color: '#B43929',
    fontSize: '16px',
    marginBottom: '5px'
  }}>
    3. Account Details
  </p>
  <hr style={{
    border: '0',
    height: '1px',
    backgroundColor: '#B43929',
    width: '100%'
  }} /> </div>

   <label style={{
    display: 'block',
    marginBottom: '18px',
    color: '#B43929',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #B43929',
    borderRadius: '10px',
    width: '650px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}>Email
     <input 
    type="email"
    placeholder="abcprerera@example.com"
    style={{
     display: 'block',
      backgroundColor: '#FFE2E2',
      border: 'none',
      fontSize: '16px',
      fontFamily:'poppins',
      marginTop:'6px',
      outline: 'none',
       width: '100%',
      
    }}
  />
  </label>

   <label style={{
    display: 'block',
    marginBottom: '18px',
    color: '#B43929',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #B43929',
    borderRadius: '10px',
    width: '650px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}>Password
     <input 
    type="password"
    placeholder="****************"
    style={{
     display: 'block',
      backgroundColor: '#FFE2E2',
      border: 'none',
      fontSize: '16px',
      fontFamily:'poppins',
      marginTop:'6px',
      outline: 'none',
       width: '100%',
      
    }}
  />
  </label>

  <label style={{
    display: 'block',
    marginBottom: '18px',
    color: '#B43929',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #B43929',
    borderRadius: '10px',
    width: '650px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}> Confirm Password
     <input 
    type="password"
    placeholder="****************"
    style={{
     display: 'block',
      backgroundColor: '#FFE2E2',
      border: 'none',
      fontSize: '16px',
      fontFamily:'poppins',
      marginTop:'6px',
      outline: 'none',
       width: '100%',
      
    }}
  />
  </label>
 
 <div style={{
          width: '100%',
          padding: '0 40px',
          boxSizing: 'border-box',
          marginTop: '30px'
        }}>
  <p style={{
    color: '#B43929',
    fontSize: '16px',
    marginBottom: '5px'
  }}>
    4. Verification Documents
  </p>
  <hr style={{
    border: '0',
    height: '1px',
    backgroundColor: '#B43929',
    width: '100%'
  }} /> </div>

   {/* <label style={{
    display: 'block',
    marginBottom: '18px',
    color: '#B43929',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #B43929',
    borderRadius: '10px',
    width: '900px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}>Proof of Registration
     <input 
    type="file"
    accept=".pdf"
   
    style={{
     display: 'block',
      backgroundColor: '#FFE2E2',
      border: 'none',
      fontSize: '16px',
      fontFamily:'poppins',
      marginTop:'6px',
      outline: 'none',
       width: '100%',
      
    }}
  />
  </label>

   <label style={{
    display: 'block',
    marginBottom: '18px',
    color: '#B43929',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #B43929',
    borderRadius: '10px',
    width: '900px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}>Office Letter/Stamp
     <input 
    type="file"
    accept=".pdf"
    style={{
     display: 'block',
      backgroundColor: '#FFE2E2',
      border: 'none',
      fontSize: '16px',
      fontFamily:'poppins',
      marginTop:'6px',
      outline: 'none',
       width: '100%',
      
    }}
  />
  </label> */}

  <div style={{ marginTop: '20px', width: '650px' }}>
  <label htmlFor="registration-pdf" style={{
    display: 'block',
    color: '#B43929',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '8px',
    borderRadius: '10px',
    width: '650px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}>Proof of Registration
    <input
    type="file"
    id="registration-pdf"
    accept=".pdf"
    style={{ display: 'none' }} // hide default input
  />

  <label htmlFor="registration-pdf" style={{
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#B43929',
    color: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: 'poppins',
    fontSize: '16px'
  }}>
    Upload PDF
  </label>
  </label>

  
</div>

      
        

     <button 
        onClick={()=>{navigate('/registration')}}
        style={{
        border:'solid 1px #B43929',
        width:'200px',
        height:'40px',
        borderRadius:'10px',
        backgroundColor:'#B43929',
        color:'white',
        fontSize:'20px',
        marginTop:'20px',
        fontFamily:'poppins'
    }}>Register

    </button>


    <p style={{
        marginTop:'90px',
        fontSize:'10px'
    }}>© 2025 RedAlert | Contact Us | Privacy Policy </p>
     
    </div>
    </div>
    
  )
}

export default WebPortal
