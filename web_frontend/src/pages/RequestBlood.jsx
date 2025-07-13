
import React, { useState } from 'react'

import MainHeader from './Headers/MainHeader'

const RequestBlood = () => {

  const [requestFileName, setRequestFileName] = useState(null);
  

  const handleRegisterFileChange = (event) =>{
    const file = event.target.files[0];
    if(file) setRequestFileName(file.name);
    else setRequestFileName(null)
  };

  
  return (
    <>
    <MainHeader/>

    <div style={{
        height:'100vh',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'flex-start',
    }}>
      

      <div style={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
        height:'auto',
        width:'1000px',
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
        }}>Request Blood</h1>

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
    width: '900px',
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
    width: '900px',
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
    width: '900px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}>Contact Person Name
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
    width: '900px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}>Emergency Contact Number
     <input 
    type="text"
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
    2. Blood Request Details
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
    width: '900px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}>Blood Group Needed
     <select 
       defaultValue=""
       style={{
        display:'block',
        backgroundColor:'#FFE2E2',
        border: '1px solid #B43929',
        fontSize:'16px',
        fontFamily:'poppins',
        marginTop:'6px',
        outline:'none',
        width:'200px',
        borderRadius:'6px',
        color:'#000',
        padding: '6px',
       
       }}>
        <option value="" disabled>Select type</option>
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
  }}>Quantity Needed
     <input 
    type="text"
    placeholder="1 units/pints"
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
  }}>Urgency Level
     <select 
       defaultValue=""
       style={{
        display:'block',
        backgroundColor:'#FFE2E2',
        border: '1px solid #B43929',
        fontSize:'16px',
        fontFamily:'poppins',
        marginTop:'6px',
        outline:'none',
        width:'200px',
        borderRadius:'6px',
        color:'#000',
        padding: '6px',
       
       }}>
        <option value="" disabled>Select type</option>
    <option value="critical">Critical</option>
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
    
     </select>
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
  }}>Required Date
     <input 
    type="date"
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
    width: '900px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}>Required Time(If Necessary)
     <input 
    type="time"
    placeholder="10:00"
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
    3. Patient and Medical Info
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
    width: '900px',
    height: '50px',
    padding: '10px',
    marginTop:'20px'
  }}>Patient Name
     <input 
    type="text"
    placeholder="John Doe"
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
  }}>Ward
     <input 
    type="text"
    placeholder="10/A"
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
  }}> Medical Condition (Accident, Surgery, etc.)
     <input 
    type="text"
    placeholder="Accident"
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
    4. Donation Info
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
    width: '900px',
    height: '70px',
    padding: '10px',
    marginTop:'20px'
  }}>Donation Location ( e.g. : Blood Bank, Room 12, General Hospital ,Colombo)
     <textarea
    type="text"
    placeholder=" Blood Bank, Room 12, General Hospital ,Colombo"
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
  }}> Available Donation Time (e.g. 10:00 - 16:00)
     <input 
    type="text"
    placeholder="10:00- 16:00"
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
  
   <label 
    htmlFor="request-pdf"
    style={{
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
  }}>Attach Doctor Request Form
     <input 
    type="file"
    accept=".pdf"
    id="request-pdf"
    onChange={handleRegisterFileChange}
    style={{ display:'none'}}
  />


<div style={{
   display: 'flex',
    alignItems: 'center',
     gap: '20px',
    
}}>

  
    <p style={{
      margin:'0',
      fontSize:'14px',
      fontFamily:'poppins',
      color:'black',
     
     
    }}><strong>Selected File: </strong> {requestFileName ? requestFileName:'No File Chosen'}

    </p>

   <label 
    htmlFor="request-pdf" 
    style={{
      
      padding:'10px 20px',
      backgroundColor:'#FFE2E2',
      color:'black',
      borderRadius:'8px',
      cursor:'pointer',
      fontFamily: 'poppins',
      fontSize: '16px',
      border:'1px solid #B43929',
      width:'100px',
     
      textAlign:'center'
      
  }}>
    Upload
  </label>
  

</div>
 
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
    height: '70px',
    padding: '10px',
    marginTop:'20px'
  }}>Additional Information (if necessary)
     <textarea
    type="text"
    placeholder="e.g:Bring Id"
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



      
        

     <button 
       
        style={{
        border:'solid 1px #B43929',
        width:'300px',
        height:'60px',
        borderRadius:'10px',
        backgroundColor:'#B43929',
        color:'white',
        fontSize:'20px',
        marginTop:'20px',
        fontFamily:'poppins',
        padding:'10px',
        cursor:'pointer',
    }}>Request and add to Community

    </button>


    <p style={{
        marginTop:'90px',
        fontSize:'10px'
    }}>© 2025 RedAlert | Contact Us | Privacy Policy </p>
     
    </div>
    </div>
    </>
  )
}

export default RequestBlood

