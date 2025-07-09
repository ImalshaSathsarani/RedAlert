import React from 'react'
import AdminSideBar from './AdminSideBar'

const AdminDashboard = () => {
  return (

    <div style={{ display: 'flex', fontFamily: 'sans-serif' }}>
      <AdminSideBar />
    <div style={{ fontFamily: 'sans-serif' ,marginLeft:50 ,marginRight:30}}>
      <div style={{ fontSize: 36, paddingLeft: 60, paddingTop: 60, fontWeight: 'bold' }}>
        Good Morning!
      </div>

      <div style={{ display: 'flex', marginLeft: 40, marginTop: 60 }}>
          <div style={{
            backgroundColor: '#FFE2E2',
            borderRadius: 20,
            height: 250,
            width: 400,
            marginLeft: 20, 
            padding: 20,
            boxSizing: 'border-box'
          }}>
            <p style={{ fontWeight: 'bold', margin: 20,fontSize:20 }}>Registered Users</p>
          </div>

          <div style={{
            backgroundColor: '#FFE2E2',
            borderRadius: 20,
            height: 250,
            width: 400,
            marginLeft: 80, 
            padding: 20,
            boxSizing: 'border-box'
          }}>
            <p style={{ fontWeight: 'bold', margin: 20,fontSize:20 }}>Registered Hospitals</p>
          </div>
        </div>

        <div style={{ fontSize: 24, paddingLeft: 60, paddingTop: 60, fontWeight: 'bold' }}>
          Registrations Requests
        </div>

        <div>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'sans-serif',
            marginLeft:60,
            marginTop: 40
          }}>
              <thead>
                <tr style={{ backgroundColor: '#f9f9f9', textAlign: 'left' }}>
                  <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}></th>
                  <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Name</th>
                  <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Admin</th>
                  <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Members</th>
                  <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Status</th>
                  <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Run time</th>
                  <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' , textAlign: 'center'}}>Finish date</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}><input type="checkbox" /></td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>6 Mon</td>
                </tr>

                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}><input type="checkbox" /></td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>6 Mon</td>
                </tr>

                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}><input type="checkbox" /></td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>6 Mon</td>
                </tr>

                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}><input type="checkbox" /></td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>6 Mon</td>
                </tr>

                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}><input type="checkbox" /></td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>6 Mon</td>
                </tr>
                
              </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
