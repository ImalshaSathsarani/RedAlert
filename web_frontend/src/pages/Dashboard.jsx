import React from 'react'
import MainHeader from './Headers/MainHeader'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  PieChart,Pie, Cell
} from 'recharts'

// Dummy data for last month's requests
const requestData = [
  { date: 'Jun 1', requests: 5 },
  { date: 'Jun 5', requests: 12 },
  { date: 'Jun 10', requests: 8 },
  { date: 'Jun 15', requests: 18 },
  { date: 'Jun 20', requests: 24 },
  { date: 'Jun 25', requests: 15 },
  { date: 'Jun 30', requests: 20 },
]

const bloodGroupData = [
  { name: 'A+', value: 400 },
  { name: 'B+', value: 300 },
  { name: 'O+', value: 300 },
  { name: 'AB+', value: 200 },
  { name: 'A-', value: 100 },
  { name: 'B-', value: 80 },
  { name: 'O-', value: 120 },
  { name: 'AB-', value: 60 }
]

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#8AFFC1', '#FF9F40', '#AF7AC5', '#4BC0C0', '#F67280']

const Dashboard = () => {

  return (

  
    
    <>
    <MainHeader />
    
    <div style={{ fontFamily: 'sans-serif' ,marginLeft:30 ,marginRight:30}}>
      <div style={{ fontSize: 40, paddingLeft: 120, paddingTop: 40, fontWeight: 'bold' }}>
        Welcome Colombo General Hospital!
      </div>

      <div style={{ display: 'flex', alignItems: 'center', paddingTop: 20, paddingLeft: 120 }}>
        <span style={{ fontSize: 18 }}>Status :</span>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10, fontSize: 18 }}>
          <span>Verified</span>
          <span
            style={{
              marginLeft: 8,
              backgroundColor: 'green',
              color: 'white',
              borderRadius: '50%',
              width: 20,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14
            }}
          >
            ✔
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 40, paddingLeft: 120, paddingTop: 80, paddingRight: 120 }}>
        {/* First Rectangle: Line Chart */}
        <div
          style={{
            border: '2px solid #f5c2c2',
            backgroundColor: '#fff',
            boxShadow: '3px 3px 12px rgba(255, 0, 0, 0.2)',
            borderRadius: 12,
            padding: '30px 40px',
            fontSize: 16,
            fontWeight: 'bold',
            width: 700,
            height: 300,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ marginBottom: 40, fontSize:28}}>Blood Requests Overtime</div>
          <ResponsiveContainer width={600} height={200}>
            <LineChart data={requestData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date">
                <Label value="Date" position="insideBottom" offset={-5} style={{ fontSize: 14 }}/>
              </XAxis>
              <YAxis>
                <Label
                  value="Number of Requests"
                  angle={-90}
                  position="insideLeft"
                  offset={10}
                  style={{ fontSize: 14 }}
                />
              </YAxis>
              <Tooltip />
              <Line type="monotone" dataKey="requests" stroke="#ff4d4f" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>

        </div>

        {/* Second Rectangle: Text */}
        {/* Second Rectangle: Pie Chart */}
      <div
        style={{
          border: '2px solid #f5c2c2',
          backgroundColor: '#fff',
          boxShadow: '3px 3px 12px rgba(255, 0, 0, 0.2)',
          borderRadius: 12,
          padding: '20px',
          width: 400,
          height: 320,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold'
        }}
      >
        <div style={{ marginBottom: 40, fontSize: 28 }}>Blood Groups Demand</div>
        <PieChart width={200} height={200}>
          <Pie
            data={bloodGroupData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {bloodGroupData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>

      </div>

      
      <div style={{ display: 'flex', gap: 140, paddingLeft: 120, paddingTop: 80, paddingRight: 120 }}>
        <div
          style={{
            border: '2px solid #f5c2c2',
            backgroundColor: '#fff',
            boxShadow: '3px 3px 12px rgba(255, 0, 0, 0.2)',
            borderRadius: 12,
            padding: '20px 30px',
            fontSize: 24,
            width: 500,
            height: 180,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div>Total Requests</div>
          <div style={{marginTop:50, marginBottom:30,fontSize:50,fontWeight:'bold',color:'red'}}>12</div>
        </div>
        <div
          style={{
            border: '2px solid #f5c2c2',
            backgroundColor: '#fff',
            boxShadow: '3px 3px 12px rgba(255, 0, 0, 0.2)',
            borderRadius: 12,
            padding: '20px 30px',
            fontSize: 24,
            width: 500,
            height: 180,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div>Matched Donars</div>
          <div style={{marginTop:50, marginBottom:30,fontSize:50,fontWeight:'bold',color:'red'}}>5</div>
        </div>
        <div
          style={{
            border: '2px solid #f5c2c2',
            backgroundColor: '#fff',
            boxShadow: '3px 3px 12px rgba(255, 0, 0, 0.2)',
            borderRadius: 12,
            padding: '20px 30px',
            fontSize: 24,
            width: 500,
            height: 180,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div>Pending</div>
          <div style={{marginTop:50, marginBottom:30,fontSize:50,fontWeight:'bold',color:'red'}}>3</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 150, paddingLeft: 120, paddingTop: 80, paddingRight: 120 }}>
        <div
          style={{
            border: '2px solid #f5c2c2',
            backgroundColor: '#fff',
            boxShadow: '3px 3px 12px rgba(255, 0, 0, 0.2)',
            borderRadius: 12,
            padding: '20px 30px',
            fontSize: 28,
            width: 650,
            height: 250,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ marginBottom: 40,fontWeight: 'bold',marginLeft:20,marginTop:10}}>Recent Blood Requests</div>
          <div style={{marginLeft:20}}>
          <div style={{ display: 'flex', fontWeight: 'bold', fontSize: 23, marginBottom: 10 ,color:'red',gap: '60px'}}>
            <div style={{ width: '100px' }}>ID</div>
            <div style={{ width: '100px' }}>Blood</div>
            <div style={{ width: '100px' }}>Units</div>
            <div style={{ width: '100px' }}>Status</div>
          </div>

        <div style={{ display: 'flex', fontSize: 20 ,color:'gray' ,gap: '60px',marginTop:20}}>
          <div style={{ width: '100px' }}>001</div>
          <div style={{ width: '100px' }}>A+</div>
          <div style={{ width: '100px' }}>2</div>
          <div style={{ width: '100px'}}>Pending</div>
        </div>
        <div style={{ display: 'flex', fontSize: 20 ,color:'gray',gap: '60px',marginTop:20}}>
          <div style={{ width: '100px' }}>001</div>
          <div style={{ width: '100px' }}>A+</div>
          <div style={{ width: '100px' }}>2</div>
          <div style={{ width: '100px'}}>Pending</div>
        </div>
        <div style={{ display: 'flex', fontSize: 20 ,color:'gray',gap: '60px',marginTop:20}}>
          <div style={{ width: '100px' }}>001</div>
          <div style={{ width: '100px' }}>A+</div>
          <div style={{ width: '100px' }}>2</div>
          <div style={{ width: '100px'}}>Pending</div>
        </div>
        </div>
        </div>

        <div
  style={{
    border: '2px solid #f5c2c2',
    backgroundColor: '#fff',
    boxShadow: '3px 3px 12px rgba(255, 0, 0, 0.2)',
    borderRadius: 12,
    padding: '30px 30px',
    width: 300,
    height: 230,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  }}
>
  <div style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 30 }}>Quick Actions</div>
  
  <button
    style={{
      border: '2px solid red',
      backgroundColor: 'white',
      color: 'red',
      padding: '10px 20px',
      borderRadius: 30,
      fontSize: 18,
      cursor: 'pointer',
    }}
  >
    Request Blood
  </button>

  <button
    style={{
      border: '2px solid red',
      backgroundColor: 'white',
      color: 'red',
      padding: '10px 20px',
      borderRadius: 30,
      fontSize: 18,
      cursor: 'pointer',
      marginBottom:20
    }}
  >
    Search Donors
  </button>
</div>

      </div>

       <div style={{ display: 'flex', gap: 40, paddingLeft: 120, paddingTop: 80, paddingRight: 120 }}>
        <div
          style={{
            border: '2px solid #f5c2c2',
            backgroundColor: '#fff',
            boxShadow: '3px 3px 12px rgba(255, 0, 0, 0.2)',
            borderRadius: 12,
            padding: '20px 30px',
            fontSize: 28,
            width: '100%',
            height: 230,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ marginBottom: 40,marginTop:20, marginLeft:20,fontWeight: 'bold',}}>Matched Donars for Active Requests</div>
          
           <div style={{ marginLeft:20, whiteSpace: 'nowrap',}}>
          <div style={{ display: 'flex', fontWeight: 'bold', fontSize: 23, marginBottom: 10 ,color:'red',gap: '180px'}}>
            <div style={{ width: '100px' }}>Name</div>
            <div style={{ width: '100px',textAlign: 'center' }}>Blood Group</div>
            <div style={{ width: '100px' }}>Last Donation</div>
            <div style={{ width: '100px' }}>StatusContact</div>
          </div>

        <div style={{ display: 'flex', fontSize: 20 ,color:'gray',marginTop:20,gap: '180px'}}>
          <div style={{ width: '100px' }}>Nimal Perera</div>
          <div style={{ width: '100px',textAlign: 'center' }}>A+</div>
          <div style={{ width: '100px' }}>2 months ago</div>
          <div style={{ width: '100px'}}>0123456789</div>
        </div>

        <div style={{ display: 'flex', fontSize: 20 ,color:'gray',marginTop:20,gap: '180px'}}>
          <div style={{ width: '100px' }}>Nimal Perera</div>
          <div style={{ width: '100px' ,textAlign: 'center'}}>A+</div>
          <div style={{ width: '100px' }}>2 months ago</div>
          <div style={{ width: '100px'}}>0123456789</div>
        </div>
        
        </div>

        </div>
        </div>

    </div>
    </>
  )
}

export default Dashboard
