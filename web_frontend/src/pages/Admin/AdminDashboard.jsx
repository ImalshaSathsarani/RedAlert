import React from 'react'
import AdminSideBar from './AdminSideBar'

const AdminDashboard = () => {
  return (

    <div style={{ display: 'flex', fontFamily: 'poppins' }}>
      <AdminSideBar />
    <div style={{ fontFamily: 'poppins' ,marginLeft:0 ,marginRight:30}}>
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
             <h2 style={{textAlign:'center', fontSize:'50px'}}>32</h2>
          </div>

          <div style={{
            backgroundColor: '#FFE2E2',
            borderRadius: 20,
            height: 250,
            width: 400,
            marginLeft: 150, 
            padding: 20,
            boxSizing: 'border-box'
          }}>
            <p style={{ fontWeight: 'bold', margin: 20,fontSize:20 }}>Registered Hospitals</p>
            <h2 style={{textAlign:'center', fontSize:'50px'}}>32</h2>
          </div>
        </div>

        <div style={{ fontSize: 24, paddingLeft: 60, paddingTop: 60, fontWeight: 'bold' }}>
          Registration Requests
        </div>

        {/* <div>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'poppins',
            marginLeft:60,
            marginTop: 40
          }}>
              <thead>
                <tr style={{ backgroundColor: '#f9f9f9', textAlign: 'left' }}>
                  <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Hospital Registration Number</th>
                  <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Hospital Name</th>
                  <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>User Name</th>
                  <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Designation</th>
                  <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Status</th>
                  <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Registration Document</th>
                  <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' , textAlign: 'center'}}>Office Letter</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>A12345678</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>6 Mon</td>
                </tr>

                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>A12345678</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>6 Mon</td>
                </tr>

                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>A123456789</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>6 Mon</td>
                </tr>

                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>A12345678</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>6 Mon</td>
                </tr>

                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>A12345678</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>6 Mon</td>
                </tr>
                
              </tbody>
          </table>
        </div> */}
        <div>
          <table style={{
            width: '80%',
            borderCollapse: 'collapse',
            fontFamily: 'poppins',
            marginTop: 40,
            marginLeft:60
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f9f9f9', textAlign: 'left' }}>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Hospital Registration Number</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Hospital Name</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>User Name</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>User Phone Number</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>User Email</th>
                
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold' }}>Registration Document</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Office Letter</th>
                <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Report</th>
                 <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Requested Date</th>
                 <th style={{ padding: '12px 8px', fontSize: '16px', fontWeight: 'bold',textAlign:'center' }}>Actions</th>
              </tr>
            </thead>
            
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>A12345678</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>0123456789</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>example@example.com</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>
                     <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
                    <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>
                    <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>05/10/2025</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Approve</button>
                    <button style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Reject</button>
                    </div>
                    
                  </td>
                </tr>
                 <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>A12345678</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>1234567890</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>example@example.com</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>
                     <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
                    <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>
                    <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>05/10/2025</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Approve</button>
                    <button style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Reject</button>
                    </div>
                    
                  </td>
                </tr>
                 <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>A12345678</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>1234567890</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>example@example.com</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>
                     <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
                    <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>
                    <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>05/10/2025</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Approve</button>
                    <button style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Reject</button>
                    </div>
                    
                  </td>
                </tr>
                 <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>A12345678</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>1234567890</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>example@example.com</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>
                     <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
                    <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>
                    <button style={{ backgroundColor: '#190f8aff', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Download</button>
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>05/10/2025</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Approve</button>
                    <button style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '20px', padding: '12px 12px', cursor: 'pointer', fontFamily:'poppins' }}>Reject</button>
                    </div>
                    
                  </td>
                </tr>

                {/* <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>A12345678</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>6 Mon</td>
                </tr>

                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>A12345678</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>6 Mon</td>
                </tr>

                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>A12345678</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>6 Mon</td>
                </tr>

                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>A12345678</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>ClientOnboarding - Circle</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>Samanta J.</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' , textAlign: 'center'}}>3</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', color: '#007bff' }}>In progress</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>6 hours</td>
                  <td style={{ padding: '10px 8px', fontSize: '14px', textAlign: 'center' }}>6 Mon</td>
                </tr> */}
                
              </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
