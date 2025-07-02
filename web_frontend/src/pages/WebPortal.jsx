import React from 'react'
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';

const WebPortal = () => {

    const navigate = useNavigate();
  return (
    <div style={{
        height:'100vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }}>
      <div style={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
        height:'500px',
        width:'700px',
        border:'1px solid #FFBFBF',
        backgroundColor:'#FFE2E2',
        borderRadius:'10px',
        boxShadow:'(0.1,0,0,0),rgba(#000)'
      
    }}>

        <img src={logo} alt ="Logo" style={{
            width:'150px',
            height:'150px',
            marginBottom:'0px',
            //marginRight:'10px'
           
        }}>
        </img>

        <h1 style={{
            textAlign:"center",
            fontSize:'30px',
            marginTop:'0'
        }}>Welcome to RedAlert Hospital</h1>
        <h1 style={{
            textAlign:"center",
            fontSize:'30px',
            marginTop:'0'
        }}>Portal !!!</h1>

    <button 
        onClick={()=>navigate('/login')}
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
    }}>Login

    </button>
     
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
